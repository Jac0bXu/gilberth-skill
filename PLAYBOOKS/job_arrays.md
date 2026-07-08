---
section: playbook
slug: playbooks/job_arrays
title: Playbook — Slurm Job Arrays (parameter sweeps, batch experiments)
workload: job_arrays
---

# Playbook: Slurm Job Arrays

Use for **running the same job many times with one parameter changed** (hyperparameter sweeps,
per-subject processing, seeds, configs). One submission → N independent tasks.

> ⚠️ **This workload is NOT in the RCAC Gilbreth docs** (verified gap). It's standard Slurm and
> works on Gilbreth; the facts below (MaxArraySize, partitions, QOS) are from the live cluster.

## Limit (verified live)
- **`MaxArraySize = 1001`** → an array can have **at most 1001 tasks** (`--array=0-1000`).
- Concurrency cap with `%N`: `--array=0-999%20` → 1000 tasks, **20 at once** (keeps you within
  per-user/policy submit limits and avoids swamping one partition).

## Script template
```bash
#!/bin/bash
#SBATCH --job-name=sweep
#SBATCH --output=/home/%u/logs/%x_%A_%a.out      # %A=array job id, %a=task id (one log each)
#SBATCH --error=/home/%u/logs/%x_%A_%a.err
#SBATCH -A <account>
#SBATCH --partition=a100-40gb                     # a10|a30|a100-40gb|a100-80gb|h100 (G12)
#SBATCH --qos=normal                              # not standby for >4h runs (G4)
#SBATCH --gpus-per-node=1                         # REQUIRED on Gilbreth (G11)
#SBATCH --mem=40G --time=2:00:00
#SBATCH --array=0-999%20                          # <=1001 tasks; %20 concurrent

set -euo pipefail
module purge
module load rcac external gcc cuda/12.6.0 conda/2026.03   # G1/G2
conda activate "$SCRATCH/conda_envs/myenv"
cd "$SLURM_SUBMIT_DIR"

# parameterize by task id — e.g. pick a seed/config per task
SEED=$(( SLURM_ARRAY_TASK_ID * 7 ))
python train.py --seed "$SEED" --config "configs/cfg_${SLURM_ARRAY_TASK_ID}.yaml"
```

## Submit & manage the whole array
```bash
mkdir -p /home/$USER/logs
sbatch sweep.sub                  # -> "Submitted batch job 1234" (array job 1234)
squeue -u $USER                   # one line per task, same array id
scancel 1234                      # cancel the WHOLE array
scancel 1234_7                    # cancel ONE task
```

## Pitfalls
- **G14 (MaxArraySize)**: range ≤ 1001; split larger sweeps into multiple arrays.
- **G4**: standby caps each task at 4 h — use `normal` for longer per-task runs.
- **G8**: if each task writes big checkpoints, watch aggregate scratch usage across all tasks.
- Log file per task via `%A_%a` (don't let 1000 tasks append to one file).

## Preflight → `../PREFLIGHT.md`.
