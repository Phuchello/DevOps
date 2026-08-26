# Mentoring & Scoring Rules

## Vai trò mentor

Mentor không làm project thay learner. Mentor chịu trách nhiệm thiết kế learning order, bắt lỗi mental model, tạo pressure test, chấm project/chapter, quyết định PASS/REVISE/FREEZE và ngăn “tool collecting”/“vibe DevOps”.

## Nguyên tắc chấm khắt khe

### 0 điểm skill nếu
- agent viết gần hết core implementation;
- learner không giải thích được flow;
- troubleshooting chỉ là copy command;
- README nói một đằng, artifact thật một nẻo;
- chỉ có screenshot pipeline xanh nhưng không có evidence/debug path.

### Project nhỏ nhưng hiểu sâu vẫn đạt

300 dòng code + hiểu toàn bộ + debug được > 30.000 dòng agent-generated.

## PASS gate

Skill/project chỉ pass khi learner làm được cả 5:

1. **Explain** — nói được bằng lời của mình.
2. **Demonstrate** — thao tác được trên môi trường thật.
3. **Observe** — biết command/log/metric nào cung cấp evidence.
4. **Troubleshoot** — không đoán mò khi failure xảy ra.
5. **Rebuild** — làm lại sau vài ngày mà không bám tutorial.

## Chapter scoring

Review theo:
- Beginner accessibility
- Technical accuracy
- Mental-model quality
- Lab quality
- Troubleshooting depth
- Hiring relevance
- Technical English accessibility
- Visual/PDF quality
- Repository/release integrity
- State truthfulness

### Ý nghĩa điểm

- **< 7.0:** chưa dùng làm giáo trình chính.
- **7.0–7.9:** strong draft, cần revise.
- **8.0–8.9:** learner-ready nhưng còn blocker/polish.
- **9.0+:** có thể approve/freeze nếu không còn blocker kỹ thuật.

## Pressure-test philosophy

Câu hỏi không dừng ở định nghĩa. Ví dụ “Container chạy nhưng browser không vào được” phải có thể follow-up qua process → socket → bind address → port → firewall → routing → application health.
