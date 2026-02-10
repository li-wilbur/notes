# NumPy 详解

NumPy（Numerical Python）是 Python 语言中最重要的科学计算基础库，它提供了强大的多维数组对象和数学函数。NumPy 的核心是 ndarray（n-dimensional array）对象，这是一个高性能的同质数据多维容器。几乎所有的高级科学计算库（如 pandas、SciPy、scikit-learn、TensorFlow、PyTorch）都建立在 NumPy 之上。NumPy 实现了高效的向量化计算，使得大规模数值运算比纯 Python 代码快几十到几百倍。掌握 NumPy 是进行 Python 科学计算和数据分析的必要前提。

## 安装与环境配置

### 安装方法

NumPy 可以通过多种方式安装，最常用的是使用 pip 或 conda 包管理器。不同的安装方式适用于不同的使用场景，从简单的个人项目到生产环境部署，选择合适的安装方法可以确保 NumPy 能够正确运行并发挥最佳性能。NumPy 提供了针对不同平台和 Python 版本的预编译 wheel 包，也支持从源码编译安装以获得最佳性能或满足特殊需求。

```python
# 使用 pip 安装
pip install numpy

# 指定版本安装
pip install numpy==1.26.0

# 使用 conda 安装
conda install numpy

# 安装特定版本
conda install numpy=1.26.0

# 从源码安装（需要编译器）
git clone https://github.com/numpy/numpy.git
cd numpy
python setup.py install

# 检查安装版本
import numpy as np
print(np.__version__)

# 安装包含完整科学计算栈
pip install numpy scipy pandas matplotlib scikit-learn

# 安装 OpenBLAS 优化版本（Linux/macOS）
pip install numpy --no-binary :all:

# 验证安装
import numpy as np
arr = np.array([1, 2, 3])
print("NumPy 版本:", np.__version__)
print("测试数组:", arr)
print("数组形状:", arr.shape)
```

### 基本导入和配置

在 Python 中使用 NumPy 时，遵循社区约定俗成的导入惯例是重要的最佳实践。标准导入方式是 `import numpy as np`，这种写法已经成为 Python 数据科学生态系统中的通用标准。通过 `np.` 前缀可以访问 NumPy 的所有函数和常量，这种简洁的写法既避免了命名冲突，又保持了代码的可读性。NumPy 还提供了丰富的配置选项，可以根据需要调整显示精度、输出格式等参数。

```python
# 标准导入
import numpy as np
import sys

# 查看 NumPy 版本信息
print("NumPy 版本:", np.__version__)
print("NumPy 路径:", np.__file__)
print("Python 版本:", sys.version)

# 配置显示选项
np.set_printoptions(edgeitems=10)  # 显示数组边缘元素数量
np.set_printoptions(linewidth=100)  # 每行字符宽度
np.set_printoptions(precision=4)   # 浮点数精度
np.set_printoptions(suppress=True)  # 抑制科学计数法

# 重置为默认值
np.set_printoptions(edgeitems=3, linewidth=75, precision=8, suppress=False)

# 获取当前配置
current_options = np.get_printoptions()
print("当前配置:", current_options)

# 使用上下文管理器临时设置
with np.printoptions(precision=2, suppress=True):
    arr = np.array([1.23456789, 2.3456789])
    print("精度设置:", arr)

# 检查 NumPy 是否正确配置
print("字节序:", sys.byteorder)
print("最大整数:", np.iinfo(np.int64).max)
print("最大浮点数:", np.finfo(np.float64).max)
print("NumPy 配置:", np.show_config())
```

## NumPy 数组基础

### 创建数组

NumPy 数组（ndarray）是 NumPy 的核心数据结构，它是一系列同类型数据的集合，可以通过索引进行访问。创建 NumPy 数组有多种方式，从简单的 Python 列表转换到使用专门的数组创建函数。理解不同创建方法的适用场景对于高效使用 NumPy 至关重要。不同的创建方法适用于不同的数据源和初始化需求，选择合适的方法可以简化代码并提高性能。

```python
import numpy as np

# 从 Python 列表创建一维数组
arr1 = np.array([1, 2, 3, 4, 5])
print("一维数组:", arr1)

# 从 Python 列表创建二维数组
arr2 = np.array([[1, 2, 3], [4, 5, 6]])
print("二维数组:\n", arr2)

# 指定数据类型
arr3 = np.array([1, 2, 3], dtype=np.float64)
print("浮点数组:", arr3, "类型:", arr3.dtype)

arr4 = np.array([1, 2, 3], dtype=np.complex128)
print("复数数组:", arr4, "类型:", arr4.dtype)

# 使用类型转换
arr5 = np.array([1.5, 2.7, 3.9], dtype=np.int32)
print("转换后:", arr5)

# 使用 arange 创建等差数组
arr6 = np.arange(0, 10, 2)
print("arange:", arr6)

arr7 = np.arange(1.0, 5.0, 0.5)
print("浮点 arange:", arr7)

# 使用 linspace 创建等间距数组
arr8 = np.linspace(0, 1, 5)
print("linspace:", arr8)

arr9 = np.linspace(0, 10, 100)
print("100 个点的 linspace 长度:", len(arr9))

# 使用 logspace 创建对数间距数组
arr10 = np.logspace(0, 2, 5)
print("logspace:", arr10)

# 使用 zeros 创建全零数组
arr11 = np.zeros(5)
print("zeros:", arr11)

arr12 = np.zeros((3, 4))
print("zeros 2D:\n", arr12)

# 使用 ones 创建全一数组
arr13 = np.ones(5)
print("ones:", arr13)

arr14 = np.ones((2, 3), dtype=np.int32)
print("ones 指定类型:\n", arr14)

# 使用 full 创建指定值的数组
arr15 = np.full(5, 3.14)
print("full:", arr15)

arr16 = np.full((3, 3), np.nan)
print("full NaN:\n", arr16)

# 使用 eye 创建单位矩阵
arr17 = np.eye(4)
print("单位矩阵:\n", arr17)

arr18 = np.eye(3, 5)
print("非方阵:\n", arr18)

# 使用 diag 创建对角矩阵
arr19 = np.diag([1, 2, 3])
print("对角矩阵:\n", arr19)

arr20 = np.diag([1, 2, 3], k=1)
print("偏移对角:\n", arr20)

# 使用 empty 创建未初始化数组（快速但不安全）
arr21 = np.empty(5)
print("empty:", arr21)

# 使用随机数创建数组
np.random.seed(42)  # 设置随机种子以复现结果
arr22 = np.random.rand(3, 4)
print("随机数组:\n", arr22)

arr23 = np.random.randint(0, 100, (3, 4))
print("随机整数:\n", arr23)

arr24 = np.random.randn(5)
print("标准正态分布:", arr24)

arr25 = np.random.uniform(0, 1, (3, 4))
print("均匀分布:\n", arr25)

arr26 = np.random.normal(loc=0, scale=1, size=(3, 4))
print("正态分布:\n", arr26)

arr27 = np.random.exponential(scale=1.0, size=10)
print("指数分布:", arr27)

# 使用 fromfunction 创建数组
def my_function(i, j):
    return i + j
arr28 = np.fromfunction(my_function, (3, 4), dtype=np.int32)
print("fromfunction:\n", arr28)

# 从文件读取数组
# arr29 = np.loadtxt('data.txt')
# arr30 = np.genfromtxt('data.csv', delimiter=',')

# 从字节串创建数组
arr31 = np.frombuffer(b'hello world', dtype='S1')
print("frombuffer:", arr31)

# 使用 asarray 转换
py_list = [[1, 2, 3], [4, 5, 6]]
arr32 = np.asarray(py_list)
print("asarray:", arr32)

# 使用 asanyarray
arr33 = np.asanyarray([1, 2, 3])
print("asanyarray:", arr33)

# 创建掩码数组
arr34 = np.ma.array([1, 2, 3, 4, 5], mask=[0, 0, 1, 0, 0])
print("掩码数组:", arr34)
print("掩码:", arr34.mask)
```

