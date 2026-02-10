# sed 命令详解

sed（Stream Editor）是 Linux/Unix 系统中功能强大的行流编辑器，它以行为单位对输入流进行编辑处理。sed 可以在不打开文件的情况下对文件内容进行查找、替换、删除、插入等操作，是文本处理和系统管理中不可或缺的工具。与交互式编辑器不同，sed 是一种非破坏性的编辑器，默认情况下不会修改原文件（除非使用 `-i` 选项）。

## 基本语法

```bash
sed [选项] '命令' 文件名
sed [选项] -f 脚本文件 文件名
sed [选项] '地址命令; 地址命令' 文件名
```

sed 的基本工作原理是：读取输入行到模式空间（pattern space），对模式空间执行指定的 sed 命令，然后输出模式空间（除非使用 `-n` 选项抑制默认输出），最后清空模式空间并处理下一行。这种流水线式的工作方式使得 sed 可以高效处理大文件。sed 命令由地址（指定要处理的行）和编辑命令（指定要执行的操作）组成。

## 常用选项

- `-n`：安静模式，只打印经过 sed 处理的行（不自动打印所有行）
- `-i`：直接修改原文件（注意：此选项会覆盖原文件）
- `-i.bak`：修改原文件并备份原文件为 .bak 后缀
- `-e`：允许多个编辑命令
- `-f`：从脚本文件读取编辑命令
- `-r` 或 `-E`：使用扩展正则表达式（ERE）
- `-s`：将多个文件视为独立文件而非连续流
- `-z`：使用 null 字符分隔行（处理特殊文件名）
- `--posix`：POSIX 兼容模式
- `--follow-symlinks`：跟随符号链接
- `--quiet` 或 `--silent`：等同于 `-n`
- `--expression`：等同于 `-e`

## 基本命令

### 打印命令（p）

打印命令用于输出特定行。默认情况下，sed 会打印所有输入行，使用 `-n` 选项可以抑制默认打印，只输出显式指定的行。

```bash
# 打印第 5 行
sed -n '5p' file.txt

# 打印第 1 到第 10 行
sed -n '1,10p' file.txt

# 打印第 3 行和第 5 行
sed -n '3p;5p' file.txt

# 打印最后一行
sed -n '$p' file.txt

# 打印包含特定字符串的行
sed -n '/pattern/p' file.txt

# 打印从第 5 行到匹配 pattern 的行
sed -n '5,/pattern/p' file.txt

# 打印匹配 pattern1 到 pattern2 的行
sed -n '/pattern1/,/pattern2/p' file.txt

# 打印所有行（取消 -n 的效果）
sed -n 'p' file.txt

# 打印偶数行
sed -n '2~2p' file.txt

# 打印奇数行
sed -n '1~2p' file.txt

# 打印每 3 行的第 1 行
sed -n '1~3p' file.txt

# 打印行号和内容
sed -n '=' file.txt | paste -d' ' - - | sed 's/^/Line /'

# 打印特定范围的上下文
sed -n '5,10p' file.txt
```

### 删除命令（d）

删除命令用于删除指定的行。需要注意的是，删除操作是在模式空间中进行的，不会影响原文件（除非使用 `-i` 选项）。

```bash
# 删除第 5 行
sed '5d' file.txt

# 删除第 1 到第 10 行
sed '1,10d' file.txt

# 删除最后一行
sed '$d' file.txt

# 删除空行
sed '/^$/d' file.txt

# 删除包含特定字符串的行
sed '/pattern/d' file.txt

# 删除以 # 开头的行（注释行）
sed '/^#/d' file.txt

# 删除以 ; 开头的行
sed '/^;/d' file.txt

# 删除空白字符开头的行
sed '/^[[:space:]]*$/d' file.txt

# 删除所有行
sed 'd' file.txt

# 删除从第 5 行到匹配 pattern 的行
sed '5,/pattern/d' file.txt

# 删除匹配 pattern1 到 pattern2 的行
sed '/pattern1/,/pattern2/d' file.txt

# 删除第 1 行和最后一行
sed '1d;$d' file.txt

# 删除偶数行
sed '2~2d' file.txt

# 删除所有空行和只包含空白字符的行
sed '/^[[:space:]]*$/d' file.txt

# 删除每 3 行中的第 1 行
sed '1~3d' file.txt
```

