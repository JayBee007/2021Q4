# Process VS Threads

| Process                                                      | Threads                                              |
| ------------------------------------------------------------ | ---------------------------------------------------- |
| Involves system calls                                        | No system call involved                              |
| OS treats different processes differently                    | All user level threads treated as single task for OS |
| Different process different copies of data, files, code etc. | Share same copy of code,data,files etc.              |
| Context switching is slower                                  | Context switching is faster                          |
| Blocking a process wilt not block other processes            | Blocking a thread will block entire process          |
| Independent                                                  | Interdependent                                       |
