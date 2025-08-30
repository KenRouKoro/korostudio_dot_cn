---
title: 项目附带脚本指南
published: 2025-08-30
description: '如何使用项目附带脚本'
image: ''
tags: ["Fuwari"]
category: 指南
draft: false
lang: 'zh_cn'
---

本项目附带了一些脚本，用于帮助您管理和构建博客。  

脚本位于项目中 `scripts/` 目录下。

## 概览

本项目包含两个主要的博客文章创建脚本：

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
