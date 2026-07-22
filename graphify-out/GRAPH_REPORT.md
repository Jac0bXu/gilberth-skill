# Graph Report - /home/ubuntu/Documents/GitHub/gilberth-skill  (2026-07-08)

## Corpus Check
- 115 files · ~52,489 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 318 nodes · 395 edges · 61 communities (21 shown, 40 thin omitted)
- Extraction: 85% EXTRACTED · 15% INFERRED · 0% AMBIGUOUS · INFERRED: 60 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Playbooks Conda Open
- Storage Home Scratch
- Content Gpu Gilbreth
- Gateway Interactive Fix
- Dynamic Gilbreth Partition
- Jobs Slurm Submission
- Content Job Sbatch
- Jobs Packages Conda
- Content Programs Compiling
- Jobs Fluent Journal
- Content Compiling Open
- Provenance Extract Workflow
- Provenance Workflow Capture
- Content Storage Smb
- Jobs Ansys Fluent
- Jobs Matlab Parallel
- Content Ssh Accounts
- Content Directives Job
- Content Gres Gpu
- Bin Learn Failure
- Content Ansys Example
- Content Apptainer Container
- Content Job Load
- Jobs Mkl Omp
- Dynamic Preemption Requeue
- Content Nvlink Gilbreth
- Content Node Gilbreth
- Content Node Nvidia
- Content Node Nvidia
- Content Normal Priority
- Content Training Gilbreth
- Content Hour Priority
- Content Overview Gilbreth
- Dynamic Lmod Hierarchical
- Dynamic Cards Partition
- Dynamic Partition
- Dynamic Cpu Gilbreth
- Dynamic Pool Shared
- Dynamic Qos Walltime
- Playbooks Flag Bind
- Playbooks Ansys
- Playbooks Journal Tui
- Playbooks Gaussian
- Playbooks Wrapper Subg
- Playbooks Sinteractive Command
- Playbooks Directive Array
- Playbooks Batch Matlab
- Playbooks Node Dcs
- Playbooks Parfor Toolbox
- Playbooks Pattern Serving
- Playbooks Band Gbps
- Playbooks Mod Env
- Playbooks Privatemodules Use
- Playbooks Libs User
- Playbooks Globus Transfer
- Playbooks Gpfs Quota
- Playbooks Myquota Command
- Playbooks Sftp Scp
- Sbatch Only
- Checks
- Learn Loop Failure

## God Nodes (most connected - your core abstractions)
1. `Preflight Verification Checklist` - 23 edges
2. `Playbooks README (index)` - 16 edges
3. `G1: external before conda (cannot be loaded as requested)` - 14 edges
4. `Playbook — ML / DL Training` - 14 edges
5. `File Storage and Transfer` - 14 edges
6. `Gilbreth Live Cluster Snapshot` - 11 edges
7. `G2: module purge wipes needed defaults` - 11 edges
8. `Gilbreth Overview` - 10 edges
9. `Playbook — Job Arrays` - 9 edges
10. `Playbook — Python / Conda` - 9 edges

## Surprising Connections (you probably didn't know these)
- `G11: --gpus-per-node required on GPU jobs` --semantically_similar_to--> `Compiling GPU/CUDA (nvcc)`  [INFERRED] [semantically similar]
  GOTCHAS.md → content/compile.md
- `G3: Intel/MKL default toolchain is stale` --references--> `Gilbreth Live Cluster Snapshot`  [EXTRACTED]
  GOTCHAS.md → DYNAMIC/cluster_snapshot.md
- `Playbook — Job Arrays` --references--> `MaxArraySize 1001 (Slurm limit)`  [EXTRACTED]
  PLAYBOOKS/job_arrays.md → DYNAMIC/cluster_snapshot.md
- `Playbook — Ansys Fluent (CFD)` --references--> `DefMemPerCPU 7168 MB`  [INFERRED]
  PLAYBOOKS/cfd_fluent.md → DYNAMIC/cluster_snapshot.md
