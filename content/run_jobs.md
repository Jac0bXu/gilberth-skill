---
source: https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/
section: run_jobs
slug: run_jobs
title: Running jobs
---

# Running jobs

Jobs are submitted on Gilbreth via the SLURM (Simple Linux Utility for Resource Management) scheduler, which is responsible for allocating resources and scheduling the start time of a job. You may use either the batch or interactive mode to run your jobs. The batch mode is ideal for finished programs, and the interactive mode is useful for debugging your job.

Important

Do NOT run large, long, multi-threaded, parallel, or CPU-intensive jobs on a front-end login host. All users share the front-end hosts, and running anything but the smallest test job will negatively impact everyone's ability to use Gilbreth. Always use SLURM to submit your work as a job.

Before creating your submission script, learn more about how to use Slurm accounts, partitions, and QOS options:

- [Basics of using Slurm accounts, partitions, and QOS options](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/slurm_basics/)

Batch jobs submitted via SLURM have four main steps:

- [Creating the submission script](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/batch_scripts/)
- [Submitting the script as a job](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/submit_jobs/)
- [Monitoring the job](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/monitor_jobs/)
- [Checking the job output](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/check_jobs/)

### Other useful topics

- [Holding a job](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/holding_jobs/)
- [Job Dependencies](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/dependencies/)
- [Cancelling a job](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/cancel_jobs/)
- [GPU Usage Monitoring](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/gpu_usage/)

### Example jobs

- [Generic SLURM jobs](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/examples/generic/)
- [Python](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/examples/python/)
- [R](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/examples/r/)
- [Apptainer](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/examples/apptainer/)
- [Matlab](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/examples/matlab/)
- [Ansys](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/examples/ansys/)
- [Gaussian](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/examples/gaussian/)
- [MPI](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/examples/mpi/)
- [OpenMP](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/examples/openmp/)
- [GPU](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/examples/gpu/)

### Machine Learning Examples

- [Custom ML Packages](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/examples/custom_ml_packages/)
- [ML Batch Jobs](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/examples/ml_batch_jobs/)
