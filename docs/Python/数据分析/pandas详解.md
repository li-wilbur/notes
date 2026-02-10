# pandas 详解

pandas 是 Python 语言中功能最强大的数据分析和数据处理库，它提供了高性能、易于使用的数据结构和数据分析工具。pandas 建立在 NumPy 之上，提供了两种核心数据结构：Series（一维数组）和 DataFrame（二维表格），这两种数据结构能够满足绝大多数数据处理场景的需求。pandas 名称来源于"panel data"（面板数据）和"Python data analysis"的组合，它是数据科学、机器学习、金融分析等领域不可或缺的工具。

## 安装与基本使用

### 安装方法

pandas 可以通过多种方式安装，最常用的是使用 pip 或 conda 包管理器进行安装。不同的安装方式适用于不同的使用场景，生产环境和开发环境的安装策略也有所不同。正确安装 pandas 是开始数据分析工作的第一步。

```python
# 使用 pip 安装
pip install pandas

# 指定版本安装
pip install pandas==2.1.0

# 安装特定依赖版本
pip install "pandas>=2.0,<3.0"

# 使用 conda 安装
conda install pandas

# 从源码安装
git clone https://github.com/pandas-dev/pandas.git
cd pandas
python setup.py install

# 检查安装版本
import pandas as pd
print(pd.__version__)

# 安装完整科学计算环境
pip install numpy pandas matplotlib scipy scikit-learn
```

### 基本导入和使用惯例

在 Python 中使用 pandas 时，遵循社区约定俗成的导入惯例可以提高代码的可读性和可维护性。标准导入方式是 `import pandas as pd`，这种写法已经成为 Python 数据科学生态系统中的通用标准。所有 pandas 的函数和数据结构都可以通过 `pd.` 前缀来访问，这种简洁的写法能够有效避免命名冲突并保持代码的整洁性。

```python
# 标准导入惯例
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 检查 pandas 版本
print(f"pandas 版本: {pd.__version__}")
print(f"numpy 版本: {np.__version__}")

# 设置显示选项
pd.set_option('display.max_columns', 10)
pd.set_option('display.width', 1000)
pd.set_option('display.max_rows', 100)

# 创建简单的 Series 和 DataFrame
s = pd.Series([1, 2, 3, 4, 5])
df = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]})

# 查看数据基本信息
print(df.info())
print(df.describe())
```

## Series 数据结构

### Series 的创建

Series 是 pandas 中最基本的一维数组结构，它由两部分组成：一组索引（index）和一组对应的数据值（values）。Series 类似于 NumPy 的一维数组，但增加了索引功能，使得数据可以通过标签进行访问而不仅仅通过位置索引。创建 Series 的方式多种多样，可以从列表、字典、NumPy 数组等多种数据源创建，每种创建方式都有其特定的应用场景和优势。

```python
import pandas as pd
import numpy as np

# 从列表创建 Series
s1 = pd.Series([1, 2, 3, 4, 5])
print("从列表创建:", s1)

# 指定索引
s2 = pd.Series([1, 2, 3, 4, 5], index=['a', 'b', 'c', 'd', 'e'])
print("带索引:", s2)

# 从字典创建 Series
s3 = pd.Series({'a': 1, 'b': 2, 'c': 3, 'd': 4})
print("从字典创建:", s3)

# 从 NumPy 数组创建
arr = np.array([1, 2, 3, 4, 5])
s4 = pd.Series(arr, index=['a', 'b', 'c', 'd', 'e'])
print("从数组创建:", s4)

# 创建指定数据类型的 Series
s5 = pd.Series([1, 2, 3], dtype='float64')
print("指定类型:", s5)

# 创建带名称的 Series
s6 = pd.Series([1, 2, 3, 4], name='人口')
print("带名称:", s6)

# 创建空 Series
s7 = pd.Series(dtype='float64')
print("空 Series:", s7)

# 从定时序列创建
s8 = pd.date_range('2024-01-01', periods=5, freq='D')
print("日期索引:", s8)
```

### Series 的基本操作

Series 对象提供了丰富的方法和属性来访问、修改和分析数据。索引操作是 Series 最常用的功能，支持整数位置索引、标签索引和布尔索引等多种方式。Series 的算术运算遵循 NumPy 的广播规则，这使得对 Series 进行向量化操作变得非常简单和高效。掌握 Series 的基本操作是使用 pandas 进行数据分析的基础。

```python
import pandas as pd
import numpy as np

# 创建示例 Series
s = pd.Series([10, 20, 30, 40, 50], index=['a', 'b', 'c', 'd', 'e'])

# 访问元素
print("按标签访问:", s['a'])
print("按位置访问:", s[0])
print("切片访问:", s['a':'c'])
print("按位置切片:", s[1:3])

# 使用 .loc 和 .iloc
print("loc 标签索引:", s.loc['a'])
print("iloc 位置索引:", s.iloc[0])

# 布尔索引
print("大于 25 的元素:", s[s > 25])

# 修改元素
s['a'] = 100
print("修改后:", s)

# 运算操作
print("加法:", s + 10)
print("乘法:", s * 2)
print("平方:", s ** 2)

# 统计方法
print("求和:", s.sum())
print("平均值:", s.mean())
print("最大值:", s.max())
print("最小值:", s.min())
print("标准差:", s.std())
print("中位数:", s.median())
print("描述统计:", s.describe())

# 其他常用方法
print("计数:", s.count())
print("唯一值:", s.unique())
print("值计数:", s.value_counts())
print("是否为空:", s.empty)
print("索引:", s.index)
print("值:", s.values)
print("类型:", s.dtype)
print("形状:", s.shape)
print("大小:", s.size)
```

### Series 的高级操作

Series 的高级操作包括缺失值处理、字符串方法、分组聚合等。这些功能使得 Series 能够处理实际数据中常见的复杂情况，如缺失数据、文本数据转换、条件筛选等。熟练掌握这些高级操作可以大大提高数据预处理的效率和质量。pandas 的 Series 设计理念是提供灵活且高效的数据操作能力。

```python
import pandas as pd
import numpy as np

# 创建带缺失值的 Series
s = pd.Series([1, 2, np.nan, 4, 5, np.nan, 7])
print("原始 Series:", s)

# 缺失值处理
print("填充缺失值:", s.fillna(0))
print("前向填充:", s.ffill())
print("后向填充:", s.bfill())
print("删除缺失值:", s.dropna())

# 字符串方法
s_str = pd.Series(['hello', 'WORLD', 'pandas', 'DATA'])
print("转大写:", s_str.str.upper())
print("转小写:", s_str.str.lower())
print("首字母大写:", s_str.str.capitalize())
print("标题格式:", s_str.str.title())
print("长度:", s_str.str.len())
print("包含:", s_str.str.contains('a'))
print("替换:", s_str.str.replace('a', '@'))

# 分组和聚合
s_group = pd.Series([10, 20, 30, 40, 50], index=['A', 'A', 'B', 'B', 'C'])
print("分组求和:", s_group.groupby(level=0).sum())
print("分组均值:", s_group.groupby(level=0).mean())

# 排序
s_unsorted = pd.Series([3, 1, 4, 1, 5, 9, 2])
print("排序:", s_unsorted.sort_values())
print("按索引排序:", s_unsorted.sort_index())

# 排名
s_rank = pd.Series([3, 1, 4, 1, 5])
print("排名:", s_rank.rank())

# 移动窗口
s_window = pd.Series([1, 2, 3, 4, 5, 6, 7, 8, 9])
print("移动平均:", s_window.rolling(window=3).mean())
print("移动求和:", s_window.rolling(window=3).sum())

# 差分
print("一阶差分:", s_window.diff())
print("百分比变化:", s_window.pct_change())

# 累计计算
print("累计求和:", s_window.cumsum())
print("累计最大值:", s_window.cummax())
print("累计最小值:", s_window.cummin())
```

