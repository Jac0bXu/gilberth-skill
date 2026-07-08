---
source: https://docs.rcac.purdue.edu/userguides/gilbreth/run_jobs/examples/python_source/
section: run_jobs
slug: run_jobs/examples/python_source
title: Installing Packages from Source
---

# Installing Packages from Source

We maintain several Anaconda installations. Anaconda maintains numerous popular scientific Python libraries in a single installation. If you need a Python library not included with normal Python we recommend first checking Anaconda. For a list of modules currently installed in the Anaconda Python distribution:

```bash
$ module load conda
$ conda list
# packages in environment at /apps/spack/bell/apps/anaconda/2020.02-py37-gcc-4.8.5-u747gsx:
#
# Name                    Version                   Build  Channel
_ipyw_jlab_nb_ext_conf    0.1.0                    py37_0
_libgcc_mutex             0.1                        main
alabaster                 0.7.12                   py37_0
anaconda                  2020.02                  py37_0
...
```

If you see the library in the list, you can simply import it into your Python code after loading the Anaconda module.

If you do not find the package you need, you should be able to install the library in your own Anaconda customization. First try to install it with Conda or Pip. If the package is not available from either Conda or Pip, you may be able to install it from source.

Use the following instructions as a guideline for installing packages from source. Make sure you have a download link to the software (usually it will be a `tar.gz` archive file). You will substitute it on the wget line below.

We also assume that you have already created an empty conda environment as described in our Python package installation guide.

```bash
 1  $ mkdir ~/src
 2  $ cd ~/src
 3  $ wget http://path/to/source/tarball/app-1.0.tar.gz
 4  $ tar xzvf app-1.0.tar.gz
 5  $ cd app-1.0
 6  $ module load conda
 7  $ module load use.own
 8  $ module load conda-env/mypackages-py3.8.5
 9  $ python setup.py install
10  $ cd ~
11  $ python
12  >>> import app
13  >>> quit()
```

The "import app" line should return without any output if installed successfully. You can then import the package in your python scripts.

If you need further help or run into any issues installing a library, contact us or drop by Coffee Hour for in-person help.

For more information about Python:

- The Python Programming Language - Official Website
- Anaconda Python Distribution - Official Website
- Conda User Guide
