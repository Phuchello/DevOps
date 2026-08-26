# Failure Lab 03 — Search & Transform

## Scenario A — Regex versus literal

Pattern contains `.`, `[` or `*`; match count is wrong.

## Scenario B — Delimiter drift

Log format changes whitespace/field order; summary still looks plausible.

## Scenario C — Unsafe argument boundary

Filename contains spaces; `xargs` action handles it incorrectly.

## Mission

Recover the input contract, preserve raw matches and validate summary counts with a known sample.

## Constraints

No `eval`, no mutation before list/review, no `sed -i` on real system files.

## Hints Level 1

Ask whether the bug is selection, parsing or action.

## Hints Level 2

Use a smaller fixture and explicitly test fixed-string, delimiter and empty-input behaviour.

## Solution

Xem [mentor-notes/03-search-transform.md](../mentor-notes/03-search-transform.md).