### 替换命令（s）

替换命令是 sed 最强大和最常用的命令，用于查找并替换文本。替换命令的语法是 `s/模式/替换/标志`，其中模式可以是正则表达式，替换字符串可以包含特殊序列。

```bash
# 将每行第一个 "old" 替换为 "new"
sed 's/old/new/' file.txt

# 将每行所有 "old" 替换为 "new"
sed 's/old/new/g' file.txt

# 将第 3 行的第一个 "old" 替换为 "new"
sed '3s/old/new/' file.txt

# 将第 1 到第 5 行的所有 "old" 替换为 "new"
sed '1,5s/old/new/g' file.txt

# 只替换包含特定模式的行
sed '/pattern/s/old/new/g' file.txt

# 使用 & 代表匹配的内容
sed 's/[0-9]/(&)/' file.txt

# 使用 \1, \2 等引用捕获组
sed 's/\(.*\)/[\1]/' file.txt
sed 's/\([a-z]*\) \([a-z]*\)/\2 \1/' file.txt

# 替换标志说明
# g：全局替换
# 数字：替换第几个匹配
# p：打印被修改的行
# i：忽略大小写
# w：将结果写入文件

# 替换后打印（仅打印改变的行）
sed -n 's/old/new/p' file.txt

# 忽略大小写的替换
sed 's/old/new/gi' file.txt

# 只替换第 2 次出现
sed 's/old/new/2' file.txt

# 将匹配写入文件
sed 's/pattern/&/w match.txt' file.txt

# 使用不同的分隔符避免转义
sed 's|/path/to/old|/path/to/new|g' file.txt
sed 's#http://old.com#http://new.com#g' file.txt
```

### 替换的高级用法

```bash
# 替换的同时添加内容
sed 's/pattern/INSERTED &/' file.txt
sed 's/pattern/& APPENDED/' file.txt

# 使用换行符
sed 's/pattern/&\n/' file.txt
sed ':a;N;$!ba;s/pattern/&\n/g' file.txt

# 多行替换
sed '0,/pattern/s//NEW_PATTERN/' file.txt

# 条件替换
sed '/^#/!s/old/new/' file.txt

# 复杂捕获组
sed 's/\([A-Z]\{3\}\)\([0-9]\{4\}\)/\1-\2/' file.txt

# 移除 HTML 标签
sed 's/<[^>]*>//g' file.html

# 移除 URL 参数
sed 's/?.*//' url.txt

# 提取 URL
sed 's/.*\(http[^ ]*\).*/\1/' file.txt

# 格式化电话号码
sed 's/\([0-9]\{3\}\)\([0-9]\{4\}\)/\1-\2/' file.txt
sed 's/\([0-9]\{3\}\)\([0-9]\{3\}\)\([0-9]\{4\}\)/(\1) \2-\3/' file.txt

# 格式化日期
sed 's/\([0-9]\{4\}\)\([0-9]\{2\}\)\([0-9]\{2\}\)/\1-\2-\3/' dates.txt

# 金额格式化
sed 's/\([0-9]\)\([0-9]\{3\}\)/\1,\2/g' numbers.txt
```

### 读写命令（r 和 w）

读写命令用于从文件中读取内容或写入内容到文件。

