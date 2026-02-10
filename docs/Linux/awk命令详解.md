# awk 命令详解

awk 是 Linux/Unix 系统中功能强大的文本处理工具，它是一种专门的模式扫描和处理语言。awk 名字来源于其三位创始人 Alfred Aho、Peter Weinberger 和 Brian Kernighan 的姓氏首字母。与 sed 相比，awk 更加强大，它不仅能够进行文本过滤，还能够进行复杂的文本分析、数据提取、报表生成等操作。awk 以行为单位处理文本，每行又可以分割为多个字段，这使得处理结构化文本数据变得非常简单高效。

## 基本语法

```bash
awk [选项] '模式{动作}' 文件名
awk [选项] -f 脚本文件 文件名
```

awk 命令的基本结构由模式和动作组成。模式用于指定要处理的行，动作用于指定对该行要执行的操作。如果省略模式，awk 会处理所有行；如果省略动作，awk 会默认打印整行内容。awk 会自动将输入行分割为字段，第一个字段用 `$1` 表示，第二个字段用 `$2` 表示，以此类推。整行用 `$0` 表示，字段总数用 `NF` 表示，行号用 `NR` 表示。

## 常用选项

- `-F fs`：指定字段分隔符（默认是空格或制表符）
- `-v var=value`：定义 awk 变量
- `-f scriptfile`：从脚本文件读取 awk 程序
- `-mf NN`：指定最大字段数
- `-mr NN`：指定最大记录大小
- `-W compat`：兼容模式
- `-W posix`：POSIX 兼容模式

## 内置变量

awk 提供了丰富的内置变量，这些变量使得文本处理变得更加灵活和强大。理解这些内置变量的含义和用法是掌握 awk 的关键。

### 记录和字段相关变量

`NR`（Number of Record）表示当前处理的记录号，即当前行号。`NF`（Number of Fields）表示当前记录的字段数，即当前行的字段数量。`FS`（Field Separator）指定字段分隔符，默认值是任意空白字符（空格或制表符）。`RS`（Record Separator）指定记录分隔符，默认值是换行符。`OFS`（Output Field Separator）指定输出时的字段分隔符。`ORS`（Output Record Separator）指定输出时的记录分隔符。

```bash
# 使用 NR 打印行号
awk '{print NR, $0}' file.txt

# 使用 NF 处理每行的字段
awk '{print "字段数:", NF}' file.txt

# 使用自定义字段分隔符
awk -F: '{print $1, $3}' /etc/passwd

# 使用 FS 指定复杂分隔符
awk 'BEGIN{FS=","} {print $1, $2}' data.csv

# 使用 OFS 输出
awk 'BEGIN{OFS=","} {print $1, $2}' file.txt

# 打印带有行号和字段数的行
awk '{print NR": ["$0"] (字段数:"NF")"}' file.txt
```

### 文件相关变量

`FILENAME` 表示当前正在处理的文件名。`FNR` 与 `NR` 类似，但用于当前文件，当处理多个文件时会在每个文件后重置。这个变量在处理多个文件时非常有用，可以帮助区分不同文件的记录。

```bash
# 打印文件名和行内容
awk '{print FILENAME, NR, $0}' file1.txt file2.txt

# 使用 FNR 区分文件
awk '{print FILENAME, FNR, $0}' file1.txt file2.txt

# 统计每个文件的行数
awk '{files[FNR FILENAME]++; count[FILENAME]++} END{for(f in count) print f, count[f]}' file1.txt file2.txt

# 显示当前处理的文件
awk '{if (FILENAME != prev) {print "=== " FILENAME " ==="; prev=FILENAME} print}' *.txt
```

### 环境变量

`ENVIRON` 是一个关联数组，包含当前 shell 的环境变量。可以通过 `ENVIRON["HOME"]` 或 `ENVIRON["USER"]` 的方式访问环境变量。这个特性使得 awk 脚本可以与 shell 环境进行交互。

```bash
# 打印用户信息
awk 'BEGIN{print "用户:", ENVIRON["USER"]; print "主目录:", ENVIRON["HOME"]}'

# 在处理文件时使用环境变量
awk -v user=$USER '{print user, $0}' file.txt

# 根据环境变量设置输出格式
awk 'BEGIN{if (ENVIRON["TERM"] == "xterm") print "终端支持颜色"}'
```

## 模式类型

### 正则表达式模式

