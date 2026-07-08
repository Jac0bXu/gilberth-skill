---
source: https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/cancelling_job/
section: run_jobs
slug: run_jobs/cancelling_job
title: Canceling a Job
---

# Canceling a Job

To stop a job before it finishes or remove it from a queue, use the `scancel` command:

```bash
scancel myjobid
```

You find the job ID using the `squeue` command as explained in the SLURM Job Status section.