## DataFrame 数据结构

### DataFrame 的创建

DataFrame 是 pandas 中最重要的二维表格数据结构，它由行索引（index）、列名（columns）和数据值（values）三部分组成。DataFrame 非常类似于电子表格或 SQL 表，是进行数据分析工作的核心数据结构。创建 DataFrame 的方式多种多样，可以从字典、列表、NumPy 数组、外部文件等多种数据源创建，每种方式都有其特定的应用场景和适用条件。

```python
import pandas as pd
import numpy as np

# 从字典创建 DataFrame
data = {
    '姓名': ['张三', '李四', '王五'],
    '年龄': [25, 30, 35],
    '城市': ['北京', '上海', '深圳'],
    '分数': [85.5, 90.0, 78.5]
}
df = pd.DataFrame(data)
print("从字典创建:\n", df)

# 从列表创建
data_list = [
    ['张三', 25, '北京', 85.5],
    ['李四', 30, '上海', 90.0],
    ['王五', 35, '深圳', 78.5]
]
df2 = pd.DataFrame(data_list, columns=['姓名', '年龄', '城市', '分数'])
print("从列表创建:\n", df2)

# 从 NumPy 数组创建
arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
df3 = pd.DataFrame(arr, index=['a', 'b', 'c'], columns=['A', 'B', 'C'])
print("从数组创建:\n", df3)

# 创建特定数据类型的 DataFrame
df4 = pd.DataFrame({
    'A': pd.Series([1, 2, 3], dtype='int32'),
    'B': pd.Series([1.5, 2.5, 3.5], dtype='float32'),
    'C': pd.Series(['a', 'b', 'c'], dtype='category')
})
print("指定类型:\n", df4.dtypes)

# 创建空 DataFrame
df_empty = pd.DataFrame()
print("空 DataFrame:", df_empty)

# 从字典列表创建
data_dict_list = [
    {'姓名': '张三', '年龄': 25},
    {'姓名': '李四', '年龄': 30, '城市': '上海'},
    {'姓名': '王五', '年龄': 35, '城市': '深圳', '分数': 80}
]
df5 = pd.DataFrame(data_dict_list)
print("字典列表:\n", df5)

# 创建时间序列 DataFrame
dates = pd.date_range('2024-01-01', periods=5, freq='D')
df6 = pd.DataFrame({
    '日期': dates,
    '销售额': [100, 120, 110, 130, 140],
    '成本': [80, 90, 85, 95, 100]
})
print("时间序列:\n", df6)

# 创建 MultiIndex DataFrame
arrays = [
    ['A', 'A', 'B', 'B', 'C'],
    [1, 2, 1, 2, 1]
]
df7 = pd.DataFrame(
    np.random.randn(5, 3),
    index=arrays,
    columns=['X', 'Y', 'Z']
)
print("MultiIndex:\n", df7)

# 从外部文件读取（预览）
# df = pd.read_csv('data.csv')
# df = pd.read_excel('data.xlsx')
# df = pd.read_json('data.json')
# df = pd.read_sql('SELECT * FROM table', connection)
```

### DataFrame 的基本操作

DataFrame 的基本操作涵盖了数据的查看、选择、修改和统计分析等方面。熟练掌握这些基本操作是进行任何数据分析工作的基础。DataFrame 提供了多种方式来查看数据结构，包括头部、尾部、形状、列信息等。选择数据可以通过列名、行索引、布尔条件等多种方式实现。DataFrame 的操作方法与 Series 类似，但由于是二维结构，操作更加丰富和灵活。

```python
import pandas as pd
import numpy as np

# 创建示例 DataFrame
df = pd.DataFrame({
    'A': [1, 2, 3, 4, 5],
    'B': [10, 20, 30, 40, 50],
    'C': ['a', 'b', 'c', 'd', 'e'],
    'D': [1.1, 2.2, 3.3, 4.4, 5.5]
})

# 查看数据基本信息
print("形状:", df.shape)
print("列名:", df.columns.tolist())
print("索引:", df.index.tolist())
print("数据类型:\n", df.dtypes)
print("前几行:\n", df.head())
print("后几行:\n", df.tail())
print("描述统计:\n", df.describe())
print("信息:\n", df.info())

# 选择列
print("选择单列:", df['A'])
print("选择多列:", df[['A', 'B']])
print("属性方式:", df.A)

# 选择行
print("按索引切片:", df[1:3])
print("条件筛选:", df[df['A'] > 2])
print("布尔索引:", df[df['C'].isin(['a', 'b', 'c'])])
print("字符串匹配:", df[df['C'].str.contains('a')])

# 使用 .loc 和 .iloc
print("loc 选择:", df.loc[0])
print("loc 切片:", df.loc[1:3])
print("iloc 选择:", df.iloc[0])
print("iloc 切片:", df.iloc[1:3])
print("混合选择:", df.loc[0, 'A'])
print("条件 loc:", df.loc[df['A'] > 2, ['A', 'B']])

# 修改数据
df.loc[0, 'A'] = 100
df['E'] = [1, 2, 3, 4, 5]
df['F'] = df['A'] + df['B']
print("修改后:\n", df)

# 删除列和行
df2 = df.drop(columns=['E', 'F'])
df3 = df.drop(index=[0, 1])
print("删除后:\n", df3)

# 重命名
df4 = df.rename(columns={'A': 'AA', 'B': 'BB'})
df5 = df.rename(index={0: '第一行'})
print("重命名后:\n", df5)

# 设置索引
df6 = df.set_index('A')
df7 = df6.reset_index()
print("设置索引:\n", df6)

# 排序
df8 = df.sort_values(by='B', ascending=False)
df9 = df.sort_index(ascending=False)
df10 = df.sort_values(by=['A', 'B'], ascending=[True, False])
print("排序:\n", df8)

# 排名
df11 = df.copy()
df11['Rank'] = df11['B'].rank()
print("排名:\n", df11)

# 统计方法
print("求和:", df[['A', 'B']].sum())
print("均值:", df[['A', 'B']].mean())
print("计数:", df.count())
print("最大值:", df[['A', 'B']].max())
print("最小值:", df[['A', 'B']].min())
print("累计求和:", df['B'].cumsum())
```

### DataFrame 的高级操作

DataFrame 的高级操作包括数据清洗、转换、合并、分组聚合等。这些操作是数据分析和数据预处理的核心功能，能够处理各种复杂的数据处理需求。掌握这些高级操作对于进行实际的数据分析工作至关重要。pandas 提供了丰富的方法和函数来支持这些高级操作，并且这些操作通常都经过优化，能够高效处理大规模数据。

