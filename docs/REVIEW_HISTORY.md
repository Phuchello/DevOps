# Review & Scoring History

Mục tiêu của bảng này không phải “săn điểm 10”, mà ghi lại **vì sao một artifact được PASS hay bị REVISE**.

| Mốc | Điểm/verdic | Lý do chính |
|---|---|---|
| Ý tưởng portfolio ban đầu | ~7/10 | Hướng mỗi skill = project đúng, nhưng roadmap còn tool-driven, thiếu scripting, overvalue K8s, nguy cơ nhiều repo nông |
| DEVOPS.zip đầu tiên | ~7/10 | Architecture tốt; source reconnaissance thiếu; chapter quá nén; plan/directory mismatch; hiring sample nhỏ |
| Milestone 0.5 hardening | ~8.5/10 PASS | Có source catalog/quality/comparison/gap analysis/hiring matrices; curriculum structure hợp lý hơn |
| Foundation learning gate | ~8.7/10 PASS | 00–07 đủ để bắt đầu học nhưng publication/textbook quality chưa đạt chuẩn beginner cuối |
| Foundation Study Edition 99 pages | REJECT làm book chính | Đúng kỹ thuật nhưng quá tóm tắt, nhiều whitespace, ít hình, thiếu page number; giống handbook hơn textbook |
| Chapter 00 Beginner V2 | Direction approved | Giải thích chậm, visuals, terminal mockup, STOP & RECALL, page number |
| Chapter 00 V3 | REVISE | Layout tốt nhưng lấy nhầm condensed source; pedagogy regression |
| Chapter 00 V3.1 | **9/10 APPROVED + FROZEN** | Beginner pedagogy + V3 typesetting; 0.x numbering; A4; visual/lab tốt |
| Batch Chapters 01–07 | ~7/10 REJECT batch | Chủ yếu reformat; beginner pedagogy chưa đủ; Figure inode sai metadata/data; repo invariant report sai |
| Chapter 01 rewrite | **~9/10 APPROVED + FROZEN** | Experiment-first; filename → entry → inode → metadata → data; diagram corrected; lab/reasoning tốt |
| Chapter 02 first learner-ready pass | ~7.5/10 REVISE | Gần toàn English; diagram direction ambiguous; Ctrl-D; PIPESTATUS quá sớm; TOC backticks; stale release |
| Chapter 02 second pass | ~8.8/10 REVISE | Đã sửa language/diagram/EOF/deep-dive; còn builtin-vs-process và Guided Lab merge command sai |
| Chapter 02 final reviewed pass | **9.2/10 APPROVED** | Builtin accuracy, runnable labs, pipe failure reasoning, Vietnamese + technical English, visual QA pass |
| Chapter 03 content review | **~9.1/10 APPROVED** | `uniq -c` full-line semantics with timestamps corrected by extracting service field; grep-vs-find and stdin-to-xargs diagrams added; stale screenshots cleaned; output semantics tested against the actual fixture |

## Scoring lesson

Điểm thấp không có nghĩa project thất bại. Mỗi lần REVISE tạo ra một rule mới hoặc regression test. Đây chính là mindset reliability: **failure được chuyển thành guardrail**.
