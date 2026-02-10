# A股个股K线可视化详解

K线图又称蜡烛图，是股票市场中最为重要的技术分析图表之一，最早起源于日本德川幕府时代的米市交易。K线能够直观地展示每个交易周期内的四个关键价格：开盘价、最高价、最低价和收盘价，通过实体部分和上下影线的组合，直观反映市场多空力量的博弈过程。在A股市场中，K线图被广泛应用于股票、期货、期权等金融衍生品的技术分析，是投资者进行市场研判的核心工具。掌握K线可视化技术，不仅能够帮助投资者更好地理解市场走势，还能够为量化交易策略的开发提供重要的数据支撑。现代金融市场中，K线分析已经形成了一套完整的理论体系，包括各种K线形态、组合形态以及与各类技术指标的配合使用方法。

## K线图基础概念

K线的结构由实体部分和影线部分组成。实体部分表示开盘价与收盘价之间的价格区间，当收盘价高于开盘价时，实体通常用红色或空心表示，代表多方占优的上涨行情；当收盘价低于开盘价时，实体通常用绿色或实心表示，代表空方占优的下跌行情。上下影线则分别表示该周期内的最高价和最低价与开盘收盘价的关系，上影线的顶端代表周期内的最高价格，下影线的底端代表周期内的最低价格。影线的长度反映了市场在该方向上的波动力度，较长的上影线往往意味着上方存在较大抛压，而较长的下影线则可能表示下方有较强的支撑。通过对K线实体大小、影线长度的观察，投资者可以判断市场的短期趋势变化和多空双方的力量对比。

K线按照时间周期可以划分为多种类型，常见的有日K线、周K线、月K线以及分钟K线等。日K线反映每个交易日的价格变动，是最常用的K线类型；周K线以周为单位汇总数据，能够过滤掉短期噪声，更清晰地展示中期趋势；月K线则用于分析长期走势，帮助投资者把握市场的大方向。分钟K线如5分钟、15分钟、30分钟、60分钟等则主要用于日内交易分析，帮助短线交易者捕捉精确的入场和出场时机。不同周期的K线组合分析，可以帮助投资者建立多时间维度的分析框架，提高交易决策的准确性。在实际应用中，投资者通常会将长周期K线用于判断趋势方向，短周期K线用于选择具体的入场时机。

K线形态分析是技术分析的重要组成部分，包含了大量经过市场验证的经典图形。常见的单根K线形态包括锤头线、吊颈线、十字星、早晨之星、黄昏之星等，每种形态都蕴含着特定的市场含义。例如，锤头线通常出现在下跌趋势的末端，预示着可能出现的反转信号；而黄昏之星则通常出现在上升趋势的末端，是潜在见顶的警告信号。K线组合形态则更加复杂，如红三兵、黑三鸦、乌云盖顶、曙光初现等，需要多根K线共同构成才能形成有效的技术信号。掌握这些K线形态的识别方法，对于投资者提高市场判断能力具有重要意义。然而需要注意的是，K线形态并非万能的，它只是技术分析的工具之一，在实际应用中还需要结合成交量、均线系统、技术指标等多种因素进行综合判断。

## 数据获取与准备

获取A股市场数据是进行K线可视化的第一步，目前主要有三种常用方式。第一种是通过证券公司或金融数据服务商提供的API接口获取，如东方财富、同花顺等平台都提供了相应的数据接口；第二种是使用Python的第三方库直接从网络获取免费或付费的金融数据，如akshare、tushare、baostock等；第三种是使用专业数据供应商的CSV或数据库文件导入。在选择数据获取方式时，需要考虑数据的及时性、准确性、完整性以及成本等因素。对于个人投资者和学习研究者而言，akshare和tushare等免费开源库是最为便捷的选择，它们提供了丰富的A股历史数据和实时行情接口，能够满足大多数分析和研究需求。这些库通常支持获取股票的日线、周线、月线以及分钟线数据，并包含了复权因子、涨跌停价格等重要信息。

数据预处理是确保K线可视化准确性的关键步骤。原始股票数据通常需要经过复权处理，以消除分红送股等因素对股价的影响，使历史价格具有可比性。前复权是将历史价格按照最新的复权因子进行调整，使得历史价格与当前价格处于同一水平，便于进行长期趋势分析和收益率计算；后复权则是将当前价格按照历史复权因子进行调整，使得历史价格保持不变。两种复权方式各有适用场景，前复权更适合技术分析和趋势判断，后复权则更适合价值投资和分红收益计算。在进行K线可视化之前，还需要对数据进行缺失值处理、异常值检测、时间范围筛选等操作，确保数据的完整性和准确性。对于分钟级别的高频数据，还需要注意交易时间的过滤，去除午间休市、集合竞价等非连续交易时段的虚假数据点。

```python
import akshare as ak
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

stock_code = "000001"
stock_name = "平安银行"

stock_zh_a_hist_df = ak.stock_zh_a_hist(symbol=stock_code, period="daily", 
                                         start_date="20230101", end_date="20241231",
                                         adjust="qfq")
print("原始数据前5行:")
print(stock_zh_a_hist_df.head())
print("\n数据列信息:")
print(stock_zh_a_hist_df.dtypes)
print("\n数据统计信息:")
print(stock_zh_a_hist_df.describe())

stock_zh_a_hist_df.columns = ['日期', '开盘', '收盘', '最高', '最低', '成交量', '成交额', '振幅', '涨跌幅', '涨跌额', '换手率']
stock_zh_a_hist_df['日期'] = pd.to_datetime(stock_zh_a_hist_df['日期'])
stock_zh_a_hist_df.set_index('日期', inplace=True)
stock_zh_a_hist_df = stock_zh_a_hist_df.sort_index()

print("\n处理后的数据前5行:")
print(stock_zh_a_hist_df.head())
print(f"\n数据时间范围: {stock_zh_a_hist_df.index.min()} 至 {stock_zh_a_hist_df.index.max()}")
print(f"数据总条数: {len(stock_zh_a_hist_df)}")

recent_20 = stock_zh_a_hist_df.tail(20).copy()
print("\n最近20个交易日数据:")
print(recent_20[['开盘', '收盘', '最高', '最低', '成交量']])
```

使用tushare获取A股数据是另一个流行的选择。tushare是国内最知名的金融数据开源项目之一，提供了完善的A股数据接口，包括日线数据、周线数据、分钟数据、财务数据、复权因子等丰富的数据类型。使用tushare需要先注册获取token，但免费版本已经能够满足大多数个人用户的需求。tushare的数据质量较高，更新及时，是进行量化研究和数据分析的得力工具。除了标准的价格数据外，tushare还提供了丰富的衍生数据，如行业分类、概念板块、股东信息、业绩预告等，为多维度的市场分析提供了数据支持。在实际应用中，可以将tushare获取的基础数据与akshare的数据进行交叉验证，以确保数据的准确性。