```python
import pandas as pd
import numpy as np

# 创建示例 DataFrame
df = pd.DataFrame({
    'A': [1, 2, np.nan, 4, 5, np.nan, 7],
    'B': [10, np.nan, 30, 40, np.nan, 60, 70],
    'C': ['a', 'b', np.nan, 'd', 'e', 'f', 'g'],
    'D': [1.1, 2.2, np.nan, 4.4, 5.5, np.nan, 7.7]
})

print("原始数据:\n", df)

# 缺失值处理
print("删除含缺失值的行:", df.dropna())
print("删除含缺失值的列:", df.dropna(axis=1))
print("填充缺失值:", df.fillna(0))
print("前向填充:", df.ffill())
print("后向填充:", df.bfill())
print("均值填充:", df.fillna(df.mean()))
print("插值填充:", df.interpolate())

# 数据类型转换
df2 = df.copy()
df2['A'] = df2['A'].astype('int32')
df2['C'] = df2['C'].astype('string')
print("类型转换:\n", df2.dtypes)

# 字符串操作
df3 = pd.DataFrame({'Name': ['Alice', 'Bob', 'Charlie', 'David']})
df3['Upper'] = df3['Name'].str.upper()
df3['Length'] = df3['Name'].str.len()
df3['Contains_E'] = df3['Name'].str.contains('e')
df3['Replace'] = df3['Name'].str.replace('e', '@')
df3['Split'] = df3['Name'].str.split('i')
print("字符串操作:\n", df3)

# 数值操作
df4 = pd.DataFrame({'X': [1, 2, 3, 4, 5]})
df4['X2'] = df4['X'] ** 2
df4['X_sqrt'] = np.sqrt(df4['X'])
df4['X_log'] = np.log(df4['X'])
df4['X_round'] = df4['X'].round()
df4['X_clip'] = df4['X'].clip(lower=2, upper=4)
df4['X_abs'] = pd.Series([-1, -2, 3, 4, -5]).abs()
print("数值操作:\n", df4)

# 分类数据
df5 = pd.DataFrame({'Category': ['A', 'B', 'A', 'C', 'B', 'A']})
cat_dtype = pd.CategoricalDtype(categories=['A', 'B', 'C'], ordered=True)
df5['Category_Cat'] = df5['Category'].astype(cat_dtype)
print("分类数据:\n", df5['Category_Cat'].cat.categories)

# 日期时间操作
df6 = pd.DataFrame({
    'Date': pd.date_range('2024-01-01', periods=5, freq='D')
})
df6['Year'] = df6['Date'].dt.year
df6['Month'] = df6['Date'].dt.month
df6['Day'] = df6['Date'].dt.day
df6['Weekday'] = df6['Date'].dt.dayofweek
df6['Quarter'] = df6['Date'].dt.quarter
df6['DayOfYear'] = df6['Date'].dt.dayofyear
print("日期时间操作:\n", df6)

# 数据透视
df_pivot = pd.DataFrame({
    'Date': pd.date_range('2024-01-01', periods=6, freq='D').repeat(2),
    'Product': ['A', 'B'] * 6,
    'Sales': [100, 200, 150, 250, 180, 220, 120, 190, 160, 210, 140, 230]
})
pivot = df_pivot.pivot_table(index='Date', columns='Product', values='Sales', aggfunc='sum')
print("数据透视:\n", pivot)

# 交叉表
df_crosstab = pd.DataFrame({
    'Gender': ['M', 'F', 'M', 'F', 'M', 'F'],
    'Age': ['Young', 'Young', 'Adult', 'Adult', 'Senior', 'Senior'],
    'Count': [10, 15, 20, 25, 5, 8]
})
crosstab = pd.crosstab(df_crosstab['Gender'], df_crosstab['Age'])
print("交叉表:\n", crosstab)

# 数据重塑
df_melt = pd.DataFrame({
    'ID': [1, 2, 3],
    'Math': [80, 90, 70],
    'English': [85, 95, 75],
    'Science': [88, 92, 78]
})
melted = df_melt.melt(id_vars=['ID'], var_name='Subject', value_name='Score')
print("宽转长:\n", melted)
unpivoted = melted.pivot(index='ID', columns='Subject', values='Score').reset_index()
print("长转宽:\n", unpivoted)
```

## 数据选择与索引

### 标签索引与位置索引

pandas 提供了两种主要的索引方式：标签索引（使用 .loc）和位置索引（使用 .iloc）。这两种索引方式有着明确的区别：.loc 基于标签进行选择，而 .iloc 基于整数位置进行选择。理解这两种索引方式的区别对于正确高效地访问 DataFrame 中的数据至关重要。在实际使用中，混用这两种方式可能会导致错误，因此建议明确区分并坚持使用一致的索引方式。

```python
import pandas as pd
import numpy as np

# 创建示例 DataFrame
df = pd.DataFrame(
    np.random.randn(10, 5),
    index=list('ABCDEFGHIJ'),
    columns=['A', 'B', 'C', 'D', 'E']
)

# .loc 标签索引
print("选择单行:", df.loc['A'])
print("选择多行:", df.loc[['A', 'C', 'E']])
print("行切片:", df.loc['A':'D'])
print("选择单元素:", df.loc['A', 'A'])
print("选择子矩阵:", df.loc[['A', 'B'], ['A', 'B']])
print("条件选择:", df.loc[df['A'] > 0])

# .iloc 位置索引
print("选择单行:", df.iloc[0])
print("选择多行:", df.iloc[[0, 2, 4]])
print("行切片:", df.iloc[0:5])
print("选择单元素:", df.iloc[0, 0])
print("选择子矩阵:", df.iloc[[0, 1], [0, 1]])
print("负索引:", df.iloc[-1])
print("负索引切片:", df.iloc[-5:])

# 混合使用
print("混合索引:", df.loc['A', df.columns[0:2]])
print("复杂条件:", df.loc[df['A'] > df['B'], ['A', 'B']])

# 布尔索引的高级用法
print("多条件:", df[(df['A'] > 0) & (df['B'] < 0)])
print("或条件:", df[(df['A'] > 0) | (df['B'] < 0)])
print("非条件:", df[~(df['A'] > 0)])
print("isin 条件:", df[df['A'].isin([0.5, 1.0, 1.5])])
print("between 条件:", df[df['A'].between(-0.5, 0.5)])

# query 方法
df_query = pd.DataFrame({
    'A': range(10),
    'B': range(10, 20),
    'C': ['X', 'Y'] * 5
})
print("query 查询:", df_query.query('A > B'))
print("query 多条件:", df_query.query('(A > 3) & (B < 15) | (C == "X")'))
```

### 多级索引

MultiIndex 是 pandas 中实现层次化索引的重要机制，它允许在单个轴上拥有多个索引级别。这种数据结构特别适合表示高维数据，如面板数据、多维时间序列等。使用 MultiIndex 可以使得数据的组织和访问更加灵活和直观，是 pandas 中较为高级但非常实用的功能。

```python
import pandas as pd
import numpy as np

# 创建 MultiIndex
arrays = [
    ['A', 'A', 'A', 'B', 'B', 'B'],
    [1, 2, 3, 1, 2, 3]
]
index = pd.MultiIndex.from_arrays(arrays, names=['Group', 'Number'])
df = pd.DataFrame(np.random.randn(6, 3), index=index, columns=['X', 'Y', 'Z'])
print("MultiIndex DataFrame:\n", df)

# 选择外层索引
print("选择 Group A:\n", df.loc['A'])
print("选择 Number 2:\n", df.xs(2, level='Number'))

# 选择内层索引
print("选择 A-1:\n", df.loc[('A', 1)])
print("切片 A-1 到 B-2:\n", df.loc[('A', 1):('B', 2)])

# 使用 xs 方法跨级别选择
print("xs 方法:\n", df.xs(('A', 2), drop_level=False))

# 设置 MultiIndex
df2 = pd.DataFrame({
    'Group': ['A', 'A', 'A', 'B', 'B', 'B'],
    'Sub': [1, 2, 3, 1, 2, 3],
    'Value': [10, 20, 30, 40, 50, 60]
})
df2 = df2.set_index(['Group', 'Sub'])
print("设置索引后:\n", df2)

# 堆叠和取消堆叠
df_stack = df.unstack()
print("取消堆叠:\n", df_stack)
df_unstack = df_stack.stack()
print("堆叠:\n", df_unstack)

# 多级索引的排序
df3 = df.sort_index(level='Group')
print("按级别排序:\n", df3)

# 多级索引的分组
df4 = pd.DataFrame({
    'A': [1, 2, 3, 4, 5, 6],
    'B': ['X', 'Y', 'X', 'Y', 'X', 'Y']
}, index=pd.MultiIndex.from_tuples(
    [('A', 'a'), ('A', 'b'), ('A', 'c'), ('B', 'a'), ('B', 'b'), ('B', 'c')],
    names=['Letter', 'Number']
))
print("分组求和:", df4.groupby(level='Letter').sum())

# 访问所有级别
print("外层索引:", df.index.get_level_values(0))
print("内层索引:", df.index.get_level_values(1))

# 索引的笛卡尔积
idx1 = pd.Index(['A', 'B'])
idx2 = pd.Index([1, 2, 3])
product = pd.MultiIndex.from_product([idx1, idx2], names=['Letter', 'Number'])
print("笛卡尔积:\n", pd.DataFrame(index=product).reset_index())
```

