# 脚本文档

本文件描述了在基于 Astro 的项目中 `scripts/` 目录下用于创建博客文章的实用脚本。

## 概览

该项目包含两个主要的博客文章创建脚本：

- `new-post.js` - 创建单语言博客文章
- `new-multilang-post.js` - 创建多语言博客文章，支持多种语言

## 脚本

### new-post.js

在 `src/content/posts/` 目录中创建带有 front-matter 的单篇博客文章 Markdown 文件。

#### 使用方法

```bash
npm run new-post <filename>
```

#### 参数

- `<filename>` - 文章文件名（不带扩展名）

#### 特性

- 如果未提供扩展名，会自动添加 `.md`
- 如果目录不存在，会自动创建目录结构
- 生成包含当前日期的 front-matter
- 防止覆盖现有文件

#### 示例

```bash
npm run new-post -- my-awesome-post
```

这将创建 `src/content/posts/my-awesome-post.md` 文件，其内容如下：

```markdown
---
title: my-awesome-post
published: 2024-01-15
description: ''
image: ''
tags: []
category: ''
draft: false 
lang: ''
---
```

### new-multilang-post.js

为每个支持的语言创建单独的文件，生成多语言博客文章。

#### 使用方法

```bash
npm run new-multilang-post -- <filename>
```

#### 参数

- `<filename>` - 文章目录名和基础文件名

#### 支持的语言

脚本默认支持以下语言：

| 语言 | 代码 | 默认 | 文件模式 |
|----------|------|---------|-------------|
| 中文 (Chinese) | `zh_cn` | ✓ | `index.md` |
| English | `en` | | `index.en.md` |
| 日本語 (Japanese) | `ja` | | `index.ja.md` |
| Русский (Russian) | `ru` | | `index.ru.md` |

#### 特性

- 为文章创建专用目录
- 为每种语言生成单独的文件
- 默认语言使用 `index.md`，其他语言使用 `index.{lang}.md`
- 每个文件在 front-matter 中包含正确的 `lang` 字段
- 防止覆盖现有目录
- 提供详细的创建摘要

#### 示例

```bash
npm run new-multilang-post  international-guide
```

这将创建以下文件结构：

```
src/content/posts/international-guide/
├── index.md          # 中文 (默认)
├── index.en.md       # 英文
├── index.ja.md       # 日语
└── index.ru.md       # 俄语
```

每个文件内容如下：

```markdown
---
title: international-guide
published: 2024-01-15
description: ''
image: ''
tags: []
category: ''
draft: false
lang: 'zh_cn'  # 或对应的语言代码
---

# international-guide

<!-- 语言特定内容放在这里 -->
```

## Front-matter 字段

两个脚本都会生成包含以下 front-matter 字段的文章：

- `title` - 文章标题（默认为文件名）
- `published` - 发布日期（自动生成为 YYYY-MM-DD 格式）
- `description` - 文章描述（默认为空）
- `image` - 特色图片 URL（默认为空）
- `tags` - 标签数组（默认为空）
- `category` - 文章分类（默认为空）
- `draft` - 草稿状态（默认为 false）
- `lang` - 语言代码（单篇文章为空，多语言文章自动设置）

## 错误处理

两个脚本都包含完整的错误处理功能：

- **缺少文件名**：显示使用说明并退出
- **文件/目录已存在**：防止覆盖并以错误退出
- **目录创建**：根据需要自动创建父级目录

## 实现细节

### 日期生成

两个脚本使用共享的日期生成函数，将当前日期格式化为 `YYYY-MM-DD`：

```javascript
function getDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
```

### 文件系统操作

- 使用 Node.js 的 `fs` 和 `path` 模块
- 在需要时递归创建目录
- 创建前检查现有文件/目录
- 为创建的文件提供详细的控制台输出

## 自定义

### 添加新语言

如需在 `new-multilang-post.js` 中添加对新语言的支持，修改 `supportedLangs` 数组：

```javascript
const supportedLangs = [
  { code: "zh_cn", name: "中文", isDefault: true },
  { code: "en", name: "English", isDefault: false },
  { code: "ja", name: "日本語", isDefault: false },
  { code: "ru", name: "Русский", isDefault: false },
  // 在这里添加新语言
  { code: "fr", name: "Français", isDefault: false },
];
```

### 修改 Front-matter 模板

通过修改每个脚本中的 `content` 模板字符串，可以自定义两个脚本以包含额外的 front-matter 字段。

## 最佳实践

1. **命名约定**：使用 kebab-case 作为文章文件名（例如 `my-awesome-post`）
2. **多语言文章**：当计划在多种语言中撰写内容时使用多语言脚本
3. **单语言文章**：仅在一种语言中撰写文章时使用常规脚本
4. **目录组织**：脚本会自动将文章组织在正确的目录结构中
5. **front-matter 补充**：记住在创建文章后填写空的 front-matter 字段

## 故障排除

### 常见问题

1. **"目录已存在" 错误**：选择不同的文件名或删除现有目录
2. **"文件已存在" 错误**：选择不同的文件名或删除现有文件
3. **权限错误**：确保您有对 `src/content/posts/` 目录的写入权限
4. **找不到脚本**：确保您从项目根目录运行命令

### 获取帮助

如果在使用这些脚本时遇到问题：

1. 检查您是否在正确的目录中（项目根目录）
2. 确认已安装并可以访问 Node.js
3. 确保 `scripts/` 目录及其文件存在
4. 检查目标目录的文件权限

如需进一步帮助，请参阅项目的主文档或在项目仓库中创建问题。
