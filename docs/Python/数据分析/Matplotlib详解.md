# Matplotlib详解

Matplotlib是Python中最流行的数据可视化库之一，它提供了丰富的绑图功能，可以创建静态、交互式和动画可视化。Matplotlib最初由John Hunter于2003年开发，旨在实现MATLAB风格的绑图功能，但完全使用Python实现。这使得它成为数据科学、机器学习、科学研究等领域不可或缺的工具。Matplotlib的设计哲学强调简单性和灵活性，它允许用户通过最少的代码创建复杂的可视化，同时也支持高级用户进行深度定制。了解Matplotlib不仅能帮助你更好地展示数据，还能加深对数据本身的理解，因为可视化往往是发现数据模式和异常的第一步。

## 安装与环境配置

Matplotlib的安装非常简单，可以通过pip或conda包管理器完成。对于大多数用户来说，使用pip安装是最便捷的方式。安装完成后，还需要确保系统中安装了必要的依赖库，包括numpy用于数据处理，pillow用于图像处理，以及cycler和kiwisolver等用于绑图功能。在不同的操作系统上，安装过程略有不同，但总体来说都是标准化的包安装流程。安装完成后，可以通过简单的导入语句来验证安装是否成功，如果导入过程中没有报错，说明Matplotlib已经正确安装在你的Python环境中。

```bash
pip install matplotlib
conda install matplotlib
```

```python
import matplotlib
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

print(f"Matplotlib版本: {matplotlib.__version__}")
print(f"NumPy版本: {np.__version__}")
print(f"Pandas版本: {pd.__version__}")
```

Matplotlib提供了多种后端来渲染图形，选择合适的后端对于获得最佳的显示效果非常重要。在Jupyter Notebook中，通常使用`%matplotlib inline`magic命令来启用内联显示后端，这种方式非常适合数据探索和教学场景。对于需要交互功能的场景，可以使用`%matplotlib widget`或`%matplotlib qt`来获得可交互的绑图窗口。在服务器环境中，可能需要使用Agg后端来生成图像文件而不显示窗口。了解不同后端的特点和适用场景，可以帮助你更好地利用Matplotlib的功能。后端的选择主要影响图像的显示方式和交互性，但不影响绑图API的使用。

```python
import matplotlib
matplotlib.use('Agg')

import matplotlib.pyplot as plt
plt.switch_backend('Agg')

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [1, 4, 9])
plt.savefig('example.png', dpi=150, bbox_inches='tight')
print("图像已保存为example.png")

%matplotlib inline
%matplotlib widget
%matplotlib qt
```

## 核心概念与架构

Matplotlib的架构由三个主要层次组成：后端层、Artist层和脚本层。这种分层设计使得Matplotlib既能够满足简单快速绑图的需求，也支持复杂的定制化绑图。后端层负责处理图形的实际渲染，它定义了图形如何在不同的设备上显示或保存。Artist层是Matplotlib的核心，它包含了所有可见的图形元素，如线条、文本、形状等。脚本层主要是pyplot模块，它提供了简便的绑图接口，让用户能够快速创建常见的可视化。这三个层次相互协作，共同构成了Matplotlib强大而灵活的可视化系统。

```python
fig = plt.figure()
ax = fig.add_subplot(111)
ax.set_title("三层架构示例")
ax.text(0.5, 0.7, "脚本层 (pyplot)", ha='center', fontsize=14)
ax.text(0.5, 0.5, "Artist层 (Figure, Axes, Line2D...)", ha='center', fontsize=14)
ax.text(0.5, 0.3, "后端层 (Agg, Qt5Agg, SVG...)", ha='center', fontsize=14)
ax.axis('off')
plt.show()
```

Figure对象是Matplotlib中最高级别的容器，它代表整个图形窗口或图像文件。一个Figure可以包含多个Axes对象，每个Axes代表一个独立的绑图区域。Figure充当画布，而Axes是画布上的具体绑图区域。这种设计允许在单个窗口中创建多个子图，每个子图可以显示不同的数据或同一数据的不同视角。理解Figure和Axes的关系是掌握Matplotlib的关键，因为大多数绑图操作都是在特定的Axes对象上进行的。当你使用`plt.subplots()`时，会同时创建一个Figure和一组Axes对象，这个函数是创建多子图布局的便捷方式。

```python
fig = plt.figure(figsize=(10, 6), dpi=100, facecolor='lightgray')
print(f"Figure大小: {fig.get_size_inches()}英寸")
print(f"Figure DPI: {fig.get_dpi()}")
print(f"Figure背景色: {fig.get_facecolor()}")

ax1 = fig.add_subplot(221)
ax2 = fig.add_subplot(222)
ax3 = fig.add_subplot(223)
ax4 = fig.add_subplot(224)

ax1.set_title("子图1")
ax2.set_title("子图2")
ax3.set_title("子图3")
ax4.set_title("子图4")

fig.suptitle("2x2子图布局", fontsize=16, fontweight='bold')
plt.tight_layout(rect=[0, 0, 1, 0.96])
plt.show()
```

Axes对象是Matplotlib中最重要的绑图区域，它包含了绑图所需的所有元素，包括坐标轴、刻度、标签、图例等。每个Axes对象都有自己的坐标系，负责将数据值转换为屏幕上的像素位置。坐标轴是Axes的重要组成部分，包括x轴和y轴，它们定义了数据的显示范围和刻度。Matplotlib提供了丰富的坐标轴设置选项，包括线性坐标轴、对数坐标轴、分类坐标轴等。理解如何操作Axes对象是创建专业可视化的基础，因为几乎所有的绑图命令都是Axes对象的方法。

```python
fig, ax = plt.subplots(figsize=(8, 6))

x = np.linspace(0, 2*np.pi, 100)
y1 = np.sin(x)
y2 = np.cos(x)

ax.plot(x, y1, label='sin(x)', color='blue', linewidth=2)
ax.plot(x, y2, label='cos(x)', color='red', linewidth=2)

ax.set_xlabel('X轴', fontsize=12)
ax.set_ylabel('Y轴', fontsize=12)
ax.set_title('正弦和余弦函数', fontsize=14, fontweight='bold')
ax.legend(loc='upper right', fontsize=10)
ax.grid(True, linestyle='--', alpha=0.7)
ax.set_xlim(0, 2*np.pi)
ax.set_ylim(-1.5, 1.5)

plt.show()
```

Axis对象负责处理坐标轴的刻度、标签和范围。Matplotlib提供了Axis的多种类型，包括线性轴（LinearAxis）、对数轴（LogAxis）和分类轴（CategoryAxis）。每个坐标轴都有主刻度线和次刻度线，可以分别设置它们的格式和位置。刻度定位器（Locator）控制刻度的位置，而刻度格式化器（Formatter）控制刻度标签的显示格式。Matplotlib内置了多种定位器和格式化器，可以满足大多数常见需求，同时也可以创建自定义的定位器和格式化器来满足特殊需求。掌握Axis的设置方法对于创建清晰、专业的数据可视化至关重要。

```python
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

x = np.linspace(0.01, 100, 100)
y = 1 / x

axes[0].plot(x, y)
axes[0].set_title('线性坐标轴')
axes[0].set_xlabel('X')
axes[0].set_ylabel('Y')
axes[0].grid(True, alpha=0.3)

axes[1].plot(x, y)
axes[1].set_xscale('log')
axes[1].set_yscale('log')
axes[1].set_title('对数坐标轴')
axes[1].set_xlabel('X (log scale)')
axes[1].set_ylabel('Y (log scale)')
axes[1].grid(True, alpha=0.3, which='both')

plt.tight_layout()
plt.show()

from matplotlib.ticker import MultipleLocator, FormatStrFormatter
fig, ax = plt.subplots(figsize=(8, 6))
ax.plot([1, 2, 3, 4, 5], [10, 25, 18, 30, 42], 'o-', markersize=8)
ax.xaxis.set_major_locator(MultipleLocator(1))
ax.xaxis.set_major_formatter(FormatStrFormatter('%d月'))
ax.yaxis.set_major_locator(MultipleLocator(10))
ax.yaxis.set_minor_locator(MultipleLocator(5))
ax.grid(True, which='major', linestyle='-', alpha=0.7)
ax.grid(True, which='minor', linestyle=':', alpha=0.4)
plt.show()
```

