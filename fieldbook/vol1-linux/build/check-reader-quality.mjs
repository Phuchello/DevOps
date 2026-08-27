import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const buildRoot = path.dirname(fileURLToPath(import.meta.url));
const volumeRoot = path.resolve(buildRoot, '..');
const proofRoot = path.join(volumeRoot, 'releases', 'chapter02-html-first');
const htmlPath = path.join(proofRoot, 'chapter02.html');
const pdfPath = path.join(proofRoot, 'chapter02.pdf');
const cssPath = path.join(volumeRoot, 'styles', 'book.css');
const htmlOnly = process.argv.includes('--html-only');
const sourceFiles = [
  path.join(volumeRoot, 'chapters', '02-streams-pipes-redirection', 'part-01.md'),
  path.join(volumeRoot, 'chapters', '02-streams-pipes-redirection', 'part-02.md'),
];

const fail = (message) => {
  console.error(`READER_QUALITY_FAIL: ${message}`);
  process.exitCode = 1;
  throw new Error(message);
};

for (const file of [...sourceFiles, htmlPath, cssPath]) {
  if (!fs.existsSync(file)) fail(`missing required artifact: ${path.relative(volumeRoot, file)}`);
}
if (!htmlOnly && (!fs.existsSync(pdfPath) || fs.statSync(pdfPath).size < 10_000)) fail('proof PDF is missing or unexpectedly small');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const diagrams = [...html.matchAll(/<figure\b[^>]*class="[^"]*diagram-[^"]*"[\s\S]*?<\/figure>/giu)].map((match) => match[0]);
const svgDiagrams = [...html.matchAll(/<figure\b[^>]*class="[^"]*diagram-svg[^"]*"[\s\S]*?<\/figure>/giu)].map((match) => match[0]);
const cssDiagrams = [...html.matchAll(/<figure\b[^>]*class="[^"]*diagram-flow[^"]*"[\s\S]*?<\/figure>/giu)].map((match) => match[0]);

