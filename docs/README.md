# About logging

### [Read in Ukrainian](./ukr-readme.md)

## Log file

Log file – is a file that automatically records the information about events that happen during program work. Software information logging is used for audit, profiling, collecting statistics and most often to identify the causes of software failures (see useful links).

## Ways and levels of logging

Logging methods may differ depending on the type of software that generates the log files. Some desktop applications generate such files only when the program crashes. Server applications usually log any activity.

Logging allows storing information on the status and behavior of the software system until it crashes or detects incorrect operation. If the user has problems with your program installed on his computer, you can get files with logs from him to investigate anomalies in the program. If your web server crashes, you can investigate the saved information about queries that caused the problem and fix it.

Of course, there is a question what and when to log. Events are distributed by logging levels depending on the importance and type of the event. Practically, the most common used levels are ERROR, WARN, INFO, DEBUG and TRACE.

## What is worth to log?

You don’t need to log confidential information about users: passwords, bank card numbers, social security numbers, etc. You can read more on what you need and don’t need to log [here](https://www.owasp.org/index.php/Logging_Cheat_Sheet).

Lack of information in the logs will not reveal the cause of the breakdown, but the excess of logs will complicate their processing and can lead to reduced program speed and make the program to create log files that can reach gigabytes (as one of customer support employee said, there was a case when the log file was 50 GB!).

To solve the problem of the log-files size increase, you can use the [ring buffer logging](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.31.6746&rep=rep1&type=pdf)

## Logging advices

Before you start implementing your first logs in the program, read the 10 advices of logging (see useful links).

To process the generated logs and search for information in them, you can use standard text editors and the power of regular expressions, or more specialized tools, such as lnav.

### [Useful links](./useful-links.md)
