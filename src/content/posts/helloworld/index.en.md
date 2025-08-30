---
title: Hello, World!
published: 2025-08-31
description: 'Hello World!'
image: './strv103c_bg_small.webp'
tags: ['Miscellaneous']
category: 'Miscellaneous'
draft: false
lang: 'en'
---

> Cover image from [Pixiv](https://www.pixiv.net/artworks/124185880). A wallpaper of Strv.103C I drew myself, experimenting with a fun style.

This is the first official article—after days of tinkering, it's finally nearing completion.

I plan to use this blog primarily for technical articles and project showcases, along with some personal thoughts. The weird and quirky stuff won't go here (X).

## Blog Architecture

This blog is built on the [Astro](https://astro.build/) framework, with JavaScript dynamic content using the Svelte framework, entirely in TypeScript. The blog theme is modified (heavily customized) from [Fuwari](https://github.com/saicaca/fuwari), with style adjustments and added I18N article support.

## Blog Network Architecture

The blog's network is divided into domestic and international sections, with traffic routing handled by `Alibaba Cloud DNS` for geographic load balancing. Domestic traffic is directed to `Alibaba Cloud CDN`, while international traffic goes to `Tencent EdgeOne` CDN.

### Domestic Section

Domestic acceleration uses `Alibaba Cloud CDN`. The blog content is static and deployed on `Alibaba Cloud OSS`. The CI system uses `Alibaba Cloud DevOps`—after a `GitHub` `push`, it automatically triggers CI compilation and pushes to `Alibaba Cloud OSS`.

### International Section

International acceleration uses `Tencent EdgeOne` CDN. The blog content is static, with the main blog deployed on `Cloudflare Pages`. After a `GitHub` `push`, it automatically triggers `Pages` deployment.

## Blog History

I can't even remember which version this blog is anymore. My first blog was WordPress-based—I think it's still accessible, but it's too much of a dark history to link here. The first post there was published on November 2, 2018. I was still in high school then, preparing for NOIP, which became the origin of my later algorithm competitions. Nearly 7 years have passed since then—I've already graduated from university, yet I still haven't managed to create a proper blog (sigh).

The previous blog version was VitePress-based, but I didn't have the energy to continue perfecting my theme, and that theme had structural issues from the start. So I rebuilt the blog from scratch using Astro, which is what you're seeing now.

> PS: LLMs are really useful