```python
import tushare as ts
import pandas as pd

pro = ts.pro_api('your_token_here')

stock_code = "000001.SZ"
df = pro.daily(ts_code=stock_code, start_date='20230101', end_date='20241231')
df['trade_date'] = pd.to_datetime(df['trade_date'])
df.set_index('trade_date', inplace=True)
df = df.sort_index()

df.rename(columns={
    'open': '开盘',
    'close': '收盘',
    'high': '最高',
    'low': '最低',
    'vol': '成交量',
    'amount': '成交额'
}, inplace=True)

print("Tushare获取的数据:")
print(df.head())
print(f"\n数据时间范围: {df.index.min()} 至 {df.index.max()}")
```

多股票数据的批量获取在实际分析中经常需要用到，比如需要同时分析同一行业内多只股票的表现，或者需要构建股票池进行策略回测。使用akshare或tushare的批量接口，可以高效地获取多只股票的历史数据，并将其整合为统一格式的DataFrame进行处理。在批量获取数据时，需要注意API的调用频率限制，合理设置请求间隔，避免触发服务器的限流机制。对于大规模的数据获取需求，可以考虑使用异步请求或多线程技术来提高效率。同时，建议将获取的数据本地化存储，建立个人的金融数据库，既可以减少重复请求，又能够保证数据的历史完整性。

```python
import akshare as ak
import pandas as pd
from tqdm import tqdm
import time

stock_list = ['000001', '000002', '000003', '000004', '000005']

def get_stock_data(symbol):
    try:
        df = ak.stock_zh_a_hist(symbol=symbol, period="daily", 
                                start_date="20230101", end_date="20241231",
                                adjust="qfq")
        df['symbol'] = symbol
        return df
    except Exception as e:
        print(f"获取 {symbol} 数据失败: {e}")
        return None

all_data = []
for symbol in tqdm(stock_list, desc="获取股票数据"):
    df = get_stock_data(symbol)
    if df is not None:
        all_data.append(df)
    time.sleep(0.5)

combined_df = pd.concat(all_data, ignore_index=True)
combined_df['日期'] = pd.to_datetime(combined_df['日期'])
combined_df.set_index('日期', inplace=True)
combined_df = combined_df.sort_index()

print(f"\n合并后的数据总量: {len(combined_df)} 条")
print(f"涉及股票数量: {combined_df['symbol'].nunique()} 只")
print("\n各股票数据条数:")
print(combined_df.groupby('symbol').size())
```

## mplfinance库详解

mplfinance是专门用于金融数据可视化的Matplotlib扩展库，它提供了丰富的K线图绑制功能，包括标准K线图、均价图、成交量图、技术指标叠加等多种功能。mplfinance的设计理念是将复杂的金融图表绑制过程简化，让用户能够以最少的代码绑制出专业级别的金融图表。该库底层基于Matplotlib实现，因此继承了Matplotlib的高度可定制性，用户可以根据需要调整图表的各种视觉元素。mplfinance原生支持pandas DataFrame格式的数据输入，只要数据包含开盘、最高、最低、收盘和成交量这几列，就可以直接进行K线绑制。库的名称来源于"Matplotlib Financial"的缩写，它已经成为Python金融数据分析领域最受欢迎的绑图工具之一。

安装mplfinance非常简单，可以通过pip或conda命令完成安装。安装完成后，需要确保pandas版本兼容，推荐使用pandas 1.0以上的版本以获得最佳兼容性。在导入库时，通常使用`import mplfinance as mpf`的简写方式，这样可以使代码更加简洁。mplfinance提供了两种主要的绑图模式：常规模式和面板模式。常规模式下，K线、成交量和技术指标会在同一个图表区域显示；面板模式则支持将不同元素分开展示在不同的子图中，使图表更加清晰易读。此外，mplfinance还支持交互式图表和动画效果的创建，满足了不同场景下的可视化需求。

```bash
pip install mplfinance
pip install --upgrade mplfinance
conda install -c conda-forge mplfinance
```

```python
import mplfinance as mpf
import pandas as pd
import akshare as ak

stock_code = "000001"
df = ak.stock_zh_a_hist(symbol=stock_code, period="daily", 
                          start_date="20240101", end_date="20241231",
                          adjust="qfq")

df['日期'] = pd.to_datetime(df['日期'])
df.set_index('日期', inplace=True)
df = df.sort_index()

df = df.rename(columns={
    '开盘': 'Open',
    '最高': 'High',
    '最低': 'Low',
    '收盘': 'Close',
    '成交量': 'Volume',
    '成交额': 'Amount',
    '振幅': 'Amplitude',
    '涨跌幅': 'Change',
    '涨跌额': 'ChangePercent',
    '换手率': 'Turnover'
})

print("数据准备完成:")
print(df[['Open', 'High', 'Low', 'Close', 'Volume']].head())
print(f"\n数据时间范围: {df.index[0]} 至 {df.index[-1]}")
print(f"数据总条数: {len(df)}")

s = mpf.make_mpf_style(base_mpf_style='binance', 
                        rc={'figure.facecolor': '#1a1a2e',
                            'axes.facecolor': '#16213e',
                            'edgecolor': '#0f3460',
                            'gridcolor': '#1f4068',
                            'text.color': '#e0e0e0',
                            'axes.labelcolor': '#e0e0e0',
                            'xtick.color': '#e0e0e0',
                            'ytick.color': '#e0e0e0'})

mpf.plot(df[-60:],
         type='candle',
         style='charles',
         title='平安银行 K线图',
         ylabel='价格 (元)',
         volume=True,
         mav=(5, 10, 20),
         figsize=(14, 10),
         savefig='stock_candle_basic.png')
print("\n基础K线图已保存为 stock_candle_basic.png")
```

mplfinance支持多种预设样式，用户可以根据个人喜好或报告要求选择合适的样式。常用的预设样式包括`'charles'`、`'yahoo'`、`'binance'`、`'mike'`、`'nightclouds'`等，每种样式都有其独特的配色方案和视觉风格。`'charles'`样式以白色背景为主，红色表示上涨，绿色表示下跌，是A股市场最常用的显示方式；`'yahoo'`和`'binance'`样式则使用暗色背景，K线颜色也相应调整，更适合长时间观察和专业交易场景；`'nightclouds'`样式则提供了一种更为柔和的暗色配色方案，视觉体验较为舒适。用户也可以通过`make_mpf_style`函数创建自定义样式，完全控制图表的各种颜色和样式参数，这对于需要统一视觉风格的专业报告非常重要。