## 数据清洗与预处理

### 处理缺失数据

缺失数据是实际数据分析中最常见的问题之一，pandas 提供了丰富的工具来处理各种类型的缺失数据。缺失值可能来源于数据收集过程中的遗漏、数据合并时的不匹配、数据类型转换等不同情况。正确处理缺失值对于保证分析结果的准确性至关重要，不同的处理方法适用于不同的数据特征和分析需求。

```python
import pandas as pd
import numpy as np

# 创建包含缺失值的 DataFrame
df = pd.DataFrame({
    'A': [1, 2, np.nan, 4, 5, np.nan, 7, 8, 9, np.nan],
    'B': [10, np.nan, 30, 40, np.nan, 60, 70, 80, np.nan, 100],
    'C': ['a', 'b', np.nan, 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
    'D': [1.1, 2.2, np.nan, 4.4, 5.5, np.nan, 7.7, 8.8, 9.9, 10.0]
})

# 检测缺失值
print("检测缺失值:\n", df.isnull())
print("检测非缺失值:\n", df.notnull())
print("每列缺失值数量:", df.isnull().sum())
print("总缺失值数量:", df.isnull().sum().sum())
print("缺失值百分比:\n", (df.isnull().sum() / len(df) * 100).round(2))

# 删除缺失值
df_drop_rows = df.dropna()
df_drop_cols = df.dropna(axis=1)
df_drop_subset = df.dropna(subset=['A', 'B'])
df_drop_thresh = df.dropna(thresh=8)  # 至少8个非缺失值
print("删除后:\n", df_drop_rows)

# 填充缺失值
df_fill_zero = df.fillna(0)
df_fill_mean = df.fillna(df.mean())
df_fill_median = df.fillna(df.median())
df_fill_ffill = df.ffill()
df_fill_bfill = df.bfill()

# 不同列使用不同填充值
fill_values = {'A': 0, 'B': 0, 'D': df['D'].mean()}
df_fill_custom = df.fillna(fill_values)

# 插值填充
df_interpolate = df.interpolate(method='linear')
df_interpolate_time = df.interpolate(method='time')
df_interpolate_nearest = df.interpolate(method='nearest')
df_interpolate_quadratic = df.interpolate(method='quadratic')

# 向前向后填充（带限制）
df_ffill_limit = df.ffill(limit=2)
df_bfill_limit = df.bfill(limit=2)

# 替换特定值
df_replace = df.replace(np.nan, -999)
df_replace_values = df.replace({np.nan: -999, 'a': 'A', 'b': 'B'})

# 复杂缺失值模式处理
df_complex = pd.DataFrame({
    'Group': ['A', 'A', 'A', 'B', 'B', 'B'],
    'Value': [1, np.nan, 3, 4, np.nan, 6]
})
# 按组填充均值
df_complex['Value'] = df_complex.groupby('Group')['Value'].transform(
    lambda x: x.fillna(x.mean())
)
print("按组填充:\n", df_complex)

# 插值后填充剩余
df_combined = df.interpolate().ffill().bfill()

# 检测重复数据
df_duplicated = df.duplicated()
print("重复行:", df_duplicated.sum())
df_dedup = df.drop_duplicates()

# 检测重复列
dup_cols = df.columns[df.columns.duplicated()].tolist()
```

### 数据类型转换

数据类型转换是数据预处理的重要环节，正确的类型设置能够提高数据处理的效率和准确性。pandas 支持多种数据类型，包括数值型、类别型、日期时间型、字符串型等。不同类型的数据适用于不同的分析场景，选择合适的数据类型是数据工程的重要决策。

```python
import pandas as pd
import numpy as np
from datetime import datetime

# 检测数据类型
df = pd.DataFrame({
    'Int': [1, 2, 3],
    'Float': [1.1, 2.2, 3.3],
    'String': ['a', 'b', 'c'],
    'Bool': [True, False, True],
    'Category': ['A', 'B', 'A']
})
print("数据类型:\n", df.dtypes)

# 数值类型转换
df['Float'] = df['Float'].astype('int64')
df['Int'] = df['Int'].astype('float64')

# 字符串转换
df['Int'] = df['Int'].astype('string')
df['String'] = df['String'].str.upper()

# 日期时间转换
df_date = pd.DataFrame({'Date': ['2024-01-01', '2024-01-02', '2024-01-03']})
df_date['Date'] = pd.to_datetime(df_date['Date'])
df_date['Date'] = pd.to_datetime(df_date['Date'], format='%Y-%m-%d')

# 从多个列创建日期
df_multi = pd.DataFrame({
    'Year': [2024, 2024, 2024],
    'Month': [1, 2, 3],
    'Day': [1, 2, 3]
})
df_multi['Date'] = pd.to_datetime(df_multi[['Year', 'Month', 'Day']])

# 类别类型
df['Category'] = df['Category'].astype('category')
df['Category'] = pd.Categorical(['A', 'B', 'A', 'C'], categories=['A', 'B', 'C', 'D'])

# 有序类别
df['Level'] = pd.Categorical(['High', 'Low', 'Medium'], 
                            categories=['Low', 'Medium', 'High'],
                            ordered=True)

# 布尔转换
df['Bool'] = df['Bool'].astype('int')
df['Int_Bool'] = (df['Float'] > 2.0)

# 使用 astype 的错误处理
df['Safe_Convert'] = pd.to_numeric(df['String'], errors='coerce')

# 使用 infer_objects 自动推断
df_auto = df.infer_objects()
print("推断类型:\n", df_auto.dtypes)

# 转换为 NumPy 数组
arr = df['Float'].values

# 转换为列表
lst = df['Float'].tolist()

# 转换为字典
dct = df['Int'].to_dict()

# 格式化输出
df['Formatted'] = df['Float'].apply(lambda x: f'{x:.2f}')
```

## 数据合并与连接

### concat 连接

concat 函数是 pandas 中用于沿轴连接多个 DataFrame 或 Series 的主要工具。它可以将多个数据源按照行方向或列方向进行拼接，是数据整合和汇总的常用操作。concat 的灵活性在于它可以处理不同形状的数据源，并提供了丰富的参数来控制连接的细节行为。

