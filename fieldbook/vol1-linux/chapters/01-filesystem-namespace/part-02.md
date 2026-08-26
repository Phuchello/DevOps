Format này giúp bạn nhìn vài field ngắn gọn trên GNU/Linux. Nếu một hệ thống không hỗ trợ `--format`, quay lại `stat -- learning-note.txt`; đừng thay đổi file chỉ để ép output giống sách.

<div class="warning"><div class="label">TRAP</div>
Owner, mode, timestamps và size là metadata của inode. Chúng không phải file contents và không phải “object data” đứng cạnh data blocks.</div>

## 1.9 Data blocks: nơi file contents được lưu

Khi program đọc `learning-note.txt`, filesystem dùng thông tin từ inode để tìm **data blocks**: các vùng lưu bytes của file trên filesystem. Với file cực nhỏ, filesystem có thể tối ưu cách lưu tùy implementation; mô hình học tập đúng là inode cung cấp thông tin/references cần thiết để filesystem tìm contents, còn data blocks là nơi contents thuộc về.

Hình dưới là mô hình đầy đủ. Nó cố ý không đặt owner, mode hay timestamps dưới data blocks.

<figure class="book-figure diagram-flow" id="fig-01-1">
  <div class="flow-node accent">filename<br><small>learning-note.txt</small></div>
  <div class="flow-arrow">↓ is stored in a</div>
  <div class="flow-node">directory entry</div>
  <div class="flow-arrow">↓ points to an</div>
  <div class="flow-node accent">inode number → inode metadata<br><small>UID/GID, mode, timestamps, size, block references</small></div>
  <div class="flow-arrow">↓ block references locate</div>
  <div class="flow-node strong">data blocks<br><small>file contents (bytes)</small></div>
  <figcaption>Hình 1.1 — Mô hình đúng: filename dẫn qua directory entry tới inode; inode metadata chứa ownership, mode, timestamps, size và block references; data blocks chứa contents.</figcaption>
</figure>

Technical self-check for this figure: filename belongs to the directory entry; inode number identifies the inode within its filesystem; UID/GID, mode, timestamps, size and block references are inode metadata; file contents are data blocks. Không có arrow nào ngụ ý metadata là contents.

## 1.10 Path: chỉ dẫn để đi qua các directory

Một **path** là text nói filesystem phải đi qua các tên directory nào để tới một name cuối. Trong `drafts/idea.txt`, `drafts` là component đầu, `idea.txt` là component cuối. Mỗi phần giữa các dấu `/` là một **path component**.

```bash
printf '%s\n' drafts/idea.txt
cat drafts/idea.txt
```

Dòng `printf` chỉ in text; nó không chứng minh path mở được. `cat` yêu cầu một operation thật: Linux phải lần theo components rồi đọc data. Đây là thói quen quan trọng: phân biệt “tôi có một string trông giống path” với “filesystem mở object thành công”.

<figure class="book-figure diagram-flow" id="fig-01-2">
  <div class="flow-node accent">Path text<br><small>drafts/idea.txt</small></div>
  <div class="flow-arrow">↓ find entry: drafts</div>
  <div class="flow-node">directory drafts</div>
  <div class="flow-arrow">↓ find entry: idea.txt</div>
  <div class="flow-node">inode and metadata</div>
  <div class="flow-arrow">↓ locate contents and check access</div>
  <div class="flow-node strong">read bytes or return an error</div>
  <figcaption>Hình 1.2 — Một path được xử lý từng component. Chỉ sau đó Linux mới có thể thực hiện read operation.</figcaption>
</figure>

## 1.11 Absolute path và relative path

**Absolute path** bắt đầu bằng `/`. Nó bắt đầu từ root directory của filesystem tree, ví dụ `/home/alex/fieldbook-labs/ch01-files/learning-note.txt`.

**Relative path** không bắt đầu bằng `/`. Nó được hiểu tương đối với current working directory của program. Khi shell đang ở lab directory, `learning-note.txt` và `./learning-note.txt` là relative paths. Dấu `.` nghĩa là “directory hiện tại”; `..` nghĩa là parent directory.

```bash
pwd
cat ./learning-note.txt
cat "$HOME/fieldbook-labs/ch01-files/learning-note.txt"
```

`$HOME` là shell variable; shell thay nó bằng home directory trước khi `cat` nhận path. Nó không phải một directory tên ký tự `$HOME` mà kernel tự hiểu.

<div class="example"><div class="label">Everyday consequence</div>
Một relative path giống việc nói “ngăn kéo bên phải” - nó chỉ có nghĩa khi mọi người đang đứng cùng chỗ. Absolute path giống địa chỉ đầy đủ. Cả hai đều hữu ích; bạn chỉ cần biết program đang bắt đầu từ đâu.</div>