正则表达式模式是 awk 中最常用的匹配方式。可以使用斜杠 `/pattern/` 包围正则表达式，awk 会找出所有匹配该正则表达式的行。默认情况下，正则表达式匹配整行，但也可以指定字段或特定区域进行匹配。

```bash
# 匹配包含 "error" 的行
awk '/error/ {print $0}' /var/log/syslog

# 匹配以特定字符串开头的行
awk '/^root/ {print $0}' /etc/passwd

# 匹配包含数字的行
awk '/[0-9]/ {print NR": "$0}' file.txt

# 匹配以特定模式结尾的行
awk '/finished$/ {print "完成: "$0}' log.txt

# 匹配多个模式之一
awk '/error|fail|warn/ {print "警告: "$0}' system.log

# 不区分大小写的匹配
awk 'BEGIN{IGNORECASE=1} /error/ {print $0}' log.txt

# 匹配特定字段
awk '$1 ~ /^error/ {print $0}' log.txt

# 反向匹配（不包含模式）
awk '!/error/ {print $0}' log.txt

# 使用精确匹配
awk '$3 == "completed" {print $0}' status.txt
```

### 关系表达式模式

关系表达式模式使用比较运算符来筛选记录。awk 支持多种比较运算符，包括等于 `==`、不等于 `!=`、大于 `>`、小于 `<`、大于等于 `>=`、小于等于 `<=`。也可以使用逻辑运算符组合多个条件。

```bash
# 数值比较
awk '$3 > 100 {print $0}' data.txt

# 字符串比较
awk '$1 == "John" {print $0}' names.txt

# 多条件组合
awk '$1 == "John" && $3 > 100 {print $0}' data.txt

# 或条件
awk '$1 == "John" || $1 == "Jane" {print $0}' names.txt

# 范围判断
awk '$2 >= 50 && $2 <= 100 {print $0}' scores.txt

# 使用三元运算符
awk '{print ($2 >= 60 ? "及格" : "不及格"), $1}' scores.txt

# 字段存在性检查
awk 'NF >= 3 {print $0}' file.txt
```

### 范围模式

范围模式用于指定连续的多行记录，使用逗号分隔起始模式和结束模式。当遇到起始模式时开始处理，直到遇到结束模式为止。这种模式在处理多行记录或块数据时非常有用。

```bash
# 从匹配 "start" 到匹配 "end" 的行
awk '/start/,/end/ {print $0}' file.txt

# 从第 5 行到第 10 行
awk 'NR>=5 && NR<=10 {print NR": "$0}' file.txt

# 从匹配 "BEGIN" 到文件末尾
awk '/BEGIN/,0 {print $0}' file.txt

# 多重范围
awk '/pattern1/,/pattern2/ {print "范围1: "$0} /pattern3/,/pattern4/ {print "范围2: "$0}' file.txt

# 在范围内计数
awk '/start/,/end/ {count++; if (/end/) {print "范围内共有", count, "行"; count=0}}' file.txt

# 处理配置文件中的块
awk '/^\[/,/^\]/ {print $0}' config.ini
```

### BEGIN 和 END 模式

BEGIN 模式在处理任何输入之前执行，常用于初始化变量和设置格式。END 模式在所有输入处理完成后执行，常用于汇总统计结果。这两个模式是 awk 编程中非常有用的控制结构。

```bash
# BEGIN 初始化
awk 'BEGIN{FS=","; OFS="\t"; print "开始处理数据..."} {print $1, $2} END{print "处理完成"}' data.csv

# END 统计汇总
awk '{sum+=$2; count++} END{print "总和:", sum; print "平均值:", sum/count}' data.txt

# 多变量初始化
awk 'BEGIN{count=0; sum=0; print "--- 统计开始 ---"} {count++; sum+=$2} END{print "--- 统计结束 ---"; print "记录数:", count; print "总和:", sum}' data.txt

# 打印表头和表尾
awk 'BEGIN{print "姓名\t成绩"} {print $1"\t"$2} END{print "========"}' scores.txt

# 设置输出格式
awk 'BEGIN{FORMAT="%-10s %-10s\n"; printf FORMAT, "姓名", "分数"; total=0} {printf FORMAT, $1, $2; total+=$2} END{printf FORMAT, "总计", total}' scores.txt
```

## 基本动作

### 打印操作

