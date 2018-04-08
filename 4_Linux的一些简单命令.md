# 系统相关
```console
# 查看系统版本号(RHEL, CentOS)
$ cat /etc/redhat-release

# OSX系统，查看本机ip
$ ifconfig en0
```

# 磁盘空间相关
```console
# 查看当前所在目录有哪些大文件
$ du -sh *

# 查看磁盘各分区大小、已用空间等信息
$ df -h

# 查看foo/目录所占磁盘空间
$ du -sh foo
```

# 查找文件
```console
# 查找当前目录及其子目录下，文件名以“foo”结尾的文件
$ find -name '*foo'

# 查找“/”目录（系统根目录）及其子目录下的，文件名包含“foo”关键字的文件
$ find / -name '*foo*'
```

# 查看文件
```console
# 输出“foo.js”文件的内容
$ cat foo.js
```

# 远程
```console
# 查看指定ip是否开放了指定端口
$ nc -zv 192.168.1.15 22
```