- `Playbook — MPI / Multi-node & OpenMP` --references--> `Compiling MPI (mpicc/mpif90/mpiicc)`  [INFERRED]
  PLAYBOOKS/mpi.md → content/compile.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Advisor Protocol: classify→playbook→gotchas→template→preflight** — skill_advisor_protocol, playbooks_readme, gotchas, preflight [INFERRED 0.95]
- **Correct module load order (external→conda→activate) across all GPU playbooks** — dynamic_cluster_snapshot_external_prerequisite, dynamic_cluster_snapshot_default_toolchain, gotchas_g1, gotchas_g2 [INFERRED 0.95]
- **GPU partition + QOS selection by model size and runtime** — dynamic_cluster_snapshot_partition_a100_80gb, dynamic_cluster_snapshot_qos_normal, dynamic_cluster_snapshot_qos_standby, gotchas_g4, gotchas_g12 [INFERRED 0.85]
- **Compilation toolchain (serial/mpi/openmp/hybrid/gpu)** — content_compile_compile_serial, content_compile_compile_mpi, content_compile_compile_openmp, content_compile_compile_hybrid, content_compile_compile_gpu [INFERRED 0.85]
- **Open OnDemand interactive app suite** — content_gateway_interactive_desktop, content_gateway_interactive_matlab, content_gateway_interactive_notebook, content_gateway_interactive_rstudio [INFERRED 0.85]
- **Fluent CFD workflow (prepare->calculate->journal->submit)** — content_run_jobs_ansysfluent_preparing_cases, content_run_jobs_ansysfluent_calculating, content_run_jobs_ansysfluent_tui_journal, content_run_jobs_ansysfluent_submit_jobs [INFERRED 0.85]
- **Python package management workflow on Gilbreth** — content_run_jobs_examples_python_packages, content_run_jobs_examples_python_conda, content_run_jobs_examples_python_env_example_conda_env_mod [INFERRED 0.85]
- **R workflow on Gilbreth (.Rprofile, install, load, run)** — content_run_jobs_examples_example_r_profile_setup, content_run_jobs_examples_example_installing_r_packages, content_run_jobs_examples_example_running_r_jobs [INFERRED 0.85]
- **SLURM job submission patterns (script, directives, GPU)** — content_run_jobs_creating_the_submission_script, content_run_jobs_directives, content_run_jobs_gpu_jobs [INFERRED 0.75]
- **MATLAB parallel execution stack (interpreter + PCT + DCS + Cluster Profile)** — content_run_jobs_matlab_interpreter_m_script, content_run_jobs_matlab_parfor_parfor_job, content_run_jobs_matlab_profile_manager_cluster_profile_manager [INFERRED 0.85]
- **Gilbreth GPU partitions (a10/a30/a100-40gb/a100-80gb/training)** — content_run_jobs_queues_a10_partition, content_run_jobs_queues_a30_partition, content_run_jobs_queues_a100_80gb_partition [INFERRED 0.85]
- **Gilbreth Quality-of-Service tiers (normal/standby/training)** — content_run_jobs_queues_normal_qos, content_run_jobs_queues_standby_qos, content_run_jobs_queues_training_qos [INFERRED 0.85]
- **Fortress archival transfer tools** — content_storage_long_term_storage_fortress, content_storage_hsi, content_storage_htar [INFERRED 0.85]
- **sbatch GPU job submission option set** — content_run_jobs_submit_script_sbatch, content_run_jobs_submit_script_account_partition, content_run_jobs_submit_script_walltime [INFERRED 0.85]
- **Lost file recovery methods** — content_storage_recover_flost, content_storage_recover_manual, content_storage_recover_windows [INFERRED 0.85]
- **SMB-based access to Gilbreth storage tiers** — content_storage_windows_network_drive_smb_cifs, content_storage_windows_network_drive_home_storage, content_storage_windows_network_drive_scratch_storage [INFERRED 0.85]

## Communities (61 total, 40 thin omitted)

### Community 0 - "Playbooks Conda Open"
Cohesion: 0.14
Nodes (38): Gateway / Open OnDemand, conda/anaconda modules (2026.03, 2025.09, etc.), DefMemPerCPU 7168 MB, external module (required before conda/anaconda), standby QOS (4-hour preemptible cap), rcac (sticky module), G1: external before conda (cannot be loaded as requested), G10: command not found / import error (exit 127/1) (+30 more)