### 数组属性

NumPy 数组提供了丰富的属性来描述其特征，这些属性对于理解和操作数组至关重要。掌握这些属性可以帮助我们更好地理解数组的结构和特征，从而进行正确的数组操作。数组属性是只读的，它们反映了数组的当前状态，不会修改数组内容。

```python
import numpy as np

# 创建示例数组
arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]], dtype=np.float64)

# 基本属性
print("形状 (shape):", arr.shape)           # 数组维度
print("数据类型 (dtype):", arr.dtype)          # 元素数据类型
print("数组维度 (ndim):", arr.ndim)           # 维度数量
print("元素总数 (size):", arr.size)           # 总元素数
print("字节大小 (nbytes):", arr.nbytes)      # 总字节数
print("步幅 (strides):", arr.strides)        # 每个维度的字节步长

# 内存布局
print("C 连续 (flags.c_contiguous):", arr.flags.c_contiguous)
print("F 连续 (flags.f_contiguous):", arr.flags.f_contiguous)

# 数组项大小
print("项大小 (itemsize):", arr.itemsize)     # 每个元素的字节数

# 创建不同类型的数组测试
arr_int = np.array([1, 2, 3], dtype=np.int32)
arr_float = np.array([1.0, 2.0, 3.0], dtype=np.float32)
arr_complex = np.array([1+2j, 3+4j], dtype=np.complex64)

print("int32 itemsize:", arr_int.itemsize)
print("float32 itemsize:", arr_float.itemsize)
print("complex64 itemsize:", arr_complex.itemsize)

# 多维数组属性
arr_3d = np.random.rand(2, 3, 4)
print("3D 数组形状:", arr_3d.shape)
print("3D 数组维度:", arr_3d.ndim)
print("3D 数组步幅:", arr_3d.strides)

# 扁平化数组
flat = arr.flat
print("扁平化迭代器:", type(flat))
print("扁平化:", list(flat))

# 数组视图
view = arr.view()
print("视图类型:", type(view))
print("视图与原数组共享数据:", view.base is arr)

# 结构化数组
dt = np.dtype([('name', 'U10'), ('age', 'i4'), ('weight', 'f8')])
arr_struct = np.array([('Alice', 25, 55.5), ('Bob', 30, 75.2)], dtype=dt)
print("结构化数组:\n", arr_struct)
print("字段名:", arr_struct.dtype.names)

# 记录数组
rec_arr = np.rec.array([(1, 2, 3), (4, 5, 6)], dtype=[('x', 'i4'), ('y', 'i4'), ('z', 'i4')])
print("记录数组:", rec_arr)
```

### 数组索引与切片

NumPy 提供了强大而灵活的索引和切片机制，包括基本索引、切片、高级索引和布尔索引。理解这些索引方式的区别和适用场景对于高效操作 NumPy 数组至关重要。数组索引支持整数、切片和数组，这些不同类型的索引可以组合使用以实现复杂的数组访问模式。

```python
import numpy as np

# 创建示例数组
arr = np.arange(0, 12).reshape(3, 4)
print("原始数组:\n", arr)

# 一维数组索引
arr1d = np.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
print("一维数组:", arr1d)

# 基本索引
print("第 0 个元素:", arr1d[0])
print("第 5 个元素:", arr1d[5])
print("最后一个元素:", arr1d[-1])

# 切片
print("切片 [2:5]:", arr1d[2:5])
print("切片 [::2]:", arr1d[::2])
print("切片 [:5]:", arr1d[:5])
print("切片 [::-1]:", arr1d[::-1])  # 反转数组

# 二维数组索引
print("\n二维数组:")
print("访问 [0, 0]:", arr[0, 0])
print("访问 [1, 2]:", arr[1, 2])
print("访问最后一行:", arr[-1])

# 行切片
print("第 0 行:", arr[0])
print("第 1-2 行:", arr[1:3])

# 列切片
print("第 0 列:", arr[:, 0])
print("第 1-2 列:", arr[:, 1:3])

# 组合切片
print("子矩阵 [0:2, 1:3]:\n", arr[0:2, 1:3])

# 切片赋值
arr_slice = np.arange(10)
print("原数组:", arr_slice)
arr_slice[2:5] = [20, 30, 40]
print("切片赋值后:", arr_slice)

# 布尔索引
arr_bool = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
print("布尔数组:", arr_bool > 5)
print("大于 5 的元素:", arr_bool[arr_bool > 5])
print("偶数元素:", arr_bool[arr_bool % 2 == 0])

# 多条件布尔索引
print("大于 3 且小于 8:", arr_bool[(arr_bool > 3) & (arr_bool < 8)])
print("大于 5 或小于 2:", arr_bool[(arr_bool > 5) | (arr_bool < 2)])

# 使用 np.where
arr_where = np.where(arr_bool > 5, '大于5', '小于等于5')
print("where 结果:", arr_where)

# 使用 np.extract
condition = arr_bool > 5
print("extract:", np.extract(condition, arr_bool))

# 花式索引（整数数组索引）
arr_fancy = np.array([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]])
print("花式数组:\n", arr_fancy)

# 使用数组作为索引
rows = np.array([0, 2])
cols = np.array([1, 2])
print("花式索引 [0,2] x [1,2]:\n", arr_fancy[rows, cols])

# 负索引
print("负索引 -1:", arr_fancy[-1])
print("倒数第二行:", arr_fancy[-2])

# newaxis 增加维度
arr_new = np.array([1, 2, 3])
print("原数组形状:", arr_new.shape)
print("增加维度后:", arr_new[np.newaxis, :].shape)
print("列向量:", arr_new[:, np.newaxis].shape)

# np.newaxis 在切片中使用
print("第一列作为列向量:\n", arr[:, np.newaxis, 0])

# 使用 ix_ 函数
arr1 = np.array([0, 1])
arr2 = np.array([2, 3])
print("ix_ 结果:\n", np.ix_(arr1, arr2))

# 迭代数组
print("迭代一维数组:")
for i, val in enumerate(arr1d):
    print(f"  索引 {i}: {val}")

print("\n迭代二维数组（按行）:")
for row in arr:
    print(row)

print("\n使用 ndenumerate:")
for index, value in np.ndenumerate(arr):
    print(f"  索引 {index}: {value}")

# 使用 flatiter
print("\n使用 flat:")
for val in arr.flat:
    print(val, end=' ')
print()
```

