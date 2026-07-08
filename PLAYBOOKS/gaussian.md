---
section: playbook
slug: playbooks/gaussian
title: Playbook — Gaussian (computational chemistry)
workload: gaussian
---

# Playbook: Gaussian

Use for **quantum chemistry / electronic-structure calculations** with Gaussian 16. Source:
`content/run_jobs/gaussian_example.md` (also the GPU node in your `pi0` work showed `subg16`).

## The wrapper
Gilbreth provides `subg16` (wraps `g16`) which handles Slurm resources for you:
```bash
module load gaussian16
subg16 myjob -N 1 -n 16 --gres=gpu:1            # 1 node, 16 cores, 1 GPU
subg16 myjob -N 1 -n 16 --gres=gpu:1 -t 24:00:00 -A standby   # + time + account
subg16 myjob -N 2 --ntasks-per-node=16 --gres=gpu:2 -t 24:00:00 -A <account>  # multi-node
```
`subg16` translates its flags into the Slurm submission — see the page for the exact flag set.

## Pitfalls
- **G1/G2** still apply to any surrounding `module` setup (restore `external gcc` after purge).
- **G12**: GPU memory vs card — big basis sets/RI may need a100-80gb/h100.
- Gaussian scratch lands under `/scratch/gilbreth/<user>/...` — **G8**: watch scratch space for big jobs.
- Verify licenses/versions with the Gaussian docs; check `module spider gaussian16`.

## Preflight → `../PREFLIGHT.md`.