## 基本绑图类型

折线图是最基本的数据可视化形式，它通过连接数据点来展示数据随时间或其他连续变量的变化趋势。折线图特别适合展示时间序列数据，比如股票价格、气温变化、销售趋势等。在Matplotlib中，使用`ax.plot()`函数创建折线图，可以传入x和y坐标数组作为参数。折线图的优势在于能够清晰地显示数据的趋势和变化率，通过观察线条的斜率可以直观地了解数据的变化速度。创建折线图时，可以自定义线条的颜色、样式、宽度，以及数据点的标记样式，从而创建出既美观又信息丰富的可视化效果。

```python
fig, ax = plt.subplots(figsize=(10, 6))

months = ['1月', '2月', '3月', '4月', '5月', '6月']
sales = [120, 150, 180, 170, 210, 250]
expenses = [80, 95, 110, 100, 130, 150]

ax.plot(months, sales, marker='o', markersize=8, linewidth=2, 
        color='#2E86AB', label='销售额')
ax.plot(months, expenses, marker='s', markersize=8, linewidth=2,
        color='#E94F37', label='支出')

ax.set_xlabel('月份', fontsize=12)
ax.set_ylabel('金额（千元）', fontsize=12)
ax.set_title('2024年上半年销售与支出趋势', fontsize=14, fontweight='bold')
ax.legend(loc='upper left', fontsize=10)
ax.grid(True, linestyle='--', alpha=0.6)
ax.set_ylim(0, 300)

for i, (m, s) in enumerate(zip(months, sales)):
    ax.annotate(f'{s}', (m, s), textcoords="offset points", 
                xytext=(0, 10), ha='center', fontsize=9)

plt.tight_layout()
plt.show()
```

散点图用于展示两个变量之间的关系和相关性，每个数据点用一个标记表示。散点图是探索数据关联性的理想工具，可以帮助识别线性关系、非线性关系、群聚现象和异常值。在Matplotlib中，使用`ax.scatter()`函数创建散点图。与折线图不同，散点图中的数据点是独立绘制的，不通过线条连接。通过调整散点的大小和颜色，可以同时展示更多的维度信息。散点图在机器学习领域应用广泛，常用于特征选择、聚类分析和异常检测等场景。正确使用散点图可以帮助我们发现数据中隐藏的模式和规律。

```python
fig, ax = plt.subplots(figsize=(10, 7))

np.random.seed(42)
n = 200
x = np.random.rand(n) * 100
y = 2 * x + 1 + np.random.randn(n) * 30
size = np.random.rand(n) * 200 + 50
colors = np.random.rand(n)

scatter = ax.scatter(x, y, c=colors, s=size, cmap='viridis', 
                     alpha=0.7, edgecolors='white', linewidth=0.5)

cbar = plt.colorbar(scatter)
cbar.set_label('颜色值', fontsize=11)

ax.set_xlabel('X变量', fontsize=12)
ax.set_ylabel('Y变量', fontsize=12)
ax.set_title('散点图示例：展示变量关系', fontsize=14, fontweight='bold')
ax.grid(True, linestyle='--', alpha=0.4)

z = np.polyfit(x, y, 1)
p = np.poly1d(z)
x_line = np.linspace(0, 100, 100)
ax.plot(x_line, p(x_line), 'r--', linewidth=2, label=f'趋势线: y={z[0]:.2f}x+{z[1]:.2f}')
ax.legend(loc='upper left')

plt.show()
```

柱状图是展示分类数据大小的理想选择，它通过柱子的高度或长度来表示数值大小。柱状图适用于比较不同类别的数量、频率或比例，如比较不同产品的销售额、不同部门的预算分配等。在Matplotlib中，使用`ax.bar()`函数创建垂直柱状图，使用`ax.barh()`函数创建水平柱状图。分组柱状图和堆叠柱状图可以展示更多的分类维度，让观众能够同时比较多个变量。柱状图的设计需要注意保持条宽一致、颜色区分清晰、标签易于阅读等原则。合理使用柱状图可以让数据对比更加直观和有效。

```python
fig, axes = plt.subplots(1, 2, figsize=(14, 6))

categories = ['产品A', '产品B', '产品C', '产品D', '产品E']
values = [45, 72, 63, 89, 56]
colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']

axes[0].bar(categories, values, color=colors, edgecolor='black', linewidth=1.2)
axes[0].set_xlabel('产品类别', fontsize=12)
axes[0].set_ylabel('销售额（万元）', fontsize=12)
axes[0].set_title('各产品销售额对比', fontsize=14, fontweight='bold')
axes[0].grid(axis='y', linestyle='--', alpha=0.5)

for i, v in enumerate(values):
    axes[0].text(i, v + 2, str(v), ha='center', fontsize=11, fontweight='bold')

regions = ['华东', '华南', '华北', '西部']
q1_sales = [120, 95, 80, 60]
q2_sales = [135, 105, 88, 72]

x = np.arange(len(regions))
width = 0.35

bars1 = axes[1].bar(x - width/2, q1_sales, width, label='第一季度', 
                    color='#3498DB', edgecolor='black')
bars2 = axes[1].bar(x + width/2, q2_sales, width, label='第二季度',
                    color='#E74C3C', edgecolor='black')

axes[1].set_xlabel('区域', fontsize=12)
axes[1].set_ylabel('销售额（万元）', fontsize=12)
axes[1].set_title('各区域季度销售对比', fontsize=14, fontweight='bold')
axes[1].set_xticks(x)
axes[1].set_xticklabels(regions)
axes[1].legend()
axes[1].grid(axis='y', linestyle='--', alpha=0.5)

plt.tight_layout()
plt.show()
```

直方图用于展示数据的分布情况，它将数据分成若干个区间（称为bin），然后用柱子的高度表示每个区间内数据点的数量或频率。直方图是分析数据分布特征的重要工具，可以帮助识别数据的中心趋势、离散程度、偏态和峰态等特征。在Matplotlib中，使用`ax.hist()`函数创建直方图，可以通过设置bin的数量和边界来调整直方图的粒度。选择合适的bin数量对于正确理解数据分布至关重要：bin太少会丢失细节，bin太多则会产生噪声。直方图常用于统计分析、质量控制和机器学习的数据探索阶段。

```python
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

np.random.seed(42)
data1 = np.random.normal(0, 1, 1000)
data2 = np.random.exponential(2, 1000)
data3 = np.random.uniform(-3, 3, 1000)
data4 = np.random.lognormal(0, 0.5, 1000)

axes[0, 0].hist(data1, bins=30, color='steelblue', edgecolor='white', alpha=0.8)
axes[0, 0].set_title('正态分布', fontsize=12)
axes[0, 0].set_xlabel('值')
axes[0, 0].set_ylabel('频率')
axes[0, 0].axvline(np.mean(data1), color='red', linestyle='--', label=f'均值: {np.mean(data1):.2f}')
axes[0, 0].legend()

axes[0, 1].hist(data2, bins=30, color='coral', edgecolor='white', alpha=0.8)
axes[0, 1].set_title('指数分布', fontsize=12)
axes[0, 1].set_xlabel('值')
axes[0, 1].set_ylabel('频率')

axes[1, 0].hist(data3, bins=30, color='mediumseagreen', edgecolor='white', alpha=0.8)
axes[1, 0].set_title('均匀分布', fontsize=12)
axes[1, 0].set_xlabel('值')
axes[1, 0].set_ylabel('频率')

axes[1, 1].hist(data4, bins=30, color='mediumpurple', edgecolor='white', alpha=0.8)
axes[1, 1].set_title('对数正态分布', fontsize=12)
axes[1, 1].set_xlabel('值')
axes[1, 1].set_ylabel('频率')

plt.suptitle('不同概率分布的直方图', fontsize=14, fontweight='bold')
plt.tight_layout(rect=[0, 0, 1, 0.96])
plt.show()
```

