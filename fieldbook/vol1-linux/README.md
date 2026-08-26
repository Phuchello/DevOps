# Volume 1 — Linux Systems & Operations

**Biên soạn: Võ Trọng Phúc**

Volume 1 xây mental model Linux và nền tảng operational troubleshooting trước khi đi sang containers, CI/CD và orchestration.

## Nội dung hiện có

1. [Chapter 00 — Linux Mental Model](chapters/00-linux-mental-model/)
2. [Chapter 01 — Files, Names & Locations](chapters/01-filesystem-namespace/)
3. [Chapter 02 — Streams, Pipes & Redirection](chapters/02-streams-pipes-redirection/)
4. [Chapter 03 — Search, Transform & Inspect](chapters/03-search-transform/)

Mỗi chapter đi từ trực giác → cơ chế → experiment → debugging → ứng dụng DevOps → recall/lab. Các thuật ngữ kỹ thuật chuẩn được giữ bằng English để quen với documentation và môi trường làm việc thực tế.

## Cách học ngắn gọn

```text
Đọc một section nhỏ
→ đóng tài liệu và tự kể lại
→ chạy experiment thật
→ ghi observation
→ sai thì tìm root cause
→ quay lại giải thích bằng lời của mình
```

Đừng học command như một danh sách phải thuộc. Hãy hỏi trước: **“Tôi đang cần evidence gì và command này chứng minh được điều gì?”**

## Cấu trúc thư mục

- `chapters/` — learner source theo từng chapter.
- `labs/` — lab dành cho người học; không đặt mentor solution cạnh bài tập.
- `releases/` — bản đọc HTML/PDF.
- `FROZEN_SOURCES.sha256` — integrity manifest của learner source đã khóa.

Chi tiết về review, versioning và quy trình authoring nằm trong `docs/` ở root repository, không chen vào nội dung của sách.
