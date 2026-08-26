# Agent / AI Usage Policy

## Mục tiêu

AI là **power tool**, không phải người học thay mình. Agent chuyển từ builder sang **reviewer + examiner + researcher + author/editor + packaging assistant**.

## Agent được phép

- review code/config/chapter learner đã hiểu;
- đối chiếu official docs;
- research curriculum/hiring signals;
- tạo failure scenarios và quiz;
- polish English/terminology;
- chuẩn hóa layout/PDF/HTML;
- tạo source map/TOC/build validation;
- viết Study Edition theo curriculum/source policy;
- đóng gói evidence learner đã thực hiện.

## Agent không được phép thay learner

- không build core project từ zero theo prompt “làm hết cho tôi”;
- không debug trước khi learner tự thu evidence;
- không viết explanation để learner copy như hiểu biết của mình;
- không fake `Actual Result`;
- không tuyên bố lab đã chạy khi chưa execute thật;
- không tự approve chapter/project của chính nó.

## Cách hỏi agent đúng

> Đây là Dockerfile tôi tự viết. Review như Senior DevOps, chỉ ra vấn đề và đặt câu hỏi để tôi tự sửa.

> Symptom / Evidence / Hypothesis / Commands tried của tôi đây. Hãy phản biện debugging path, đừng đưa đáp án ngay.

Không tốt: “Build Docker project hoàn chỉnh cho tôi”, “Fix lỗi này”.

## Actual evidence > agent report

Filesystem truth, command output, artifact hash, rendered PDF và runtime behavior luôn ưu tiên hơn summary/report của agent.

## Human approval gate

Agent có thể ghi `awaiting mentor approval`, nhưng không được tự chuyển thành `approved + frozen` nếu chưa qua human review.
