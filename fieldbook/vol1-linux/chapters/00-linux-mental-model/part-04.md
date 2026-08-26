7. Kể luồng từ khi gõ `id` tới khi output xuất hiện.
8. Vì sao `cd` hợp lý khi là shell builtin?
9. `sudo` thay đổi execution context như thế nào? Vì sao nó không phải “fix permission” thần kỳ?
10. Vì sao symptom → evidence → hypothesis tốt hơn “restart thử”?

<div class="recall"><div class="label">Một câu để tự chấm</div>
Nếu bạn chỉ nói được định nghĩa, hãy hỏi thêm: <strong>“Tôi sẽ quan sát điều gì trên một máy thật để chứng minh điều đó?”</strong></div>

## 0.16 Guided Hands-on Lab

### Mục tiêu

Thu thập baseline evidence về shell, process và identity mà không thay đổi filesystem, service hay network state đáng kể. Lab này dạy cách hỏi một câu trước mỗi command.

### Chuẩn bị và safety boundary

- Dùng Ubuntu Server VM hoặc Ubuntu Linux test machine.
- Đăng nhập bằng non-root user.
- Nếu dùng VM, tạo snapshot trước các failure lab sau này.
- Không chạy `sudo` trừ khi mentor/lab nói rõ.
- Ghi output thật, không chép output mẫu.

### Bước 1 — Xác định shell/session

```bash
printf 'shell=%s\n' "$0"
```

**Câu hỏi trước khi chạy:** command này đang quan sát layer nào? **Expected pattern:** bạn thấy tên shell tương tự `bash`; shell thực tế có thể khác.

**Your Observation:** Ghi nguyên văn output của máy bạn.

### Bước 2 — Quan sát PID của shell

```bash
printf 'pid=%s\n' "$$"
```

**Câu hỏi:** shell hiện tại expose PID nào? Không coi con số trong ví dụ là con số của bạn.

**Your Observation:** Ghi PID thật và một câu giải thích PID đó thuộc process nào.

### Bước 3 — Xem shell resolve command

```bash
command -v id
command -v printf
```

**Câu hỏi:** shell sẽ gọi builtin, function hay executable path?

**Your Observation:** Ghi hai kết quả và nêu một điểm giống/khác.

### Bước 4 — Xem identity hiện tại

```bash
id
id -un
```

**Câu hỏi:** process/session đang mang UID, GID và groups nào?

**Your Observation:** Ghi UID, GID, username và groups; không paste secrets hoặc token vào note.

### Bước 5 — Ghép evidence

| Evidence | Câu hỏi nó trả lời |
|---|---|
| `$0` | Shell/session đang báo tên gì? |
| `$$` | PID của shell là bao nhiêu? |
| `command -v id` | Shell resolve `id` tới đâu? |
| `id` | Identity/group context hiện tại là gì? |
| `id -un` | Username hiện tại là gì? |

Viết một đoạn ngắn: vì sao năm quan sát này nói về những khía cạnh khác nhau của cùng một session?

<div class="writing-lines" aria-label="Lab observation notes">
  <div><strong>Your Observation:</strong> <span></span></div>
  <div><strong>Your Hypothesis:</strong> <span></span></div>
  <div><strong>Your Conclusion:</strong> <span></span></div>
</div>

<div class="lab"><div class="label">PASS / STOP</div>
Bạn pass lab khi đã chạy các lệnh trong môi trường thật, ghi output thật và giải thích được layer mà mỗi command quan sát. Nếu chưa có Linux VM, dừng ở phần chuẩn bị; đừng giả vờ rằng output mẫu là kết quả thật.</div>

## 0.17 Chapter Checkpoint

### Knowledge checkpoint

Không xem đáp án khi làm lần đầu. Viết câu trả lời ngắn nhưng có reasoning.

1. Vẽ hoặc kể chuỗi `Terminal → Shell → Process → Syscall → Kernel → Resource`.
2. Giải thích vì sao `/usr/bin/id` là program còn PID của một lần chạy `id` là process evidence.
3. Nêu bốn loại resource OS/kernel quản lý.
4. Giải thích tại sao process state của child không tự động đổi state của parent trong ví dụ `cd`.
5. Nêu sự khác nhau giữa user space và kernel space.
6. Mô tả `sudo` bằng hai từ khóa: **policy** và **execution identity**.
7. Cho ba hypothesis cạnh tranh khi service “active” nhưng browser timeout.
8. Chọn một command trong lab và nói rõ nó quan sát layer nào, không đổi state nào.

### Mini interview pressure test

**Interviewer:** “Service báo `active` nhưng browser không truy cập được. Em restart service chứ?”

Trả lời bằng cấu trúc: **symptom → evidence → hypothesis → test**. Nêu ít nhất ba layer muốn kiểm tra trước khi restart và nói evidence nào sẽ làm bạn đổi hypothesis.

### Exit ticket

<div class="exit-ticket" aria-label="Chapter exit ticket">
  <div><span class="check-box"></span><strong>I can name the layer</strong> where a symptom lives before choosing a command.</div>
  <div><span class="check-box"></span><strong>I can preserve evidence</strong> before changing system state.</div>
  <div><span class="check-box"></span><strong>I can explain the flow</strong> from terminal input to kernel-managed resource.</div>
  <div><span class="check-box"></span><strong>I can state a rollback</strong> before a lab becomes destructive.</div>
</div>

Bạn đạt Chapter 00 khi có đủ ba bằng chứng: (1) kể được mental model không nhìn sách, (2) hoàn thành Guided Hands-on Lab bằng output thật, và (3) trả lời được ít nhất 6/8 checkpoint questions bằng reasoning thay vì định nghĩa thuộc lòng.

<hr class="rule">
<p class="small"><strong>Source direction:</strong> Bản canonical này lấy learner-facing pedagogy từ <em>DevOps_Fieldbook_Vol1_Chapter00_Beginner_Edition_V2.html</em>, sau đó bổ sung các operational details về observation, process evidence, command resolution, production troubleshooting và hiring reasoning từ bản condensed legacy. V3.1 chỉ thay đổi cách trình bày; không dùng HTML V2 làm canonical source.</p>
