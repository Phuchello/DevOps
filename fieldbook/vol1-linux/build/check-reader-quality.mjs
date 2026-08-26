import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
if (!/class="worked-example"/iu.test(html)) fail('proof page has no worked-example block');

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
for (const cue of evidenceCues) if (!html.toLocaleLowerCase().includes(cue)) fail(`worked example is missing evidence cue: ${cue}`);
if (!/2>&amp;1|2&gt;&amp;1|2>&1/iu.test(html)) fail('proof chapter does not demonstrate 2>&1');
if (!/class="[^"]*diagram-svg[^"]*"[^>]*id="fig-02-3"/iu.test(html)) fail('proof chapter does not contain the replaced streams diagram');
if (!/\.diagram-svg[\s\S]*\.svg-node/iu.test(css) || !/\.diagram-flow[\s\S]*\.flow-node/iu.test(css)) fail('shared stylesheet lacks deterministic diagram rules');
if (!/@media print/iu.test(css)) fail('shared stylesheet lacks print rules');

const report = {
  standard: 'html-first-reader-quality',
  sourceFiles: sourceFiles.map((file) => path.relative(path.resolve(volumeRoot, '../..'), file).replaceAll(path.sep, '/')),
  html: path.relative(path.resolve(volumeRoot, '../..'), htmlPath).replaceAll(path.sep, '/'),
  pdf: path.relative(path.resolve(volumeRoot, '../..'), pdfPath).replaceAll(path.sep, '/'),
  pdfValidated: !htmlOnly,
  diagrams: { total: diagrams.length, inlineSvg: svgDiagrams.length, deterministicCss: cssDiagrams.length },
  workedExampleEvidence: evidenceCues,
  forbiddenDiagramForms: ['ASCII/text topology', 'spacing-based node/arrow layout', 'ASCII inside <figure>'],
};
console.log(JSON.stringify(report, null, 2));
console.log('READER_QUALITY_OK');
