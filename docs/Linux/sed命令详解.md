# sed 命令详解

sed（Stream Editor）是 Linux 系统中一个非常强大的文本处理工具，它可以在不打开文件的情况下对文件进行编辑。sed 是一种非交互式的编辑器，它通过读取输入流或文件来执行文本转换操作。

## 基本语法

```bash
sed [选项] '命令' 文件名
```

### 常用选项

- `-n`：安静模式，只打印经过 sed 处理的行
- `-i`：直接修改原文件（注意：此选项会覆盖原文件）
- `-e`：允许多个编辑命令
- `-f`：从脚本文件中读取编辑命令
- `-r` 或 `-E`：使用扩展正则表达式

## 基本操作

### 1. 打印操作（p）

打印指定行：

```bash
# 打印第 3 行
sed -n '3p' filename.txt

# 打印第 1 到第 5 行
sed -n '1,5p' filename.txt

# 打印最后一行
sed -n '$p' filename.txt

# 打印包含特定字符串的行
sed -n '/pattern/p' filename.txt
```

### 2. 删除操作（d）

删除指定行：

```bash
# 删除第 3 行
sed '3d' filename.txt

# 删除第 1 到第 5 行
sed '1,5d' filename.txt

# 删除最后一行
sed '$d' filename.txt

# 删除包含特定字符串的行
sed '/pattern/d' filename.txt

# 删除空行
sed '/^$/d' filename.txt
```

### 3. 替换操作（s）

这是 sed 最常用的命令之一：

```bash
# 将每行第一个 "old" 替换为 "new"
sed 's/old/new/' filename.txt

# 将每行所有 "old" 替换为 "new"
sed 's/old/new/g' filename.txt

# 将第 3 行的第一个 "old" 替换为 "new"
sed '3s/old/new/' filename.txt

# 将第 1 到第 5 行的所有 "old" 替换为 "new"
sed '1,5s/old/new/g' filename.txt

# 只替换包含特定模式的行
sed '/pattern/s/old/new/g' filename.txt
```

替换标志说明：
- `g`：全局替换（一行中的所有匹配项）
- `数字`：替换第几个匹配项（如 `2` 表示替换第二个匹配项）
- `p`：打印被修改的行
- `i`：忽略大小写（GNU sed）
- `w`：将结果写入文件

### 4. 插入操作（i）、附加操作（a）、更改操作（c）

```bash
# 在第 3 行前插入文本
sed '3i\新插入的文本' filename.txt

# 在第 3 行后附加文本
sed '3a\附加的文本' filename.txt

# 更改第 3 行的内容
sed '3c\新的第3行内容' filename.txt

# 在匹配模式的行前插入文本
sed '/pattern/i\插入的文本' filename.txt
```

## 高级用法

### 1. 地址范围

sed 支持多种地址范围的表示方法：

```bash
# 单行地址
sed '5p' filename.txt          # 第 5 行

# 行号范围
sed '2,8p' filename.txt        # 第 2 到第 8 行

# 步进选择
sed '1~2p' filename.txt        # 从第 1 行开始，每隔 2 行打印一次

# 模式匹配范围
sed '/start/,/end/p' filename.txt  # 从匹配 "start" 的行到匹配 "end" 的行

# 行号到文件末尾
sed '5,$p' filename.txt        # 第 5 行到文件末尾
```

### 2. 多命令执行

```bash
# 使用 -e 选项
sed -e '1d' -e 's/old/new/g' filename.txt

# 使用分号分隔命令
sed '1d;s/old/new/g' filename.txt

# 从脚本文件执行
sed -f script.sed filename.txt
```

### 3. 模式空间和保持空间

sed 有两个缓冲区：模式空间（pattern space）和保持空间（hold space）。

```bash
# h：将模式空间复制到保持空间
# H：将模式空间追加到保持空间
# g：将保持空间复制到模式空间
# G：将保持空间追加到模式空间
# x：交换模式空间和保持空间

# 示例：反转行顺序
sed -n '1!G;h;$p' filename.txt
```

