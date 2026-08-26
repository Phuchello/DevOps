# Repository & Release Rules

## 1. Một source of truth

Canonical learner content = Markdown. HTML là reader layout artifact chính; PDF là derivative export từ HTML.

```text
Markdown → Semantic HTML + inline SVG/CSS diagrams → PDF exported from that HTML
```

Reader artifacts phải được build theo thứ tự này, rồi chạy structural/visual QA trên cả HTML và PDF. Không được sửa PDF riêng để bù cho lỗi trong HTML.

## 2. Report không phải truth

Authority order:
1. actual filesystem / Git tree;
2. command exit code + stdout/stderr;
3. artifact hash;
4. extracted release artifact;
5. state/report documentation.

Nếu PROJECT_STATE nói file đã xóa nhưng `find` vẫn thấy file → state doc sai.

## 3. Canonical release pipeline

```text
validate source tree
→ verify frozen hashes
→ build
→ stage clean tree
→ package canonical release
→ extract release to fresh directory
→ validate extracted release
→ emit manifest/hash
→ release
```

Không zip whole workspace.

## 4. Frozen chapter rule

Khi APPROVED + FROZEN: lưu SHA256 canonical Markdown; chapter sau không được thay đổi bytes chapter cũ; technical bug muốn sửa phải mở explicit revision.

## 5. Regression checks

- canonical chapter allowlist;
- không legacy `chapter.md` dễ bị ingest;
- TOC không duplicate numbering/backticks;
- code/table không overflow;
- heading không orphan;
- screenshot filename đúng nội dung;
- PDF phải render/visual inspect, không chỉ tin build exit code 0.
- diagrams không được là ASCII art hoặc topology dựa vào spacing;
- SVG phải có `viewBox`, accessible title/description và explicit geometry;
- worked examples phải có input → execution trace → intermediate state → output/result → explanation → failure/debugging evidence;
- build phải abort với exit code khác 0 nếu reader-quality gate fail.

## 6. Incidents tạo ra rule này

- Agent report invariant PASS nhưng ZIP thật vẫn có 10 `chapter.md` thay vì 8.
- Clean release đúng nhưng upload nhầm whole-workspace ZIP.
- V3 dàn trang đẹp nhưng lấy nhầm condensed Chapter 00.
- `diagram.png` từng capture nhầm explanation page.

Các lỗi được giữ như evidence cho tư duy DevOps: **validate artifact thật**.
