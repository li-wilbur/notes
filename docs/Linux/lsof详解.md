# lsof 命令详解

lsof（List Open Files）是一个列出当前系统打开文件的强大工具。在 Linux/Unix 系统中，"一切皆文件"，因此 lsof 不仅可以显示普通文件和目录，还可以显示网络连接、套接字、设备文件、管道等。lsof 是系统管理员进行故障排查、性能分析和安全审计的重要工具。通过 lsof，用户可以了解哪些进程正在使用特定文件，哪个进程正在监听特定端口，以及文件被锁定的原因等信息。

## 基本语法

```bash
lsof [选项]
lsof [选项] 文件名
lsof [选项] -p 进程ID
lsof [选项] -i [协议][@主机名][:端口]
```

lsof 命令最基本的用法是直接运行，它会列出系统中所有打开的文件描述符。更常用的用法是结合各种选项来筛选特定的文件、进程或网络连接。lsof 的输出包含多个列，分别是 COMMAND（命令名）、PID（进程ID）、USER（用户）、FD（文件描述符）、TYPE（文件类型）、DEVICE（设备号）、SIZE/OFF（大小或偏移量）、NODE（索引节点号）、NAME（文件名或网络地址）。

## 常用选项

- `-a`：逻辑与运算组合多个选项
- `-c 进程名`：显示指定命令名打开的文件
- `-d 文件描述符`：指定文件描述符范围
- `-i`：显示网络连接相关文件
- `-p 进程ID`：显示指定进程打开的文件
- `-u 用户`：显示指定用户打开的文件
- `-c +D 目录`：递归显示目录下所有打开的文件
- `-t`：只显示 PID
- `-n`：不解析主机名
- `-P`：不解析端口名
- `-s`：直接显示文件大小
- `-w`：禁用警告信息

## 输出字段详解

### 文件描述符（FD）

文件描述符是进程打开文件时获得的整数标识符，每个进程都有自己独立的文件描述符表。不同的后缀表示不同的访问模式和文件状态。`cwd` 表示当前工作目录，`rtd` 表示根目录，`txt` 表示程序代码（文本）文件，`mem` 表示内存映射文件，`DEL` 表示已删除但仍被引用的文件，`err` 表示 FD 信息错误，`jld` 表示 jail 目录，`lnx` 表示库文件，`tr` 表示内核跟踪文件，`v86` 表示 VP/ix 映射文件。

访问模式后缀包括：`r` 表示只读访问，`w` 表示只写访问，`u` 表示读写访问。文件状态后缀包括：`clear` 表示文件描述符被清除，`e` 表示文件正在被删除，`m` 表示文件映射（mmap），`o` 表示文件被覆盖，`p` 表示管道的另一端关闭，`s` 表示锁同步，`x` 表示 Slock 或 Flock 锁。

```bash
# 查看所有打开的文件描述符
lsof

# 查看特定进程的文件描述符
lsof -p 1234

# 查看当前用户的所有打开文件
lsof -u username

# 查看特定类型的文件描述符
lsof -d 0-5

# 查看被删除但仍打开的文件
lsof +L 1

# 查看内存映射文件
lsof -d mem

# 查看当前工作目录
lsof -p $$ | grep cwd

# 查看根目录
lsof -p 1 | grep rtd

# 查看程序代码文件
lsof -p 1234 | grep txt
```

### 文件类型（TYPE）

Linux 系统支持多种文件类型，每种类型都有其特定的用途和行为模式。`DIR` 表示目录，`REG` 表示普通文件，`CHR` 表示字符设备文件，`BLK` 表示块设备文件，`LINK` 表示符号链接，`SOCK` 表示 Unix 域套接字，`IPv4` 表示 IPv4 套接字，`IPv6` 表示 IPv6 套接字，`PIPE` 表示命名管道，`unix` 表示 Unix 域套接字（旧格式）。

```bash
# 查看所有目录
lsof | grep DIR

# 查看所有普通文件
lsof | grep REG

# 查看所有网络套接字
lsof -i

# 查看所有字符设备
lsof | grep CHR

# 查看所有管道
lsof | grep PIPE

# 查看所有符号链接
lsof | grep LINK

# 查看块设备文件
lsof | grep BLK

# 组合查看网络和本地文件
lsof -i | grep -v IPv6
lsof | grep -v DIR
```

