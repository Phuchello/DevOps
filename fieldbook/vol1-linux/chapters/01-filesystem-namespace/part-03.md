Đừng sửa bằng cách tạo một file rỗng cùng tên. Thu thập evidence: <code>pwd</code>, <code>ls -ld</code> trên parent, <code>ls -li</code>/<code>stat</code> trên object, <code>readlink</code> nếu có link, rồi test operation thật.</div>

## 1.15 DevOps connection: chỉ sau khi mô hình nhỏ đã rõ

Bây giờ mới mở rộng từ note nhỏ sang system thật. Một application có thể báo “config file missing” dù operator thấy một filename. Những nguyên nhân khác nhau tương ứng với mô hình đã học:

| Symptom | Câu hỏi evidence-first |
|---|---|
| Service dùng relative path | Service bắt đầu từ working directory nào? Có nên dùng absolute path không? |
| `current` symlink tồn tại | `readlink` nói target gì, và operation theo target có read được không? |
| File cuối mode có vẻ đúng | Parent directory nào thiếu `x` cho intended identity? |
| Container không thấy path | Process đó đang nhìn filesystem/mount view nào? Đây là khái niệm nâng cao, không phải giả thuyết đầu tiên cho lab file nhỏ. |
| Deploy đổi version | Pre-check target, metadata/access, post-check read operation và rollback pointer là gì? |

Các từ như service identity, mount namespace và release pointer thuộc operational context lớn hơn. Chúng không thay thế mô hình đầu tiên: chương trình vẫn bắt đầu với một path, đi qua entries, tới inode metadata/data và phải qua access checks.

<div class="concept"><div class="label">Interview habit</div>
Khi được hỏi “file exists nhưng app không đọc được”, đừng trả lời ngay bằng một command. Nêu path context, parent traversal, link target, intended identity và read test. Điều đó cho thấy bạn biết tách evidence theo layer.</div>

## 1.16 STOP & RECALL

Không nhìn phần trên trước khi trả lời:

1. Khi đổi `note.txt` thành `learning-note.txt`, điều gì thay đổi và điều gì không nhất thiết thay đổi?
2. Directory khác file contents ở đâu?
3. Directory entry làm nhiệm vụ gì?
4. Inode metadata có những loại thông tin nào? Nêu ít nhất bốn.
5. Data blocks chứa gì?
6. Relative path phụ thuộc vào điều gì?
7. Hard link và symlink khác nhau thế nào?
8. Vì sao `x` trên parent directory quan trọng để đọc file bên trong?
9. Một dòng `ls` chưa chứng minh điều gì về operation `cat`?

<div class="recall"><div class="label">Một câu để tự chấm</div>
Kể mô hình theo đúng thứ tự: <strong>filename → directory entry → inode number → inode metadata → data blocks</strong>. Sau đó nói nơi path và permission tham gia vào một read operation.</div>

## 1.17 Guided Hands-on Lab

### Mục tiêu

Tạo một file nhỏ, chứng minh filename khác data, quan sát inode metadata, so sánh hard link với symlink, rồi tạo và khôi phục một permission failure trong disposable directory.

### Chuẩn bị và safety boundary

- Ubuntu VM hoặc Ubuntu Linux environment có shell cơ bản.
- Chỉ dùng `$HOME/fieldbook-labs/ch01-files`.
- Không dùng `sudo`; lab này không cần root.
- Không chạy recursive `chmod`, `rm`, `chown` hay `find -delete`.
- Nếu command khác expected shape, ghi output thật và state hiện tại thay vì ép nó thành kết quả mẫu.

### Mission

1. Tạo `learning-note.txt` bằng `printf` và đọc lại bằng `cat`.
2. Đổi tên file, rồi giải thích vì sao contents còn nguyên.
3. Dùng `ls -li` và `stat` để ghi filename, inode number, size, mode, owner và timestamps.
4. Tạo `hard-note.txt` và `shortcut-note.txt`; ghi inode/link count/target, sau đó test `cat` qua từng name.
5. Tạo `private/inside.txt`, bỏ rồi khôi phục owner `x` trên directory `private`; ghi symptom, evidence và rollback.
6. Chạy `namei -l` trên path private và chỉ ra component nào quyết định failure.

### Learner observation

| Evidence | Observation thật | Điều nó chứng minh | Điều nó chưa chứng minh |
|---|---|---|---|
| `pwd` |  | starting directory | path cuối đọc được |
| `ls -li` |  | names, inode comparison, link count | data contents/access end-to-end |
| `stat` |  | inode metadata | application read thành công |
| `readlink` |  | symlink target text | target còn/readable |
| `namei -l` |  | path components và modes | policy ngoài filesystem |
| `cat` |  | read operation của user hiện tại | service context khác giống hệt |

### Failure/debugging and rollback

Nếu bạn bỏ `x` khỏi `private`, rollback tối thiểu là:

```bash
chmod u+x "$HOME/fieldbook-labs/ch01-files/private"
cat "$HOME/fieldbook-labs/ch01-files/private/inside.txt"
```

Đầu tiên khôi phục đúng component bị đổi, sau đó test đúng operation đã fail. Không “fix” bằng cách copy `inside.txt` ra ngoài hoặc đổi permission toàn bộ lab tree.

### PASS condition

Bạn pass khi có output thật, phân biệt được name/data/inode metadata, giải thích được vì sao hard link và symlink khác nhau, và mô tả được một failure bằng chuỗi `symptom → evidence → hypothesis → smallest rollback → operation retest`.

Làm tiếp [Filesystem Namespace Lab](../../labs/01-filesystem-namespace.md) và [Filesystem Namespace Failure Lab](../../failure-labs/01-filesystem-namespace.md) chỉ sau khi bạn hoàn thành lab nhỏ này.

<hr class="rule">
<p class="small"><strong>Source direction:</strong> Chapter này dùng mô hình POSIX/Linux về directory entries, inode metadata, links, path traversal và permissions. Production cases được đặt sau experiment file nhỏ để người mới có một mental model có thể tự kiểm tra trước khi học release layouts, mounts hoặc service contexts.</p>