饼图用于展示各部分占整体的比例关系，特别适合展示分类数据的百分比分布。饼图的优势在于直观地显示各部分之间的比例关系，让观众能够快速了解数据的构成。然而，饼图在某些情况下可能会产生误导，特别是当类别过多或比例相近时。在Matplotlib中，使用`ax.pie()`函数创建饼图，可以设置每个扇区的颜色、标签、起始角度、突出显示等属性。环形饼图是饼图的变体，通过设置内半径可以创建环形效果，更适合展示某些类型的数据。选择使用饼图还是其他类型的图表需要根据具体的数据特点和展示目的来决定。

```python
fig, axes = plt.subplots(1, 2, figsize=(14, 7))

sizes = [25, 35, 20, 12, 8]
labels = ['A类', 'B类', 'C类', 'D类', 'E类']
colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
explode = (0.05, 0, 0, 0, 0)

wedges, texts, autotexts = axes[0].pie(sizes, explode=explode, labels=labels, colors=colors,
                                         autopct='%1.1f%%', startangle=90, 
                                         textprops={'fontsize': 11})
for autotext in autotexts:
    autotext.set_color('white')
    autotext.set_fontweight('bold')
axes[0].set_title('市场占比分布', fontsize=14, fontweight='bold')

categories = ['电子产品', '服装', '食品', '家居', '图书', '其他']
values = [30, 25, 18, 12, 10, 5]
colors = plt.cm.Set3(np.linspace(0, 1, len(categories)))

wedges, texts, autotexts = axes[1].pie(values, labels=categories, colors=colors,
                                         autopct=lambda pct: f'{pct:.1f}%' if pct > 5 else '',
                                         startangle=90, pctdistance=0.85,
                                         wedgeprops=dict(width=0.5, edgecolor='white'))
axes[1].set_title('电商平台品类销售占比', fontsize=14, fontweight='bold')

plt.tight_layout()
plt.show()
```

## 图表定制与美化

图表标题和轴标签是图表最重要的文本元素，它们为观众提供了理解图表内容所需的上下文信息。在Matplotlib中，使用`ax.set_xlabel()`、`ax.set_ylabel()`和`ax.set_title()`方法设置轴标签和标题。这些方法接受字符串参数，可以设置文本内容和字体属性。为了创建专业的可视化，应该选择清晰简洁的标签文本，使用适当的字体大小和样式。标题应该准确描述图表的主题，轴标签应该明确指出每个轴代表的数据含义。合理使用颜色、粗体和字体大小可以帮助突出重要信息，使图表更加易读。

```python
fig, ax = plt.subplots(figsize=(10, 6))

x = np.linspace(0, 10, 100)
y = np.sin(x)

ax.plot(x, y, linewidth=2, color='#2C3E50')

ax.set_xlabel('时间（秒）', fontsize=14, fontweight='bold', labelpad=10)
ax.set_ylabel('振幅（mV）', fontsize=14, fontweight='bold', labelpad=10)
ax.set_title('正弦波信号图', fontsize=16, fontweight='bold', pad=20)

ax.tick_params(axis='both', labelsize=11)

plt.show()
```

图例是标识图表中不同数据系列的标准方式，它帮助观众理解每个绑图元素代表的内容。在Matplotlib中，可以通过在绑图函数中设置`label`参数来指定每个系列的标签，然后调用`ax.legend()`方法显示图例。图例的位置可以通过`loc`参数设置，支持多种预定义位置如'upper left'、'lower right'等，也可以使用坐标指定精确位置。可以自定义图例的标题、字体大小、背景色、边框等属性。对于复杂的多系列图表，良好的图例设计对于图表的可读性至关重要。

```python
fig, ax = plt.subplots(figsize=(10, 6))

x = np.linspace(0, 10, 200)
y1 = np.sin(x)
y2 = np.cos(x)
y3 = np.sin(x + np.pi/4)

ax.plot(x, y1, label='sin(x)', color='#E74C3C', linewidth=2)
ax.plot(x, y2, label='cos(x)', color='#3498DB', linewidth=2)
ax.plot(x, y3, label='sin(x+π/4)', color='#2ECC71', linewidth=2, linestyle='--')

ax.legend(loc='upper right', fontsize=11, title='三角函数', 
          title_fontsize=12, framealpha=0.9, edgecolor='gray')

ax.set_xlabel('x (弧度)', fontsize=12)
ax.set_ylabel('y', fontsize=12)
ax.set_title('三角函数曲线', fontsize=14, fontweight='bold')
ax.grid(True, alpha=0.3)

plt.show()
```

颜色是数据可视化中最重要的视觉元素之一，正确的颜色选择可以增强图表的表现力和可读性。Matplotlib提供了丰富的颜色选项，包括预定义的颜色名称（如'red'、'blue'、'green'等）、十六进制颜色代码（如'#FF6B6B'）、RGB元组以及颜色映射（colormap）。颜色映射在可视化连续数据时特别有用，它可以通过数值将数据映射到一系列渐变颜色上。Matplotlib内置了多种颜色映射，如'viridis'、'plasma'、'coolwarm'等，也可以使用自定义颜色映射。对于分类数据，使用对比鲜明的颜色更容易区分不同类别。了解颜色理论和颜色感知原则可以帮助创建更有效的数据可视化。

```python
fig, axes = plt.subplots(1, 2, figsize=(14, 6))

x = np.linspace(0, 1, 100)
cmaps = ['viridis', 'plasma', 'inferno', 'magma', 'cividis']

for i, cmap in enumerate(cmaps):
    y = x + i * 0.2
    axes[0].plot(x, y, color=plt.get_cmap(cmap)(0.3 + i * 0.15), 
                 linewidth=3, label=cmap)

axes[0].set_title('不同颜色映射示例', fontsize=12)
axes[0].legend(loc='upper left')
axes[0].set_xlabel('x')
axes[0].set_ylabel('y')
axes[0].grid(True, alpha=0.3)

x = np.random.rand(500)
y = np.random.rand(500)
colors = x + y

scatter = axes[1].scatter(x, y, c=colors, cmap='coolwarm', s=50, alpha=0.7)
cbar = plt.colorbar(scatter, ax=axes[1])
cbar.set_label('x + y', fontsize=11)
axes[1].set_title('颜色映射应用示例', fontsize=12)
axes[1].set_xlabel('x')
axes[1].set_ylabel('y')
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

colors = [
    '#E63946', '#F1FAEE', '#A8DADC', '#457B9D', '#1D3557',
    '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51', '#264653'
]
n = len(colors)
for i, c in enumerate(colors):
    plt.barh(i, 1, color=c, edgecolor='black', linewidth=0.5)
    plt.text(1.05, i, c, va='center', fontsize=9)
plt.xlim(0, 2)
plt.yticks(range(n), [f'颜色{i+1}' for i in range(n)])
plt.title('自定义颜色调色板', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()
```

网格线可以帮助观众更准确地读取图表中的数值，但过多的网格线可能会分散注意力。Matplotlib允许灵活控制网格线的显示，包括设置主网格和次网格、选择网格线的样式和颜色。在大多数情况下，使用淡色的虚线作为网格线是最佳实践，既能提供参考又不会过于抢眼。对于某些类型的图表（如散点图），网格线尤其有用；而对于精确值不重要的演示图表，可以省略网格线以获得更简洁的视觉效果。

```python
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

x = np.linspace(0, 10, 100)
y = np.sin(x)

axes[0].plot(x, y, linewidth=2)
axes[0].set_title('无网格', fontsize=12)
axes[0].grid(False)

axes[1].plot(x, y, linewidth=2)
axes[1].set_title('默认网格', fontsize=12)
axes[1].grid(True, alpha=0.5)

axes[2].plot(x, y, linewidth=2)
axes[2].set_title('自定义网格', fontsize=12)
axes[2].grid(True, which='major', linestyle='-', alpha=0.7, color='gray')
axes[2].grid(True, which='minor', linestyle=':', alpha=0.4, color='gray')
axes[2].minorticks_on()

plt.tight_layout()
plt.show()
```