## 常用用法

### 查看网络连接

lsof 对网络连接的分析非常有用，可以显示哪些进程正在使用网络端口，以及网络连接的状态。

```bash
# 列出所有网络连接
lsof -i

# 列出所有 TCP 连接
lsof -i TCP

# 列出所有 UDP 连接
lsof -i UDP

# 列出 IPv4 网络连接
lsof -i 4

# 列出 IPv6 网络连接
lsof -i 6

# 列出特定端口的连接
lsof -i :80
lsof -i :22
lsof -i :3306

# 列出特定协议的端口
lsof -i TCP:80

# 列出特定主机上的连接
lsof -i @192.168.1.1

# 列出特定主机和端口
lsof -i @192.168.1.1:22

# 列出监听的端口
lsof -i -sTCP:LISTEN

# 列出已建立的连接
lsof -i -sTCP:ESTABLISHED

# 列出特定用户的所有网络连接
lsof -i -u username

# 列出特定进程的网络连接
lsof -i -p 1234

# 列出端口范围
lsof -i :1-1024

# 列出特定服务的端口
lsof -i :ssh
lsof -i :http
lsof -i :mysql
```

### 查看特定文件

当需要找出哪个进程正在使用某个文件时，lsof 是最佳工具。这在文件无法删除或访问时特别有用。

```bash
# 查看特定文件被哪些进程使用
lsof /path/to/file

# 查看目录被哪些进程使用
lsof /var/log

# 查看被删除但仍被引用的文件
lsof +L 1

# 递归查看目录下所有打开的文件
lsof +D /var/log

# 查找打开特定文件的进程
lsof /etc/passwd

# 查找打开日志文件的进程
lsof /var/log/syslog

# 查找打开配置文件的进程
lsof /etc/nginx/nginx.conf

# 查看被锁定的文件
lsof /var/lock/file

# 查看设备文件
lsof /dev/sda1

# 查看共享库
lsof /lib/libc.so.6

# 查看正在写入的文件
lsof -p 1234 | grep -w w
```

### 查看特定进程

```bash
# 查看特定 PID 打开的所有文件
lsof -p 1234

# 查看进程打开的网络连接
lsof -p 1234 -i

# 查看进程打开的文件描述符
lsof -p 1234 -d 0-100

# 查看当前 shell 打开的文件
lsof -p $$

# 查看父进程和子进程
lsof -p 1234 -a -p 5678

# 查找某个用户的所有进程
lsof -u username

# 排除特定用户
lsof -u ^root

# 查找特定命令打开的文件
lsof -c nginx

# 查找特定命令的所有实例
lsof -c ssh

# 查找多个命令
lsof -c nginx -c mysql

# 查找正则匹配的进程名
lsof -c /^nginx.*/
```

### 组合条件查询

```bash
# AND 条件（使用 -a 选项）
lsof -u username -a -p 1234

# 查看特定用户打开的网络文件
lsof -u www-data -a -i

# 查看特定进程打开的 TCP 连接
lsof -p 1234 -a -i TCP

# 查看特定端口被哪些进程使用
lsof -i :80 -a -p 1234

# 查看特定用户打开的特定文件
lsof -u username -a /var/log/file.log

# OR 条件（不使用 -a）
lsof -u user1 -u user2

# 复杂组合条件
lsof -u username -a -c nginx -a -i TCP

# 查看非 root 用户的所有进程
lsof -u ^root

# 查看除特定进程外的所有
lsof -p ^1

# 查找所有 TCP 连接（LISTEN 状态）
lsof -i TCP -sTCP:LISTEN

# 查找所有 ESTABLISHED 连接
lsof -i TCP -sTCP:ESTABLISHED

# 查找所有 IPv4 连接
lsof -i 4
```

## 实用场景

### 故障排查

