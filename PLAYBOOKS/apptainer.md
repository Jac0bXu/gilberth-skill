---
section: playbook
slug: playbooks/apptainer
title: Playbook — Apptainer / Singularity (containers)
workload: apptainer
---

# Playbook: Apptainer / Singularity

Use when you need a **container** (reproducible environment, Docker images, NGC containers) —
Apptainer (formerly Singularity) is the HPC container runtime. Source:
`content/run_jobs/apptainer_example.md`. No root needed (user namespaces / `--fakeroot` for builds).

## Common commands
```bash
apptainer shell ubuntu.sif                     # interactive shell inside the image
apptainer exec ubuntu.sif cat /etc/os-release  # run one command
apptainer run ubuntu.sif                        # runscript (ENTRYPOINT)
apptainer build ubuntu.sif docker://ubuntu:22.04          # build from Docker
apptainer build --sandbox ub/ docker://ubuntu:22.04       # writable sandbox dir
```

## Inside a GPU job
```bash
#!/bin/bash
#SBATCH --partition=a100-80gb --gpus-per-node=1 --qos=normal -A <account> ...
module purge
module load rcac external gcc cuda apptainer        # G1/G2 + apptainer module
cd "$SLURM_SUBMIT_DIR"
apptainer exec --nv mymodel.sif python train.py     # --nv exposes host NVIDIA driver/CUDA
```

## Pitfalls
- **G1/G2**: still need `external` (+ `gcc`/`cuda`) before loading/using apptainer alongside conda.
- **`--nv`** (or `--rocm` for AMD) binds the host GPU stack into the container.
- Build images in `$SCRATCH` or `/depot/<yourlab>/` (images are large; scratch is purged → G9).
- Bind your data/code with `--bind $SCRATCH:/work` (containers don't see host paths by default).

## Preflight → `../PREFLIGHT.md`.
