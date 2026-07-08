# Graph Report - .  (2026-07-08)

## Corpus Check
- 114 files · ~51,233 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 393 nodes · 500 edges · 32 communities (19 shown, 13 thin omitted)
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 64 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- File Storage & Transfer
- Live Snapshot, Modules & Gotchas
- Cluster Overview & Hardware
- Access & Authentication
- Partitions & OpenMP Job Types
- Compiling & Toolchains
- Python/Conda Environments
- MATLAB Parallel & Python
- Ansys Fluent (CFD)
- R / Statistics
- Implicit Parallelism & Threading
- MPI Jobs
- FAQ & GPU Selection
- Gaussian & GPU Monitoring
- Capture Swarm Script
- Windows Shares & Snapshots
- Job Control & Dependencies
- Failure-Learning Helper
- Interactive & Generic Jobs
- Job Status Checking
- Windows File Recovery
- vLLM Serving
- Biography (namesake)
- R Runtime
- Globus Endpoint
- CUDA Module
- A10 Partition
- A100-40GB Partition
- A30 Partition
- Training Partition
- Training QOS
- RCAC Module

## God Nodes (most connected - your core abstractions)
1. `Preflight — Script Verification Checklist` - 16 edges
2. `Playbooks index (README)` - 15 edges
3. `Playbook — ML / Deep-Learning Training` - 14 edges
4. `Frequently Asked Questions - Gilbreth` - 11 edges
5. `Accounts on Gilbreth` - 10 edges
6. `Slurm accounts, partitions, and QOS options` - 10 edges
7. `Playbook — Python / Conda Environments` - 9 edges
8. `Running jobs` - 9 edges
9. `Ansys Fluent - RCAC Documentation` - 9 edges
10. `File Storage and Transfer` - 9 edges

## Surprising Connections (you probably didn't know these)
- `G5 — dependency chain kills downstream jobs` --conceptually_related_to--> `Playbook — Slurm Job Arrays`  [INFERRED]
  GOTCHAS.md → PLAYBOOKS/job_arrays.md
- `gilberth-skill README` --references--> `Gilbreth Skill entry point (SKILL.md)`  [EXTRACTED]
  README.md → SKILL.md
- `Gilbreth Skill entry point (SKILL.md)` --references--> `Gilbreth Live Cluster Snapshot`  [EXTRACTED]
  SKILL.md → DYNAMIC/cluster_snapshot.md
- `Gilbreth Skill entry point (SKILL.md)` --references--> `Gilbreth Skill Page Index`  [EXTRACTED]
  SKILL.md → INDEX.md
- `Playbook — Ansys Fluent (CFD)` --references--> `Preflight — Script Verification Checklist`  [EXTRACTED]
  PLAYBOOKS/cfd_fluent.md → PREFLIGHT.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **GPU partition/QOS selection by model size** — playbooks_ml_training, dynamic_cluster_snapshot_partition_a100_80gb, gotchas_g12_gpu_mem_fit_card, gotchas_g4_standby_4h_timeout [EXTRACTED 1.00]
