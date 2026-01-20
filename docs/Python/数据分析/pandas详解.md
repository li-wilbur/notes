# Pandas 详解

Pandas 是 Python Data Analysis Library 的缩写，是基于 NumPy 构建的强大数据分析工具。它提供了高效的数据结构（Series 和 DataFrame）和丰富的数据处理功能，是数据科学和数据分析领域的必备库。

## 1. 安装与导入

```bash
pip install pandas
```

通常使用 `pd` 作为别名导入：

```python
import pandas as pd
import numpy as np  # 通常配合使用
```

## 2. 核心数据结构

Pandas 有两个核心数据结构：**Series**（一维）和 **DataFrame**（二维）。

### 2.1 Series (一维数据)

Series 类似于带索引的一维数组。

```python
# 从列表创建
s = pd.Series([1, 3, 5, np.nan, 6, 8])

# 指定索引创建
s = pd.Series([10, 20, 30], index=['a', 'b', 'c'])

# 从字典创建
d = {'a': 1, 'b': 2, 'c': 3}
s = pd.Series(d)

print(s.index)  # 获取索引
print(s.values) # 获取值
```

### 2.2 DataFrame (二维表格)

DataFrame 是一个表格型的数据结构，包含行索引和列索引。

```python
# 从字典创建 (key为列名)
data = {
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'city': ['New York', 'Paris', 'London']
}
df = pd.DataFrame(data)

# 从二维数组创建
df = pd.DataFrame(np.random.randn(6, 4), columns=list('ABCD'))
```

## 3. 数据查看与检查

快速了解数据的概况。

| 方法 | 说明 |
| :--- | :--- |
| `df.head(n)` | 查看前 n 行 (默认 5) |
| `df.tail(n)` | 查看后 n 行 (默认 5) |
| `df.info()` | 查看索引、数据类型和内存信息 |
| `df.describe()` | 查看数值列的统计摘要 (均值、标准差、最大最小值等) |
| `df.shape` | 返回元组 (行数, 列数) |
| `df.columns` | 获取列名 |
| `df.index` | 获取索引 |
| `df.dtypes` | 查看各列的数据类型 |
| `df.values` | 获取底层 NumPy 数组 |

## 4. 数据选择与索引

Pandas 推荐使用 `loc` 和 `iloc` 进行更加严格的数据选择。

### 4.1 基于标签的选择 (loc)

`loc` 通过行标签（Index）和列标签（Column Name）来选择数据。

```python
# 选择某行
df.loc[0] 

# 选择多列
df.loc[:, ['name', 'age']]

# 标签切片 (包含结束标签!)
df.loc[0:2, 'name':'age']

# 条件筛选
df.loc[df['age'] > 30]
```

### 4.2 基于位置的选择 (iloc)

`iloc` 通过整数位置（下标）来选择数据，类似于 NumPy。

```python
# 选择第3行
df.iloc[2]

# 选择前3行，前2列 (不包含结束下标)
df.iloc[0:3, 0:2]

# 选择特定位置的值
df.iloc[1, 1]
```

### 4.3 快速访问标量 (at, iat)

*   `df.at[label_index, column]`：基于标签的快速标量访问。
*   `df.iat[position_index, position_column]`：基于位置的快速标量访问。

## 5. 数据清洗

### 5.1 处理缺失值 (Missing Data)

```python
# 检查缺失值
df.isnull()  # 或 pd.isna(df)
df.notnull()

# 删除包含缺失值的行
df.dropna(how='any') # 只要有 NaN 就删
df.dropna(how='all') # 全是 NaN 才删

# 填充缺失值
df.fillna(value=0)
df.fillna(method='ffill') # 前向填充
df.fillna(method='bfill') # 后向填充
```

### 5.2 处理重复值

```python
# 检查重复行
df.duplicated()

# 删除重复行
df.drop_duplicates()

# 针对特定列去重，保留最后一次出现
df.drop_duplicates(subset=['age'], keep='last')
```

### 5.3 数据类型转换

```python
# 转换某列类型
df['age'] = df['age'].astype(float)

# 转换为时间类型
df['date'] = pd.to_datetime(df['date_str'])

# 转换为分类类型 (节省内存)
df['category_col'] = df['category_col'].astype('category')
```

