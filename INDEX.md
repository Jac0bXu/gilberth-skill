# Gilbreth Skill — Page Index


Auto-generated from the YAML headers of all captured files. **92 pages**, 38,706 words total.
Each page's full URL is in its `source:` header; exact code/`#SBATCH` directives are verbatim in the files.

_Query the knowledge graph (`graphify query …`) for synthesized answers; read the files for exact commands._


## Overview & Hardware  (1 pages)

| Page | File | Words | Summary |
|---|---|--:|---|
| **Gilbreth Overview** | `content/overview.md` | 542 | Gilbreth is a Community Cluster optimized for communities running GPU intensive applications such as machine l… |

## Biography (namesake)  (1 pages)

| Page | File | Words | Summary |
|---|---|--:|---|
| **Biography of Gilbreth - RCAC Documentation** | `content/biography.md` | 454 | Lillian Moller Gilbreth was an industrial engineer and efficiency expert who became Purdue's first female engi… |

## Accounts & Access  (1 pages)

| Page | File | Words | Summary |
|---|---|--:|---|
| **Accounts on Gilbreth** | `content/accounts.md` | 2441 | To obtain an account, you must be part of a research group which has purchased access to Gilbreth. Refer to th… |

## Software & Modules  (1 pages)

| Page | File | Words | Summary |
|---|---|--:|---|
| **Software - RCAC Documentation** | `content/software.md` | 728 | A comprehensive list of centrally installed software applications can be found here: |

## FAQs  (1 pages)

| Page | File | Words | Summary |
|---|---|--:|---|
| **Frequently Asked Questions - Gilbreth** | `content/faqs.md` | 1042 | Some common questions, errors, and problems are categorized below. You can also use the search box above to se… |

## Running Jobs (Slurm)  (51 pages)