## 数组操作

### 形状操作

NumPy 提供了丰富的数组形状操作函数，这些操作可以改变数组的维度结构而不改变数据内容。理解和掌握这些形状操作是进行高效 NumPy 编程的基础。形状操作返回的是原数组的视图（view），而不是复制的数据，这使得这些操作非常高效。

```python
import numpy as np

# 创建示例数组
arr = np.arange(1, 13)
print("原数组:", arr)
print("原形状:", arr.shape)

# reshape 改变形状
arr2 = arr.reshape(3, 4)
print("reshape (3,4):\n", arr2)

arr3 = arr.reshape(2, 2, 3)
print("reshape (2,2,3):\n", arr3)

# reshape 自动计算维度
arr4 = arr.reshape(4, -1)
print("reshape (4,-1):\n", arr4)

arr5 = arr.reshape(-1, 3)
print("reshape (-1,3):\n", arr5)

# flatten 展平数组
arr_flat = arr.reshape(3, 4).flatten()
print("flatten:", arr_flat)

# ravel 展平（可能返回视图）
arr_ravel = arr.reshape(3, 4).ravel()
print("ravel:", arr_ravel)

# transpose / T 转置
arr_t = arr.reshape(3, 4).transpose()
print("transpose:\n", arr_t)
print("T:\n", arr.reshape(3, 4).T)

# 高维数组转置
arr_3d = np.arange(24).reshape(2, 3, 4)
print("3D 数组形状:", arr_3d.shape)
print("transpose (2,0,1):\n", arr_3d.transpose(2, 0, 1).shape)
print("transpose (1,2,0):\n", arr_3d.transpose(1, 2, 0).shape)

# moveaxis 移动轴
arr_move = np.moveaxis(arr_3d, 2, 0)
print("moveaxis 2->0 形状:", arr_move.shape)

# rollaxis 滚动轴
arr_roll = np.rollaxis(arr_3d, 2, 0)
print("rollaxis 2->0 形状:", arr_roll.shape)

# swapaxes 交换轴
arr_swap = np.swapaxes(arr_3d, 1, 2)
print("swapaxes (1,2) 形状:", arr_swap.shape)

# atleast_1d/2d/3d 确保至少指定维度
arr_squeeze = np.atleast_3d(arr)
print("atleast_3d 形状:", arr_squeeze.shape)

# expand_dims 扩展维度
arr_expand = np.expand_dims(arr, axis=0)
print("expand_dims axis=0:", arr_expand.shape)

arr_expand2 = np.expand_dims(arr, axis=1)
print("expand_dims axis=1:", arr_expand2.shape)

# squeeze 删除长度为 1 的维度
arr_with_ones = np.array([[[1, 2, 3]]])
print("with ones 形状:", arr_with_ones.shape)
print("squeeze 后形状:", arr_with_ones.squeeze().shape)

# np.newaxis 增加维度
arr_newaxis = arr[np.newaxis, :, np.newaxis]
print("newaxis 增加两个维度:", arr_newaxis.shape)

# broadcast 广播
arr1 = np.array([[1, 2, 3]])
arr2 = np.array([[1], [2], [3]])
broadcasted = arr1 + arr2
print("broadcast 结果:\n", broadcasted)

# broadcast_to 显式广播
arr_bc = np.broadcast_to(arr1, (5, 3))
print("broadcast_to (5,3):\n", arr_bc)

# broadcast_arrays
a = np.array([[1], [2], [3]])
b = np.array([[10, 20, 30]])
ba, bb = np.broadcast_arrays(a, b)
print("broadcast_arrays a:\n", ba)
print("broadcast_arrays b:\n", bb)
```

### 数组连接与分割

NumPy 提供了多种数组连接和分割函数，这些函数允许我们将多个数组合并为一个数组，或将一个数组拆分为多个数组。理解这些函数的区别和适用场景对于数据预处理和后处理非常重要。

```python
import numpy as np

# 创建示例数组
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])
c = np.array([[9, 10]])

print("数组 a:\n", a)
print("数组 b:\n", b)
print("数组 c:\n", c)

# concatenate 连接
print("\nconcatenate:")
result = np.concatenate((a, b), axis=0)
print("axis=0:\n", result)

result = np.concatenate((a, b), axis=1)
print("axis=1:\n", result)

result = np.concatenate((a, c), axis=0)
print("带 c 的 concatenate:\n", result)

# vstack 垂直堆叠（axis=0）
result = np.vstack((a, b))
print("vstack:\n", result)

# hstack 水平堆叠（axis=1）
result = np.hstack((a, b))
print("hstack:\n", result)

# dstack 深度堆叠（axis=2）
result = np.dstack((a, b))
print("dstack:\n", result)

# column_stack
arr1d = np.array([1, 2])
arr2d = np.array([[3, 4], [5, 6]])
result = np.column_stack((arr1d, arr2d))
print("column_stack:\n", result)

# row_stack
arrs = [np.array([1, 2]), np.array([3, 4])]
result = np.row_stack((arrs[0], arrs[1]))
print("row_stack:\n", result)

# append 追加元素
arr_append = np.append(a, b)
print("append 展平后:", arr_append)

arr_append = np.append(a, b, axis=0)
print("append axis=0:\n", arr_append)

arr_append = np.append(a, b, axis=1)
print("append axis=1:\n", arr_append)

# insert 插入元素
arr_insert = np.insert(a, 1, 10)
print("insert 标量:", arr_insert)

arr_insert = np.insert(a, 1, [10, 20], axis=0)
print("insert 向量 axis=0:\n", arr_insert)

arr_insert = np.insert(a, 1, [10, 20], axis=1)
print("insert 向量 axis=1:\n", arr_insert)

# delete 删除元素
arr_delete = np.delete(a, 1)
print("delete 标量:", arr_delete)

arr_delete = np.delete(a, [1, 2], axis=0)
print("delete 向量 axis=0:", arr_delete)

# unique 去重
arr_with_dup = np.array([1, 2, 2, 3, 3, 3, 4])
unique, indices, counts = np.unique(arr_with_dup, return_index=True, return_counts=True)
print("unique:", unique)
print("indices:", indices)
print("counts:", counts)

# split 分割数组
arr_split = np.arange(10)
print("split 数组:", arr_split)

parts = np.split(arr_split, [3, 6])
print("split [3,6]:", parts)

parts = np.split(arr_split, 4)  # 分成 4 份
print("split 4 份:", parts)

# hsplit 水平分割
arr_hsplit = np.arange(12).reshape(3, 4)
parts_h = np.hsplit(arr_hsplit, [2])
print("hsplit:\n", parts_h[0])
print("和\n", parts_h[1])

# vsplit 垂直分割
parts_v = np.vsplit(arr_hsplit, [1])
print("vsplit:\n", parts_v)

# dsplit 深度分割
arr_3d = np.arange(24).reshape(2, 3, 4)
parts_d = np.dsplit(arr_3d, [2])
print("dsplit 形状:", parts_d[0].shape, parts_d[1].shape)

# repeat 重复元素
arr_repeat = np.array([[1, 2], [3, 4]])
print("repeat axis=0:\n", np.repeat(arr_repeat, 2, axis=0))
print("repeat axis=1:\n", np.repeat(arr_repeat, 3, axis=1))
print("repeat scalars:", np.repeat(5, 3))

# tile 平铺数组
arr_tile = np.array([[1, 2], [3, 4]])
print("tile (2,3):\n", np.tile(arr_tile, (2, 3)))

# flip 反转数组
arr_flip = np.arange(10)
print("flip:", np.flip(arr_flip))
print("flipud:\n", np.flipud(arr_flip.reshape(2, 5)))
print("fliplr:\n", np.fliplr(arr_flip.reshape(2, 5)))

# rot90 旋转 90 度
arr_rot = np.arange(9).reshape(3, 3)
print("rot90 k=1:\n", np.rot90(arr_rot))
print("rot90 k=2:\n", np.rot90(arr_rot, k=2))
```