打印是 awk 中最基本的动作，用于输出处理结果。awk 提供了多种打印方式，包括 `print`、`printf` 和 `sprintf`。`print` 用于简单输出，`printf` 用于格式化输出，`sprintf` 用于生成格式化字符串。

```bash
# 打印整行
awk '{print $0}' file.txt

# 打印特定字段
awk '{print $1, $3}' file.txt

# 使用字符串连接
awk '{print "姓名:" $1 ", 年龄:" $3}' users.txt

# 使用 printf 格式化
awk '{printf "%-10s %-5d\n", $1, $2}' scores.txt

# 指定字段分隔符
awk '{print $1, $2}' OFS="," file.txt

# 打印行号
awk '{print NR, $0}' file.txt

# 打印字段数和行号
awk '{print NF, NR, $0}' file.txt

# 打印最后字段
awk '{print $NF}' file.txt

# 打印倒数第二个字段
awk '{print $(NF-1)}' file.txt

# 条件打印
awk '$2 > 80 {print $1, "优秀"} $2 <= 80 && $2 >= 60 {print $1, "及格"} $2 < 60 {print $1, "不及格"}' scores.txt
```

### 赋值操作

awk 允许对字段和变量进行赋值操作，这使得awk可以进行数据转换和计算。赋值运算符包括简单赋值 `=`、累加赋值 `+=`、累减赋值 `-=`、乘赋值 `*=`、除赋值 `/=` 等。

```bash
# 修改变量值
awk '{sum+=$2; count++} END{print "平均值:", sum/count}' data.txt

# 修改字段值
awk '{$2 = $2 * 1.1; print $0}' salary.txt

# 使用子串替换
awk '{$1 = substr($1, 1, 3); print $0}' names.txt

# 字符串拼接
awk '{fullname = $1 " " $2; print fullname}' names.txt

# 条件赋值
awk '{$3 = ($3 >= 60 ? "及格" : "不及格"); print $0}' scores.txt

# 累加多个字段
awk '{sum = $2 + $3 + $4; print $1, sum}' grades.txt

# 使用指数运算
awk '{$4 = $2 ^ 2; print $0}' data.txt

# 使用模运算
awk '{$3 = $2 % 10; print $0}' numbers.txt
```

### 控制结构

awk 支持完整的程序控制结构，包括条件语句和循环语句。这使得 awk 可以处理复杂的逻辑，实现复杂的文本处理任务。

```bash
# if 语句
awk '{if ($2 >= 60) print $1, "及格"; else print $1, "不及格"}' scores.txt

# if-else if-else
awk '{if ($2 >= 90) grade="A"; else if ($2 >= 80) grade="B"; else if ($2 >= 70) grade="C"; else if ($2 >= 60) grade="D"; else grade="F"; print $1, grade}' scores.txt

# for 循环
awk '{for (i=1; i<=NF; i++) sum+=$i} END{print sum}' numbers.txt

# while 循环
awk '{i=1; while (i<=NF) {if ($i>0) sum+=$i; i++}} END{print sum}' data.txt

# do-while 循环
awk '{i=1; sum=0; do {sum+=$i; i++} while (i<=3)} END{print sum}' data.txt

# break 语句
awk '{sum=0; for (i=1; i<=NF; i++) {if ($i<0) break; sum+=$i} print sum}' data.txt

# continue 语句
awk '{sum=0; for (i=1; i<=NF; i++) {if ($i==0) continue; sum+=$i} print sum}' data.txt

# next 语句（跳过当前行）
awk '{if ($1=="#") next; print $0}' config.txt

# switch-case (gawk)
awk '{switch($1) {case "error": print "错误"; break; case "warn": print "警告"; break; default: print "信息"}}' log.txt
```

## 字符串函数

### 字符串长度和子串

awk 提供了丰富的字符串处理函数，这些函数使得 awk 在处理文本数据时非常强大和灵活。

```bash
# 计算字符串长度
awk '{print length($0), $0}' file.txt

# 计算字段长度
awk '{print length($1), $1}' words.txt

# 提取子串
awk '{print substr($1, 1, 3)}' names.txt

# 从指定位置提取到末尾
awk '{print substr($1, 3)}' names.txt

# 查找子串位置
awk '{pos=index($1, "test"); if (pos>0) print "found at", pos; else print "not found"}' text.txt

# 格式化字符串
awk '{s=sprintf("%-10s %05d", $1, $2); print s}' data.txt

# 转换为大写
awk '{print toupper($0)}' file.txt

# 转换为小写
awk '{print tolower($0)}' file.txt

# 字符串长度比较
awk '{if (length($1) > length($2)) print $1; else print $2}' strings.txt
```