```bash
# 找出占用端口的进程
lsof -i :8080

# 查看端口是否被占用
lsof -i :80 | head -5

# 找出打开文件最多的进程
lsof | awk '{print $2}' | sort | uniq -c | sort -rn | head -10

# 找出打开句柄最多的用户
lsof | awk '{print $3}' | sort | uniq -c | sort -rn | head -10

# 检查文件被锁定原因
lsof /var/lock/file

# 查看无法删除文件的原因
lsof /path/to/file

# 查看磁盘空间满但找不到大文件的原因
lsof +L 1 | awk '$5 ~ /REG/ {print $7, $9}'

# 查看哪个进程在使用 swap
lsof -d swap

# 检查内存映射
lsof -d mem | head -20

# 查看内核文件被谁使用
lsof /boot/vmlinuz
```

### 系统监控

```bash
# 监控系统打开文件数
lsof | wc -l

# 实时监控特定进程
watch -n 1 'lsof -p 1234'

# 监控系统网络连接数
lsof -i | wc -l

# 监控 TCP 连接状态分布
lsof -i TCP | awk '{print $10}' | sort | uniq -c | sort -rn

# 查找可疑的网络连接
lsof -i | grep ESTABLISHED | awk '{print $9, $10}'

# 查看用户登录后打开的文件
lsof -u username

# 查看最近打开的文件
lsof | tail -100

# 查看每个用户打开的文件数
lsof | awk '{print $3}' | sort | uniq -c | sort -rn

# 查看每个命令打开的文件数
lsof | awk '{print $1}' | sort | uniq -c | sort -rn

# 查找打开文件数异常的进程
lsof | awk '{print $2}' | sort | uniq -c | awk '$1 > 1000 {print}'
```

### 安全审计

```bash
# 查看所有网络监听端口
lsof -i -sTCP:LISTEN

# 查找 root 用户打开的文件
lsof -u root

# 查找非授权用户访问的文件
lsof | grep -v root

# 查看特定敏感文件的访问
lsof /etc/shadow

# 查找打开敏感文件的进程
lsof /etc/passwd

# 查找网络访问异常
lsof -i | awk '$9 !~ /192\.168\.|10\./ {print}'

# 查找外部连接
lsof -i | grep -v ESTABLISHED | grep LISTEN

# 查找可疑进程
ps aux | grep -v grep | awk '{print $2}' | xargs -I {} lsof -p {} | grep -v REG

# 查看 cron 任务打开的文件
lsof -c crond

# 查看 SSH 会话打开的文件
lsof -c sshd | grep -v txt

# 查找反向 shell 迹象
lsof -i | awk '$9 ~ /[0-9]{1,3}\.[0-9]{1,3}/ {print}'
```

### 性能优化

```bash
# 查找打开文件数最多的进程
lsof | awk '{print $2}' | sort | uniq -c | sort -rn | head

# 查找文件描述符泄露
lsof -p 1234 | wc -l

# 检查文件句柄限制
ulimit -n

# 查找占用大量磁盘 I/O 的进程
lsof | grep txt | awk '{print $7}' | sort | uniq -c | sort -rn | head

# 查找网络连接泄露
lsof -i | awk '$10 ~ /TIME_WAIT|CLOSE_WAIT/ {print}' | wc -l

# 查找打开但未使用的文件
lsof +L 1 | awk '$7 > 1073741824 {print}'

# 查找内存映射文件
lsof -d mem | grep REG | head -20

# 查找网络连接数最多的 IP
lsof -i | awk '{print $9}' | cut -d: -f1 | sort | uniq -c | sort -rn | head

# 查找特定协议的连接数
lsof -i TCP | awk '{print $10}' | sort | uniq -c | sort -rn

# 关闭不需要的网络连接
lsof -i | grep ESTABLISHED | awk '{print $2}' | xargs kill
```

### 开发调试

```bash
# 查看应用程序打开的配置文件
lsof -c myapp | grep conf

# 查看数据库打开的数据文件
lsof -c mysql | grep ibdata

# 查看 Web 服务器打开的日志
lsof -c nginx | grep log

# 查看应用打开的共享库
lsof -c myapp | grep .so

# 查看进程的标准输入输出错误
lsof -p 1234 | grep -E '0u|1u|2u'

# 查看进程创建的临时文件
lsof -p 1234 | grep tmp

# 查看进程打开的套接字
lsof -p 1234 -i

# 跟踪进程文件操作
lsof -p 1234 -r 5

# 查看进程网络连接状态
lsof -p 1234 -i TCP -sTCP:LISTEN

# 查看进程内存映射
lsof -p 1234 -d mem
```