### 数组运算

NumPy 提供了丰富的数组运算功能，包括算术运算、比较运算、逻辑运算和矩阵运算等。这些运算都经过高度优化，能够利用现代 CPU 的向量化指令集（如 SIMD）实现高效的数值计算。数组运算遵循广播规则，这使得不同形状的数组可以自动进行维度匹配。

```python
import numpy as np

# 创建示例数组
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])

print("数组 a:\n", a)
print("数组 b:\n", b)

# 基本算术运算
print("\n基本算术运算:")
print("a + b:\n", a + b)
print("a - b:\n", a - b)
print("a * b:\n", a * b)
print("a / b:\n", a / b)
print("a // b:\n", a // b)  # 整数除法
print("a % b:\n", a % b)    # 取模
print("a ** b:\n", a ** b)  # 幂运算

# 标量运算（广播）
print("\n标量运算:")
print("a + 10:\n", a + 10)
print("a * 2:\n", a * 2)

# 原地运算
arr_inplace = a.copy()
arr_inplace += 10
print("原地 += 10:\n", arr_inplace)

arr_inplace *= 2
print("原地 *= 2:\n", arr_inplace)

# 比较运算
print("\n比较运算:")
print("a == b:\n", a == b)
print("a > b:\n", a > b)
print("a != b:\n", a != b)

# 逻辑运算
arr_bool = np.array([[True, False], [True, True]])
arr_bool2 = np.array([[False, False], [True, True]])
print("\n逻辑运算:")
print("arr_bool & arr_bool2:\n", arr_bool & arr_bool2)
print("arr_bool | arr_bool2:\n", arr_bool | arr_bool2)
print("np.logical_and(arr_bool, arr_bool2):\n", np.logical_and(arr_bool, arr_bool2))
print("np.logical_or(arr_bool, arr_bool2):\n", np.logical_or(arr_bool, arr_bool2))
print("np.logical_not(arr_bool):\n", np.logical_not(arr_bool))
print("np.logical_xor(arr_bool, arr_bool2):\n", np.logical_xor(arr_bool, arr_bool2))

# 数学函数
arr_math = np.array([0.5, 1.0, 1.5, 2.0, 2.5])
print("\n数学函数:")
print("sqrt:\n", np.sqrt(arr_math))
print("exp:\n", np.exp(arr_math))
print("log:\n", np.log(np.e ** arr_math))
print("log10:\n", np.log10(arr_math))
print("sin:\n", np.sin(arr_math))
print("cos:\n", np.cos(arr_math))
print("tan:\n", np.tan(arr_math))
print("degrees:\n", np.degrees(arr_math))
print("radians:\n", np.radians(np.degrees(arr_math)))

# 舍入函数
arr_round = np.array([1.2, 2.5, 3.8, 4.1, 5.9])
print("\n舍入函数:")
print("round:\n", np.round(arr_round))
print("round 1 位:\n", np.round(arr_round, decimals=1))
print("floor:\n", np.floor(arr_round))
print("ceil:\n", np.ceil(arr_round))
print("trunc:\n", np.trunc(arr_round))

# 三角恒等式
arr_trig = np.array([0, np.pi/6, np.pi/4, np.pi/3, np.pi/2])
print("\n三角恒等式:")
print("sin² + cos² = 1:\n", np.sin(arr_trig)**2 + np.cos(arr_trig)**2)

# 双曲函数
arr_hyper = np.array([0, 0.5, 1.0, 1.5, 2.0])
print("\n双曲函数:")
print("sinh:\n", np.sinh(arr_hyper))
print("cosh:\n", np.cosh(arr_hyper))
print("tanh:\n", np.tanh(arr_hyper))

# 指数和对数函数
print("\n指数和对数:")
print("exp:\n", np.exp(arr_hyper))
print("expm1 (e^x - 1):\n", np.expm1(arr_hyper))
print("log:\n", np.log(np.exp(arr_hyper)))
print("log1p (ln(1+x)):\n", np.log1p(arr_hyper))
print("log10:\n", np.log10(10 ** arr_hyper))

# 功率函数
print("\n功率函数:")
print("power (2^arr):\n", np.power(2, arr_hyper))
print("power (arr^2):\n", np.power(arr_hyper, 2))
print("sqrt:\n", np.sqrt(arr_hyper))
print("cbrt:\n", np.cbrt(arr_hyper))
print("square:\n", np.square(arr_hyper))

# 绝对值
arr_abs = np.array([-3, -2, -1, 0, 1, 2, 3])
print("\n绝对值:")
print("abs:\n", np.abs(arr_abs))
print("fabs (浮点):\n", np.fabs(arr_abs.astype(float)))

# 符号函数
print("\n符号函数:")
print("sign:\n", np.sign(arr_abs))

# 复数函数
arr_complex = np.array([1+2j, 3+4j, 5+6j])
print("\n复数函数:")
print("angle (弧度):\n", np.angle(arr_complex))
print("angle (角度):\n", np.angle(arr_complex, deg=True))
print("real:\n", np.real(arr_complex))
print("imag:\n", np.imag(arr_complex))
print("conj:\n", np.conj(arr_complex))

# 矩阵乘法
mat_a = np.array([[1, 2], [3, 4]])
mat_b = np.array([[5, 6], [7, 8]])
print("\n矩阵运算:")
print("dot (2x2 @ 2x2):\n", np.dot(mat_a, mat_b))
print("matmul (2x2 @ 2x2):\n", np.matmul(mat_a, mat_b))
print("inner (向量内积):\n", np.inner(np.array([1, 2, 3]), np.array([4, 5, 6])))
print("outer:\n", np.outer(np.array([1, 2, 3]), np.array([4, 5, 6])))
print("kron (Kronecker):\n", np.kron(np.array([1, 2]), np.array([3, 4])))

# 张量积
print("\n张量积:")
print("tensordot:\n", np.tensordot(mat_a, mat_b, axes=0))

# kron 积
print("\nKronecker 积:")
print(np.kron(np.array([[1, 2], [3, 4]]), np.array([[0, 5], [6, 0]])))
```

