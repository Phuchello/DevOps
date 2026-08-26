# Project State

## Current Milestone

Milestone 1.5 — Learner-Ready Foundation hoàn tất; Chapters 00–02 are approved and frozen as learner sources; Chapter 03 has been authored and built, awaiting mentor approval; Chapters 04–07 and Part III remain paused.

## Completed Work

- Khởi tạo repository Markdown theo cấu trúc yêu cầu.
- Hoàn thành Milestone 0 architecture:
  - learner competency map;
  - complete Table of Contents;
  - chapter dependency graph;
  - evidence-based hiring priority matrix;
  - lab architecture và assessment model;
  - source catalog và research log.
- Nghiên cứu technical sources ưu tiên từ Ubuntu, GNU Bash, systemd, OpenSSH, Linux kernel docs và Linux man-pages.
- Nghiên cứu hiring signals 2025–2026 từ các job listing ở Ho Chi Minh City / Vietnam và một số role quốc tế hỗ trợ đối chiếu.
- Chọn Ubuntu Server 24.04 LTS làm canonical lab baseline; ghi chú tương thích Ubuntu 26.04 LTS.
- Viết Chapter 00, 01, 02; lab; break-it lab; recall/terminal/troubleshooting/rebuild tests; interview chains; mentor notes riêng.
- Audit phát hiện BOOK_PLAN Chapters 01–07 bị collapse thành hai aggregate implementation files.
- Refactor canonical reading path thành Chapters 01–07 với một mental model/chapter.
- Giữ nội dung aggregate cũ dưới `*-aggregate-legacy.md`; không xóa good content.
- Đồng bộ learner-facing labs với paired failure labs, interview chains và mentor notes.
- Bổ sung Scenario E PATH shadowing vào legacy aggregate failure lab và canonical Chapter 04 failure lab.
- Hoàn thành Milestone 0.5 source reconnaissance và tạo source/curriculum/hiring evidence package.
- Cập nhật POSIX references sang POSIX.1-2024 / The Open Group Base Specifications Issue 8; giữ historical material chỉ ở legacy scope.
- Di chuyển legacy aggregate chapters vào `chapters/_legacy/` để không thể bị nhận nhầm là canonical `chapter.md`.
- Preserve the former condensed Chapter 00 source as `chapters/_legacy/00-orientation-condensed.md`; rebuild canonical Chapter 00 from the V2 beginner HTML pedagogy into `chapters/00-orientation/chapter.md` with the required `0.1`–`0.17` progression.
- Mở rộng canonical Chapters 00–07 với guided experiments, expected observations, failure/debugging paths, production connections, hiring follow-ups và STOP & RECALL.
- Nâng cấp learner-facing Labs 00–07 với Objective, Prerequisites, Environment, Safety boundary, Initial state, Mission, Expected observations, Learner Observation, Reasoning questions, failure injection, cleanup/rollback và PASS criteria.
- Hoàn thành second review trong `references/FOUNDATION_CONTENT_REVIEW.md` với bốn review lenses và qualitative ratings cho Chapters 00–07.
- Hoàn thành publication-layout audit và single-source HTML/PDF build cho Chapter 00 V3.1.
- Tạo A4 screen/print stylesheet, compact front matter, linked TOC, consistent callouts, vector diagrams, terminal cards, learner writing space và content-page footer numbering.
- Tạo `build/chapter00-v3.1.html`, `build/chapter00-v3.1.pdf`, `build/chapter00-v3.1-build-report.json`, named representative PDF-rendered screenshots và automated build validation.
- Freeze Chapter 00 V3.1 as the golden pedagogical and visual template; keep its canonical Markdown source unchanged apart from the approved 0.1 preview-language correction.
- Re-sequence canonical Chapters 01–07 into beginner-first `1.x`–`7.x` textbook sections while preserving the technical backbone, experiments, failure/debugging, DevOps relevance, recall and labs.
- Preserve pre-V3.1 canonical Chapter 01–07 snapshots under `chapters/_legacy/*-pre-v3.1.md` for recoverability and review.
- Add `build/build-chapters-01-07-v3.1.mjs` and generate publication HTML/PDF plus representative screenshots and build reports under `build/chapters-v3.1/`.
- Corrected the filesystem truth for legacy-looking aggregate directories: `chapters/01-filesystem-shell/` and `chapters/02-users-permissions/` contain pointer README files only; historical material remains under `chapters/_legacy/`.
- Added `build/check-repository-invariants.mjs`, which recursively enforces exactly eight canonical `chapter.md` files under `chapters/`.
- Corrected the Chapter 00 section 0.1 preview sentence so it does not use later technical terms before they are introduced.

## Important Decisions

- Content correctness và learner action đứng trước visual polish.
- Không dùng cloud trong baseline; VM + snapshot là mặc định.
- Không dạy Docker trong Volume 1; chỉ xây dựng conceptual bridge từ process, namespace và cgroup.
- Không đưa answer ngay trong learner-facing lab. Answer nằm trong `mentor-notes/`.
- Ratings trong hiring matrix dùng qualitative evidence; không tạo precise percentages từ sample nhỏ.
- Job postings là evidence về observed expectations, không phải population statistics.
- Technical docs là authority cho semantics; community/job pages chỉ dùng cho hiring signal hoặc learning context.
- Không mở rộng Part III cho đến khi learner study Chapters 00–07, real Ubuntu lab execution và mentor approval hoàn tất.

## Files Created