```python
import pandas as pd
import numpy as np

# 创建示例 DataFrame
df1 = pd.DataFrame({
    'A': ['A0', 'A1', 'A2', 'A3'],
    'B': ['B0', 'B1', 'B2', 'B3'],
    'C': ['C0', 'C1', 'C2', 'C3'],
    'D': ['D0', 'D1', 'D2', 'D3']
}, index=[0, 1, 2, 3])

df2 = pd.DataFrame({
    'A': ['A4', 'A5', 'A6', 'A7'],
    'B': ['B4', 'B5', 'B6', 'B7'],
    'C': ['C4', 'C5', 'C6', 'C7'],
    'D': ['D4', 'D5', 'D6', 'D7']
}, index=[4, 5, 6, 7])

df3 = pd.DataFrame({
    'E': ['E0', 'E1', 'E2', 'E3'],
    'F': ['F0', 'F1', 'F2', 'F3']
}, index=[0, 1, 2, 3])

# 行方向连接（axis=0）
result_row = pd.concat([df1, df2])
print("行方向连接:\n", result_row)

# 列方向连接（axis=1）
result_col = pd.concat([df1, df3], axis=1)
print("列方向连接:\n", result_col)

# 使用 join 参数
result_inner = pd.concat([df1, df3], join='inner')
result_outer = pd.concat([df1, df3], join='outer')
print("内连接:\n", result_inner)
print("外连接:\n", result_outer)

# ignore_index 重置索引
result_reset = pd.concat([df1, df2], ignore_index=True)
print("重置索引:\n", result_reset)

# 添加键名
result_keys = pd.concat([df1, df2], keys=['First', 'Second'])
print("带键名:\n", result_keys.loc['First'])

# 验证连接
try:
    result_verify = pd.concat([df1, df2], verify_integrity=True)
except ValueError as e:
    print("验证错误:", e)

# Series 连接
s1 = pd.Series(['X0', 'X1', 'X2', 'X3'])
s2 = pd.Series(['Y0', 'Y1', 'Y2', 'Y3'])
result_series = pd.concat([s1, s2], axis=1, ignore_index=True)
print("Series 连接:\n", result_series)

# 多个 DataFrame 连接
df4 = pd.DataFrame({'A': ['A8', 'A9'], 'B': ['B8', 'B9']})
result_multi = pd.concat([df1, df2, df4], ignore_index=True)
print("多 DataFrame 连接:\n", result_multi)
```

### merge 合并

merge 函数用于根据一个或多个键将两个 DataFrame 进行连接，类似于 SQL 中的 JOIN 操作。pandas 提供了四种合并类型：内连接（inner）、左连接（left）、右连接（right）和外连接（outer）。理解不同合并类型的区别对于正确整合来自不同数据源的数据至关重要。

```python
import pandas as pd

# 创建示例 DataFrame
left = pd.DataFrame({
    'key': ['K0', 'K1', 'K2', 'K3'],
    'A': ['A0', 'A1', 'A2', 'A3'],
    'B': ['B0', 'B1', 'B2', 'B3']
})

right = pd.DataFrame({
    'key': ['K0', 'K1', 'K2', 'K4'],
    'C': ['C0', 'C1', 'C2', 'C4'],
    'D': ['D0', 'D1', 'D2', 'D4']
})

# 内连接（inner）- 默认
result_inner = pd.merge(left, right, on='key', how='inner')
print("内连接:\n", result_inner)

# 左连接（left）
result_left = pd.merge(left, right, on='key', how='left')
print("左连接:\n", result_left)

# 右连接（right）
result_right = pd.merge(left, right, on='key', how='right')
print("右连接:\n", result_right)

# 外连接（outer）
result_outer = pd.merge(left, right, on='key', how='outer')
print("外连接:\n", result_outer)

# 不同列名合并
left2 = pd.DataFrame({
    'key_left': ['K0', 'K1', 'K2', 'K3'],
    'A': ['A0', 'A1', 'A2', 'A3']
})
right2 = pd.DataFrame({
    'key_right': ['K0', 'K1', 'K2', 'K4'],
    'C': ['C0', 'C1', 'C2', 'C4']
})
result_diff = pd.merge(left2, right2, left_on='key_left', right_on='key_right')

# 多列合并
left3 = pd.DataFrame({
    'key1': ['K0', 'K0', 'K1', 'K1'],
    'key2': ['X0', 'X1', 'X0', 'X1'],
    'A': ['A0', 'A1', 'A2', 'A3']
})
right3 = pd.DataFrame({
    'key1': ['K0', 'K0', 'K1', 'K1'],
    'key2': ['X0', 'X1', 'X0', 'X1'],
    'D': ['D0', 'D1', 'D2', 'D3']
})
result_multi = pd.merge(left3, right3, on=['key1', 'key2'])
print("多列合并:\n", result_multi)

# 指示列
result_indicator = pd.merge(left, right, on='key', how='outer', indicator=True)
print("指示列:\n", result_indicator)

# 处理后缀
left4 = pd.DataFrame({'A': [1, 2], 'B': ['a', 'b']})
right4 = pd.DataFrame({'A': [1, 2], 'B': ['c', 'd']})
result_suffix = pd.merge(left4, right4, on='A', suffixes=('_left', '_right'))
print("后缀处理:\n", result_suffix)

# 验证合并键
try:
    result_verify = pd.merge(left, right, on='key', validate='many_to_one')
except Exception as e:
    print("验证错误:", e)

# 使用 index 合并
left_index = left.set_index('key')
right_index = right.set_index('key')
result_index = pd.merge(left_index, right_index, left_index=True, right_index=True, how='outer')
print("索引合并:\n", result_index)
```

### join 连接

join 方法是 DataFrame 对象的方法，提供了一种更加便捷的方式来连接两个 DataFrame。它默认使用索引进行连接，但在 pandas 较新版本中也支持使用列进行连接。join 方法的语法更加简洁，特别适合快速合并操作。

```python
import pandas as pd

# 创建示例 DataFrame
left = pd.DataFrame({
    'A': ['A0', 'A1', 'A2', 'A3']},
    index=['K0', 'K1', 'K2', 'K3'])

right = pd.DataFrame({
    'B': ['B0', 'B1', 'B2', 'B4']},
    index=['K0', 'K1', 'K2', 'K4'])

# 索引连接
result_join = left.join(right, how='outer')
print("join 连接:\n", result_join)

# 不同连接方式
print("左连接:\n", left.join(right, how='left'))
print("右连接:\n", left.join(right, how='right'))
print("内连接:\n", left.join(right, how='inner'))

# 使用列（非索引）连接
left_col = pd.DataFrame({'key': ['K0', 'K1', 'K2', 'K3'], 'A': ['A0', 'A1', 'A2', 'A3']})
right_col = pd.DataFrame({'key': ['K0', 'K1', 'K2', 'K4'], 'B': ['B0', 'B1', 'B2', 'B4']})
result_col = left_col.set_index('key').join(right_col.set_index('key'), how='outer')
print("列连接:\n", result_col)

# 多列索引连接
left_multi = pd.DataFrame({
    'A': ['A0', 'A1', 'A2', 'A3'],
    'B': ['B0', 'B1', 'B2', 'B3']},
    index=pd.MultiIndex.from_tuples([('K0', 'X0'), ('K1', 'X1'), ('K2', 'X2'), ('K3', 'X3')],
                                   names=['key1', 'key2']))

right_multi = pd.DataFrame({
    'C': ['C0', 'C1', 'C2', 'C4'],
    'D': ['D0', 'D1', 'D2', 'D4']},
    index=pd.MultiIndex.from_tuples([('K0', 'X0'), ('K1', 'X1'), ('K2', 'X2'), ('K4', 'X4')],
                                   names=['key1', 'key2']))

result_multi = left_multi.join(right_multi, how='outer')
print("MultiIndex join:\n", result_multi)

# 多次 join
df1 = pd.DataFrame({'A': range(4)}, index=['K0', 'K1', 'K2', 'K3'])
df2 = pd.DataFrame({'B': range(4, 8)}, index=['K0', 'K1', 'K2', 'K3'])
df3 = pd.DataFrame({'C': range(8, 12)}, index=['K0', 'K1', 'K2', 'K4'])
result_multi = df1.join([df2, df3], how='outer')
print("多次 join:\n", result_multi)
```

