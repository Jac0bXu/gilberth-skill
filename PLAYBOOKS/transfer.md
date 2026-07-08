---
section: playbook
slug: playbooks/transfer
title: Playbook — Data Transfer & Storage
workload: transfer
---

# Playbook: Data Transfer & Storage

Use when the task is **moving data** onto/offof Gilbreth, or choosing where to put it.

## Where things live
| Path | Tier | Persist? | Use |
|---|---|---|---|
| `$HOME` (`/home/<user>`) | GPFS, quota'd | yes (snapshots) | code, configs, small files |
| `$SCRATCH` (`/scratch/gilbreth/<user>`) | fast GPFS | **purged by age** ⚠️ (G9) | active job I/O, big temp |
| `/depot/<yourlab>/` | persistent shared | yes | durable datasets, envs (**your lab's depot only**) |
| Fortress (HPSS) | tape archive | yes (cold) | long-term archive via `hsi`/`htar` |

## Pick the tool by size/distance
| Need | Tool | Notes |
|---|---|---|
| small files, laptop↔cluster | `scp` / `sftp` | `content/storage/scp.md`, `ftp_sftp.md` |
| large / many files, resilient | **Globus** (`transfer.rcac.purdue.edu`) | endpoints = "Gilbreth Cluster Collection" (home+scratch), "Fortress HPSS Archive"; log in with Career Account (`content/storage/globus.md`) |
| archive to tape | `hsi` / `htar` | Fortress (`content/storage/hsi.md`, `htar.md`) |
| Windows share | SMB/CIFS mount | `content/storage/windows_network_drive.md` |

## One-shot examples
```bash
# scp a file up
scp results.tar.gz gilbreth.rcac.purdue.edu:$SCRATCH/

# Globus CLI (first time: globus login)
globus transfer <source-endpoint>:<path> <dest-endpoint>:<path> --recursive
```

## Gotchas
- **G9**: don't store irreplaceable data/envs on `$SCRATCH` — it's purged. Use `/depot/<yourlab>/` or Fortress.
- **Never touch another lab's depot** (e.g. `/depot/jmansson/`) — only your own group's.
- Check usage with `myquota`; reclaim space with `du -sh *`.
- For the full transfer menu see `content/storage/` (20 pages).
