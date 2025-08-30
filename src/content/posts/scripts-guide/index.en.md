---
title: Project Scripts Guide
published: 2025-08-30
description: 'How to Use the Project''s Built-in Scripts'
image: ''
tags: ["Fuwari"]
category: Guide
draft: false
lang: 'en'
---

This project includes several scripts to help you manage and build your blog.

Scripts are located in the `scripts/` directory within the project.

## Overview

This project contains two main blog post creation scripts:

- `new-post.js` - Creates single-language blog posts
- `new-multilang-post.js` - Creates multi-language blog posts with support for multiple languages

## Scripts

### new-post.js

Creates a single blog post Markdown file with front-matter in the `src/content/posts/` directory.

#### Usage

```bash
npm run new-post <filename>
```

#### Parameters

- `<filename>` - The post filename (without extension)

#### Features

- Automatically adds `.md` extension if not provided
- Creates directory structure automatically if directories don't exist
- Generates front-matter with current date
- Prevents overwriting existing files

#### Example

```bash
npm run new-post -- my-awesome-post
```

This will create the file `src/content/posts/my-awesome-post.md` with the following content:

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

Creates separate files for each supported language to generate multi-language blog posts.

#### Usage

```bash
npm run new-multilang-post -- <filename>
```

#### Parameters

- `<filename>` - The post directory name and base filename

#### Supported Languages

The script supports the following languages by default:

| Language | Code | Default | File Pattern |
|----------|------|---------|-------------|
| Chinese | `zh_cn` | ✓ | `index.md` |
| English | `en` | | `index.en.md` |
| Japanese | `ja` | | `index.ja.md` |
| Russian | `ru` | | `index.ru.md` |

#### Features

- Creates dedicated directory for the post
- Generates separate files for each language
- Default language uses `index.md`, other languages use `index.{lang}.md`
- Each file includes the correct `lang` field in front-matter
- Prevents overwriting existing directories
- Provides detailed creation summary

#### Example

```bash
npm run new-multilang-post international-guide
```

This will create the following file structure:

```
src/content/posts/international-guide/
├── index.md          # Chinese (default)
├── index.en.md       # English
├── index.ja.md       # Japanese
└── index.ru.md       # Russian
```

Each file has the following content:

```markdown
---
title: international-guide
published: 2024-01-15
description: ''
image: ''
tags: []
category: ''
draft: false
lang: 'zh_cn'  # or corresponding language code
---

# international-guide

<!-- Language-specific content goes here -->
```
