# Chapter 01 — Filesystem Namespace

**Mentor verdict:** ~9/10 — APPROVED + FROZEN.

Public source is split into three ordered parts only to keep import/review
lightweight. Concatenate the parts in the order below to reproduce the current
public learner bytes. Using Git UTF-8/LF bytes, that concatenation has SHA256
`0aa1298f15311ea054a523878b2cfd3426cc89cfcc871c1f086f78fdf9d46ff0`.

Original monolithic approved SHA256 (historical pre-import snapshot):
`291bca6164288965e0b98fb9ce290552593bdccdd296540c7c2beaef48e41efd`.

These hashes are intentionally different. A byte-level audit ruled out line
ending conversion and separator-newline/split-boundary effects: the
LF-normalized public Git bytes still hash to `0aa129...`. The actual source
representation difference is in the path-resolution figure: the public split
and the compared monolithic source use different text-table versus inline-SVG
representations. `FROZEN_SOURCES.sha256` protects the current public Git
learner bytes; the original monolithic snapshot is retained as historical
documentation only.

Read in order:
1. [part-01.md](part-01.md)
2. [part-02.md](part-02.md)
3. [part-03.md](part-03.md)
