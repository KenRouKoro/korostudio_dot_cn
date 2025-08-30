---
title: プロジェクトスクリプトガイド
published: 2025-08-30
description: 'ブログの管理と構築のための組み込みスクリプトに関する包括的ガイド'
image: ''
tags: ["Fuwari"]
category: ガイド
draft: false
lang: 'ja'
---

このプロジェクトには、ブログの管理と構築を支援するためのスクリプトが付属しています。

スクリプトはプロジェクト内の `scripts/` ディレクトリに配置されています。

## 概要

このプロジェクトには、主に2つのブログ記事作成スクリプトが含まれています：

- `new-post.js` - 単一言語ブログ記事を作成
- `new-multilang-post.js` - 多言語ブログ記事を作成（複数言語に対応）

## スクリプト

### new-post.js

`src/content/posts/` ディレクトリにフロントマターを含む単一のブログ記事Markdownファイルを作成します。

#### 使用方法

```bash
npm run new-post <filename>
```

#### パラメータ

- `<filename>` - 記事のファイル名（拡張子なし）

#### 機能

- 拡張子が指定されていない場合、自動的に `.md` を追加
- ディレクトリが存在しない場合、自動的にディレクトリ構造を作成
- 現在の日付を含むフロントマターを生成
- 既存ファイルの上書きを防止

#### 使用例

```bash
npm run new-post -- my-awesome-post
```

これにより、以下の内容を持つ `src/content/posts/my-awesome-post.md` ファイルが作成されます：

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

サポートされている各言語用の個別ファイルを作成し、多言語ブログ記事を生成します。

#### 使用方法

```bash
npm run new-multilang-post -- <filename>
```

#### パラメータ

- `<filename>` - 記事のディレクトリ名と基本ファイル名

#### 対応言語

スクリプトはデフォルトで以下の言語をサポートしています：

| 言語 | コード | デフォルト | ファイルパターン |
|----------|------|---------|-------------|
| 中国語 | `zh_cn` | ✓ | `index.md` |
| 英語 | `en` | | `index.en.md` |
| 日本語 | `ja` | | `index.ja.md` |
| ロシア語 | `ru` | | `index.ru.md` |

#### 機能

- 記事用の専用ディレクトリを作成
- 各言語用の個別ファイルを生成
- デフォルト言語は `index.md` を使用、その他の言語は `index.{lang}.md` を使用
- 各ファイルはフロントマターに正しい `lang` フィールドを含む
- 既存ディレクトリの上書きを防止
- 詳細な作成サマリーを提供

#### 使用例

```bash
npm run new-multilang-post international-guide
```

これにより、以下のファイル構造が作成されます：

```
src/content/posts/international-guide/
├── index.md          # 中国語（デフォルト）
├── index.en.md       # 英語
├── index.ja.md       # 日本語
└── index.ru.md       # ロシア語
```

各ファイルの内容は以下の通りです：

```markdown
---
title: international-guide
published: 2024-01-15
description: ''
image: ''
tags: []
category: ''
draft: false
lang: 'zh_cn'  # または対応する言語コード
---

# international-guide

<!-- 言語固有のコンテンツはここに記載 -->
```
