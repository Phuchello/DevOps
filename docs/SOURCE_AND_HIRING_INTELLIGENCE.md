# Source & Hiring Intelligence Policy

## Search broad, filter hard

```text
Search broad
→ Classify source purpose
→ Rank authority
→ Cross-check
→ Identify gaps
→ Build competency map
→ Build curriculum
```

## Tier 1 — Technical Truth
Ubuntu Server docs, Linux man-pages/kernel docs, GNU Bash, systemd, OpenSSH, POSIX và official project docs. Dùng trả lời: **cơ chế thực sự là gì?**

## Tier 2 — Curriculum / Competency Maps
Linux Foundation LFS101/LFS207, LFCS, RHCSA và curriculum uy tín. Dùng trả lời: **learner/operator nên biết gì và sâu đến đâu?**

## Tier 3 — Hiring Market
DevOps Intern, SRE Intern, Junior DevOps, Junior SRE. Ưu tiên TP.HCM → Việt Nam → SEA → international supporting evidence.

## Tier 4 — Community / Interview Experience
Reddit, Stack Overflow, GitHub Discussions, public LinkedIn, engineering blogs, interview reports. Dùng tìm misconceptions, troubleshooting scenarios, follow-up chains và operational pain points. **Không override official technical specification.**

## Hiring Intelligence không phải “300 câu hỏi”

Lưu interview tree, ví dụ:

| Step | Question |
|---:|---|
| 1 | Is the process running? |
| 2 | Is a socket listening? |
| 3 | Is the bind address correct? |
| 4 | Does DNS resolve? |
| 5 | Is the route available? |
| 6 | Is the firewall allowing the traffic? |
| 7 | Is the application healthy? |

The path starts with **Application unreachable** and moves from the local process boundary toward network and application health. Use a real diagram in reader chapters when this reasoning path is taught; this policy document keeps the decision path as a table.

Với mỗi câu quan trọng nên ghi competency, weak mental model, strong reasoning structure, follow-up chain, troubleshooting variant và hands-on variant.

## Priority tags

`[CORE]` `[HIRING]` `[HANDS-ON]` `[PROD]` `[TRAP]` `[DEEP-DIVE]` `[ADVANCED]`

Không gán phần trăm giả nếu dataset không đủ. Hiring Radar là living layer; snapshot trong book có thể freeze nhưng radar cần cập nhật định kỳ.
