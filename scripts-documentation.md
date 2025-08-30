# Scripts Documentation

This document describes the utility scripts available in the `scripts/` directory for creating blog posts in this Astro-based project.

## Overview

The project includes two main scripts for creating blog posts:

- `new-post.js` - Creates a single-language blog post
- `new-multilang-post.js` - Creates multilingual blog posts with support for multiple languages

## Scripts

### new-post.js

Creates a single blog post markdown file with front-matter in the `src/content/posts/` directory.

#### Usage

```bash
npm run new-post <filename>
```

#### Parameters

- `<filename>` - The name of the post file (without extension)

#### Features

- Automatically adds `.md` extension if not provided
- Creates directory structure if it doesn't exist
- Generates front-matter with current date
- Prevents overwriting existing files

#### Example

```bash
npm run new-post -- my-awesome-post
```

This creates `src/content/posts/my-awesome-post.md` with the following structure:

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

Creates multilingual blog posts with separate files for each supported language.

#### Usage

```bash
npm run new-multilang-post -- <filename>
```

#### Parameters

- `<filename>` - The name of the post directory and base filename

#### Supported Languages

The script supports the following languages by default:

| Language | Code | Default | File Pattern |
|----------|------|---------|-------------|
| 中文 (Chinese) | `zh_cn` | ✓ | `index.md` |
| English | `en` | | `index.en.md` |
| 日本語 (Japanese) | `ja` | | `index.ja.md` |
| Русский (Russian) | `ru` | | `index.ru.md` |

#### Features

- Creates a dedicated directory for the post
- Generates separate files for each language
- Default language uses `index.md`, others use `index.{lang}.md`
- Each file includes proper `lang` field in front-matter
- Prevents overwriting existing directories
- Provides detailed creation summary

#### Example

```bash
npm run new-multilang-post  international-guide
```

This creates the following structure:

```
src/content/posts/international-guide/
├── index.md          # Chinese (default)
├── index.en.md       # English
├── index.ja.md       # Japanese
└── index.ru.md       # Russian
```

Each file contains:

```markdown
---
title: international-guide
published: 2024-01-15
description: ''
image: ''
tags: []
category: ''
draft: false
lang: 'zh_cn'  # or respective language code
---

# international-guide

<!-- Language-specific content goes here -->
```

## Front-matter Fields

Both scripts generate posts with the following front-matter fields:

- `title` - Post title (defaults to filename)
- `published` - Publication date (auto-generated as YYYY-MM-DD)
- `description` - Post description (empty by default)
- `image` - Featured image URL (empty by default)
- `tags` - Array of tags (empty by default)
- `category` - Post category (empty by default)
- `draft` - Draft status (false by default)
- `lang` - Language code (empty for single posts, auto-set for multilingual)

## Error Handling

Both scripts include comprehensive error handling:

- **Missing filename**: Displays usage instructions and exits
- **File/directory exists**: Prevents overwriting and exits with error
- **Directory creation**: Automatically creates parent directories as needed

## Implementation Details

### Date Generation

Both scripts use a shared date generation function that formats the current date as `YYYY-MM-DD`:

```javascript
function getDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
```

### File System Operations

- Uses Node.js `fs` and `path` modules
- Creates directories recursively when needed
- Checks for existing files/directories before creation
- Provides detailed console output for created files

## Customization

### Adding New Languages

To add support for additional languages in `new-multilang-post.js`, modify the `supportedLangs` array:

```javascript
const supportedLangs = [
  { code: "zh_cn", name: "中文", isDefault: true },
  { code: "en", name: "English", isDefault: false },
  { code: "ja", name: "日本語", isDefault: false },
  { code: "ru", name: "Русский", isDefault: false },
  // Add new languages here
  { code: "fr", name: "Français", isDefault: false },
];
```

### Modifying Front-matter Template

Both scripts can be customized to include additional front-matter fields by modifying the `content` template string in each script.

## Best Practices

1. **Naming Convention**: Use kebab-case for post filenames (e.g., `my-awesome-post`)
2. **Multilingual Posts**: Use the multilingual script when you plan to write content in multiple languages
3. **Single Language Posts**: Use the regular script for posts that will only be in one language
4. **Directory Organization**: The scripts automatically organize posts in the correct directory structure
5. **Front-matter Completion**: Remember to fill in the empty front-matter fields after creating posts

## Troubleshooting

### Common Issues

1. **"Directory already exists" error**: Choose a different filename or remove the existing directory
2. **"File already exists" error**: Choose a different filename or remove the existing file
3. **Permission errors**: Ensure you have write permissions to the `src/content/posts/` directory
4. **Script not found**: Make sure you're running the commands from the project root directory

### Getting Help

If you encounter issues with these scripts:

1. Check that you're in the correct directory (project root)
2. Verify that Node.js is installed and accessible
3. Ensure the `scripts/` directory and files exist
4. Check file permissions for the target directory

For additional help, refer to the project's main documentation or create an issue in the project repository.
