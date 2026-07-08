---
source: https://docs.rcac.purdue.edu/userguides/gilbreth/compile/
section: compile
slug: compile
title: Compiling Source codes on Gilbreth
---

# Compiling Source codes on Gilbreth

This section covers compiling programs on the Gilbreth cluster, including serial, OpenMP, MPI, hybrid (MPI/OpenMP), and GPU (CUDA) programs, as well as linking against the Intel MKL library. Compilers for C, C++, and Fortran are provided through environment modules.

- [Compiling GPU Programs](#compiling-gpu-programs)
- [Compiling Hybrid Programs](#compiling-hybrid-programs)
- [Compiling Serial Programs](#compiling-serial-programs)
- [Compiling MPI Programs](#compiling-mpi-programs)
- [Compiling OpenMP Programs](#compiling-openmp-programs)
- [Intel MKL Library](#intel-mkl-library)

## Compiling GPU Programs

The Gilbreth cluster nodes contain GPUs that support *CUDA* and *OpenCL*. See the Gilbreth Overview for the specifics on the GPUs in Gilbreth. This section focuses on using CUDA.

A simple CUDA program has a basic workflow:

* Initialize an array on the host (CPU).
* Copy array from host memory to GPU memory.
* Apply an operation to array on GPU.
* Copy array from GPU memory to host memory.

Here is a sample CUDA program:

* [`gpu_hello.cu`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/gpu_hello.cu)

Both front-ends and GPU-enabled compute nodes have the CUDA tools and libraries available to compile CUDA programs. To compile a CUDA program, load CUDA, and use `nvcc` to compile the program:

```bash
$ module load gcc/11.4.1 cuda/12.6.0
$ nvcc gpu_hello.cu -o gpu_hello
./gpu_hello
No GPU specified, using first GPUhello, world
```

The example illustrates only how to copy an array between a CPU and its GPU but does not perform a serious computation.

The following program times three square matrix multiplications on a CPU and on the global and shared memory of a GPU:

- [`mm.cu`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/mm.cu)

```bash
$ module load cuda
$ nvcc mm.cu -o mm
$ ./mm 0
                                                            speedup
                                                            -------
Elapsed time in CPU:                    6555.2 milliseconds
Elapsed time in GPU (global memory):      32.9 milliseconds  199.1
Elapsed time in GPU (shared memory):       3.0 milliseconds  2191.8
```

For best performance, the input array or matrix must be sufficiently large to overcome the overhead in copying the input and output data to and from the GPU.

For more information about NVIDIA, CUDA, and GPUs:

* [NVIDIA CUDA C Best Practices Guide](http://developer.download.nvidia.com/compute/DevZone/docs/html/C/doc/CUDA_C_Best_Practices_Guide.pdf)
* [NVIDIA CUDA C Programming Guide](http://developer.download.nvidia.com/compute/DevZone/docs/html/C/doc/CUDA_C_Programming_Guide.pdf)
* [NVIDIA GPU Computing Documentation](http://developer.nvidia.com/nvidia-gpu-computing-documentation)
* [NVIDIA The CUDA Compiler Driver NVCC](http://developer.download.nvidia.com/compute/DevZone/docs/html/C/doc/nvcc.pdf)
* [NVIDIA CUDA-GDB Debugger](http://developer.download.nvidia.com/compute/DevZone/docs/html/C/doc/cuda-gdb.pdf)
* [NVIDIA GPU Computing Webinars](http://developer.nvidia.com/gpu-computing-webinars)
* [NVIDIA](http://www.nvidia.com/page/home.html)
* [General-Purpose Computation on Graphics Hardware](http://gpgpu.org/)

## Compiling Hybrid Programs

Hybrid programs require including header files:

| Language | Header Files |
| -------- | -------- |
| Fortran 77 | `INCLUDE 'omp_lib.h'` <br> `INCLUDE 'mpif.h'` |
| Fortran 90 | `use omp_lib` <br> `INCLUDE 'mpif.h'` |
| Fortran 95 | `use omp_lib` <br> `INCLUDE 'mpif.h'` |
| C | `#include <mpi.h>` <br> `#include <omp.h>` |
| C++ | `#include <mpi.h>` <br> `#include <omp.h>` |

A few examples illustrate hybrid programs with task parallelism of OpenMP:

- [`hybrid_hello.f`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/hybrid_hello.f)
- [`hybrid_hello.f90`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/hybrid_hello.f90)
- [`hybrid_hello.f95`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/hybrid_hello.f95)
- [`hybrid_hello.c`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/hybrid_hello.c)
- [`hybrid_hello.cpp`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/hybrid_hello.cpp)

This example illustrates a hybrid program with loop-level (data) parallelism of OpenMP:

- [`hybrid_loop.c`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/hybrid_loop.c)

To see the available MPI libraries:

```bash
$ module avail impi
$ module avail openmpi
```

The following tables illustrate how to compile your hybrid (MPI/OpenMP) program. Any compiler flags accepted by Intel ifort/icc compilers are compatible with their respective MPI compiler.

**Intel MPI (IMPI) with Intel Compiler**

| Language | Command |
| -------- | -------- |
| Fortran 77 | `$ mpiifort -qopenmp myprogram.f -o myprogram` |
| Fortran 90 | `$ mpiifort -openmp myprogram.f90 -o myprogram` |
| Fortran 95 | `$ mpiifort -openmp myprogram.f90 -o myprogram` |
| C | `$ mpiicc -qopenmp myprogram.c -o myprogram` |
| C++ | `$ mpiicpc -qopenmp myprogram.cpp -o myprogram` |

**OpenMPI with GNU Compiler**

| Language | Command |
| -------- | -------- |
| Fortran 77 | `$ mpif77 -fopenmp myprogram.f -o myprogram` |
| Fortran 90 | `$ mpif90 -fopenmp myprogram.f90 -o myprogram` |
| Fortran 95 | `$ mpif90 -fopenmp myprogram.f95 -o myprogram` |
| C | `$ mpicc -fopenmp myprogram.c -o myprogram` |
| C++ | `$ mpiCC -fopenmp myprogram.cpp -o myprogram` |

The Intel and GNU compilers will not output anything for a successful compilation. Also, the Intel compiler does not recognize the suffix `.f95`.

## Compiling Serial Programs

A serial program is a single process which executes as a sequential stream of instructions on one processor core. Compilers capable of serial programming are available for C, C++, and versions of Fortran.

Here are a few sample serial programs:

- [`serial_hello.f`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/serial_hello.f)
- [`serial_hello.f90`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/serial_hello.f90)
- [`serial_hello.f95`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/serial_hello.f95)
- [`serial_hello.c`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/serial_hello.c)
- [`serial_hello.cpp`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/serial_hello.cpp)

To load a compiler, enter one of the following:

```bash
$ module load intel
$ module load gcc
```

**The following table illustrates how to compile your serial program:**

| Language | Intel Compiler | GNU Compiler |
| -------- | -------- | -------- |
| Fortran 77 | `$ ifx  myprogram.f -o myprogram` | `$ gfortran myprogram.f -o myprogram` |
| Fortran 90 | `$ ifx  myprogram.f90 -o myprogram` | `$ gfortran myprogram.f90 -o myprogram` |
| Fortran 95 | `$ ifx  myprogram.f90 -o myprogram` | `$ gfortran myprogram.f95 -o myprogram` |
| C | `$ icx  myprogram.c -o myprogram` | `$ gcc myprogram.c -o myprogram` |
| C++ | `$ icpx myprogram.cpp -o myprogram` | `$ g++ myprogram.cpp -o myprogram` |

The Intel and GNU compilers will not output anything for a successful compilation. Also, the Intel compiler does not recognize the suffix `.f95`.

## Compiling MPI Programs

OpenMPI and Intel MPI (IMPI) are implementations of the Message-Passing Interface (MPI) standard. Libraries for these MPI implementations and compilers for C, C++, and Fortran are available on all clusters.

**MPI programs require including a header file:**

| Language | Header Files |
| -------- | -------- |
| Fortran 77 | `INCLUDE 'mpif.h'` |
| Fortran 90 | `INCLUDE 'mpif.h'` |
| Fortran 95 | `INCLUDE 'mpif.h'` |
| C | `#include <mpi.h>` |
| C++ | `#include <mpi.h>` |

Here are a few sample programs using MPI:

- [`mpi_hello.f`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/mpi_hello.f)
- [`mpi_hello.f90`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/mpi_hello.f90)
- [`mpi_hello.f95`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/mpi_hello.f95)
- [`mpi_hello.c`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/mpi_hello.c)
- [`mpi_hello.cpp`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/mpi_hello.cpp)

To see the available MPI libraries:

```bash
$ module avail openmpi
$ module avail impi
```

**The following table illustrates how to compile your MPI program. Any compiler flags accepted by Intel ifort/icc compilers are compatible with their respective MPI compiler:**

| Language | Intel MPI | OpenMPI |
| -------- | -------- | -------- |
| Fortran 77 | `$ mpiifort program.f -o program` | `$ mpif77 program.f -o program` |
| Fortran 90 | `$ mpiifort program.f90 -o program` | `$ mpif90 program.f90 -o program` |
| Fortran 95 | `$ mpiifort program.f95 -o program` | `$ mpif90 program.f95 -o program` |
| C | `$ mpiicc program.c -o program` | `$ mpicc program.c -o program` |
| C++ | `$ mpiicpx program.cpp -o program` | `$ mpiCC program.cpp -o program` |

The Intel and GNU compilers will not output anything for a successful compilation. Also, the Intel compiler does not recognize the suffix `.f95`.

Here is some more documentation from other sources on the MPI libraries:

- [Message Passing Interface Forum](http://www.mpi-forum.org/)
- [Open MPI Home](http://www.open-mpi.org/)
- [Open MPI Documentation](http://www.open-mpi.org/doc/)

## Compiling OpenMP Programs

All compilers installed on RCAC clusters include OpenMP functionality for C, C++, and Fortran. An OpenMP program is a single process that takes advantage of a multi-core processor and its shared memory to achieve a form of parallel computing called multithreading. It distributes the work of a process over processor cores in a single compute node without the need for MPI communications.

**OpenMP programs require including a header file:**

| Language | Header Files |
| -------- | -------- |
| Fortran 77 | `INCLUDE 'omp_lib.h'` |
| Fortran 90 | `use omp_lib` |
| Fortran 95 | `use omp_lib` |
| C | `#include <omp.h>` |
| C++ | `#include <omp.h>` |

Sample programs illustrate task parallelism of OpenMP:

- [`omp_hello.f`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/omp_hello.f)
- [`omp_hello.f90`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/omp_hello.f90)
- [`omp_hello.f95`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/omp_hello.f95)
- [`omp_hello.c`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/omp_hello.c)
- [`omp_hello.cpp`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/omp_hello.cpp)

A sample program illustrates loop-level (data) parallelism of OpenMP:

- [`omp_loop.c`](https://docs.rcac.purdue.edu/assets/scripts/userguides/compile/src/omp_loop.c)

To load a compiler, enter one of the following:

```bash
$ module load intel
$ module load gcc
```

**The following table illustrates how to compile your shared-memory program. Any compiler flags accepted by ifort/icc compilers are compatible with OpenMP:**

| Language | Intel Compiler | GNU Compiler |
| -------- | -------- | -------- |
| Fortran 77 | `$ ifx -qopenmp myprogram.f -o myprogram` | `$ gfortran -fopenmp myprogram.f -o myprogram` |
| Fortran 90 | `$ ifx -qopenmp myprogram.f90 -o myprogram` | `$ gfortran -fopenmp myprogram.f90 -o myprogram` |
| Fortran 95 | `$ ifx -qopenmp myprogram.f95 -o myprogram` | `$ gfortran -fopenmp myprogram.f95 -o myprogram` |
| C | `$ icx -qopenmp myprogram.c -o myprogram` | `$ gcc -fopenmp myprogram.c -o myprogram` |
| C++ | `$ icpx -qopenmp myprogram.cpp -o myprogram` | `$ g++ -fopenmp myprogram.cpp -o myprogram` |

The Intel and GNU compilers will not output anything for a successful compilation. Also, the Intel compiler does not recognize the suffix `.f95`.

Here is some more documentation from other sources on OpenMP:

- [OpenMP Home](http://www.openmp.org/)
- [Community of OpenMP Users](http://www.compunity.org/)
- [Intel OpenMP](http://software.intel.com/en-us/articles/getting-started-with-openmp/)
- [GCC OpenMP](http://gcc.gnu.org/wiki/openmp)

## Intel MKL Library

Intel Math Kernel Library (MKL) contains ScaLAPACK, LAPACK, Sparse Solver, BLAS, Sparse BLAS, CBLAS, GMP, FFTs, DFTs, VSL, VML, and Interval Arithmetic routines. MKL resides in the directory stored in the environment variable `MKL_HOME`, after loading a version of the Intel compiler with `module`.

By using `module load` to load an Intel compiler your environment will have several variables set up to help link applications with MKL. Here are some example combinations of simplified linking options:

```bash
$ module load intel
$ echo $LINK_LAPACK
-L${MKL_HOME}/lib/intel64 -lmkl_intel_lp64 -lmkl_intel_thread -lmkl_core -liomp5 -lpthread

$ echo $LINK_LAPACK95
-L${MKL_HOME}/lib/intel64 -lmkl_lapack95_lp64 -lmkl_blas95_lp64 -lmkl_intel_lp64 -lmkl_intel_thread -lmkl_core -liomp5 -lpthread
```

RCAC recommends you use the provided variables to define MKL linking options in your compiling procedures. The Intel compiler modules also provide two other environment variables, `LINK_LAPACK_STATIC` and `LINK_LAPACK95_STATIC` that you may use if you need to link MKL statically.

RCAC recommends that you use dynamic linking of libguide. If so, define `LD_LIBRARY_PATH` such that you are using the correct version of libguide at run time. If you use static linking of libguide, then:

* If you use the Intel compilers, link in the libguide version that comes with the compiler (use the `-openmp` option).
* If you do not use the Intel compilers, link in the libguide version that comes with the Intel MKL above.

Here are some more documentation from other sources on the Intel MKL:

* [Intel MKL Documentation](http://software.intel.com/en-us/articles/intel-math-kernel-library-documentation)
