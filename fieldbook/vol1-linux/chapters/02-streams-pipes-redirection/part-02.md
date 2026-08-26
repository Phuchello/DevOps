  <figcaption>Figure 2.4 - <code>command &gt;normal.txt 2&gt;errors.txt</code> giữ hai stream thành hai evidence file.</figcaption>
</figure>

## 2.11 Gộp stdout và stderr

Khi cần một transcript chung, `2>&1` có nghĩa “đưa stderr (descriptor 2) tới destination hiện tại của stdout (descriptor 1).” Shell đọc redirection từ trái sang phải.

```bash
ls colors.txt does-not-exist.txt > combined.txt 2>&1
cat combined.txt
```

Ở đây stdout đổi sang `combined.txt` trước; sau đó stderr theo destination hiện tại của stdout. So sánh:

```bash
ls colors.txt does-not-exist.txt 2>&1 > other.txt
```

Ở lệnh thứ hai, stderr theo stdout cũ (thường là terminal) trước khi stdout chuyển sang `other.txt`. Thứ tự tạo wiring khác nhau. `cmd > file`, `cmd 2> file`, và `cmd > file 2>&1` vì thế phục vụ ba mục tiêu evidence khác nhau.

## 2.12 Pipes: `|`

Nếu không cần giữ file trung gian, một **pipe** nối stdout của producer process vào stdin của consumer process:

```bash
printf 'alpha\nbeta\nalpha\n' | grep 'alpha'
printf 'alpha\nbeta\nalpha\n' | grep 'alpha' | wc -l
```

`printf` là producer; `grep` lọc text; `wc` là consumer cuối. Pipe không tự động mang stderr. Error từ producer thường vẫn tới terminal, trừ khi bạn chủ động redirect/merge nó.

<figure class="book-figure diagram-flow" id="fig-02-5">
  <div class="flow-node accent">Process A<br><small>stdout</small></div><div class="flow-arrow">│<br>│ pipe<br>▼</div>
  <div class="flow-node strong">Process B<br><small>stdin</small></div>
  <figcaption>Figure 2.5 - Pipe nối stdout của Process A với stdin của Process B; stderr không tự đi qua pipe.</figcaption>
</figure>

## 2.13 Vì sao pipe không phải temporary file?

Pipe chuyển bytes trực tiếp giữa hai process đang chạy. Nó không phải temporary file có tên mà bạn có thể mở sau đó.

```bash
printf 'one\ntwo\nthree\n' | head -n 2
printf 'one\ntwo\nthree\n' > all-lines.txt
head -n 2 all-lines.txt
```

Cả hai có thể hiện hai dòng. Nhưng route thứ hai cố ý giữ `all-lines.txt` làm evidence; route pipe không tạo file đó. Khi cần raw output cho incident, đừng giả định pipe đã giữ evidence cho bạn.

## 2.14 Exit status khác error output thế nào?

Diagnostic output và **exit status** là hai signal khác nhau. Sau khi command kết thúc, shell nhận exit status: `0` thường là success, non-zero nghĩa là command báo một điều cần xử lý.

```bash
grep 'purple' colors.txt
printf 'exit status: %s\n' "$?"
```

Không có match thường làm `grep` trả `1`; điều đó có thể là result hợp lệ, không nhất thiết là command hỏng. Pipeline càng cần thận trọng: consumer cuối có thể tạo output hữu ích dù producer trước đó thất bại.

```bash
grep 'alpha' missing-input.txt | wc -l
printf 'pipeline exit status: %s\n' "$?"
```

Bạn có thể thấy một số đếm từ `wc` trong khi `grep` đã in diagnostic ra stderr. Vì vậy output đẹp không tự chứng minh mọi stage thành công.

### [DEEP-DIVE — BASH PREVIEW]

Trong Bash, `PIPESTATUS` cho biết exit status của từng stage, và `set -o pipefail` thay đổi cách Bash báo pipeline failure. Đây là Bash-specific features; chúng ta sẽ học Bash arrays và shell options đúng cách trong phần Bash for DevOps. Không cần dùng cú pháp đó để pass core lab của chapter này.

## 2.15 Những lỗi thường gặp và cách debugging