刻度标签和刻度线的样式可以根据需要进行自定义，以创建更加清晰和专业的数据可视化。Matplotlib提供了`tick_params()`方法来调整刻度线的外观，包括长度、宽度、颜色和方向等。同时，可以使用`set_xticklabels()`和`set_yticklabels()`方法来设置自定义的刻度标签文本。对于需要显示日期或时间的数据，可以使用DateFormatter来处理时间格式。创建可读性强的刻度标签是确保图表信息正确传达的重要步骤。

```python
fig, ax = plt.subplots(figsize=(10, 6))

x = np.linspace(0, 10, 100)
y = np.exp(x / 5)

ax.plot(x, y, linewidth=2, color='#2C3E50')
ax.set_yscale('log')
ax.set_xlabel('X值', fontsize=12)
ax.set_ylabel('Y值（对数尺度）', fontsize=12)
ax.set_title('对数坐标轴示例', fontsize=14, fontweight='bold')

ax.tick_params(axis='both', which='major', labelsize=11, 
               direction='in', length=8, width=1.5)
ax.tick_params(axis='both', which='minor', labelsize=9,
               direction='in', length=4, width=1)

ax.grid(True, which='major', linestyle='-', alpha=0.6, color='lightgray')
ax.grid(True, which='minor', linestyle=':', alpha=0.4, color='lightgray')

plt.show()
```

## 文本注释与标注

文本注释是增强图表信息传达能力的重要工具，可以在图表的任意位置添加说明文字。Matplotlib提供了`ax.text()`方法来添加文本注释，可以设置文本内容、位置、字体属性和对齐方式。对于需要在图表中突出显示某些数据点或区域的情况，文本注释特别有用。专业的文本注释应该简洁明了，位置恰当，颜色与图表整体风格协调。在创建数据报告和仪表板时，合理使用文本注释可以帮助观众更快地理解图表的关键信息。

```python
fig, ax = plt.subplots(figsize=(10, 6))

x = np.linspace(0, 10, 100)
y = np.sin(x) + 2

ax.plot(x, y, linewidth=2, color='#2C3E50', label='sin(x) + 2')

ax.text(1.5, 2.8, '正弦波', fontsize=14, fontweight='bold', color='#E74C3C')
ax.text(6, 1.5, '振幅 = 1', fontsize=12, style='italic')

ax.set_xlabel('X值', fontsize=12)
ax.set_ylabel('Y值', fontsize=12)
ax.set_title('带文本注释的图表', fontsize=14, fontweight='bold')
ax.legend(loc='upper right')
ax.grid(True, alpha=0.3)

plt.show()
```

标注（Annotation）是文本注释的高级形式，它可以在文本和图表元素之间添加连接线，使得标注更加精确和有意义。在Matplotlib中，使用`ax.annotate()`方法创建标注，可以指定标注位置、目标位置、箭头样式和文本属性。标注常用于在图表中指向特定的数据点、峰值、拐点或其他重要特征。良好的标注设计应该确保箭头清晰、文本可读，并且不会遮挡重要的数据或绑图元素。

```python
fig, ax = plt.subplots(figsize=(10, 6))

x = np.linspace(0, 2 * np.pi, 200)
y1 = np.sin(x)
y2 = np.cos(x)

ax.plot(x, y1, label='sin(x)', color='#3498DB', linewidth=2)
ax.plot(x, y2, label='cos(x)', color='#E74C3C', linewidth=2)

peak_x = np.pi / 2
peak_y = 1
ax.annotate('sin(x)峰值\n(π/2, 1)', xy=(peak_x, peak_y), 
            xytext=(peak_x + 0.8, peak_y + 0.3),
            fontsize=10, ha='left',
            arrowprops=dict(arrowstyle='->', color='#3498DB', lw=1.5),
            bbox=dict(boxstyle='round,pad=0.3', facecolor='#ECF0F1', edgecolor='#3498DB'))

cross_x = np.pi / 4
cross_y = np.sin(np.pi/4)
ax.annotate('交点\n(π/4, √2/2)', xy=(cross_x, cross_y),
            xytext=(cross_x - 1.2, cross_y - 0.4),
            fontsize=10, ha='center',
            arrowprops=dict(arrowstyle='->', color='#2ECC71', lw=1.5),
            bbox=dict(boxstyle='round,pad=0.3', facecolor='#ECF0F1', edgecolor='#2ECC71'))

ax.set_xlabel('x (弧度)', fontsize=12)
ax.set_ylabel('y', fontsize=12)
ax.set_title('函数图像交点标注', fontsize=14, fontweight='bold')
ax.legend(loc='upper right')
ax.grid(True, alpha=0.3)
ax.set_xlim(0, 2*np.pi)
ax.set_ylim(-1.5, 1.5)

plt.show()
```

## 子图与布局

子图（Subplot）允许在同一个Figure中创建多个绑图区域，这在比较不同数据集或展示同一数据的不同视图时非常有用。Matplotlib提供了多种创建子图的方法，包括`subplot()`、`subplots()`、`subplot2grid()`和`gridspec`等。`subplots()`函数是最常用的方法，它返回一个Figure对象和一个Axes对象（或Axes对象数组），可以一次性创建规则排列的子图。子图之间可以共享坐标轴，从而使得跨子图的数据比较更加直观。掌握子图的创建和布局技术是创建复杂数据可视化的基础。

```python
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)
y3 = np.tan(x)
y4 = np.sin(x) * np.cos(x)

axes[0, 0].plot(x, y1, color='#E74C3C')
axes[0, 0].set_title('sin(x)')
axes[0, 0].grid(True, alpha=0.3)

axes[0, 1].plot(x, y2, color='#3498DB')
axes[0, 1].set_title('cos(x)')
axes[0, 1].grid(True, alpha=0.3)

axes[1, 0].plot(x, y3, color='#2ECC71')
axes[1, 0].set_title('tan(x)')
axes[1, 0].set_ylim(-5, 5)
axes[1, 0].grid(True, alpha=0.3)

axes[1, 1].plot(x, y4, color='#9B59B6')
axes[1, 1].set_title('sin(x)·cos(x)')
axes[1, 1].grid(True, alpha=0.3)

fig.suptitle('三角函数子图展示', fontsize=16, fontweight='bold')
plt.tight_layout(rect=[0, 0, 1, 0.95])
plt.show()
```

不规则子图布局可以通过`GridSpec`或`subplot()`函数的参数组合来实现，这对于创建非对称的复杂布局非常有用。GridSpec提供了更灵活的子图排列方式，可以指定每个子图占据的行数和列数。这种技术在创建仪表板、数据报告或需要展示不同大小图表的场景中特别有价值。创建不规则布局时，需要仔细考虑每个子图的内容和相对重要性，确保最终布局平衡且易于理解。

```python
import matplotlib.gridspec as gridspec

fig = plt.figure(figsize=(14, 10))
gs = gridspec.GridSpec(3, 3, figure=fig, height_ratios=[1, 2, 1], 
                        width_ratios=[1, 2, 1])

ax1 = fig.add_subplot(gs[0, 0])
ax2 = fig.add_subplot(gs[0, 1:])
ax3 = fig.add_subplot(gs[1, 0])
ax4 = fig.add_subplot(gs[1, 1])
ax5 = fig.add_subplot(gs[1, 2])
ax6 = fig.add_subplot(gs[2, :])

x = np.linspace(0, 10, 100)
ax1.plot(x, np.sin(x), color='#E74C3C')
ax1.set_title('子图1')
ax2.bar(['A', 'B', 'C', 'D'], [4, 7, 3, 8], color='#3498DB')
ax2.set_title('子图2')
ax3.plot(x, np.cos(x), color='#2ECC71')
ax3.set_title('子图3')
ax4.scatter(np.random.rand(50), np.random.rand(50), alpha=0.6, color='#9B59B6')
ax4.set_title('子图4')
ax5.hist(np.random.randn(200), bins=20, color='#F39C12', edgecolor='white')
ax5.set_title('子图5')
ax6.plot(x, np.tan(x), color='#1ABC9C')
ax6.set_title('子图6')
ax6.set_ylim(-5, 5)
ax6.grid(True, alpha=0.3)

fig.suptitle('GridSpec不规则布局', fontsize=16, fontweight='bold')
plt.tight_layout(rect=[0, 0, 1, 0.96])
plt.show()
```

