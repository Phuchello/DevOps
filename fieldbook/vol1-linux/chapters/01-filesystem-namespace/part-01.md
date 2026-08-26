# Chapter 01 — Files, Names and Locations

Tags: `[BEGINNER]` `[CORE]` `[HANDS-ON]` `[PRODUCTION]`

## 1.1 Một file là gì khi bạn chỉ muốn ghi một dòng ghi chú?

Bạn mở terminal và muốn tạo một ghi chú nhỏ: “Mình đã học xong Chapter 01.” Bạn đặt tên nó là `note.txt`, rồi ngày mai muốn tìm lại. Câu hỏi đời thường là: **Linux giữ ghi chú đó ở đâu, và cái tên `note.txt` có phải chính là nội dung không?**

Ta chưa cần tình huống vận hành lớn. Chỉ cần một thư mục disposable trong thư mục cá nhân của bạn. Trong chapter này, mọi experiment đều diễn ra ở đó.

<div class="callout"><div class="label">Mục tiêu Chapter 01</div>
Bạn sẽ tự tạo một file nhỏ, phân biệt tên file với nội dung, rồi lần theo cách Linux tìm và mở file đó. Những thuật ngữ nội bộ và tình huống vận hành phức tạp chỉ xuất hiện sau khi mô hình nhỏ này rõ ràng.</div>

<div class="example"><div class="label">Nói đơn giản trước</div>
Tên file giống nhãn trên một ngăn kéo. Nhãn giúp ta tìm; nó không phải những thứ nằm trong ngăn kéo. Linux cũng tách “tên để tìm” khỏi nội dung cần đọc.</div>

## 1.2 Tạo một file nhỏ, an toàn

Trước khi học thuật ngữ, hãy tạo một object - ở đây nghĩa là một thứ trong filesystem như file hoặc directory - mà bạn kiểm soát hoàn toàn.

```bash
cd
mkdir -p fieldbook-labs
cd fieldbook-labs
mkdir -p ch01-files
cd ch01-files
printf 'Mình đã học Chapter 01.\n' > note.txt
cat note.txt
```

`cd` không có argument đưa shell về thư mục cá nhân. `mkdir -p` tạo directory (folder) nếu nó chưa tồn tại. Sau đó, từng lệnh `cd` đưa shell vào một directory vừa tạo. `printf` tạo text; dấu `>` gửi text vào file tên `note.txt`. Vì `>` có thể ghi đè file cũ, ta chỉ dùng nó trong lab directory này. `cat` yêu cầu Linux đọc nội dung file và in ra terminal.

Expected observation: terminal in đúng một dòng bạn vừa viết. Đây là ví dụ output shape; hãy ghi output thật của bạn trong lab, không copy output mẫu.

<div class="warning"><div class="label">Safety boundary</div>
Không thử các lệnh tạo/xóa/đổi quyền trong system directories hoặc thư mục application thật. Nếu bạn gõ sai <code>cd</code>, dừng lại, chạy <code>pwd</code>, rồi trở lại folder <code>fieldbook-labs</code> bạn vừa tạo bằng từng bước nhỏ.</div>

## 1.3 Quan sát filename trước

Hãy hỏi Linux: “Trong directory hiện tại có những tên nào?”

```bash
pwd
ls -l
```

`pwd` nghĩa là *print working directory*: nó in ra directory mà shell đang đứng. `ls` liệt kê tên; `-l` yêu cầu dạng dài hơn. Bạn sẽ thấy một dòng chứa `note.txt`.

Tên `note.txt` là **filename**: text mà ta dùng để gọi file trong một directory. Nó hữu ích, nhưng chỉ là observation đầu tiên. Từ một dòng `ls`, bạn chưa biết Linux lưu nội dung như thế nào, hai tên có thể cùng chỉ một nội dung hay không, hoặc chương trình khác có thể đi tới tên đó không.

<div class="concept"><div class="label">Câu hỏi tốt hơn</div>
Thay vì nói “em đã thấy file”, hãy nói: “Em đã thấy filename <code>note.txt</code> trong directory hiện tại.” Câu thứ hai chính xác hơn và mở ra các câu hỏi tiếp theo.</div>

## 1.4 Filename có phải là data không?

Đổi tên file không nên tự nhiên đổi câu bạn đã viết. Hãy thử một thay đổi nhỏ:

```bash
mv note.txt learning-note.txt
ls -l
cat learning-note.txt
```

`mv` đổi tên hoặc di chuyển một entry. Sau đó, tên cũ `note.txt` không còn trong directory này, nhưng `cat learning-note.txt` vẫn đọc câu cũ. Đây là evidence rằng filename và file contents không phải cùng một thứ.

Ta sẽ gọi file contents là **data**: các bytes mà program đọc hoặc ghi. Trong ví dụ này, data là bytes biểu diễn câu tiếng Việt của bạn. Filename là tên để directory tìm được file đó.