### 字符串替换

awk 支持多种字符串替换操作，包括子串替换和正则表达式替换。

```bash
# 替换第一个匹配
awk '{sub(/old/, "new", $1); print $1}' text.txt

# 替换所有匹配
awk '{gsub(/old/, "new", $1); print $1}' text.txt

# 指定替换次数
awk '{count=gsub(/old/, "new", $1); print count, $1}' text.txt

# 使用分隔符
awk '{gsub(/:/, "-", $0); print $0}' data.txt

# 替换固定字符串
awk '{str=$0; sub(/123/, "XXX", str); print str}' numbers.txt

# 基于位置的替换
awk '{$1 = substr($1, 1, 2) "XX" substr($1, 5); print $1}' ids.txt

# 多次替换
awk '{gsub(/error/, "ERROR"); gsub(/warn/, "WARN"); print $0}' log.txt

# 使用捕获组
awk '{gsub(/(.*)@ (.*)/, "\\1 at \\2", $0); print $0}' emails.txt
```

### 字符串分割

awk 提供了强大的字符串分割功能，可以将字符串按照指定的分隔符分割为数组。

```bash
# 使用 split 分割字符串
awk '{split($0, arr, ","); print arr[1], arr[2]}' csv.txt

# 分割并统计
awk '{n=split($0, arr, ":"); print "字段数:", n}' data.txt

# 使用默认分隔符
awk '{split($0, arr); print arr[2], arr[4]}' file.txt

# 逆向操作（连接数组）
awk '{join(arr, $0); print $0}' (需要自定义函数)

# 按空格分割
awk '{split($0, arr); for(i in arr) print arr[i]}' sentence.txt

# 解析逗号分隔值
awk -F, '{print $1, $2, $3}' data.csv

# 解析复杂格式
awk '{gsub(/[()]/, "", $0); split($0, arr, ","); print arr[1], arr[2]}' complex.txt
```

## 数值函数

awk 提供了多种数值处理函数，满足各种数值计算需求。

```bash
# 四舍五入
awk '{print int($1+0.5)}' decimals.txt

# 向上取整
awk '{print int($1)+($1>int($1)?1:0)}' decimals.txt

# 向下取整
awk '{print int($1)}' decimals.txt

# 绝对值
awk '{print sqrt($1*$1)}' numbers.txt

# 平方根
awk '{print sqrt($1)}' numbers.txt

# 幂运算
awk '{print $1^2}' numbers.txt

# 自然对数
awk '{print log($1)}' numbers.txt

# 常用对数
awk '{print log($1)/log(10)}' numbers.txt

# 指数函数
awk '{print exp($1)}' numbers.txt

# 正弦和余弦
awk '{print sin($1), cos($1)}' angles.txt

# 随机数
awk 'BEGIN{srand(); print rand()}'
awk 'BEGIN{srand(); for(i=1; i<=5; i++) print int(rand()*100)}'

# 多字段求和
awk '{sum=0; for(i=1; i<=NF; i++) sum+=$i; print sum}' numbers.txt

# 统计平均值
awk '{sum=0; for(i=1; i<=NF; i++) sum+=$i; print sum/NF}' numbers.txt

# 标准差
awk '{sum=0; sumsq=0; n=0; for(i=1; i<=NF; i++) {sum+=$i; sumsq+=$i*$i; n++}; print sqrt(sumsq/n - (sum/n)^2)}' numbers.txt
```

## 关联数组

awk 的关联数组是其最强大的特性之一，它可以像使用字符串作为索引，非常适合处理键值对数据和进行复杂统计。

### 数组基本操作

