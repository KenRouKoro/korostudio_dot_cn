/* This is a script to create multilingual post markdown files with front-matter */

import fs from "fs";
import path from "path";

function getDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

// 支持的语言配置
const supportedLangs = [
	{ code: "zh_cn", name: "中文", isDefault: true },
	{ code: "en", name: "English", isDefault: false },
	{ code: "ja", name: "日本語", isDefault: false },
	{ code: "ru", name: "Русский", isDefault: false },
];

const args = process.argv.slice(2);

if (args.length === 0) {
	console.error(`Error: No filename argument provided
Usage: npm run new-multilang-post -- <filename>`);
	process.exit(1);
}

const fileName = args[0];
const targetDir = "./src/content/posts/";

// 检查是否已存在同名目录
const postDir = path.join(targetDir, fileName);
if (fs.existsSync(postDir)) {
	console.error(`Error: Directory ${postDir} already exists`);
	process.exit(1);
}

// 创建文章目录
fs.mkdirSync(postDir, { recursive: true });

// 为每种语言创建文章文件
const createdFiles = [];

for (const lang of supportedLangs) {
	let langFileName;
	if (lang.isDefault) {
		// 默认语言使用 index.md
		langFileName = "index.md";
	} else {
		// 其他语言使用 index.{lang}.md 格式
		langFileName = `index.${lang.code}.md`;
	}

	const filePath = path.join(postDir, langFileName);

	// 生成文章内容
	const content = `---
title: ${fileName}
published: ${getDate()}
description: ''
image: ''
tags: []
category: ''
draft: false
lang: '${lang.code}'
---

# ${fileName}

<!-- ${lang.name} content goes here -->
`;

	fs.writeFileSync(filePath, content);
	createdFiles.push(filePath);
	console.log(`Created: ${filePath}`);
}

console.log(`\n✅ Successfully created multilingual post: ${fileName}`);
console.log(`📁 Directory: ${postDir}`);
console.log(`📄 Files created: ${createdFiles.length}`);
console.log(
	`\n🌐 Languages:${supportedLangs.map((lang) => `\n  - ${lang.name} (${lang.code})`).join("")}`,
);
console.log(
	"\n💡 You can now edit the files and add content for each language.",
);