## 6. 数据操作

### 6.1 列操作

```python
# 新增列
df['new_col'] = df['age'] * 2

# 删除列
df.drop('new_col', axis=1, inplace=True) # axis=1 表示列
# 或者
del df['new_col']

# 重命名列
df.rename(columns={'name': 'Full Name', 'age': 'Age'}, inplace=True)
```

### 6.2 排序

```python
# 按值排序
df.sort_values(by='age', ascending=False)

# 按索引排序
df.sort_index(axis=1, ascending=False)
```

### 6.3 函数应用 (Apply)

*   `apply()`: 作用于 Series 的每个元素，或 DataFrame 的行/列。
*   `map()`: 仅用于 Series，实现元素级映射。
*   `applymap()`: 仅用于 DataFrame，作用于每个元素。

```python
# 自定义函数
df['age'].apply(lambda x: x + 1)

# 对 DataFrame 每列求和
df.apply(np.sum, axis=0)
```

## 7. 数据聚合与分组 (Groupby)

`groupby` 遵循 "Split-Apply-Combine" 模式。

```python
# 按 'city' 分组并求平均值
df.groupby('city').mean()

# 按多列分组
df.groupby(['city', 'gender']).sum()

# 使用 agg 进行多种聚合
df.groupby('city').agg({
    'age': ['mean', 'max'],
    'salary': 'sum'
})
```

## 8. 数据合并 (Merge, Concat, Join)

### 8.1 Merge (类似 SQL Join)

基于键（key）合并两个 DataFrame。

```python
pd.merge(left, right, on='key', how='inner')
# how: 'inner', 'outer', 'left', 'right'
```

### 8.2 Concat (拼接)

沿轴方向堆叠 Pandas 对象。

```python
# 纵向堆叠 (增加行)
pd.concat([df1, df2], axis=0)

# 横向堆叠 (增加列)
pd.concat([df1, df2], axis=1)
```

### 8.3 Join

基于索引（Index）的合并。

```python
left.join(right, how='outer')
```

## 9. 时间序列分析

Pandas 在金融数据分析中非常强大。

```python
# 创建时间索引
dates = pd.date_range('20230101', periods=6)
df = pd.DataFrame(np.random.randn(6, 4), index=dates, columns=list('ABCD'))

# 重采样 (Resample) - 例如将日频数据转换为月频
df.resample('M').mean()

# 移动 (Shift) - 计算环比/同比时很有用
df.shift(1) # 数据下移一行
```

## 10. 文件读写 (I/O)

Pandas 支持多种文件格式。

### 10.1 CSV

```python
# 读取
df = pd.read_csv('data.csv', encoding='utf-8')

# 写入
df.to_csv('output.csv', index=False)
```

### 10.2 Excel

需要安装 `openpyxl`。

```python
# 读取
df = pd.read_excel('data.xlsx', sheet_name='Sheet1')

# 写入
df.to_excel('output.xlsx', sheet_name='Results')
```

### 10.3 SQL

需要 `SQLAlchemy`。

```python
from sqlalchemy import create_engine
engine = create_engine('sqlite:///:memory:')

# 写入数据库
df.to_sql('table_name', engine)

# 从数据库读取
df = pd.read_sql('SELECT * FROM table_name', engine)
```

## 11. 性能优化技巧

1.  **使用 Vectorization (向量化)**：尽量使用 Pandas 内置函数或 NumPy 操作，避免使用 `for` 循环遍历 DataFrame。
2.  **使用 Category 类型**：对于重复值较多的字符串列，转换为 `category` 类型可大幅减少内存占用并加快计算。
    ```python
    df['grade'] = df['grade'].astype('category')
    ```
3.  **使用 `eval()` 和 `query()`**：对于大型 DataFrame，这两个方法可以使用字符串表达式进行计算和筛选，通常比 Python 表达式更快。

```python
df.query('age > 25 and city == "New York"')
```

## 12. 总结

Pandas 是数据处理的瑞士军刀。熟练掌握 `Data Selection`、`Groupby` 和 `Merge` 是高效进行数据分析的关键。建议结合 NumPy 和 Matplotlib/Seaborn 一起学习，形成完整的数据分析技术栈。
