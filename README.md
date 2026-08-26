# DevOps Journey — From Fundamentals to Internship-Ready

> Hành trình học DevOps theo nguyên tắc: **hiểu thật, làm thật, tự debug được, rồi mới dùng AI để review và đóng gói**.

Repository này không phải một bộ sưu tập tutorial, cũng không phải một project “ôm hết mọi thứ” được vibe-code bằng agent. Đây là **learning system + engineering evidence system** được xây dựng để biến từng kỹ năng DevOps thành năng lực có thể giải thích, thực hành, troubleshoot và bảo vệ trước câu hỏi phỏng vấn.

## Mục tiêu

Mục tiêu 6 tháng đầu không phải “master DevOps”, mà là đạt mức **DevOps Intern Ready+**:

- Linux và networking đủ chắc để tự điều tra sự cố cơ bản.
- Biết Bash/Python automation ở mức thực dụng.
- Biết containerization, CI/CD, cloud, IaC, Kubernetes và observability theo đúng thứ tự nền tảng.
- Không học tool theo kiểu thuộc command/YAML.
- Có portfolio dạng **mỗi project = bằng chứng cho một competency**.
- Có một capstone production-like sau khi các kỹ năng thành phần đã được chứng minh riêng.

## Triết lý cốt lõi

```text
Hiểu → Tự nhớ lại → Làm → Sai → Sửa → Ôn cách quãng
```

Trong DevOps:

```text
Learn → Build → Break → Debug → Explain → Rebuild → Evidence
```

**Một project chạy được chưa đồng nghĩa với biết DevOps.** Skill chỉ được tính khi có thể giải thích mental model, thao tác độc lập, nhận diện failure mode và debug bằng evidence.

## Roadmap 6 tháng

| Phase | Trọng tâm | Project bằng chứng |
|---|---|---|
| 1 | Linux Systems & Operations | Linux Production Server Lab |
| 2 | Networking for DevOps | Packet-to-Production Lab |
| 3 | Containers & Application Delivery | Production Container Lab |
| 4 | CI/CD & Automation | Zero-Touch Delivery Pipeline |
| 5 | Cloud & Infrastructure as Code | Reproducible Cloud Infrastructure |
| 6 | Kubernetes, Observability & Reliability | Self-Healing Platform Lab |
| Capstone | Tích hợp toàn bộ | Production DevOps Platform |

Chi tiết: [`docs/ROADMAP_6_MONTHS.md`](docs/ROADMAP_6_MONTHS.md)

## AI/Agent được dùng như thế nào?

AI **không phải builder chính** trong quá trình học. Vai trò hợp lệ: reviewer, examiner, research assistant, source aggregator, failure-scenario generator, technical editor và layout/packaging assistant.

Core implementation, lab, troubleshooting path và explanation phải do người học tự thực hiện trước. Xem [`docs/AGENT_POLICY.md`](docs/AGENT_POLICY.md).

## DevOps Engineering Fieldbook

Mỗi phase có một volume riêng. Fieldbook không chỉ có theory mà phải có:

```text
Mental Model
→ Mechanism
→ Example
→ Experiment
→ Failure
→ Debugging
→ Production Relevance
→ Hiring Deep Dive
→ Recall
→ Lab
```

### Volume 1 — Linux Systems & Operations

| Chapter | Trạng thái |
|---|---|
| 00 — Linux Mental Model | ✅ Approved + Frozen |
| 01 — Filesystem Namespace | ✅ Approved + Frozen |
| 02 — Streams, Pipes & Redirection | ✅ Approved + Frozen |
| 03 — Search, Transform & Inspect | ✅ Approved + Frozen |
| 04 | 🟡 Next authoring target |

Canonical learner sources được publish tại [`fieldbook/vol1-linux/`](fieldbook/vol1-linux/).

## Hiring Intelligence

Giáo trình không học theo “tiếng ồn Internet”. Nguồn được chia tầng:

1. **Technical truth** — official documentation, man pages, standards.
2. **Curriculum/competency maps** — Linux Foundation, LFCS, RHCSA và curriculum uy tín.
3. **Hiring signals** — DevOps/SRE Intern & Junior JDs.
4. **Community/interview signals** — tìm câu hỏi, failure pattern và điểm hay bị xoáy; không dùng làm technical authority.

Chi tiết: [`docs/SOURCE_AND_HIRING_INTELLIGENCE.md`](docs/SOURCE_AND_HIRING_INTELLIGENCE.md)

## Repository map

```text
.
├── README.md
├── PROJECT_STATE.md
├── docs/
├── fieldbook/vol1-linux/
└── project/
```

## Luật vàng

> **Report xanh không có nghĩa system thật sự đúng. Filesystem, command output, logs và artifact thực tế mới là evidence.**

Bài học này đã xuất hiện nhiều lần trong chính quá trình xây Fieldbook và được giữ lại trong [`docs/JOURNEY_LOG.md`](docs/JOURNEY_LOG.md).

---

**Status snapshot:** 2026-08-26  
**Direction:** Network → DevOps → Platform/SRE  
**Method:** Fundamentals first, evidence first, AI second.
