# 个人笔记 (Personal Notes)

![VitePress](https://img.shields.io/badge/VitePress-Default-646cff?logo=vite&logoColor=white)
![Build Status](https://github.com/li-wilbur/notes/actions/workflows/deploy.yml/badge.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

这是一个基于 [VitePress](https://vitepress.dev/) 构建的现代化个人知识库，旨在记录技术沉淀、学习思考与生活点滴。

👉 [**在线访问**](https://li-wilbur.github.io/notes/)

## ✨ 特性

- ⚡️ **高性能** - 基于 Vite 的极速启动与热更新。
- 📱 **响应式设计** - 完美适配桌面端与移动端。
- 🌑 **深色模式** - 内置明亮/暗黑主题切换。
- 🔍 **全文搜索** - 支持离线全文检索。
- 🤖 **全自动配置** - 侧边栏与首页导航自动生成，无需手动维护配置。
- 📦 **PWA 支持** - 支持安装为本地应用，离线访问。
- 🚀 **自动部署** - 集成 GitHub Actions 自动化构建发布。

## 📂 目录结构

```text
.
├── .github/workflows/   # CI/CD 自动部署配置
├── docs/                # 文档源码目录
│   ├── .vitepress/      # 站点配置目录
│   │   ├── config.mts   # 核心配置文件
│   │   └── dist/        # 构建产物
│   ├── public/          # 静态资源
│   ├── index.md         # 首页布局
│   ├── 技术笔记/         # 分类文档
│   ├── 学习笔记/
│   ├── ...
│   └── 资源整理/
├── scripts/             # 自动化脚本
│   └── update-home-features.js # 首页特性自动更新脚本
└── package.json         # 项目依赖管理
```

## 🛠️ 本地开发

确保你的环境已安装 [Node.js](https://nodejs.org/) (版本 18+)。

1. **克隆仓库**

   ```bash
   git clone https://github.com/li-wilbur/notes.git
   cd notes
   ```

2. **安装依赖**

   ```bash
   npm install
   ```

3. **启动开发服务器**

   ```bash
   npm run docs:dev
   ```
   
   访问 `http://localhost:5173/notes/` 即可进行实时预览。
   *注：启动时会自动更新首页的分类卡片。*

## 📦 构建与部署

本项目使用 GitHub Actions 进行自动部署。

1. **构建静态文件**

   ```bash
   npm run docs:build
   ```

2. **本地预览构建结果**

   ```bash
   npm run docs:preview
   ```

3. **发布上线**
   
   只需将代码推送到 `master` 分支，GitHub Actions 会自动触发构建并将产物部署到 GitHub Pages。

## ✍️ 写作指南

详细的写作与发布流程请参考：[发布指南](docs/项目文档/使用指南/发布指南.md)

得益于项目的自动化脚本，发布新文章非常简单：

1. **创建文件**：在 `docs` 下的任意分类目录（如 `技术笔记/前端开发`）中新建 Markdown 文件。
2. **自动生效**：
   - **侧边栏**：会自动检测新文件并显示在左侧菜单。
   - **首页**：如果新建了顶级分类目录，首页卡片也会自动生成。
3. **提交代码**：Git Push 后自动部署。

不需要手动修改 `config.mts`！

## 📄 License

MIT License © 2026-present