```python
import mplfinance as mpf
import pandas as pd
import akshare as ak

stock_code = "000001"
df = ak.stock_zh_a_hist(symbol=stock_code, period="daily", 
                          start_date="20240101", end_date="20241231",
                          adjust="qfq")
df['日期'] = pd.to_datetime(df['日期'])
df.set_index('日期', inplace=True)
df = df.sort_index()
df = df.rename(columns={
    '开盘': 'Open', '最高': 'High', '最低': 'Low', 
    '收盘': 'Close', '成交量': 'Volume'
})

styles = ['charles', 'yahoo', 'binance', 'nightclouds', 'mike']

for style_name in styles:
    try:
        mpf.plot(df[-30:],
                 type='candle',
                 style=style_name,
                 title=f'{style_name} 样式',
                 ylabel='Price',
                 volume=True,
                 figsize=(12, 8),
                 savefig=f'stock_style_{style_name}.png')
        print(f"{style_name} 样式图已保存")
    except Exception as e:
        print(f"{style_name} 样式失败: {e}")

custom_style = mpf.make_mpf_style(
    base_mpf_style='charles',
    marketcolors=mpf.make_marketcolors(
        up='#ff5500',
        down='#00aa00',
        edge='inherit',
        wick='inherit',
        volume='in',
    ),
    gridstyle='-',
    gridcolor='#cccccc',
    facecolor='#f0f0f0',
    figcolor='#ffffff',
    rc={'font.size': 10}
)

mpf.plot(df[-30:],
         type='candle',
         style=custom_style,
         title='自定义样式 K线图',
         ylabel='价格',
         volume=True,
         figsize=(12, 8),
         savefig='stock_custom_style.png')
print("自定义样式图已保存")
```

mplfinance的高级功能包括多周期K线叠加、技术指标绘制、自定义图形标记等。通过配置不同的参数，用户可以在同一图表中绑制多个周期的K线，或者将各种技术指标如移动平均线、MACD、RSI、布林带等叠加在K线图上。此外，mplfinance还支持添加水平线、趋势线、斐波那契回调线等辅助图形，以及在K线上标记买卖点或特殊K线形态。这些功能使得mplfinance不仅能够绑制基础的K线图，还能够满足专业技术分析的可视化需求。在使用这些高级功能时，需要合理规划图表布局，避免元素过多导致图表混乱影响分析效果。

```python
import mplfinance as mpf
import pandas as pd
import akshare as ak
import numpy as np

stock_code = "000001"
df = ak.stock_zh_a_hist(symbol=stock_code, period="daily", 
                          start_date="20240101", end_date="20241231",
                          adjust="qfq")
df['日期'] = pd.to_datetime(df['日期'])
df.set_index('日期', inplace=True)
df = df.sort_index()
df = df.rename(columns={
    '开盘': 'Open', '最高': 'High', '最低': 'Low', 
    '收盘': 'Close', '成交量': 'Volume'
})

df['MA5'] = df['Close'].rolling(window=5).mean()
df['MA10'] = df['Close'].rolling(window=10).mean()
df['MA20'] = df['Close'].rolling(window=20).mean()

def calculate_macd(close, fast=12, slow=26, signal=9):
    ema_fast = close.ewm(span=fast, adjust=False).mean()
    ema_slow = close.ewm(span=slow, adjust=False).mean()
    dif = ema_fast - ema_slow
    dea = dif.ewm(span=signal, adjust=False).mean()
    macd = (dif - dea) * 2
    return dif, dea, macd

df['DIF'], df['DEA'], df['MACD'] = calculate_macd(df['Close'])

apds = [
    mpf.make_addplot(df['MA5'], color='#FF6500', width=1, label='MA5'),
    mpf.make_addplot(df['MA10'], color='#2060DD', width=1, label='MA10'),
    mpf.make_addplot(df['MA20'], color='#10AA10', width=1, label='MA20'),
]

mc = mpf.make_marketcolors(up='#FF5500', down='#00AA00', inherit=True)
s = mpf.make_mpf_style(marketcolors=mc)

panel = 2
apds.append(mpf.make_addplot(df['DIF'], panel=panel, color='#FF6500', secondary_y=False, ylabel='MACD'))
apds.append(mpf.make_addplot(df['DEA'], panel=panel, color='#2060DD', secondary_y=False))
apds.append(mpf.make_addplot(df['MACD'], type='bar', panel=panel, color='#666666', secondary_y=False))

mpf.plot(df[-120:],
         type='candle',
         style='charles',
         title='平安银行 均线与MACD',
         ylabel='价格',
         volume=True,
         addplot=apds,
         panel_ratios=(4, 2),
         figsize=(14, 12),
         tight_layout=True,
         savefig='stock_with_indicators.png')
print("均线与MACD叠加图已保存")
```

## Plotly交互式K线图

Plotly是另一个强大的Python绑图库，它最大的优势在于能够创建高度交互式的Web图表，特别适合需要用户交互探索的数据可视化场景。与mplfinance相比，Plotly提供了更加现代化的图表界面，支持缩放、平移、数据悬停提示、模式切换等交互功能。在K线图可视化中，Plotly的交互特性特别有价值，用户可以通过鼠标操作深入查看特定时间段的价格细节，或者在不同的时间周期之间快速切换。Plotly Charts Studio还提供了在线编辑和分享功能，可以方便地将图表导出为HTML文件或嵌入到网页中。此外，Plotly的图表可以保存为静态图像（PNG、SVG、PDF等），满足报告和文档的需求。

```bash
pip install plotly
pip install --upgrade plotly
```

```python
import plotly.graph_objects as go
import pandas as pd
import akshare as ak

stock_code = "000001"
df = ak.stock_zh_a_hist(symbol=stock_code, period="daily", 
                          start_date="20240101", end_date="20241231",
                          adjust="qfq")

df['日期'] = pd.to_datetime(df['日期'])
df = df.rename(columns={
    '开盘': 'Open', '最高': 'High', '最低': 'Low', 
    '收盘': 'Close', '成交量': 'Volume'
})
df = df.sort_values('日期')

fig = go.Figure(data=[go.Candlestick(
    x=df['日期'],
    open=df['Open'],
    high=df['High'],
    low=df['Low'],
    close=df['Close'],
    name='K线',
    increasing_line_color='#FF5500',
    decreasing_line_color='#00AA00'
)])

fig.update_layout(
    title='平安银行 K线图',
    yaxis_title='价格 (元)',
    xaxis_title='日期',
    template='plotly_dark',
    xaxis_rangeslider_visible=False,
    height=700,
    width=1200
)

fig.show()
fig.write_html('stock_kline_plotly.html')
print("交互式K线图已保存为 stock_kline_plotly.html")
fig.write_image('stock_kline_plotly.png', scale=2)
print("静态图已保存为 stock_kline_plotly.png")
```

Plotly支持丰富的图表定制选项，可以调整K线的颜色、样式、坐标轴、图例、注释等各种元素。对于A股市场，通常将上涨K线设为红色，下跌K线设为绿色，以符合国内投资者的阅读习惯。Plotly还支持添加多种叠加图层，包括移动平均线、布林带、成交量柱状图、技术指标等，每种元素都可以单独配置样式和显示属性。通过合理使用这些定制功能，可以创建既美观又信息丰富的专业K线图表。同时，Plotly还提供了按钮、下拉菜单等交互控件，用户可以通过这些控件动态切换显示内容或调整时间范围，大大增强了图表的可操作性。

