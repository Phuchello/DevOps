# Chapter 02 HTML-first review proof

- Clean dependency resolution: PASS — project-local `fieldbook/vol1-linux/node_modules` selected by normal Node package resolution; no machine-specific fallback.
- Reader metadata absent: PASS — quality gate rejects Tags, approval/freeze labels, version labels, Study Edition, and the old total-page footer.
- Worked example placement: PASS — after section 2.10 and before section 2.11, with Problem → Input → Command → Execution flow → Intermediate state → Output → Why → Common failure → Debugging evidence.
- PDF TOC pages resolved: PASS — calculated by locating each printed heading in the exported PDF text pages: `{"2-1-mot-cau-hoi-on-gian-output-cua-command-i-au":3,"2-2-hieu-input-va-output-truoc-khi-hoc-thuat-ngu":3,"2-3-standard-input-stdin":4,"2-4-standard-output-stdout":4,"2-5-standard-error-stderr":5,"2-6-file-descriptors-0-1-and-2":6,"2-7-output-redirection":6,"2-8-append-redirection":6,"2-9-input-redirection":7,"2-10-stderr-redirection-2":7,"2-11-gop-stdout-va-stderr":8,"2-12-pipes":9,"2-13-vi-sao-pipe-khong-phai-temporary-file":9,"2-14-exit-status-khac-error-output-the-nao":9,"2-15-nhung-loi-thuong-gap-va-cach-debugging":10,"2-16-stop-recall":10,"2-17-bai-lab-co-huong-dan":11,"2-18-iem-kiem-tra-cuoi-chapter":11}`.
- Footer: PASS — `Chapter 02 · Streams, Pipes & Redirection` plus physical page number; no volume total or build-report metadata.
- Frozen source check: PASS — `FROZEN_SOURCES_OK`; the manifest uses canonical Git UTF-8/LF bytes, including Chapter 03 `9e59eb4d93f913a4dbf33013b37d2e095e2e24eb0123ea7f9be76f30af6a1882`.
- Build command: `npm run build:chapter02`.

The prior hash discrepancy was caused by hashing Windows CRLF working-tree checkouts rather than the LF bytes stored in Git. The manifest now records exact Git-byte hashes for Chapters 00–03, and the checker normalizes CRLF to LF before hashing.
