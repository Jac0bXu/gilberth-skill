---
source: https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/directives/
section: run_jobs
slug: run_jobs/directives
title: Directives
---

# Directives

So far these examples have shown submitting jobs with the resource requests on the `sbatch` command line such as:

```bash
sbatch -A accountname --partition=a30 --qos=standby --nodes=1 --gpus-per-node=1 --time=00:01:00 --mem=20G hello.sub
```

The resource requests can also be put into job submission file itself. Documenting the resource requests in the job submission is desirable because the job can be easily reproduced later. Details left in your command history are quickly lost. Arguments are specified with the `#SBATCH` syntax:

```bash
# hello.sub
#!/bin/bash
#SBATCH -A accountname --partition=a30 --qos=standby
#SBATCH --nodes=1 --gpus-per-node=1 --time=00:01:00 --mem=20G

# Show this ran on a compute node by running the hostname command.
hostname
echo "Hello World"
```

The `#SBATCH` directives must appear at the top of your submission file. SLURM will stop parsing directives as soon as it encounters a line that does not start with '#'. If you insert a directive in the middle of your script, it will be ignored.

This job can be then submitted with:

```bash
sbatch hello.sub
```
