import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'

export default withPwa(defineConfig({
  base: '/notes/',
  title: "个人笔记",
  description: "现代化个人知识库，记录技术、学习与生活",
  lang: 'zh-CN',
  
  // PWA 配置
  pwa: {
    outDir: '.vitepress/dist',
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
    manifest: {
      name: '个人笔记',
      short_name: 'Notes',
      description: '现代化个人知识库',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  },

  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '技术笔记', link: '/技术笔记/前端开发/React核心概念' },
      { text: '学习笔记', link: '/学习笔记/机器学习/神经网络基础' },
      { text: '项目文档', link: '/项目文档/API参考/用户模块接口' },
    ],

    // 侧边栏
    sidebar: {
      '/技术笔记/': [
        {
          text: '前端开发',
          collapsed: false,
          items: [
            { text: 'React 核心概念', link: '/技术笔记/前端开发/React核心概念' }
          ]
        }
      ],
      '/学习笔记/': [
        {
          text: '机器学习',
          collapsed: false,
          items: [
            { text: '神经网络基础', link: '/学习笔记/机器学习/神经网络基础' }
          ]
        }
      ],
      '/日常记录/': [
        {
          text: '周报',
          collapsed: false,
          items: [
            { text: '2023-12-01 周总结', link: '/日常记录/2023-12-01-周总结' }
          ]
        }
      ],
      '/项目文档/': [
        {
          text: 'API 参考',
          collapsed: false,
          items: [
            { text: '用户模块接口', link: '/项目文档/API参考/用户模块接口' }
          ]
        }
      ],
      '/资源整理/': [
        {
          text: '推荐',
          collapsed: false,
          items: [
            { text: '优质博客推荐', link: '/资源整理/优质博客推荐' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-github-user/notes' }
    ],

    // 搜索配置
    search: {
      provider: 'local'
    },

    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present'
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
      pattern: 'https://github.com/your-github-user/notes/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页'
    }
  }
}))
