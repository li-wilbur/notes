import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import { generateSidebar } from 'vitepress-sidebar'
import { generateNavItems } from './utils'

export default withPwa(defineConfig({
  base: '/notes/',
  title: "Notes",
  description: "现代化个人知识库",
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/notes/favicon.svg' }]],
  
  // PWA 配置
  pwa: {
    outDir: '.vitepress/dist',
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg'],
    manifest: {
      name: '个人笔记',
      short_name: 'Notes',
      description: '现代化个人知识库',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192x192.svg',
          sizes: '192x192',
          type: 'image/svg+xml'
        },
        {
          src: 'pwa-512x512.svg',
          sizes: '512x512',
          type: 'image/svg+xml'
        }
      ]
    }
  },

  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      ...generateNavItems(['Kubernetes', 'Linux', 'SQL', 'Python']),
      {
        text: '更多',
        items: generateNavItems([
          '技术笔记',
          '项目文档'
        ])
      }
    ],

    // 侧边栏 (自动生成)
    sidebar: generateSidebar([
      '技术笔记',
      '项目文档',
      'SQL',
      'Linux',
      'Kubernetes',
      'Python'
    ].map(dir => ({
      documentRootPath: 'docs',
      scanStartPath: dir,
      resolvePath: `/${dir}/`,
      useTitleFromFileHeading: true,
      collapsed: false
    }))),

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/li-wilbur/notes' }
    ],

    // 搜索配置
    search: {
      provider: 'local'
    },

    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present'
    },

    // 文档最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short'
      }
    },
    
    // 编辑链接
    editLink: {
      pattern: 'https://github.com/li-wilbur/notes/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页'
    }
  }
}))
