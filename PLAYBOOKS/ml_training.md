---
section: playbook
slug: playbooks/ml_training
title: Playbook — ML / Deep-Learning Training (lerobot, pi0, VLA, PyTorch)
workload: ml_training
---

# Playbook: ML / Deep-Learning Training

Use when the task is **training or fine-tuning a model on GPU** (PyTorch, lerobot/pi0, VLA,
diffusion, any deep-learning loop). For *serving* a model (vLLM, TGI) see the "Serving" note at
the bottom.

## 1. Recommend the partition (by model size)

| Model / GPU need | Partition | QOS | Why |
|---|---|---|---|
| small (≤~20 GB VRAM), short | `a10` or `a30` | `standby` (≤4 h) or `normal` | cheap, plentiful |
| mid (20–40 GB), >4 h | `a100-40gb` | `normal` | 40 GB cards, 14-day cap |
| large / LLM / VLA (40–80 GB) | `a100-80gb` | `normal` | 80 GB avoids OOM |
| biggest / fastest | `h100` | `normal` | 2×/node |

> ⚠️ Gotcha **G4**: `standby` caps at **4 hours**. Anything longer → `--qos=normal`.
> ⚠️ Gotcha **G12**: a10/a30 cards are 24 GB — pick by model size.

## 2. Environment setup (do this ONCE, interactively — not in every job)

```bash
# on a front-end or interactive session:
module load external conda/2026.03        # G1: external MUST come first
conda create -p $SCRATCH/conda_envs/mytrain python=3.12 -y
conda activate $SCRATCH/conda_envs/mytrain
pip install torch --index-url https://download.pytorch.org/whl/cu124   # match CUDA 12.x
export PIP_CACHE_DIR=$SCRATCH/pip_cache   # G7: keep cache+tmp on same fs
export TMPDIR=$SCRATCH/tmp && mkdir -p "$TMPDIR"
pip install <your-deps>
# flash-attn (G6): prefer a prebuilt wheel; only build if you must:
#   pip install flash-attn --no-build-isolation
```
> ⚠️ Gotcha **G9**: envs on `$SCRATCH` get **purged**. For a durable env, put it under your group's
> `/depot/<yourlab>/conda_envs/` (never another lab's depot), or keep an install script to rebuild.

## 3. Recommended job script (copy → edit)

Saves as `train.sub`. Every Gilbreth-mandatory flag and every ML gotcha-fix is already in it.

```bash
#!/bin/bash
#SBATCH --job-name=mytrain
#SBATCH --output=/home/%u/logs/%x-%j.out      # resolve to a real dir; %u=you,%x=jobname,%j=jobid
#SBATCH --error=/home/%u/logs/%x-%j.err
#SBATCH -A <your-account>                      # REQUIRED (Gilbreth bills by account)
#SBATCH --partition=a100-80gb                  # a10|a30|a100-40gb|a100-80gb|h100 (G12)
#SBATCH --qos=normal                           # normal for >4h; standby only for ≤4h (G4)
#SBATCH --gpus-per-node=1                      # REQUIRED on Gilbreth (G11)
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=8                      # match your dataloader workers
#SBATCH --mem=80G                              # leave headroom; DefMemPerCPU is only 7GB
#SBATCH --time=12:00:00                        # realistic; standby max is 4h (G4)
#SBATCH --mail-type=END,FAIL

set -euo pipefail

# --- env (G1/G2): external first, then conda, then activate YOUR env ---
module purge
module load rcac external gcc openmpi cuda/12.6.0 conda/2026.03
conda activate "$SCRATCH/conda_envs/mytrain"   # or your /depot path

# --- storage hygiene (G7/G8) ---
export PIP_CACHE_DIR=$SCRATCH/pip_cache
export TMPDIR=$SCRATCH/tmp; mkdir -p "$TMPDIR"
export TOKENIZERS_PARALLELISM=false            # silence noisy warning
export HF_HOME=$SCRATCH/hf_cache; mkdir -p "$HF_HOME"

cd "$SLURM_SUBMIT_DIR"                         # deterministic working directory

# --- smoke test BEFORE the long run (G10): fail in 10s, not 4h ---
python -c "import torch; print('torch', torch.__version__, 'cuda', torch.cuda.is_available(), torch.cuda.get_device_name(0))"
nvidia-smi

# --- the actual training command ---
python train.py --config configs/exp.yaml --output_dir "$SCRATCH/runs/exp1"
```

## 4. Submit & watch
```bash
mkdir -p /home/$USER/logs
sbatch train.sub                    # -> Submitted batch job NNNN
squeue -u $USER
# tail live:
tail -f /home/$USER/logs/mytrain-NNNN.out
```

## 5. ML-specific pitfalls (already mitigated above — here's the why)
- **Bus error (G8)**: keep scratch <80% full; checkpoints balloon. Clean old ones.
- **flash-attn (G6)**: only build if you need it; prefer prebuilt wheel matching torch+cu+abi.
- **Determinism**: set seeds; log `git rev-parse HEAD` of your code into the log.
- **Preemption**: `normal` can still be requeued (`JobRequeue=1`). **Checkpoint frequently** (`G8`).
- **Distributed (>1 GPU/node or multi-node)**: use `--gpus-per-node=N`, `--ntasks=N`, launch with
  `srun` or `torchrun --nproc-per-node=N`; see `PLAYBOOKS/mpi.md` pattern for multi-node.

## Serving note (vLLM / TGI)
Same skeleton, but (a) budget **extra walltime for startup** — compile + CUDA-graph capture for big
models takes minutes (G13); (b) set `--enforce-eager` while debugging; (c) use `a100-80gb`/`h100`
for ≥40 GB models; (d) bind the server port and keep the job alive (`--time` generous, `normal` QOS).

## Preflight (run before returning the script to the user)
See `PREFLIGHT.md` — the agent must verify every item, including `sbatch --test-only train.sub`.