```python
import plotly.graph_objects as go
import pandas as pd
import akshare as ak

stock_code = "000001"
df = ak.stock_zh_a_hist(symbol=stock_code, period="daily", 
                          start_date="20240101", end_date="20241231",
                          adjust="qfq")

df['日期'] = pd.to_datetime(df['日期'])
df = df.rename(columns={
    '开盘': 'Open', '最高': 'High', '最低': 'Low', 
    '收盘': 'Close', '成交量': 'Volume'
})
df = df.sort_values('日期')
df['MA5'] = df['Close'].rolling(window=5).mean()
df['MA10'] = df['Close'].rolling(window=10).mean()
df['MA20'] = df['Close'].rolling(window=20).mean()

fig = go.Figure()

fig.add_trace(go.Candlestick(
    x=df['日期'],
    open=df['Open'],
    high=df['High'],
    low=df['Low'],
    close=df['Close'],
    name='K线',
    increasing_line_color='#FF5500',
    decreasing_line_color='#00AA00'
))

fig.add_trace(go.Scatter(
    x=df['日期'],
    y=df['MA5'],
    mode='lines',
    name='MA5',
    line=dict(color='#FF6500', width=1)
))

fig.add_trace(go.Scatter(
    x=df['日期'],
    y=df['MA10'],
    mode='lines',
    name='MA10',
    line=dict(color='#2060DD', width=1)
))

fig.add_trace(go.Scatter(
    x=df['日期'],
    y=df['MA20'],
    mode='lines',
    name='MA20',
    line=dict(color='#10AA10', width=1)
))

fig.add_trace(go.Bar(
    x=df['日期'],
    y=df['Volume'],
    name='成交量',
    marker_color='rgba(128, 128, 128, 0.5)',
    yaxis='y2'
))

fig.update_layout(
    title='平安银行 均线与成交量',
    yaxis_title='价格',
    xaxis_title='日期',
    template='plotly_dark',
    xaxis_rangeslider_visible=False,
    height=800,
    width=1400,
    yaxis2=dict(
        title='成交量',
        overlaying='y',
        side='right',
        showgrid=False
    ),
    legend=dict(
        orientation='h',
        yanchor='bottom',
        y=1.02,
        xanchor='right',
        x=1
    )
)

fig.show()
fig.write_html('stock_with_ma_plotly.html')
print("带均线的交互式K线图已保存")
```

## 技术指标可视化

技术指标是股票技术分析的重要组成部分，它们通过对价格和成交量等基础数据进行数学运算，生成各种曲线或数值来辅助投资者判断市场趋势和买卖时机。常用的技术指标包括移动平均线（MA）、指数移动平均线（EMA）、平滑异同移动平均线（MACD）、相对强弱指标（RSI）、随机指标（KDJ）、布林带（BOLL）等。每个技术指标都有其特定的计算方法和市场含义，投资者通常会同时观察多个指标来提高判断的准确性。在K线图中，技术指标通常以叠加曲线或独立面板的形式展示，与K线图形成互补的信息展示。技术指标的参数设置对指标的表现有很大影响，不同的股票和市场环境可能需要不同的参数配置。

移动平均线是最基础也是最常用的技术指标之一，它通过计算一定周期内的收盘价平均值来平滑价格波动，消除短期噪音，显示市场的主要趋势。简单移动平均线（SMA）是对各周期的收盘价进行简单算术平均；指数移动平均线（EMA）则给予近期价格更高的权重，对价格变化反应更加灵敏。在A股市场中，常用的短期均线包括5日、10日均线，用于观察短期趋势；中期均线如20日、30日、60日均线用于判断中期趋势；长期均线如120日、250日均线则用于判断长期趋势。均线系统的金叉死叉是常用的交易信号，当短期均线上穿长期均线时形成金叉，被视为买入信号；反之则形成死叉，被视为卖出信号。

```python
import mplfinance as mpf
import pandas as pd
import akshare as ak

stock_code = "000001"
df = ak.stock_zh_a_hist(symbol=stock_code, period="daily", 
                          start_date="20240101", end_date="20241231",
                          adjust="qfq")
df['日期'] = pd.to_datetime(df['日期'])
df.set_index('日期', inplace=True)
df = df.sort_index()
df = df.rename(columns={
    '开盘': 'Open', '最高': 'High', '最低': 'Low', 
    '收盘': 'Close', '成交量': 'Volume'
})

for window in [5, 10, 20, 60, 120, 250]:
    df[f'MA{window}'] = df['Close'].rolling(window=window).mean()

for span in [12, 26]:
    df[f'EMA{span}'] = df['Close'].ewm(span=span, adjust=False).mean()

df['DIF'] = df['EMA12'] - df['EMA26']
df['DEA'] = df['DIF'].ewm(span=9, adjust=False).mean()
df['MACD'] = (df['DIF'] - df['DEA']) * 2

low = df['Low'].rolling(window=9).min()
high = df['High'].rolling(window=9).max()
df['RSV'] = (df['Close'] - low) / (high - low) * 100
df['K'] = df['RSV'].ewm(alpha=1/3, adjust=False).mean()
df['D'] = df['K'].ewm(alpha=1/3, adjust=False).mean()
df['J'] = 3 * df['K'] - 2 * df['D']

mb = df['Close'].rolling(window=20).mean()
df['STD'] = df['Close'].rolling(window=20).std()
df['UPPER'] = mb + 2 * df['STD']
df['LOWER'] = mb - 2 * df['STD']

print("技术指标计算完成:")
print(df[['MA5', 'MA10', 'MA20', 'MA60', 'DIF', 'DEA', 'MACD', 'K', 'D', 'J', 'UPPER', 'LOWER']].tail(10))
```

MACD指标由Gerald Appel创建，是股票技术分析中最受欢迎的趋势跟踪指标之一。MACD由三部分组成：DIF线（快线）是12日EMA与26日EMA的差值，反映短期与长期价格趋势的差异；DEA线（慢线）是DIF的9日EMA，用于产生交易信号；MACD柱状图则是DIF与DEA差值的两倍，用于直观显示两线之间的差距。当DIF线从下向上穿过DEA线时，形成金叉，通常被视为买入信号；当DIF线从上向下穿过DEA线时，形成死叉，通常被视为卖出信号。此外，MACD指标还用于判断价格走势的强度，当价格创新高而MACD未能创新高时，可能出现顶背离，预示着下跌风险；反之则可能出现底背离，预示着上涨机会。背离信号是MACD最重要的应用之一，虽然出现频率不高，但准确率相对较高。

