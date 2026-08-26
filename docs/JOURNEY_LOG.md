# Journey Log — Từ “vọc agent” đến learning system DevOps

## 1. Điểm xuất phát

Hành trình bắt đầu từ một nhận định khá thẳng: learner là sinh viên chuẩn bị lên năm 2, đã tình cờ biết “vibe code” và dùng agent khá nhiều, nhưng bắt đầu thấy nguy cơ mình chỉ đang **vọc agent** thay vì tích lũy engineering competence.

Mục tiêu nghề nghiệp được xác định lại:

- trong khoảng nửa năm xây CV đủ sức cạnh tranh DevOps Intern về mặt technical baseline;
- không chạy theo một project khổng lồ mà không hiểu hết;
- mỗi skill quan trọng phải có một project nhỏ, thú vị, đo được và defend được;
- cuối cùng mới có capstone nối toàn bộ lại.

Mentor đánh giá hướng “mỗi skill = một evidence project” là đúng, nhưng chỉ khoảng 7/10 nếu triển khai tool-driven. Roadmap ban đầu được sửa để tránh bốn lỗi: học theo tên tool, thiếu scripting/automation, đánh giá Kubernetes quá cao so với fundamentals và tạo quá nhiều repo nông.

## 2. Luật chống vibe DevOps

Một nguyên tắc được đặt ra:

> “Agent làm được” không được tính là “learner biết làm”.

Agent chuyển vai trò từ builder sang reviewer/examiner/packaging assistant.

Learner phải tự có mental model, command path, evidence, hypothesis và failure/debugging explanation. Quy tắc 70/20/10 và closed-book rebuild D+3/D+7 được thêm vào để chống illusion of competence.

## 3. Hình thành roadmap 6 tháng

Roadmap được chốt theo dependency thay vì độ “hot” của tool:

```text
Linux
→ Networking
→ Containers
→ CI/CD
→ Cloud
→ IaC
→ Kubernetes
→ Observability
→ Capstone
```

Lý do: Docker/Kubernetes cuối cùng vẫn quay về process, filesystem, permission, socket, DNS, CPU/memory và logs.

## 4. Ý tưởng “mỗi phase = một cuốn sách”

Learner đề xuất mỗi phase nên có một cuốn chi tiết gồm theory + practice + lab từ cơ bản tới nâng cao, technical terms giữ English để nâng technical English.

Mentor đồng ý nhưng thêm guardrail:

- sách không được trở thành “vibe writing”;
- Study Edition có thể được AI author từ research;
- Final Fieldbook phải bám vào lab/evidence thật learner đã làm;
- không đặt KPI số trang.

Series dự kiến:

1. Linux Systems & Operations
2. Networking for DevOps
3. Containers & Application Delivery
4. CI/CD & Automation
5. Cloud & Infrastructure as Code
6. Kubernetes, Observability & Reliability

## 5. Hiring Intelligence được thêm vào sách

Learner muốn “xoáy” vào kiến thức nhà tuyển dụng thường hỏi ở JD, MXH và interview reports. Ý tưởng được nâng thành một layer chính thức: Recruiter Focus, Senior Engineer Focus, Common Traps, Scenario Questions, Follow-up Chains, Hands-on Questions và “Why interviewer asks this”.

Không lưu câu hỏi rời; lưu **đường follow-up**. Một Hiring Radar định kỳ cũng được tạo để theo dõi DevOps/SRE Intern/Junior market.

## 6. Source reconnaissance

Ban đầu agent được prompt viết Study Edition dựa trên official sources, nhưng bản đầu chưa đủ lớp source reconnaissance.

Pipeline được sửa thành:

```text
Tier 1 Technical Truth
+ Tier 2 Curriculum Maps
+ Tier 3 Hiring Signals
+ Tier 4 Community Signals
→ SOURCE_CATALOG
→ SOURCE_QUALITY_MATRIX
→ CURRICULUM_COMPARISON
→ KNOWLEDGE_GAP_ANALYSIS
→ SOURCE_MAP
→ Curriculum
```

Mục tiêu là reverse-engineer những curriculum tốt nhất thay vì bảo AI “viết cho tôi sách Linux hay”.

## 7. DEVOPS.zip — vòng review đầu

Bản đầu có architecture tốt nhưng source reconnaissance chưa đủ, BOOK_PLAN và chapter directory mismatch, Chapter 01–02 quá nén, Hiring sample nhỏ và lab/mentor-note có mismatch. Mentor cho khoảng 7/10 và yêu cầu Milestone 0.5 hardening.

## 8. Milestone 0.5 — PASS

Bản sau bổ sung đủ source catalog/comparison/gap analysis/hiring matrices. Curriculum được split rõ hơn:

