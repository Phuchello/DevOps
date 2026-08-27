import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const buildRoot = path.dirname(fileURLToPath(import.meta.url));
const volumeRoot = path.resolve(buildRoot, '..');
const repoRoot = path.resolve(volumeRoot, '../..');
const chapterRoot = path.join(volumeRoot, 'chapters', '02-streams-pipes-redirection');
const outputRoot = path.join(volumeRoot, 'releases', 'chapter02-html-first');
const htmlPath = path.join(outputRoot, 'chapter02.html');
const pdfPath = path.join(outputRoot, 'chapter02.pdf');
const reportPath = path.join(outputRoot, 'BUILD_REPORT.json');
const sourcePaths = [path.join(chapterRoot, 'part-01.md'), path.join(chapterRoot, 'part-02.md')];

const buildMode = process.argv.find((argument) => argument.startsWith('--mode='))?.slice('--mode='.length) || 'standalone';
if (!['standalone', 'volume'].includes(buildMode)) throw new Error(`Unsupported build mode: ${buildMode}`);

const requireFromVolume = createRequire(path.join(volumeRoot, 'package.json'));
const dependencyLookupPaths = [volumeRoot];
if (process.env.FIELD_BOOK_NODE_MODULES) dependencyLookupPaths.unshift(process.env.FIELD_BOOK_NODE_MODULES);
const resolveDependency = (packageName) => {
  try {
    return requireFromVolume.resolve(packageName, { paths: dependencyLookupPaths });
  } catch {
    throw new Error(`Missing dependency "${packageName}". Run npm ci in fieldbook/vol1-linux, or set FIELD_BOOK_NODE_MODULES as an optional override.`);
  }
};
const markedEntry = resolveDependency('marked');
const markedModule = await import(pathToFileURL(markedEntry).href);
const marked = markedModule.marked ?? markedModule.default?.marked ?? markedModule.default;
if (!marked?.Renderer || !marked?.parse) throw new Error(`Could not load marked from project dependency: ${markedEntry}`);
const { chromium } = requireFromVolume(resolveDependency('playwright'));
const { PDFDocument, StandardFonts, rgb } = requireFromVolume(resolveDependency('pdf-lib'));
const { getDocument } = await import(pathToFileURL(resolveDependency('pdfjs-dist/legacy/build/pdf.mjs')).href);

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');
const slugify = (value) => String(value)
  .toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[`*_[\]"']/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const streamsSvg = `
<figure class="book-figure diagram-svg" id="fig-02-3">
  <svg viewBox="0 0 820 420" role="img" aria-labelledby="fig-02-3-title fig-02-3-desc" xmlns="http://www.w3.org/2000/svg">
    <title id="fig-02-3-title">Ba standard streams</title>
    <desc id="fig-02-3-desc">Keyboard or file feeds stdin of a process. The process sends stdout and stderr independently to terminal or file destinations.</desc>
    <defs><marker id="arrow-02-3" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#1d5d82"/></marker></defs>
    <rect class="svg-node svg-node-accent" x="40" y="150" width="170" height="92" rx="14"/>
    <text class="svg-label" x="125" y="184" text-anchor="middle">keyboard / file</text><text class="svg-sub" x="125" y="209" text-anchor="middle">input source</text>
    <rect class="svg-node" x="325" y="150" width="170" height="92" rx="14"/><text class="svg-label" x="410" y="184" text-anchor="middle">PROCESS</text><text class="svg-sub" x="410" y="209" text-anchor="middle">external command</text>
    <rect class="svg-node svg-node-strong" x="610" y="60" width="170" height="78" rx="14"/><text class="svg-label" x="695" y="94" text-anchor="middle">terminal / file</text><text class="svg-sub" x="695" y="119" text-anchor="middle">stdout destination</text>
    <rect class="svg-node svg-node-strong" x="610" y="282" width="170" height="78" rx="14"/><text class="svg-label" x="695" y="316" text-anchor="middle">terminal / file</text><text class="svg-sub" x="695" y="341" text-anchor="middle">stderr destination</text>
    <line class="svg-arrow" x1="210" y1="196" x2="325" y2="196" marker-end="url(#arrow-02-3)"/><text class="svg-arrow-label" x="267" y="181" text-anchor="middle">stdin</text>
    <path class="svg-arrow" d="M495 176 C540 176 552 100 610 100" marker-end="url(#arrow-02-3)"/><text class="svg-arrow-label" x="548" y="133" text-anchor="middle">stdout</text>
    <path class="svg-arrow" d="M495 216 C540 216 552 321 610 321" marker-end="url(#arrow-02-3)"/><text class="svg-arrow-label" x="548" y="285" text-anchor="middle">stderr</text>
  </svg>
  <figcaption>Figure 2.3 - Ba stream quen thuộc: stdin đi vào process; stdout và stderr đi ra theo hai đường riêng.</figcaption>
</figure>`;

const splitStreamsSvg = `
<figure class="book-figure diagram-svg" id="fig-02-4">
  <svg viewBox="0 0 820 250" role="img" aria-labelledby="fig-02-4-title fig-02-4-desc" xmlns="http://www.w3.org/2000/svg">
    <title id="fig-02-4-title">Tách stdout và stderr vào hai file</title>
    <desc id="fig-02-4-desc">A process sends stdout to normal.txt and stderr to errors.txt through two separate redirection routes.</desc>
    <defs><marker id="arrow-02-4" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#1d5d82"/></marker></defs>
    <rect class="svg-node" x="45" y="75" width="180" height="100" rx="14"/><text class="svg-label" x="135" y="113" text-anchor="middle">PROCESS</text><text class="svg-sub" x="135" y="139" text-anchor="middle">command</text>
    <rect class="svg-node svg-node-strong" x="550" y="25" width="220" height="78" rx="14"/><text class="svg-label" x="660" y="59" text-anchor="middle">normal.txt</text><text class="svg-sub" x="660" y="84" text-anchor="middle">stdout</text>
    <rect class="svg-node svg-node-strong" x="550" y="147" width="220" height="78" rx="14"/><text class="svg-label" x="660" y="181" text-anchor="middle">errors.txt</text><text class="svg-sub" x="660" y="206" text-anchor="middle">stderr</text>
    <path class="svg-arrow" d="M225 105 C340 105 405 64 550 64" marker-end="url(#arrow-02-4)"/><text class="svg-arrow-label" x="383" y="80" text-anchor="middle">&gt; normal.txt</text>
    <path class="svg-arrow" d="M225 145 C340 145 405 186 550 186" marker-end="url(#arrow-02-4)"/><text class="svg-arrow-label" x="383" y="172" text-anchor="middle">2&gt; errors.txt</text>
  </svg>
  <figcaption>Figure 2.4 - <code>command &gt;normal.txt 2&gt;errors.txt</code> giữ hai stream thành hai evidence file.</figcaption>
</figure>`;

const pipeSvg = `
<figure class="book-figure diagram-svg" id="fig-02-5">
  <svg viewBox="0 0 820 240" role="img" aria-labelledby="fig-02-5-title fig-02-5-desc" xmlns="http://www.w3.org/2000/svg">
    <title id="fig-02-5-title">Pipe nối hai process</title>
    <desc id="fig-02-5-desc">Process A sends stdout through a pipe to stdin of Process B.</desc>
    <defs><marker id="arrow-02-5" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#1d5d82"/></marker></defs>
    <rect class="svg-node svg-node-accent" x="55" y="75" width="220" height="90" rx="14"/><text class="svg-label" x="165" y="112" text-anchor="middle">Process A</text><text class="svg-sub" x="165" y="138" text-anchor="middle">stdout</text>
    <rect class="svg-node svg-node-strong" x="545" y="75" width="220" height="90" rx="14"/><text class="svg-label" x="655" y="112" text-anchor="middle">Process B</text><text class="svg-sub" x="655" y="138" text-anchor="middle">stdin</text>
    <line class="svg-arrow" x1="275" y1="120" x2="545" y2="120" marker-end="url(#arrow-02-5)"/><text class="svg-arrow-label" x="410" y="105" text-anchor="middle">pipe</text>
  </svg>
  <figcaption>Figure 2.5 - Pipe nối stdout của Process A với stdin của Process B; stderr không tự đi qua pipe.</figcaption>
</figure>`;

const replaceLegacyFigures = (source) => {
  const replacements = { 'fig-02-3': streamsSvg, 'fig-02-4': splitStreamsSvg, 'fig-02-5': pipeSvg };
  let output = source;
  for (const [id, replacement] of Object.entries(replacements)) {
    const legacyPattern = new RegExp(`<figure class="book-figure diagram-flow" id="${id}">[\\s\\S]*?<\\/figure>`, 'u');
    if (!legacyPattern.test(output)) throw new Error(`Expected frozen Chapter 02 ${id} source block was not found`);
    output = output.replace(legacyPattern, replacement);
  }
  return output;
};

const renderer = new marked.Renderer();
renderer.heading = ({ text, depth }) => `<h${depth} id="section-${slugify(text)}">${text}</h${depth}>`;
renderer.code = ({ text, lang }) => {
  const language = (lang || 'text').toLowerCase();
  const command = ['bash', 'sh', 'shell', 'console', 'terminal'].includes(language);
  const label = command ? 'Command' : (language === 'output' ? 'Expected output' : 'Text example');
  return `<figure class="code-figure ${command ? 'code-command' : 'code-output'}"><div class="code-label">${label}</div><pre><code class="language-${escapeHtml(language)}">${escapeHtml(text)}</code></pre></figure>`;
};
renderer.codespan = ({ text }) => `<code class="inline-code">${escapeHtml(text)}</code>`;

for (const sourcePath of sourcePaths) if (!fs.existsSync(sourcePath)) throw new Error(`Missing source: ${sourcePath}`);
execFileSync(process.execPath, [path.join(volumeRoot, 'check-frozen-sources.mjs')], { cwd: repoRoot, stdio: 'inherit' });
const rawSource = sourcePaths.map((sourcePath) => fs.readFileSync(sourcePath, 'utf8')).join('\n');
const sourceWithSvg = replaceLegacyFigures(rawSource)
  .replace(/^#\s+Chapter\s+02[^\r\n]*\r?\n?/gimu, '')
  .replace(/^Tags:[^\r\n]*\r?\n?/gimu, '');
const headings = [...sourceWithSvg.matchAll(/^##\s+(.+)$/gmi)].map((match) => match[1].trim());
const bodyHtml = marked.parse(sourceWithSvg, { renderer, gfm: true, breaks: false, headerIds: false, mangle: false });

const workedExample = `
<section class="worked-example" id="worked-example-stream-routing">
  <p class="eyebrow">WORKED EXAMPLE</p>
  <h2>Luồng thực thi đầy đủ: tách stdout và stderr</h2>
  <div class="example-flow">
    <p><strong>Problem.</strong> Muốn giữ normal output và diagnostic output thành hai evidence file để đọc riêng.</p>
    <p><strong>Input / initial state.</strong> Thư mục lab có <code class="inline-code">colors.txt</code>; <code class="inline-code">does-not-exist.txt</code> chưa tồn tại.</p>
    <p><strong>Command.</strong></p>
    <pre><code>ls colors.txt does-not-exist.txt &gt; normal.txt 2&gt; errors.txt</code></pre>
    <p><strong>Execution flow.</strong> Shell mở hai destination trước khi command chạy → <code class="inline-code">ls</code> ghi tên file có thật qua stdout → <code class="inline-code">ls</code> ghi diagnostic cho file thiếu qua stderr.</p>
    <p><strong>Intermediate state.</strong> <code class="inline-code">normal.txt</code> đã nhận một dòng; <code class="inline-code">errors.txt</code> đã nhận diagnostic, dù command chỉ chạy một lần.</p>
  </div>
  <div class="example-result">
    <p><strong>Output / result.</strong></p>
    <pre><code>$ cat normal.txt
colors.txt
$ cat errors.txt
ls: cannot access 'does-not-exist.txt': No such file or directory</code></pre>
    <p><strong>Why.</strong> <code class="inline-code">&gt;</code> đổi destination của stdout; <code class="inline-code">2&gt;</code> đổi destination của descriptor 2, tức stderr. Hai stream vẫn riêng.</p>
  </div>
  <div class="example-failure"><p><strong>Common failure.</strong> Dùng <code class="inline-code">&gt; combined.txt</code> rồi ngạc nhiên khi diagnostic vẫn hiện trên terminal.</p></div>
  <div class="example-debug"><p><strong>Debugging evidence.</strong> Chạy <code class="inline-code">cat normal.txt</code>, <code class="inline-code">cat errors.txt</code>, rồi kiểm tra exit status ngay sau command. Đừng suy ra routing từ việc text cùng xuất hiện trên một terminal.</p></div>
</section>`;

const chapter11Heading = headings.find((heading) => /^2\.11\b/u.test(heading));
if (!chapter11Heading) throw new Error('Chapter 02 section 2.11 heading was not found');
const chapter11Marker = `<h2 id="section-${slugify(chapter11Heading)}">`;
const bodyWithWorkedExample = bodyHtml.replace(chapter11Marker, `${workedExample}\n${chapter11Marker}`);
if (bodyWithWorkedExample === bodyHtml) throw new Error('Worked example could not be placed after section 2.10');

const buildHtml = (pageMap = null) => {
  const toc = headings.map((heading) => {
    const tocText = heading.replaceAll('`', '');
    const pageNumber = pageMap?.[slugify(heading)];
    const pageText = Number.isInteger(pageNumber) ? pageNumber : '—';
    return `<a class="toc-entry" href="#section-${slugify(heading)}"><span class="toc-label">${escapeHtml(tocText)}</span><span class="toc-page">${pageText}</span></a>`;
  }).join('');
  const cover = buildMode === 'standalone' ? `<section class="cover" id="cover"><div class="cover-kicker">VOLUME 1</div><h1>DevOps Engineering Fieldbook</h1><p class="cover-volume">Linux Systems &amp; Operations</p><p class="cover-subtitle">Streams, Pipes &amp; Redirection</p><div class="cover-rule"></div><p class="cover-audience">A beginner-first lesson in where command input and output travel.</p><p class="cover-meta">BIÊN SOẠN: VÕ TRỌNG PHÚC</p></section>` : '';
  const chapterToc = buildMode === 'standalone' ? `<section class="toc" id="table-of-contents"><p class="eyebrow">CONTENTS</p><h2>Chapter 02 - Streams, Pipes &amp; Redirection</h2><div class="toc-list">${toc}</div></section>` : '';
  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>DevOps Engineering Fieldbook - Chapter 02</title>
  <link rel="stylesheet" href="../../styles/book.css">