```python
import mplfinance as mpf
import pandas as pd
import akshare as ak

stock_code = "000001"
df = ak.stock_zh_a_hist(symbol=stock_code, period="daily", 
                          start_date="20240101", end_date="20241231",
                          adjust="qfq")
df['日期'] = pd.to_datetime(df['日期'])
df.set_index('日期', inplace=True)
df = df.sort_index()
df = df.rename(columns={
    '开盘': 'Open', '最高': 'High', '最低': 'Low', 
    '收盘': 'Close', '成交量': 'Volume'
})

df['EMA12'] = df['Close'].ewm(span=12, adjust=False).mean()
df['EMA26'] = df['Close'].ewm(span=26, adjust=False).mean()
df['DIF'] = df['EMA12'] - df['EMA26']
df['DEA'] = df['DIF'].ewm(span=9, adjust=False).mean()
df['MACD'] = (df['DIF'] - df['DEA']) * 2

apds = [
    mpf.make_addplot(df['DIF'], panel=2, color='#FF6500', width=1, ylabel='MACD'),
    mpf.make_addplot(df['DEA'], panel=2, color='#2060DD', width=1),
    mpf.make_addplot(df['MACD'], type='bar', panel=2, color='#666666', alpha=0.5, ylabel=''),
]

mc = mpf.make_marketcolors(up='#FF5500', down='#00AA00')
s = mpf.make_mpf_style(marketcolors=mc)

mpf.plot(df[-180:],
         type='candle',
         style='charles',
         title='平安银行 MACD指标',
         ylabel='价格',
         volume=True,
         addplot=apds,
         panel_ratios=(4, 2),
         figsize=(14, 12),
         tight_layout=True,
         savefig='stock_macd.png')
print("MACD指标图已保存")
```

KDJ指标是一种随机指标，由George Lane创建，主要用于判断股票价格的超买超卖状态。KDJ指标由K线、D线和J线三条曲线组成，其中K值是RSV的平滑值，D值是K值的平滑值，J值则是3倍K值减2倍D值。KDJ的取值范围在0到100之间，通常以80以上为超买区域，20以下为超卖区域。当K线从下向上穿过D线时，形成金叉，是潜在的买入信号；当K线从上向下穿过D线时，形成死叉，是潜在的卖出信号。J值的变化最为敏感，可以作为K线和D线变化的预警信号。KDJ指标特别适用于短期波动较大的股票，但在震荡行情中可能产生较多的虚假信号。实战中，KDJ经常与MACD、均线等其他指标配合使用，以提高信号的可靠性。

```python
import mplfinance as mpf
import pandas as pd
import akshare as ak

stock_code = "000001"
df = ak.stock_zh_a_hist(symbol=stock_code, period="daily", 
                          start_date="20240101", end_date="20241231",
                          adjust="qfq")
df['日期'] = pd.to_datetime(df['日期'])
df.set_index('日期', inplace=True)
df = df.sort_index()
df = df.rename(columns={
    '开盘': 'Open', '最高': 'High', '最低': 'Low', 
    '收盘': 'Close', '成交量': 'Volume'
})

low_9 = df['Low'].rolling(window=9).min()
high_9 = df['High'].rolling(window=9).max()
df['RSV'] = (df['Close'] - low_9) / (high_9 - low_9) * 100
df['K'] = df['RSV'].ewm(alpha=1/3, adjust=False).mean()
df['D'] = df['K'].ewm(alpha=1/3, adjust=False).mean()
df['J'] = 3 * df['K'] - 2 * df['D']

apds = [
    mpf.make_addplot(df['K'], panel=2, color='#FF6500', width=1, ylabel='KDJ'),
    mpf.make_addplot(df['D'], panel=2, color='#2060DD', width=1),
    mpf.make_addplot(df['J'], panel=2, color='#10AA10', width=1),
]

apds.append(mpf.make_addplot([80] * len(df), panel=2, color='gray', linestyle='--', alpha=0.5))
apds.append(mpf.make_addplot([20] * len(df), panel=2, color='gray', linestyle='--', alpha=0.5))

mc = mpf.make_marketcolors(up='#FF5500', down='#00AA00')
s = mpf.make_mpf_style(marketcolors=mc)

mpf.plot(df[-180:],
         type='candle',
         style='charles',
         title='平安银行 KDJ指标',
         ylabel='价格',
         volume=True,
         addplot=apds,
         panel_ratios=(4, 2),
         figsize=(14, 12),
         tight_layout=True,
         savefig='stock_kdj.png')
print("KDJ指标图已保存")
```

布林带由John Bollinger发明，是一种基于统计学原理的技术分析工具。布林带由三条线组成：中轨是N日简单移动平均线，上轨是中轨加上K倍标准差，下轨是中轨减去K倍标准差。常用的参数是20日均线和2倍标准差。布林带的宽度反映了市场波动程度，当布林带收窄时表示市场波动较小，可能酝酿着突破行情；当布林带扩张时表示市场波动较大。布林带的用法包括：当价格触及上轨时可能存在超买风险，当价格触及下轨时可能存在超卖机会；当股价突破上轨时可能是强势上涨信号，当跌破下轨时可能是强势下跌信号。

```python
import mplfinance as mpf
import pandas as pd
import akshare as ak

stock_code = "000001"
df = ak.stock_zh_a_hist(symbol=stock_code, period="daily", 
                          start_date="20240101", end_date="20241231",
                          adjust="qfq")
df['日期'] = pd.to_datetime(df['日期'])
df.set_index('日期', inplace=True)
df = df.sort_index()
df = df.rename(columns={
    '开盘': 'Open', '最高': 'High', '最低': 'Low', 
    '收盘': 'Close', '成交量': 'Volume'
})

df['MA20'] = df['Close'].rolling(window=20).mean()
df['STD'] = df['Close'].rolling(window=20).std()
df['UPPER'] = df['MA20'] + 2 * df['STD']
df['LOWER'] = df['MA20'] - 2 * df['STD']
df['BANDWIDTH'] = (df['UPPER'] - df['LOWER']) / df['MA20'] * 100

apds = [
    mpf.make_addplot(df['UPPER'], color='#FF6500', width=1),
    mpf.make_addplot(df['MA20'], color='#2060DD', width=1),
    mpf.make_addplot(df['LOWER'], color='#10AA10', width=1),
    mpf.make_addplot(df['BANDWIDTH'], panel=2, color='#666666', width=1, ylabel='BandWidth'),
]

mc = mpf.make_marketcolors(up='#FF5500', down='#00AA00')
s = mpf.make_mpf_style(marketcolors=mc)

mpf.plot(df[-180:],
         type='candle',
         style='charles',
         title='平安银行 布林带',
         ylabel='价格',
         volume=True,
         addplot=apds,
         panel_ratios=(4, 1.5),
         figsize=(14, 12),
         tight_layout=True,
         savefig='stock_bollinger.png')
print("布林带指标图已保存")
```

