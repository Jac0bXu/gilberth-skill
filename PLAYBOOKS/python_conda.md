---
section: playbook
slug: playbooks/python_conda
title: Playbook — Python / Conda Environments
workload: python_conda
---

# Playbook: Python / Conda Environments

Use when the task is **setting up or running a Python job** — creating an env, installing
packages, or running a script. Conda is the #1 source of fast-failing jobs here, so this
playbook is mostly about getting the load order right.

## 1. The mandatory load order (gotcha G1/G2) 🔥

`conda/*` and `anaconda/*` require the **`external`** hierarchy tier, which `module purge`
removes. Always:

```bash
module purge                                   # clean slate (optional)
module load rcac external gcc cuda/12.6.0      # G2: restore base stack
module load conda/2026.03                      # G1: external MUST precede this
conda activate <your-env>                      # activate YOUR env, not base
```

If you see `Lmod ... cannot be loaded as requested: "anaconda"`, you skipped `external`.

## 2. Two ways to manage envs

### (a) Plain conda envs (most flexible) — recommended for ML
```bash
module load external conda/2026.03
conda create -p $SCRATCH/conda_envs/myenv python=3.12 -y
conda activate $SCRATCH/conda_envs/myenv
pip install ...
```
- Activate with the **path** (`-p`/`activate <path>`) — robust across nodes.
- ⚠️ **G9**: envs on `$SCRATCH` are purged. For durability use `/depot/<yourlab>/conda_envs/`
  (your group's depot only), or script the rebuild.

### (b) `conda-env-mod` — RCAC's helper that makes a *module* for your env
(from `content/run_jobs/examples/python_packages.md`) — good for shared, reproducible envs:
```bash
module load external conda
conda-env-mod create -n myenv                  # creates env + a modulefile + optional Jupyter kernel
# later, in any job:
module load use.own                            # picks up $HOME/privatemodules
module load conda-env/myenv                    # load your env like a system module
```
- Modulefiles land in `$HOME/privatemodules` by default (`-m /path/to/modules` to customize).
- `conda-env-mod` ≠ `conda-env`; limited subcommands (`conda-env-mod --help`).

## 3. pip install pitfalls (gotchas G6/G7)
```bash
export PIP_CACHE_DIR=$SCRATCH/pip_cache        # G7: same fs as TMPDIR
export TMPDIR=$SCRATCH/tmp && mkdir -p "$TMPDIR"
pip install --no-cache-dir <pkg>               # if you still hit cross-device link
```
- Heavy compiled wheels (flash-attn, bitsandbytes, deepspeed): **prefer prebuilt wheels**; build
  only with `--no-build-isolation` after installing `ninja packaging torch` (G6).
- Match `torch`/`CUDA`/`CXX ABI` exactly — `python -c "import torch;print(torch.version.cuda)"`.

## 4. Minimal Python job script

```bash
#!/bin/bash
#SBATCH --job-name=pyjob
#SBATCH --output=/home/%u/logs/%x-%j.out
#SBATCH -A <account>
#SBATCH --partition=a100-40gb
#SBATCH --qos=normal
#SBATCH --gpus-per-node=1                      # REQUIRED (G11)
#SBATCH --nodes=1 --ntasks=1 --cpus-per-task=4
#SBATCH --mem=40G --time=2:00:00
set -euo pipefail
module purge
module load rcac external gcc cuda/12.6.0 conda/2026.03   # G1/G2
conda activate "$SCRATCH/conda_envs/myenv"     # or: module load use.own; module load conda-env/myenv
export PIP_CACHE_DIR=$SCRATCH/pip_cache TMPDIR=$SCRATCH/tmp; mkdir -p "$TMPDIR"
cd "$SLURM_SUBMIT_DIR"
python -c "import torch,sys;print(sys.version,torch.__version__,torch.cuda.is_available())"  # G10 smoke test
python my_script.py --arg value
```

## Preflight
See `PREFLIGHT.md`. Always run `sbatch --test-only` and the import smoke-test before a long run.
