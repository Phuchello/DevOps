# Fieldbook Reader Design Standard

Tài liệu này định nghĩa **reader-facing design** cho các PDF/HTML của DevOps Engineering Fieldbook. Mục tiêu là tạo cảm giác của một technical textbook được biên tập, không phải build report hay artifact nội bộ.

## 1. Một cuốn sách chỉ có một bìa

Bìa duy nhất phải chứa:

- `DevOps Engineering Fieldbook`
- tên Volume
- chủ đề Volume
- `BIÊN SOẠN: VÕ TRỌNG PHÚC`

Không lặp lại cover riêng của từng chapter khi ghép Volume.

## 2. Không đưa metadata quy trình vào reader PDF

Các cụm sau **không xuất hiện trong phần đọc của sách**:

- `Study Edition`
- `V3.1`, `Vx.y`
- `Approved`, `Frozen`, `Awaiting review`
- trạng thái publication/build/release
- SHA256, source path, build timestamp
- lời giải thích kiểu “bản gộp hiện chứa…”
- hướng dẫn dành cho agent/reviewer

Những dữ liệu này thuộc Git repository, `PROJECT_STATE.md`, review history hoặc release manifest.

## 3. Front matter tối giản

Volume reader chỉ cần:

1. Cover.
2. Mục lục.
3. Nội dung Chapter 00 → N.

Không thêm nhiều trang `Purpose`, `How to use`, `Publication status`, `Release notes` trước khi người học được vào nội dung.

## 4. Mục lục phải giống sách, không giống dashboard

TOC ưu tiên editorial hierarchy:

- Chapter number nổi bật.
- Chapter title.
- Một dòng key concepts ngắn.
- Page range.
- khoảng thở đều và alignment rõ.

Không dùng từ ngữ trạng thái dự án trong TOC.

## 5. Header/footer yên tĩnh

Footer chuẩn:

```text
Chapter XX · Chapter Name                                  page
```

- Không overlay lên callout/body content.
- Không dùng `Vol. 1 · p. x / y` nổi sát nội dung.
- Giữ safe margin cố định trên mọi trang.

## 6. Chapter bắt đầu thẳng vào nội dung

Khi ghép Volume, bỏ chapter-level cover và chapter-level publishing/front-matter pages. Chapter mở bằng heading thật của bài học rồi đi vào section đầu tiên.

## 7. Hình ảnh phải dạy một mental model

Không thêm decorative stock art vào body. Diagram chỉ tồn tại khi nó làm rõ:

- layer/boundary;
- data flow;
- process/state transition;
- filesystem/network relationship;
- failure/debugging path.

Cover có thể mang tính nhận diện thị giác, nhưng body ưu tiên clarity.

## 8. Language

- Giải thích: tiếng Việt tự nhiên.
- Standard technical terminology: English.
- Không nhồi buzzword để tạo cảm giác “technical”.
- Không dùng giọng văn tự mô tả quá trình sinh tài liệu.

## 9. Reader source và project source tách nhau

GitHub vẫn được phép lưu:

- review scores;
- frozen hashes;
- authoring rules;
- agent/tooling policy;
- release state;
- journey log.

Nhưng khi build PDF/HTML cho người học, renderer phải lọc toàn bộ metadata đó khỏi reader artifact.

## 10. Volume build gate

Trước khi publish một Volume PDF:

- đúng một cover;
- TOC có page mapping đúng;
- không còn chapter cover lặp;
- không có `Study Edition`, version/build status hoặc review vocabulary;
- footer không đè body/callout;
- page number liên tục;
- bookmark hoạt động;
- render thử cover, TOC, chapter opener, diagram-heavy page và lab page;
- visual inspection bắt buộc trước publication.

**Nguyên tắc cuối:** reader nhìn thấy kiến thức; repository giữ quy trình tạo ra kiến thức.