## 分组聚合

### groupby 操作

groupby 是 pandas 中实现分组操作的核心功能，它允许按照一个或多个键对数据进行分组，然后对每个分组进行聚合计算。groupby 的工作原理包括三个步骤：分割（split）、应用（apply）和合并（combine）。理解这三个步骤对于正确使用 groupby 和理解其行为非常重要。groupby 支持非常灵活的分组方式，包括单列分组、多列分组、函数分组、索引级别分组等。

```python
import pandas as pd
import numpy as np

# 创建示例 DataFrame
df = pd.DataFrame({
    'Company': ['A', 'A', 'B', 'B', 'B', 'C', 'C', 'C', 'C'],
    'Department': ['Sales', 'Tech', 'Sales', 'Tech', 'HR', 'Sales', 'Tech', 'HR', 'Finance'],
    'Salary': [50000, 60000, 55000, 70000, 45000, 52000, 68000, 47000, 75000],
    'Age': [25, 30, 35, 40, 28, 32, 38, 29, 45],
    'Bonus': [5000, 6000, 5500, 7000, 4500, 5200, 6800, 4700, 7500]
})

# 单列分组
grouped_single = df.groupby('Company')
print("分组对象:", grouped_single)

# 遍历分组
for name, group in df.groupby('Company'):
    print(f"Company: {name}")
    print(group)
    print()

# 多列分组
grouped_multi = df.groupby(['Company', 'Department'])
for name, group in df.groupby(['Company', 'Department']):
    print(f"Group: {name}")
    print(group)
    print()

# 按索引分组
df_index = df.set_index('Company')
grouped_index = df_index.groupby(level='Company')

# 使用函数分组
grouped_func = df.groupby(len)
grouped_custom = df.groupby(lambda x: 'Young' if df.loc[x, 'Age'] < 35 else 'Senior')

# 聚合操作
print("求和:", df.groupby('Company').sum())
print("均值:", df.groupby('Company').mean())
print("计数:", df.groupby('Company').count())
print("最大值:", df.groupby('Company').max())
print("最小值:", df.groupby('Company').min())
print("中位数:", df.groupby('Company').median())
print("标准差:", df.groupby('Company').std())
print("方差:", df.groupby('Company').var())
print("描述统计:", df.groupby('Company').describe())

# 指定聚合列
print("特定列聚合:", df.groupby('Company')['Salary'].sum())
print("多列聚合:", df.groupby('Company')['Salary', 'Bonus'].sum())

# 多个聚合函数
print("多个函数:", df.groupby('Company')['Salary'].agg(['sum', 'mean', 'max', 'min']))
print("命名聚合:", df.groupby('Company')['Salary'].agg(total='sum', average='mean'))

# 自定义聚合函数
def range_func(x):
    return x.max() - x.min()
print("自定义聚合:", df.groupby('Company')['Salary'].agg(range_func))

# 变换操作
df['Salary_normalized'] = df.groupby('Company')['Salary'].transform(
    lambda x: (x - x.mean()) / x.std()
)

# 过滤操作
def filter_func(x):
    return x['Salary'].mean() > 55000
filtered = df.groupby('Company').filter(filter_func)
print("过滤结果:\n", filtered)

# 应用操作
def apply_func(group):
    return pd.Series({
        'total_salary': group['Salary'].sum(),
        'avg_age': group['Age'].mean(),
        'count': len(group)
    })
applied = df.groupby('Company').apply(apply_func)
print("应用结果:\n", applied)
```

### 透视表与交叉表

透视表（pivot_table）和交叉表（crosstab）是数据分析中常用的汇总工具，它们能够快速对数据进行多维度汇总和统计。透视表类似于 Excel 中的数据透视表，可以按照指定的行和列对数据进行分组汇总。交叉表则专门用于计算两个或多个分类变量之间的频数或频率分布。

```python
import pandas as pd
import numpy as np

# 创建示例 DataFrame
df = pd.DataFrame({
    'Company': ['A', 'A', 'B', 'B', 'B', 'C', 'C', 'C', 'C'],
    'Department': ['Sales', 'Tech', 'Sales', 'Tech', 'HR', 'Sales', 'Tech', 'HR', 'Finance'],
    'Gender': ['M', 'F', 'M', 'F', 'M', 'F', 'M', 'F', 'M'],
    'Salary': [50000, 60000, 55000, 70000, 45000, 52000, 68000, 47000, 75000],
    'Bonus': [5000, 6000, 5500, 7000, 4500, 5200, 6800, 4700, 7500]
})

# 简单透视表
pivot_simple = pd.pivot_table(df, values='Salary', index='Company', columns='Department')
print("简单透视表:\n", pivot_simple)

# 多值透视表
pivot_multi = pd.pivot_table(df, values=['Salary', 'Bonus'], index='Company', columns='Department')
print("多值透视表:\n", pivot_multi)

# 聚合函数
pivot_agg = pd.pivot_table(df, values='Salary', index='Company', 
                            columns='Department', aggfunc='mean')
pivot_count = pd.pivot_table(df, values='Salary', index='Company',
                              columns='Department', aggfunc='count')
pivot_custom = pd.pivot_table(df, values='Salary', index='Company',
                               columns='Department', aggfunc=[np.sum, np.mean, np.max])

# 多级行索引
pivot_multi_index = pd.pivot_table(df, values='Salary',
                                    index=['Company', 'Department'],
                                    columns='Gender')

# margins 汇总
pivot_margins = pd.pivot_table(df, values='Salary', index='Company',
                                columns='Department', margins=True, aggfunc='sum')

# 处理空值
pivot_fillna = pd.pivot_table(df, values='Salary', index='Company',
                               columns='Department', fill_value=0)

# 交叉表
crosstab_simple = pd.crosstab(df['Company'], df['Department'])
print("简单交叉表:\n", crosstab_simple)

# 带百分比
crosstab_pct = pd.crosstab(df['Company'], df['Department'], normalize='index')
crosstab_pct_col = pd.crosstab(df['Company'], df['Department'], normalize='columns')
crosstab_pct_all = pd.crosstab(df['Company'], df['Department'], normalize='all')

# 多列交叉表
crosstab_multi = pd.crosstab([df['Company'], df['Gender']], df['Department'])

# margins 和小计
crosstab_margins = pd.crosstab(df['Company'], df['Department'], margins=True)

# 自定义聚合
crosstab_custom = pd.crosstab(df['Company'], df['Department'],
                              values=df['Salary'], aggfunc=np.mean)

# melt 逆透视
df_melted = pd.DataFrame({
    'Company': ['A', 'B', 'C'],
    'Sales': [50000, 55000, 52000],
    'Tech': [60000, 70000, 68000]
})
melted = df_melted.melt(id_vars='Company', var_name='Department', value_name='Salary')
print("逆透视:\n", melted)
```

## 时间序列分析

### 创建时间序列

pandas 提供了强大的时间序列处理功能，能够高效地处理日期时间数据。时间序列数据在金融、经济、气象等领域有着广泛的应用。pandas 的时间序列功能包括创建日期范围，重采样、时区处理、移动窗口计算等，这些功能使得复杂的时间序列分析变得相对简单。