```bash
# 读取文件内容插入到第 5 行后
sed '5r file.txt' original.txt

# 读取文件内容插入到匹配行后
sed '/pattern/r file.txt' original.txt

# 读取文件内容插入到文件末尾
sed '$r file.txt' original.txt

# 将匹配行写入文件
sed '/pattern/w output.txt' input.txt

# 将特定行写入文件
sed '1,10w output.txt' input.txt

# 将所有内容写入文件
sed 'w output.txt' input.txt

# 将匹配行追加到文件
sed '/pattern/a APPENDED_TEXT' file.txt

# 将匹配行前插入文本
sed '/pattern/i INSERTED_TEXT' file.txt

# 将匹配行替换为文件内容
sed '/pattern/c FILE_CONTENT' file.txt

# 多行读取
sed '5r file1.txt' original.txt
sed '5r file1.txt; 10r file2.txt' original.txt

# 读取多个文件内容
sed '$r /path/to/file.txt' original.txt
```

### 转换命令（y）

转换命令用于字符级别的转换，类似于 tr 命令。

```bash
# 将小写字母转换为大写
sed 'y/abcdefghijklmnopqrstuvwxyz/ABCDEFGHIJKLMNOPQRSTUVWXYZ/' file.txt

# 将大写字母转换为小写
sed 'y/ABCDEFGHIJKLMNOPQRSTUVWXYZ/abcdefghijklmnopqrstuvwxyz/' file.txt

# 转换特定字符
sed 'y/abc/123/' file.txt

# 转换数字
sed 'y/0123456789/##########/' file.txt

# 字符一一对应转换
sed 'y/aeiou/AEIOU/' file.txt

# 转换制表符为空格
sed 'y/\t/ /' file.txt

# 移除特定字符
sed 'y/abc//' file.txt
```

## 高级用法

### 保持空间

sed 除了模式空间外，还有一个保持空间（hold space），可以在多行操作中保存数据。

```bash
# h：将模式空间复制到保持空间
# H：将模式空间追加到保持空间
# g：将保持空间复制到模式空间
# G：将保持空间追加到模式空间
# x：交换模式空间和保持空间

# 反转行顺序
sed -n '1!G;h;$p' file.txt

# 追加到文件末尾
sed 'H;$!d;g' file.txt

# 合并所有行为一行
sed ':a;$!N;$!ba;s/\n/ /g' file.txt

# 显示行号并追加到行尾
sed '=' file.txt | sed 'N;s/\n/\t/'

# 将每两行合并
sed 'N;s/\n/ /' file.txt

# 倒序读取行
sed '1!G;h;$!d' file.txt

# 保留每 5 行合并一次
sed ':a;N;6!ba;s/\n/ /g' file.txt

# 奇偶行合并
sed 'N;s/\n/ /' file.txt

# 将文件转换为块格式
sed 'G' file.txt

# 保持空间操作
sed -n '1h;1!H;$!d;x;p' file.txt
```

### 分支和循环

```bash
# 分支（类似 if-else）
sed ':a; /pattern/b; s/old/new/; ba' file.txt

# 循环（替换所有出现）
sed ':a; s/pattern/new/g; ta' file.txt

# 条件分支
sed '/start/,/end/{/pattern/b; s/old/new/g}' file.txt

# 多行循环
sed ':a; $!N; $!ba; s/\n/ /g' file.txt

# 标签和跳转
sed ':loop; /pattern/s/old/new/; t loop' file.txt

# 删除匹配之间的内容
sed '/start/,/end/d' file.txt

# 只保留匹配之间的内容
sed '/start/,/end/!d' file.txt

# 在匹配之间插入文本
sed '/start/,/end/{/start/a\INSERTED' -e '/end/i\INSERTED}' file.txt

# 复杂的标签使用
sed ':a; /pattern/{s/.*//; ba}' file.txt

# 多次替换
sed 's/a/A/; s/b/B/; s/c/C/' file.txt

# 条件删除
sed '/error/{/critical/d}' file.txt
```

### 多行处理