子图间距调整是创建专业绑图的重要细节。Matplotlib提供了`subplots_adjust()`函数来调整子图之间的间距和边距。`tight_layout()`函数可以自动调整子图布局以避免元素重叠，是快速获得良好布局的便捷方法。对于更精确的控制，可以使用`constrained_layout`参数或GridSpec来管理布局。合理设置子图间距可以提高图表的可读性和美观度，特别是在需要打印或嵌入文档的场景中。

```python
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

for i in range(2):
    for j in range(2):
        axes[i, j].plot(np.random.rand(50), np.random.rand(50), 'o', alpha=0.6)
        axes[i, j].set_title(f'子图 ({i+1}, {j+1})')
        axes[i, j].grid(True, alpha=0.3)

plt.subplots_adjust(wspace=0.3, hspace=0.4, left=0.1, right=0.95, top=0.9, bottom=0.1)
plt.show()

fig, axes = plt.subplots(2, 2, figsize=(12, 10), constrained_layout=True)

for i in range(2):
    for j in range(2):
        axes[i, j].plot(np.linspace(0, 2*np.pi, 100), 
                        np.sin(np.linspace(0, 2*np.pi, 100) + i + j))
        axes[i, j].set_title(f'子图 ({i+1}, {j+1})')
        axes[i, j].grid(True, alpha=0.3)

fig.suptitle('使用constrained_layout', fontsize=16, fontweight='bold')
plt.show()
```

## 高级可视化技术

3D绑图可以展示三维数据或关系，这在科学计算、工程分析和数据科学中非常有用。Matplotlib的`mplot3d`模块提供了创建3D线图、散点图、曲面图和条形图等功能。创建3D绑图需要导入`Axes3D`类，然后使用`projection='3d'`参数创建3D坐标轴。3D绑图的关键参数包括视角（elevation和azimuth角度）、坐标轴标签、颜色和透明度等。虽然3D绑图能够展示更多信息，但也要注意避免过度使用3D效果导致的数据失真或阅读困难。

```python
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(14, 5))

ax1 = fig.add_subplot(121, projection='3d')
theta = np.linspace(-4 * np.pi, 4 * np.pi, 100)
z = np.linspace(-2, 2, 100)
r = z**2 + 1
x = r * np.sin(theta)
y = r * np.cos(theta)

ax1.plot(x, y, z, color='#E74C3C', linewidth=1.5)
ax1.set_xlabel('X')
ax1.set_ylabel('Y')
ax1.set_zlabel('Z')
ax1.set_title('3D螺旋线')

np.random.seed(42)
n = 200
x = np.random.rand(n) * 10
y = np.random.rand(n) * 10
z = np.sin(x) + np.cos(y)

ax2 = fig.add_subplot(122, projection='3d')
scatter = ax2.scatter(x, y, z, c=z, cmap='viridis', s=50, alpha=0.7)
ax2.set_xlabel('X')
ax2.set_ylabel('Y')
ax2.set_zlabel('Z')
ax2.set_title('3D散点图')
fig.colorbar(scatter, ax=ax2, shrink=0.5, label='Z值')

plt.tight_layout()
plt.show()

fig = plt.figure(figsize=(12, 5))
ax1 = fig.add_subplot(121, projection='3d')

X = np.arange(-5, 5, 0.25)
Y = np.arange(-5, 5, 0.25)
X, Y = np.meshgrid(X, Y)
R = np.sqrt(X**2 + Y**2)
Z = np.sin(R)

surf = ax1.plot_surface(X, Y, Z, cmap='coolwarm', edgecolor='none', alpha=0.8)
ax1.set_xlabel('X')
ax1.set_ylabel('Y')
ax1.set_zlabel('Z')
ax1.set_title('3D曲面图')
fig.colorbar(surf, ax=ax1, shrink=0.5, label='Z值')

ax2 = fig.add_subplot(122, projection='3d')
ax2.plot_wireframe(X, Y, Z, color='#2C3E50', linewidth=0.5, alpha=0.6)
ax2.set_xlabel('X')
ax2.set_ylabel('Y')
ax2.set_zlabel('Z')
ax2.set_title('3D线框图')

plt.tight_layout()
plt.show()
```

动态绑图和动画可以展示数据随时间的变化过程，这在演示、教育和数据监控场景中非常有价值。Matplotlib的`FuncAnimation`类提供了创建动画的功能，通过定时调用更新函数来逐帧渲染动画。动画可以保存为GIF或MP4格式，也可以实时播放。创建高质量动画需要注意帧率、流畅度和文件大小的平衡。对于长时间序列数据，可能需要采用数据聚合或采样技术来确保动画的性能和可读性。

```python
from matplotlib.animation import FuncAnimation, PillowWriter

fig, ax = plt.subplots(figsize=(10, 6))
x = np.linspace(0, 2 * np.pi, 100)
line, = ax.plot(x, np.sin(x), linewidth=2, color='#E74C3C')
ax.set_ylim(-1.5, 1.5)
ax.set_xlabel('x (弧度)', fontsize=12)
ax.set_ylabel('y', fontsize=12)
ax.set_title('正弦波动画', fontsize=14, fontweight='bold')
ax.grid(True, alpha=0.3)

def update(frame):
    y = np.sin(x + frame * 0.1)
    line.set_ydata(y)
    return line,

ani = FuncAnimation(fig, update, frames=60, interval=50, blit=True)
ani.save('sine_wave.gif', writer=PillowWriter(fps=20))
print("动画已保存为sine_wave.gif")
plt.show()

fig, ax = plt.subplots(figsize=(10, 6))
x = np.linspace(0, 10, 100)
y = np.exp(-x / 5)

ax.set_xlim(0, 10)
ax.set_ylim(-0.1, 1.1)
ax.set_xlabel('时间', fontsize=12)
ax.set_ylabel('衰减系数', fontsize=12)
ax.set_title('衰减曲线动画', fontsize=14, fontweight='bold')
ax.grid(True, alpha=0.3)
line, = ax.plot(x, y, linewidth=2, color='#3498DB')

def update_decay(frame):
    if frame < 50:
        y_data = np.exp(-x * frame / 250)
    else:
        y_data = np.exp(-x * 2)
    line.set_ydata(y_data)
    return line,

ani2 = FuncAnimation(fig, update_decay, frames=100, interval=50, blit=True)
ani2.save('decay_animation.gif', writer=PillowWriter(fps=20))
print("衰减动画已保存为decay_animation.gif")
plt.show()
```

交互式图表允许用户通过鼠标操作来探索数据，包括缩放、平移、数据提示和选择等。在Jupyter Notebook中使用`%matplotlib widget`可以创建交互式图表。Matplotlib的交互式功能包括数据光标（DataCursor）、选择事件和按键事件等。对于需要深入探索的大型数据集，交互式图表可以提供更好的用户体验。IPyWidgets与Matplotlib的结合可以创建复杂的交互式仪表板，这在数据分析和教学中非常有用。