```python
import pandas as pd
import numpy as np

# 创建日期范围
dates = pd.date_range('2024-01-01', periods=10, freq='D')
print("日期范围:\n", dates)

# 不同频率
dates_min = pd.date_range('2024-01-01', periods=10, freq='T')  # 分钟
dates_hour = pd.date_range('2024-01-01', periods=10, freq='H')  # 小时
dates_week = pd.date_range('2024-01-01', periods=10, freq='W')  # 周
dates_month = pd.date_range('2024-01-01', periods=10, freq='ME')  # 月末
dates_quarter = pd.date_range('2024-01-01', periods=10, freq='QE')  # 季末
dates_year = pd.date_range('2024-01-01', periods=10, freq='YE')  # 年末

# 工作日频率
dates_bday = pd.bdate_range('2024-01-01', periods=10)
print("工作日:\n", dates_bday)

# 时间序列 DataFrame
ts_df = pd.DataFrame({
    'Date': pd.date_range('2024-01-01', periods=100, freq='D'),
    'Value': np.random.randn(100).cumsum(),
    'Sales': np.random.randint(100, 1000, 100)
}).set_index('Date')
print("时间序列 DataFrame:\n", ts_df.head())

# 从字符串创建时间序列
df = pd.DataFrame({
    'Date': ['2024-01-01', '2024-01-02', '2024-01-03'],
    'Value': [100, 110, 105]
})
df['Date'] = pd.to_datetime(df['Date'])
df = df.set_index('Date')
print("转换后:\n", df)

# 指定时区
ts_utc = pd.date_range('2024-01-01', periods=10, tz='UTC')
ts_tz = pd.date_range('2024-01-01', periods=10, tz='Asia/Shanghai')

# 带时区的时间序列
df_tz = pd.DataFrame({
    'Value': np.random.randn(10)
}, index=pd.date_range('2024-01-01', periods=10, tz='UTC'))
df_tz = df_tz.tz_convert('Asia/Shanghai')

# 期间范围（Period）
periods = pd.period_range('2024-01', periods=12, freq='M')
print("期间范围:\n", periods)

# Timedelta
td = pd.timedelta_range('1 day', periods=5, freq='D')
print("时间增量:\n", td)

# 字符串转时间
df_str = pd.DataFrame({
    'Date': ['2024-01-01 10:30:00', '2024-01-02 11:45:00']
})
df_str['Date'] = pd.to_datetime(df_str['Date'], format='%Y-%m-%d %H:%M:%S')
```

### 时间序列操作

pandas 提供了丰富的时间序列操作功能，包括重采样、移动窗口、时间偏移、时区转换等。这些操作是时间序列分析的核心功能，能够满足各种复杂的时间序列处理需求。掌握这些操作对于进行有效的时间序列分析至关重要。

```python
import pandas as pd
import numpy as np

# 创建示例时间序列
ts = pd.Series(
    np.random.randn(100),
    index=pd.date_range('2024-01-01', periods=100, freq='D')
)

# 重采样
ts_daily = ts.resample('D').mean()  # 日均值
ts_weekly = ts.resample('W').sum()  # 周总和
ts_monthly = ts.resample('ME').mean()  # 月均值
ts_quarterly = ts.resample('QE').last()  # 季末值

# 降采样聚合
ts_resample = ts.resample('W').agg({
    'open': 'first',
    'high': 'max',
    'low': 'min',
    'close': 'last',
    'volume': 'sum'
})

# 升采样（需要插值）
ts_hourly = ts.resample('H').asfreq()
ts_interpolate = ts.resample('H').interpolate(method='time')

# 移动窗口
ts_rolling = ts.rolling(window=7).mean()
ts_rolling_sum = ts.rolling(window=7).sum()
ts_rolling_std = ts.rolling(window=7).std()
ts_rolling_min = ts.rolling(window=7).min()
ts_rolling_max = ts.rolling(window=7).max()

# 扩展窗口
ts_expanding = ts.expanding().mean()

# 指数加权移动平均
ts_ewm = ts.ewm(span=7).mean()
ts_ewm_alpha = ts.ewm(alpha=0.3).mean()

# 时间偏移
ts_shift = ts.shift(1)  # 向前移动
ts_shift_neg = ts.shift(-1)  # 向后移动
ts_diff = ts.diff()  # 差分
ts_pct_change = ts.pct_change()  # 百分比变化

# 时间偏移（日期偏移）
ts_offset = ts + pd.DateOffset(days=5)
ts_offset_hours = ts + pd.Timedelta(hours=6)
ts_offset_bday = ts + pd.offsets.BDay(1)

# 日期时间属性
ts_year = ts.dt.year
ts_month = ts.dt.month
ts_day = ts.dt.day
ts_weekday = ts.dt.weekday  # 星期几（0-6）
ts_quarter = ts.dt.quarter
ts_dayofyear = ts.dt.dayofyear
ts_is_leap = ts.dt.is_leap_year
ts_is_month_end = ts.dt.is_month_end
ts_is_month_start = ts.dt.is_month_start
ts_days_in_month = ts.dt.days_in_month

# 工作日相关
ts_bday = ts[ts.index.weekday < 5]  # 工作日
ts_weekend = ts[ts.index.weekday >= 5]  # 周末

# 时区转换
ts_utc = pd.date_range('2024-01-01', periods=10, tz='UTC')
ts_shanghai = ts_utc.tz_convert('Asia/Shanghai')
ts_localize = pd.date_range('2024-03-10', periods=10, freq='D').tz_localize('UTC', ambiguous='infer')

# 时间区间操作
ts_period = ts.to_period('M')
ts_to_timestamp = ts_period.to_timestamp()

# asfreq 转换频率
ts_asfreq = ts.asfreq('W')

# at_time 和 between_time
ts_at_time = ts.at_time('12:00')
ts_between = ts.between_time('09:00', '15:00')

# 切片和索引
ts_2024 = ts['2024']  # 年
ts_202401 = ts['2024-01']  # 月
ts_range = ts['2024-01-01':'2024-01-15']  # 范围

# 重新索引
ts_reindexed = ts.reindex(pd.date_range('2024-01-01', periods=150, freq='D'))

# 时间区间重采样
period_ts = pd.Series(
    np.random.randn(10),
    index=pd.period_range('2024-01', periods=10, freq='M')
)
period_asfreq = period_ts.asfreq('D')
period_to_ts = period_ts.to_timestamp()
```

## 文件 I/O 操作

### 读取和写入文件

pandas 提供了丰富的函数来读取和写入各种格式的文件，包括 CSV、Excel、JSON、SQL、HTML 等。正确高效地读取和保存数据是数据分析工作流程的重要环节。不同的文件格式适用于不同的场景，选择合适的格式可以提高数据处理的效率和可靠性。