```bash
# 匹配多行
sed '/start/,/end/!d' file.txt

# 跨行替换
sed ':a; /start/{N;s/\n/ /; ta}' file.txt

# 多行删除
sed '/start/,/end/d' file.txt

# 多行插入
sed '/start/a\NEW LINE 1\nNEW LINE 2' file.txt

# 将空行替换为单空行
sed '/^$/,/^$/d' file.txt

# 合并空白行
sed '/^$/,/^$/d' file.txt
sed '/^$/N;/^$/d' file.txt

# 处理段落
sed '/^$/,/./!d' file.txt

# 转换 DOS 换行符
sed 's/\r$//' dos.txt

# 转换 Unix 换行符
sed 's/\r$//' mac.txt

# 处理多行模式
sed '1,/^$/d' file.txt
```

### 正则表达式

sed 使用基本正则表达式（BRE），使用 `-r` 或 `-E` 选项可以使用扩展正则表达式（ERE）。

```bash
# 使用基本正则表达式
sed '/[0-9]\{3\}/p' file.txt

# 使用扩展正则表达式
sed -E '/[0-9]{3}/p' file.txt

# 量词
sed -E 's/a+/REPLACED/' file.txt
sed -E 's/a*/REPLACED/' file.txt
sed -E 's/a{2,4}/REPLACED/' file.txt

# 括号和引用
sed -E 's/(test)/\1 \1/' file.txt
sed -E 's/(test)(ing)/\2 \1/' file.txt

# 或运算
sed -E 's/(error|warning|fatal)/[ALERT]/g' file.txt

# 字符类
sed -E 's/[[:digit:]]/X/g' file.txt
sed -E 's/[[:alpha:]]/X/g' file.txt
sed -E 's/[[:alnum:]]/X/g' file.txt
sed -E 's/[[:space:]]/ /g' file.txt
sed -E 's/[[:upper:]]/x/g' file.txt
sed -E 's/[[:lower:]]/X/g' file.txt

# 锚点
sed -E '/^error/p' file.txt
sed -E '/error$/p' file.txt

# 非贪婪匹配（GNU sed）
sed -E 's/.*?//' file.txt

# 零宽断言
sed -E 's/(?<=\d)(?=\d)/,/g' file.txt
```

## 实用示例

### 文本清理

```bash
# 删除行首空白字符
sed 's/^[[:space:]]*//' file.txt

# 删除行尾空白字符
sed 's/[[:space:]]*$//' file.txt

# 删除行首和行尾空白字符
sed 's/^[[:space:]]*//;s/[[:space:]]*$//' file.txt

# 删除所有空白字符
sed 's/[[:space:]]//g' file.txt

# 删除注释行
sed '/^#/d' config.txt

# 删除空行
sed '/^$/d' file.txt

# 删除仅包含空白字符的行
sed '/^[[:space:]]*$/d' file.txt

# 删除 Windows 换行符
sed 's/\r$//' dos.txt

# 移除所有标点符号
sed 's/[[:punct:]]//g' file.txt

# 移除所有数字
sed 's/[0-9]//g' file.txt

# 转换连续空格为单个空格
sed 's/  */ /g' file.txt

# 删除每行前 5 个字符
sed 's/^.\{5\}//' file.txt

# 删除每行后 5 个字符
sed 's/.\{5\}$//' file.txt
```

### 日志处理

```bash
# 提取错误日志
sed -n '/[Ee]rror/p' log.txt

# 提取特定时间范围的日志
sed -n '/2024-01-01/,/2024-01-02/p' access.log

# 移除 ANSI 颜色码
sed 's/\x1b\[[0-9;]*m//g' colored.log

# 提取 IP 地址
sed -n 's/.*\(\([0-9]\{1,3\}\.\)\{3\}[0-9]\{1,3\}\).*/\1/p' access.log

# 统计错误数量
sed -n '/[Ee]rror/p' log.txt | wc -l

# 提取 JSON 格式日志
sed -n '/{/,/}/p' mixed.log

# 移除时间戳
sed 's/^\[[0-9-]* [0-9:]*\] //' log.txt

# 格式化日志
sed 's/^\([0-9-]*\) \(.*\)/\2 [\1]/' log.txt

# 提取 HTTP 状态码
sed -n 's/.*"\(...[0-9]\)".*/\1/p' access.log

# 过滤特定用户代理
sed -n '/Mozilla/p' access.log
```