```bash
# 定义和使用数组
awk '{count[$1]++} END{for(name in count) print name, count[name]}' names.txt

# 统计词频
awk '{for(i=1; i<=NF; i++) words[$i]++} END{for(w in words) print w, words[w]}' article.txt

# 统计每个月的销售额
awk -F, '{sales[$2]+=$3} END{for(month in sales) print month, sales[month]}' sales.csv

# 查找最大值
awk '{if ($2 > max[$1]) max[$1]=$2} END{for(id in max) print id, max[id]}' data.txt

# 查找最小值
awk '{if (!min[$1] || $2 < min[$1]) min[$1]=$2} END{for(id in min) print id, min[id]}' data.txt

# 数组排序
awk '{vals[$1]=$2} END{n=asort(vals); for(i=1; i<=n; i++) print i, vals[i]}' data.txt

# 多维数组模拟
awk '{key=$1 SUBSEP $2; count[key]++} END{for(k in count) print k, count[k]}' data.txt

# 删除数组元素
awk '{if (!seen[$1]++) first[$1]=$0} END{delete seen; for(item in first) print item}' data.txt

# 检查元素是否存在
awk '{if (!($1 in count)) count[$1]=0; count[$1]+=$2} END{for(c in count) print c, count[c]}' data.txt
```

### 数组排序

awk 提供了多种数组排序函数，可以按键排序或按值排序。

```bash
# 按值升序排序
awk '{vals[$1]=$2} END{n=asort(vals); for(i=1; i<=n; i++) print vals[i]}' data.txt

# 保持索引排序
awk '{vals[$1]=$2} END{n=asort(vals, sorted); for(i=1; i<=n; i++) print sorted[i]}' data.txt

# 自定义比较函数
awk 'BEGIN{PROCINFO["sorted_in"]="@val_type_asc"} {arr[$1]=$2} END{for(i in arr) print i, arr[i]}' data.txt

# 按数值排序
awk 'BEGIN{PROCINFO["sorted_in"]="@val_num_asc"} {arr[$1]=$2} END{for(i in arr) print i, arr[i]}' numbers.txt

# 按索引排序
awk 'BEGIN{PROCINFO["sorted_in"]="@ind_str_asc"} {arr[$1]=$2} END{for(i in arr) print i, arr[i]}' data.txt

# 按索引数值排序
awk 'BEGIN{PROCINFO["sorted_in"]="@ind_num_asc"} {arr[$1]=$2} END{for(i in arr) print i, arr[i]}' data.txt

# 逆序排序
awk 'BEGIN{PROCINFO["sorted_in"]="@val_str_desc"} {arr[$1]=$2} END{for(i in arr) print i, arr[i]}' data.txt

# 多级排序
awk '{if (!($1 in first) || $2 > max[$1]) {first[$1]=NR; max[$1]=$2}} END{PROCINFO["sorted_in"]="@val_num_asc"; for(k in max) print k, max[k]}' data.txt
```

## 用户自定义函数

awk 允许用户定义自己的函数，使代码更加模块化和可重用。

```bash
# 基本函数定义
awk 'function max(a,b) {return a>b?a:b} {print max($1,$2)}' numbers.txt

# 多参数函数
awk 'function average(a,b,c) {return (a+b+c)/3} {print average($1,$2,$3)}' numbers.txt

# 递归函数
awk 'function factorial(n) {if (n<=1) return 1; else return n*factorial(n-1)} {print factorial($1)}' numbers.txt

# 处理数组的函数
awk 'function sum(arr, n,   total,i) {total=0; for(i=1; i<=n; i++) total+=arr[i]; return total} {split($0, arr); print sum(arr, NF)}' numbers.txt

# 字符串处理函数
awk 'function reverse(s,   i,t) {t=""; for(i=length(s); i>=1; i--) t=t substr(s,i,1); return t} {print reverse($1)}' words.txt

# 日期处理函数
awk 'function format_date(y,m,d) {return sprintf("%04d-%02d-%02d", y, m, d)} {print format_date($1,$2,$3)}' dates.txt

# 调用库函数
awk 'include file' (需要使用 -f 选项)

# 验证输入
awk 'function validate(num) {if (num<0 || num>100) return 0; return 1} {print validate($1)}' numbers.txt
```

## 实际应用场景

### 日志分析

