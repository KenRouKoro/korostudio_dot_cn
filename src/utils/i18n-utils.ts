import { getTranslation } from "@i18n/translation";
import { siteConfig } from "@/config";
import I18nKey from "../i18n/i18nKey";
import { i18n } from "../i18n/translation";

/**
 * 获取语言的显示名称
 */
export function getLanguageName(lang: string): string {
	const languageNames: Record<string, string> = {
		zh_cn: "中文",
		en: "English",
		ja: "日本語",
		ko: "한국어",
		es: "Español",
		th: "ไทย",
		vi: "Tiếng Việt",
		id: "Bahasa Indonesia",
		tr: "Türkçe",
		zh_tw: "繁體中文",
		ru: "Русский язык",
	};
	return languageNames[lang] || lang;
}

/**
 * 检查是否为默认语言
 */
export function isDefaultLanguage(lang: string): boolean {
	return lang === (siteConfig.defaultLang || siteConfig.lang || "zh_cn");
}

/**
 * 获取文章的URL路径
 */
export function getPostUrl(slug: string, lang?: string): string {
	// 清理slug，移除文件扩展名和语言后缀
	let cleanSlug = slug;
	// 移除 .md, .en.md 等扩展名
	cleanSlug = cleanSlug.replace(/\.(\w+\.)?md$/, "");
	// 移除 index.en, index.zh_cn 等文件名
	cleanSlug = cleanSlug.replace(/\/index(\.\w+)?$/, "");

	// 通用的语言后缀清理逻辑
	// 移除所有可能的语言后缀（支持的语言列表）
	const supportedLangs = siteConfig.supportedLangs || [
		"en",
		"ja",
		"ko",
		"es",
		"th",
		"vi",
		"id",
		"tr",
		"zh_tw",
		"ru",
	];
	for (const supportedLang of supportedLangs) {
		// 移除形如 indexen, indexja, guideen, guideja 等语言后缀
		cleanSlug = cleanSlug.replace(
			new RegExp(`(index|[^/]+)(${supportedLang})$`, "i"),
			"$1",
		);
	}

	// 移除形如 indexru, guideen 等剩余的语言后缀（通用模式）
	cleanSlug = cleanSlug.replace(/index[a-z]{2}$/i, "");
	// 移除末尾的 /index
	cleanSlug = cleanSlug.replace(/\/index$/, "");
	// 如果整个 slug 就是 index，则设为空字符串
	if (cleanSlug === "index") {
		cleanSlug = "";
	}
	// 移除开头和结尾的斜杠
	cleanSlug = cleanSlug.replace(/^\/+|\/+$/g, "");

	// 根据语言参数生成URL
	let finalUrl: string;
	if (!lang || isDefaultLanguage(lang)) {
		finalUrl = `/posts/${cleanSlug}`;
	} else {
		finalUrl = `/${lang}/posts/${cleanSlug}`;
	}
	return finalUrl;
}

/**
 * 获取分类页面的URL路径
 */
export function getCategoryUrlWithLang(
	category: string | null,
	lang?: string,
): string {
	const archiveUrl = getArchiveUrlWithLang(lang);
	if (
		!category ||
		category.trim() === "" ||
		category.trim().toLowerCase() ===
			i18n(I18nKey.uncategorized, lang).toLowerCase()
	) {
		return `${archiveUrl}?uncategorized=true`;
	}
	return `${archiveUrl}?category=${encodeURIComponent(category.trim())}`;
}

/**
 * 获取标签页面的URL路径
 */
export function getTagUrlWithLang(tag: string, lang?: string): string {
	const archiveUrl = getArchiveUrlWithLang(lang);
	if (!tag) {
		return archiveUrl;
	}
	return `${archiveUrl}?tag=${encodeURIComponent(tag.trim())}`;
}

/**
 * 获取归档页面的URL路径
 */
export function getArchiveUrlWithLang(lang?: string): string {
	if (!lang || isDefaultLanguage(lang)) {
		return "/archive";
	}
	return `/${lang}/archive`;
}