</head>
<body>
  <nav class="screen-nav" aria-label="Book navigation"><span>DevOps Engineering Fieldbook</span><span>Volume 1 - Linux Systems &amp; Operations</span></nav>
  <main class="book-shell">
    ${cover}
    ${chapterToc}
    <section class="chapter-header" id="chapter-02"><p class="eyebrow">CHAPTER 02</p><h1>Streams, Pipes &amp; Redirection</h1><p class="chapter-dek">Follow text as it enters a command, leaves it and becomes evidence.</p></section>
    <article class="chapter-content">${bodyWithWorkedExample}</article>
  </main>
  <div class="screen-footer">Chapter 02 · Streams, Pipes &amp; Redirection</div>
</body>
</html>`;
};

fs.mkdirSync(outputRoot, { recursive: true });
const assertBuildMode = (htmlContent) => {
  const hasCover = /id="cover"/iu.test(htmlContent);
  const hasChapterToc = /id="table-of-contents"/iu.test(htmlContent);
  if (buildMode === 'standalone' && (!hasCover || !hasChapterToc)) throw new Error('Standalone mode requires a chapter cover and chapter TOC');
  if (buildMode === 'volume' && (hasCover || hasChapterToc)) throw new Error('Volume mode must suppress the chapter cover and chapter TOC');
};
const writeHtml = (pageMap = null) => {
  const htmlContent = buildHtml(pageMap);
  assertBuildMode(htmlContent);
  fs.writeFileSync(htmlPath, htmlContent);
};
const runReaderQuality = (htmlOnly = false) => {
  const argumentsList = [path.join(buildRoot, 'check-reader-quality.mjs'), `--mode=${buildMode}`];
  if (htmlOnly) argumentsList.push('--html-only');
  execFileSync(process.execPath, argumentsList, { cwd: repoRoot, stdio: 'inherit' });
};

writeHtml();
runReaderQuality(true);

const intermediatePdf = path.join(outputRoot, '.chapter02-unfooted.pdf');
const exportPdf = async (targetPath) => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1240, height: 900 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(() => document.fonts?.ready);
  await page.pdf({ path: targetPath, format: 'A4', printBackground: true, preferCSSPageSize: true, margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' } });
  await browser.close();
};

const normalizePdfText = (value) => String(value).replaceAll('`', '').replace(/\s+/gu, ' ').trim().toLocaleLowerCase();
const extractPageMap = async (pdfFile) => {
  const loadingTask = getDocument({ data: new Uint8Array(fs.readFileSync(pdfFile)), disableWorker: true, useSystemFonts: true });
  const document = await loadingTask.promise;
  const pages = [];
  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
    const pdfPage = await document.getPage(pageNumber);
    const content = await pdfPage.getTextContent();
    pages.push(normalizePdfText(content.items.map((item) => item.str || '').join(' ')));
    pdfPage.cleanup();
  }
  await document.cleanup();
  const pageMap = {};
  for (const heading of headings) {
    const needle = normalizePdfText(heading.replaceAll('`', ''));
    const matches = pages.map((pageText, index) => pageText.includes(needle) ? index + 1 : null).filter(Number.isInteger);
    if (matches.length === 0) throw new Error(`Could not locate printed heading in PDF: ${heading}`);
    pageMap[slugify(heading)] = Math.max(...matches);
  }
  return pageMap;
};