```bash
# 统计每个 IP 的访问次数
awk '{ips[$1]++} END{for(ip in ips) print ip, ips[ip]}' access.log

# 统计 HTTP 状态码分布
awk '{codes[$9]++} END{for(code in codes) print code, codes[code]}' access.log

# 找出访问量最大的前 10 个 IP
awk '{ips[$1]++} END{PROCINFO["sorted_in"]="@val_num_desc"; for(ip in ips) {if (++n<=10) print ip, ips[ip]}}' access.log

# 计算每秒请求数
awk '{time=substr($4,14,8); reqs[time]++} END{PROCINFO["sorted_in"]="@val_num_asc"; for(t in reqs) print t, reqs[t]}' access.log

# 统计每个小时的请求数
awk '{hour=substr($4,13,2); reqs[hour]++} END{PROCINFO["sorted_in"]="@val_str_asc"; for(h in reqs) print h":00", reqs[h]}' access.log

# 过滤错误日志
awk '$9 >= 400 {print $0}' access.log

# 统计响应时间超过 5 秒的请求
awk '$NF > 5 {print $0}' access.log

# 找出最慢的 20 个请求
awk '{times[NR]=$NF; lines[NR]=$0} END{PROCINFO["sorted_in"]="@val_num_desc"; n=0; for(t in times) {if (++n<=20) print times[t], lines[t]}}' access.log

# 统计每个 URL 的访问次数
awk '{urls[$7]++} END{for(url in urls) print url, urls[url]}' access.log

# 计算总带宽消耗
awk '{bytes[$7]+=$NF} END{for(url in bytes) print url, bytes[url]}' access.log
```

### 数据处理

```bash
# 计算每列的总和
awk '{for(i=1; i<=NF; i++) {sum[i]+=$i}} END{for(i=1; i<=NF; i++) print "列"i"总和:", sum[i]}' data.txt

# 计算每列的平均值
awk '{for(i=1; i<=NF; i++) {sum[i]+=$i; count[i]++}} END{for(i=1; i<=NF; i++) print "列"i"平均值:", sum[i]/count[i]}' data.txt

# 数据去重
awk '!seen[$0]++' data.txt

# 找出重复行
awk 'seen[$0]++' data.txt | uniq -d

# 合并相同 ID 的行
awk -F, '{key=$1; lines[key]=(key in lines ? lines[key]"\n" : "") $0} END{for(k in lines) print lines[k]}' data.csv

# 数据格式化
awk 'BEGIN{print "姓名\t数学\t英语\t总分\t平均分"} {sum=$2+$3+$4; avg=sum/3; printf "%-10s %-5d %-5d %-5d %-6.2f\n", $1, $2, $3, $4, avg}' scores.txt

# 过滤无效数据
awk -F, 'NF>=4 && $2>0 && $3>0 {print $0}' data.csv

# 数据归一化
awk '{max=0; for(i=2; i<=NF; i++) if ($i>max) max=$i; for(i=2; i<=NF; i++) $i=$i/max; print $0}' data.txt

# 交叉表统计
awk -F, '{row[$1]++; col[$2]++; total++} END{print "行分布"; for(r in row) print r, row[r]; print "列分布"; for(c in col) print c, col[c]}' data.csv

# 计算百分比
awk '{sum+=$2} END{for(k in counts) printf "%s: %.2f%%\n", k, counts[k]/sum*100}' data.txt

# 数据转置
awk '{for(i=1; i<=NF; i++) trans[i,NR]=$i; max=NR} END{for(i=1; i<=max; i++) {for(j=1; j<=NF; j++) printf "%s ", trans[i,j]; print ""}}' data.txt
```

### 系统管理

```bash
# 分析 CPU 使用情况
awk '/^cpu / {total=$2+$3+$4+$5+$6+$7+$8; idle=$5; print "CPU使用率:", 100-idle/total*100}' /proc/stat

# 分析内存使用
awk '/MemTotal/{total=$2} /MemAvailable/{avail=$2} END{print "内存使用率:", (total-avail)/total*100}' /proc/meminfo

# 解析 df 输出
awk '/^\/dev\// {print $1, $5, $6}' df -h

# 解析 ps 输出
awk '$1=="root" || $1=="www-data" {count[$1]++} END{for(u in count) print u, count[u]}' ps aux

# 分析磁盘 I/O
awk '/^sd[a-z] / {read[$1]+=$2; write[$1]+=$3} END{for(d in read) print d, "读:", read[d], "写:", write[d]}' /proc/diskstats

# 统计用户登录
awk '/^[^:]+:[^:]+:[0-9]+:/ {users[$1]++} END{for(u in users) print u, users[u]}' lastlog

# 网络连接统计
awk '/^\s*ESTABLISHED/ {proto[$NF]++; src[$1]++} END{for(p in proto) print p, proto[p]; for(s in src) print "源:", s, src[s]}' netstat -an

# 服务状态检查
awk '/^Active:|^Loaded:/' systemctl status nginx

# 进程资源监控
awk '$3>0 {proc[$2]+=$3; mem[$2]+=$4} END{for(p in proc) print p, "CPU:", proc[p], "MEM:", mem[p]}' ps aux

# 日志文件大小统计
awk '{total+=$5} END{print "总大小:", total/1024/1024, "MB"}' ls -lR
```

