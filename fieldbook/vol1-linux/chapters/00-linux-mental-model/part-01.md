# CHAPTER 00 — Linux Mental Model

Tags: `[BEGINNER]` `[CORE]` `[HANDS-ON]` `[PRODUCTION]` `[HIRING]`

## 0.1 Trước khi học Linux: một server là gì?

Hãy bắt đầu bằng một tình huống quen thuộc: bạn mở trình duyệt trên laptop và truy cập một website. Trình duyệt gửi request; một máy khác nhận request, xử lý nó và trả response. Trong tình huống đó, máy nhận request đang đóng vai **server**.

Server không nhất thiết là một chiếc máy lớn trong data center. Laptop, virtual machine (VM) hoặc cloud instance đều có thể là server nếu nó cung cấp một service cho máy khác. “Server” trước hết là **vai trò** của một máy trong một cuộc giao tiếp, không phải một kích thước phần cứng.

### Operating System đứng ở đâu?

Nếu web application phải tự quản CPU, memory, disk, network card và quyền truy cập của mọi process, mỗi application sẽ phải tự xây dựng lại một hệ điều hành. **Operating System (OS)** đứng giữa application và phần cứng để quản lý tài nguyên, bảo vệ các chương trình khỏi nhau và cung cấp các dịch vụ chung.

Ubuntu Server là một **Linux distribution**: Linux kernel cộng với user-space tools, package manager, defaults và nhiều thành phần khác. Vì vậy, “Linux” trong công việc thường có hai nghĩa liên quan nhưng không đồng nhất: kernel Linux và cả distribution/user space chạy xung quanh kernel.

<div class="callout"><div class="label">Mục tiêu của Chapter 00</div>
Sau chapter này, bạn phải kể lại được luồng <strong>Terminal → Shell → Program/Process → System Call → Kernel → Resource</strong>, chạy một baseline lab an toàn và biết vì sao operator nên quan sát trước khi thay đổi trạng thái hệ thống.</div>

<div class="example"><div class="label">Technical English</div>
<strong>Server</strong> là một máy hoặc process cung cấp service. <strong>Operating System</strong> là phần mềm quản lý hardware/resources và cung cấp services cho các program.</div>

<div class="concept"><div class="label">Kết nối DevOps</div>
Khi một web app không truy cập được, “server hỏng” là một mô tả quá rộng. Ta cần hỏi: máy có đang hoạt động không, ứng dụng có đang phục vụ không, đường kết nối có đến đúng nơi không, và máy còn đủ chỗ để làm việc không?</div>

## 0.2 Operating System đang làm gì?

Hãy tưởng tượng hai application cùng muốn dùng CPU và cùng muốn ghi vào disk. Nếu không có OS, hai chương trình có thể tranh giành tài nguyên và ghi đè lên nhau. OS tạo ra các quy tắc để phân phối, cô lập và kiểm tra quyền truy cập.

### Nói bằng ngôn ngữ đơn giản

OS thường làm bốn việc mà người mới cần nhìn thấy trước:

- quản lý **process** và thời gian CPU;
- quản lý **memory**;
- đặt tên, đọc, ghi và bảo vệ **filesystem**;
- cung cấp đường vào **network** và thiết bị.

OS không làm cho mọi application “đúng”. Nó cung cấp cơ chế và ranh giới; application, service manager và operator vẫn có thể cấu hình sai.

<figure class="book-figure diagram-dual" id="fig-00-1">
  <div class="dual-panel">
    <div class="dual-title">Applications / user space</div>
    <div class="dual-items">Bash · Nginx · Python · SSH</div>
    <div class="dual-arrow">yêu cầu dịch vụ ↓</div>
    <div class="dual-result kernel">Operating System / kernel</div>
  </div>
  <div class="dual-divider"></div>
  <div class="dual-panel">
    <div class="dual-title">Resources</div>
    <div class="dual-items">CPU · memory · files · network · devices</div>
    <div class="dual-arrow">được kiểm tra và quản lý</div>
    <div class="dual-result">state / result / error</div>
  </div>
  <figcaption>Hình 0.1 — Application không tự quản mọi resource; OS cung cấp cơ chế, policy boundary và kết quả quan sát được.</figcaption>
</figure>

### Thử một quan sát read-only

Trên một Linux VM, chạy:

```bash
uname -a
```

Lệnh này không “đo toàn bộ OS”. Nó chỉ trả về thông tin về kernel và machine hiện tại. Ghi lại output thật của bạn; output có thể khác ví dụ trên Internet vì mỗi VM có hostname, kernel build và architecture khác nhau.

