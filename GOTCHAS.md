---
section: rules
slug: gotchas
title: Gilbreth Gotchas — Failure-Prevention Rules
captured_at: 2026-07-08
---

# Gilbreth Gotchas — Failure-Prevention Rules

> Curated rules that make job scripts **fail**, each with the fix. These are the things the
> official docs don't say (or say stale). Tagged by provenance:
> **[LOG]** = observed in real failed jobs on this account · **[LIVE]** = verified on the live
> cluster · **[DOC]** = from the captured docs. *Read this before writing or debugging any script.*

---

## G1 — `module load conda/...` fails with "cannot be loaded as requested" `[LOG][LIVE]` 🔥

**Symptom:** job dies in seconds; log shows:
```
Lmod has detected the following error: These module(s) or extension(s) exist but cannot be
loaded as requested: "anaconda"   Try: "module spider anaconda" to see how to load the module(s).
```
**Cause:** `conda/*` and `anaconda/*` sit under the `external` hierarchy tier. `external` is
loaded by default on login, but **`module purge` (or loading a conflicting compiler) drops it**,
so the subsequent conda load fails.
**Fix:** load `external` *first*, every time:
```bash
module purge                  # optional clean slate
module load external          # <-- REQUIRED before conda/anaconda
module load conda/2026.03
conda activate myenv
```
**Detect:** grep the log for `cannot be loaded as requested` / `Try: "module spider`.
**Source:** `module spider conda/2026.03` on the live cluster + multiple failed jobs (exit `1:0` in <60 s).

---

## G2 — `module purge` wipes the things you actually need `[LIVE]` 🔥

**Symptom:** after a "clean" `module purge`, GPU/Python/MPI all break.
**Cause:** `purge` removes the non-sticky defaults (`gcc`, `openmpi`, `cuda`, `external`).
Only `rcac` is sticky and survives.
**Fix:** if you purge, re-add the base stack explicitly:
```bash
module purge
module load rcac external gcc openmpi cuda/12.6.0 conda/2026.03
```
…or skip `purge` and just `module load` only what you need on top of the defaults.

---

## G3 — Docs' "Intel/MKL/Intel-MPI is the default toolchain" is STALE `[LIVE]`

**Symptom:** you follow `content/overview.md`, load Intel modules, and things don't match.
**Cause:** the live default is **`gcc/11.5.0 + openmpi/4.1.6 + cuda/12.6.0`**, not Intel.
**Fix:** trust `DYNAMIC/cluster_snapshot.md` over the docs for toolchain/version facts. Re-verify any version with `module spider <name>/<ver>` before pinning it.

---

## G4 — Long job `TIMEOUT` because `standby` caps at 4 hours `[LOG][LIVE]` 🔥

**Symptom:** ML job killed at exactly 04:00:00 (or your `--time`) while on `standby`.
**Cause:** the `standby` QOS has `MaxWall = 04:00:00`. Partition timelimits show `infinite`, so the
QOS cap is what bites — invisibly.
**Fix:** for anything >4 h, use `normal` (14-day cap) or your group's partner QOS:
```bash
#SBATCH --qos=normal          # not standby, for long runs
```
**Detect:** `sacct -j <jobid> --format=State,Elapsed,Timelimit,Reason` shows `TIMEOUT` at 4h.
**Source:** `sacctmgr list qos` + a `sched-vllm` job that TIMEOUT'd.

---

## G5 — Jobs fail with reason `Dependency` (whole chain dies) `[LOG]`

**Symptom:** a job shows State=FAILED, Reason=`Dependency`, without running its own code.
**Cause:** it was submitted with `--dependency=afterok:<upstream>` and the upstream failed, so
Slurm never starts it.
**Fix:** make the upstream job robust (see G1/G6/G10), or use `afterany:` if the downstream step
should run regardless of upstream exit status. Don't daisy-chain fragile setup jobs with `afterok`.

---

## G6 — `flash-attn` (and other heavy wheels) fails to build `[LOG]` 🔥