### 文本处理

```bash
# 文本列提取
awk '{print $2, $5}' file.txt

# 条件过滤
awk '$3 > 100 {print $1, $3}' data.txt

# 模式统计
awk '/error/{e++} /warn/{w++} /info/{i++} END{print "error:", e, "warn:", w, "info:", i}' log.txt

# 表格生成
awk 'BEGIN{print "+-----+-----+"; print "| 姓名 | 分数 |"; print "+-----+-----+"} {printf "| %-4s | %-3d |\n", $1, $2; sum+=$2; n++} END{print "+-----+-----+"; print "| 总计 | "sum" |"; print "+-----+-----+"}' scores.txt

# 格式化输出
awk 'BEGIN{printf "%-15s %-10s %-10s\n", "名称", "数量", "金额"; printf "%-15s %-10s %-10s\n", "----", "----", "----"} {printf "%-15s %-10d %-10.2f\n", $1, $2, $3} END{printf "%-15s %-10s %-10.2f\n", "总计", sum, amount}' data.txt

# 字段重新排列
awk '{print $4, $2, $1, $3}' data.txt

# 文本到 CSV
awk '{print "\""$1"\",\""$2"\",\""$3"\""}' data.txt

# CSV 到制表符分隔
awk -F, 'BEGIN{OFS="\t"} {print $1, $2, $3}' data.csv

# 多个空格转单个空格
awk '{$1=$1; print}' file.txt

# 删除空行
awk 'NF>0' file.txt

# 添加行号
awk '{print NR, $0}' file.txt
```

## 高级技巧

### 多文件处理

```bash
# 处理多个文件
awk '{print FILENAME, NR, $0}' file1.txt file2.txt

# 跨文件关联
awk 'NR==FNR{a[$1]=$2; next} {print $1, a[$1]}' file1.txt file2.txt

# 合并两个文件
awk 'NR==FNR{a[NR]=$0; next} {print a[FNR], $0}' file1.txt file2.txt

# 外连接模拟
awk 'NR==FNR{a[$1]=$0; next} {if ($1 in a) print a[$1], $2; else print $1, "N/A"}' file1.txt file2.txt

# 左连接
awk 'NR==FNR{a[$1]=$2; next} {print $0, (($1 in a)?a[$1]:"0")}' file1.txt file2.txt

# 交集计算
awk 'NR==FNR{a[$1]++; next} $1 in a {print}' file1.txt file2.txt

# 差集计算
awk 'NR==FNR{a[$1]++; next} !($1 in a)' file1.txt file2.txt

# 并集计算
awk '{a[$1]++} END{for(k in a) print k}' file1.txt file2.txt
```

### 性能优化

```bash
# 使用内联代码减少函数调用
awk '{sum+=$2; count++} END{print sum/count}' data.txt

# 限制字段处理
awk '{for(i=1; i<=3 && i<=NF; i++) print $i}' data.txt

# 使用 next 提前结束
awk '/skip_pattern/{next} {process}' file.txt

# 减少输出缓冲
awk '{print $0}' file.txt | unbuffer

# 限制输入记录大小
awk 'length($0)<1000' large.txt

# 使用协处理
awk '{print | "grep pattern"}' large.txt

# 并行处理（需要 GNU parallel）
awk '{print $0}' data.txt | parallel -j 4 awk '{process}'

# 统计前先排序
sort data.txt | awk '{sum+=$2} END{print sum}'

# 使用索引代替遍历
awk 'NR==FNR{a[$1]=$2; next} {print a[$1]}' lookup.txt data.txt

# 避免不必要的字符串操作
awk '{if ($2>100) print $1}' data.txt
```

### 与 Shell 脚本集成