<div class="warning"><div class="label">Đừng nhảy cóc</div>
Bạn chưa cần nhớ kernel version hay phân biệt mọi distro family. Trước hết hãy giữ một câu: <strong>application cần OS để dùng resource theo các quy tắc mà application không tự kiểm soát toàn bộ.</strong></div>

## 0.3 Terminal là gì?

Bạn mở một cửa sổ đen và thấy prompt:

```text
phuc@ubuntu:~$
```

Cửa sổ đó là **terminal emulator**. Nó nhận keyboard input, gửi input tới session và hiển thị text output. Nó giống như một cửa sổ giao tiếp; bản thân cửa sổ không phải Linux kernel và cũng không tự hiểu `id`, `cd` hay `ls`.

### Terminal và shell không phải một thứ

| Thành phần | Nó làm gì? | Hình dung đơn giản |
|---|---|---|
| Terminal emulator | Hiển thị cửa sổ, nhận input và render output | Mặt trước để giao tiếp |
| Shell | Đọc command text, parse syntax và điều phối việc chạy | Người phiên dịch |
| Kernel | Quản lý process, memory, filesystem, network và devices | Lớp lõi có quyền quản lý resource |

<figure class="book-figure terminal-figure" id="fig-00-2">
  <div class="terminal-label">Một cửa sổ terminal</div>
  <div class="terminal-window">
    <div><span class="terminal-prompt">phuc@ubuntu:~$</span> id</div>
    <div class="terminal-output">uid=1000(phuc) gid=1000(phuc) groups=1000(phuc),...</div>
    <div class="terminal-dim">Cửa sổ hiển thị text; shell phía sau mới đọc và xử lý command.</div>
  </div>
  <figcaption>Hình 0.2 — Terminal là giao diện text. Đừng gán trách nhiệm parse command cho terminal.</figcaption>
</figure>

### Thử phân biệt bằng một câu hỏi

Khi bạn đóng terminal, bạn đã đóng một giao diện và thường làm foreground session thay đổi. Điều đó không đồng nghĩa mọi process trong máy đều bị xóa. Hãy tập hỏi: “Tôi đang nói về cửa sổ, shell session hay process bên trong?”

<div class="recall"><div class="label">STOP &amp; RECALL</div>
Nói thành lời: <strong>Terminal khác Shell ở đâu?</strong> Câu trả lời cần có hai phần: terminal nhận/hiển thị input-output; shell đọc syntax và quyết định cách xử lý command.</div>

## 0.4 Shell là gì?

**Shell** cũng là một program. Ubuntu thường dùng Bash, nhưng Bash không phải là kernel và cũng không phải terminal. Khi bạn gõ `id`, Bash đọc dòng text, phân tích nó và quyết định tên `id` sẽ được xử lý như thế nào.

Một command name có thể là:

- shell builtin, do Bash tự xử lý;
- alias hoặc function trong session;
- executable file mà shell tìm được qua `PATH`.

### Ví dụ: shell resolve command thế nào?

```bash
command -v id
```

Một output thường gặp là `/usr/bin/id`. Điều đó có nghĩa là trong session hiện tại, shell resolve tên `id` tới executable đó. Nếu shell báo builtin, function hoặc một path khác, đó là evidence về môi trường hiện tại, chưa tự động là lỗi.

<div class="example"><div class="label">Đọc command như một engineer</div>
Đừng bắt đầu bằng câu “lệnh này dùng để làm gì?”. Hãy hỏi “mình cần evidence nào?”. Ở đây, evidence cần là: <strong>shell sẽ chạy cái gì khi mình gõ <code>id</code>?</strong></div>

### Một experiment nhỏ

Chạy `command -v printf` rồi so sánh với `command -v id`. Bạn đang quan sát shell resolution, không phải đang kiểm tra mọi file có trên disk. Cùng một command text có thể resolve khác nhau trong một shell khác, một `PATH` khác hoặc một container khác.

<div class="concept"><div class="label">Kết nối DevOps</div>
PATH shadowing, alias và shell function có thể làm operator chạy nhầm program. Trước khi tin vào command, hãy xác định shell đang gọi cái gì.</div>

## 0.5 Khi bạn gõ một command, chuyện gì xảy ra?

Ta ghép terminal và shell bằng một command không destructive: `id`.

1. Bạn gõ `id` trong terminal và nhấn Enter.
2. Terminal chuyển input text tới shell đang chạy trong session.
3. Shell parse command, xử lý expansion/redirection nếu có và resolve tên `id`.
