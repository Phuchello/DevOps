# Approved Source Hashes

> **CURRENT FREEZE SOURCE OF TRUTH:** `fieldbook/vol1-linux/FROZEN_SOURCES.sha256`
>
> This file is historical documentation of pre-import canonical snapshots. Use the public manifest above for enforcement.

Các hash dưới đây là SHA256 của **canonical combined learner Markdown snapshots** trước khi public GitHub import tách chúng thành `part-XX.md`.

| Chapter | Status | SHA256 |
|---|---|---|
| 00 Linux Mental Model | APPROVED + FROZEN | `85c75ee3f5c8d01f762a3d183418033eb92a2cbddf318c11a44be559840bbfe5` |
| 01 Filesystem Namespace | APPROVED + FROZEN | `291bca6164288965e0b98fb9ce290552593bdccdd296540c7c2beaef48e41efd` |
| 02 Streams, Pipes & Redirection | APPROVED + FROZEN | `cf764ce386bbbe4ff7d4089b5b27b614741c044685cec170a79e8a92cefe2eca` |
| 03 Search, Transform & Inspect | APPROVED + FROZEN | `9e59eb4d93f913a4dbf33013b37d2e095e2e24eb0123ea7f9be76f30af6a1882` |

Không dùng hash này để khẳng định các part files riêng lẻ có cùng hash; chúng là ordered slices của canonical source.

## Public-source hash audit

The current enforcement rule is to concatenate each chapter's public parts in
README order and hash the resulting Git UTF-8/LF bytes. The public manifest
`fieldbook/vol1-linux/FROZEN_SOURCES.sha256` protects those bytes.

| Chapter | Historical/documented snapshot | Current public concatenation | Audit result |
|---|---|---|---|
| 00 | `85c75ee3f5c8d01f762a3d183418033eb92a2cbddf318c11a44be559840bbfe5` | `85c75ee3f5c8d01f762a3d183418033eb92a2cbddf318c11a44be559840bbfe5` | Same bytes |
| 01 | `291bca6164288965e0b98fb9ce290552593bdccdd296540c7c2beaef48e41efd` | `0aa1298f15311ea054a523878b2cfd3426cc89cfcc871c1f086f78fdf9d46ff0` | Actual representation difference; see Chapter 01 README |
| 02 | `cf764ce386bbbe4ff7d4089b5b27b614741c044685cec170a79e8a92cefe2eca` | `cf764ce386bbbe4ff7d4089b5b27b614741c044685cec170a79e8a92cefe2eca` | Same bytes |
| 03 | `9e59eb4d93f913a4dbf33013b37d2e095e2e24eb0123ea7f9be76f30af6a1882` | `9e59eb4d93f913a4dbf33013b37d2e095e2e24eb0123ea7f9be76f30af6a1882` | Same bytes |

For Chapter 01, line-ending and split-boundary tests were performed before
recording the result. The differing historical hash is a pre-import monolithic
snapshot, not the byte sequence enforced for the current public source.