```python
%matplotlib widget

import matplotlib.pyplot as plt
import numpy as np
from ipywidgets import interact, FloatSlider

fig, ax = plt.subplots(figsize=(8, 5))
x = np.linspace(0, 2 * np.pi, 200)
line, = ax.plot(x, np.sin(x), linewidth=2, color='#E74C3C')
ax.set_ylim(-1.5, 1.5)
ax.set_xlabel('x (弧度)', fontsize=11)
ax.set_ylabel('y', fontsize=11)
ax.grid(True, alpha=0.3)

def update_plot(freq):
    y = np.sin(x * freq)
    line.set_ydata(y)
    plt.draw()

interact(update_plot, freq=FloatSlider(value=1, min=0.5, max=3, step=0.1));

fig2, ax2 = plt.subplots(figsize=(10, 6))
np.random.seed(42)
x_data = np.random.rand(100) * 10
y_data = 2 * x_data + 1 + np.random.randn(100) * 2

scatter = ax2.scatter(x_data, y_data, c='#3498DB', s=60, alpha=0.7, edgecolors='white')
ax2.set_xlabel('X', fontsize=12)
ax2.set_ylabel('Y', fontsize=12)
ax2.set_title('交互式散点图 - 使用缩放和平移工具探索数据', fontsize=13)
ax2.grid(True, alpha=0.3)

from matplotlib.backend_bases import MouseEvent

def on_click(event):
    if event.inaxes == ax2:
        x_click, y_click = event.xdata, event.ydata
        distances = np.sqrt((x_data - x_click)**2 + (y_data - y_click)**2)
        closest_idx = np.argmin(distances)
        print(f"点击位置附近的数据点: x={x_data[closest_idx]:.2f}, y={y_data[closest_idx]:.2f}")

fig2.canvas.mpl_connect('button_press_event', on_click)
plt.show()
```

## 图像显示与处理

除了绑制数据图表，Matplotlib还可以用于显示和处理图像文件。`imshow()`函数用于显示图像，支持多种图像格式如PNG、JPG、TIFF等。图像处理功能包括颜色映射、直方图均衡化、滤波和几何变换等。Matplotlib的图像处理能力虽然不如专业的图像处理库（如PIL/OpenCV），但在数据可视化场景中已经足够使用。理解图像在Matplotlib中的表示方式（作为数组）和显示方法，对于创建包含图像元素的复合可视化非常有用。

```python
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

x = np.linspace(0, 255, 256)
gradient = np.tile(x, (100, 1))

axes[0, 0].imshow(gradient, cmap='gray', aspect='auto')
axes[0, 0].set_title('灰度渐变')
axes[0, 0].axis('off')

colors_rgb = np.zeros((256, 256, 3))
for i in range(256):
    colors_rgb[:, i, 0] = i
    colors_rgb[:, i, 1] = 255 - i
    colors_rgb[:, i, 2] = 128
colors_rgb = colors_rgb / 255

axes[0, 1].imshow(colors_rgb)
axes[0, 1].set_title('RGB渐变')
axes[0, 1].axis('off')

np.random.seed(42)
noise = np.random.rand(100, 100)
im = axes[1, 0].imshow(noise, cmap='viridis')
axes[1, 0].set_title('随机噪声')
axes[1, 0].axis('off')
fig.colorbar(im, ax=axes[1, 0], shrink=0.8)

x_grid = np.linspace(-3, 3, 100)
y_grid = np.linspace(-3, 3, 100)
X, Y = np.meshgrid(x_grid, y_grid)
Z = np.exp(-(X**2 + Y**2))

im2 = axes[1, 1].imshow(Z, extent=[-3, 3, -3, 3], cmap='plasma', origin='lower')
axes[1, 1].set_title('二维高斯分布')
axes[1, 1].set_xlabel('X')
axes[1, 1].set_ylabel('Y')
fig.colorbar(im2, ax=axes[1, 1], shrink=0.8)

plt.tight_layout()
plt.show()
```

## 绑图样式与主题

Matplotlib提供了预设的绑图样式（Style Sheets），可以快速改变图表的整体外观。这些样式定义了绑图的默认颜色、字体、线条样式等属性，使得创建风格一致的图表变得简单。常用的样式包括'seaborn'、'ggplot'、'dark_background'、'bmh'等。通过`plt.style.use()`函数可以加载样式，而`plt.style.available`列表显示了所有可用的样式名称。使用样式可以大大提高绑图效率，同时确保图表具有专业的外观。

```python
import matplotlib.pyplot as plt
import numpy as np

print("可用的绑图样式:")
for style in plt.style.available:
    print(f"  - {style}")

plt.style.use('seaborn-v0_8-whitegrid')

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

x = np.linspace(0, 10, 100)
axes[0].plot(x, np.sin(x), label='sin(x)', linewidth=2)
axes[0].plot(x, np.cos(x), label='cos(x)', linewidth=2)
axes[0].set_title('使用seaborn样式', fontsize=13)
axes[0].legend()
axes[0].grid(True, alpha=0.5)

categories = ['A', 'B', 'C', 'D']
values = [15, 28, 18, 35]
colors = plt.cm.Set2(np.linspace(0, 1, len(categories)))
axes[1].bar(categories, values, color=colors, edgecolor='gray')
axes[1].set_title('柱状图示例', fontsize=13)
axes[1].set_ylabel('数值')
axes[1].grid(axis='y', alpha=0.5)

plt.tight_layout()
plt.show()

plt.style.use('dark_background')

fig, ax = plt.subplots(figsize=(10, 6))
x = np.linspace(0, 2 * np.pi, 100)
ax.plot(x, np.sin(x), color='#E74C3C', linewidth=2, label='sin(x)')
ax.plot(x, np.cos(x), color='#3498DB', linewidth=2, label='cos(x)')
ax.set_title('深色背景主题', fontsize=14, fontweight='bold')
ax.legend(loc='upper right')
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

plt.style.use('default')
```

自定义RC参数允许对Matplotlib的默认行为进行细粒度控制。RC参数（Runtime Configuration parameters）控制着绑图的各个方面，如字体大小、线条宽度、颜色、边距等。通过修改`plt.rcParams`字典或使用`plt.rc()`函数，可以全局更改这些设置。自定义RC参数对于创建具有一致风格的图表系列或适配特定输出需求（如论文、演示文稿）非常有用。了解常用的RC参数及其默认值，可以帮助你在需要时进行有效的定制。

```python
import matplotlib as mpl

original_params = mpl.rcParams.copy()
print("部分默认RC参数:")
print(f"  字体大小: {mpl.rcParams['font.size']}")
print(f"  线条宽度: {mpl.rcParams['lines.linewidth']}")
print(f"  图像DPI: {mpl.rcParams['figure.dpi']}")
print(f"  颜色循环: {mpl.rcParams['axes.prop_cycle']}")

mpl.rcParams['font.size'] = 14
mpl.rcParams['lines.linewidth'] = 2.5
mpl.rcParams['figure.figsize'] = (10, 6)
mpl.rcParams['axes.titlesize'] = 16
mpl.rcParams['axes.labelsize'] = 13
mpl.rcParams['legend.fontsize'] = 11

fig, ax = plt.subplots()
x = np.linspace(0, 10, 100)
ax.plot(x, np.sin(x), label='sin(x)')
ax.plot(x, np.cos(x), label='cos(x)')
ax.set_title('自定义RC参数效果')
ax.legend()
plt.show()

mpl.rcParams.update(original_params)
print("\nRC参数已恢复为默认值")
```

## 文件保存与导出

Matplotlib支持将图表保存为多种图像格式，包括PNG、JPG、PDF、SVG和GIF等。不同的格式适用于不同的用途：PNG适合网页和屏幕显示，PDF适合打印和矢量输出，SVG适合需要进一步编辑的场景。保存图表使用`savefig()`函数，可以通过`dpi`参数控制图像分辨率，通过`bbox_inches`参数控制边距。对于需要透明背景的场景，可以设置`transparent=True`参数。了解不同保存选项的特点可以帮助你为不同的使用场景选择最合适的输出格式。

```python
fig, ax = plt.subplots(figsize=(8, 6))

x = np.linspace(0, 2 * np.pi, 100)
y = np.sin(x)

ax.plot(x, y, linewidth=2, color='#2C3E50')
ax.set_xlabel('x (弧度)', fontsize=12)
ax.set_ylabel('y', fontsize=12)
ax.set_title('正弦波', fontsize=14, fontweight='bold')
ax.grid(True, alpha=0.3)
ax.set_xlim(0, 2*np.pi)
ax.set_ylim(-1.5, 1.5)

plt.savefig('sine_wave.png', dpi=150, bbox_inches='tight', 
            facecolor='white', edgecolor='none')
print("PNG图像已保存: sine_wave.png")

plt.savefig('sine_wave.pdf', bbox_inches='tight')
print("PDF文件已保存: sine_wave.pdf")

plt.savefig('sine_wave.svg', bbox_inches='tight')
print("SVG文件已保存: sine_wave.svg")

plt.savefig('sine_wave.jpg', dpi=200, quality=95, bbox_inches='tight')
print("JPG图像已保存: sine_wave.jpg")

plt.show()
```

