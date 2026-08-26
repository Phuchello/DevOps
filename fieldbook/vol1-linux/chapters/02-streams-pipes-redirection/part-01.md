# Chapter 02 — Streams, Pipes & Redirection

Tags: `[BEGINNER]` `[CORE]` `[HANDS-ON]` `[PRODUCTION]`

## 2.1 Một câu hỏi đơn giản: output của command đi đâu?

Mở terminal và chạy một command rất nhỏ:

```bash
printf 'hello from the terminal\n'
```

Bạn thấy một dòng trên màn hình. Nhưng dòng đó đã đi đâu trước khi bạn nhìn thấy nó? Command có luôn phải hiện kết quả trên terminal không, hay ta có thể gửi cùng kết quả vào file?

Hãy làm trong một lab directory có thể bỏ đi:

```bash
mkdir -p "$HOME/fieldbook-labs/ch02-streams"
cd "$HOME/fieldbook-labs/ch02-streams"
printf 'first line\n' > message.txt
cat message.txt
```

`printf` tạo text. Dấu `>` bảo shell gửi kết quả vào `message.txt`; `cat` đọc file đó rồi hiện text lên terminal. Đây là problem nhỏ của chapter: **text đi vào đâu và đi ra đâu?** Chưa cần nhớ thuật ngữ Linux. Trước hết, ta chỉ phân biệt input source và output destination.

## 2.2 Hiểu input và output trước khi học thuật ngữ

Một command có thể nhận text từ một nơi và gửi text tới một nơi khác. Hãy tạo file màu, rồi đọc nó:

```bash
printf 'red\nblue\ngreen\n' > colors.txt
cat colors.txt
wc -l colors.txt
```

`wc -l` đếm số dòng. Ở ví dụ này, bạn đưa filename cho `wc`; command đọc file và in kết quả. Quan sát quan trọng: text không tự “thuộc về màn hình”. Terminal chỉ là một destination thường gặp.

<figure class="book-figure diagram-flow" id="fig-02-1">
  <div class="flow-node accent">INPUT SOURCE<br><small>keyboard / file</small></div>
  <div class="flow-arrow">↓</div>
  <div class="flow-node">PROCESS<br><small>a running command</small></div>
  <div class="flow-arrow">↓</div>
  <div class="flow-node strong">OUTPUT DESTINATION<br><small>terminal / file</small></div>
  <figcaption>Figure 2.1 - Mô hình đầu tiên: input đi vào process; process gửi kết quả tới một output destination.</figcaption>
</figure>

Mũi tên luôn đi từ input source tới process, rồi từ process tới output destination. Các phần sau chỉ đặt tên chính xác cho những đường đi này.

## 2.3 Standard Input (stdin)

Một command có thể là **shell builtin** hoặc external program. `printf` thường là Bash builtin và có thể chạy ngay trong shell process; external program thì thường chạy trong process riêng. Dù là builtin hay external program, các khái niệm stdin, stdout, stderr và redirection vẫn áp dụng như nhau. Các diagram ghi PROCESS minh họa trường hợp external command; ta không cần đi sâu hơn vào implementation của shell ở đây.

Một external program chạy như một **process**: một chương trình đang chạy. Process thường có một đường nhận input mặc định, tên là **standard input (stdin)**.

Thử để `cat` đọc trực tiếp từ terminal:

```bash
cat
```

Gõ một dòng ngắn rồi nhấn Enter; `cat` lặp lại dòng nó nhận được. Khi `cat` đang đọc stdin từ một interactive terminal, nhấn `Ctrl-D` trên một dòng trống sẽ báo **end-of-input / EOF** cho lần đọc đó. Điều này không có nghĩa keyboard hoặc terminal ngừng nhận input vĩnh viễn; sau khi `cat` kết thúc, shell lại nhận input bình thường.

Lần hai, đổi input source thành file:

```bash
cat < colors.txt
```

`<` là **input redirection**: shell mở `colors.txt` và nối nó vào stdin của `cat` trước khi `cat` chạy. `cat colors.txt` và `cat < colors.txt` có thể cho cùng text, nhưng cơ chế khác nhau: một bên là filename argument, bên kia là stdin.

## 2.4 Standard Output - stdout

Khi một process tạo ra kết quả bình thường, kết quả đó thường đi qua **standard output (stdout)**. Nếu không có redirection, stdout thường đi tới terminal.

```bash
printf 'one\ntwo\nthree\n'
printf 'one\ntwo\nthree\n' > numbers.txt
wc -l < numbers.txt
```

Experiment thứ hai cho thấy stdout có thể đổi destination mà program không cần biết file tên gì. Shell làm việc nối stdout tới `numbers.txt`; `printf` chỉ ghi kết quả bình thường của nó.

