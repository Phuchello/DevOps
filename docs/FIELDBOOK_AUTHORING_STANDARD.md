# Fieldbook Authoring Standard

## 1. Hai lớp tài liệu

### Study Edition
AI có thể tổng hợp theory, labs, diagrams và hiring intelligence để làm giáo trình.

### Fieldbook Final
Chỉ hoàn thiện sau khi phase đã được học/lab thật; phải thêm learner observations, failure thật, debugging path, lesson learned và evidence. Không được bịa learner đã làm experiment chưa làm.

## 2. Ngôn ngữ

- Explanation: **Tiếng Việt dễ hiểu**.
- Standard technical terminology: **English**.
- Không Việt hóa cưỡng ép process, shell, kernel, stdout, pipeline, health check, rollback, namespace, cgroup...

## 3. Beginner-first rule

Không định nghĩa một khái niệm mới bằng ba khái niệm learner chưa biết.

```text
Everyday problem
→ Small example
→ Visual mental model
→ Plain explanation
→ Technical term
→ Experiment
→ Observation
→ Failure mode
→ Production relevance
```

Không mở bài bằng một định nghĩa trừu tượng nếu một câu hỏi thực tế hoặc experiment nhỏ có thể dẫn vào mechanism trước. Mỗi thuật ngữ mới phải được giải thích bằng plain language trước khi dùng như một tiền đề.

## 3.1 Worked-example evidence

Mọi ví dụ có command, configuration, script hoặc protocol phải hiển thị toàn bộ execution flow:

1. Problem và input/initial state.
2. Command/config/code.
3. Từng bước thực thi và intermediate state.
4. Output hoặc final result.
5. Giải thích vì sao result đó xuất hiện.
6. Common failure và debugging evidence.

Không chấp nhận một ví dụ chỉ có command/config mà không có observation và reasoning. Protocol example phải thêm topology, message exchange và state/database trung gian; program example phải thêm input, internal trace và state change.

## 4. Chapter elements

Tùy topic, chapter nên có mental model, mechanism, examples, command anatomy, guided experiment, lab, break-it, troubleshooting, production scenario, traps, hiring intelligence, follow-up chain, STOP & RECALL, reasoning, challenge và further reading.

Không ép checklist hình thức; learning flow quan trọng hơn số heading.

## 5. Visual rule

Hình phải **dạy**, không phải trang trí. Ưu tiên inline SVG hoặc deterministic HTML/CSS diagram. ASCII/text-based technical diagrams, spacing-based topology và line drawing bằng `-`, `|`, `/`, `\\` không được dùng trong reader artifact. Diagram đẹp nhưng mental model sai = fail technical QA.

Mỗi diagram phải survive HTML rendering và PDF export: SVG có `viewBox`, `<title>`, `<desc>`, geometry explicit, label anchored; CSS diagram phải có node/arrow elements và không dựa vào khoảng trắng. Mỗi major concept cần diagram, flow hoặc state table.

## 6. Lab rule

Learner-facing lab phải có Objective, Prerequisites, Environment, Safety boundary, Setup, Mission, runnable commands/tasks, Expected observation, Your Observation, Reasoning questions, Cleanup và PASS criteria.

Không dùng placeholder `grep ...` như runnable command.

## 7. Publication rule

- Artifact order bắt buộc: canonical Markdown → semantic HTML → PDF exported from HTML.
- A4 portrait.
- Header/footer + page number.
- Không clipping code/table.
- TOC không raw Markdown backticks.
- Không duplicate numbering.
- Chapter 00 V3.1 là golden visual/pedagogy reference.

Visual QA phải inspect HTML trước, sau đó inspect ít nhất một diagram-heavy page và một lab/example-heavy page trong PDF. Fail nếu diagram overlap, topology collapse, footer collide với body, hoặc example thiếu result/trace explanation.

## 8. One-chapter-at-a-time

Sau thất bại batch-transform 01–07, pipeline là:

```text
Author Chapter N only
→ Technical review
→ Beginner review
→ Render PDF/HTML
→ Mentor review
→ Revise
→ Freeze
→ Next chapter
```
