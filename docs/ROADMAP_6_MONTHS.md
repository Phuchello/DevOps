# 6-Month DevOps Roadmap

## Target

**DevOps Intern Ready+**, không tuyên bố “master DevOps”. Khi nghe “App deploy không lên”, learner biết chia lớp để điều tra: DNS, network, port/socket, process, permission, environment, logs, container, health check, reverse proxy, pipeline và resource.

## Phase 1 — Linux Systems & Operations (Weeks 1–4)

Filesystem, users/groups/permissions, process/resource, systemd, SSH, logs, storage, networking basics, firewall, backup/restore, Bash foundation. Project: **Linux Production Server Lab**.

Injected failures: service not starting, disk full, permission denied, port occupied, CPU pressure, bad environment, SSH failure, log growth.

## Phase 2 — Networking for DevOps (Weeks 5–7)

Project: **Packet-to-Production Lab**.

```text
Client → DNS → Reverse Proxy → Backend A/B → Database
```

TCP/IP, subnet/routing, DNS, NAT, socket/port, HTTP/HTTPS, TLS, reverse proxy, load balancing, firewall, tcpdump/Wireshark.

## Phase 3 — Containers (Weeks 8–11)

Project: **Production Container Lab**. Image/layer, Dockerfile, multi-stage, volumes, networks, Compose, health checks, non-root, resource limits, secrets/config. Core model: **container != VM**.

## Phase 4 — CI/CD & Automation (Weeks 12–15)

Project: **Zero-Touch Delivery Pipeline**.

```text
git push → lint → test → build → security scan → image → registry → deploy → health check → rollback
```

Primary CI: GitHub Actions. Không collect CI tools như Pokémon.

## Phase 5 — Cloud + IaC (Weeks 16–20)

Project: **Reproducible Cloud Infrastructure**. Dựng IAM/VPC/subnet/routing/compute/storage/LB/DNS/logging bằng tay trước; sau đó destroy và dựng lại bằng Terraform. Rule: **không automate thứ chưa hiểu cách vận hành thủ công**.

## Phase 6 — Kubernetes + Observability (Weeks 21–24)

Pod, Deployment, Service, Ingress, ConfigMap/Secret, probes, requests/limits, HPA, storage basics, Prometheus, Grafana, logs, alerting. Failure labs: kill pod, wrong config, CPU overload, dependency down, bad deployment.

## Weeks 25–26 — Capstone

**Production DevOps Platform**

```text
Developer → Git → CI → Container Registry → Terraform/Cloud → Kubernetes → Metrics/Logs → Alerts
```

Capstone chỉ bắt đầu khi competency nhỏ đã có evidence riêng.
