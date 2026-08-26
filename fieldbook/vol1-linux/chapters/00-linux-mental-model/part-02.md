4. Shell gọi builtin hoặc chạy executable tương ứng.
5. Một process thực thi; process đó có identity, PID, memory và file descriptors.
6. Process dùng interface của OS để lấy thông tin cần thiết.
7. Kết quả được ghi ra stdout; terminal hiển thị text.
8. Shell nhận exit status để biết command kết thúc theo contract nào.

<figure class="book-figure diagram-flow" id="fig-00-3">
  <div class="flow-node">Bạn / keyboard</div>
  <div class="flow-arrow">↓ input text</div>
  <div class="flow-node accent">Terminal emulator</div>
  <div class="flow-arrow">↓ session</div>
  <div class="flow-node accent">Shell parse + resolve</div>
  <div class="flow-arrow">↓ execute</div>
  <div class="flow-node">Process</div>
  <div class="flow-arrow">↓ syscall</div>
  <div class="flow-node strong">Kernel → resource → stdout</div>
  <figcaption>Hình 0.3 — Một command là một chuỗi bước qua nhiều layer, không phải một hành động nguyên khối.</figcaption>
</figure>

```bash
id
```

Output mẫu như `uid=1000(...) gid=1000(...) groups=...` chỉ minh họa format. User, group và group membership trên máy bạn có thể hoàn toàn khác.

<div class="callout"><div class="label">Plain language</div>
Khi command fail, đừng vội kết luận “Linux hỏng”. Hỏi xem lỗi xảy ra khi terminal nhận input, shell resolve tên, process chạy, kernel kiểm tra resource hay output quay về terminal.</div>

## 0.6 Program và Process khác nhau thế nào?

Bạn cài `nginx` trên disk nhưng chưa start service. File executable của Nginx là **program**: code/data có thể được chạy. Khi Nginx được start, kernel quản lý một hoặc nhiều **process**: những lần chạy cụ thể, có state riêng.

| Khái niệm | Ý nghĩa đơn giản | Evidence thường gặp |
|---|---|---|
| Program | Nội dung có thể được thực thi, thường nằm trên storage | executable path, package/file metadata |
| Process | Một instance của program đang chạy | PID, UID, state, memory, parent, open FDs |

<figure class="book-figure diagram-dual" id="fig-00-4">
  <div class="dual-panel">
    <div class="dual-title">Program on disk</div>
    <div class="dual-items">/usr/bin/id</div>
    <div class="dual-arrow">execute ↓</div>
    <div class="dual-result">Process<br><small>PID / UID / state / memory</small></div>
  </div>
  <div class="dual-divider"></div>
  <div class="dual-panel">
    <div class="dual-title">Một program, nhiều lần chạy</div>
    <div class="dual-items">instance A · instance B · instance C</div>
    <div class="dual-arrow">mỗi instance có state riêng</div>
    <div class="dual-result kernel">kernel theo dõi từng process</div>
  </div>
  <figcaption>Hình 0.4 — Program là thứ có thể chạy; process là một lần chạy cụ thể được kernel theo dõi.</figcaption>
</figure>

### Thử quan sát process

```bash
ps -p $$ -o pid,ppid,user,stat,comm
```

`$$` là PID mà shell expose cho chính nó trong Bash. Output là snapshot; nó không phải lịch sử đầy đủ của process. Nếu shell khác không hỗ trợ đúng cú pháp này, hãy ghi lại shell thực tế và hỏi mentor trước khi suy diễn.

<div class="concept"><div class="label">Kết nối DevOps</div>
Khi bạn xem `ps`, bạn đang hỏi kernel về process đang tồn tại, không phải chỉ kiểm tra file program trên disk. Đây là nền tảng để hiểu service manager, containers và process trees ở các chapter sau.</div>

## 0.7 Kernel là gì?

Kernel là phần lõi của OS có quyền điều phối các resource quan trọng. Application trong **user space** không được tự ý điều khiển mọi hardware theo cách nó muốn; nó phải đi qua các cơ chế kernel cung cấp.

Nếu browser bị chậm, nhiều layer có thể liên quan: process của browser, memory pressure, filesystem, network stack hoặc remote server. Kernel không “sửa” mọi symptom thay cho bạn; kernel tạo ra boundary, state và interfaces để bạn quan sát.

<div class="two">
<div class="concept"><div class="label">Kernel quản lý</div>Process/CPU scheduling, memory, filesystem, network stack và devices.</div>
<div class="warning"><div class="label">TRAP</div>“Kernel = toàn bộ Linux” là quá đơn giản. Distribution còn có shell, utilities, daemons, libraries, package manager và applications trong user space.</div>
</div>

