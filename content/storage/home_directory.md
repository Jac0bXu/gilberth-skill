---
source: https://docs.rcac.purdue.edu/userguides/gilbreth/storage/home_directory/
section: storage
slug: storage/home_directory
title: Home Directory
---

# Home Directory

Home directories are provided for long-term file storage. Each user has one home directory. You should use your home directory for storing important program files, scripts, input data sets, critical results, and frequently used files. You should store infrequently used files on Fortress. Your home directory becomes your current working directory, by default, when you log in.

Daily snapshots of your home directory are provided for a limited period of time in the event of accidental deletion. For additional security, you should store another copy of your files on more permanent storage, such as the Fortress HPSS Archive.

Your home directory physically resides on a GPFS storage system in the data center. To find the path to your home directory, first log in then immediately enter the following:

|  |  |
| --- | --- |
| ``` 1 2 ``` | ``` $ pwd /home/myusername ``` |

Or from any subdirectory:

|  |  |
| --- | --- |
| ``` 1 2 ``` | ``` $ echo $HOME /home/myusername ``` |

Note

Your home directory has a quota limiting the total size of files you may store within. For more information, refer to the Storage Quotas / Limits Section.

## Lost File Recovery

Nightly snapshots for 7 days, weekly snapshots for 4 weeks, and monthly snapshots for 3 months are kept. This means you will find snapshots from the last 7 nights, the last 4 Sundays, and the last 3 first of the months. Files are available going back between two and three months, depending on how long ago the last first of the month was. Snapshots beyond this are not kept. For additional security, you should store another copy of your files on more permanent storage, such as the Fortress HPSS Archive.

## Performance

Your home directory is medium-performance, non-purged space suitable for tasks like sharing data, editing files, developing and building software, and many other uses.

Note

Your home directory is not designed or intended for use as high-performance working space for running data-intensive jobs with heavy I/O demands.
