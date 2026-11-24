import { getBySlug, getList } from "../content";
import type { Lang } from "../types";

export type Design = "editorial" | "meridian" | "partnership";

export const email = "dzhimbinovkd@rbpartners.ru";
export const phone = "+7 903 563 6727";
export const tel = "+79035636727";

export const navigation = [
  { path: "/about", ru: "О компании", en: "About" },
  { path: "/services", ru: "Услуги", en: "Services" },
  { path: "/deals", ru: "Сделки", en: "Transactions" },
  { path: "/team", ru: "Команда", en: "Team" },
  { path: "/contacts", ru: "Контакты", en: "Contact" },
];

export const figures = [
  { ru: "2004", en: "2004", labelRu: "Год основания", labelEn: "Founded" },
  { ru: "90+", en: "90+", labelRu: "Проектов M&A", labelEn: "M&A projects" },
  {
    ru: "$2,5 млрд+",
    en: "$2.5bn+",
    labelRu: "Общий объём сделок",
    labelEn: "Total transaction value",
  },
];

export const practices = [
  {
    id: "usluga-desc1",
    icon: "deal",
    ru: "Слияния и поглощения",
    en: "Mergers and acquisitions",
    textRu: "Сопровождаем покупку и продажу бизнеса в России и за рубежом.",
    textEn: "We advise on business acquisitions and sales in Russia and internationally.",
  },
  {
    id: "usluga-desc3",
    icon: "strategy",
    ru: "Стратегия и структура",
    en: "Strategy and structure",
    textRu: "Помогаем подготовить бизнес к инвестициям и определить стратегию развития.",
    textEn: "We help companies prepare for investment and define their growth strategy.",
  },
  {
    id: "usluga-desc4",
    icon: "capital",
    ru: "Привлечение капитала",
    en: "Capital raising",
    textRu: "Помогаем привлекать банковское и венчурное финансирование и гарантии.",
    textEn: "We advise on bank and venture financing and help secure guarantees.",
  },
  {
    id: "usluga-desc5",
    icon: "shield",
    ru: "Защита интересов",
    en: "Investor and creditor advisory",
    textRu: "Представляем интересы инвесторов и кредиторов и консультируем по реструктуризации.",
    textEn: "We represent investors and creditors and advise on restructuring.",
  },
] as const;

export function getTransactions(lang: Lang) {
  return [...getList(lang, "deals")].sort((a, b) => Number(b.year) - Number(a.year));
}

export function plainText(html: string) {
  const template = document.createElement("template");
  template.innerHTML = html.replace(/<\/?(?:p|li|br|div|h[1-6])\b[^>]*>/gi, " ");
  return (template.content.textContent ?? "").replace(/\s+/g, " ").trim();
}

export function getServiceDetails(lang: Lang) {
  const html = getBySlug(lang, "pages", "services")?.content ?? "";
  const doc = new DOMParser().parseFromString(html, "text/html");

  return Array.from(doc.querySelectorAll<HTMLAnchorElement>(".usluga-detail")).flatMap((link) => {
    const id = link.getAttribute("href")?.slice(1) ?? "";
    const panel = doc.getElementById(id);
    if (!panel) return [];

    return [{ id, title: link.textContent?.trim() ?? "", content: panel.innerHTML }];
  });
}