```python
import pandas as pd
import numpy as np

# CSV 文件
df_csv = pd.read_csv('data.csv')
df_csv = pd.read_csv('data.csv', sep=',', encoding='utf-8')
df_csv = pd.read_csv('data.csv', header=None, names=['A', 'B', 'C'])
df_csv = pd.read_csv('data.csv', skiprows=2)
df_csv = pd.read_csv('data.csv', nrows=100)
df_csv = pd.read_csv('data.csv', usecols=['A', 'B', 'C'])
df_csv = pd.read_csv('data.csv', dtype={'A': str, 'B': float})
df_csv = pd.read_csv('data.csv', parse_dates=['Date'])
df_csv = pd.read_csv('data.csv', index_col='ID')
df_csv = pd.read_csv('data.csv', thousands=',')

# 写入 CSV
df.to_csv('output.csv', index=False)
df.to_csv('output.csv', sep=';', encoding='utf-8-sig')
df.to_csv('output.csv', header=True, index=False)

# Excel 文件
df_excel = pd.read_excel('data.xlsx')
df_excel = pd.read_excel('data.xlsx', sheet_name='Sheet1')
df_excel = pd.read_excel('data.xlsx', sheet_name=None)  # 读取所有工作表
df_excel = pd.read_excel('data.xlsx', usecols='A:C')
df_excel = pd.read_excel('data.xlsx', skiprows=1)

# 写入 Excel
df.to_excel('output.xlsx', sheet_name='Data', index=False)
df.to_excel('output.xlsx', sheet_name='Data', startrow=2, startcol=2)
with pd.ExcelWriter('output.xlsx') as writer:
    df1.to_excel(writer, sheet_name='Sheet1')
    df2.to_excel(writer, sheet_name='Sheet2')

# JSON 文件
df_json = pd.read_json('data.json', orient='records')
df_json = pd.read_json('data.json', orient='split')
df_json = pd.read_json('data.json', orient='index')

# 写入 JSON
df.to_json('output.json', orient='records')
df.to_json('output.json', orient='split')
df.to_json('output.json', date_format='iso')
df.to_json('output.json', force_ascii=False)

# HTML 表格
df_html = pd.read_html('data.html')
df_html = pd.read_html('data.html', attrs={'id': 'table1'})

# 写入 HTML
df.to_html('output.html', index=False)
df.to_html('output.html', classes='table table-striped')

# SQL 数据库
import sqlalchemy
engine = sqlalchemy.create_engine('sqlite:///database.db')
df_sql = pd.read_sql('SELECT * FROM table', engine)
df_sql = pd.read_sql_query('SELECT * FROM table', engine)

# 写入 SQL
df.to_sql('table_name', engine, if_exists='replace', index=False)
df.to_sql('table_name', engine, if_exists='append', index=False)

# 读取多个文件
import glob
files = glob.glob('data*.csv')
df_list = [pd.read_csv(f) for f in files]
df_combined = pd.concat(df_list, ignore_index=True)

# 读取大型文件（分块）
chunk_iter = pd.read_csv('large_file.csv', chunksize=10000)
df_chunks = []
for chunk in chunk_iter:
    df_chunks.append(chunk)
df_large = pd.concat(df_chunks)

# 剪贴板
df_clipboard = pd.read_clipboard()
df.to_clipboard(index=False)

# 其他格式
df_pickle = pd.read_pickle('data.pkl')
df_pickle.to_pickle('output.pkl')

df_feather = pd.read_feather('data.feather')
df_feather.to_feather('output.feather')

df_parquet = pd.read_parquet('data.parquet')
df_parquet.to_parquet('output.parquet')

df_hdf = pd.read_hdf('data.h5', key='data')
df_hdf.to_hdf('output.h5', key='data')

# 远程文件
df_remote = pd.read_csv('https://example.com/data.csv')
```

## 高级功能与性能优化

### 分类数据

分类数据是一种特殊的数据类型，它将字符串值映射为整数表示。使用分类数据可以显著减少内存占用并提高某些操作的性能。pandas 的 Categorical 数据类型特别适合处理具有有限可能取值的列，如性别、状态、类别等。

```python
import pandas as pd
import numpy as np

# 创建分类数据
s_cat = pd.Series(['A', 'B', 'A', 'C', 'B'], dtype='category')
print("分类 Series:", s_cat)

# 指定类别
cat = pd.Categorical(['A', 'B', 'A', 'C', 'B'], 
                      categories=['A', 'B', 'C', 'D'])
s_custom = pd.Series(cat)

# 有序分类
s_ordered = pd.Series(['Low', 'High', 'Medium'], 
                       dtype=pd.CategoricalDtype(
                           categories=['Low', 'Medium', 'High'],
                           ordered=True
                       ))

# 分类属性
print("类别:", s_cat.cat.categories)
print("类别数量:", s_cat.nunique())
print("类别编码:", s_cat.cat.codes)

# 重命名类别
s_rename = s_cat.cat.rename_categories(['X', 'Y', 'Z'])
print("重命名:", s_rename)

# 添加类别
s_add = s_cat.cat.add_categories(['D'])
print("添加类别:", s_add)

# 删除类别
s_remove = s_cat.cat.remove_categories(['C'])
print("删除类别:", s_remove)

# 设置类别
s_set = s_cat.cat.set_categories(['A', 'B', 'C', 'D'])
print("设置类别:", s_set)

# 排序有序分类
s_ordered_sort = s_ordered.sort_values()
print("排序:", s_ordered_sort)

# 比较有序分类
print("大于:", s_ordered > 'Low')
print("小于等于:", s_ordered <= 'Medium')

# 虚拟变量
s_dummy = pd.get_dummies(s_cat, prefix='Cat')
print("虚拟变量:\n", s_dummy)

# 内存比较
s_str = pd.Series(['A', 'B', 'A', 'C', 'B'] * 10000)
s_cat_mem = s_str.astype('category')
print("字符串内存:", s_str.memory_usage(deep=True))
print("分类内存:", s_cat_mem.memory_usage(deep=True))
```

### 内存优化

pandas 在处理大型数据集时可能会消耗大量内存，了解和优化内存使用是处理大规模数据的关键技能。通过选择合适的数据类型、使用分类数据、删除不必要的列等方法，可以显著减少内存占用并提高数据处理效率。

```python
import pandas as pd
import numpy as np

# 创建大型 DataFrame
df = pd.DataFrame({
    'A': np.random.randint(0, 100, 1000000),
    'B': np.random.randn(1000000),
    'C': ['a', 'b', 'c', 'd'] * 250000,
    'D': np.random.randint(0, 2, 1000000)
})

print("原始内存:\n", df.memory_usage(deep=True))
print("总内存:", df.memory_usage(deep=True).sum() / 1024**2, "MB")

# 优化整数类型
df['A'] = pd.to_numeric(df['A'], downcast='integer')
df['D'] = pd.to_numeric(df['D'], downcast='integer')

# 优化浮点类型
df['B'] = pd.to_numeric(df['B'], downcast='float')

# 使用分类数据
df['C'] = df['C'].astype('category')

# 删除不必要的列
df_dropped = df.drop(columns=['E', 'F']) if 'E' in df.columns else df

# 使用更小的数据类型
df['A'] = df['A'].astype('int16')
df['B'] = df['B'].astype('float32')

# 使用 sparse 数据类型
from pandas.api.types import SparseDtype
df_sparse = pd.DataFrame({
    'A': pd.array([0, 0, 0, 0, 1, 2, 0], dtype=SparseDtype('int64'))
})

# 分块处理大型文件
chunk_size = 100000
chunks = []
for chunk in pd.read_csv('large_file.csv', chunksize=chunk_size):
    # 处理每个块
    processed = chunk.drop_duplicates()
    chunks.append(processed)
df_processed = pd.concat(chunks)

# 使用数据库代替内存
import sqlite3
conn = sqlite3.connect(':memory:')
df.to_sql('data', conn, index=False)

# 只读取需要的列
df_partial = pd.read_csv('large_file.csv', usecols=['A', 'B'])

# 使用 chunksize 迭代
for chunk in pd.read_csv('large_file.csv', chunksize=100000):
    process(chunk)

# 释放内存
del df
import gc
gc.collect()

# 使用 query 方法优化
df_query = pd.read_csv('large_file.csv')
result = df_query.query('A > 50 & B < 0')

# 使用 eval 和 query 进行高效计算
df_eval = pd.DataFrame(np.random.randn(1000, 10), columns=list('ABCDEFGHIJ'))
result_eval = pd.eval('A + B + C')
result_query = df_eval.query('A > B > C')
```

pandas 是 Python 数据分析的核心工具，掌握其各种功能和用法对于进行有效的数据分析工作至关重要。从基本的数据结构 Series 和 DataFrame，到高级的数据处理、合并、分组聚合等功能，pandas 提供了一整套完整的数据分析解决方案。建议在实际项目中多加练习，逐步掌握各种高级功能。