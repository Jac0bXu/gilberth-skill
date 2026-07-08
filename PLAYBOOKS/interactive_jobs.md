---
section: playbook
slug: playbooks/interactive_jobs
title: Playbook — Interactive Jobs (debug on a compute node)
workload: interactive
---

# Playbook: Interactive Jobs

Use for **debugging, exploration, or running GUI/REPL work on a real compute node** instead of the
shared front-end. Never run heavy work on the front-end (it's shared; `content/run_jobs.md` warns
about this). Source: `content/run_jobs/interactive_jobs.md`.

## The command
`sinteractive` accepts the same resource flags as `sbatch`:
```bash
sinteractive -A <account> --partition=a100-40gb --qos=normal --gpus-per-node=1 \
             --nodes=1 --ntasks=1 --cpus-per-task=8 --mem=40G --time=1:00:00
```
You get a shell on the allocated compute node. Exit (`exit`/Ctrl-D) to release it.

## When to use it
- **Smoke-test before a long batch run** (PREFLIGHT step C) — confirm `module load`, conda env,
  GPU visibility, and `import <pkg>` in seconds, not hours (G10).
- Debug a crash interactively; iterate on the env.
- Run MATLAB / Jupyter / RStudio via the Open OnDemand Gateway instead (`content/gateway/interactive/`)
  for a GUI without SSH X11.

## Pitfalls
- **G1/G2**: same module-load order applies — `external` before conda.
- **G4**: `--time` still capped by QOS (standby 4 h).
- It charges against your allocation like a batch job — exit when done.
- Prefer the **OnDemand Gateway** (`content/gateway/interactive/{desktop,notebook,rstudio,matlab}.md`)
  if you want Jupyter/RStudio/desktop without managing `sinteractive` + X11.

## Preflight → `../PREFLIGHT.md` (this *is* the smoke-test environment).