/**
 * 获取首页的URL路径
 */
export function getHomeUrlWithLang(lang?: string): string {
	if (!lang || isDefaultLanguage(lang)) {
		return "/";
	}
	return `/${lang}`;
}

/**
 * 获取关于页面的URL路径
 */
export function getAboutUrlWithLang(lang?: string): string {
	if (!lang || isDefaultLanguage(lang)) {
		return "/about";
	}
	return `/${lang}/about`;
}

/**
 * 从URL路径中提取语言代码
 */
export function extractLangFromUrl(url: string): string {
	const match = url.match(/^\/([a-z]{2}(?:_[a-z]{2})?)(?:\/|$)/i);
	if (match && siteConfig.supportedLangs?.includes(match[1])) {
		return match[1];
	}
	return siteConfig.defaultLang || siteConfig.lang || "zh_cn";
}

/**
 * 获取规范化的URL（用于SEO）
 */
export function getCanonicalUrl(slug: string, lang?: string): string {
	const baseUrl = import.meta.env.SITE || "https://korostudio.cn";
	const postUrl = getPostUrl(slug, lang);
	return `${baseUrl}${postUrl}`;
}

/**
 * 获取语言切换的URL（带回退机制）
 */
export function getLanguageSwitchUrl(
	currentUrl: string,
	targetLang: string,
): string {
	const currentLang = extractLangFromUrl(currentUrl);

	// 移除当前语言前缀
	let cleanUrl = currentUrl;
	if (!isDefaultLanguage(currentLang)) {
		cleanUrl = currentUrl.replace(new RegExp(`^\/${currentLang}(?:\/|$)`), "/");
		// 如果结果是单独的斜杠且原URL不是根路径，需要保持原有路径结构
		if (
			cleanUrl === "/" &&
			currentUrl !== `/${currentLang}` &&
			currentUrl !== `/${currentLang}/`
		) {
			cleanUrl = currentUrl.replace(new RegExp(`^\/${currentLang}`), "");
		}
	}

	// 检查是否是文章页面
	const isPostPage = cleanUrl.match(/^\/posts\/(.+)$/);
	if (isPostPage) {
		// 对于文章页面，实现回退机制
		return getPostLanguageSwitchUrl(cleanUrl, targetLang);
	}

	// 添加目标语言前缀
	if (isDefaultLanguage(targetLang)) {
		return cleanUrl || "/";
	}
	// 如果cleanUrl是根路径，直接返回语言前缀，避免添加尾随斜杠
	if (cleanUrl === "/") {
		return `/${targetLang}`;
	}
	return `/${targetLang}${cleanUrl}`;
}

/**
 * 获取文章页面的语言切换URL（带回退机制）
 */
export function getPostLanguageSwitchUrl(
	postUrl: string,
	targetLang: string,
): string {
	// 提取文章slug
	const slugMatch = postUrl.match(/^\/posts\/(.+)$/);
	if (!slugMatch) {
		// 如果不是文章页面，回退到归档页面
		return getArchiveUrlWithLang(targetLang);
	}

	const slug = slugMatch[1];

	// 尝试构建目标语言的文章URL
	const targetUrl = getPostUrl(slug, targetLang);

	// 这里我们返回目标URL，实际的存在性检查将在客户端进行
	// 如果文章不存在，客户端会回退到归档页面
	return targetUrl;
}

/**
 * 获取回退URL（当目标页面不存在时使用）
 */
export function getFallbackUrl(targetLang: string, currentUrl: string): string {
	// 检查当前URL类型并提供相应的回退
	if (currentUrl.includes("/posts/")) {
		// 文章页面回退到归档页面
		return getArchiveUrlWithLang(targetLang);
	}
	if (currentUrl.includes("/archive/category/")) {
		// 分类页面回退到归档页面
		return getArchiveUrlWithLang(targetLang);
	}
	if (currentUrl.includes("/archive/tag/")) {
		// 标签页面回退到归档页面
		return getArchiveUrlWithLang(targetLang);
	}
	if (currentUrl.includes("/about")) {
		// 关于页面保持在关于页面
		return getAboutUrlWithLang(targetLang);
	}
	if (currentUrl.includes("/archive")) {
		// 归档页面保持在归档页面
		return getArchiveUrlWithLang(targetLang);
	}
	// 其他页面回退到首页
	return getHomeUrlWithLang(targetLang);
}