<div class="recall"><div class="label">Dừng 10 giây</div>
Nếu đổi tên `note.txt` thành `learning-note.txt` mà <code>cat</code> vẫn in cùng câu, phần nào đã thay đổi: filename, data, hay cả hai?</div>

## 1.5 Directory là gì?

Directory (thường gọi là folder) không phải một cái túi chứa nguyên xi mọi file. Hãy coi nó là một **bảng tra tên**. Khi bạn nhìn một directory, bạn đang nhìn các cặp “tên này dẫn tới object nào”.

Tạo một directory con để thấy cây tên đơn giản:

```bash
mkdir -p drafts
cd drafts
printf 'Bản nháp đầu tiên.\n' > idea.txt
cd ..
ls -l
ls -l drafts
```

Directory hiện tại có tên `drafts`. Bên trong directory `drafts` có tên `idea.txt`. Bạn vừa đi vào folder con, tạo một file, rồi quay lại folder cha. Phần 1.10 sẽ đặt tên chính xác cho cách Linux viết chỉ dẫn đi qua những folder này.

<div class="example"><div class="label">Visual mental model</div>
Directory hiện tại giống một bảng có các hàng <code>learning-note.txt</code> và <code>drafts</code>. Mỗi hàng là một tên để filesystem tiếp tục tra cứu; nội dung của <code>learning-note.txt</code> không nằm trong chính text của hàng đó.</div>

## 1.6 Directory entry: một hàng trong bảng tra

Một hàng “tên → object” được gọi là **directory entry**. Với ví dụ của ta, directory hiện tại có một entry tên `learning-note.txt`. Entry đó giúp filesystem tiếp tục tìm object đằng sau tên.

Bạn không cần đọc cấu trúc byte của directory để học ý tưởng này. Điều quan trọng là tách hai câu:

1. Directory entry mang filename.
2. Entry dẫn tới inode của object trong filesystem.

**Inode** là thuật ngữ mới. Hãy tạm coi nó là thẻ hồ sơ nội bộ của filesystem cho một object. Phần tiếp theo sẽ quan sát số inode thật, rồi mới nói thẻ hồ sơ đó chứa gì.

```bash
ls -li -- learning-note.txt
```

`-i` yêu cầu `ls` in thêm inode number ở cột đầu. `--` kết thúc options, giúp tên bắt đầu bằng dấu `-` không bị hiểu nhầm là option. Đừng cần nhớ con số; hãy chỉ nhận ra rằng Linux có một số khác với filename để nhận diện object bên trong filesystem đó.

## 1.7 Inode: thẻ hồ sơ của object

**Inode number** là số filesystem dùng để tham chiếu tới inode. Nó không phải tên dễ đọc cho con người, không phải mã duy nhất trên mọi disk, và không nên dùng làm ID vĩnh viễn trong application. Nó có ý nghĩa trong filesystem đang chứa object đó trong thời gian object tồn tại.

```bash
stat -- learning-note.txt
```

`stat` yêu cầu filesystem báo thông tin có cấu trúc về object. Trong output Ubuntu, tìm các dòng như `File:`, `Size:`, `Access:`, `Modify:` và `Inode:`. Các nhãn có thể khác đôi chút theo hệ thống, nhưng ý tưởng là như nhau: filename chỉ là một phần của câu chuyện; inode gắn với nhiều thông tin hơn.

<div class="example"><div class="label">Plain language</div>
Nếu filename là nhãn bên ngoài, inode giống hồ sơ mà filesystem dùng để biết object này có kích thước bao nhiêu, ai sở hữu nó, có quyền gì và nội dung ở những block nào.</div>

## 1.8 Metadata: thông tin về file, không phải file contents

**Metadata** nghĩa là “data about data”: thông tin mô tả object. Với một regular file - file dùng để giữ bytes, không phải directory hay link - inode metadata thường bao gồm UID/GID owner, mode (permission bits), timestamps, size, link count và references tới nơi chứa contents. Chi tiết chính xác phụ thuộc filesystem, nhưng các lớp ý nghĩa này là ổn định.

- **UID/GID**: số nhận diện user và group owner. Chapter 05 sẽ dạy identity kỹ hơn; ở đây chỉ cần biết đây là các con số ownership, không phải text trong file.
- **Mode**: các permission bits như read, write, execute. Chapter 06 sẽ dạy cách suy luận permission đầy đủ.
- **Timestamps**: thời điểm liên quan tới object, ví dụ sửa data hoặc đổi metadata.
- **Size**: số bytes của contents.
- **Block references**: thông tin filesystem dùng để tìm data blocks.

```bash
stat --format='name=%n size=%s bytes inode=%i mode=%A' -- learning-note.txt
```