**Symptom:** `pip install flash-attn` → `Failed building wheel for flash-attn` / `failed-wheel-build-for-install`.
**Cause:** flash-attn compiles against your exact `torch + CUDA + CXX ABI`; any mismatch (or missing
build deps) fails the multi-hour build.
**Fix (in order of preference):**
1. Install a **prebuilt wheel** matching `torch X + cu Y + cxx11abiTRUE/FALSE` (pip prints the
   guessed URL in the log — use it).
2. `pip install flash-attn --no-build-isolation` after `pip install ninja packaging torch` in the env.
3. Skip it — many models run on `sdpa` attention without flash-attn.
**Detect:** `grep -i "Failed building wheel\|flash.attn" <log>`.

---

## G7 — `Errno 18 Invalid cross-device link` during pip install `[LOG]`

**Symptom:** wheel build/install fails: `error: [Errno 18] Invalid cross-device link: ... -> /scratch/.../pip_cache/...`.
**Cause:** pip's cache (on `/scratch/gilbreth/...`) and its temp dir are on **different filesystems**,
so the atomic rename across devices fails.
**Fix:** put cache + temp on the **same** filesystem:
```bash
export PIP_CACHE_DIR=$SCRATCH/pip_cache
export TMPDIR=$SCRATCH/tmp
mkdir -p "$PIP_CACHE_DIR" "$TMPDIR"
```
**Detect:** grep the log for `Invalid cross-device link` / `Errno 18`.

---

## G8 — `Bus error` (SIGBUS, exit 135) mid-training `[LOG]`

**Symptom:** training runs fine for a while, then `line NN: PID Bus error (core dumped)` — often
right around a checkpoint write or large data load.
**Cause:** typically storage (scratch/tmp full or quota hit while memory-mapping/writing a big
checkpoint) or a GPU memory mapping fault — *not* a normal Python exception.
**Fix:**
- Check `$SCRATCH` quota/space (`myquota`, `df -h $SCRATCH`) — checkpoint bloat is the usual culprit.
- Set `TMPDIR` on scratch; ensure the output/checkpoint dir has headroom.
- Checkpoint to a path with enough free space; clean old checkpoints.
**Detect:** `sacct -j <jobid> --format=ExitCode` shows `135:0` (= 128 + SIGBUS).

---

## G9 — Conda envs on `$SCRATCH` vanish (scratch is purged) `[DOC][LIVE]`