/**
 * 检查语言是否被支持
 */
export function isSupportedLanguage(lang: string): boolean {
	return (
		siteConfig.supportedLangs?.includes(lang) ||
		lang === (siteConfig.defaultLang || siteConfig.lang)
	);
}

/**
 * 获取浏览器首选语言（如果支持的话）
 */
export function getPreferredLanguage(): string {
	if (typeof window === "undefined") {
		return siteConfig.defaultLang || siteConfig.lang || "zh_cn";
	}

	const browserLangs = navigator.languages || [navigator.language];
	for (const browserLang of browserLangs) {
		const normalizedLang = browserLang.toLowerCase().replace("-", "_");
		if (isSupportedLanguage(normalizedLang)) {
			return normalizedLang;
		}
		// 尝试匹配语言的主要部分（如 en-US -> en）
		const mainLang = normalizedLang.split("_")[0];
		if (isSupportedLanguage(mainLang)) {
			return mainLang;
		}
	}

	return siteConfig.defaultLang || siteConfig.lang || "zh_cn";
}

/**
 * 检测当前路径是否为posts路径
 */
export function isPostsPath(url: string): boolean {
	// 使用正则表达式匹配包含posts的路径
	// 匹配 /posts/... 或 /lang/posts/... 格式
	const postsPathRegex = /^\/(\w+\/)?posts\//;
	return postsPathRegex.test(url);
}

/**
 * 获取posts路径的同语言文本跳转URL
 * 这个函数专门处理posts路径下的语言切换，确保跳转到相同内容的不同语言版本
 */
export function getPostsSameLangTextUrl(
	currentUrl: string,
	targetLang: string,
): string {
	// 提取当前语言和文章slug
	const currentLang = extractLangFromUrl(currentUrl);

	// 移除当前语言前缀，获取纯净的路径
	let cleanUrl = currentUrl;
	if (!isDefaultLanguage(currentLang)) {
		cleanUrl = currentUrl.replace(new RegExp(`^\/${currentLang}(?:\/|$)`), "/");
	}

	// 确保是posts路径
	if (!isPostsPath(cleanUrl)) {
		return getLanguageSwitchUrl(currentUrl, targetLang);
	}

	// 提取文章slug
	const slugMatch = cleanUrl.match(/^\/posts\/(.+)$/);
	if (!slugMatch) {
		// 如果无法提取slug，回退到归档页面
		return getArchiveUrlWithLang(targetLang);
	}

	const slug = slugMatch[1];

	// 构建目标语言的文章URL
	// 这里使用现有的getPostUrl函数来确保URL格式一致
	const result = getPostUrl(slug, targetLang);
	return result;
}

/**
 * 检测当前路径是否为archive页面
 */
export function isArchivePath(url: string): boolean {
	// 匹配 /archive 或 /lang/archive 格式
	const archivePathRegex = /^\/(\w+\/)?archive$/;
	return archivePathRegex.test(url);
}

/**
 * 检测当前路径是否为about页面
 */
export function isAboutPath(url: string): boolean {
	// 匹配 /about 或 /lang/about 格式
	const aboutPathRegex = /^\/(\w+\/)?about$/;
	return aboutPathRegex.test(url);
}

/**
 * 检测当前路径是否为首页
 */
export function isHomePath(url: string): boolean {
	// 匹配 / 或 /lang 或 /lang/ 格式
	const homePathRegex = /^\/(\w+\/?)?$/;
	return homePathRegex.test(url);
}

/**
 * 获取通用页面的语言切换URL（确保不添加非法斜杠）
 */
