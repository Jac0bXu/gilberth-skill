---
source: https://docs.rcac.purdue.edu/userguides/gilbreth/software/
section: software
slug: software
title: Software - RCAC Documentation
---

# Software

## Software Catalog

A comprehensive list of centrally installed software applications can be found here:

[Software Catalog](https://docs.rcac.purdue.edu/userguides/gilbreth/software_catalog/)

## Module system

The Gilbreth cluster uses **Lmod** to manage the user environment, so users have access to the necessary software packages and versions to conduct their research activities. The associated `module` command can be used to load applications and compilers, making the corresponding libraries and environment variables automatically available in the user environment.

Lmod is a hierarchical module system, meaning a module can only be loaded after loading the necessary compilers and MPI libraries that it depends on. This helps avoid conflicting libraries and dependencies being loaded at the same time. A list of all available modules on the system can be found with the `module spider` command:

```bash
$ module spider  # list all modules, even those not available due to incompatible with currently loaded modules

-----------------------------------------------------------------------------------
The following is a list of the modules and extensions currently available:
-----------------------------------------------------------------------------------

  amdblis:        amdblis/3.0
  amdfftw:        amdfftw/3.0
  amdlibflame:    amdlibflame/3.0
  amdlibm:        amdlibm/3.0
  amdscalapack:   amdscalapack/3.0
  anaconda:       anaconda/2021.05-py38
  aocc:           aocc/3.0
  ...
```

The `module spider` command can also be used to search for specific module names.

```bash
$ module spider intel  # all modules with names containing 'intel'

-----------------------------------------------------------------------------------
  intel:
-----------------------------------------------------------------------------------
    Versions:
        intel/19.0.5.281
        intel/19.1.3.304
    Other possible modules matches:
        intel-mkl
-----------------------------------------------------------------------------------

$ module spider intel/19.1.3.304  # additional details on a specific module

-----------------------------------------------------------------------------------
  intel: intel/19.1.3.304
-----------------------------------------------------------------------------------
    This module can be loaded directly:
        module load intel/19.1.3.304
    Help:
      Intel Parallel Studio.
```

When users log into Gilbreth, a default compiler (GCC), MPI libraries (OpenMPI), and runtime environments (e.g., Cuda on GPU-nodes) are automatically loaded into the user environment. It is recommended that users explicitly specify which modules and which versions are needed to run their codes in their job scripts via the `module load` command. Users are advised not to insert `module load` commands in their bash profiles, as this can cause issues during initialization of certain software (e.g. Thinlinc).

When users load a module, the module system will automatically replace or deactivate modules to ensure the packages you have loaded are compatible with each other. Following example shows that the module system automatically unload the default Intel compiler version to a user-specified version:

```bash
$ module load intel  # load default version of Intel compiler
$ module list  # see currently loaded modules

Currently Loaded Modules:
  1) intel/19.0.5.281

$ module load intel/19.1.3.304  # load a specific version of Intel compiler
$ module list  # see currently loaded modules

The following have been reloaded with a version change:
  1) intel/19.0.5.281 => intel/19.1.3.304
```

Most modules on Gilbreth include extensive help messages, so users can take advantage of the `module help APPNAME` command to find information about a particular application or module. Every module also contains two environment variables named `$RCAC_APPNAME_ROOT` and `$RCAC_APPNAME_VERSION` identifying its installation prefix and its version. This information can be found by `module show APPNAME`. Users are encouraged to use generic environment variables such as CC, CXX, FC, MPICC, MPICXX etc. available through the compiler and MPI modules while compiling their code.

**Some other common module commands:**

To unload a module

```bash
$ module unload mymodulename
```

To unload all loaded modules and reset everything to original state.

To see all available modules that are compatible with current loaded modules.

To display information about a specified module, including environment changes, dependencies, software version and path.

```bash
$ module show mymodulename
```

## Running the Apps

### Find available apps in the terminal

In addition to searching the software catalog for available applications, one can generate a list via the terminal:

```bash
$ module avail

---------------------- Core Applications ---------------------
   amduprof/5.1.701                hypershell/2.5.2              ngc/default
   anaconda/2024.10-py312          hypershell/2.6.5              oclfpga/2024.1.0
   anaconda/2025.06-py313 (D)      hypershell/2.7.0     (D)      openblas/0.3.27
   [MORE...]
```

### View module prerequisites and license information

After finding the module that you want to load, use 'module spider' to find any prerequisites or license information, if applicable:

```bash
$ module spider hypershell

-------------------------------------------------------------
  hypershell:
-------------------------------------------------------------
    Description:
      A cross-platform, high-throughput computing utility for processing shell commands over a
      distributed, asynchronous queue.

    Versions:
        hypershell/2.5.2
        hypershell/2.6.5
        hypershell/2.7.0
```

### Load the module

Use the command specified in the 'module spider' output to load your software module:

```bash
module load hypershell/2.7.0
```

### Running GUI versions of apps

If the app you want to use has a GUI, you can also login to gilbreth via Thinlinc. More information on this process can be found here.
