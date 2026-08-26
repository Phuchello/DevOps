# Lab 03 — Search, Transform & Inspect

Tags: `[CORE]` `[HANDS-ON]` `[PROD]`

## Objective

Xây một parser nhỏ từ input contract rõ ràng, giữ raw evidence, kiểm tra summary và nhận ra schema drift trước khi có mutation.

## Prerequisites

Chapter 03; `grep`, `find`, `awk` hoặc `cut`, `sort`, `uniq`, `tee`, quoting. Không dùng `eval`.

## Environment

VM; fixture dưới `~/fieldbook-labs/search`. Không đọc/modify production logs.

## Safety boundary

Mọi `find` bắt đầu bằng `-print`/list phase. Không `sed -i`, `xargs rm` hay mutation khác trên input thật.

## Initial state

Learner phải viết schema: fields, delimiter, case sensitivity, expected status semantics và output format trước khi tạo fixture.

## Scenario

Một fixture log có timestamp, service, level và message. Tạo raw evidence và summary có thể kiểm tra.

## Mission

1. Dùng `grep -F` để tìm literal `ERROR`.
2. Tạo một case regex metacharacter và so sánh `grep -F`/`grep -E`.
3. Dùng `awk` hoặc `cut` với delimiter đã xác nhận.
4. Đếm theo service bằng `sort`/`uniq -c`.
5. Tìm files theo type/name bằng `find` và list trước khi action.
6. Test filename có whitespace; không dùng `eval`.

## Expected observations

Raw matches phải còn nguyên để audit. Literal/regex có thể trả tập dòng khác nhau dù command đều exit normally. Field parser phụ thuộc delimiter; output đẹp không chứng minh schema đúng. `find` chọn object; `grep` chọn text; `xargs` chuyển text thành argv có side effect potential.

## Learner Observation

```text
Input schema:
Literal match count:
Regex match count:
Summary:
Manual sample check:
Schema-drift symptom:
Filename-with-space result:
Mutation deliberately not run because:
```

## Reasoning questions

- `grep` exit 1 khác exit 2 ở lớp nào?
- Vì sao `cut -d' '` dễ sai trên nhiều spaces?
- Làm sao phát hiện parser thiếu field thay vì in summary sai?
- Khi nào `xargs` không an toàn nếu input đến từ filename list?

## Failure injection

Bắt buộc: delimiter/schema drift. Tuỳ chọn: empty input và filename có whitespace/newline. Không inject bằng cách sửa file hệ thống.

## Cleanup / rollback

Giữ fixture và raw output để review; nếu cleanup, xóa riêng `~/fieldbook-labs/search`. Input fixture phải được restore nguyên bản nếu learner thử transform trên bản copy.

## PASS criteria

- Raw input không bị sửa.
- Summary khớp sample kiểm tra thủ công.
- Input schema assumptions được ghi rõ.
- Unsafe mutation không được thực hiện.