### 配置文件处理

```bash
# 注释行
sed 's/^/#/' config.txt

# 取消注释行
sed 's/^#//' config.txt

# 在特定行后添加配置
sed '5a\NEW_CONFIG=value' config.txt

# 修改特定配置项
sed 's/PORT=.*/PORT=8080/' config.txt

# 删除注释行
sed '/^#/d' config.txt

# 只保留未注释行
sed '/^#/d' config.txt

# 启用或禁用配置
sed 's/#\(ENABLE=.*\)/\1/' config.txt
sed 's/\(DISABLE=.*\)/#\1/' config.txt

# 环境变量替换
sed 's/$VAR/value/g' config.txt

# 批量修改路径
sed 's|/old/path|/new/path|g' config.txt

# 添加行号
sed = config.txt | sed 'N;s/\n/\t/'
```

### 代码格式化

```bash
# 添加分号
sed 's/$;/;/' script.js

# 缩进调整（2 空格转 4 空格）
sed 's/^  /    /' file.txt

# 添加花括号
sed 's/^if (/if (/' file.txt
sed 's/)$/)/' file.txt

# 注释函数
sed 's/^def /# def /' script.py

# 移除多余空行
sed '/^$/,/^$/d' file.txt

# 替换制表符为空格
sed 's/\t/    /g' file.txt

# 行尾移除空格
sed 's/[[:space:]]*$//' file.txt

# 字符串替换
sed "s/'old'/'new'/g" file.txt

# 多语言字符串处理
sed 's/"[^"]*"/REPLACED/g' file.txt

# 移除 console.log
sed '/console\.log/d' file.js
```

### 数据转换

```bash
# CSV 处理
sed 's/,/\t/g' data.csv

# TSV 处理
sed 's/\t/,/g' data.tsv

# 添加引号
sed 's/.*/"&"/' file.txt

# 移除引号
sed 's/^"//;s/"$//' file.txt

# 字段提取
sed 's/\([^,]*\),.*/\1/' data.csv

# 字段移除
sed 's/,[^,]*$//' data.csv

# 换行处理
sed 's/;/;\n/g' data.txt

# 日期格式转换
sed 's/\([0-9]\{2\}\)\/\([0-9]\{2\}\)\/\([0-9]\{4\}\)/\3-\1-\2/' dates.txt

# 数值格式化
sed 's/\([0-9]\)\([0-9]\{3\}\)/\1,\2/g' numbers.txt

# XML/HTML 转义
sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g' file.txt
```

### 批量文件处理

```bash
# 递归处理（需要 find）
find . -name "*.txt" -exec sed -i 's/old/new/g' {} \;

# 保留备份的修改
sed -i.bak 's/old/new/g' file.txt

# 模拟运行（不修改文件）
sed 's/old/new/g' file.txt

# 只修改匹配特定模式的行
sed -i '/pattern/s/old/new/g' file.txt

# 排除特定行
sed -i '/^#/!s/old/new/g' file.txt

# 批量重命名
for f in *.txt; do
  sed 's/old/new/g' "$f" > "${f%.txt}_new.txt"
done

# 处理特殊文件名
find . -name "*-*" -exec sed -i '' {} +

# 并行处理（GNU parallel）
find . -name "*.txt" | parallel sed -i 's/old/new/g'

# 增量备份
sed -i.bak_$(date +%Y%m%d) 's/old/new/g' file.txt

# 多文件合并后处理
sed '1h;1!H;$!d;g' file1.txt file2.txt > combined.txt
```

## 脚本编写

### 基本脚本结构