保存高分辨率图像对于打印、出版或需要放大的场景非常重要。分辨率由DPI（每英寸点数）参数控制，常见的DPI值包括72（屏幕显示）、150（一般打印）、300（高质量打印）和600（超高精度）。对于需要嵌入Word文档或PPT的图表，150-200 DPI通常足够；对于科学论文或海报，可能需要300 DPI或更高。同时保存时使用`bbox_inches='tight'`可以自动调整边距，确保图表内容完整且紧凑。

```python
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)
y3 = np.tan(x)

colors = ['#E74C3C', '#3498DB', '#2ECC71']

for i, (ax, color) in enumerate(zip(axes, colors)):
    if i == 2:
        ax.plot(x, y3, color=color, linewidth=2)
        ax.set_ylim(-5, 5)
    else:
        y = y1 if i == 0 else y2
        ax.plot(x, y, color=color, linewidth=2)
    ax.set_title(f'函数 {i+1}')
    ax.grid(True, alpha=0.3)

plt.tight_layout()

resolutions = [72, 150, 300]
for dpi in resolutions:
    filename = f'multiple_plots_dpi{dpi}.png'
    plt.savefig(filename, dpi=dpi, bbox_inches='tight')
    import os
    file_size = os.path.getsize(filename) / 1024
    print(f"DPI {dpi}: {filename} - 文件大小: {file_size:.1f} KB")

plt.show()
```

## Pandas与Matplotlib集成

Pandas与Matplotlib的紧密集成使得数据分析工作流更加流畅。Pandas的Series和DataFrame对象都有直接的`plot()`方法，可以快速创建各种类型的绑图。这种集成保持了数据处理的连贯性，用户可以在同一个环境中完成数据清洗、分析和可视化。Pandas的绑图方法底层调用Matplotlib的API，因此可以使用Matplotlib的各种定制选项来增强绑图效果。了解Pandas的绑图方法可以大大提高数据探索和报告制作的效率。

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)
dates = pd.date_range(start='2024-01-01', periods=100, freq='D')
df = pd.DataFrame({
    '日期': dates,
    '销售额': np.cumsum(np.random.randn(100)) + 500,
    '访问量': np.random.randint(1000, 5000, 100),
    '转化率': np.random.uniform(2, 8, 100)
})
df.set_index('日期', inplace=True)

print("数据预览:")
print(df.head())
print("\n数据统计:")
print(df.describe())

df.plot(subplots=True, figsize=(14, 10), layout=(2, 2), 
        title=['销售额趋势', '访问量', '转化率', '综合视图'],
        grid=True, alpha=0.8)
plt.tight_layout()
plt.show()

df[['销售额', '访问量']].plot(kind='line', figsize=(12, 5), 
                              title='销售额与访问量对比', grid=True)
plt.show()

df['销售额'].plot(kind='hist', bins=20, figsize=(10, 5), 
                   title='销售额分布', edgecolor='white', alpha=0.7)
plt.xlabel('销售额')
plt.ylabel('频率')
plt.show()

df[['转化率']].plot(kind='box', figsize=(8, 5), 
                    title='转化率箱线图')
plt.ylabel('转化率 (%)')
plt.show()

df_corr = df.corr()
print("相关性矩阵:")
print(df_corr)

df_corr.style.background_gradient(cmap='coolwarm')
plt.figure(figsize=(8, 6))
plt.imshow(df_corr, cmap='coolwarm', vmin=-1, vmax=1)
plt.colorbar(label='相关系数')
plt.xticks(range(len(df_corr.columns)), df_corr.columns, rotation=45)
plt.yticks(range(len(df_corr.columns)), df_corr.columns)
plt.title('相关性热力图')
for i in range(len(df_corr)):
    for j in range(len(df_corr)):
        plt.text(j, i, f'{df_corr.iloc[i, j]:.2f}', ha='center', va='center', 
                 color='white' if abs(df_corr.iloc[i, j]) > 0.5 else 'black')
plt.tight_layout()
plt.show()
```

## 统计图表

箱线图是展示数据分布特征的重要工具，可以同时显示数据的中心趋势、离散程度和异常值。在Matplotlib中，使用`boxplot()`函数创建箱线图。箱线图的五数概括（最小值、Q1、中位数、Q3、最大值）加上异常值，为理解数据分布提供了丰富的信息。对于比较多个组别的分布差异，箱线图是非常有效的可视化工具。结合小提琴图或散点图，可以创建更加丰富的数据分布展示。

```python
np.random.seed(42)
data1 = np.random.normal(50, 10, 100)
data2 = np.random.normal(60, 15, 100)
data3 = np.random.normal(45, 8, 100)
data = [data1, data2, data3]

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

bp = axes[0].boxplot(data, labels=['组A', '组B', '组C'], patch_artist=True)
colors = ['#FF6B6B', '#4ECDC4', '#45B7D1']
for patch, color in zip(bp['boxes'], colors):
    patch.set_facecolor(color)
    patch.set_alpha(0.7)
axes[0].set_title('分组箱线图', fontsize=13)
axes[0].set_ylabel('数值')
axes[0].grid(axis='y', alpha=0.3)

parts = axes[1].violinplot(data, positions=[1, 2, 3], showmeans=True, showmedians=True)
for pc in parts['bodies']:
    pc.set_facecolor('#3498DB')
    pc.set_alpha(0.7)
axes[1].set_xticks([1, 2, 3])
axes[1].set_xticklabels(['组A', '组B', '组C'])
axes[1].set_title('小提琴图', fontsize=13)
axes[1].set_ylabel('数值')
axes[1].grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.show()
```

热力图是展示矩阵数据的有效方式，特别适合显示相关性、密度或聚类结果。Matplotlib的`imshow()`函数结合颜色映射可以创建热力图。Seaborn库提供了更高层次的热力图功能，包括聚类热力图和注释功能。在数据分析和机器学习中，热力图是展示特征相关性、混淆矩阵和基因表达数据的常用工具。选择合适的颜色映射对于热力图的可读性至关重要，常见的做法是使用发散型颜色映射（如coolwarm）来区分正负值。

```python
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

np.random.seed(42)
data = np.random.rand(10, 12)
data = (data - 0.5) * 2

fig, axes = plt.subplots(1, 2, figsize=(14, 6))

im1 = axes[0].imshow(data, cmap='coolwarm', aspect='auto', vmin=-1, vmax=1)
axes[0].set_title('随机矩阵热力图', fontsize=13)
axes[0].set_xlabel('列')
axes[0].set_ylabel('行')
fig.colorbar(im1, ax=axes[0], shrink=0.8, label='值')

data_df = pd.DataFrame(data, 
                       index=[f'行{i+1}' for i in range(10)],
                       columns=[f'列{j+1}' for j in range(12)])

im2 = axes[1].imshow(data_df.values, cmap='viridis', aspect='auto')
axes[1].set_xticks(range(12))
axes[1].set_xticklabels(data_df.columns, rotation=45)
axes[1].set_yticks(range(10))
axes[1].set_yticklabels(data_df.index)
axes[1].set_title('带标签的热力图', fontsize=13)
fig.colorbar(im2, ax=axes[1], shrink=0.8, label='值')

for i in range(10):
    for j in range(12):
        val = data_df.iloc[i, j]
        text_color = 'white' if abs(val) > 0.5 else 'black'
        axes[1].text(j, i, f'{val:.1f}', ha='center', va='center', 
                     fontsize=7, color=text_color)

