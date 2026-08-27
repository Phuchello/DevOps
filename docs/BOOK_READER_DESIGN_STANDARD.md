# Fieldbook Reader Design Standard

Tài liệu này định nghĩa **reader-facing design** cho các PDF/HTML của DevOps Engineering Fieldbook. Mục tiêu là tạo cảm giác của một technical textbook được biên tập, không phải build report hay artifact nội bộ.

## 0. Artifact order: HTML-first, PDF-second

Mỗi chapter phải đi qua đúng thứ tự:

1. Canonical learner source (Markdown).
2. Chapter HTML semantic, reader-facing.
3. Chapter PDF được export từ chính HTML đó.

HTML là layout artifact chính để review. PDF là derivative dùng cho in/đọc offline; không tạo một bản PDF-only có nội dung hoặc bố cục khác HTML.

## 1. Một cuốn sách chỉ có một bìa

Bìa duy nhất phải chứa:

- `DevOps Engineering Fieldbook`
- tên Volume
- chủ đề Volume
- `BIÊN SOẠN: VÕ TRỌNG PHÚC`

Không lặp lại cover riêng của từng chapter khi ghép Volume.

Builder phải có mode rõ ràng: standalone có thể có một chapter cover; volume
phải suppress chapter covers và chỉ render một volume cover. Volume cover vẫn
giữ dòng `BIÊN SOẠN: VÕ TRỌNG PHÚC`.

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

ASCII art và topology dựa vào khoảng trắng bị cấm trong technical diagram. Không dùng các dòng `-`, `|`, `/`, `\\` hoặc block text để biểu diễn node/arrow. Dùng inline SVG có `viewBox`, geometry rõ ràng và label được neo vào shape/line; hoặc HTML/CSS diagram có node và arrow được định vị xác định. Một diagram phải giữ alignment khi mở trên HTML, export PDF, đổi font và scale trang.

Trong migration của source đã freeze, renderer có thể thay thế một legacy diagram tại HTML boundary mà không đổi bytes Markdown. Từ chapter mới trở đi, canonical source phải chứa SVG hoặc HTML/CSS diagram trực tiếp; legacy block mới là build failure.

Mỗi major concept cần ít nhất một concept diagram, sequence/flow diagram hoặc state table. Arrow phải có một nguồn, một đích và label nói đúng mechanism.

## 7.1 Worked-example contract

Ví dụ có command, config, script hoặc protocol không được dừng ở đoạn code. Reader-facing example phải cho thấy đủ chuỗi:

- Problem và input/initial state.
- Command/config/code.
- Execution flow từng bước.
- Intermediate state nếu có.
- Output/final result.
- Vì sao result xuất hiện.
- Common failure và debugging evidence.

Với protocol/networking, thêm topology ban đầu, message exchange và database/table trung gian. Với program, thêm input, internal trace và state change.

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
- inspect HTML trước, rồi inspect PDF export của cùng artifact;
- kiểm tra inline SVG/CSS diagram không overlap, không phụ thuộc spacing và label không rời khỏi shape/arrow;
- kiểm tra mỗi worked example có input → execution trace → intermediate state → output/result → explanation → failure/debugging evidence;
- visual inspection bắt buộc trước publication.

**Nguyên tắc cuối:** reader nhìn thấy kiến thức; repository giữ quy trình tạo ra kiến thức.