## 统计函数

### 基本统计

NumPy 提供了丰富的统计函数用于计算数组的各种统计量。这些函数可以沿指定轴计算统计量，也可以对整个数组进行计算。统计函数在数据分析、机器学习和科学计算中有着广泛的应用，是理解数据集特征的基础工具。

```python
import numpy as np

# 创建示例数组
arr = np.arange(1, 13).reshape(3, 4)
print("数组:\n", arr)

# 求和
print("\n求和:")
print("sum:", np.sum(arr))
print("sum axis=0:", np.sum(arr, axis=0))
print("sum axis=1:", np.sum(arr, axis=1))

# 累加和
print("\n累加和 (cumsum):")
print("cumsum:\n", np.cumsum(arr))
print("cumsum axis=0:\n", np.cumsum(arr, axis=0))
print("cumsum axis=1:\n", np.cumsum(arr, axis=1))

# 乘积
print("\n乘积:")
print("prod:", np.prod(arr))
print("prod axis=0:", np.prod(arr, axis=0))

# 累乘积
print("\n累乘积 (cumprod):")
print("cumprod:\n", np.cumprod(arr.astype(float)))

# 平均值
print("\n平均值:")
print("mean:", np.mean(arr))
print("mean axis=0:", np.mean(arr, axis=0))
print("mean axis=1:", np.mean(arr, axis=1))

# 加权平均值
weights = np.array([1, 2, 3, 4])
print("weighted mean axis=1:", np.average(arr, axis=1, weights=weights))

# 标准差
print("\n标准差:")
print("std:", np.std(arr))
print("std axis=0:", np.std(arr, axis=0))
print("std axis=1:", np.std(arr, axis=1))

# 方差
print("\n方差:")
print("var:", np.var(arr))
print("var axis=0:", np.var(arr, axis=0))

# 最小值和最大值
print("\n最小值和最大值:")
print("min:", np.min(arr))
print("max:", np.max(arr))
print("min axis=0:", np.argmin(arr, axis=0))
print("max axis=1:", np.argmax(arr, axis=1))

print("\n最小值位置:")
print("argmin:", np.argmin(arr))
print("argmax:", np.argmax(arr))

# 中位数
print("\n中位数:")
print("median:", np.median(arr))
print("median axis=0:", np.median(arr, axis=0))

# 分位数
arr_percent = np.arange(1, 101)
print("\n分位数:")
print("25%:", np.percentile(arr_percent, 25))
print("50%:", np.percentile(arr_percent, 50))
print("75%:", np.percentile(arr_percent, 75))
print("10%, 90%:", np.percentile(arr_percent, [10, 90]))

# 四分位距
print("IQR:", np.percentile(arr_percent, 75) - np.percentile(arr_percent, 25))

# 众数
arr_mode = np.array([1, 2, 2, 3, 3, 3, 4, 5, 5])
# NumPy 没有直接的众数函数，使用 scipy.stats 或手动计算
from scipy import stats
mode_result = stats.mode(arr_mode)
print("\n众数:", mode_result.mode)

# 偏度和峰度
arr_skew = np.array([1, 2, 2, 2, 3, 4, 5, 100])
print("\n偏度:", stats.skew(arr_skew))
print("峰度:", stats.kurtosis(arr_skew))

# 直方图
arr_hist = np.random.randn(1000)
hist, bins = np.histogram(arr_hist, bins=10)
print("\n直方图:")
print("hist:", hist)
print("bins:", bins)

# 协方差矩阵
x = np.array([1, 2, 3, 4, 5])
y = np.array([2, 4, 5, 4, 5])
print("\n协方差矩阵:")
print("cov(x,y):", np.cov(x, y))
print("cov 矩阵:\n", np.corrcoef(x, y))

# 相关系数
print("\n相关系数:")
print("corrcoef:", np.corrcoef(x, y))
print("corrcoef 矩阵:\n", np.corrcoef(x, y))

# 梯度
arr_grad = np.array([1, 2, 4, 7, 11])
print("\n梯度:")
print("gradient:", np.gradient(arr_grad))

# 二阶导数
arr_2nd = np.array([1, 2, 4, 7, 11])
print("二阶导数:", np.gradient(np.gradient(arr_2nd)))
```

### 条件运算

NumPy 提供了丰富的条件运算函数，这些函数可以基于条件对数组元素进行筛选、替换或计算。这些函数在进行数据清洗、特征工程和条件计算时非常有用。

```python
import numpy as np

# 创建示例数组
arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print("数组:\n", arr)

# where 条件选择
print("\nwhere:")
print("where (arr > 5, 'big', 'small'):")
result = np.where(arr > 5, 'big', 'small')
print(result)

# 嵌套 where
arr_nest = np.arange(10)
print("嵌套 where:")
print(np.where(arr_nest < 3, arr_nest, 
               np.where(arr_nest < 6, arr_nest * 2, arr_nest * 3)))

# select 多个条件
conditions = [arr < 3, (arr >= 3) & (arr < 6), arr >= 6]
choices = ['small', 'medium', 'large']
print("\nselect:")
print(np.select(conditions, choices))

# copyto 复制
arr_copy = np.zeros_like(arr)
np.copyto(arr_copy, arr, where=arr > 5)
print("\ncopyto where:")
print(arr_copy)

# nonzero 返回非零索引
arr_nonzero = np.array([0, 1, 2, 0, 3, 0, 4])
print("\nnonzero:")
print("nonzero:", np.nonzero(arr_nonzero))

# any 和 all
arr_bool = np.array([[True, False], [True, True]])
print("\nany 和 all:")
print("any:", np.any(arr_bool))
print("any axis=0:", np.any(arr_bool, axis=0))
print("all:", np.all(arr_bool))
print("all axis=1:", np.all(arr_bool, axis=1))

# isfinite 和 isinf
arr_float = np.array([1.0, np.nan, np.inf, -np.inf, 2.0])
print("\nisfinite:", np.isfinite(arr_float))
print("isinf:", np.isinf(arr_float))
print("isnan:", np.isnan(arr_float))

# isclose 判断接近
arr_close = np.array([1.0, 1.0000001, 2.0])
print("\nisclose:")
print("1.0 ~ 1.0000001:", np.isclose(1.0, 1.0000001))
print("allclose:", np.allclose(arr_close[:2], [1.0, 1.0000001]))

# logspace 和 dstack 的条件使用
arr_log = np.logspace(0, 2, 5)
print("\nlogspace:", arr_log)

# unwrap 相位展开
arr_phase = np.array([0, np.pi, 2*np.pi, 3*np.pi])
print("\nunwrap:")
print("unwrap:", np.unwrap(arr_phase))

# trim_zeros 去除首尾零
arr_trim = np.array([0, 0, 1, 2, 3, 0, 0, 4, 0])
print("\ntrim_zeros:", np.trim_zeros(arr_trim))

# maximum 和 minimum
a = np.array([[1, 2], [3, 4]])
b = np.array([[2, 1], [4, 3]])
print("\nmaximum:\n", np.maximum(a, b))
print("minimum:\n", np.minimum(a, b))

# fmax 和 fmin（忽略 NaN）
a_nan = np.array([1.0, np.nan, 3.0])
b_nan = np.array([2.0, 2.0, np.nan])
print("\nfmax:", np.fmax(a_nan, b_nan))
print("fmin:", np.fmin(a_nan, b_nan))

# interp 插值
x = np.array([0, 1, 2, 3, 4])
y = np.array([0, 10, 20, 30, 40])
print("\ninterp:")
print("interp 2.5:", np.interp(2.5, x, y))
print("interp [0.5, 1.5, 2.5]:", np.interp([0.5, 1.5, 2.5], x, y))
```

