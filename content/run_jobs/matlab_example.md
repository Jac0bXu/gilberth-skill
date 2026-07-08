---
source: https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/matlab_example/
section: run_jobs
slug: run_jobs/matlab_example
title: Matlab
---

# Matlab

_MATLAB®_ (MATrix LABoratory) is a high-level language and interactive environment for numerical computation, visualization, and programming. MATLAB is a product of MathWorks.

MATLAB, Simulink, Compiler, and several of the optional toolboxes are available to faculty, staff, and students. To see the kind and quantity of all MATLAB licenses plus the number that you are currently using you can use the `matlab_licenses` command:

```
$ module load matlab
$ matlab_licenses
```

The MATLAB client can be run in the front-end for application development, however, computationally intensive jobs must be run on compute nodes.

The following sections provide several examples illustrating how to submit MATLAB jobs to a Linux compute cluster.

- [Matlab Script (`.m` File)](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/matlab_script/)
- [Implicit Parallelism](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/matlab_implicit_parallel/)
- [Profile Manager](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/matlab_profile_manager/)
- [Parallel Computing Toolbox (parfor)](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/matlab_parfor/)
- [Parallel Toolbox (spmd)](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/matlab_spmd/)
- [Distributed Computing Server (parallel job)](https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/matlab_parallel_job/)