RSI是相对强弱指标的缩写，由Wells Wilder创建，是一种常用的动量振荡指标。RSI通过计算一定周期内价格上涨和下跌的平均值来判断市场的超买超卖状态，取值范围在0到100之间。RSI超过70通常被认为是超买区域，可能预示着回调风险；RSI低于30通常被认为是超卖区域，可能预示着反弹机会。当RSI在50附近波动时，表示市场处于相对平衡状态。RSI还可以用于判断趋势的持续性和背离现象，价格创新高而RSI未能创新高形成顶背离，反之则形成底背离。

```python
import mplfinance as mpf
import pandas as pd
import akshare as ak

stock_code = "000001"
df = ak.stock_zh_a_hist(symbol=stock_code, period="daily", 
                          start_date="20240101", end_date="20241231",
                          adjust="qfq")
df['日期'] = pd.to_datetime(df['日期'])
df.set_index('日期', inplace=True)
df = df.sort_index()
df = df.rename(columns={
    '开盘': 'Open', '最高': 'High', '最低': 'Low', 
    '收盘': 'Close', '成交量': 'Volume'
})

delta = df['Close'].diff()
gain = delta.where(delta > 0, 0).rolling(window=14).mean()
loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
rs = gain / loss
df['RSI'] = 100 - (100 / (1 + rs))

apds = [
    mpf.make_addplot(df['RSI'], panel=2, color='#FF6500', width=1, ylabel='RSI'),
]

apds.append(mpf.make_addplot([70] * len(df), panel=2, color='red', linestyle='--', alpha=0.5))
apds.append(mpf.make_addplot([50] * len(df), panel=2, color='gray', linestyle='--', alpha=0.5))
apds.append(mpf.make_addplot([30] * len(df), panel=2, color='green', linestyle='--', alpha=0.5))

mc = mpf.make_marketcolors(up='#FF5500', down='#00AA00')
s = mpf.make_mpf_style(marketcolors=mc)

mpf.plot(df[-180:],
         type='candle',
         style='charles',
         title='平安银行 RSI指标',
         ylabel='价格',
         volume=True,
         addplot=apds,
         panel_ratios=(4, 1.5),
         figsize=(14, 12),
         tight_layout=True,
         savefig='stock_rsi.png')
print("RSI指标图已保存")
```

## 多周期K线分析

多周期分析是技术分析中的重要方法论，它通过同时观察不同时间周期的K线图，建立对市场的立体认知。在A股市场中，投资者通常会关注日K线、周K线、月K线以及各种分钟K线。不同周期的K线反映了不同层次的市场趋势：月K线显示长期趋势，周K线显示中期趋势，日K线显示短期趋势，分钟K线则显示日内波动。多周期共振理论认为，当多个周期的技术指标同时发出相同方向的信号时，交易信号的可靠性会大大提高。例如，当月线处于上升趋势、日线出现金叉、30分钟线突破阻力位时，买入信号的可靠性就非常高。

```python
import akshare as ak
import pandas as pd
import mplfinance as mpf
import matplotlib.pyplot as plt

stock_code = "000001"

df_daily = ak.stock_zh_a_hist(symbol=stock_code, period="daily", 
                                start_date="20230101", end_date="20241231",
                                adjust="qfq")
df_daily['日期'] = pd.to_datetime(df_daily['日期'])
df_daily.set_index('日期', inplace=True)
df_daily = df_daily.sort_index()
df_daily = df_daily.rename(columns={
    '开盘': 'Open', '最高': 'High', '最低': 'Low', 
    '收盘': 'Close', '成交量': 'Volume'
})

df_weekly = ak.stock_zh_a_hist(symbol=stock_code, period="weekly", 
                                 start_date="20230101", end_date="20241231",
                                 adjust="qfq")
df_weekly['日期'] = pd.to_datetime(df_weekly['日期'])
df_weekly.set_index('日期', inplace=True)
df_weekly = df_weekly.sort_index()
df_weekly = df_weekly.rename(columns={
    '开盘': 'Open', '最高': 'High', '最低': 'Low', 
    '收盘': 'Close', '成交量': 'Volume'
})

df_monthly = ak.stock_zh_a_hist(symbol=stock_code, period="monthly", 
                                  start_date="20230101", end_date="20241231",
                                  adjust="qfq")
df_monthly['日期'] = pd.to_datetime(df_monthly['日期'])
df_monthly.set_index('日期', inplace=True)
df_monthly = df_monthly.sort_index()
df_monthly = df_monthly.rename(columns={
    '开盘': 'Open', '最高': 'High', '最低': 'Low', 
    '收盘': 'Close', '成交量': 'Volume'
})

print("日K线数据:")
print(df_daily.tail())
print(f"\n周K线数据:")
print(df_weekly.tail())
print(f"\n月K线数据:")
print(df_monthly.tail())

fig, axes = plt.subplots(3, 1, figsize=(14, 15), sharex=True)

axes[0].plot(df_monthly.index, df_monthly['Close'], 'b-', linewidth=2)
axes[0].set_title('月K线（长期趋势）', fontsize=14)
axes[0].grid(True, alpha=0.3)
axes[0].set_ylabel('价格')

axes[1].plot(df_weekly.index, df_weekly['Close'], 'g-', linewidth=1.5)
axes[1].set_title('周K线（中期趋势）', fontsize=14)
axes[1].grid(True, alpha=0.3)
axes[1].set_ylabel('价格')

axes[2].plot(df_daily.index, df_daily['Close'], 'r-', linewidth=1)
axes[2].set_title('日K线（短期波动）', fontsize=14)
axes[2].grid(True, alpha=0.3)
axes[2].set_ylabel('价格')
axes[2].set_xlabel('日期')

plt.suptitle('平安银行 多周期K线分析', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.savefig('stock_multiperiod.png', dpi=150, bbox_inches='tight')
plt.show()
print("\n多周期分析图已保存")
```

分钟K线数据能够提供更加精细的市场信息，对于日内交易者和短线投资者尤为重要。A股市场的交易时间为每个交易日的9:30至11:30和13:00至15:00，分钟K线数据能够捕捉到这个时间段内每一分钟的价格变动。常用的分钟K线包括5分钟、15分钟、30分钟和60分钟，其中5分钟和15分钟K线适合日内短线交易，30分钟和60分钟K线则适合波段操作。使用分钟K线进行分析时，需要注意以下几点：首先，分钟数据的噪音较大，需要配合更长周期的图表进行确认；其次，分钟级别的支撑压力位需要及时调整；最后，在收盘前应该适当减少交易频率，避免隔夜风险。