## 线性代数

### 矩阵操作

NumPy 的线性代数模块（numpy.linalg）提供了丰富的矩阵运算函数，包括矩阵分解、特征值计算、矩阵求逆等。这些函数是科学计算和工程应用的基石，广泛应用于信号处理、控制系统、机器学习等领域。

```python
import numpy as np
from numpy import linalg as la

# 创建示例矩阵
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

print("矩阵 A:\n", A)
print("矩阵 B:\n", B)

# 基本矩阵运算
print("\n基本矩阵运算:")
print("A.T (转置):\n", A.T)
print("A @ B (矩阵乘法):\n", A @ B)
print("np.dot(A, B):\n", np.dot(A, B))
print("A.trace() (迹):", A.trace())
print("np.trace(A):", np.trace(A))

# 行列式
print("\n行列式:")
print("det(A):", la.det(A))

# 矩阵求逆
print("\n矩阵求逆:")
A_inv = la.inv(A)
print("inv(A):\n", A_inv)
print("A @ A_inv (应该接近单位矩阵):\n", A @ A_inv)

# 伪逆矩阵（Moore-Penrose）
A_rect = np.array([[1, 2, 3], [4, 5, 6]])
A_pinv = la.pinv(A_rect)
print("\n伪逆 (pinv):\n", A_pinv)

# 求解线性方程组 Ax = b
b = np.array([5, 11])
print("\n求解 Ax = b:")
print("b:", b)
x = la.solve(A, b)
print("解 x:", x)
print("验证 A @ x:", A @ x)

# 最小二乘解
A_ls = np.array([[1, 1], [1, 2], [1, 3]])
b_ls = np.array([1, 2, 3])
x_ls, residuals, rank, s = la.lstsq(A_ls, b_ls, rcond=None)
print("\n最小二乘解:")
print("x:", x_ls)
print("residuals:", residuals)
print("rank:", rank)

# 特征值和特征向量
print("\n特征值和特征向量:")
eigvals, eigvecs = la.eig(A)
print("特征值:", eigvals)
print("特征向量:\n", eigvecs)

# 厄米特矩阵的特征值（实对称矩阵）
A_sym = np.array([[2, 1], [1, 2]])
eigvals_sym, eigvecs_sym = la.eigh(A_sym)
print("\n对称矩阵的特征值:", eigvals_sym)
print("对称矩阵的特征向量:\n", eigvecs_sym)

# 奇异值分解
A_svd = np.array([[1, 2], [3, 4], [5, 6]])
U, s_svd, Vh = la.svd(A_svd)
print("\n奇异值分解:")
print("U:\n", U)
print("奇异值 s:", s_svd)
print("Vh:\n", Vh)
print("重建矩阵 U @ diag(s) @ Vh:\n", U @ np.diag(s_svd) @ Vh)

# QR 分解
Q, R = la.qr(A)
print("\nQR 分解:")
print("Q:\n", Q)
print("R:\n", R)
print("Q @ R:\n", Q @ R)

# LU 分解（需要 SciPy）
from scipy.linalg import lu
A_lu = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
P, L, U_scipy = lu(A_lu)
print("\nLU 分解 (SciPy):")
print("P:\n", P)
print("L:\n", L)
print("U:\n", U_scipy)

# Cholesky 分解（正定矩阵）
A_pos = np.array([[4, 2], [2, 3]])
L_chol = la.cholesky(A_pos)
print("\nCholesky 分解:")
print("L:\n", L_chol)
print("L @ L.T:\n", L_chol @ L_chol.T)

# 矩阵范数
print("\n矩阵范数:")
print("frobenius norm:", la.norm(A))
print("2-norm (最大奇异值):", la.norm(A, ord=2))
print("-2-norm (最小奇异值):", la.norm(A, ord=-2))
print("1-norm (列和范数):", la.norm(A, ord=1))
print("inf-norm (行和范数):", la.norm(A, ord=np.inf))

# 条件数
print("\n条件数:")
print("cond(A):", la.cond(A))
print("cond(A, p=2):", la.cond(A, p=2))
print("cond(A, p='fro'):", la.cond(A, p='fro'))

# 矩阵的幂
A_power = np.array([[1, 1], [0, 1]])
print("\n矩阵幂:")
print("A^3:\n", la.matrix_power(A_power, 3))
print("A^5:\n", la.matrix_power(A_power, 5))

# 矩阵指数
A_exp = np.array([[0, 1], [-1, 0]])
print("\n矩阵指数 expm(A):")
print(la.expm(A_exp))

# 对数矩阵
A_log = la.expm(A_exp)
print("\n矩阵对数 logm(A):", la.logm(A_log))
```

## 随机数生成

### 随机数模块

NumPy 的随机数模块（numpy.random）是生成各种概率分布随机数的核心工具。这个模块提供了从简单均匀分布到复杂多元分布的各种随机数生成函数，是模拟、抽样、机器学习等领域的必备工具。理解不同分布的特性及其参数含义对于正确使用随机数至关重要。

