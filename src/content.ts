import type { ContentItem, ContentType, HomeData, Lang } from "./types";

// Eagerly import every extracted JSON content file (ru.*.json / en.*.json).
const modules = import.meta.glob<{ default: ContentItem[] }>("./content/*.json", {
  eager: true,
});

// Build an index keyed by "lang.type" -> ContentItem[]
const store: Record<string, ContentItem[]> = {};
for (const path in modules) {
  const file = path.split("/").pop()!.replace(/\.json$/, ""); // e.g. "ru.news"
  store[file] = (modules[path] as { default: ContentItem[] }).default ?? [];
}

/**
 * Normalize legacy absolute image/asset URLs from the old WordPress site to
 * site-relative paths, so assets resolve from our local /public folder.
 * Old content references several historical domains; all of them mapped to the
 * same upload paths that we copied into public/.
 */
export function normalizeAssets(html: string): string {
  if (!html) return "";
  return html
    .replace(/https?:\/\/(www\.)?rbpartners\.ru/gi, "")
    .replace(/https?:\/\/rb\.96\.lt/gi, "")
    .replace(/https?:\/\/[a-z0-9.-]*frontspher[a-z0-9.-]*/gi, "");
}

export function normalizeUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  return normalizeAssets(url) || undefined;
}

export function getList(lang: Lang, type: ContentType): ContentItem[] {
  const v = store[`${lang}.${type}`];
  return Array.isArray(v) ? v : [];
}

export function getHome(lang: Lang): HomeData {
  return (store[`${lang}.home`] as unknown as HomeData) ?? {};
}

export function getBySlug(
  lang: Lang,
  type: ContentType,
  slug: string,
): ContentItem | undefined {
  return getList(lang, type).find((i) => i.slug === slug);
}

export function getById(
  lang: Lang,
  type: ContentType,
  id: number,
): ContentItem | undefined {
  return getList(lang, type).find((i) => i.id === id);
}

/** News / deals sorted newest first. */
export function getDated(lang: Lang, type: ContentType): ContentItem[] {
  return [...getList(lang, type)].sort((a, b) =>
    (b.date ?? "").localeCompare(a.date ?? ""),
  );
}
