---
source: https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/examples/example_r_profile_setup/
section: run_jobs
slug: run_jobs/examples/example_r_profile_setup
title: Setting Up R Preferences with .Rprofile
---

# Setting Up R Preferences with .Rprofile

For your convenience, a sample ~/.Rprofile example file is provided that can be downloaded to your cluster account and renamed into `~/.Rprofile` (or appended to one). Follow these steps to download our recommended `~/.Rprofile` example and copy it into place:

```bash
curl -#LO https://docs.rcac.purdue.edu/assets/scripts/userguides/Rprofile_example
mv -ib Rprofile_example ~/.Rprofile
```

The above installation step needs to be done only once on Gilbreth. Now load the R module and run R:

```bash
module load r/4.4.1
R
```

```bash
.libPaths()
[1] "/home/username/R/hostname/4.1.2-gcc-6.3.0-ymdumss"
[2] "/apps/spack/hostname/apps/r/4.1.2-gcc-6.3.0-ymdumss/rlib/R/library"
```

`.libPaths()` should output something similar to above if it is set up correctly.

You are now ready to install R packages into the dedicated directory `/home/username/R/hostname/4.1.2-gcc-6.3.0-ymdumss`.
