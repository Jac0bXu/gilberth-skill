---
section: playbook
slug: playbooks/matlab
title: Playbook — MATLAB (batch + parallel)
workload: matlab
---

# Playbook: MATLAB

Use for **running MATLAB scripts in batch** or with the Parallel Computing Toolbox (parfor/spmd).
Sources: `content/run_jobs/matlab_example.md` + `content/run_jobs/matlab/{interpreter,parfor,spmd,implicit_parallelism,mdcs_parallel,profile_manager}.md`.

## Batch script
```bash
#!/bin/bash
#SBATCH --job-name=matlab
#SBATCH --output=/home/%u/logs/%x-%j.out
#SBATCH -A <account>
#SBATCH --partition=a100-40gb            # or CPU-only gilbreth-nodes
#SBATCH --qos=normal
#SBATCH --gpus-per-node=1                # only if using GPU cod
#SBATCH --nodes=1 --ntasks=1 --cpus-per-task=16
#SBATCH --mem=40G --time=2:00:00
set -euo pipefail
module purge
module load rcac external gcc cuda/12.6.0 matlab      # G1/G2
cd "$SLURM_SUBMIT_DIR"
matlab -batch "my_script"                 # -batch = no desktop, exit on completion/error
```

## Parallel toolbox
- Check licenses first: `matlab_licenses`.
- `parfor` / `spmd` use the Parallel Computing Toolbox; for multi-node use the **MDCS/DCS**
  (`content/run_jobs/matlab/mdcs_parallel.md`) + a cluster profile pointed at Slurm
  (`myslurmprofile.settings`, Profile Manager).
- Implicit parallelism (multithreaded built-ins): set thread count; `-singleCompThread` to force serial.

## Pitfalls
- **G1/G2**: `external` before conda; restore `gcc`/`cuda` after purge (MATLAB GPU support needs CUDA).
- License contention → jobs can stall/fail if toolboxes are checked out; `matlab_licenses` to check.
- Prefer the OnDemand **MATLAB app** (`content/gateway/interactive/matlab.md`) for interactive work.

## Preflight → `../PREFLIGHT.md`.