if (diagrams.length === 0) fail('proof HTML contains no concept or flow diagram');
if (svgDiagrams.length < 1) fail('proof HTML must contain at least one inline SVG diagram');
for (const [index, diagram] of svgDiagrams.entries()) {
  if (!/<svg\b[^>]*role="img"/iu.test(diagram)) fail(`SVG diagram ${index + 1} has no role="img"`);
  if (!/<svg\b[^>]*viewBox="[^"]+"/iu.test(diagram)) fail(`SVG diagram ${index + 1} has no viewBox`);
  if (!/<title\b[^>]*>[^<]+<\/title>/iu.test(diagram) || !/<desc\b[^>]*>[^<]+<\/desc>/iu.test(diagram)) fail(`SVG diagram ${index + 1} needs title and desc`);
  if (!/<(?:line|path|polyline|polygon|rect|circle)\b/iu.test(diagram)) fail(`SVG diagram ${index + 1} has no explicit geometry`);
}
for (const [index, diagram] of cssDiagrams.entries()) {
  if (!/flow-node/iu.test(diagram) || !/flow-arrow/iu.test(diagram)) fail(`CSS flow diagram ${index + 1} needs explicit node and arrow elements`);
}
if (diagrams.some((diagram) => /<pre\b/iu.test(diagram))) fail('spacing-based ASCII/text diagram found inside a reader figure');
if (diagrams.some((diagram) => /[│┃┌┐└┘├┤┬┴┼╭╮╯╰]/u.test(diagram))) fail('line-drawing box characters found inside a technical diagram');
const tocMatch = html.match(/<div class="toc-list">([\s\S]*?)<\/div>/u);
if (tocMatch && /`/u.test(tocMatch[1])) fail('TOC contains a Markdown backtick');
if (!htmlOnly && tocMatch && /class="toc-page">—<\/span>/u.test(tocMatch[1])) fail('PDF-build HTML TOC still contains unresolved page placeholders');

const forbiddenReaderMetadata = [
  { label: 'Tags: [BEGINNER]', pattern: /Tags:\s*(?:<[^>]+>\s*)*\[BEGINNER\]/iu },
  { label: '[CORE]', pattern: /\[CORE\]/iu },
  { label: 'APPROVED', pattern: /\bAPPROVED\b/iu },
  { label: 'FROZEN', pattern: /\bFROZEN\b/iu },
  { label: 'V3.1', pattern: /\bV3\.1\b/iu },
  { label: 'Study Edition', pattern: /\bStudy Edition\b/iu },
  { label: 'versioned total-page footer', pattern: /Volume 1\s*-\s*Linux Systems & Operations\s+Page\s+\d+\s*\/\s*\d+/iu },
];
for (const forbidden of forbiddenReaderMetadata) if (forbidden.pattern.test(html)) fail(`reader metadata leaked into HTML: ${forbidden.label}`);

const workedExamples = [...html.matchAll(/<section\b[^>]*class="[^"]*\bworked-example\b[^"]*"[^>]*>[\s\S]*?<\/section>/giu)].map((match) => match[0]);
if (workedExamples.length === 0) fail('proof page has no worked-example block');

const evidenceCues = [
  'problem',
  'input / initial state',
  'execution flow',
  'intermediate state',
  'output / result',
  'why',
  'common failure',
  'debugging evidence',
];
for (const [index, example] of workedExamples.entries()) {
  const exampleText = example.toLocaleLowerCase();
  for (const cue of evidenceCues) if (!exampleText.includes(cue)) fail(`worked example ${index + 1} is missing evidence cue: ${cue}`);
}
const section210 = html.search(/id="section-2-10-[^"]*"/iu);
const section211 = html.search(/id="section-2-11-[^"]*"/iu);
const workedExamplePosition = html.indexOf('id="worked-example-stream-routing"');
if (section210 < 0 || section211 < 0 || workedExamplePosition < section210 || workedExamplePosition > section211) fail('worked example must appear after section 2.10 and before section 2.11');
if (!/2>&amp;1|2&gt;&amp;1|2>&1/iu.test(html)) fail('proof chapter does not demonstrate 2>&1');
if (!/class="[^"]*diagram-svg[^"]*"[^>]*id="fig-02-3"/iu.test(html)) fail('proof chapter does not contain the replaced streams diagram');
if (!/\.diagram-svg[\s\S]*\.svg-node/iu.test(css) || !/\.diagram-flow[\s\S]*\.flow-node/iu.test(css)) fail('shared stylesheet lacks deterministic diagram rules');
if (!/@media print/iu.test(css)) fail('shared stylesheet lacks print rules');

if (!htmlOnly) {
  const requireFromVolume = createRequire(path.join(volumeRoot, 'package.json'));
  const { getDocument } = await import(pathToFileURL(requireFromVolume.resolve('pdfjs-dist/legacy/build/pdf.mjs')).href);
  const loadingTask = getDocument({ data: new Uint8Array(fs.readFileSync(pdfPath)), disableWorker: true, useSystemFonts: true });
  const document = await loadingTask.promise;
  const pdfTextPages = [];
  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
    const pdfPage = await document.getPage(pageNumber);
    const content = await pdfPage.getTextContent();
    pdfTextPages.push(content.items.map((item) => item.str || '').join(' '));
    pdfPage.cleanup();
  }
  await document.cleanup();
  const pdfText = pdfTextPages.join('\n');
  for (const forbidden of forbiddenReaderMetadata) if (forbidden.pattern.test(pdfText)) fail(`reader metadata leaked into PDF: ${forbidden.label}`);
  if (!/Chapter 02 · Streams, Pipes & Redirection/iu.test(pdfText)) fail('PDF is missing the quiet Chapter 02 footer');
  if (!/class="toc-page">\d+<\/span>/iu.test(html)) fail('PDF build has no numeric TOC page references');
}

const report = {
  standard: 'html-first-reader-quality',
  sourceFiles: sourceFiles.map((file) => path.relative(path.resolve(volumeRoot, '../..'), file).replaceAll(path.sep, '/')),
  html: path.relative(path.resolve(volumeRoot, '../..'), htmlPath).replaceAll(path.sep, '/'),
  pdf: path.relative(path.resolve(volumeRoot, '../..'), pdfPath).replaceAll(path.sep, '/'),
  pdfValidated: !htmlOnly,
  diagrams: { total: diagrams.length, inlineSvg: svgDiagrams.length, deterministicCss: cssDiagrams.length },
  workedExamples: workedExamples.length,
  workedExampleEvidence: evidenceCues,
  readerMetadata: 'absent',
  tocPagesResolved: !htmlOnly,
  forbiddenDiagramForms: ['ASCII/text topology', 'spacing-based node/arrow layout', 'ASCII inside <figure>'],
};
console.log(JSON.stringify(report, null, 2));
console.log('READER_QUALITY_OK');