| Symptom | Kiểm tra nhỏ nhất | Layer có thể sai |
|---|---|---|
| Không thấy text trong `report.txt` | `cat report.txt`; chạy lại không có `>` trong lab | stdout destination |
| Error vẫn ở terminal | kiểm tra có `2>` chưa | stderr có route riêng |
| Report cũ biến mất | so sánh `>` với `>>` | replace hay append |
| `grep` không in gì | xem `$?` ngay sau command | result/status meaning |
| Pipeline vẫn có count | xem diagnostic và chạy producer riêng | stdout không chứng minh success |
| File merge thiếu error | đọc `2>&1` từ trái sang phải | redirection order |

Debug theo thứ tự: chạy producer một mình; tách stdout/stderr vào hai file disposable; kiểm tra exit status ngay; thêm từng pipe; chỉ merge khi transcript chung thực sự cần thiết.

## 2.16 STOP & RECALL

1. stdin có thể nhận input từ đâu ngoài keyboard?
2. stdout và stderr khác nhau ở mục đích nào?
3. Descriptor 0, 1, 2 là gì, và vì sao không phải physical files?
4. `>` khác `>>` thế nào?
5. Vì sao `cmd > all.txt 2>&1` khác `cmd 2>&1 > all.txt`?
6. Pipe nối stream nào với stream nào?
7. Vì sao pipeline có output chưa đủ để kết luận success?

<div class="recall"><div class="label">One-sentence self-check</div>
Vẽ đường đi cho <code>producer &gt;out.txt 2&gt;err.txt</code>, rồi nói bạn sẽ xem đâu để biết producer có báo success hay không.</div>

## 2.17 Bài lab có hướng dẫn

### Safety boundary

Chỉ dùng `$HOME/fieldbook-labs/ch02-streams`. Không redirect vào source code, `/var/log`, configuration, hay production log. Không dùng `sudo`.

### Mission

1. Tạo `colors.txt` bằng `printf` và đọc lại bằng `cat < colors.txt`.
2. So sánh `>` và `>>` trên `run-history.txt`.
3. Chạy `ls colors.txt does-not-exist.txt > normal.txt 2> errors.txt`; đọc từng file.
4. Chạy `ls colors.txt does-not-exist.txt > combined.txt 2>&1`, rồi chạy `cat combined.txt`; giải thích vì sao normal output và diagnostic output cùng xuất hiện trong file.
5. Chạy command thành công `printf 'alpha\nbeta\nalpha\n' | grep 'alpha' | wc -l`. Sau đó chạy `grep 'alpha' missing-input.txt | wc -l` và ngay lập tức chạy `printf 'pipeline exit status: %s\n' "$?"`. Giải thích vì sao visible count và default Bash pipeline exit status không chứng minh mọi stage thành công.

Core lab không yêu cầu `PIPESTATUS`, Bash arrays, hay `set -o pipefail`.

| Evidence | Quan sát thật | Nó chứng minh | Nó chưa chứng minh |
|---|---|---|---|
| `normal.txt` |  | stdout destination | toàn bộ command success |
| `errors.txt` |  | stderr destination | stdout contents |
| `combined.txt` |  | deliberate merge | original stream provenance |
| `$?` |  | status của command/pipeline vừa chạy | mọi stage của Bash pipeline |

Rollback chỉ trong lab directory:

```bash
rm -f colors.txt words.txt numbers.txt message.txt replace-me.txt run-history.txt normal.txt errors.txt combined.txt other.txt all-lines.txt
```

Kiểm tra `pwd` trước khi cleanup.

## 2.18 Điểm kiểm tra cuối chapter

Bạn sẵn sàng đi tiếp khi có thể: giải thích input source → process → output destination; dùng stdin, stdout, stderr đúng ngữ cảnh; mô tả FD 0/1/2 là integer handles; chọn `>`, `>>`, `<`, `2>`, `2>&1`, hoặc `|` cho một mục tiêu; và kiểm tra diagnostic cùng exit status thay vì nhìn output một mình.

<hr class="rule">
<p class="small"><strong>DevOps connection:</strong> Stream reasoning giúp bạn redirect command output vào log đúng mục đích, giữ error output riêng, chain diagnostic commands, và không nhầm pipeline output với bằng chứng mọi stage đã thành công.</p>