```bash
# 在 awk 中调用 shell 命令
awk '{cmd="echo "$1; cmd | getline result; print result}' file.txt

# 使用 system 函数
awk '{if ($1<0) system("echo 警告: "$1" 为负数")}' numbers.txt

# 双向通信
awk 'BEGIN{print "hello" |& "cat"; "cat" |& getline response; print response}'

# 传递 shell 变量到 awk
var="test"; awk -v pattern="$var" '$0~pattern {print $0}' file.txt

# 从 awk 传递变量到 shell
awk 'BEGIN{system("export VAR="$1)}' file.txt

# 使用 shell 数组
awk '{system("arr["NR"]=\""$0"\"")}' file.txt

# 动态生成 awk 脚本
script="awk '{print "$1", "$2"}'"; eval $script file.txt

# 读取环境变量
awk 'BEGIN{for (e in ENVIRON) print e"="ENVIRON[e]}'

# 处理带空格的字段
awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/, "", $1); print $1}' data.txt

# 使用 while 循环读取
awk '{line=$0; while (length(line)>0) {match(line, /[^|]+/); token=substr(line,RSTART,RLENGTH); print token; line=substr(line,RSTART+RLENGTH)}}' data.txt
```

## 常见问题与解决方案

### 字段分隔符问题

```bash
# 多个连续空格作为分隔符
awk 'BEGIN{FS="[ ]+"} {print $1, $2}' file.txt

# 包含空格的 CSV 处理
awk -F',' 'BEGIN{OFS=","} {gsub(/^"|"$/, "", $1); print $0}' data.csv

# 可变分隔符
awk '{split($0, a, /[:;|]/); print a[1], a[2]}' mixed.txt

# 结尾分隔符
awk 'BEGIN{FS=","} {if (sub(/,$/, "")) print "已移除结尾逗号"}' csv.txt

# 处理引号包围的字段
awk -F',' 'BEGIN{while((getline line)>0){gsub(/^"|"$/, "", line); print line}}' quoted.csv

# 跳过注释行
awk '/^#/ {next} {print $0}' config.txt

# 处理 Windows 换行符
awk '{gsub(/\r$/, ""); print $0}' dos.txt

# 处理 UTF-8 BOM
awk '{sub(/^\xEF\xBB\xBF/, ""); print $0}' utf8bom.txt
```

### 数值精度问题

```bash
# 浮点数精度
awk 'BEGIN{printf "%.2f\n", 0.1+0.2}'

# 大数计算
awk 'BEGIN{print 12345678901234567890}'

# 整数溢出处理
awk 'BEGIN{print strtonum("0xFFFFFFFFFFFF")}'

# 科学计数法
awk 'BEGIN{print 1e10+1}'

# 金额计算（分转为元）
awk '{printf "%.2f\n", $1/100}' cents.txt

# 百分比计算
awk 'BEGIN{printf "%.2f%%\n", 0.12345*100}'

# 四舍五入
awk '{printf "%.0f\n", $1+0.5}' decimals.txt

# 千分位格式化
awk '{printf "%,.2f\n", $1}' numbers.txt

# 金额千分位
awk '{n=int($1); if($1<0)n--; s=""; while(n>0){len=length(n); if(len>3){s=substr(n,len-2)"."s; n=substr(n,1,len-3)} else{s=n"."s; n=0}}; printf "%s%.2f\n", ($1<0?"-":""), s$1%100}' money.txt
```

### 正则表达式问题

```bash
# 转义特殊字符
awk '{gsub(/\./, "\\.", $0); print $0}' dots.txt

# 处理正则表达式元字符
awk '{gsub(/\[|\]/, "", $0); print $0}' brackets.txt

# 使用动态正则表达式
awk -v pattern="$1" '$0 ~ pattern' file.txt

# 多行匹配
awk '{if ($0 ~ /start.*end/) print "found"}' multiline.txt

# 非贪婪匹配
awk '{match($0, /a.*?b/); print substr($0,RSTART,RLENGTH)}' test.txt

# Unicode 匹配
awk 'BEGIN{FPAT="[^\x00-\x7F]+"} {print $0}' unicode.txt

# 零宽断言
awk '{gsub(/(?<=\d)(?=\d)/, ",", $0); print $0}' numbers.txt

# 条件正则
awk '/^(error|warn|fail)/ {print "警告:", $0}' log.txt
```

awk 是处理结构化文本数据的利器，它提供了强大的模式匹配、字段处理、变量运算和流程控制功能。掌握 awk 可以大大提高文本处理和数据分析的效率，是 Linux 系统管理和数据工程师必备的技能之一。建议从简单的文本过滤开始，逐步学习更复杂的模式匹配和数据处理功能。