### Một tên kernel không trả lời mọi câu hỏi

```bash
uname -r
```

Lệnh này cho biết kernel release đang chạy. Nó không cho biết service nào healthy, disk còn bao nhiêu chỗ hay network route có đúng không. Mỗi command có một evidence contract hẹp hơn điều người mới thường tưởng.

<div class="example"><div class="label">Ví dụ</div>
Nếu `uname -r` chạy thành công, điều đó chứng minh session có thể lấy thông tin kernel. Nó không chứng minh web application đang listen trên port 443.</div>

## 0.8 System Call là gì?

Giả sử program muốn đọc `/etc/hostname`. Program không tự đi xuống SSD và không tự bypass permission. Process yêu cầu OS thực hiện operation thông qua **system call (syscall)**.

Các tên bạn sẽ gặp gồm `open()`, `read()`, `write()`, `socket()` và `execve()`. Ở Chapter 00, bạn chưa cần học API hay register-level details. Hãy nhớ vai trò: syscall là interface để process yêu cầu kernel làm một operation có kiểm tra.

<figure class="book-figure diagram-flow" id="fig-00-5">
  <div class="flow-node accent">Process muốn đọc file</div>
  <div class="flow-arrow">↓ open / read</div>
  <div class="flow-node strong">System call boundary</div>
  <div class="flow-arrow">↓ kernel checks</div>
  <div class="flow-node">Kernel</div>
  <div class="flow-arrow">↓</div>
  <div class="flow-node accent">File resource / result</div>
  <figcaption>Hình 0.5 — Syscall là cây cầu: process yêu cầu, kernel kiểm tra và quản lý, resource trả về kết quả hoặc error.</figcaption>
</figure>

### Plain language

Một process có thể nói “tôi muốn đọc file này”, nhưng kernel mới quyết định operation đó có hợp lệ theo identity, permission và state hiện tại hay không. Nếu bị từ chối, error là evidence về một boundary nào đó; thêm `sudo` ngay có thể che mất boundary thật.

### Thử một operation an toàn

```bash
cat /etc/hostname
printf 'exit=%s\n' "$?"
```

Lệnh đầu đọc một file thường tồn tại; lệnh sau hỏi shell về exit status của command ngay trước đó. Nếu output hoặc status khác dự kiến, ghi lại nguyên văn. Không dùng output mẫu để thay thế observation của bạn.

## 0.9 User Space và Kernel Space

**User space** là vùng nơi Bash, Nginx, Python, SSH và nhiều application chạy với quyền bị giới hạn. **Kernel space** là vùng đặc quyền nơi kernel điều phối CPU, memory, filesystem, network và devices.

Ranh giới này không phải hai máy khác nhau và cũng không phải hai cửa sổ terminal. Nó là một boundary về execution và privilege. Process user-space đi vào kernel thông qua syscall, sau đó kernel trả về data, exit status hoặc error.

<figure class="book-figure diagram-dual" id="fig-00-6">
  <div class="dual-panel">
    <div class="dual-title">USER SPACE</div>
    <div class="dual-items">Bash · Nginx · Python · ssh</div>
    <div class="dual-arrow">system calls ↓</div>
    <div class="dual-result">Process state / stdout / error</div>
  </div>
  <div class="dual-divider"></div>
  <div class="dual-panel">
    <div class="dual-title">KERNEL SPACE</div>
    <div class="dual-items">CPU · memory · filesystem · network · devices</div>
    <div class="dual-arrow">policy + resource management</div>
    <div class="dual-result kernel">Kernel result</div>
  </div>
  <figcaption>Hình 0.6 — User space và kernel space là một security/operations boundary, không phải tên của hai loại terminal.</figcaption>
</figure>

<div class="recall"><div class="label">Check your language</div>
Hoàn thành câu: “Process không tự đọc disk; process ______ kernel qua ______ để kernel ______ operation theo ______.”</div>

## 0.10 Ghép toàn bộ luồng lại

Hãy kể lại `id` theo một câu chuyện duy nhất. Terminal nhận keyboard input. Shell parse và resolve `id`, rồi chạy program tương ứng. Program trở thành process có PID và identity cụ thể. Process dùng OS interfaces để lấy thông tin identity. Kết quả đi ra stdout và terminal hiển thị text; shell nhận exit status.

```text
keyboard
  → terminal emulator
  → shell parse/resolve
  → program becomes process
