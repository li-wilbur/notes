
import fs from 'fs'
import path from 'path'

/**
 * 查找指定目录下的第一个 .md 文件（用于生成导航链接）
 * @param dirPath 目录路径
 * @returns 相对路径（不含扩展名）或 null
 */
function findFirstMdFile(dirPath: string): string | null {
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

/**
 * 自动生成导航栏 "更多" 下的 items
 * @param dirs 目录列表
 * @param rootPath 文档根目录
 */
export function generateNavItems(dirs: string[], rootPath: string = 'docs') {
  return dirs.map(dir => {
    const fullPath = path.resolve(rootPath, dir);
    const firstDoc = findFirstMdFile(fullPath);
    return {
      text: dir,
      link: firstDoc ? `/${dir}/${firstDoc}` : `/${dir}/`
    }
  });
}