## 高级用法

### 输出格式化

```bash
# 只显示 PID
lsof -t /path/to/file

# 只显示进程名
lsof -c nginx | awk '{print $1}'

# 自定义输出列
lsof -p 1234 -F c p f n

# CSV 格式输出
lsof -c nginx | awk '{print $1","$2","$3}'

# JSON 格式输出（需要 jq）
lsof -i -p 1234 | awk '{print "{\"cmd\":\""$1"\",\"pid\":\""$2"\"}"}'

# 只显示特定列
lsof -p 1234 | awk '{print $1, $2, $3, $9}'

# 简洁输出
lsof | head -50

# 详细输出
lsof -l

# 数字输出（不解析名称）
lsof -n

# 端口号而非服务名
lsof -P

# 带时间戳输出
lsof -T [t]

# 组合格式化
lsof -p 1234 -F cfdT
```

### 脚本应用

```bash
#!/bin/bash
# 查找占用特定端口的进程
get_pid_by_port() {
    lsof -i :$1 | grep LISTEN | awk '{print $2}'
}

# 查找打开特定文件的进程
get_pids_by_file() {
    lsof $1 | awk 'NR>1 {print $2}'
}

# 强制终止占用文件的进程
kill_by_file() {
    pids=$(get_pids_by_file $1)
    for pid in $pids; do
        echo "Killing PID: $pid"
        kill -9 $pid
    done
}

# 列出所有网络连接
list_network_connections() {
    echo "Proto Recv-Q Send-Q Local Address Foreign Address State PID/Program"
    lsof -i | awk '{print $8, $9, $10, $11, $12, $13}'
}

# 查找可疑连接
find_suspicious_connections() {
    lsof -i | grep -v ESTABLISHED | grep LISTEN | awk '{print $9}' | cut -d: -f2 | sort -u
}

# 统计每个用户的打开文件数
count_files_by_user() {
    lsof | awk '{print $3}' | sort | uniq -c | sort -rn
}

# 查找打开最多文件的进程
find_top_file_users() {
    lsof | awk '{print $2}' | sort | uniq -c | sort -rn | head -20
}

# 清理僵尸进程
clean_zombie() {
    ps aux | awk '$8 == "Z" {print $2}' | xargs kill -9 2>/dev/null
}

# 监控特定进程
monitor_process() {
    pid=$1
    while true; do
        lsof -p $pid | wc -l
        sleep 5
    done
}
```

### 与其他工具结合

```bash
# lsof 与 grep 结合
lsof | grep ERROR

# lsof 与 awk 结合统计
lsof | awk '{print $1}' | sort | uniq -c | sort -rn

# lsof 与 xargs 结合
lsof -i :80 -t | xargs -I {} lsof -p {}

# lsof 与 ps 结合
lsof -i | awk '{print $2}' | xargs ps -p

# lsof 与 netstat 比较
lsof -i -sTCP:LISTEN | netstat -tlnp | grep LISTEN

# lsof 与 ss 比较
lsof -i | ss -tnp | grep LISTEN

# lsof 与 fuser 比较
lsof /path/to/file
fuser /path/to/file

# lsof 与 strace 结合
strace -p $(lsof -t /path/to/file | head -1)

# lsof 与 ltrace 结合
ltrace -p $(lsof -t /path/to/file | head -1)

# 实时监控网络连接
watch -n 1 'lsof -i -sTCP:LISTEN'

# 监控文件变化
while true; do lsof /path/to/file; sleep 1; done
```

## 常见问题解决

### 文件无法删除

```bash
# 找出占用文件的进程
lsof /path/to/file

# 找出删除但仍被引用的文件
lsof +L 1

# 强制终止进程
kill -9 $(lsof -t /path/to/file)

# 如果是挂载点
lsof +D /mount/point

# 检查 NFS 文件锁
lsof -N

# 处理僵尸进程
ps aux | grep defunct
lsof | grep defunct

# 处理交换空间
lsof -d swap

# 检查 /proc/PID/fd
ls -l /proc/1234/fd

# 处理只读文件系统
lsof | grep RO
```

