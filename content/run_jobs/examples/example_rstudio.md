---
source: https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/examples/example_rstudio/
section: run_jobs
slug: run_jobs/examples/example_rstudio
title: RStudio
---

# RStudio

RStudio is a graphical integrated development environment (IDE) for R. RStudio is the most popular environment for developing both R scripts and packages. RStudio is provided on most Research systems.

There are two methods to launch RStudio on the cluster: command-line and application menu icon.

## Launch RStudio via command-line:

```bash
module load gcc
module load r
module load rstudio
rstudio
```

Note that RStudio is a graphical program and in order to run it you must have a local X11 server running or use Thinlinc Remote Desktop environment. See the ssh X11 forwarding section for more details.

## Launch Rstudio via the application menu icon:

- Log into desktop.gilbreth.rcac.purdue.edu with web browser or ThinLinc client
- Click on the `Applications` drop down menu on the top left corner
- Choose `Cluster Software` and then `RStudio`

R and RStudio are free to download and run on your local machine. For more information about RStudio:

- RStudio Official Website
- RStudio Essentials: Tutorial
- DataCamp: Working with the RStudio IDE
