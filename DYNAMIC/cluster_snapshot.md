---
source: live (ssh gilbreth front-end, read-only)
section: dynamic
slug: dynamic/cluster_snapshot
title: Gilbreth Live Cluster Snapshot
captured_at: 2026-07-08
---

# Gilbreth — Live Cluster Snapshot

> **This file is the current truth.** Where it disagrees with `content/` (the captured
> docs), **trust this file** — the docs drift. Re-capture periodically by re-running the
> commands in the footer on a front-end.

## Module system is Lmod (hierarchical)

The cluster uses **Lmod** with a *hierarchy*: some modules only become loadable after you
load a parent tier. This is the source of the most common job failure (see `GOTCHAS.md`).

**Current default modules** (loaded automatically on login / in a job that does NOT purge):

```
1) gcc/11.5.0          4) libxml2/2.10.3 (H)    7) external
2) openmpi/4.1.6       5) cuda/12.6.0           8) rcac          (sticky)
3) libiconv/1.17 (H)   6) xalt/3.1.4 (S)
```

- ⚠️ **The docs say "Intel/17.0.1.132 + MKL + Intel MPI are loaded by default" — that is STALE.**
  The real default toolchain is **gcc 11.5.0 + OpenMPI 4.1.6 + CUDA 12.6.0**.
- `rcac` is **sticky** (`module purge` won't drop it without `--force`).
- `external` is **NOT sticky** → `module purge` removes it, which breaks conda/anaconda (see below).

### The `external` prerequisite (critical)
`module spider conda/2026.03` and `anaconda/*` both state:
> *"You will need to load all module(s) on any one of the lines below before the module is available to load: **external**"*

So **`external` must be loaded before any `conda/*` or `anaconda/*`**. On a fresh login it's
already there; inside a job that ran `module purge`, it's gone → `module load conda/...` fails.

## Python / conda modules available

| Module | What | Notes |
|---|---|---|
| `conda/2026.03` | Miniforge, Python 3.13 | needs `external` first |
| `conda/2025.09` / `2025.02` / `2024.09` | Miniforge | needs `external` first |
| `anaconda/2025.06-py313` / `2024.10-py312` | Anaconda | needs `external` first |

After loading: `conda activate <env>` (or `source activate <env>` for conda-env-mod module files).

## Slurm limits (`scontrol show config`)

| Setting | Value | Meaning |
|---|---|---|
| `MaxArraySize` | **1001** | Job arrays capped at 1001 tasks |
| `MaxJobCount` | 50000 | Max jobs in the system for one user |
| `MaxStepCount` | 40000 | Max steps per job |
| `MaxTasksPerNode` | 512 | |
| `DefMemPerCPU` | 7168 MB | Default ~7 GB RAM per CPU if you don't set `--mem` |
| `JobRequeue` | 1 | Jobs **can** be preempted/requeued — checkpoint long jobs |
| `SchedulerType` | backfill | |

## Partitions (`sinfo`) — GPU types

| Partition | GPU (per node) | CPUs/node | RAM/node | Use |
|---|---|---|---|---|
| `a10` | 3× A10 (24 GB) | 32 | 512 GB | small/cheap GPU |
| `a30` | 3× A30 (24 GB) | 16–24 | 190 GB | small GPU |
| `a100-40gb` | 2–4× A100 (40 GB) | 48–128 | 510 GB–1 TB | mid ML |
| `a100-80gb` | 2–4× A100 (80 GB) | 32–128 | 512 GB–1 TB | large ML / LLM |
| `h100` | 2× H100 | 64 | 503 GB | top tier |
| `training` | 4× A100-80GB | 128 | 1 TB | shared training pool (use `training` QOS) |
| `gilbreth-nodes` | aggregate (all types) | — | — | submit to any node type |
| `araghu` | 4× H100 | 96 | 2 TB | **private (lab) — do not use unless yours** |

Partition-level `TIMELIMIT` reports `infinite` — **real walltime caps come from the QOS** (below).

## QOS — the real walltime / submit caps (`sacctmgr list qos`)

| QOS | Max walltime | Notes |
|---|---|---|
| `normal` | **14 days** | default; draws from your group's purchased allocation |
| `standby` | **4 hours** | idle/scavenged capacity; **preemptible**; MaxSubmit 5000 |
| `training` | 1 day | the `training` partition's QOS |
| `<lab>-default` | 14 days | per-group partner QOS (only if your group purchased) |

> ⚠️ The 4-hour `standby` cap is the single most common cause of `TIMEOUT` for long ML jobs —
> if your job needs >4h, you **must** use `normal` (or a partner QOS), not `standby`.

## How to refresh this file (read-only, run on a front-end)

```bash
module list                                  # default modules
module spider conda/2026.03                  # confirms the 'external' prerequisite
scontrol show config | grep -iE 'Max|Def'    # limits
sinfo -o "%P %l %D %G %m %a"                 # partition table
sacctmgr list qos format=Name,MaxWall,MaxSubmit -n
```
