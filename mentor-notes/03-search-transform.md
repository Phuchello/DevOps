# Mentor Notes 03 — Search & Transform

## Expected reasoning

- `grep -F` literal, regex modes pattern semantics.
- `find` selects filesystem objects; `grep` selects content.
- `xargs` creates argv and has whitespace/empty-input hazards.
- `awk`/`cut` require a tested field/delimiter contract.
- A correct-looking summary needs sample/raw verification.

## Failure Lab repair pattern

Shrink fixture, separate select/parse/action, preserve raw matches, test empty input and names with whitespace. Mutation comes only after list/review.

## Rubric

3 points semantics; 2 input contract; 2 safe boundaries; 2 validation; 1 prevention.
