  → syscall into kernel
  → identity/resource result
  → stdout
  → terminal display
```

<div class="terminal-figure book-figure">
  <div class="terminal-label">Expected shape - không phải output thật của bạn</div>
  <div class="terminal-window">
    <div><span class="terminal-prompt">learner@ubuntu:~$</span> command -v id</div>
    <div class="terminal-output">/usr/bin/id</div>
    <div><span class="terminal-prompt">learner@ubuntu:~$</span> id</div>
    <div class="terminal-output">uid=1000(learner) gid=1000(learner) groups=...</div>
    <div><span class="terminal-dim">Mỗi máy có thể có path, UID, username và groups khác.</span></div>
  </div>
</div>

<div class="callout"><div class="label">STOP &amp; RECALL</div>
Đóng sách 30 giây. Kể luồng `id` từ keyboard tới output mà không đọc danh sách trên. Nếu bạn bỏ qua Shell, Process hoặc Kernel, quay lại các section 0.3–0.9.</div>

## 0.11 Tại sao cd là trường hợp đặc biệt?

Bạn gõ `cd /tmp` và mong prompt tiếp theo ở `/tmp`. Vì sao shell phải biết `cd`?

Current working directory là state của **một process**. Nếu `cd` là một external program hoàn toàn độc lập, shell cha sẽ tạo child process. Child đổi current directory của chính nó rồi exit; shell cha vẫn ở directory cũ. Kết quả không đạt mục tiêu của người dùng.

<figure class="book-figure diagram-flow" id="fig-00-7">
  <div class="flow-node accent">Bash process<br><small>cwd = /home/learner</small></div>
  <div class="flow-arrow">↓ nếu tạo child</div>
  <div class="flow-node">Child “cd” process<br><small>cwd đổi thành /tmp rồi exit</small></div>
  <div class="flow-arrow">↓ state không chảy ngược</div>
  <div class="flow-node strong">Bash cha vẫn /home/learner</div>
  <figcaption>Hình 0.7 — Process state của child không tự động chảy ngược về parent; vì vậy `cd` cần được shell tự xử lý.</figcaption>
</figure>

### Thử kiểm tra

```bash
type cd
pwd
cd /tmp
pwd
```

`type cd` thường cho biết `cd is a shell builtin`. Bạn vừa quan sát một lý do thiết kế, không chỉ học thuộc một danh sách builtin.

<div class="concept"><div class="label">Kết nối DevOps</div>
Khi debug shell script, hãy phân biệt shell state với child process state. Một lệnh chạy trong subshell có thể thay đổi state của subshell mà không thay đổi shell gọi nó.</div>

## 0.12 sudo thật sự làm gì?

Gặp `Permission denied`, người mới thường thêm `sudo` ngay. Hãy dừng lại và tách ba câu hỏi:

1. Process hiện tại đang mang user/group identity nào?
2. Resource đang yêu cầu permission hoặc policy nào?
3. Command cần quan sát hay cần thay đổi state?

`sudo` đọc policy, xác thực user theo policy đó và chạy command trong một execution context khác, thường với effective UID 0. Nó không biến terminal thành root vĩnh viễn và không “sửa permission” một cách thần kỳ.

<figure class="book-figure diagram-flow" id="fig-00-8">
  <div class="flow-node accent">User process<br><small>UID 1000</small></div>
  <div class="flow-arrow">↓ sudo policy</div>
  <div class="flow-node">sudo</div>
  <div class="flow-arrow">↓ new execution context</div>
  <div class="flow-node strong">Command process<br><small>effective UID may be 0</small></div>
  <figcaption>Hình 0.8 — Sudo thay đổi execution context theo policy; nó không phải một nút “bypass mọi lỗi”.</figcaption>
</figure>

### Quan sát identity trước khi nâng quyền

```bash
id
id -un
```

Ghi UID, GID và groups thật của session. Trong lab, dùng non-root user trước. Chỉ dùng `sudo` khi bước lab nói rõ, và ghi lại vì sao cần quyền đó.

<div class="warning"><div class="label">TRAP</div>
Nếu thêm `sudo` làm command chạy được, bạn mới biết identity đã thay đổi; bạn chưa biết root cause ban đầu là ownership, mode, ACL, path, service policy hay một lỗi khác. Hãy giữ evidence trước khi thử.</div>

## 0.13 Evidence-first troubleshooting

Một symptom có thể có nhiều root cause. Browser không mở được web app có thể do process chết, service manager không start, socket không listening, bind address sai, firewall, route, DNS, application error hoặc resource pressure.

Vì vậy, quy trình cơ bản là:

```text
Symptom → Evidence → Hypothesis → Test → Result → Next hypothesis
```

<figure class="book-figure diagram-flow" id="fig-00-9">
  <div class="flow-node strong">Symptom</div>
  <div class="flow-arrow">↓</div>
  <div class="flow-node">Evidence</div>
  <div class="flow-arrow">↓</div>
  <div class="flow-node accent">Hypothesis</div>
  <div class="flow-arrow">↓</div>
  <div class="flow-node">Test</div>
  <div class="flow-arrow">↓</div>
  <div class="flow-node strong">Result / next step</div>
  <figcaption>Hình 0.9 — Troubleshooting loop: mỗi test nên phân biệt được các hypothesis cạnh tranh.</figcaption>
</figure>

### Ví dụ đơn giản

**Symptom:** browser không mở được web app.

- Người mới: restart Nginx thử.
- Operator: process còn không? service state là gì? socket có listening không? app bind address nào? log nói gì? request fail từ đúng network path nào?

Các lệnh như `ps`, `ss`, `systemctl status`, `journalctl`, `df`, `free`, `ip addr` và `ip route` trả lời các câu hỏi khác nhau. Không command nào tự nó giải thích toàn bộ symptom.

<div class="example"><div class="label">Why read-only first?</div>
Restart có thể làm mất evidence, che một race condition hoặc biến lỗi tạm thời thành lỗi khó tái hiện. Trong production, ghi timestamp, version, process/service state, socket, log, environment và resource snapshot trước khi đổi state.</div>

### Một experiment về exit status

```bash
command-that-does-not-exist
printf 'exit=%s\n' "$?"
```

Hãy quan sát sự khác nhau giữa shell error, program error và exit status. `0` thường có nghĩa là command báo success theo contract của nó; `0` không chứng minh application healthy end-to-end.

## 0.14 DevOps dùng mental model này ở đâu?

Mental model này sẽ quay lại trong toàn bộ Volume 1:

| Tình huống DevOps | Câu hỏi layer đầu tiên |
|---|---|
| Service không chạy | Process, parent/service manager và recent logs là gì? |
| Port không truy cập được | Socket có listening, bind address và route có đúng không? |
| File báo permission denied | Process identity, owner/mode/ACL và path component là gì? |
| Script chạy khác khi CI | Shell, `PATH`, environment, working directory và user là gì? |
| Máy chậm | Process/CPU, memory, disk/inode và network evidence nói gì? |
| Command “không tồn tại” | Shell resolution, executable path và package/image contents là gì? |

### Production connection

Một deploy làm health check fail. Người vận hành có mental model sẽ localize failure trước khi restart liên tục. Họ giữ lại release/version, thời điểm thay đổi, process/service state, listening socket, recent log, environment, file path, resource snapshot và kết quả health check từ đúng nơi cần kiểm tra.

### Hiring connection

Trong phỏng vấn, câu trả lời mạnh không phải là đọc thuộc 20 command. Nó cho thấy bạn biết tách layer và chọn evidence:

> “Service báo active nhưng browser timeout. Em sẽ kiểm tra process/service state, socket và bind address, đường network, application log và resource pressure trước khi restart. Mỗi bước giúp phân biệt một hypothesis.”

Đó là evidence về operational reasoning, không chỉ command recall.

<div class="two">
<div class="concept"><div class="label">Không optimize cho brevity</div>Hãy giải thích đủ để người khác biết bạn đang kiểm tra layer nào và vì sao output có ý nghĩa.</div>
<div class="concept"><div class="label">Không học encyclopedia</div>Chỉ giữ những command giúp trả lời câu hỏi hiện tại. Semantics quan trọng hơn danh sách dài.</div>
</div>

## 0.15 STOP & RECALL

Không đọc lại phần trên trước khi trả lời. Viết bằng lời của bạn, sau đó mới đối chiếu.

1. Server là vai trò gì? Cho một ví dụ laptop hoặc VM đóng vai server.
2. Operating System đứng giữa application và resource để làm những việc gì?
3. Terminal emulator khác shell ở đâu?
4. Program và process khác nhau ở đâu? Nêu hai pieces of process evidence.
5. Kernel quản lý những loại resource nào? Nêu ít nhất bốn.
6. Vì sao process cần system call khi truy cập resource?