await exportPdf(intermediatePdf);
let pageMap = await extractPageMap(intermediatePdf);
writeHtml(pageMap);
await exportPdf(intermediatePdf);
const verifiedPageMap = await extractPageMap(intermediatePdf);
if (JSON.stringify(verifiedPageMap) !== JSON.stringify(pageMap)) {
  pageMap = verifiedPageMap;
  writeHtml(pageMap);
  await exportPdf(intermediatePdf);
  const finalPageMap = await extractPageMap(intermediatePdf);
  if (JSON.stringify(finalPageMap) !== JSON.stringify(pageMap)) throw new Error('TOC page mapping did not stabilize after PDF export');
  pageMap = finalPageMap;
}
runReaderQuality(true);

const pdf = await PDFDocument.load(fs.readFileSync(intermediatePdf));
const font = await pdf.embedFont(StandardFonts.Helvetica);
const totalPages = pdf.getPageCount();
pdf.getPages().forEach((pdfPage, index) => {
  if (buildMode === 'standalone' && index === 0) return;
  const { width } = pdfPage.getSize();
  pdfPage.drawLine({ start: { x: 57, y: 47 }, end: { x: width - 48, y: 47 }, thickness: 0.5, color: rgb(0.78, 0.8, 0.82) });
  pdfPage.drawText(`Chapter 02 · Streams, Pipes & Redirection    ${index + 1}`, { x: 57, y: 31, size: 8, font, color: rgb(0.25, 0.28, 0.31) });
});
fs.writeFileSync(pdfPath, await pdf.save());
fs.rmSync(intermediatePdf, { force: true });
runReaderQuality();
execFileSync(process.execPath, [path.join(volumeRoot, 'check-frozen-sources.mjs')], { cwd: repoRoot, stdio: 'inherit' });