**Symptom:** a job that worked yesterday now `ModuleNotFoundError`s — the env is gone.
**Cause:** `$SCRATCH` is **purged** on an age policy (see `content/storage/scratch_space.md`).
Conda envs stored there (`$SCRATCH/conda_envs/...`) age out and disappear.
**Fix:** keep durable envs (and data) on a **persistent** tier — your group's `/depot/<yourlab>/`
(**never another lab's depot**) — or version-control an env-rebuild script and rebuild on scratch.
**Detect:** `ls $SCRATCH/conda_envs` empty after time; `myquota` shows scratch usage/age.

---

## G10 — `command not found` / `No module named ...` (exit 127 or 1) `[LOG]`

**Symptom:** job fails in <60 s, exit `127:0` (command not found) or `1:0` (import error).
**Cause:** the binary/module isn't on `PATH`/importable in the job's env — usually because the
conda env wasn't activated, the wrong env was loaded, or a package install failed silently.
**Fix:**
- Ensure the script does `conda activate <env>` (not just `module load conda`) before invoking the binary.
- Put a `python -c "import <pkg>; print(<pkg>.__version__)"` smoke-test as the first line of the job body so failures surface immediately.
- Verify the install actually succeeded in that env (see G6/G7).
**Detect:** `sacct ... --format=ExitCode` shows `127:0`; log shows the missing name.

---

## G11 — Gilbreth REQUIRES `--gpus-per-node` on every GPU job `[DOC]`

**Symptom:** `sbatch` rejected or job mis-allocates GPUs.
**Cause:** on Gilbreth you must explicitly request the GPU count.
**Fix:** always set `#SBATCH --gpus-per-node=1` (or N) on GPU jobs.
**Source:** `content/run_jobs/simple_job.md`, `content/run_jobs/submit_script.md`.

---

## G12 — GPU memory must fit the partition's card `[DOC][LIVE]`

**Symptom:** CUDA OOM; model loads then crashes.
**Cause:** `a10`/`a30` cards are **24 GB**; only `a100-80gb` (80 GB) and `h100` fit large models.
**Fix:** pick the partition by model size — ≤~20 GB → a10/a30; mid → a100-40gb; LLM/large → a100-80gb/h100.
**Source:** `DYNAMIC/cluster_snapshot.md` partition table.

---

## G13 — vLLM / large-model serving startup is slow — budget walltime `[LOG]`

**Symptom:** vLLM job TIMEOUT'd; log shows it was still in `Capturing CUDA graphs` / torch compile when killed.
**Cause:** compile + CUDA-graph capture for big models can take many minutes before the server is ready.
**Fix:** add generous headroom to `--time` for the startup phase; set `--enforce-eager` to skip graph capture for debugging; smoke-test startup interactively first.

---

## G14 — Job array rejected: range exceeds `MaxArraySize` (1001) `[LIVE]`

**Symptom:** `sbatch --array=0-2000 ...` is rejected, or silently truncated.
**Cause:** `MaxArraySize = 1001` (verified live) — an array can have at most 1001 tasks.
**Fix:** keep `--array=0-1000` (≤1001 tasks); split a larger sweep into multiple array jobs. Cap
concurrency with `%N` (e.g. `--array=0-999%20`) to stay within submit limits.
**Detect:** `scontrol show config | grep MaxArraySize`; the rejection message at submit time.
**Source:** `DYNAMIC/cluster_snapshot.md`. See `PLAYBOOKS/job_arrays.md`.

---

## G15 — vLLM tensor parallel on one node is one server process, not `torchrun` `[LOG]`

**Symptom:** a two-GPU LLM serving job starts extra ranks, binds ports oddly, or each rank tries to
load the whole model.
**Cause:** vLLM's OpenAI server manages tensor-parallel workers internally when launched with
`--tensor-parallel-size N`. Starting it with `torchrun`, `srun -n N`, or `#SBATCH --ntasks=N`
changes the process topology and is usually wrong for single-node serving.
**Fix:** request multiple GPUs but keep one Slurm task:
```bash
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --gpus-per-node=2
CUDA_VISIBLE_DEVICES=0,1 python -m vllm.entrypoints.openai.api_server \
  --model <model> --tensor-parallel-size 2 --host 0.0.0.0 --port 8000
```
Use `TEMPLATES/vllm_tp2.sub` for the complete Gilbreth script.

---

## G16 — vLLM OpenAI tool calling may need explicit parser flags `[LOG]`

**Symptom:** OpenAI-compatible clients receive plain text like `<tool_call>...</tool_call>` instead
of a structured `tool_calls` field, or the server rejects automatic tool choice.
**Cause:** vLLM requires model-specific tool-call parsing to convert generated tool syntax into the
OpenAI API response shape.
**Fix:** start vLLM with tool-choice parsing enabled. For Qwen3:
```bash
--enable-auto-tool-choice --tool-call-parser qwen3_xml
```
Then run a small production-shaped tool-call smoke test through the same profile the workload will
use. If `tool_choice=auto` still returns text instead of `tool_calls`, set client/profile
`tool_choice` to `required` for tool-call requests.

---

## Also see
- `content/faqs.md` — RCAC's own FAQ (GPU partition selection, NUMA layout, Jupyter "database is locked", Firefox lock files).
- `DYNAMIC/cluster_snapshot.md` — live modules, limits, partitions, QOS.
- `PLAYBOOKS/` — per-workload templates that already bake in the fixes above.