<figure class="book-figure diagram-flow" id="fig-02-2">
  <div class="flow-node accent">keyboard / file</div><div class="flow-arrow">↓ stdin</div>
  <div class="flow-node">process</div><div class="flow-arrow">↓ stdout</div>
  <div class="flow-node strong">terminal / file</div>
  <figcaption>Figure 2.2 - stdin đưa input vào process; stdout mang kết quả bình thường ra ngoài.</figcaption>
</figure>

## 2.5 Standard Error - stderr

Kết quả bình thường không phải là text duy nhất command tạo ra. **standard error (stderr)** là stream riêng thường được dùng cho diagnostic messages: file thiếu, option sai, hoặc permission bị từ chối.

```bash
cat does-not-exist.txt
```

Message báo lỗi thường hiện cùng terminal với stdout, nhưng không vì thế mà nó là stdout. Hai stream tách riêng để bạn có thể lưu kết quả bình thường mà không trộn diagnostic vào đó.

<figure class="book-figure diagram-flow" id="fig-02-3">
  <pre><code>keyboard / file
       │ stdin
       ▼
    process
     ↙     ↘
 stdout   stderr
   ↓         ↓
terminal / file</code></pre>
  <figcaption>Figure 2.3 - Ba stream quen thuộc: stdin đi vào process; stdout và stderr đi ra theo hai đường riêng.</figcaption>
</figure>

<div class="warning"><div class="label">TRAP</div>
Thấy error message trên màn hình không chứng minh nó là normal output. Giữ stdout và stderr tách riêng cho tới khi bạn chủ động merge chúng.</div>

## 2.6 File descriptors 0, 1, and 2

Sau khi hiểu ba stream, ta mới cần **file descriptor**. Đây là integer handle mà process dùng để tham chiếu tới một open I/O resource. Nó không phải physical file: một descriptor có thể tham chiếu terminal, regular file, một đầu pipe, hoặc resource đang mở khác.

| Descriptor | Stream | Công việc thường gặp |
|---:|---|---|
| `0` | stdin | đọc input |
| `1` | stdout | ghi normal output |
| `2` | stderr | ghi diagnostic output |

Shell thiết lập các descriptor/redirection trước khi process chạy. Vì vậy `2>errors.txt` nghĩa là shell đổi destination của descriptor 2, tức stderr; không phải `ls` tự quyết định mọi error phải vào file đó.

## 2.7 Output redirection: `>`

Quay lại câu hỏi đầu: có thể gửi stdout vào file không? Có. `>` redirect stdout vào file và thay thế nội dung cũ nếu file đã tồn tại.

```bash
printf 'old line\n' > replace-me.txt
printf 'new line\n' > replace-me.txt
cat replace-me.txt
```

Observation: chỉ còn `new line`. Visual model là `process stdout → file`; technical term là output redirection. Nếu report bị ngắn bất ngờ, dừng ghi thêm, xem `cat report.txt`, rồi kiểm tra bạn có dùng `>` thay vì append không. Trong DevOps, `>` hợp với report mới; không hợp khi bạn phải giữ evidence cũ.

## 2.8 Append redirection: `>>`

`>>` vẫn redirect stdout, nhưng append vào cuối file thay vì thay thế:

```bash
printf 'first run\n' > run-history.txt
printf 'second run\n' >> run-history.txt
cat run-history.txt
```

Hai dòng đều còn. Với operational log, append có ích nhưng dễ trộn nhiều lần chạy. Ghi timestamp hoặc run ID khi evidence cần phân biệt từng lần.

```text
stdout → file
>   replace old contents
>>  append after old contents
```

## 2.9 Input redirection: `<`

`<` đổi input source của stdin:

```bash
printf 'alpha\nbeta\ngamma\n' > words.txt
wc -l < words.txt
```

File là input source, `wc` là process, terminal nhận stdout. Nếu file không tồn tại:

```bash
wc -l < missing-words.txt
```

Shell không mở được input file nên `wc` không nhận stdin như dự định. Diagnostic đi ra stderr. Debug bằng `pwd` và `ls -l`; đừng vội kết luận `wc` đếm sai.

## 2.10 stderr redirection: `2>`

Để lưu diagnostic riêng, redirect descriptor 2:

```bash
ls colors.txt does-not-exist.txt > normal.txt 2> errors.txt
cat normal.txt
cat errors.txt
```

`ls` xử lý filename có thật bằng stdout và báo filename thiếu bằng stderr. Sau redirection, `normal.txt` giữ normal output; `errors.txt` giữ diagnostic.

<figure class="book-figure diagram-flow" id="fig-02-4">
  <div class="flow-node accent">process</div><div class="flow-arrow">↙ stdout &nbsp;&nbsp;&nbsp; stderr ↘</div>
  <div class="flow-node">normal.txt &nbsp;&nbsp;&nbsp; errors.txt</div>