- **Mandatory module load order (external before conda, restore after purge)** — gotchas_g1_external_before_conda, gotchas_g2_purge_wipes_stack, dynamic_cluster_snapshot_external, dynamic_cluster_snapshot_rcac [EXTRACTED 1.00]
- **Preflight A/B/C verification gate** — preflight, preflight_sbatch_test_only, preflight_smoke_test, gotchas_g10_command_not_found [EXTRACTED 1.00]
- **MPI compiler wrappers (mpicc/mpiicc across OpenMPI and Intel MPI)** — content_compile_openmpi, content_compile_impi, content_compile_mpicc, content_compile_mpiicc [INFERRED 0.85]
- **Gateway interactive apps launched on compute nodes** — content_gateway_interactive_desktop_novnc, content_gateway_interactive_matlab_app, content_gateway_interactive_notebook_app, content_gateway_interactive_rstudio_app [INFERRED 0.85]
- **Gilbreth GPU partition types selectable via Slurm** — content_faqs_a10_gpu, content_faqs_a30_gpu, content_faqs_a100_40gb_gpu, content_faqs_a100_80gb_gpu, content_faqs_h100_gpu [INFERRED 0.85]
- **SLURM batch job submission lifecycle (script -> submit -> monitor -> output -> cancel)** — content_run_jobs_creating_the_submission_script, content_run_jobs_directives, content_run_jobs_sbatch, content_run_jobs_checking_output, content_run_jobs_cancelling_job [INFERRED 0.85]
- **Ansys Fluent CFD workflow (Workbench -> geometry -> mesh -> case -> journal -> SLURM job)** — content_run_jobs_ansysfluent_preparing_cases, content_run_jobs_ansysfluent_calculating, content_run_jobs_ansysfluent_tui_journal, content_run_jobs_ansysfluent_submit_jobs [EXTRACTED 1.00]
- **R environment setup workflow (.Rprofile -> module load r -> install.packages -> run job)** — content_run_jobs_examples_example_r_profile_setup, content_run_jobs_examples_example_installing_r_packages, content_run_jobs_examples_example_running_r_jobs, content_run_jobs_examples_example_loading_into_r [INFERRED 0.75]
- **conda-env-mod create-load-install workflow** — content_run_jobs_examples_python_env_example_conda_env_mod, content_run_jobs_examples_python_env_example_use_own, content_run_jobs_examples_python_conda_module_conda, content_run_jobs_examples_python_packages_conda_env_mod_script [INFERRED 0.85]
- **MATLAB parallel computing stack (implicit + parfor + DCS)** — content_run_jobs_matlab_implicit_parallelism_singlecompthread, content_run_jobs_matlab_parfor_parfor, content_run_jobs_matlab_mdcs_parallel_dcs, content_run_jobs_matlab_interpreter_module_matlab [INFERRED 0.85]
- **Custom ML GPU batch job flow (conda-env-mod + cuda + sbatch)** — content_run_jobs_learning_customml_tensorflow, content_run_jobs_learning_ml_batch_sbatch, content_run_jobs_gpu_jobs_cuda, content_run_jobs_examples_python_env_example_conda_env_mod [INFERRED 0.75]
- **Slurm GPU submission flow (partition + QOS + gpus-per-node)** — content_run_jobs_submit_script, content_run_jobs_queues, content_run_jobs_simple_job_gpus_per_node, content_run_jobs_queues_normal_qos [INFERRED 0.85]
- **MATLAB parallel execution stack (PCT + DCS + cluster profile)** — content_run_jobs_matlab_spmd_parallel_computing_toolbox, content_run_jobs_matlab_spmd_distributed_computing_server, content_run_jobs_matlab_profile_manager_cluster_profile [INFERRED 0.85]
- **MPI multi-node submission pattern (srun + nodes + ntasks)** — content_run_jobs_mpi_jobs_srun, content_run_jobs_multiple_node_slurm_job_nodelist, content_run_jobs_multiple_node_cpus_per_task [INFERRED 0.75]
- **Fortress HPSS archive transfer interfaces (hsi, htar, Globus)** — content_storage_long_term_storage_fortress, content_storage_hsi_hsi_command, content_storage_htar_htar_command, content_storage_globus_globus [INFERRED 0.85]
- **Lost file recovery methods (flost, Mac, Windows, manual)** — content_storage_recover_flost_flost_command, content_storage_recover_mac_ssh, content_storage_recover_windows_previous_versions, content_storage_recover_manual_snapshots_dir, content_storage_recover_snapshot_policy [INFERRED 0.85]
- **Gilbreth storage tiers (home, scratch, tmp, Fortress)** — content_storage_home_directory_home_directory, content_storage_scratch_space_scratch_directory, content_storage_tmp_directory_tmp, content_storage_long_term_storage_fortress [INFERRED 0.85]

## Communities (32 total, 13 thin omitted)

### Community 0 - "File Storage & Transfer"
Cohesion: 0.05
Nodes (57): File Storage and Transfer, Archive and Compression, bzip2/bunzip2, gzip/gunzip, tar, Storage Environment variables, $HOME, $RCAC_SCRATCH (+49 more)

### Community 1 - "Live Snapshot, Modules & Gotchas"
Cohesion: 0.07
Nodes (49): Gilbreth Live Cluster Snapshot, module conda/2026.03 (Miniforge), module external (prerequisite tier, not sticky), module gcc/11.5.0 (default), Slurm MaxArraySize = 1001, module openmpi/4.1.6 (default), partition a100-80gb (A100 80GB), partition h100 (2x H100) (+41 more)

### Community 2 - "Cluster Overview & Hardware"
Cohesion: 0.06
Nodes (39): Gilbreth Overview, Nvidia A100 GPU, Nvidia A10 GPU, Nvidia A30 GPU, Gilbreth Community Cluster, Nvidia H100 GPU, Intel MPI (impi), Intel compiler (intel/17.0.1.132) (+31 more)

### Community 3 - "Access & Authentication"
Cohesion: 0.08
Nodes (33): Accounts on Gilbreth, Purdue Career Account, gilbreth.rcac.purdue.edu (SSH front-end), Purdue MFA two-factor authentication, MobaXterm SSH client, Request for Privileges (R4P), SSH (Secure Shell) login, SSH key-based authentication (+25 more)

### Community 4 - "Partitions & OpenMP Job Types"
Cohesion: 0.10
Nodes (26): OpenMP, OMP_NUM_THREADS, Slurm accounts, partitions, and QOS options, NVIDIA A100 GPU (40GB), A100-40GB partition, NVIDIA A100 GPU (80GB), A100-80GB partition, NVIDIA A10 GPU (24GB) (+18 more)

### Community 5 - "Compiling & Toolchains"
Cohesion: 0.15
Nodes (24): Compiling Source codes on Gilbreth, Compiling GPU Programs, CUDA, cuda/12.6.0 module, gcc/11.4.1 module, nvcc (CUDA compiler driver), Compiling Hybrid Programs, Intel MKL Library (+16 more)

