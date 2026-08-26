# DevOps Journey — From Fundamentals to Internship-Ready

> **Học cho hiểu hệ thống. Làm để tạo evidence. Sai thì debug đến tận gốc.**

Repository này ghi lại hành trình xây nền tảng DevOps theo hướng Network → DevOps → Platform/SRE. Mục tiêu không phải sưu tập thật nhiều tool hay tạo một project khổng lồ, mà là biến từng năng lực thành thứ có thể **giải thích, thực hành, troubleshoot và chứng minh bằng hệ thống thật**.

## Mục tiêu 6 tháng

Mốc đầu tiên là đạt mức **DevOps Intern Ready+**:

- Linux và networking đủ chắc để tự điều tra sự cố cơ bản.
- Bash/Python automation ở mức thực dụng.
- Container, CI/CD, cloud, IaC, Kubernetes và observability theo đúng thứ tự nền tảng.
- Mỗi project chứng minh một competency rõ ràng.
- Sau cùng mới ghép các competency thành một capstone production-like.

## Cách học

```text
Hiểu → Tự nhớ lại → Làm → Sai → Sửa → Ôn cách quãng
```

Trong lab:

```text
Learn → Build → Break → Debug → Explain → Rebuild → Evidence
```

Một command chạy được chưa chứng minh bạn hiểu hệ thống. Một skill chỉ được tính khi bạn biết **vì sao nó hoạt động, failure nằm ở layer nào, evidence nào cần xem và cách phục hồi khi nó hỏng**.

## Roadmap

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

## DevOps Engineering Fieldbook

Mỗi phase có một volume riêng. **Volume 1 — Linux Systems & Operations** hiện gồm:

| Chapter | Chủ đề |
|---|---|
| 00 | Linux Mental Model |
| 01 | Files, Names & Locations |
| 02 | Streams, Pipes & Redirection |
| 03 | Search, Transform & Inspect |

Đọc source và tài liệu của Volume 1 tại [`fieldbook/vol1-linux/`](fieldbook/vol1-linux/).

Fieldbook được viết theo nhịp:

```text
Mental Model → Mechanism → Experiment → Failure → Debugging → Production → Recall → Lab
```

## Nguồn và hiring intelligence

Tài liệu ưu tiên official documentation, man pages, standards và curriculum uy tín cho technical truth; job descriptions và interview/community signals được dùng để tìm competency, failure pattern và điểm thường bị hỏi sâu.

Chi tiết: [`docs/SOURCE_AND_HIRING_INTELLIGENCE.md`](docs/SOURCE_AND_HIRING_INTELLIGENCE.md)

## Repository map

```text
.
├── README.md
├── PROJECT_STATE.md
├── docs/
└── fieldbook/
    └── vol1-linux/
```

Các quy tắc authoring, review, tooling và lịch sử quyết định vẫn được lưu trong `docs/`; chúng không được đưa vào phần nội dung đọc của cuốn sách.

## Luật vàng

> **Report xanh không đồng nghĩa system đúng. Command output, logs, filesystem state và artifact thật mới là evidence.**

---

**Direction:** Network → DevOps → Platform/SRE  
**Method:** Fundamentals first · Evidence first · Build and debug for real