plt.tight_layout()
plt.show()
```

## 地理数据绑图

Matplotlib可以与地图库结合创建地理可视化，如绑定Basemap、Cartopy或Geopandas。这些库提供了坐标转换、地图投影和地理边界等功能。创建地理可视化需要准备地理数据文件（如Shapefile、GeoJSON格式），然后使用相应的库进行绑图。地理数据可视化在环境科学、城市规划、流行病学等领域有广泛应用。结合颜色映射和标记，可以展示人口分布、气候变化、疫情传播等地理相关信息。

```python
try:
    import geopandas as gpd
    world = gpd.read_file(gpd.datasets.get_path('naturalearth_lowres'))
    
    fig, ax = plt.subplots(figsize=(14, 7))
    world.plot(ax=ax, color='lightgray', edgecolor='white', linewidth=0.5)
    ax.set_title('世界地图（Geopandas示例）', fontsize=14)
    ax.set_xlabel('经度')
    ax.set_ylabel('纬度')
    plt.tight_layout()
    plt.show()
except ImportError:
    print("Geopandas未安装，跳过地理绑图示例")
    print("可以使用以下命令安装: pip install geopandas")

fig, ax = plt.subplots(figsize=(12, 8))
ax.set_xlim(-180, 180)
ax.set_ylim(-90, 90)
ax.axhline(y=0, color='gray', linewidth=0.5, linestyle='--')
ax.axvline(x=0, color='gray', linewidth=0.5, linestyle='--')
ax.grid(True, alpha=0.3, linestyle=':')
ax.set_xlabel('经度', fontsize=12)
ax.set_ylabel('纬度', fontsize=12)
ax.set_title('简化经纬网格', fontsize=14, fontweight='bold')
plt.show()
```

## 性能优化与最佳实践

对于处理大型数据集，Matplotlib的性能优化变得尤为重要。绑制数百万个数据点会导致渲染时间过长和内存占用过高。常用的优化策略包括数据采样（只绑制部分数据点）、使用`line2d`的数组属性、禁用某些渲染特性（如抗锯齿）等。对于实时绑图场景，可以考虑使用更新而非重新创建的方法来减少开销。了解Matplotlib的渲染流程可以帮助识别性能瓶颈并进行针对性优化。

```python
import matplotlib.pyplot as plt
import numpy as np
import time

np.random.seed(42)
n_points = 1000000
x_large = np.random.rand(n_points)
y_large = np.random.rand(n_points)

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

start = time.time()
axes[0].scatter(x_large, y_large, s=1, alpha=0.5)
print(f"直接散点图绑制时间: {time.time() - start:.3f}秒")
axes[0].set_title(f'完整数据 ({n_points//1000}K点)', fontsize=12)
axes[0].set_xlabel('X')
axes[0].set_ylabel('Y')

sample_size = 10000
indices = np.random.choice(n_points, sample_size, replace=False)
x_sample = x_large[indices]
y_sample = y_large[indices]

start = time.time()
axes[1].scatter(x_sample, y_sample, s=5, alpha=0.5, color='coral')
print(f"采样后绑制时间: {time.time() - start:.3f}秒")
axes[1].set_title(f'采样数据 ({sample_size//1000}K点)', fontsize=12)
axes[1].set_xlabel('X')
axes[1].set_ylabel('Y')

plt.tight_layout()
plt.show()

fig, ax = plt.subplots(figsize=(10, 6))
x = np.linspace(0, 10, 10000)
y = np.sin(x) + np.random.randn(10000) * 0.1

start = time.time()
ax.plot(x, y, linewidth=0.5, alpha=0.7)
print(f"线图绑制时间: {time.time() - start:.3f}秒")
ax.set_title('大数据集线图（10K点）', fontsize=12)
plt.show()
```

代码组织与可读性是创建可维护可视化代码的重要方面。良好的代码习惯包括使用有意义的变量名、将重复的配置抽象为函数、使用注释解释复杂逻辑、按功能组织代码结构等。将绑图代码封装为函数可以提高代码的复用性，而使用配置文件可以便于调整可视化参数。对于需要生成大量图表的项目，建立标准化的绑图模板可以确保视觉一致性并提高开发效率。

```python
import matplotlib.pyplot as plt
import numpy as np

def create_styled_figure(figsize=(10, 6), title=None, xlabel=None, ylabel=None):
    """创建带有标准样式的图表"""
    fig, ax = plt.subplots(figsize=figsize)
    ax.set_facecolor('#FAFAFA')
    ax.grid(True, alpha=0.4, linestyle='-', linewidth=0.5)
    ax.tick_params(colors='#333333')
    
    if title:
        ax.set_title(title, fontsize=14, fontweight='bold', pad=15)
    if xlabel:
        ax.set_xlabel(xlabel, fontsize=11)
    if ylabel:
        ax.set_ylabel(ylabel, fontsize=11)
    
    return fig, ax

def plot_data_with_confidence(ax, x, y, yerr=None, label=None, 
                              color='steelblue', alpha=0.3):
    """绑制带置信区间的数据线"""
    line, = ax.plot(x, y, color=color, linewidth=2, label=label)
    if yerr is not None:
        ax.fill_between(x, y - yerr, y + yerr, color=color, alpha=alpha)
    return line

fig, ax = create_styled_figure(figsize=(12, 6), title='带置信区间的趋势图',
                                xlabel='时间', ylabel='测量值')

x = np.linspace(0, 10, 50)
y = np.sin(x) + 1
yerr = 0.2 + 0.1 * np.random.rand(50)

plot_data_with_confidence(ax, x, y, yerr=yerr, label='测量值', 
                          color='#E74C3C')

ax.legend(loc='upper right', fontsize=10)
ax.set_xlim(0, 10)
ax.set_ylim(0, 2.5)
plt.tight_layout()
plt.show()
```

## 常见问题与解决方案

在日常使用Matplotlib绑图时，经常会遇到一些常见问题，如中文显示乱码、图形元素遮挡、布局不合理等。中文字体问题是最常遇到的问题之一，可以通过设置字体为支持中文的字体（如SimHei、Microsoft YaHei等）来解决。图形元素遮挡通常可以通过调整坐标轴范围、使用透明度和精心设计布局来避免。了解这些常见问题的解决方案可以大大提高绑图效率，避免在简单问题上浪费过多时间。

```python
import matplotlib.pyplot as plt
import numpy as np

plt.rcParams['font.sans-serif'] = ['SimHei', 'Hiragino Sans GB', 'Microsoft YaHei', 'WenQuanYi Micro Hei']
plt.rcParams['axes.unicode_minus'] = False

fig, ax = plt.subplots(figsize=(10, 6))
x = np.linspace(0, 10, 100)
y = np.sin(x)

ax.plot(x, y, linewidth=2, color='#2C3E50')
ax.set_xlabel('X轴 (时间)', fontsize=12)
ax.set_ylabel('Y轴 (振幅)', fontsize=12)
ax.set_title('中文标题测试', fontsize=14, fontweight='bold')
ax.grid(True, alpha=0.3)
plt.show()

fig, ax = plt.subplots(figsize=(10, 6))
x = np.linspace(0, 2*np.pi, 100)
y1 = np.sin(x)
y2 = np.cos(x)

ax.plot(x, y1, label='正弦函数 sin(x)', linewidth=2)
ax.plot(x, y2, label='余弦函数 cos(x)', linewidth=2)
ax.legend(loc='upper right', fontsize=10, framealpha=0.9)

ax.set_xlabel('x (弧度)', fontsize=12)
ax.set_ylabel('y', fontsize=12)
ax.set_title('三角函数可视化', fontsize=14, fontweight='bold')
ax.grid(True, alpha=0.3)
ax.set_xlim(0, 2*np.pi)
ax.set_ylim(-1.2, 1.2)

plt.tight_layout()
plt.show()
```

## 总结

Matplotlib作为Python生态系统中最重要的数据可视化库，提供了丰富而灵活的工具来创建各种类型的绑图。从简单的折线图到复杂的3D可视化，从静态图像到交互式动画，Matplotlib几乎可以满足所有绑图需求。掌握Matplotlib的核心概念，包括Figure、Axes、Axis对象的关系，以及各种绑图函数的使用方法，是创建有效数据可视化的基础。同时，了解高级功能如图形定制、动画制作、性能优化等，可以帮助你创建更加专业和高效的可视化作品。在实际应用中，结合Pandas等