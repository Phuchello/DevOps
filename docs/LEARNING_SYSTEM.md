# Learning System — Cách học DevOps của dự án

## 1. Vấn đề ban đầu

Điểm xuất phát là nhận ra việc dùng coding agent quá nhiều có thể tạo **illusion of competence**: project trông lớn và “xịn”, nhưng chủ project không chắc mình hiểu từng layer, không tự debug được khi có lỗi và không defend được trước câu hỏi follow-up.

Vì vậy mục tiêu học được đổi từ “làm một project DevOps thật lớn” sang **mỗi competency có một bằng chứng nhỏ, rõ ràng và tự defend được; cuối cùng mới tích hợp thành capstone**.

## 2. Chu trình học chuẩn

```text
Hiểu → Tự nhớ lại → Làm → Sai → Sửa → Ôn cách quãng
```

Bản DevOps:

```text
Mental Model
→ Manual Operation
→ Observation
→ Automation
→ Failure Injection
→ Troubleshooting
→ Explain
→ Closed-book Rebuild
```

### Không được đảo thứ tự

- Không học Terraform trước khi hiểu infrastructure được dựng thủ công như thế nào.
- Không học Kubernetes trước khi Linux/network/container fundamentals đủ chắc.
- Không automate một việc chưa hiểu cách vận hành thủ công.

## 3. Cấu trúc một buổi học 60–90 phút

### 10 phút — Map
- Chapter này giải quyết vấn đề gì?
- 3–5 mental model chính là gì?
- Nó nối với chapter trước và production như thế nào?

### 20 phút — Understand
Luôn hỏi: Why does this exist? State nằm ở đâu? Ai quản lý state? Evidence nào chứng minh mental model đúng?

### 20–30 phút — Closed-book recall
Đóng sách. Tự nói/viết lại bằng lời của mình. Chỗ nào không giải thích được là knowledge gap thật.

### 20–30 phút — Lab / Reasoning
Dự đoán trước khi chạy, quan sát output, tạo failure khi được phép, ghi symptom/evidence/hypothesis.

## 4. Evidence-first troubleshooting

```text
Symptom
↓
Evidence
↓
Hypothesis
↓
Test
↓
Result
↓
Next hypothesis / Conclusion
```

Không bắt đầu bằng restart, reinstall hay chmod 777.

Trước khi hỏi AI phải ghi tối thiểu:

```text
Symptom:
Hypothesis:
Evidence:
Commands tried:
Current conclusion:
```

## 5. Closed-book rebuild

Một project/lab chạy được chưa được tính là pass.

- **D+3:** dựng lại không nhìn tutorial.
- **D+7:** oral exam + troubleshooting scenario.

## 6. Mức năng lực mục tiêu

| Skill | 6-month target |
|---|---:|
| Linux | 8/10 |
| Networking | 8/10 |
| Git | 7/10 |
| Bash | 7/10 |
| Python automation | 6/10 |
| Docker | 8/10 |
| CI/CD | 7/10 |
| Cloud | 6/10 |
| Terraform | 6/10 |
| Kubernetes | 6/10 |
| Observability | 6/10 |
| Security basics | 5/10 |
| Troubleshooting | **8/10** |

## 7. Rule 70/20/10

- **70%:** tự làm — terminal, lab, debug, docs.
- **20%:** học — book/docs/video/course.
- **10%:** AI — review, quiz, research, packaging.
