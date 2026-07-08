---
section: rules
slug: preflight
title: Preflight — Script Verification Checklist
---

# Preflight: verify a Gilbreth job script before returning it

**Before giving the user a job script, the agent MUST run every check below.** A script that
fails these will fail on the cluster. This is the layer that turns "a script" into "a script
that runs."

## A. Static checks (read the script — fix before any submission)

1. **Account present** — has `#SBATCH -A <account>` (or `-A` on the `sbatch` line). *[missing → rejected]*
2. **Partition present & valid** — `--partition=` is one of `a10 a30 a100-40gb a100-80gb h100 training gilbreth-nodes` (see `DYNAMIC/cluster_snapshot.md`).
3. **GPU jobs request GPUs** — every GPU job has `--gpus-per-node=N`. *(G11 — required on Gilbreth)*
4. **QOS vs walltime** — if `--time` > 4 h, QOS must NOT be `standby` (cap = 4 h). *(G4)*
5. **GPU-mem vs partition** — model/workspace ≤ card size (a10/a30 = 24 GB; a100-40; a100-80; h100). *(G12)*
6. **Module load order** — `external` is loaded **before** any `conda/*`/`anaconda/*`; if `module purge` appears, the base stack (`rcac external gcc openmpi cuda conda`) is restored. *(G1/G2)*
7. **Env activated** — the script `conda activate <env>` (or `module load conda-env/<env>`), not just `module load conda`.
8. **Working directory** — `cd "$SLURM_SUBMIT_DIR"` or absolute paths; no reliance on "where I launched from."
9. **Output path exists** — `--output=/home/%u/logs/...` and the `logs/` dir is created in the script (`mkdir -p`).
10. **Storage hygiene** — `TMPDIR` and `PIP_CACHE_DIR` set on the same filesystem (`$SCRATCH`). *(G7)*
11. **`set -euo pipefail`** — fail fast on errors/undefined vars.
12. **No foreign-depot paths** — only `$HOME`, `$SCRATCH`, and **your own** `/depot/<yourlab>/`. Never another lab's depot.
13. **Array size** — if `--array=`, the range ≤ **1001** (`MaxArraySize`). *(DYNAMIC)*

## B. Validate with Slurm (no submission)

```bash
sbatch --test-only <script>.sub        # parses + validates directives; does NOT submit
```
`--test-only` returns errors for bad directives/limits without queueing the job. The script must
pass this cleanly. *(Requires a front-end; if the agent can't run it, the user should.)*

## C. Smoke test (catch env/import failures in seconds, not hours)

First lines of the job body must prove the environment loads, e.g.:
```bash
nvidia-smi
python -c "import torch;print(torch.__version__, torch.cuda.is_available(), torch.cuda.get_device_name(0))"
python -c "import <your-key-package>; print('<pkg>', <your-key-package>.__version__)"
```
If these fail, the job would have failed in <60 s anyway (exit `1:0`/`127:0`) — better to see it
in an `sinteractive` session first. *(G10)*

## D. Final hand-off

When returning the script, the agent states:
- the **partition/QOS/GPU/mem/time** it chose and **why**,
- the **gotchas** it honored (by G-code),
- that preflight A–C pass,
- the **next actions** for the user: `mkdir -p logs`, `sbatch <script>.sub`, `squeue -u $USER`.

## How to debug a real failure (when a job does fail)
1. `sacct -j <jobid> --format=JobID,State,ExitCode,Elapsed,Timelimit,Reason,MaxRSS,ReqMem`
2. Map the `ExitCode`: `1:0`=app error · `127:0`=command not found · `135:0`=SIGBUS(G8) · `0:9`/OOM=memory · `TIMEOUT`=walltime(G4) · `Dependency`=upstream(G5).
3. `tail` the `--output`/`--error` file; match the message to a `G` gotcha.
