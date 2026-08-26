# Current Status — 2026-08-26

## Learning

- Curriculum foundation đã đủ để learner bắt đầu học thật.
- Learner bắt đầu từ Chapter 00, không chờ hoàn thiện toàn Volume 1.
- Ubuntu VM được ưu tiên cho failure labs vì cần systemd/network/users/storage/SSH/firewall thực tế.

## Fieldbook Vol.1

| Chapter | Mentor verdict | Notes |
|---|---|---|
| 00 Linux Mental Model | **9/10 — APPROVED + FROZEN** | Golden beginner/layout reference |
| 01 Filesystem Namespace | **~9/10 — APPROVED + FROZEN** | Experiment-first; inode/data diagram corrected |
| 02 Streams, Pipes & Redirection | **9.2/10 — APPROVED** | Language/pipe/lab revisions completed |
| 03 Search, Transform & Inspect | Next authoring target | Must be reviewed separately |
| 04–07 | Existing old drafts only | Not approved as learner-ready |

Old drafts 03–07 không được xem là learner canonical. Public repo chỉ publish approved 00–02 ở snapshot này.

## Next learning action

Chapter 00: Terminal vs Shell, Program vs Process, Kernel, Syscall, User space vs kernel space, shell builtin caveat, evidence-first troubleshooting và baseline lab.

## Next authoring action

Chapter 03 only: head/tail, grep, literal vs regex, wc/sort/uniq/cut, find, stdin vs arguments, xargs safe pattern và log investigation.