```python
import akshare as ak
import pandas as pd
import mplfinance as mpf

stock_code = "000001"

df_60min = ak.stock_zh_a_hist(symbol=stock_code, period="60", 
                                start_date="20240101", end_date="20241231",
                                adjust="qfq")
df_60min['日期'] = pd.to_datetime(df_60min['日期'])
df_60min.set_index('日期', inplace=True)
df_60min = df_60min.sort_index()
df_60min = df_60min.rename(columns={
    '开盘': 'Open', '最高': 'High', '最低': 'Low', 
    '收盘': 'Close', '成交量': 'Volume'
})

print(f"60分钟K线数量: {len(df_60min)}")

df_60min['MA5'] = df_60min['Close'].rolling(window=5).mean()
df_60min['MA10'] = df_60min['Close'].rolling(window=10).mean()

apds = [
    mpf.make_addplot(df_60min['MA5'], color='#FF6500', width=1),
    mpf.make_addplot(df_60min['MA10'], color='#2060DD', width=1),
]

mc = mpf.make_marketcolors(up='#FF5500', down='#00AA00')
s = mpf.make_mpf_style(marketcolors=mc)

mpf.plot(df_60min[-200:],
         type='candle',
         style='charles',
         title='平安银行 60分钟K线',
         ylabel='价格',
         volume=True,
         addplot=apds,
         figsize=(14, 10),
         tight_layout=True,
         savefig='stock_60min.png')
print("\n60分钟K线图已保存")
```

## 复权数据处理

股票复权是金融数据分析中必须掌握的概念，它用于消除分红送股、配股等公司行为对股价造成的影响，使历史价格数据具有可比性。A股市场中，上市公司经常会进行现金分红、送股、转增股本、配股等操作，这些操作会改变股票的绝对价格。如果没有进行复权处理，历史价格数据将无法直接用于收益率计算和技术分析。复权分为前复权和后复权两种方式：前复权是将历史价格按照最新的复权因子进行调整，使历史价格与当前价格处于同一水平；后复权则是将当前价格按照历史复权因子进行调整，使历史价格保持不变。

```python
import akshare as ak
import pandas as pd
import numpy as np

stock_code = "000001"

df_qfq = ak.stock_zh_a_hist(symbol=stock_code, period="daily", 
                              start_date="20230101", end_date="20241231",
                              adjust="qfq")
df_hfq = ak.stock_zh_a_hist(symbol=stock_code, period="daily", 
                              start_date="20230101", end_date="20241231",
                              adjust="hfq")
df_nofq = ak.stock_zh_a_hist(symbol=stock_code, period="daily", 
                              start_date="20230101", end_date="20241231",
                              adjust="")

df_qfq['日期'] = pd.to_datetime(df_qfq['日期'])
df_hfq['日期'] = pd.to_datetime(df_hfq['日期'])
df_nofq['日期'] = pd.to_datetime(df_nofq['日期'])

df_qfq.set_index('日期', inplace=True)
df_hfq.set_index('日期', inplace=True)
df_nofq.set_index('日期', inplace=True)

df_qfq = df_qfq.sort_index()
df_hfq = df_hfq.sort_index()
df_nofq = df_nofq.sort_index()

comparison = pd.DataFrame({
    '不复权收盘': df_nofq['收盘'],
    '前复权收盘': df_qfq['收盘'],
    '后复权收盘': df_hfq['收盘']
})

print("三种复权方式对比（前10行）:")
print(comparison.head(10))

print("\n不复权与前复权的差异:")
diff = comparison['不复权收盘'] - comparison['前复权收盘']
print(diff.describe())

import matplotlib.pyplot as plt
plt.figure(figsize=(14, 8))
plt.plot(comparison.index, comparison['不复权收盘'], 'b-', label='不复权', alpha=0.7)
plt.plot(comparison.index, comparison['前复权收盘'], 'r-', label='前复权', alpha=0.7)
plt.plot(comparison.index, comparison['后复权收盘'], 'g-', label='后复权', alpha=0.7)
plt.title('平安银行 不同复权方式对比')
plt.xlabel('日期')
plt.ylabel('收盘价')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('stock_fuquan_comparison.png', dpi=150)
plt.show()
print("\n复权对比图已保存")
```

## K线形态识别

K线形态识别是技术分析的重要内容，通过识别特定的K线组合形态，投资者可以发现潜在的市场转折信号。经典的K线形态包括反转形态和持续形态两大类。反转形态预示着当前趋势可能发生改变，如锤头线、吊颈线、晨星、暮云、头肩顶、双顶、双底等；持续形态则表示原有趋势可能继续发展，如三连阳、三连阴、上升三法、下降三法等。形态识别需要结合K线的位置、成交量、均线位置等多个因素进行综合判断。

```python
import pandas as pd
import numpy as np
import akshare as ak

stock_code = "000001"
df = ak.stock_zh_a_hist(symbol=stock_code, period="daily", 
                          start_date="20240101", end_date="20241231",
                          adjust="qfq")
df['日期'] = pd.to_datetime(df['日期'])
df.set_index('日期', inplace=True)
df = df.sort_index()
df = df.rename(columns={
    '开盘': 'Open', '最高': 'High', '最低': 'Low', 
    '收盘': 'Close', '成交量': 'Volume'
})

def identify_candle_patterns(df):
    patterns = pd.DataFrame(index=df.index)
    df = df.copy()
    
    df['Body'] = abs(df['Close'] - df['Open'])
    df['UpperShadow'] = df['High'] - df[['Open', 'Close']].max(axis=1)
    df['LowerShadow'] = df[['Open', 'Close']].min(axis=1) - df['Low']
    df['BodySize'] = df['Body']
    df['Range'] = df['High'] - df['Low']
    
    df['is_hammer'] = ((df['LowerShadow'] > df['BodySize'] * 2) & 
                       (df['UpperShadow'] < df['BodySize'] * 0.3) &
                       (df['BodySize'] > df['Range'] * 0.1))
    
    df['is_doji'] = (df['BodySize'] < df['Range'] * 0.1) & (df['Range'] > 0)
    
    df['is_bullish_engulfing'] = (
        (df['Close'].shift(1) < df['Open'].shift(1)) &
        (df['Close'] > df['Open']) &
        (df['Close'] > df['Open'].shift(1)) &
        (df['Open'] < df['Close'].shift(1))
    )
    
    df['is_bearish_engulfing'] = (
        (df['Close'].shift(1) > df['Open'].shift(1)) &
        (df['Close'] < df['Open']) &
        (df['Open'] > df['Close'].shift(1)) &
        (df['Close'] < df['Open'].shift(1))
    )
    
    patterns['锤头线'] = df['is_hammer']
    patterns['十字星'] = df['is_doji']
    patterns['看涨吞没'] = df['is_bullish_engulfing']
    patterns['看跌吞没'] = df['is_bearish_engulfing']
    
    return patterns

patterns = identify_candle_patterns(df)

print("K线形态识别结果（最近20个交易日）:")
print(patterns.tail(20))

pattern_counts = patterns.sum()
print("\n各形态出现次数:")
print(pattern_counts[pattern_counts > 0])

recent_patterns = patterns.tail(30)
for date, row in recent_patterns.iterrows():
    detected = [col for col in recent_patterns.columns if row[col]]
    if detected:
        print(f"{date.strftime('%Y-%m-%d')}: {', '.join(detected)}")
```