| Page | File | Words | Summary |
|---|---|--:|---|
| **Running jobs** | `content/run_jobs.md` | 224 | Jobs are submitted on Gilbreth via the SLURM (Simple Linux Utility for Resource Management) scheduler, which i… |
| **Calculation with Fluent** | `content/run_jobs/ansysfluent/calculating.md` | 426 | Now all the files are ready for the Fluent calculations. Both "Geometry" and "Mesh" cells should have green ch… |
| **Preparing Case Files for Fluent** | `content/run_jobs/ansysfluent/preparing_cases.md` | 1091 | In the Ansys Workbench, create a new fluid flow analysis by double-clicking the Fluid Flow (Fluent) option und… |
| **Submitting Fluent jobs to SLURM** | `content/run_jobs/ansysfluent/submit_jobs.md` | 123 | The Fluent simulations can also run in batch. In this section we provide an example script for submitting Flue… |
| **Fluent Text User Interface and Journal File** | `content/run_jobs/ansysfluent/tui_journal.md` | 990 | If you pay attention to the "Console" window in the Fluent window when setting up and carrying out the calcula… |
| **Ansys Fluent - RCAC Documentation** | `content/run_jobs/ansysfluent_example.md` | 439 | Ansys is a CAE/multiphysics engineering simulation software that utilizes finite element analysis for numerica… |
| **Apptainer example** | `content/run_jobs/apptainer_example.md` | 589 | Apptainer is an open-source container platform designed to be simple, fast, and secure. It allows the portabil… |
| **Canceling a Job** | `content/run_jobs/cancelling_job.md` | 42 | To stop a job before it finishes or remove it from a queue, use the scancel command: |
| **Checking Job Output** | `content/run_jobs/checking_output.md` | 198 | Once a job is submitted, and has started, it will write its standard output and standard error to files that y… |
| **Job Submission Script** | `content/run_jobs/creating_the_submission_script.md` | 236 | To submit work to a SLURM queue, you must first create a _job submission file_. This job submission file is es… |
| **Directives** | `content/run_jobs/directives.md` | 167 | So far these examples have shown submitting jobs with the resource requests on the sbatch command line such as… |
| **Example Jobs** | `content/run_jobs/examples.md` | 37 | A number of example jobs are available for you to look over and adapt to your own needs. The first few are gen… |
| **Installing R Packages** | `content/run_jobs/examples/example_installing_r_packages.md` | 578 | - Different clusters have different hardware and softwares. So, if you have access to multiple clusters, you m… |
| **Loading Data into R** | `content/run_jobs/examples/example_loading_into_r.md` | 198 | R is an environment for manipulating data. In order to manipulate data, it must be brought into the R environm… |
| **Example python job** | `content/run_jobs/examples/example_python_job.md` | 249 | Prepare a Python input file with an appropriate filename, here named hello.py: |
| **Setting Up R Preferences with .Rprofile** | `content/run_jobs/examples/example_r_profile_setup.md` | 115 | For your convenience, a sample ~/.Rprofile example file is provided that can be downloaded to your cluster acc… |
| **RStudio** | `content/run_jobs/examples/example_rstudio.md` | 171 | RStudio is a graphical integrated development environment (IDE) for R. RStudio is the most popular environment… |
| **Running R jobs** | `content/run_jobs/examples/example_running_r_jobs.md` | 135 | This section illustrates how to submit a small R job to a SLURM queue. The example job computes a Pythagorean … |
| **Managing Environments with Conda** | `content/run_jobs/examples/python_conda.md` | 323 | Conda is a package manager in Anaconda that allows you to create and manage multiple environments where you ca… |
| **Example: Create and Use Biopython Environment with Conda** | `content/run_jobs/examples/python_env_example.md` | 210 | To use Conda you must first load the anaconda module: |
| **Numpy Parallel Behavior** | `content/run_jobs/examples/python_numpy.md` | 253 | The widely available Numpy package is the best way to handle numerical computation in Python. The numpy packag… |
| **Installing Packages** | `content/run_jobs/examples/python_packages.md` | 1679 | Installing Python packages in an Anaconda environment is recommended. One key advantage of Anaconda is that it… |
| **Managing Packages with Pip** | `content/run_jobs/examples/python_pip.md` | 207 | Pip is a Python package manager. Many Python package documentation provide pip instructions that result in per… |
| **Installing Packages from Source** | `content/run_jobs/examples/python_source.md` | 341 | We maintain several Anaconda installations. Anaconda maintains numerous popular scientific Python libraries in… |
| **Gaussian** | `content/run_jobs/gaussian_example.md` | 420 | Gaussian is a computational chemistry software package which works on electronic structure. This section illus… |
| **Generic SLURM Jobs** | `content/run_jobs/generic_slurm_jobs.md` | 54 | The following examples demonstrate the basics of SLURM jobs, and are designed to cover common job request scen… |
| **GPU** | `content/run_jobs/gpu_jobs.md` | 300 | The Gilbreth cluster nodes contain NVIDIA GPUs that support CUDA and OpenCL. See the detailed hardware overvie… |
| **GPU Usage Monitoring** | `content/run_jobs/gpu_usage_monitoring.md` | 633 | To ensure that GPUs are effectively utilized on our cluster, we log and store the power, memory, and utilizati… |
| **Holding a Job** | `content/run_jobs/holding_job.md` | 124 | Sometimes you may want to submit a job but not have it run just yet. You may be wanting to allow lab mates to … |
| **Interactive Jobs** | `content/run_jobs/interactive_jobs.md` | 202 | Interactive jobs are run on compute nodes, while giving you a shell to interact with. They give you the abilit… |
| **Job dependencies** | `content/run_jobs/job_dependencies.md` | 176 | Dependencies are an automated way of holding and releasing jobs. Jobs with a dependency are held until the con… |
| **Custom ML Packages - RCAC Documentation** | `content/run_jobs/learning/customml.md` | 1048 | While we try to include as many common ML frameworks and versions as we can in ML-Toolkit, we recognize that t… |
| **ML Batch Jobs** | `content/run_jobs/learning/ml_batch.md` | 150 | Batch jobs allow us to automate model training without human intervention. They are also useful when you need … |
| **Implicit Parallelism** | `content/run_jobs/matlab/implicit_parallelism.md` | 248 | MATLAB implements _implicit parallelism_ which is automatic multithreading of many computations, such as matri… |
| **Matlab Script (.m File)** | `content/run_jobs/matlab/interpreter.md` | 317 | This section illustrates how to submit a small, serial, MATLAB program as a job to a batch queue. This MATLAB … |
| **Distributed Computing Server (parallel job)** | `content/run_jobs/matlab/mdcs_parallel.md` | 656 | The MATLAB Parallel Computing Toolbox (PCT) enables a parallel job via the MATLAB Distributed Computing Server… |
| **Parallel Computing Toolbox (parfor)** | `content/run_jobs/matlab/parfor.md` | 627 | The MATLAB Parallel Computing Toolbox (PCT) extends MATLAB with high-level parallel-processing features such a… |
| **Profile Manager** | `content/run_jobs/matlab/profile_manager.md` | 310 | MATLAB offers two kinds of profiles for parallel execution: the local profile and user-defined cluster profile… |
| **Parallel Toolbox (spmd)** | `content/run_jobs/matlab/spmd.md` | 589 | The MATLAB Parallel Computing Toolbox (PCT) extends the MATLAB language with high-level parallel-processing fe… |
| **Matlab** | `content/run_jobs/matlab_example.md` | 137 | _MATLAB®_ (MATrix LABoratory) is a high-level language and interactive environment for numerical computation, … |
| **Checking Job Status** | `content/run_jobs/monitoring_job.md` | 319 | Once a job is submitted there are several commands you can use to monitor the progress of the job. |
| **Collecting System Resource Utilization Data** | `content/run_jobs/monitoring_resources.md` | 482 | Knowing the precise resource utilization an application had during a job, such as CPU load or memory, can be i… |
| **MPI - RCAC Documentation** | `content/run_jobs/mpi_jobs.md` | 523 | An MPI job is a set of processes that take advantage of multiple compute nodes by communicating with each othe… |
| **Multiple Node** | `content/run_jobs/multiple_node.md` | 224 | In some cases, you may want to request multiple nodes. To utilize multiple nodes, you need a program or code t… |
| **OpenMP** | `content/run_jobs/openmp_jobs.md` | 278 | A shared-memory job is a single process that takes advantage of a multi-core processor and its shared memory t… |
| **Python** | `content/run_jobs/python_example.md` | 88 | Python is a high-level, general-purpose, interpreted, dynamic programming language. We suggest using Anaconda … |
| **Slurm accounts, partitions, and QOS options** | `content/run_jobs/queues.md` | 2484 | On Gilbreth, the required options for job submission deviates from some of the other community clusters you mi… |
| **R** | `content/run_jobs/r_example.md` | 96 | R, a GNU project, is a language and environment for data manipulation, statistics, and graphics. It is an open… |
| **Serial Jobs** | `content/run_jobs/serial_jobs.md` | 80 | This shows how to submit one of the serial programs compiled in the section Compiling Serial Programs. |
| **Simple Job** | `content/run_jobs/simple_job.md` | 268 | Every SLURM job consists of a job submission file. A job submission file contains a list of commands that run … |
| **Submitting a Job** | `content/run_jobs/submit_script.md` | 500 | Once you have a job submission script, you may submit the script to SLURM using the sbatch command. SLURM will… |