### Community 1 - "Storage Home Scratch"
Cohesion: 0.10
Nodes (32): File Storage and Transfer, Archive and Compression, bzip2/bunzip2, gzip/gunzip, tar, Environment variables, $HOME, $RCAC_SCRATCH (+24 more)

### Community 2 - "Content Gpu Gilbreth"
Cohesion: 0.10
Nodes (23): Compiling GPU Programs, CUDA, cuda module, nvcc compiler driver, Intel MKL Library, Rationale: dynamic linking of libguide, LINK_LAPACK linking variable, MKL_HOME environment variable (+15 more)

### Community 3 - "Gateway Interactive Fix"
Cohesion: 0.12
Nodes (18): Firefox lock file cleanup fix, Jupyter database-is-locked fix, Using Gateway (Open OnDemand) on Gilbreth, Cluster Tools, Shell app (web terminal), Files app, 100 GB browser upload limit, Interactive Apps (+10 more)

### Community 4 - "Dynamic Gilbreth Partition"
Cohesion: 0.15
Nodes (17): Biography of Lillian Moller Gilbreth, Lillian Moller Gilbreth (namesake), Gilbreth Live Cluster Snapshot, MaxArraySize 1001 (Slurm limit), a10 partition (3x A10 24GB), a100-80gb partition (80GB cards), h100 partition (2x H100), normal QOS (14-day walltime) (+9 more)

### Community 5 - "Jobs Slurm Submission"
Cohesion: 0.14
Nodes (17): GPU Usage Monitoring, GPU Usage Monitor Tool (get_gpu_util), Holding/Releasing a Job (scontrol hold|release), Interactive Jobs (sinteractive), Slurm Job Dependencies (--dependency=after|afterok|afternotok|afterany), Custom ML Packages (conda-env-mod install), ML Batch Job (tensor_hello.sub), Checking Job Status (squeue/scontrol show job) (+9 more)

### Community 6 - "Content Job Sbatch"
Cohesion: 0.13
Nodes (16): Simple Job, --gpus-per-node requirement, a10 partition, sbatch command (simple job), standby queue, Submitting a Job, Account and Partition requirement, --nodes and --ntasks (+8 more)

### Community 7 - "Jobs Packages Conda"
Cohesion: 0.16
Nodes (14): Example Jobs index, Installing R Packages, R_LIBS_USER install directory, Loading Data into R (read.csv), Example python job (hello world, matrix, sine plot), Setting Up R Preferences with .Rprofile, RStudio launch (module load rstudio / app menu), Running R jobs (R --vanilla --no-save) (+6 more)

### Community 8 - "Content Programs Compiling"
Cohesion: 0.27
Nodes (12): Compiling Hybrid Programs, mpiifort compiler, Compiling MPI Programs, Intel MPI (IMPI), mpiicc compiler wrapper, OpenMPI, Compiling OpenMP Programs, -fopenmp GNU flag (+4 more)

### Community 9 - "Jobs Fluent Journal"
Cohesion: 0.18
Nodes (12): Running jobs, Submitting Fluent jobs to SLURM, ansys/2022R1 module, Fluent SLURM sbatch script, Fluent Text User Interface and Journal File, Fluent CLI flags (3ddp -t -g -i), Fluent journal file (.jou), Rationale: journal command order is critical (+4 more)

### Community 10 - "Content Compiling Open"
Cohesion: 0.22
Nodes (11): Compiling Source codes on Gilbreth, Compiling GPU/CUDA (nvcc), Compiling hybrid MPI+OpenMP, Intel MKL Library linking, Compiling MPI (mpicc/mpif90/mpiicc), Compiling OpenMP (-fopenmp/-qopenmp), Compiling serial (gcc/ifx/icx), Default toolchain (gcc 11.5.0 + openmpi 4.1.6 + cuda 12.6.0) (+3 more)