export function getUniversalLanguageSwitchUrl(
	currentUrl: string,
	targetLang: string,
): string {
	const currentLang = extractLangFromUrl(currentUrl);

	// 移除当前语言前缀，获取纯净的路径
	let cleanUrl = currentUrl;
	if (!isDefaultLanguage(currentLang)) {
		cleanUrl = currentUrl.replace(new RegExp(`^\/${currentLang}(?:\/|$)`), "/");
	}

	// 移除末尾的斜杠（如果存在且不是根路径）
	if (cleanUrl !== "/" && cleanUrl.endsWith("/")) {
		cleanUrl = cleanUrl.slice(0, -1);
	}

	// 检查不同页面类型并生成相应的URL
	if (isPostsPath(cleanUrl)) {
		return getPostsSameLangTextUrl(currentUrl, targetLang);
	}
	if (isArchivePath(cleanUrl)) {
		return getArchiveUrlWithLang(targetLang);
	}
	if (isAboutPath(cleanUrl)) {
		return getAboutUrlWithLang(targetLang);
	}
	if (isHomePath(cleanUrl)) {
		return getHomeUrlWithLang(targetLang);
	}
	// 对于其他页面，使用现有的语言切换逻辑
	return getLanguageSwitchUrl(currentUrl, targetLang);
}

/**
 * 基于客户端动态路径检测的语言切换函数
 * 使用window.location获取当前真实的浏览器路径
 */
export function getDynamicLanguageSwitchUrl(targetLang: string): string {
	if (typeof window === "undefined") {
		// 服务端环境，回退到首页
		return getHomeUrlWithLang(targetLang);
	}

	// 获取当前浏览器的完整路径（包括pathname和search）
	const currentPath = window.location.pathname;
	const currentSearch = window.location.search;
	const currentHash = window.location.hash;

	// 使用现有的通用语言切换逻辑
	const newPath = getUniversalLanguageSwitchUrl(currentPath, targetLang);

	// 保留查询参数和锚点
	const finalUrl = newPath + currentSearch + currentHash;
	return finalUrl;
}

/**
 * 客户端专用的语言切换函数，支持异步文章存在性检查
 */
export async function switchLanguageWithFallback(
	targetLang: string,
	originalPath?: string,
): Promise<string> {
	if (typeof window === "undefined") {
		return getDynamicLanguageSwitchUrl(targetLang);
	}

	// 使用传入的原始路径，如果没有则使用当前路径
	const currentPath = originalPath || window.location.pathname;
	console.log('[switchLanguageWithFallback] 跳转前:', currentPath);
	// 使用原始路径生成目标URL
	const targetUrl = originalPath
		? getUniversalLanguageSwitchUrl(originalPath, targetLang)
		: getDynamicLanguageSwitchUrl(targetLang);

	// 如果是文章页面，检查目标语言的文章是否存在
	if (isPostsPath(currentPath)) {
		try {
				const response = await fetch(targetUrl, { method: "HEAD" });
				if (response.ok) {
					console.log('[switchLanguageWithFallback] 跳转后:', targetUrl);
					return targetUrl;
				}
			} catch (error) {
				// 网络错误或其他问题，使用回退逻辑
			}
			
			// 文章不存在，回退到归档页面
			const fallbackUrl = getArchiveUrlWithLang(targetLang);
			console.log('[switchLanguageWithFallback] 跳转后:', fallbackUrl);
			return fallbackUrl;
		}
		
		// 非文章页面，直接使用目标URL
		console.log('[switchLanguageWithFallback] 跳转后:', targetUrl);
		return targetUrl;
}

/**
 * 安全的URL路径处理函数，确保不添加非法的尾随斜杠
 */
export function sanitizeUrlPath(inputPath: string): string {
	let path = inputPath;
	// 移除多余的斜杠
	path = path.replace(/\/+/g, "/");

	// 如果不是根路径，移除尾随斜杠
	if (path !== "/" && path.endsWith("/")) {
		path = path.slice(0, -1);
	}

	// 确保路径以斜杠开头
	if (!path.startsWith("/")) {
		path = "/" + path;
	}

	return path;
}
