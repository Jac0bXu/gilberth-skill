---
section: playbook
slug: playbooks/serial
title: Playbook — Serial / Single-core CPU Job
workload: serial
---

# Playbook: Serial / Single-core CPU Job

Use for a **single-process, non-GPU, non-MPI** job (a script, a simulation, data processing).
Don't waste a GPU node on this.

## Partition & resources
- Partition: `gilbreth-nodes` (CPU only) — or any partition with `--gpus-per-node=0` omitted.
- `--nodes=1 --ntasks=1 --cpus-per-task=1` for a pure serial job.
- `--mem` per GB; `DefMemPerCPU` is only ~7 GB, so set it explicitly if you need more.
- QOS: `standby` (≤4 h) for short, `normal` for longer (G4).

## Script
```bash
#!/bin/bash
#SBATCH --job-name=serial
#SBATCH --output=/home/%u/logs/%x-%j.out
#SBATCH -A <account>
#SBATCH --partition=gilbreth-nodes
#SBATCH --qos=normal
#SBATCH --nodes=1 --ntasks=1 --cpus-per-task=1
#SBATCH --mem=16G --time=4:00:00
set -euo pipefail
module purge
module load rcac external gcc conda/2026.03      # G1/G2 — drop cuda if unused
conda activate "$SCRATCH/conda_envs/myenv" 2>/dev/null || true
cd "$SLURM_SUBMIT_DIR"
./my_program --input data.csv
```
> Gotcha **G11** (mandatory `--gpus-per-node`) does NOT apply to CPU-only jobs — just omit GPU flags.
> See `content/run_jobs/serial_jobs.md`, `content/run_jobs/simple_job.md`.