## File Storage & Transfer  (20 pages)

| Page | File | Words | Summary |
|---|---|--:|---|
| **File Storage and Transfer** | `content/storage.md` | 174 | Learn more about file storage transfer for Gilbreth. |
| **Archive and Compression** | `content/storage/archive_and_compression.md` | 283 | There are several options for archiving and compressing groups of files or directories. The mostly commonly us… |
| **Environment variables** | `content/storage/environment_variables.md` | 187 | Several environment variables are automatically defined for you to help you manage your storage. Use environme… |
| **Ftp sftp - RCAC Documentation** | `content/storage/ftp_sftp.md` | 447 | > FTP is not supported on any research systems because it does not allow for secure transmission of data. Use … |
| **Globus** | `content/storage/globus.md` | 598 | Globus, previously known as Globus Online, is a powerful and easy to use file transfer service for transferrin… |
| **Home Directory** | `content/storage/home_directory.md` | 346 | Home directories are provided for long-term file storage. Each user has one home directory. You should use you… |
| **HSI** | `content/storage/hsi.md` | 395 | HSI, the Hierarchical Storage Interface, is the preferred method of transferring files to and from Gilbreth. H… |
| **HTAR** | `content/storage/htar.md` | 761 | HTAR (short for "HPSS TAR") is a utility program that writes TAR-compatible archive files directly onto Gilbre… |
| **Long-Term Storage** | `content/storage/long_term_storage.md` | 80 | Long-term Storage or Permanent Storage is available to users on the High Performance Storage System (HPSS), an… |
| **Lost File Recovery** | `content/storage/recover.md` | 314 | Gilbreth is protected against accidental file deletion through a series of snapshots taken every night just af… |
| **flost** | `content/storage/recover/flost.md` | 202 | If you know when you lost the file, the easiest way is to use the flost command. This tool is available from a… |
| **Mac OS X** | `content/storage/recover/mac.md` | 179 | Mac OS X does not provide any way to access the Gilbreth snapshots directly. To access the snapshots there are… |
| **Manual Browsing** | `content/storage/recover/manual.md` | 327 | You may also search through the snapshots by hand on the Gilbreth filesystem if you are not sure what date you… |
| **Windows** | `content/storage/recover/windows.md` | 147 | If you use Gilbreth through "network drives" on Windows you may recover lost files directly from within Window… |
| **Scp - RCAC Documentation** | `content/storage/scp.md` | 462 | SCP (Secure CoPy) is a simple way of transferring files between two machines that use the SSH protocol. SCP is… |
| **Scratch space - RCAC Documentation** | `content/storage/scratch_space.md` | 326 | Scratch directories are provided for short-term file storage only. The quota of your scratch directory is much… |
| **Sharing** | `content/storage/sharing.md` | 205 | Gilbreth supports several methods for file sharing: |
| **Storage Quota / Limits** | `content/storage/storage_quota.md` | 481 | Some limits are imposed on your disk usage on research systems. A quota is implemented on each filesystem. Eac… |
| **/tmp Directory** | `content/storage/tmp_directory.md` | 147 | /tmp directories are provided for short-term file storage only. Each front-end and compute node has a /tmp dir… |
| **Windows network drive** | `content/storage/windows_network_drive.md` | 510 | SMB (Server Message Block), also known as CIFS, is an easy-to-use file transfer protocol that is useful for tr… |

