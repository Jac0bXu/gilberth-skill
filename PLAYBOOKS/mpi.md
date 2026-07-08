---
section: playbook
slug: playbooks/mpi
title: Playbook — MPI / Multi-node & OpenMP Jobs
workload: mpi
---

# Playbook: MPI / Multi-node / OpenMP

Use for **distributed (MPI)** or **shared-memory (OpenMP)** parallel jobs, including hybrid
MPI+OpenMP. Source: `content/run_jobs/mpi_jobs.md`, `multiple_node.md`, `openmp_jobs.md`.

## Recommend
- **MPI/multi-node**: `--nodes=N --ntasks-per-node=M` (total tasks = N×M); launch with `srun -n <total>`.
- **OpenMP (single node)**: `--nodes=1 --ntasks=1 --cpus-per-task=M`; set `OMP_NUM_THREADS=M`.
- Pure CPU MPI/OpenMP needs **no** `--gpus-per-node` (G11 is GPU-only). Add GPUs only if the code uses them.
- QOS: `normal` for long; `standby` ≤4 h (G4).

## MPI script
```bash
#!/bin/bash
#SBATCH --job-name=mpi_job
#SBATCH --output=/home/%u/logs/%x-%j.out
#SBATCH -A <account>
#SBATCH --partition=a100-40gb            # or a10/a30/h100; gilbreth-nodes for CPU-only
#SBATCH --qos=normal
#SBATCH --nodes=2 --ntasks-per-node=16   # 2 nodes × 16 ranks = 32 tasks
#SBATCH --gpus-per-node=1                # omit for pure-CPU MPI (G11)
#SBATCH --mem=64G --time=04:00:00
set -euo pipefail
module purge
module load rcac external gcc openmpi cuda/12.6.0     # G1/G2 — openmpi is the default MPI
cd "$SLURM_SUBMIT_DIR"
srun -n 32 ./mpi_hello                     # srun launches the MPI ranks across nodes
```
> InfiniBand interconnect (100 Gbps) handles multi-node traffic. Only request multiple nodes if
> your app is actually MPI-parallelized — extra nodes won't speed up a single-node program.

## OpenMP script (single node)
```bash
#SBATCH --nodes=1 --ntasks=1 --cpus-per-task=16
...
module load rcac external gcc
export OMP_NUM_THREADS=16
./openmp_hello
```

## Pitfalls
- **G1/G2**: restore `external gcc openmpi` after `module purge`.
- **G4**: standby ≤4 h.
- Match the MPI the code was built with (`module spider openmpi`/`intel-mpi`); don't mix.
- Multi-node debug: `srun --label hostname` to confirm both nodes allocated.

## Preflight → `../PREFLIGHT.md` (note: GPU flags optional here).