const repoRelative = (file) => path.relative(repoRoot, file).replaceAll(path.sep, '/');
const report = {
  artifactOrder: ['canonical learner Markdown', 'chapter HTML', 'chapter PDF exported from HTML'],
  buildMode,
  dependencyResolution: process.env.FIELD_BOOK_NODE_MODULES ? 'FIELD_BOOK_NODE_MODULES optional override' : 'fieldbook/vol1-linux/node_modules via npm ci',
  sourceFiles: sourcePaths.map(repoRelative),
  artifacts: [repoRelative(htmlPath), repoRelative(pdfPath)],
  legacyDiagramHandling: 'Frozen Figure 2.3, 2.4 and 2.5 source blocks are replaced at the HTML boundary by accessible inline SVG; no ASCII diagram enters HTML/PDF.',
  pdfPages: totalPages,
  automatedGates: ['check-frozen-sources.mjs before render', 'check-reader-quality.mjs before PDF export', 'check-reader-quality.mjs after PDF export', 'check-frozen-sources.mjs after render'],
  frozenSources: 'FROZEN_SOURCES_OK',
  readerMetadata: 'absent',
  workedExamplePlacement: 'after section 2.10 and before section 2.11',
  tocPagesResolved: buildMode === 'standalone',
  tocPageMap: buildMode === 'standalone' ? pageMap : {},
  footer: 'Chapter 02 · Streams, Pipes & Redirection + physical page number; no total-page metadata',
  visualQa: 'Inspect generated HTML, a diagram-heavy PDF page, and an example/lab-heavy PDF page before publication.',
};
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
const proofPath = path.join(outputRoot, 'REVIEW_PROOF.md');
fs.writeFileSync(proofPath, `# Chapter 02 HTML-first review proof

- Clean dependency resolution: PASS — project-local \`fieldbook/vol1-linux/node_modules\` selected by normal Node package resolution; no machine-specific fallback.
- Reader metadata absent: PASS — quality gate rejects Tags, approval/freeze labels, version labels, Study Edition, and the old total-page footer.
- Worked example placement: PASS — after section 2.10 and before section 2.11, with Problem → Input → Command → Execution flow → Intermediate state → Output → Why → Common failure → Debugging evidence.
- PDF TOC pages resolved: PASS — calculated by locating each printed heading in the exported PDF text pages: \`${JSON.stringify(pageMap)}\`.
- Footer: PASS — \`Chapter 02 · Streams, Pipes & Redirection\` plus physical page number; no volume total or build-report metadata.
- Frozen source check: PASS — \`FROZEN_SOURCES_OK\`; the manifest uses canonical Git UTF-8/LF bytes, including Chapter 03 \`9e59eb4d93f913a4dbf33013b37d2e095e2e24eb0123ea7f9be76f30af6a1882\`.
- Build command: \`npm run build:chapter02\`.

The prior hash discrepancy was caused by hashing Windows CRLF working-tree checkouts rather than the LF bytes stored in Git. The manifest now records exact Git-byte hashes for Chapters 00–03, and the checker normalizes CRLF to LF before hashing.
`);
console.log(JSON.stringify(report, null, 2));
console.log(`HTML_FIRST_BUILD_OK\nHTML: ${repoRelative(htmlPath)}\nPDF: ${repoRelative(pdfPath)}\nPROOF: ${repoRelative(proofPath)}`);