## Gateway (Open OnDemand)  (9 pages)

| Page | File | Words | Summary |
|---|---|--:|---|
| **Using Gateway (Open OnDemand) on Gilbreth** | `content/gateway.md` | 165 | Gilbreth's Gateway is an open-source HPC portal developed by the Ohio Supercomputing Center. Open OnDemand all… |
| **Cluster Tools** | `content/gateway/cluster_tools.md` | 98 | The Cluster Tools menu contains cluster utilities. At the moment, only a terminal app is provided. Additional … |
| **Files** | `content/gateway/files.md` | 205 | The Files app will let you access your files in your Home Directory, Scratch, and Data Depot spaces. The app l… |
| **Compute Node Desktop** | `content/gateway/interactive/desktop.md` | 248 | The Compute Node Desktop app will launch a graphical desktop session on a compute node. This is similar to usi… |
| **MATLAB** | `content/gateway/interactive/matlab.md` | 246 | The MATLAB app will launch a MATLAB session on a compute node and allow you to connect directly to it in a web… |
| **Jupyter Notebook** | `content/gateway/interactive/notebook.md` | 515 | The Notebook app will launch a Notebook session on a compute node and allow you to connect directly to it in a… |
| **RStudio Server** | `content/gateway/interactive/rstudio.md` | 206 | The RStudio app will launch a RStudio session on a compute node and allow you to connect directly to it in a w… |
| **Interactive Apps** | `content/gateway/interactive_apps.md` | 124 | There are several interactive apps available through Gateway that can be accessed through the Interactive Apps… |
| **Jobs - RCAC Documentation** | `content/gateway/jobs.md` | 254 | There are four apps under the Jobs apps: Active Jobs and Job Composer. These are detailed below. |

## Compiling Source Code  (7 pages)

| Page | File | Words | Summary |
|---|---|--:|---|
| **Compiling Source codes on Gilbreth** | `content/compile.md` | 1730 | This section covers compiling programs on the Gilbreth cluster, including serial, OpenMP, MPI, hybrid (MPI/Ope… |
| **Compiling GPU Programs** | `content/compile/compile_gpu.md` | 298 | The Gilbreth cluster nodes contain GPUs that support _CUDA_ and _OpenCL_. See the Gilbreth Overview for the sp… |
| **Compiling Hybrid Programs** | `content/compile/compile_hybrid.md` | 302 | Hybrid programs require including header files: |
| **Intel MKL Library** | `content/compile/compile_intel_mkl.md` | 257 | Intel Math Kernel Library (MKL) contains ScaLAPACK, LAPACK, Sparse Solver, BLAS, Sparse BLAS, CBLAS, GMP, FFTs… |
| **Compiling MPI Programs** | `content/compile/compile_mpi.md` | 285 | OpenMPI and Intel MPI (IMPI) are implementations of the Message-Passing Interface (MPI) standard. Libraries fo… |
| **Compiling OpenMP Programs** | `content/compile/compile_openmp.md` | 336 | All compilers installed on RCAC clusters include OpenMP functionality for C, C++, and Fortran. An OpenMP progr… |
| **Compiling Serial Programs** | `content/compile/compile_serial.md` | 200 | A serial program is a single process which executes as a sequential stream of instructions on one processor co… |
