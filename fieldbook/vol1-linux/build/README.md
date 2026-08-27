# HTML-first Fieldbook build

The reader artifact pipeline is deliberately linear:

1. Read the canonical learner Markdown parts.
2. Render semantic chapter HTML with the shared stylesheet and inline SVG/CSS diagrams.
3. Run the reader-quality gate against the generated HTML.
4. Export the PDF from that HTML in print media.
5. Run the reader-quality gate again and write the build report.
6. Extract and inspect the generated artifacts before publication.

The proof build keeps the approved Chapter 02 Markdown parts as the source. Its renderer replaces the frozen legacy Figure 2.3 text block at the HTML boundary with an accessible inline SVG, so the reader artifact contains no spacing-based technical diagram.

From the repository root:

```bash
cd fieldbook/vol1-linux
node build/build-chapter02-html-first.mjs
node build/check-reader-quality.mjs
node check-frozen-sources.mjs
```

The renderer resolves `marked`, `playwright`, and `pdf-lib` from the project-local `fieldbook/vol1-linux/node_modules` after `npm ci`. `FIELD_BOOK_NODE_MODULES` remains an optional override for a controlled workspace runtime; no machine-specific path is used as a fallback.

The Chapter 02 builder supports two explicit modes. The default `--mode=standalone` includes one chapter cover for a standalone proof artifact. A future volume builder may use `--mode=volume`, which suppresses that chapter cover so the volume owns exactly one cover. The volume cover must retain `BIÊN SOẠN: VÕ TRỌNG PHÚC`.

PDF TOC page numbers are calculated by locating each heading in the first unfooted PDF export, then written into the final HTML before the final PDF export. The footer is deliberately quiet: `Chapter 02 · Streams, Pipes & Redirection` plus the physical page number, with no total-page or build metadata.

Frozen-source hashes use canonical Git UTF-8/LF bytes for every frozen chapter. The previous manifest values for the Windows checkout were CRLF working-tree hashes; the manifest now records the exact Git-byte hashes, and the checker normalizes CRLF checkouts before hashing so line-ending conversion cannot create a false mismatch.

The quality gate is intentionally fail-closed. It rejects diagram figures containing `<pre>` text layouts, requires explicit SVG geometry and accessible labels, checks CSS diagram nodes/arrows, and requires worked-example evidence cues: input/initial state, execution flow, intermediate state, output/result, explanation, failure, and debugging evidence.

Visual inspection remains mandatory after the automated gate: inspect the HTML, then one diagram-heavy PDF page and one lab/example-heavy PDF page. Screenshots are QA outputs, not release content.
