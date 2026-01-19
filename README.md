# 个人笔记 GitHub Pages

这是一个使用 Docsify 构建的现代化个人笔记页面，托管在 GitHub Pages 上。

## 项目特点

- ✨ 现代化 UI 设计，支持暗黑/明亮主题切换
- 📱 响应式布局，适配不同设备屏幕
- 🔍 全局搜索功能
- 📋 左侧固定导航栏，支持多级目录折叠/展开
- 💡 Markdown 语法高亮
- 📌 自动生成页面标题和锚点链接

## 技术栈

- [Docsify](https://docsify.js.org/) - 静态站点生成器
- [GitHub Pages](https://pages.github.com/) - 网站托管服务
- Markdown - 内容编写格式

## 目录结构

```
├── docs/                    # GitHub Pages 源文件目录
│   ├── index.html          # Docsify 主配置文件
│   ├── _sidebar.md         # 侧边栏导航配置
│   ├── _coverpage.md       # 封面页配置
│   ├── 技术笔记/           # 技术笔记分类
│   ├── 学习笔记/           # 学习笔记分类
│   ├── 日常记录/           # 日常记录分类
│   ├── 项目文档/           # 项目文档分类
│   └── 资源整理/           # 资源整理分类
└── README.md               # 项目说明文件
```

## GitHub Pages 配置

- 分支：`master`
- 目录：`/docs`
- 访问地址：`https://li-wilbur.github.io/notes/`

## 本地预览

### 方法 1：使用 docsify-cli

```bash
# 安装 docsify-cli
npm i docsify-cli -g

# 启动本地服务器
cd docs
docsify serve
```

然后在浏览器中访问 `http://localhost:3000`

### 方法 2：使用 Python 简单 HTTP 服务器

```bash
# Python 3
cd docs
python -m http.server 3000

# Python 2
cd docs
python -m SimpleHTTPServer 3000
```

然后在浏览器中访问 `http://localhost:3000`

## 如何添加新笔记

1. 在 `docs/` 目录下创建对应的 Markdown 文件
2. 在 `docs/_sidebar.md` 中添加对应的导航链接
3. 提交并推送更改到 GitHub
4. 等待 GitHub Pages 自动部署（通常需要 1-2 分钟）

## 自定义配置

### 修改主题

在 `docs/index.html` 中修改 `darklightTheme` 配置，可以自定义主题颜色。

### 修改导航栏

编辑 `docs/_sidebar.md` 文件，可以修改导航栏的结构和内容。

### 修改封面页

编辑 `docs/_coverpage.md` 文件，可以修改封面页的内容。

## 功能说明

### 主题切换

点击页面右上角的主题切换按钮，可以在暗黑和明亮主题之间切换。

### 搜索功能

在页面顶部的搜索框中输入关键词，可以搜索所有 Markdown 文件中的内容。

### 导航栏

- 点击导航栏中的分类名称，可以展开/折叠该分类下的子目录
- 点击具体的笔记标题，可以跳转到对应的笔记页面

### 页面内导航

在笔记页面的右侧，可以看到该页面的目录结构，点击目录项可以跳转到页面中对应的位置。

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

[MIT](LICENSE)