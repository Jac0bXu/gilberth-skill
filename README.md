# gilbreth-skill

A **task-solving** agent skill for the **Purdue RCAC Gilbreth** GPU cluster. Give it a task
("train my pi0 model", "run a Gaussian job", "archive 2 TB to Fortress") and it picks the best
approach and writes a Slurm job script that's **likely to run** — not just a pile of docs.

It layers five things the raw docs lack on top of the full 92-page Gilbreth guide:

| Layer | Purpose |
|---|---|
| **`SKILL.md`** | The agent's brain — the **Advisor Protocol** (classify → playbook → gotchas → template → preflight) |
| **`GOTCHAS.md`** | 14 failure-prevention rules (G1–G14) mined from **real failed jobs** on this cluster |
| **`DYNAMIC/`** | A **live cluster snapshot** — current modules, limits, partitions, QOS (overrides stale docs) |
| **`PLAYBOOKS/`** | 12 workload playbooks (ML, conda, MPI, job-arrays, Fluent, Gaussian, MATLAB, R, …) + templates |
| **`PREFLIGHT.md`** | A "will it run?" checklist + `sbatch --test-only` gate + exit-code decoder |

Plus the **`content/`** corpus (92 cleaned pages, verbatim code/`#SBATCH`) and a **queryable
knowledge graph** (`graphify-out/`).

> Source: https://docs.rcac.purdue.edu/userguides/gilbreth/ · Docs captured 2026-07-08 ·
> Gotchas/Dynamic mined from live read-only cluster probing the same day.

---

## Installation

### Option A — as a Claude Code skill (recommended)
From this repo's directory:
```bash
ln -s "$(pwd)" ~/.claude/skills/gilbreth
```
That's it. Claude Code auto-discovers the skill; its `description` triggers on Gilbreth tasks
(login, Slurm jobs, GPU partitions, conda/modules, storage, the gateway, …). Verify:
```bash
ls -l ~/.claude/skills/gilbreth   # -> symlink to this repo
```
To remove: `rm ~/.claude/skills/gilbreth`.

### Option B — copy (no symlink)
```bash
cp -r gilberth-skill ~/.claude/skills/gilbreth
```

### Option C — use the files directly (any agent/editor)
Just point your agent at this folder and have it read `SKILL.md` first. Everything is plain
markdown — no runtime required.

### Prerequisites
- **For graph queries only** (`graphify query/path/explain`): install graphify —
  `uv tool install graphifyy` (or `pipx install graphifyy`). Without it, the agent still works
  perfectly — it just reads `GOTCHAS.md`/`PLAYBOOKS/`/`content/` directly instead of querying the graph.
- **For the failure-learning loop**: an SSH alias `gil` → `gilbreth.rcac.purdue.edu`
  (`~/.ssh/config`: `Host gil` / `HostName gilbreth.rcac.purdue.edu` / `User <yourcareeraccount>`).

---

## How an agent uses it (the Advisor Protocol)

When you give a **task**, the agent:
1. **Classifies** the workload (ML training? MPI? transfer? …).
2. **Opens the matching `PLAYBOOKS/<workload>.md`** for the recommended partition/QOS/module order.
3. **Injects relevant `GOTCHAS.md` rules** (e.g. G1: `external` before `conda`; G4: `standby` caps at 4 h).
4. **Fills `TEMPLATES/gpu_generic.sub`** (or the playbook's template) with your specifics.
5. **Runs `PREFLIGHT.md`** — static checks + `sbatch --test-only` + an env smoke-test.
6. Returns the script + the gotchas it honored + your `sbatch` command.

When you just **ask a question**, it answers from `DYNAMIC/` → `GOTCHAS.md` → `graphify query` → `content/`.

### Try it
```bash
graphify query "how do I submit a GPU job on Gilbreth"     # query the knowledge graph
grep -ril "gres=gpu" content/                              # or grep the verbatim docs
```

---

## Repository layout
```
gilberth-skill/
├── SKILL.md              # start here — agent operating procedure (Advisor Protocol)
├── README.md             # this file
├── INDEX.md              # per-page index of the 92 captured docs (titles, words, summaries)
├── GOTCHAS.md            # ★ 14 failure rules (G1–G14), each: symptom→cause→fix→detect→source
├── PREFLIGHT.md          # ★ pre-submission checklist + sbatch --test-only + exit-code decoder
├── DYNAMIC/
│   └── cluster_snapshot.md   # ★ live modules / limits / partitions / QOS (the current truth)
├── PLAYBOOKS/            # ★ 12 workload playbooks + README index
├── TEMPLATES/
│   └── gpu_generic.sub   # ★ copy-paste GPU job script (gotcha-fixes baked in)
├── bin/
│   └── learn_from_failure.sh  # analyze a failed job → propose a new G?? gotcha (read-only)
├── content/              # 92 cleaned doc pages (verbatim #SBATCH / code / tables)
├── graphify-out/         # knowledge graph: graph.json · graph.html · GRAPH_REPORT.md
└── provenance/           # the capture swarm script + URL manifest (how content/ was built)
```

---

## Keeping it fresh

- **Re-capture a doc page:** each `content/*.md` has its original URL in the YAML `source:` header.
- **Refresh the live snapshot:** re-run the commands at the foot of `DYNAMIC/cluster_snapshot.md` on a front-end.
- **Add a new gotcha:** after a job fails, run `bin/learn_from_failure.sh <jobid>` and append the proposed block to `GOTCHAS.md`.
- **Rebuild the graph** (after adding playbooks/gotchas/docs):
  ```bash
  graphify extract .        # headless (needs an LLM backend key)
  # — or, in Claude Code: /graphify .   (uses the session as the LLM, no key needed)
  ```
  ⚠️ Build from the **project root** (`.`), never from `content/` — otherwise graphify's cache
  pollutes the corpus directory.

## Honesty & boundaries
- Edge audit: **78% EXTRACTED · 22% INFERRED · 0% AMBIGUOUS** (avg INFERRED confidence 0.88). INFERRED edges are model-reasoned — verify before relying on them.
- The live site/cluster is the source of truth; this is a dated snapshot (2026-07-08).
- The failure-learning helper is **read-only** and only ever inspects your own `$HOME`/`$SCRATCH`. It never touches another lab's depot.