## 实用示例

### 1. 文本清理

```bash
# 删除行首的空白字符
sed 's/^[[:space:]]*//' filename.txt

# 删除行尾的空白字符
sed 's/[[:space:]]*$//' filename.txt

# 删除行首和行尾的空白字符
sed 's/^[[:space:]]*//;s/[[:space:]]*$//' filename.txt

# 删除所有空白字符
sed 's/[[:space:]]//g' filename.txt
```

### 2. 数字处理

```bash
# 给每一行添加行号
sed '=' filename.txt | sed 'N;s/\n/ /'

# 或者使用更简单的方式
nl filename.txt

# 提取数字（保留数字部分）
sed 's/[^0-9]*//g' filename.txt
```

### 3. 条件处理

```bash
# 如果某行包含特定模式，则执行操作
sed '/pattern/{s/old/new/g;p;}' filename.txt

# 否则执行其他操作
sed '/pattern/!{s/old/new/g;}' filename.txt
```

### 4. 特殊字符处理

```bash
# 处理包含特殊字符的字符串
sed 's/\$/\\$/g' filename.txt     # 转义 $ 符号
sed 's/\&/\\&/g' filename.txt     # 转义 & 符号

# 使用不同的分隔符避免转义
sed 's|/path/to/old|/path/to/new|g' filename.txt
sed 's#http://old.com#http://new.com#g' filename.txt
```

## 实际应用场景

### 1. 批量重命名文件中的路径

```bash
# 将配置文件中的旧路径替换为新路径
sed -i 's|/old/path|/new/path|g' config.xml

# 忽略大小写的替换
sed -i 's/ERROR/DEBUG/gi' log.properties
```

### 2. 数据提取

```bash
# 提取 IP 地址
grep -o '[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' access.log | sed 's/^.*://' | sort | uniq -c

# 提取邮箱地址
sed -n 's/.*\([a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]*\.[a-zA-Z]\{2,\}\).*/\1/p' contacts.txt
```

### 3. 配置文件修改

```bash
# 修改配置文件中的参数
sed -i '/^max_connections/s/[0-9]*/200/' mysql.conf

# 注释掉包含特定字符串的行
sed -i '/debug/s/^/#/' app.conf

# 取消注释
sed -i '/^#.*password/s/^#//' secure.conf
```

## 性能优化建议

1. **使用适当的地址范围**：如果只需要处理文件的一部分，明确指定行范围可以提高效率。
2. **避免不必要的正则表达式**：简单的字符串替换比正则表达式更快。
3. **批量处理**：当需要执行多个操作时，尽量合并到一个 sed 命令中。
4. **谨慎使用 -i 选项**：在生产环境中使用前先备份原文件。

## 常见错误和解决方案

1. **转义问题**：在处理包含特殊字符的字符串时要特别小心转义。
2. **行结束符**：Windows 和 Unix 系统的行结束符不同，可能导致跨平台问题。
3. **性能问题**：对于大文件，考虑使用其他工具如 awk 或专门的文本处理程序。
4. **安全问题**：使用 -i 选项时要小心，因为它会直接修改原文件。

## sed 与其他工具的配合使用

```bash
# 与 grep 配合
grep 'pattern' file.txt | sed 's/old/new/g'

# 与 find 配合
find . -name "*.txt" -exec sed -i 's/old/new/g' {} \;

# 与管道配合
echo "hello world" | sed 's/hello/hi/g'
```

## 学习资源

1. `man sed`：查看完整的 sed 手册页
2. GNU sed 手册：在线文档提供详细的语法和示例
3. 实践练习：创建测试文件并尝试各种 sed 命令

sed 是一个功能强大的文本处理工具，掌握它的基本用法和高级技巧可以帮助你高效地处理文本数据。建议通过实际练习来加深理解，从简单的替换命令开始，逐步掌握更复杂的用法。