```python
import numpy as np

# 设置随机种子以复现结果
np.random.seed(42)

print("NumPy 随机数模块详解")
print("=" * 50)

# 基础随机数
print("\n1. 基础随机数:")
print("rand():", np.random.rand())  # [0, 1) 均匀分布
print("rand(5):", np.random.rand(5))
print("rand(2, 3):\n", np.random.rand(2, 3))
print("randn():", np.random.randn())  # 标准正态分布
print("randn(5):", np.random.randn(5))
print("randn(2, 3):\n", np.random.randn(2, 3))

# randint 随机整数
print("\n2. 随机整数:")
print("randint(0, 10):", np.random.randint(0, 10))  # [0, 10) 不包含 10
print("randint(0, 10, 5):", np.random.randint(0, 10, 5))
print("randint(0, 10, (2, 3)):\n", np.random.randint(0, 10, (2, 3)))
print("randint(0, 10, (2, 3), dtype=np.int32):\n", np.random.randint(0, 10, (2, 3), dtype=np.int32))

# choice 随机选择
print("\n3. 随机选择:")
arr = np.arange(10)
print("choice(10):", np.random.choice(10))
print("choice(10, 5):", np.random.choice(10, 5))
print("choice(10, 5, replace=False):", np.random.choice(10, 5, replace=False))
print("choice(arr):", np.random.choice(arr))
print("choice(arr, 5, p=[0.5, 0.1, ...]):", np.random.choice(arr, 5, p=np.full(10, 0.1)))

# shuffle 和 permutation 洗牌
print("\n4. 洗牌:")
arr_shuffle = np.arange(10)
np.random.shuffle(arr_shuffle)
print("shuffle 后:", arr_shuffle)

arr_perm = np.arange(10)
print("permutation:", np.random.permutation(10))
print("permutation(arr):", np.random.permutation(arr_perm))

# 均匀分布
print("\n5. 均匀分布:")
print("uniform(0, 1):", np.random.uniform(0, 1))
print("uniform(0, 1, 5):", np.random.uniform(0, 1, 5))
print("uniform(0, 1, (2, 3)):\n", np.random.uniform(0, 1, (2, 3)))

# 均匀分布 (别名)
print("random():", np.random.random())
print("random((3, 4)):\n", np.random.random((3, 4)))

# 正态分布
print("\n6. 正态分布:")
print("normal(0, 1):", np.random.normal(0, 1))
print("normal(0, 1, 5):", np.random.normal(0, 1, 5))
print("normal(0, 1, (2, 3)):\n", np.random.normal(0, 1, (2, 3)))

# 指数分布
print("\n7. 指数分布:")
print("exponential(1.0):", np.random.exponential(1.0))
print("exponential(2.0, 5):", np.random.exponential(2.0, 5))

# beta 分布
print("\n8. Beta 分布:")
print("beta(a=2, b=5):", np.random.beta(2, 5))
print("beta(a=2, b=5, 5):", np.random.beta(2, 5, 5))

# binomial 二项分布
print("\n9. 二项分布:")
print("binomial(n=10, p=0.5):", np.random.binomial(10, 0.5))
print("binomial(n=10, p=0.5, 5):", np.random.binomial(10, 0.5, 5))

# multinomial 多项分布
print("\n10. 多项分布:")
print("multinomial(n=10, pvals=[0.5, 0.3, 0.2]):", np.random.multinomial(10, [0.5, 0.3, 0.2]))

# poisson 泊松分布
print("\n11. 泊松分布:")
print("poisson(lam=5):", np.random.poisson(5))
print("poisson(lam=5, 5):", np.random.poisson(5, 5))

# gamma 分布
print("\n12. Gamma 分布:")
print("gamma(shape=2, scale=2):", np.random.gamma(2, 2))
print("gamma(shape=2, scale=2, 5):", np.random.gamma(2, 2, 5))

# 几何分布
print("\n13. 几何分布:")
print("geometric(p=0.5):", np.random.geometric(0.5))
print("geometric(p=0.5, 5):", np.random.geometric(0.5, 5))

# 几何分布（第一次成功前的失败次数）
print("\n14. 负二项分布:")
print("negative_binomial(n=1, p=0.5):", np.random.negative_binomial(1, 0.5))
print("negative_binomial(n=1, p=0.5, 5):", np.random.negative_binomial(1, 0.5, 5))

# logistic 分布
print("\n15. Logistic 分布:")
print("logistic(loc=0, scale=1):", np.random.logistic(0, 1))
print("logistic(0, 1, 5):", np.random.logistic(0, 1, 5))

# 对数正态分布
print("\n16. 对数正态分布:")
print("lognormal(mean=0, sigma=1):", np.random.lognormal(0, 1))
print("lognormal(0, 1, 5):", np.random.lognormal(0, 1, 5))

# 三角分布
print("\n17. 三角分布:")
print("triangular(left=0, mode=0.5, right=1):", np.random.triangular(0, 0.5, 1))
print("triangular(0, 0.5, 1, 5):", np.random.triangular(0, 0.5, 1, 5))

# von Mises 分布（圆上角度）
print("\n18. von Mises 分布:")
print("vonmises(mu=0, kappa=4):", np.random.vonmises(0, 4))
print("vonmises(0, 4, 5):", np.random.vonmises(0, 4, 5))

# Wald 分布（逆高斯）
print("\n19. Wald 分布:")
print("wald(mean=1, scale=1):", np.random.wald(1, 1))
print("wald(1, 1, 5):", np.random.wald(1, 1, 5))

# 离散均匀分布
print("\n20. 离散均匀分布 (randint):")
print("randint(1, 7):", np.random.randint(1, 7))  # 骰子

# 随机字节
print("\n21. 随机字节:")
print("bytes(10):", np.random.bytes(10))

# 随机字符串
print("\n22. 随机字符串:")
print("choice for string:", np.random.choice(['a', 'b', 'c'], size=10))

# 设置新的随机种子
print("\n23. 高级随机种子设置:")
# 使用 Generator（新接口，NumPy 1.17+）
rng = np.random.default_rng(seed=42)
print("Generator rand():", rng.random(5))
print("Generator randn():", rng.normal(0, 1, 5))
print("Generator randint(0, 100):", rng.integers(0, 100, 5))
print("Generator choice:", rng.choice(10, 5, replace=False))

# 洗牌
arr_shuffle = np.arange(10)
rng.shuffle(arr_shuffle)
print("Generator shuffle:", arr_shuffle)

# 排列
print("Generator permutation:", rng.permutation(10))
```

## 高级主题

### 结构化数组

结构化数组是 NumPy 中处理异构数据的重要工具，它允许数组的每个元素包含多个命名字段，每个字段可以有不同的数据类型。这种数据结构类似于 C 语言中的结构体或数据库中的记录，非常适合处理表格数据、传感器数据、日志记录等场景。结构化数组在数据清洗、特征工程和数据分析中有着广泛的应用。

