# 个人笔记 (Docsify)

这是一个基于 [Docsify](https://docsify.js.org/) 构建的个人笔记站点。

## 目录结构

```
.
├── docs/                  # 文档根目录
│   ├── index.html         # Docsify 入口文件
│   ├── _sidebar.md        # 侧边栏配置
│   ├── README.md          # 首页内容
│   ├── 技术笔记/
│   ├── 学习笔记/
│   ├── 日常记录/
│   ├── 项目文档/
│   └── 资源整理/
└── README.md              # 项目说明
```

## 本地预览

如果你安装了 Python (Mac/Linux 通常预装):

```bash
cd docs
python3 -m http.server 3000
```

或者如果你安装了 Node.js，可以使用 `docsify-cli`:

```bash
npm i docsify-cli -g
docsify serve docs
```

访问 `http://localhost:3000` 查看效果。

## 部署

本项目已配置为支持 GitHub Pages。
请在 GitHub 仓库设置中，将 GitHub Pages Source 设置为 `master` 分支的 `/docs` 文件夹。