识别出的K线形态可以在图表上进行标记，直观地展示各个形态出现的位置。这种可视化的形态识别对于技术分析研究和交易决策都有很大帮助。在实际应用中，K线形态识别需要与成交量、均线位置、大盘环境等因素相结合，单一形态信号的可靠性有限。

```python
import mplfinance as mpf
import pandas as pd
import akshare as ak

stock_code = "000001"
df = ak.stock_zh_a_hist(symbol=stock_code, period="daily", 
                          start_date="20240101", end_date="20241231",
                          adjust="qfq")
df['日期'] = pd.to_datetime(df['日期'])
df.set_index('日期', inplace=True)
df = df.sort_index()
df = df.rename(columns={
    '开盘': 'Open', '最高': 'High', '最低': 'Low', 
    '收盘': 'Close', '成交量': 'Volume'
})

def identify_patterns(df):
    df = df.copy()
    df['Body'] = abs(df['Close'] - df['Open'])
    df['UpperShadow'] = df['High'] - df[['Open', 'Close']].max(axis=1)
    df['LowerShadow'] = df[['Open', 'Close']].min(axis=1) - df['Low']
    df['BodySize'] = df['Body']
    df['Range'] = df['High'] - df['Low']
    
    df['is_hammer'] = ((df['LowerShadow'] > df['BodySize'] * 2) & 
                       (df['UpperShadow'] < df['BodySize'] * 0.3) &
                       (df['BodySize'] > df['Range'] * 0.1))
    
    df['is_doji'] = (df['BodySize'] < df['Range'] * 0.1) & (df['Range'] > 0)
    
    return df

df = identify_patterns(df)

hammer_dates = df[df['is_hammer']].index.tolist()
doji_dates = df[df['is_doji']].index.tolist()

plot_df = df[-120:]

apds = []
if hammer_dates:
    hammer_markers = mpf.make_mpf_marker(
        conditions=[plot_df.index.isin(hammer_dates)],
        colors=['blue'],
        markers=['^'],
        sizes=[100]
    )
    apds.append(hammer_markers)

mc = mpf.make_marketcolors(up='#FF5500', down='#00AA00')
s = mpf.make_mpf_style(marketcolors=mc)

mpf.plot(plot_df,
         type='candle',
         style='charles',
         title='平安银行 K线形态标记',
         ylabel='价格',
         volume=True,
         addplot=apds,
         figsize=(14, 10),
         tight_layout=True,
         savefig='stock_patterns.png')
print("形态标记图已保存")
print(f"发现锤头线形态: {len(hammer_dates)} 个")
print(f"发现十字星形态: {len(doji_dates)} 个")
```

## 高级可视化技巧

专业级别的K线可视化需要考虑多个方面，包括图表的整体布局、颜色的选择搭配、关键价位的标注、技术指标的叠加方式等。合理的图表设计不仅能够提高信息的传达效率，还能增强视觉体验。在A股K线图中，通常使用红色表示上涨，绿色表示下跌。图表的背景颜色选择需要考虑使用场景：浅色背景适合打印和报告，深色背景则适合长时间盯盘和夜间分析。关键价位如历史高低点、支撑压力位、整数关口等应该用水平线或文字标注进行突出显示。

```python
import mplfinance as mpf
import pandas as pd
import akshare as ak

stock_code = "000001"
df = ak.stock_zh_a_hist(symbol=stock_code, period="daily", 
                          start_date="20240101", end_date="20241231",
                          adjust="qfq")
df['日期'] = pd.to_datetime(df['日期'])
df.set_index('日期', inplace=True)
df = df.sort_index()
df = df.rename(columns={
    '开盘': 'Open', '最高': 'High', '最低': 'Low', 
    '收盘': 'Close', '成交量': 'Volume'
})

df['MA5'] = df['Close'].rolling(window=5).mean()
df['MA10'] = df['Close'].rolling(window=10).mean()
df['MA20'] = df['Close'].rolling(window=20).mean()

current_high = df['High'].iloc[-1]
current_low = df['Low'].iloc[-1]

apds = [
    mpf.make_addplot(df['MA5'], color='#FF6500', width=1),
    mpf.make_addplot(df['MA10'], color='#2060DD', width=1),
    mpf.make_addplot(df['MA20'], color='#10AA10', width=1),
]

mc = mpf.make_marketcolors(
    up='#ff5500',
    down='#00aa00',
    edge='inherit',
    wick='inherit',
    volume='in',
)

s = mpf.make_mpf_style(
    marketcolors=mc,
    gridstyle='-',
    gridcolor='#cccccc',
    facecolor='#ffffff',
    figcolor='#ffffff',
    rc={'font.size': 10}
)

hlines = dict(
    hlines=[current_high * 1.02, current_low * 0.98],
    colors=['red', 'green'],
    linestyle='--',
    linewidths=[1, 1]
)

mpf.plot(df[-120:],
         type='candle',
         style=s,
         title='平安银行 专业K线分析',
         ylabel='价格 (元)',
         volume=True,
         addplot=apds,
         hlines=hlines,
         figsize=(16, 12),
         tight_layout=True,
         savefig='stock_professional.png')
print("专业K线图已保存")

custom_style = mpf.make_mpf_style(
    base_mpf_style='nightclouds',
    marketcolors=mpf.make_marketcolors(
        up='#ff5500',
        down='#00aa00',
        edge='inherit',
        wick='inherit',
        volume={'up': '#ff5500', 'down': '#00aa00'},
    ),
    gridstyle='-',
    gridcolor='#2a2a3e',
    facecolor='#1a1a2e',
    edgecolor='#0f3460',
    figcolor='#1a1a2e',
    rc={
        'font.size': 10,
        'text.color': '#e0e0e0',
        'axes.labelcolor': '#e0e0e0',
        'xtick.color': '#e0e0e0',
        'ytick.color': '#e0e0e0',
    }
)

mpf.plot(df[-120:],
         type='candle',
         style=custom_style,
         title='平安银行 暗色主题K线',
         ylabel='价格',
         volume=True,
         addplot=apds,
         figsize=(16, 12),
         tight_layout=True,
         savefig='stock_dark_theme.png')
print("暗色主题K线图已保存")
```

## 总结

K线可视化是股票技术分析的基础技能，通过Python的mplfinance和Plotly等库，可以快速绑制专业级别的金融图表。本文介绍了A股K线可视化的完整流程，包括数据获取与预处理、基础K线图绑制、技术指标可视化、多周期分析、复权处理以及K线形态识别等内容。掌握这些技能，可以帮助投资者更好地进行市场分析和投资决策。在实际应用中，建议投资者结合基本面分析和仓位管理，形成完整的投资体系。需要注意的是，技术分析只是投资决策的辅助工具，不应过分依赖任何单一指标或方法。