### 端口被占用

```bash
# 查看端口占用情况
lsof -i :8080

# 查看所有监听端口
lsof -i -sTCP:LISTEN

# 查找端口对应的进程
lsof -i :80 | grep LISTEN

# 终止占用端口的进程
kill -9 $(lsof -t -i :80)

# 查看端口范围
lsof -i :1-65535

# 查看特定 IP 的绑定
lsof -i @192.168.10

# 查看.1:808 UDP 端口
lsof -i UDP:53

# 查看所有 IPv6 监听
lsof -i 6 -sTCP:LISTEN

# 查看协议统计
lsof -i | awk '{print $8}' | sort | uniq -c

# 查看本地绑定
lsof -i | grep -v ESTABLISHED
```

### 磁盘空间异常

```bash
# 查找大文件被打开
lsof +L 1 | awk '$7 > 1000000000 {print}'

# 查找打开的日志文件
lsof | grep .log

# 查找临时文件
lsof +D /tmp

# 查找核心转储文件
lsof | grep core

# 查找被删除的大文件
lsof +L 1 | awk '$5 ~ /REG/ {print $7, $9}'

# 查看每个文件的大小
lsof -s | awk '$5 ~ /REG/ {sum[$6]+=$7} END{for(f in sum) if (sum[f]>1024*1024*1024) print f, sum[f]/1024/1024/1024 "GB"}'

# 查找隐藏的大文件
lsof | awk '$7 > 5000000000 {print}'

# 检查文件系统
lsof +D / | awk '$5 ~ /REG/ {print $9}' | xargs du -sh 2>/dev/null

# 查看挂载点使用
lsof +D /mount/point | grep REG
```

### 网络连接问题

```bash
# 查找所有连接
lsof -i

# 查找 ESTABLISHED 连接
lsof -i -sTCP:ESTABLISHED

# 查找 TIME_WAIT 连接
lsof -i | awk '$10 ~ /TIME_WAIT/'

# 查找 CLOSE_WAIT 连接
lsof -i | awk '$10 ~ /CLOSE_WAIT/'

# 查找 SYN_SENT 连接
lsof -i | awk '$10 ~ /SYN_SENT/'

# 查找特定 IP 的连接
lsof -i @192.168.1.1

# 查找外部 IP 连接
lsof -i | awk '$9 !~ /(^127\.|^::1|:127\.|^192\.168\.|^10\.|^172\.(1[6-9]|2[0-9]|3[01])\.)'

# 统计连接数
lsof -i | wc -l

# 查找端口转发
lsof -i | grep ESTABLISHED | awk '{print $10}' | cut -d: -f2 | sort | uniq -c

# 查找重复连接
lsof -i | awk '{print $9}' | cut -d: -f1 | sort | uniq -d
```

## 性能注意事项

lsof 在处理大量打开文件时可能会消耗较多的系统资源。`-c` 选项配合正则表达式可能比较耗时，`+D` 选项会递归遍历目录可能很慢，`-i` 选项会进行网络地址反向解析影响性能。优化建议包括：使用 `-n` 禁用 DNS 解析，使用 `-P` 禁用端口名解析，使用 `-t` 只输出 PID，使用 `-F` 格式化输出减少解析开销，定期轮询而非持续监控，避免在生产环境使用 `+D` 选项。

```bash
# 快速模式
lsof -n -P

# 只显示 PID
lsof -t -i :80

# 格式化输出
lsof -F c p f n

# 限制输出行数
lsof | head -100

# 使用批量查询
lsof -i :1-1024

# 避免递归
lsof /path/to/dir

# 使用 grep 过滤而非 lsof 过滤
lsof | grep pattern
```

lsof 是 Linux 系统中功能最强大的文件和网络连接查看工具之一。通过掌握 lsof 的各种用法，系统管理员可以有效地进行故障排查、性能监控和安全审计。熟练使用 lsof 是每个 Linux 用户必备的技能。