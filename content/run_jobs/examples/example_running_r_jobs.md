---
source: https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/examples/example_running_r_jobs/
section: run_jobs
slug: run_jobs/examples/example_running_r_jobs
title: Running R jobs
---

# Running R jobs

This section illustrates how to submit a small R job to a SLURM queue. The example job computes a Pythagorean triple.

Prepare an R input file with an appropriate filename, here named `myjob.R`:

```r
# FILENAME:  myjob.R

# Compute a Pythagorean triple.
a = 3
b = 4
c = sqrt(a*a + b*b)
c     # display result
```

Prepare a job submission file with an appropriate filename, here named `myjob.sub`:

```bash
#!/bin/bash
# FILENAME:  myjob.sub

module load r

# --vanilla:
# --no-save: do not save datasets at the end of an R session
R --vanilla --no-save < myjob.R
```

Submit the Job and view the results

For other examples or R jobs:

- The R Manuals
- Other R Examples
- Software Carpentry - Programming with R
- Data Carpentry Lessons
