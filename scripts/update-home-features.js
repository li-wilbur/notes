
const fs = require('fs');
const path = require('path');

const docsDir = path.resolve(__dirname, '../docs');
const indexPath = path.join(docsDir, 'index.md');

// 忽略的目录
const ignoredDirs = ['.vitepress', 'public'];

// 目录到信息的映射（可扩展）
const categoryMeta = {
  '技术笔记': { icon: '💻', details: '深入探索前端、后端、DevOps 等技术领域的最佳实践与原理分析。' },
  '学习笔记': { icon: '📚', details: '系统化的课程学习记录、读书笔记以及知识图谱构建。' },
  '项目文档': { icon: '🚀', details: '个人项目的详细开发文档、API 接口说明及架构设计。' },
  '日常记录': { icon: '📝', details: '记录生活点滴、周报总结与个人随想。' },
  '资源整理': { icon: '🔗', details: '收藏优质文章、工具、开源项目与学习资源。' },
  'SQL': { icon: '💾', details: '数据库查询、优化与管理技巧汇总。' },
  'Linux': { icon: '🐧', details: 'Linux 系统管理、运维命令与Shell脚本技巧。' },
  'Kubernetes': { icon: '⚓️', details: '容器编排、Helm 包管理与云原生实践。' },
  'Python': { icon: '🐍', details: 'Python 编程、库详解与实战技巧。' }
};

// 默认信息
const defaultMeta = { icon: '📁', details: '文档归档' };

function getDirectories(source) {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => !ignoredDirs.includes(name));
}

function findFirstMdFile(dirPath) {
  try {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    
    // 优先查找 .md 文件
    for (const file of files) {
      if (file.isFile() && file.name.endsWith('.md')) {
        return file.name.replace('.md', '');
      }
    }
    
    // 如果没有，递归查找子目录
    for (const file of files) {
      if (file.isDirectory()) {
        const subResult = findFirstMdFile(path.join(dirPath, file.name));
        if (subResult) {
          return `${file.name}/${subResult}`;
        }
      }
    }
  } catch (e) {
    return null;
  }
  return null;
}

function updateIndexMd() {
  const dirs = getDirectories(docsDir);
  const features = dirs.map(dir => {
    const meta = categoryMeta[dir] || defaultMeta;
    
    // 自动寻找该目录下的第一个 md 文件作为链接目标
    const firstDoc = findFirstMdFile(path.join(docsDir, dir));
    const link = firstDoc ? `/${dir}/${firstDoc}` : `/${dir}/`;

    return {
      title: dir,
      details: meta.details,
      icon: meta.icon,
      link: link
    };
  });

  // 读取 index.md
  let content = fs.readFileSync(indexPath, 'utf-8');

  // 构建 features YAML 字符串
  let featuresYaml = 'features:\n';
  features.forEach(f => {
    featuresYaml += `  - title: ${f.title}\n`;
    featuresYaml += `    details: ${f.details}\n`;
    featuresYaml += `    icon: ${f.icon}\n`;
    featuresYaml += `    link: ${f.link}\n`;
  });

  // 使用正则替换 features 部分
  // 匹配 features: 开始，直到下一个顶级 key (不缩进的) 或文件结束
  const featuresRegex = /^features:[\s\S]*?(?=^(\w+):|\---)/m;
  
  if (featuresRegex.test(content)) {
    content = content.replace(featuresRegex, featuresYaml);
  } else {
    // 如果没有 features，追加到 frontmatter 结束前
    const frontmatterEnd = content.indexOf('---', 4); // 查找第二个 ---
    if (frontmatterEnd !== -1) {
       const before = content.substring(0, frontmatterEnd);
       const after = content.substring(frontmatterEnd);
       content = before + featuresYaml + after;
    } else {
      console.warn('Could not find frontmatter end to append features.');
    }
  }

  fs.writeFileSync(indexPath, content, 'utf-8');
  console.log('Successfully updated features in docs/index.md');
  console.log('Generated features for:', dirs.join(', '));
}

updateIndexMd();
