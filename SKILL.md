---
name: gilbreth
description: >
  Purdue RCAC Gilbreth HPC GPU cluster — a task-solving skill, not just docs. Use when a user
  wants to DO something on Gilbreth: pick the right approach for a workload, write a Slurm job
  script that won't fail, load modules/conda correctly, choose a GPU partition/QOS, transfer or
  store data, or debug a failed job. Covers logging in/accounts, Slurm (#SBATCH, partitions, QOS,
  walltime, arrays, dependencies), GPU/MPI/OpenMP/interactive jobs, compiling, software & modules,
  file storage/transfer (home/scratch/depot/Fortress, scp/sftp/Globus/hsi/htar), the Open OnDemand
  gateway, and worked examples (Python/conda, R, MATLAB, Ansys Fluent, Gaussian, Apptainer, ML/vLLM).
  Ships curated failure-prevention rules (GOTCHAS.md), a live cluster snapshot (DYNAMIC/), per-workload
  playbooks + templates, a preflight checklist, the full 92-page doc corpus (content/), and a
  queryable knowledge graph (graphify-out/). When a user gives a TASK, follow the Advisor Protocol below.
---

# Gilbreth — Purdue RCAC GPU Cluster Skill (task-solving)

This skill helps an agent **take a task and produce a job script that's likely to run** — plus
answer any "how do I use Gilbreth?" question. It layers five things the raw docs lack:

1. **Playbooks** — the best-known way to run each workload (`PLAYBOOKS/`)
2. **Gotchas** — failure-prevention rules mined from real failed jobs (`GOTCHAS.md`)
3. **A live snapshot** — current modules/limits/partitions, overriding stale docs (`DYNAMIC/`)
4. **Templates + preflight** — copy-paste scripts and a "will it run?" gate (`TEMPLATES/`, `PREFLIGHT.md`)
5. **The doc corpus + a knowledge graph** — `content/` (92 pages) and `graphify-out/`

> **Paths (read first):** this skill lives at `/home/ubuntu/Documents/GitHub/gilberth-skill`
> (the directory holding this `SKILL.md`). The knowledge graph is at
> `<skill>/graphify-out/graph.json`. `graphify` resolves the graph **relative to your CWD**, so when
> you're working in any *other* project, pass `--graph /home/ubuntu/Documents/GitHub/gilberth-skill/graphify-out/graph.json`
> (or `cd` into the skill dir first). Read all referenced files (`GOTCHAS.md`, `PLAYBOOKS/*`, `content/*`)
> relative to that same skill dir.

## What Gilbreth is (quick facts — verified live 2026-07-08)

- **GPU community cluster** for ML / GPU-intensive work. Cards: **A10, A30 (24 GB), A100 (40 & 80 GB), H100**.
- **OS:** Rocky 9 · **Scheduler:** Slurm (backfill) · **Interconnect:** 100 Gbps InfiniBand.
- **Login:** `ssh <user>@gilbreth.rcac.purdue.edu` (Career Account + BoilerKey/MFA).
- **Default toolchain (LIVE):** `gcc/11.5.0 + openmpi/4.1.6 + cuda/12.6.0` (+ hidden `external`, sticky `rcac`).
  ⚠️ The docs' "Intel/MKL/Intel-MPI default" is **stale** — trust `DYNAMIC/cluster_snapshot.md`.