## 1.12 Links: thêm một tên, hoặc một pointer bằng text

Một **hard link** là directory entry thứ hai dẫn tới cùng inode. Vì hai entries cùng inode, chúng chia sẻ cùng data và metadata inode. Hard links thường phải nằm trong cùng filesystem, và không phải cách bạn trỏ vào directory trong lab này.

Một **symbolic link** (symlink) là object riêng chứa path text tới target. Nó giống giấy ghi “hãy đi tới địa chỉ này.” Nếu target bị xóa hoặc path text sai, symlink vẫn có thể tồn tại nhưng operation theo nó có thể fail; đó là dangling symlink.

```bash
ln -- learning-note.txt hard-note.txt
ln -s -- learning-note.txt shortcut-note.txt
ls -li -- learning-note.txt hard-note.txt shortcut-note.txt
readlink -- shortcut-note.txt
cat hard-note.txt
cat shortcut-note.txt
```

Expected observation: `learning-note.txt` và `hard-note.txt` có cùng inode number; link count thường tăng. `shortcut-note.txt` có inode riêng và `readlink` in ra text `learning-note.txt`. Hai lệnh `cat` cuối test read operation, không chỉ test tên xuất hiện trong `ls`.

<figure class="book-figure diagram-dual" id="fig-01-3">
  <div class="dual-panel">
    <div class="dual-title">Hard link</div>
    <div class="dual-items">learning-note.txt<br>hard-note.txt</div>
    <div class="dual-arrow">two directory entries ↓</div>
    <div class="dual-result">one inode → same data blocks</div>
  </div>
  <div class="dual-divider"></div>
  <div class="dual-panel">
    <div class="dual-title">Symbolic link</div>
    <div class="dual-items">shortcut-note.txt</div>
    <div class="dual-arrow">its own inode stores ↓</div>
    <div class="dual-result kernel">target path text → target object</div>
  </div>
  <figcaption>Hình 1.3 — Hard link thêm một name cho cùng inode. Symlink là object riêng, lưu path text tới target.</figcaption>
</figure>

## 1.13 Permission trên từng path component

Để mở `drafts/idea.txt`, Linux không chỉ kiểm tra file cuối. Nó phải đi qua directory `drafts`. Với directory, permission bits có nghĩa thực hành khác regular file:

- `r` (read): thường cho phép liệt kê names trong directory;
- `w` (write): thường cho phép tạo, xóa hoặc đổi tên entries, khi kết hợp với điều kiện cần thiết;
- `x` (execute/search): cho phép traverse/search qua directory để tới entry bên trong.

Thử trong lab, rồi khôi phục ngay:

```bash
mkdir -p private
printf 'only a lab example\n' > private/inside.txt
chmod u-x private
cat private/inside.txt
chmod u+x private
cat private/inside.txt
```

Lệnh `chmod u-x private` bỏ search/traverse permission của owner trên directory `private`. Với owner hiện tại, lệnh `cat` đầu có thể bị từ chối dù bạn vừa tạo file bên trong. `chmod u+x private` khôi phục state, rồi `cat` thứ hai phải đọc lại được. Nếu output khác, ghi mode thực tế bằng `ls -ld private` và đừng suy đoán từ môi trường khác.

```bash
namei -l -- "$HOME/fieldbook-labs/ch01-files/private/inside.txt"
```

`namei -l` hiển thị components của path cùng permission view. Đọc từ trái sang phải để tìm component đầu tiên cản operation. Đây là lý do `ls -l inside.txt` một mình không đủ để giải thích access.

## 1.14 Khi “file có đó” nhưng command vẫn fail

Tới đây ta đã có cách debug nhỏ, không cần đoán. Nếu `cat path` fail, hãy đi theo thứ tự:

```text
path text → current directory/root → each directory component → entry/type → inode metadata → access check → read operation
```

Ví dụ an toàn trong lab:

1. Gõ sai name: `cat lernig-note.txt` - symptom là name không được tìm thấy.
2. Đứng sai directory và gõ relative path: `cd "$HOME"` rồi `cat learning-note.txt` - text giống nhau nhưng starting directory khác.
3. Bỏ `x` khỏi `private` như phần 1.13 - target file tồn tại nhưng path traversal fail.
4. Tạo `ln -s missing.txt broken-link.txt`, rồi `cat broken-link.txt` - symlink name tồn tại, target không tồn tại.

<div class="callout"><div class="label">Debug rule</div>
