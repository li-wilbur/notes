# Python re 库详解

Python 的 `re` 模块（正则表达式）是处理字符串的强大工具，它允许用户通过模式匹配来查找、替换和分割文本。

## 1. 基本使用

### 1.1 匹配方法

*   **`re.search(pattern, string)`**：在字符串中查找第一个匹配的子串，返回 `Match` 对象或 `None`。
    ```python
    import re
    result = re.search(r'\d+', 'Python 3.10 released')
    print(result.group())  # 输出: 3
    ```

*   **`re.match(pattern, string)`**：只从字符串开头匹配，返回 `Match` 对象或 `None`。
    ```python
    result = re.match(r'Python', 'Python 3.10')
    print(result.group())  # 输出: Python
    ```

*   **`re.findall(pattern, string)`**：查找所有匹配的子串，返回列表。
    ```python
    result = re.findall(r'\d+', 'Python 3.10, Java 17')
    print(result)  # 输出: ['3', '10', '17']
    ```

*   **`re.finditer(pattern, string)`**：返回一个迭代器，包含所有匹配的 `Match` 对象。
    ```python
    for match in re.finditer(r'\w+', 'Hello World'):
        print(match.group())  # 输出: Hello, World
    ```

## 2. 正则表达式语法

### 2.1 元字符

| 字符 | 说明 |
| :--- | :--- |
| `.` | 匹配除换行符外的任意字符 |
| `^` | 匹配字符串开头 |
| `$` | 匹配字符串结尾 |
| `*` | 匹配前面的子表达式零次或多次 |
| `+` | 匹配前面的子表达式一次或多次 |
| `?` | 匹配前面的子表达式零次或一次 |
| `{n}` | 匹配前面的子表达式恰好 n 次 |
| `{n,}` | 匹配前面的子表达式至少 n 次 |
| `{n,m}` | 匹配前面的子表达式 n 到 m 次 |
| `[]` | 字符集合，匹配其中任意一个字符 |
| `|` | 或操作，匹配左右任意一个表达式 |
| `()` | 分组，将表达式作为一个整体 |

### 2.2 预定义字符类

| 字符 | 说明 |
| :--- | :--- |
| `\d` | 匹配任意数字，等价于 `[0-9]` |
| `\D` | 匹配任意非数字，等价于 `[^0-9]` |
| `\w` | 匹配字母、数字或下划线，等价于 `[a-zA-Z0-9_]` |
| `\W` | 匹配非字母、数字或下划线，等价于 `[^a-zA-Z0-9_]` |
| `\s` | 匹配任意空白字符（空格、换行、制表符等） |
| `\S` | 匹配任意非空白字符 |

## 3. 高级用法

### 3.1 分组与捕获

```python
result = re.search(r'(\w+) (\w+)', 'Hello World')
print(result.group(0))  # 输出: Hello World
print(result.group(1))  # 输出: Hello
print(result.group(2))  # 输出: World
```

### 3.2 命名分组

```python
result = re.search(r'(?P<first>\w+) (?P<last>\w+)', 'John Doe')
print(result.group('first'))  # 输出: John
print(result.group('last'))   # 输出: Doe
```

### 3.3 非捕获分组

```python
result = re.search(r'(?:\d+\.){3}\d+', '192.168.1.1')
print(result.group())  # 输出: 192.168.1.1
```

## 4. 替换与分割

*   **`re.sub(pattern, repl, string)`**：替换匹配的子串。
    ```python
    result = re.sub(r'\d+', 'X', 'Python 3.10')
    print(result)  # 输出: Python X.X
    ```

*   **`re.split(pattern, string)`**：根据匹配分割字符串。
    ```python
    result = re.split(r'[\s,]+', 'Hello, World')
    print(result)  # 输出: ['Hello', 'World']
    ```

## 5. 编译正则表达式

对于频繁使用的正则表达式，建议预编译以提高性能。

```python
pattern = re.compile(r'\d+')
result = pattern.search('Python 3.10')
print(result.group())  # 输出: 3
```

## 6. 常用示例

*   **验证邮箱**：
    ```python
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    ```

*   **提取 URL**：
    ```python
    pattern = r'https?://[^
]+'
    ```

*   **替换 HTML 标签**：
    ```python
    result = re.sub(r'<[^>]+>', '', '<p>Hello</p>')
    print(result)  # 输出: Hello
    ```

## 7. 注意事项

*   **原始字符串**：建议使用 `r''` 原始字符串来避免转义字符的问题。
*   **贪婪匹配**：正则表达式默认是贪婪匹配（尽可能多匹配），可以使用 `?` 实现非贪婪匹配。
    ```python
    result = re.search(r'<.*?>', '<p>Hello</p>')
    print(result.group())  # 输出: <p>
    ```