```python
import numpy as np

print("NumPy 结构化数组详解")
print("=" * 50)

# 创建结构化数据类型
dt = np.dtype([
    ('name', 'U20'),      # Unicode 字符串
    ('age', 'i4'),         # 32 位整数
    ('height', 'f8'),       # 64 位浮点
    ('weight', 'f4'),       # 32 位浮点
    ('active', '?')         # 布尔值
])

print("数据类型:", dt)

# 使用 dtype 创建结构化数组
people = np.array([
    ('Alice', 25, 165.5, 55.0, True),
    ('Bob', 30, 180.0, 75.5, False),
    ('Charlie', 35, 170.0, 68.0, True)
], dtype=dt)

print("\n结构化数组:")
print(people)

# 访问字段
print("\n访问字段:")
print("names:", people['name'])
print("ages:", people['age'])
print("heights:", people['height'])

# 按字段筛选
print("\n按字段筛选:")
print("age > 27:", people[people['age'] > 27])
print("active == True:", people[people['active']])

# 按字段排序
print("\n按字段排序:")
print("按年龄排序:", np.sort(people, order='age'))
print("按姓名排序:", np.sort(people, order='name'))

# 修改字段值
people['age'][0] = 26
print("\n修改年龄后:", people['age'])

# 添加字段（需要重建数组）
dt_new = np.dtype([
    ('name', 'U20'),
    ('age', 'i4'),
    ('height', 'f8'),
    ('weight', 'f4'),
    ('active', '?'),
    ('email', 'U30')  # 新字段
])
people_new = np.zeros(3, dtype=dt_new)
for field in ['name', 'age', 'height', 'weight', 'active']:
    people_new[field] = people[field]
people_new['email'] = ['alice@email.com', 'bob@email.com', 'charlie@email.com']
print("\n添加 email 字段后:")
print(people_new)

# 使用视图转换
print("\n视图转换为简单数组:")
simple = people.view(np.int64).reshape(3, -1)
print(simple)

# 嵌套结构化数组
dt_nested = np.dtype([
    ('name', 'U20'),
    ('address', np.dtype([
        ('street', 'U30'),
        ('city', 'U20'),
        ('zipcode', 'U10')
    ])),
    ('scores', 'f4', (3,))  # 数组字段
])

people_address = np.array([
    ('Alice', ('123 Main St', 'NYC', '10001'), [85, 90, 95]),
    ('Bob', ('456 Oak Ave', 'LA', '90001'), [70, 75, 80])
], dtype=dt_nested)

print("\n嵌套结构化数组:")
print(people_address)
print("访问嵌套字段:", people_address['address']['city'])
print("访问数组字段:", people_address['scores'])

# 文件 I/O
# np.save('people.npy', people)
# loaded = np.load('people.npy')
# np.savetxt('people.txt', people, fmt='%s %d %f %f %d', header='name age height weight active')

# 记录数组
print("\n记录数组 (recarray):")
rec_people = people.view(np.recarray)
print("recarray name:", rec_people.name)
print("recarray age:", rec_people.age)

# 创建空结构化数组
print("\n创建空结构化数组:")
empty = np.zeros(3, dtype=dt)
print(empty)

# 从字典列表创建
data_dict = [
    {'name': 'David', 'age': 40, 'height': 175, 'weight': 80, 'active': True}
]
from_dict = np.array([(d['name'], d['age'], d['height'], d['weight'], d['active']) 
                      for d in data_dict], dtype=dt)
print("从字典列表创建:", from_dict)

# 字节序
dt_be = np.dtype([
    ('value', '>i4')  # 大端序
], align=True)
print("\n字节序:", dt_be)

# 内存布局
print("数据项大小 (itemsize):", dt.itemsize)
print("字段:", dt.names)
print("字段偏移:", dt.fields)
```

### 广播机制

广播（Broadcasting）是 NumPy 中最强大和独特的特性之一，它允许不同形状的数组在进行算术运算时自动进行维度匹配。理解广播规则对于高效使用 NumPy 和避免意外结果是至关重要的。广播机制使得我们可以用简洁的代码表达复杂的数学运算，而不需要显式地使用循环或显式复制数据。

```python
import numpy as np

print("NumPy 广播机制详解")
print("=" * 50)

# 基本广播示例
print("1. 基本广播:")
a = np.array([[1, 2, 3]])
b = np.array([[10], [20], [30]])
print("a:\n", a)
print("b:\n", b)
print("a + b:\n", a + b)

# 维度不匹配示例
print("\n2. 维度不匹配:")
a1 = np.array([[1, 2, 3]])
b1 = np.array([10, 20, 30, 40])
try:
    result = a1 + b1
except ValueError as e:
    print("错误:", e)

# 广播规则
print("\n3. 广播规则:")
# 规则 1: 如果两个数组维度不同，维度较小的数组在前面补 1
A = np.random.rand(3, 4, 5)
B = np.random.rand(5)
print("A shape:", A.shape)
print("B shape:", B.shape)
print("A + B shape:", (A + B).shape)

# 规则 2: 如果两个数组在某个维度上大小相同，或者其中一个大小为 1，则兼容
C = np.random.rand(4, 1)
D = np.random.rand(4)
print("\nC shape:", C.shape)
print("D shape:", D.shape)
print("C + D shape:", (C + D).shape)

# 规则 3: 如果在任何维度上大小都不匹配且都不是 1，则报错
E = np.random.rand(3, 4)
F = np.random.rand(3, 5)
try:
    result = E + F
except ValueError as e:
    print("\n错误:", e)

# 实际应用示例
print("\n4. 实际应用:")
# 归一化
data = np.random.rand(100, 5)
normalized = (data - data.mean(axis=0)) / data.std(axis=0)
print("归一化后均值:", normalized.mean(axis=0))
print("归一化后标准差:", normalized.std(axis=0))

# 特征缩放
features = np.array([[100, 0.1], [200, 0.2], [150, 0.15]])
min_vals = features.min(axis=0)
max_vals = features.max(axis=0)
scaled = (features - min_vals) / (max_vals - min_vals)
print("特征缩放:\n", scaled)

# 外积（外积）
vec1 = np.array([1, 2, 3])
vec2 = np.array([4, 5, 6])
print("\n外积:")
print("outer product:\n", np.outer(vec1, vec2))

# 张量积
print("\n张量积:")
result = np.tensordot(vec1, vec2, axes=0)
print(result)

# 使用广播进行距离计算
points = np.array([[0, 0], [1, 1], [2, 2]])
centroid = points.mean(axis=0)
distances = np.sqrt(((points - centroid) ** 2).sum(axis=1))
print("\n到质心的距离:", distances)

# 广播 vs 显式复制
print("\n5. 广播 vs 显式复制:")
a_large = np.ones((1000, 100))
b_small = np.array([1, 2, 3])

# 广播方式（高效）
result_broadcast = a_large + b_small

# 显式复制（低效）
b_repeated = np.tile(b_small, (1000, 1))
result_explicit = a_large + b_repeated

print("广播结果形状:", result_broadcast.shape)
print("显式复制结果形状:", result_explicit.shape)
print("结果相等:", np.allclose(result_broadcast, result_explicit))

# broadcasting 索引
print("\n6. 广播索引:")
arr = np.arange(12).reshape(4, 3)
rows = np.array([0, 2])
cols = np.array([0, 2])
print("原数组:\n", arr)
print("广播索引结果:\n", arr[rows, cols])

# np.newaxis 的使用
print("\n7. np.newaxis 的使用:")
v = np.array([1, 2, 3])
print("v:", v)
print("v[:, np.newaxis]:\n", v[:, np.newaxis])
print("v[np.newaxis, :]:\n", v[np.newaxis, :])

# 高级广播示例
print("\n8. 高级广播:")
# 计算向量外积
x = np.array([1, 2, 3, 4])
y = np.array([5, 6, 7])
outer = x[:, np.newaxis] * y[np.newaxis, :]
print("x[:, np.newaxis] * y[np.newaxis, :]:\n", outer)

# 计算相似度矩阵
users = np.array([[1, 2, 3], [4, 5, 6]])
user_means = users.mean(axis=1, keepdims=True)
centered = users - user_means
similarity = centered @ centered.T
print("\n相似度矩阵:\n", similarity)
```

NumPy 是 Python 科学计算的基础，掌握 NumPy 的各种功能对于进行高效的数据分析和数值计算至关重要。从基本的数组创建和索引操作，到高级的线性代数和广播机制，NumPy 提供了一套完整且高效的数值计算工具。建议在实际项目中使用 NumPy，逐步熟悉其各种函数和最佳实践。