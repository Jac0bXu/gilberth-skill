---
source: https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/examples/python_env_example/
section: run_jobs
slug: run_jobs/examples/python_env_example
title: Example: Create and Use Biopython Environment with Conda
---

# Example: Create and Use Biopython Environment with Conda

### Using conda to create an environment that uses the biopython package

To use Conda you must first load the anaconda module:

```bash
module load conda
```

Create an empty conda environment to install biopython:

```bash
conda-env-mod create -n biopython
```

Now activate the biopython environment:

```bash
module load use.own
module load conda-env/biopython-py3.12.5
```

Install the biopython packages in your environment:

```bash
conda install --channel anaconda biopython -y
Fetching package metadata ..........
Solving package specifications .........
.......
Linking packages ...
[    COMPLETE    ]|################################################################
```

The `--channel` option specifies that it searches the anaconda channel for the biopython package. The `-y` argument is optional and allows you to skip the installation prompt. A list of packages will be displayed as they are installed.

Remember to add the following lines to your job submission script to use the custom environment in your jobs:

```bash
module load conda
module load use.own
module load conda-env/biopython-py3.12.5
```

If you need further help or run into any issues with creating environments, contact us or drop by a coffee hour session for in-person help.

For more information about Python:

- The Python Programming Language - Official Website
- Anaconda Python Distribution - Official Website
- Conda User Guide
