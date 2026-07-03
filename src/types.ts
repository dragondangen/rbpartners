export type Lang = "ru" | "en";

export interface ContentItem {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  date?: string;
  order?: number;
  parent?: number;
  thumb?: string | null;
  year?: string | null;
}

export type ContentType =
  | "pages"
  | "posts"
  | "news"
  | "deals"
  | "partners"
  | "experts"
  | "info"
  | "sovet"
  | "social"
  | "soc";

export type HomeData = Record<string, string>;