- **Walltime caps come from QOS**, not partitions: `normal`=14d, `standby`=**4h**, `training`=1d.
- **Job arrays:** max **1001** tasks. **Storage:** `$HOME` (quota'd), `$SCRATCH` (**purged by age**),
  `/depot/<yourlab>/` (persistent — your lab's only), Fortress tape (hsi/htar).

---

## ★ THE ADVISOR PROTOCOL — run this when the user gives a TASK ★

> Goal: produce a recommendation + a job script that passes preflight. Do all five steps; don't
> skip to a script.

**Step 1 — Classify the task.** What workload? (ML training · Python/conda · serial CPU · MPI ·
MATLAB · R · Gaussian · Fluent · data transfer · interactive · something else). Note must-haves:
GPU?, memory, runtime, data size, single vs multi-node.

**Step 2 — Recommend the approach.** Open the matching `PLAYBOOKS/<workload>.md` (or
`PLAYBOOKS/README.md` to find it). Read its **partition/QOS recommendation** and **module-load
order**. State your choice + *why* (partition by GPU-mem, QOS by runtime, etc.), citing
`DYNAMIC/cluster_snapshot.md` for the facts.

**Step 3 — Inject the gotchas.** Open `GOTCHAS.md`. Every script must respect at least:
**G1** (`external` before conda), **G2** (restore base stack after `purge`), **G4** (standby ≤4h),
**G11** (`--gpus-per-node` required), **G12** (GPU-mem ≤ card). Add workload-specific ones the
playbook names (e.g. ML: G6 flash-attn, G7 cross-device pip, G8 bus error, G9 scratch purge).

**Step 4 — Generate the script.** Start from `TEMPLATES/gpu_generic.sub` (or the playbook's
template). Fill the `<placeholders>`. Bake in the gotcha-fixes — don't leave them as comments.

**Step 5 — Run PREFLIGHT.** Walk `PREFLIGHT.md` checklist A (static) → B (`sbatch --test-only`)
→ C (env smoke-test). **Only return the script once it passes.** Then hand off: partition/QOS/time
chosen + why, gotchas honored, and the user's next commands (`mkdir -p logs`, `sbatch …`, `squeue -u $USER`).

### The learning loop (grow GOTCHAS.md from new failures)
When a job fails, capture it as a future rule — this is how the gotcha set stays current with
*your* stack. On a Gilbreth front-end (or via ssh):
```bash
ssh gil 'bash -s' -- < bin/learn_from_failure.sh 1234567     # analyze a specific failed job
ssh gil 'bash -s' -- < bin/learn_from_failure.sh             # auto-pick your most-recent FAILED
```
It prints the job's `State/ExitCode/Reason`, tails its log (skipping `/depot/jmansson`), and
proposes a `## G??` gotcha block. Review it, assign the next G-number, and append to `GOTCHAS.md`.
(Read-only; only ever inspects your own jobs.)

### If the user is just ASKING (not asking for a script)
Answer from these in priority order:
1. **`DYNAMIC/cluster_snapshot.md`** for current modules/limits/partitions/QOS (the truth).
2. **`GOTCHAS.md`** if it's a "why did this fail / will this break" question.
3. **`graphify query "<question>" --graph <skill>/graphify-out/graph.json`** over the knowledge graph for concept relationships (cites `src=` files). Use the `--graph` flag so it works from any CWD.
4. **`content/`** for verbatim commands/code/tables (`grep -ril "<term>" content/`).

---

## Knowledge layer map

| Layer | File(s) | Use it for |
|---|---|---|
| ★ Playbooks | `PLAYBOOKS/*.md` | Best way to run a workload (start here for a task) |
| ★ Gotchas | `GOTCHAS.md` | Failure-prevention rules (G1…G14) |
| ★ Live snapshot | `DYNAMIC/cluster_snapshot.md` | Current modules, limits, partitions, QOS |
| ★ Templates | `TEMPLATES/*.sub` | Copy-paste job scripts |
| ★ Preflight | `PREFLIGHT.md` | "Will it run?" checklist + `sbatch --test-only` |
| Doc corpus | `content/` (92 pp, `INDEX.md`) | Verbatim docs — exact commands/tables/code |
| Knowledge graph | `graphify-out/graph.json` | `graphify query/path/explain` (393 nodes, 32 communities) — pass `--graph <skill>/graphify-out/graph.json` from other CWDs |

Doc corpus sections: `overview`, `accounts`, `software`, `faqs`, `run_jobs/` (51), `storage/` (20),
`gateway/` (9), `compile/` (7), `biography`. See `INDEX.md` for every page.

## Cheat sheet

```bash
ssh <user>@gilbreth.rcac.purdue.edu            # login (Career Account + BoilerKey)
sinteractive                                    # interactive compute-node shell
sbatch myjob.sub                                # submit
sbatch --test-only myjob.sub                    # validate WITHOUT submitting  ← preflight B
squeue -u <user>                                # your jobs (ST: R=run, PD=pending)
sinfo -o "%P %l %D %G %m"                       # partitions / GPUs / RAM
sacct -j <jobid> --format=State,ExitCode,Elapsed,Reason,MaxRSS   # post-mortem
scancel <jobid>

module spider <name>/<ver>                      # how to load a module (+ prerequisites!)
module load external conda/2026.03              # ← external FIRST (G1), then conda
conda activate <env>

$HOME  $SCRATCH  /depot/<yourlab>/              # storage (scratch is purged — G9)
```

## Provenance, freshness & boundaries
- **Docs:** captured 2026-07-08 from the live site (92 pages); each file's YAML header has its `source:` URL.
- **Gotchas/Dynamic:** mined from real failed jobs + a live read-only cluster probe on 2026-07-08.
- **Freshness:** the live site and cluster supersedes this snapshot. Re-verify versions with
  `module spider` and limits with `scontrol show config` before pinning.
- **Boundary:** only ever read/write your own `$HOME`, `$SCRATCH`, and **your group's** `/depot/`.
  Never another lab's depot.
