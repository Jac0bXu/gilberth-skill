---
section: playbook
slug: playbooks/cfd_fluent
title: Playbook — Ansys Fluent (CFD)
workload: cfd_fluent
---

# Playbook: Ansys Fluent (CFD)

Use for **computational fluid dynamics** with Ansys Fluent. Source (rich — 5 pages):
`content/run_jobs/ansysfluent_example.md` + `content/run_jobs/ansysfluent/{preparing_cases,tui_journal,calculating,submit_jobs}.md`.

## Recommended flow
1. **Prepare the case** in Ansys Workbench (DesignModeler → Meshing) — often via ThinLinc/Gateway desktop.
2. Drive Fluent headless with a **TUI journal file** (`content/run_jobs/ansysfluent/tui_journal.md`).
3. Submit the batch job (`content/run_jobs/ansysfluent/submit_jobs.md`).

## Load + launch
```bash
module load ansys                              # or a specific version e.g. ansys/2022R1
# Fluent in batch via journal; use the rcac-runwb2 helper for Workbench flows
fluent 3ddp -t$SLURM_NTASKS -mpi=intel -cnf=... -i journal.jou
```
(Exact invocation/version in the source pages — verify with `module spider ansys`.)

## Pitfalls
- **G1/G2**: `external` before any conda; restore base stack after purge.
- CFD is CPU+memory heavy — request `--mem` explicitly (DefMemPerCPU is only ~7 GB).
- MPI flavor must match Fluent's expectation (`-mpi=intel` vs openmpi).
- Use the OnDemand Gateway desktop (`content/gateway/interactive/desktop.md`) for case prep GUI.

## Preflight → `../PREFLIGHT.md`.