- `README.md`
- `BOOK_PLAN.md`
- `TODO.md`
- `PROJECT_STATE.md`
- `references/SOURCES.md`
- `hiring-intelligence/2026-signal-report.md`
- `hiring-intelligence/priority-matrix.md`
- `labs/ARCHITECTURE.md`
- `chapters/00-orientation/*`
- `chapters/01-filesystem-shell/README.md` (legacy pointer only)
- `chapters/02-users-permissions/README.md` (legacy pointer only)
- `chapters/_legacy/01-filesystem-shell.md`
- `chapters/_legacy/02-users-permissions.md`
- `chapters/01-filesystem-namespace/*` through `chapters/07-acl-service-access/*`
- `failure-labs/00-orientation.md`
- `failure-labs/01-filesystem-shell-aggregate-legacy.md`
- `failure-labs/02-users-permissions-aggregate-legacy.md`
- `interview/00-orientation.md`
- `interview/01-filesystem-shell-aggregate-legacy.md`
- `interview/02-users-permissions-aggregate-legacy.md`
- `mentor-notes/00-orientation.md`
- `mentor-notes/01-filesystem-shell-aggregate-legacy.md`
- `mentor-notes/02-users-permissions-aggregate-legacy.md`
- `references/SOURCE_CATALOG.md`
- `references/SOURCE_QUALITY_MATRIX.md`
- `references/CURRICULUM_COMPARISON.md`
- `references/KNOWLEDGE_GAP_ANALYSIS.md`
- `references/SOURCE_MAP.md`
- `references/VALIDATION_REPORT.md`
- `references/FOUNDATION_CONTENT_REVIEW.md`
- `hiring-intelligence/INTERVIEW_SIGNAL_MAP.md`
- `hiring-intelligence/ROLE_SKILL_MATRIX.md`
- `chapters/01-filesystem-namespace/*` through `chapters/07-acl-service-access/*`

## Validation Performed

- Reviewed the command sets in Chapters 00–02 against the command semantics documented in the linked Ubuntu/GNU/Linux man-page sources.
- Checked that destructive exercises have a VM/snapshot constraint and a rollback instruction.
- Checked that learner-facing labs do not contain the solution or pretend to have an actual result.
- Checked Markdown link targets and repository file references with `rg`.
- Markdown link check: `LOCAL_LINKS_OK`.
- Chapter template check: Chapters 00–02 all `TEMPLATE_OK`.
- Learner-facing scan found no filled `Actual Result` claims.
- WSL exists on the host but distro enumeration returned access denied; Linux commands were not executed in this Windows host workspace. A real Ubuntu VM run remains a learner-side validation step; no output is presented as an actual learner result.
- Milestone 0.5 structural audit: aggregate implementation mismatch resolved by canonical split; legacy archives retained.
- Milestone 0.5 final validation report: `references/VALIDATION_REPORT.md`.
- Final static checks: `LOCAL_LINKS_OK`, `CANONICAL_CHAPTERS_00_07_OK`, `CANONICAL_ASSESSMENT_PAIRS_OK`, all canonical chapters `TEMPLATE_OK`.
- Scaled chapter checks: Chapters 01–07 each contain exactly 17 numbered sections (`1.1`–`7.17`), 17 TOC entries, stable page maps, unique figure IDs, local-link validation and footer/page-density validation.
- Scaled publication outputs: Chapters 01–07 built successfully with 8–10 PDF pages each; representative cover, theory, diagram, recall and lab renders were visually inspected.
- Milestone 1.5 content review: Chapters 00–07 and Labs 00–07 reviewed through beginner/Linux engineer/DevOps-SRE/technical-interviewer lenses; ratings and concrete weaknesses recorded in `references/FOUNDATION_CONTENT_REVIEW.md`.
- Chapter 00 V3.1 layout review: A4 PDF rendered and visually inspected for cover, front matter, 0.x TOC, beginner explanation, diagrams, code, lab, recall and final-page density.
- Publication-layout regression checks: single numbering system, TOC anchors, page-map stability, footer numbering, figure IDs, generated links and PDF page density pass.
- POSIX reference scan: canonical links now target `https://pubs.opengroup.org/onlinepubs/9799919799/`.
- Release verification (2026-08-26): the working tree and a fresh extraction of the canonical `build/release/DEVOPS_FIELD_BOOK_RELEASE.zip` both returned `REPOSITORY_INVARIANT_OK` with exit code `0`. Exact captured stdout is in `build/repository-invariant-result.txt` and `build/packaged-repository-invariant-result.txt`; the matching chapter lists, counts, and ZIP SHA-256 are in `build/package-integrity-report.json` and `build/release/RELEASE_MANIFEST.json`.
- The release gate is `build/package-release.mjs`: it validates the source tree, checks frozen Chapter 00/01 hashes, rebuilds the approved artifacts, packages the repository, extracts the ZIP to a fresh directory, and validates the extracted copy. Any failure exits non-zero and aborts the release.
- Frozen learner sources are recorded in `build/FROZEN_CHAPTER_HASHES.sha256` and checked by `build/check-frozen-chapter-hashes.mjs`.

## Known Issues

- The book does not yet include Parts III–XIII learner chapters; this is intentional at the current stop point.
- Hiring research is a bounded sample of public listings, not a statistically representative survey.
- Some optional commands (`htop`, `dig`, `tcpdump`, `strace`, `getfacl`) may require package installation; each future chapter must label these dependencies.
- V3.1 scaling is complete for Chapters 00–07. Part III and later chapters remain intentionally unstarted.

## Last Safe Checkpoint

2026-08-26 — Chapters 00–02 remain approved and frozen. Chapter 03 has been authored and built with technical, beginner, and visual review completed; it awaits mentor approval. Chapters 04–07 and Part III remain paused.

## Exact Next Action

Await mentor approval of Chapter 03. Do not begin Chapter 04 or Part III.