- Filesystem Namespace
- Streams & Pipelines
- Search & Transform
- Shell Expansion
- Identity & Privilege
- Permission Reasoning
- ACL & Service Access

Hardening gate được duyệt khoảng 8.5/10.

## 9. Foundation 00–07 — handbook chứ chưa phải textbook

Agent expand 00–07 nhưng learner phản hồi đúng một vấn đề quan trọng: PDF 99 trang vẫn quá tóm tắt, nhiều khoảng trắng, ít hình, khó hiểu nếu bắt đầu từ số 0 và thiếu page number. Đây là turning point về pedagogy.

## 10. Chapter 00 Beginner V2

Chapter 00 được làm lại riêng theo chuẩn example trước definition, giải thích server/OS trước kernel, nhiều diagram mental model, terminal mockup, STOP & RECALL, learner observation space và page number/header/footer. Bản này trở thành hướng đúng về content.

## 11. Numbering bug và V3 dùng nhầm source

PDF từng có bug:

```text
1. Bạn...
2. 0. Terminal...
3. 1. Terminal...
```

Root cause: ordered-list auto-numbering chồng lên manual numbering.

Agent được yêu cầu tạo layout V3 nhưng lấy **condensed canonical Chapter 00 cũ** thay vì Beginner V2. Layout đẹp nhưng content regression.

Rule mới:

> V2 = pedagogy đúng. V3 = typesetting engine tốt. V3.1 = ghép hai cái.

## 12. Chapter 00 V3.1 — approved

V3.1 dùng numbering 0.1/0.2/…, A4, TOC, page number, diagrams, labs và beginner-first content. Mentor duyệt khoảng 9/10 và freeze visual language.

## 13. Batch 01–07 thất bại

Khi agent scale V3.1 ra 01–07 một lần, kết quả đẹp nhưng content vẫn nén; Chapter 01 mở bằng deployment/path/namespace quá sớm. Figure inode còn đặt owner/mode/timestamps sai layer.

Quyết định quan trọng:

> **STOP BATCH SCALING. One chapter at a time.**

## 14. Chapter 01 — experiment-first success

Chapter 01 được rewrite từ một file `note.txt`, rồi dẫn learner qua:

```text
filename
→ directory entry
→ inode
→ metadata
→ data blocks
→ path
→ links
→ permission/failure
```

Figure inode được sửa đúng. Chapter 01 đạt khoảng 9/10 và được frozen.

## 15. Repository invariant incident

Trong nhiều vòng, agent report `REPOSITORY_INVARIANT_OK` nhưng ZIP thật vẫn có 10 `chapter.md` vì hai legacy files chưa bị loại. Mentor chạy chính script invariant của agent và nhận exit code 1.

Từ đó dự án chốt rule:

> **filesystem truth > state report**.

Sau đó phát hiện clean release artifact thật sự đúng 8 chapter nhưng user upload whole-workspace ZIP nên lỗi tái xuất hiện. Release UX được sửa thành canonical path rõ ràng và manifest/hash.

Đây được xem như một bài DevOps thực tế ngay trong chính dự án học DevOps.

## 16. Chapter 02 — nhiều vòng QA

Bản đầu có beginner progression tốt nhưng bị viết gần như toàn English, trái language policy.

Các lỗi được bắt và sửa:

- explanation phải Vietnamese + technical terms English;
- Figure input/process/output có arrow ambiguity;
- Ctrl-D/EOF explanation chưa chuẩn;
- PIPESTATUS/Bash arrays quá sớm cho beginner;
- TOC leak backticks;
- lab `> combined.txt 2>&1` không thực sự demonstrate merge;
- placeholder `printf ...` không runnable;
- câu “shell chạy command thì tạo process” mâu thuẫn shell builtin.

Sau revision cuối, Chapter 02 được mentor chấm khoảng **9.2/10 — APPROVED**.

## 17. Trạng thái hiện tại

Đến 2026-08-26:

```text
Chapter 00  APPROVED + FROZEN
Chapter 01  APPROVED + FROZEN
Chapter 02  APPROVED
Chapter 03  next authoring target
```

Quan trọng hơn, learner **không đợi book xong mới học**. Authoring chạy song song; learner bắt đầu Chapter 00 + Ubuntu lab.

## 18. Bài học meta quan trọng nhất

Hành trình này không chỉ tạo tài liệu DevOps. Chính các lỗi trong việc tạo tài liệu đã dạy những nguyên tắc DevOps:

- build pass không đủ → visual/runtime QA;
- report không đủ → inspect artifact;
- source đúng quan trọng hơn layout đẹp;
- release phải reproducible;
- hash bảo vệ frozen state;
- batching quá sớm tạo regression;
- small validated increments tốt hơn big unverified output.

Đó cũng chính là triết lý nghề nghiệp mà repository này muốn chứng minh.