### Community 11 - "Provenance Extract Workflow"
Cohesion: 0.20
Nodes (8): chunks, edges, fail, files, meta, nodes, ok, SCHEMA

### Community 12 - "Provenance Workflow Capture"
Cohesion: 0.22
Nodes (7): clean, fail, meta, ok, SUMMARY_SCHEMA, totalWords, urls

### Community 13 - "Content Storage Smb"
Cohesion: 0.29
Nodes (8): Windows Credential Manager manual credential, Windows network drive, Fortress archival storage, Gilbreth home directory storage, Gilbreth scratch space storage, SMB/CIFS file transfer protocol, smbclient command-line SMB tool, Purdue campus network or VPN requirement for SMB access

### Community 14 - "Jobs Ansys Fluent"
Cohesion: 0.29
Nodes (7): Calculation with Fluent, FFF-1.cas.gz case file, Ansys Fluent Launcher, Preparing Case Files for Fluent, Ansys DesignModeler geometry, Ansys Meshing (FFF.msh), Ansys Workbench (.wbpj)

### Community 15 - "Jobs Matlab Parallel"
Cohesion: 0.57
Nodes (7): MATLAB on Gilbreth (overview & licenses), MATLAB Implicit Parallelism (-singleCompThread), MATLAB Script .m File (serial matlab -r), MATLAB Distributed Computing Server Parallel Job (labBroadcast/spmd), MATLAB Parallel Computing Toolbox parfor Job, MATLAB Cluster Profile Manager (myslurmprofile), MATLAB Parallel Toolbox spmd Job

### Community 16 - "Content Ssh Accounts"
Cohesion: 0.40
Nodes (6): Accounts on Gilbreth, Community cluster purchase access, SSH keys, SSH login (Career Account + BoilerKey/MFA), ThinLinc remote desktop, SSH X11 forwarding

### Community 17 - "Content Directives Job"
Cohesion: 0.33
Nodes (6): Canceling a Job (scancel), Checking Job Output (slurm-<jobid>.out), --output / --error directives, Directives (#SBATCH syntax), Partition/QOS in directives (--partition=a30 --qos=standby), Generic SLURM Jobs index

### Community 18 - "Content Gres Gpu"
Cohesion: 0.67
Nodes (4): Gaussian example (subg16, gaussian16 module), subg16 submission wrapper (--gres=gpu:1), GPU job example (cuda, --gres=gpu:1), GPU request (--gres=gpu:1 / --gpus-per-node / --gpus-per-task)

### Community 20 - "Content Ansys Example"
Cohesion: 0.67
Nodes (3): Ansys Fluent example, Ansys module (module load ansys), rcac-runwb2 launcher (Ansys Workbench project in scratch)

### Community 21 - "Content Apptainer Container"
Cohesion: 0.67
Nodes (3): Apptainer container example, Apptainer image build (apptainer build .sif Buildfile / --sandbox), Apptainer overlay paths (/apps /scratch /depot /home)

## Knowledge Gaps
- **148 isolated node(s):** `learn_from_failure.sh script`, `meta`, `urls`, `SUMMARY_SCHEMA`, `clean` (+143 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Slurm batch scheduler` connect `Content Gpu Gilbreth` to `Jobs Fluent Journal`, `Gateway Interactive Fix`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `Preflight Verification Checklist` connect `Playbooks Conda Open` to `Dynamic Gilbreth Partition`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `learn_from_failure.sh script`, `meta`, `urls` to the rest of the system?**
  _153 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Playbooks Conda Open` be split into smaller, more focused modules?**
  _Cohesion score 0.14082503556187767 - nodes in this community are weakly interconnected._
- **Should `Storage Home Scratch` be split into smaller, more focused modules?**
  _Cohesion score 0.0967741935483871 - nodes in this community are weakly interconnected._
- **Should `Content Gpu Gilbreth` be split into smaller, more focused modules?**
  _Cohesion score 0.09881422924901186 - nodes in this community are weakly interconnected._
- **Should `Gateway Interactive Fix` be split into smaller, more focused modules?**
  _Cohesion score 0.12418300653594772 - nodes in this community are weakly interconnected._