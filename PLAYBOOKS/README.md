# Playbooks

A **playbook** = the best-known way to run one workload on Gilbreth: recommended partition/QOS,
correct module-load order, a copy-paste job script with gotcha-fixes baked in, and that
workload's specific pitfalls. The agent picks one after classifying the task (see `../SKILL.md`).

## How to use

1. **Classify** the task into one of the workloads below (or "none — ask").
2. **Open the playbook**, read the recommendation, copy the script template.
3. **Inject relevant gotchas** from `../GOTCHAS.md` (each playbook names the ones it mitigates, e.g. `G1`, `G4`).
4. **Fill in** the `<placeholders>` (account, env path, command, time).
5. **Run preflight** (`../PREFLIGHT.md`) — including `sbatch --test-only`.

## Playbooks (all complete)

| Workload | Playbook | Key gotchas |
|---|---|---|
| ML / DL training (PyTorch, lerobot, pi0, VLA, vLLM serving) | [`ml_training.md`](ml_training.md) | G1,G4,G6,G7,G8,G9,G11,G12 |
| Python / Conda environments | [`python_conda.md`](python_conda.md) | G1,G2,G6,G7,G9 |
| Job arrays (sweeps) | [`job_arrays.md`](job_arrays.md) | G4,G8,G11,G14 |
| Interactive jobs (debug on a node) | [`interactive_jobs.md`](interactive_jobs.md) | G1,G4 |
| Serial / single-core CPU | [`serial.md`](serial.md) | G1,G2 |
| MPI / multi-node / OpenMP | [`mpi.md`](mpi.md) | G1,G2,G4 |
| MATLAB (batch + parallel) | [`matlab.md`](matlab.md) | G1,G2 |
| R / statistics | [`r_stats.md`](r_stats.md) | G1,G2,G8,G9 |
| Ansys Fluent (CFD) | [`cfd_fluent.md`](cfd_fluent.md) | G1,G2 |
| Gaussian (chemistry) | [`gaussian.md`](gaussian.md) | G1,G2,G8,G12 |
| Apptainer / Singularity | [`apptainer.md`](apptainer.md) | G1,G2,G9 |
| Data transfer & storage | [`transfer.md`](transfer.md) | G9 |

## Authoring a new playbook (stay consistent)

Copy `ml_training.md` and keep this skeleton:
```
---
section: playbook
slug: playbooks/<name>
title: Playbook — <Workload>
workload: <name>
---
# Playbook: <Workload>
## 1. Recommend the partition (table)
## 2. Environment setup (module load order — mind G1/G2)
## 3. Recommended job script (all Gilbreth-mandatory flags + gotcha fixes)
## 4. Submit & watch
## 5. Workload-specific pitfalls (link G-codes from GOTCHAS.md)
## Preflight -> ../PREFLIGHT.md
```
Every script must satisfy `PREFLIGHT.md`. Cite gotchas by their `G<number>` codes.
