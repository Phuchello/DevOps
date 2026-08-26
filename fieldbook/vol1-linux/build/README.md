# HTML-first Fieldbook build

The reader artifact pipeline is deliberately linear:

1. Read the canonical learner Markdown parts.
2. Render semantic chapter HTML with the shared stylesheet and inline SVG/CSS diagrams.
3. Run the reader-quality gate against the generated HTML.
4. Export the PDF from that HTML in print media.
5. Run the reader-quality gate again and write the build report.

The proof build keeps the approved Chapter 02 Markdown parts as the source. Its renderer replaces the frozen legacy Figure 2.3 text block at the HTML boundary with an accessible inline SVG, so the reader artifact contains no spacing-based technical diagram.

From the repository root:

```bash
cd fieldbook/vol1-linux
node build/build-chapter02-html-first.mjs
node build/check-reader-quality.mjs
node check-frozen-sources.mjs
```

The renderer uses `marked`, `playwright`, and `pdf-lib`. Set `FIELD_BOOK_NODE_MODULES` to the runtime's `node_modules` directory when those packages are supplied by the workspace; otherwise install the versions declared in `package.json`.

The quality gate is intentionally fail-closed. It rejects diagram figures containing `<pre>` text layouts, requires explicit SVG geometry and accessible labels, checks CSS diagram nodes/arrows, and requires worked-example evidence cues: input/initial state, execution flow, intermediate state, output/result, explanation, failure, and debugging evidence.

Visual inspection remains mandatory after the automated gate: inspect the HTML, then one diagram-heavy PDF page and one lab/example-heavy PDF page. Screenshots are QA outputs, not release content.