### Community 6 - "Python/Conda Environments"
Cohesion: 0.10
Nodes (23): Managing Environments with Conda, conda create, module load conda, source activate / deactivate, Example: Create and Use Biopython Environment with Conda, conda-env-mod, module load use.own, Installing Packages (+15 more)

### Community 7 - "MATLAB Parallel & Python"
Cohesion: 0.12
Nodes (18): Matlab (overview), matlab_licenses command, matlab module, Profile Manager (MATLAB), MATLAB Cluster Profile, myslurmprofile.settings, Parallel Toolbox (spmd), MATLAB Distributed Computing Server (DCS) (+10 more)

### Community 8 - "Ansys Fluent (CFD)"
Cohesion: 0.16
Nodes (18): Calculation with Fluent, Fluent TUI, Ansys Fluent - RCAC Documentation, Ansys software, ansys module (ansys/2022R1), Ansys Fluent (CFD), rcac-runwb2 command, ThinLinc remote desktop (+10 more)

### Community 9 - "R / Statistics"
Cohesion: 0.18
Nodes (14): Installing R Packages, gdal/geos modules (R deps), install.packages() function, R_LIBS_USER env var, r module (r/4.4.1), Loading Data into R, read.csv() function, Setting Up R Preferences with .Rprofile (+6 more)

### Community 10 - "Implicit Parallelism & Threading"
Cohesion: 0.19
Nodes (14): Numpy Parallel Behavior, Intel MKL library, MKL_NUM_THREADS / OMP_NUM_THREADS, Implicit Parallelism, exclusive node access for implicit parallelism, matlab -singleCompThread, Matlab Script (.m File), module load matlab (+6 more)

### Community 11 - "MPI Jobs"
Cohesion: 0.18
Nodes (13): Collecting System Resource Utilization Data, htop, monitor utility, mpiexec command, MPI Jobs, Intel MPI (IMPI), --mpi=pmi2 option (Intel IMPI), OpenMPI (+5 more)

### Community 12 - "FAQ & GPU Selection"
Cohesion: 0.22
Nodes (11): Frequently Asked Questions - Gilbreth, Nvidia A100-40GB GPU, Nvidia A100-80GB GPU, Nvidia A10 GPU, Nvidia A30 GPU, Firefox lock file issue, Nvidia H100 GPU, lstopo-no-graphics (NUMA layout) (+3 more)

### Community 13 - "Gaussian & GPU Monitoring"
Cohesion: 0.22
Nodes (10): Gaussian, Gaussian 16 (gaussian16 module), --gres=gpu / --gpus-per-node directive, subg16 submission script, GPU, CUDA_VISIBLE_DEVICES, sfeatures command, GPU Usage Monitoring (+2 more)

### Community 14 - "Capture Swarm Script"
Cohesion: 0.22
Nodes (7): clean, fail, meta, ok, SUMMARY_SCHEMA, totalWords, urls

### Community 15 - "Windows Shares & Snapshots"
Cohesion: 0.38
Nodes (7): Manual Browsing, Samba/SMB/CIFS mount, /depot/.snapshots directory, Windows network drive, SMB/CIFS protocol, smbclient command, Purdue campus network / VPN requirement for SMB

### Community 16 - "Job Control & Dependencies"
Cohesion: 0.50
Nodes (4): Holding a Job, scontrol hold/release job, Job dependencies, sbatch --dependency (after/afterok/afternotok/afterany)

### Community 18 - "Interactive & Generic Jobs"
Cohesion: 0.67
Nodes (3): Generic SLURM Jobs, Interactive Jobs, sinteractive command

### Community 19 - "Job Status Checking"
Cohesion: 0.67
Nodes (3): Checking Job Status, scontrol show job command, squeue -u command

## Knowledge Gaps
- **142 isolated node(s):** `learn_from_failure.sh script`, `meta`, `urls`, `SUMMARY_SCHEMA`, `clean` (+137 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Running jobs` connect `Cluster Overview & Hardware` to `Ansys Fluent (CFD)`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `Ansys Fluent - RCAC Documentation` connect `Ansys Fluent (CFD)` to `Cluster Overview & Hardware`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `learn_from_failure.sh script`, `meta`, `urls` to the rest of the system?**
  _145 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `File Storage & Transfer` be split into smaller, more focused modules?**
  _Cohesion score 0.05012531328320802 - nodes in this community are weakly interconnected._
- **Should `Live Snapshot, Modules & Gotchas` be split into smaller, more focused modules?**
  _Cohesion score 0.06887755102040816 - nodes in this community are weakly interconnected._
- **Should `Cluster Overview & Hardware` be split into smaller, more focused modules?**
  _Cohesion score 0.0620782726045884 - nodes in this community are weakly interconnected._
- **Should `Access & Authentication` be split into smaller, more focused modules?**
  _Cohesion score 0.08143939393939394 - nodes in this community are weakly interconnected._