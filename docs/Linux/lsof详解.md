# Linux lsof 命令详解

`lsof` (List Open Files) 是 Linux 系统中一个非常强大的系统管理工具，用于列出当前系统打开的文件。在 Linux 环境中，一切皆文件，数据文件、二进制文件、网络套接字、管道等都被视为文件。因此，`lsof` 不仅能查看文件被哪些进程占用，还能查看网络连接、设备状态等。

## 1. 安装 lsof

大多数 Linux 发行版默认可能未安装 `lsof`。

```bash
# CentOS / RHEL
yum install lsof

# Ubuntu / Debian
apt-get install lsof
```

## 2. 核心输出解析

直接输入 `lsof` 会列出所有打开的文件：

```bash
lsof | head -n 5
COMMAND     PID   USER   FD      TYPE             DEVICE  SIZE/OFF       NODE NAME
systemd       1   root  cwd       DIR              253,0       224         64 /
systemd       1   root  rtd       DIR              253,0       224         64 /
systemd       1   root  txt       REG              253,0   1624520   78672658 /usr/lib/systemd/systemd
systemd       1   root  mem       REG              253,0     20064   50334862 /usr/lib64/libuuid.so.1.3.0
```

**关键列说明：**

*   **COMMAND**: 进程名称
*   **PID**: 进程标识符
*   **USER**: 进程所有者
*   **FD**: 文件描述符 (File Descriptor)
    *   `cwd`: 当前工作目录
    *   `txt`: 程序代码
    *   `mem`: 内存映射文件
    *   `0u`, `1u`, `2u`: 标准输入/输出/错误 (u=读写, r=只读, w=只写)
*   **TYPE**: 文件类型
    *   `DIR`: 目录
    *   `REG`: 普通文件
    *   `CHR`: 字符设备
    *   `IPv4` / `IPv6`: 网络套接字

## 3. 常用场景实战

### 3.1 网络排查神技

查看**端口占用**情况（替代 netstat/ss 的好帮手）：

```bash
# 查看所有网络连接
lsof -i

# 查看 80 端口占用
lsof -i :80

# 查看 TCP 连接
lsof -i tcp

# 查看来自特定 IP 的连接
lsof -i @192.168.1.5
```

### 3.2 文件与目录查找

查看**谁在使用某个文件**：

```bash
lsof /var/log/nginx/access.log
```

查看**某个目录下被打开的文件**：

```bash
# +d 不递归，+D 递归
lsof +D /var/log/
```

### 3.3 进程相关

查看**指定进程打开的文件**：

```bash
# 根据 PID
lsof -p 1234

# 根据进程名称 (支持正则)
lsof -c nginx
lsof -c ssh
```

查看**指定用户打开的文件**：

```bash
lsof -u root

# 排除某个用户 (^ 表示排除)
lsof -u ^root
```

### 3.4 组合查询

`lsof` 默认是 OR 逻辑，使用 `-a` 参数可以开启 AND 逻辑。

```bash
# 查看 root 用户 且 使用 bash 进程 打开的文件
lsof -a -u root -c bash
```

## 4. 高级技巧：恢复已删除文件

如果一个文件被意外 `rm` 删除，但还有一个进程仍然打开着它（FD 未释放），你可以通过 `lsof` 找回它。

1.  找到占用文件的进程信息：
    ```bash
    lsof | grep deleted
    # 输出: nginx  1234  root  13w  REG  8,1  1024  456 /var/log/access.log (deleted)
    ```
2.  进入 `/proc` 目录恢复：
    ```bash
    # 1234 是 PID，13 是 FD
    cp /proc/1234/fd/13 /var/log/access.log.bak
    ```
