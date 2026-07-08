---
section: playbook
slug: playbooks/r_stats
title: Playbook — R / Statistics
workload: r_stats
---

# Playbook: R / Statistics

Use for **running R scripts in batch** or installing R packages. Sources: `content/run_jobs/r_example.md`,
`content/run_jobs/examples/{example_running_r_jobs,example_installing_r_packages,example_r_profile_setup,example_loading_into_r}.md`.

## Batch script
```bash
#!/bin/bash
#SBATCH --job-name=rjob
#SBATCH --output=/home/%u/logs/%x-%j.out
#SBATCH -A <account>
#SBATCH --partition=a100-40gb            # or CPU gilbreth-nodes for pure stats
#SBATCH --qos=normal
#SBATCH --gpus-per-node=1                # only if a GPU-accelerated R path
#SBATCH --nodes=1 --ntasks=1 --cpus-per-task=8
#SBATCH --mem=32G --time=2:00:00
set -euo pipefail
module purge
module load rcac external gcc cuda/12.6.0 r      # G1/G2 (module name 'r' — spider to confirm)
cd "$SLURM_SUBMIT_DIR"
R --vanilla < analysis.R                  # or: Rscript analysis.R
```

## R packages
- Install into a personal library to avoid home-quota issues:
  ```bash
  export R_LIBS_USER=$SCRATCH/R/%p/%v    # or /depot/<yourlab>/R
  install.packages("dplyr")               # inside R
  ```
- Set `.Rprofile` for defaults (`content/run_jobs/examples/example_r_profile_setup.md`).
- For heavy stats consider RStudio via the OnDemand Gateway (`content/gateway/interactive/rstudio.md`).

## Pitfalls
- **G1/G2**: module-load order (external before any conda/anaconda-based R).
- **G8/G9**: package libs on scratch get purged — put durable libs on `/depot/<yourlab>/`.
- Home quota: large package installs can blow the `$HOME` quota — redirect `R_LIBS_USER`.

## Preflight → `../PREFLIGHT.md`.
