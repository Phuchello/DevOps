# PROJECT STATE — DevOps Journey

**Snapshot:** 2026-08-26  
**Authoritative scope:** trạng thái của repository GitHub này, không phải toàn bộ working directory của các agent trước đó.

## Current milestone

**Volume 1 — Linux Systems & Operations / Foundation learner chapters**

### Approved learner sources

- Chapter 00 — Linux Mental Model: **APPROVED + FROZEN**
- Chapter 01 — Filesystem Namespace: **APPROVED + FROZEN**
- Chapter 02 — Streams, Pipes & Redirection: **APPROVED**; source hiện tại đã qua mentor review.

### Approved source hashes

```text
85c75ee3f5c8d01f762a3d183418033eb92a2cbddf318c11a44be559840bbfe5  Chapter 00
291bca6164288965e0b98fb9ce290552593bdccdd296540c7c2beaef48e41efd  Chapter 01
cf764ce386bbbe4ff7d4089b5b27b614741c044685cec170a79e8a92cefe2eca  Chapter 02
```

## Current learner action

Bắt đầu học **Chapter 00** thật sự:

1. đọc theo section nhỏ;
2. đóng tài liệu và tự giải thích;
3. làm baseline lab trên Ubuntu VM;
4. ghi observation thật;
5. mentor kiểm tra mental model;
6. failure/debugging chỉ được mở sau khi đã tự đưa ra hypothesis.

## Authoring action

Chapter 03 — Search, Transform & Inspect là target tiếp theo. Không được sửa Chapter 00–02 nếu không có technical bug được mentor xác nhận.

## Quality gate

Một chapter chỉ được freeze khi:

- beginner pedagogy pass;
- technical accuracy pass;
- lab command runnable;
- diagram mental model pass;
- language policy pass;
- PDF/HTML visual QA pass;
- frozen previous chapters byte-identical;
- state/report không mâu thuẫn với artifact thật.

## Exact next action

**Learner:** học Chapter 00 + làm Lab 00.  
**Authoring:** Chapter 03 only, review one chapter at a time.  
**Release:** tạo canonical clean release; không zip cả working directory.
