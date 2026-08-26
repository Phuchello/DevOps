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

## 4. Chapter elements

Tùy topic, chapter nên có mental model, mechanism, examples, command anatomy, guided experiment, lab, break-it, troubleshooting, production scenario, traps, hiring intelligence, follow-up chain, STOP & RECALL, reasoning, challenge và further reading.

Không ép checklist hình thức; learning flow quan trọng hơn số heading.

## 5. Visual rule

Hình phải **dạy**, không phải trang trí. Ưu tiên SVG/Mermaid/vector/CSS diagram/terminal mockup. Diagram đẹp nhưng mental model sai = fail technical QA.

## 6. Lab rule

Learner-facing lab phải có Objective, Prerequisites, Environment, Safety boundary, Setup, Mission, runnable commands/tasks, Expected observation, Your Observation, Reasoning questions, Cleanup và PASS criteria.

Không dùng placeholder `grep ...` như runnable command.

## 7. Publication rule

- A4 portrait.
- Header/footer + page number.
- Không clipping code/table.
- TOC không raw Markdown backticks.
- Không duplicate numbering.
- Chapter 00 V3.1 là golden visual/pedagogy reference.

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