```bash
#!/bin/sed -f

# 注释
# 处理文件

# 1. 删除注释
/^#/d

# 2. 删除空行
/^$/d

# 3. 替换
s/old/new/g

# 4. 格式化
s/^[[:space:]]*//
s/[[:space:]]*$//
```

### 复杂脚本示例

```bash
#!/bin/sed -f

# 脚本：文本清理器
# 1. 删除 DOS 换行符
s/\r$//

# 2. 删除行首空白
s/^[[:space:]]*//

# 3. 删除行尾空白
s/[[:space:]]*$//

# 4. 删除空行
/^$/d

# 5. 转换大写
y/abcdefghijklmnopqrstuvwxyz/ABCDEFGHIJKLMNOPQRSTUVWXYZ/

# 6. 转换标点
s/./&./2
```

### 与其他工具结合

```bash
# sed 与 grep
grep -r "pattern" . | sed 's/:.*//' | xargs sed -i 's/old/new/g'

# sed 与 awk
awk '{print $1}' file.txt | sed 's/pattern//'

# sed 与 xargs
find . -name "*.txt" -exec sed -i 's/old/new/g' {} \;

# sed 与管道
cat file.txt | sed 's/old/new/' > new.txt

# sed 与 here-doc
sed "s/PATTERN/$(cat <<EOF
Replacement
Text
EOF
)/" file.txt

# sed 与变量
old="original"
new="replacement"
sed "s/$old/$new/g" file.txt

# sed 与条件
cat file.txt | while read line; do
  echo "$line" | sed 's/old/new/'
done
```

## 常见问题与解决方案

### 特殊字符处理

```bash
# 处理反斜杠
sed 's/\\/\\\\/g' file.txt

# 处理斜杠
sed 's/\//\\\//g' file.txt
sed 's#/#\\/#g' file.txt

# 处理换行
sed ':a;N;$!ba;s/\n/ /g' file.txt

# 处理引号
sed "s/'/\\'/g" file.txt
sed 's/"/\\"/g' file.txt

# 处理美元符号
sed 's/\$/\\$/g' file.txt

# 处理反引号
sed 's/`/\\`/g' file.txt

# 处理方括号
sed 's/\[//g; s/\]//g' file.txt

# 处理问号
sed 's/\?//g' file.txt

# 处理星号
sed 's/\*//g' file.txt
```

### 性能优化

```bash
# 只处理需要的行
sed -n '1,1000p' file.txt

# 提前退出
sed '/end/q' file.txt

# 使用扩展正则表达式（更快）
sed -E 's/(pattern){3}/\1/g' file.txt

# 减少替换次数
sed 's/pattern/REPLACED/' file.txt

# 使用文件代替复杂命令
sed -f script.sed file.txt

# 内存优化（大文件）
sed 's/old/new/g' large.txt > output.txt

# 并行处理
find . -name "*.txt" -exec sed -i 's/old/new/g' {} +

# 使用优化后的表达式
sed 's/\(.\{5\}\).*/\1/' file.txt
```

### 跨平台兼容

```bash
# macOS sed 兼容
sed '' file.txt
sed -i '' 's/old/new/g' file.txt

# Linux sed 兼容
sed 's/old/new/' file.txt
sed -i 's/old/new/g' file.txt

# 使用通用选项
sed -E 's/(pattern)/\1/' file.txt

# 处理换行符差异
sed 's/\r$//' dos.txt

# POSIX 兼容
sed -e 's/old/new/' file.txt

# 避免 GNU 扩展
sed -E 's/[[:digit:]]/X/g' file.txt
```

sed 是 Linux 系统中功能最强大的行编辑器之一，掌握 sed 的各种用法可以大大提高文本处理的效率。从基本的查找替换到复杂的多行处理和脚本编写，sed 都能胜任。建议从简单的替换操作开始，逐步学习更高级的功能，如保持空间操作、正则表达式和脚本编写。