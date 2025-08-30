---
title: 你好，世界！
published: 2025-08-31
description: 'Hello World！'
image: './strv103c_bg_small.webp'
tags: ['杂项']
category: 杂项
draft: false
lang: 'zh_cn'
---

> 封面图片来自 [Pixiv](https://www.pixiv.net/artworks/124185880) 。吾自己画的 Strv.103C 的壁纸，实验了一个好玩的风格。

这是第一篇正式的文章，折腾了几天可算接近完工了。

这个博客吾打算就用来放一些技术文章和项目介绍，也会放一些自己的思考，奇奇怪怪的东西就不放这边了（X

## 博客架构

这个博客是基于 [Astro](https://astro.build/) 框架搭建的，JavaScript 动态内容使用了Svelte框架，完全使用 TypeScript 。博客的主题由 [Fuwari](https://github.com/saicaca/fuwari) 修改（魔改）而来，修改了样式并增加了I18N文章的支持。

## 博客网络架构

博客的网络分为海内外两个部分，由 `阿里云 DNS` 解析进行海内外分流，大陆部分的流量会被解析到 `阿里云 CDN` ，海外部分的流量会被解析到 `Tencent EdgeOne` 的CDN。

### 大陆部分

大陆部分的加速使用了 `阿里云 CDN` ，博客的内容是静态的，部署在 `阿里云 OSS` 上，CI系统使用了 `阿里云 云效`  ，`Github` `push` 后会自动触发 CI 编译后推送到 `阿里云 OSS` 。

### 海外部分

海外部分的加速使用了 `Tencent EdgeOne` 的CDN，博客的内容是静态的，博客本体部署在`Cloudflare Pages`上，`Github` `push` 后会自动触发 `Pages` 部署。

## 博客历史

这个博客吾也不记得是第几版了，吾的第一个博客是基于WordPress的，好像现在还能访问来着，过于黑历史就不放链接了。那边的第一篇文章发布于2018年11月2日，当时吾还在读高中，当时还在打NOIP，也是吾后面算法竞赛的起源了。转眼过去了快7年了，吾已经大学毕业了都，结果一个正儿八经的博客还没整出来（  
上一个版本的博客是基于VitePress的，但吾没有精力继续完善吾的主题，并且那个主题的结构从开始设计就有些问题，所以吾就基于Astro重新搭建了一个博客，也就是现在这个。
> PS：LLM 真好用
