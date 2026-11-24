import { getList } from "../content";
import type { ContentItem, Lang } from "../types";
import { TEAM_BIOS_RU, TEAM_BIOS_EN } from "./teamBios";

/* Per the June 2026 edits, the team is reduced to these partners only,
   in this order. Surnames are matched against member titles (RU + EN). */
const KEEP = {
  ru: ["Джимбинов", "Лукин", "Горячев", "ельцер", "Глотов", "Идрисов"],
  en: ["Dzhimbinov", "Lukin", "Goryachev", "eltzer", "Glotov", "Idrisov"],
};

/* Explicit photo overrides (keyed by the RU surname token). Takes priority
   over the imported DB thumbnails. */
const PHOTO_OVERRIDE: Record<string, string> = {
  Джимбинов: "/i/team/dzhimbinov.jpg",
};

export function getTeam(lang: Lang) {
  // Pool team members for both languages. Photos are language-agnostic, so we
  // always source the thumbnail from whichever language has one (some EN
  // records lack a photo) — fixing the missing EN team images.
  const poolRu = [
    ...getList("ru", "partners"),
    ...getList("ru", "experts"),
    ...getList("ru", "sovet"),
  ];
  const poolEn = [
    ...getList("en", "partners"),
    ...getList("en", "experts"),
    ...getList("en", "sovet"),
  ];
  const pool = lang === "ru" ? poolRu : poolEn;

  const findThumb = (list: ContentItem[], key: string) =>
    list.find((p) => p.title.toLowerCase().includes(key.toLowerCase()) && p.thumb)?.thumb;

  const members: { item: ContentItem; bio: string }[] = [];
  KEEP[lang].forEach((key, i) => {
    const ruKey = KEEP.ru[i];
    const enKey = KEEP.en[i];
    const matches = pool.filter((p) => p.title.toLowerCase().includes(key.toLowerCase()));
    const chosen = matches.find((p) => p.thumb) ?? matches[0];
    if (!chosen || members.some((m) => m.item.id === chosen.id)) return;

    // An explicit override wins; otherwise prefer the RU photo (EN records point
    // at /en/wp-content/uploads/... which is not bundled).
    const thumb =
      PHOTO_OVERRIDE[ruKey] ??
      findThumb(poolRu, ruKey) ??
      chosen.thumb ??
      findThumb(poolEn, enKey) ??
      null;

    const bio =
      (lang === "ru" ? TEAM_BIOS_RU[ruKey] : TEAM_BIOS_EN[enKey]) ??
      chosen.content ??
      chosen.excerpt ??
      "";

    members.push({ item: { ...chosen, thumb }, bio });
  });

  // Custom member (not in the imported DB): Andrey Cherkovets, placed after Seltzer.
  const cherkovets = {
    item: {
      id: 900001,
      slug: "cherkovets",
      title: lang === "ru" ? "Андрей Черковец" : "Andrey Cherkovets",
      content: "",
      thumb: "/i/team/cherkovets.jpg",
    } as ContentItem,
    bio:
      lang === "ru"
        ? "<p>Андрей имеет 30-летний опыт работы в банковском бизнесе. За этот период он реализовал сотни проектов в области корпоративного и проектного финансирования, являлся руководителем бизнес-направлений в ряде крупнейших банков России (ВТБ, ПСБ и др.). Андрей обладает практическим опытом в области сделок с недвижимостью, M&amp;A, индустриального развития, является независимым членом совета директоров нескольких ведущих Российских компаний.</p>"
        : "<p>Andrey has 30 years of experience in the banking business. Over this period he has delivered hundreds of projects in corporate and project finance and headed business lines at several of Russia's largest banks (VTB, PSB and others). Andrey has hands-on experience in real estate transactions, M&amp;A and industrial development, and serves as an independent member of the board of directors of several leading Russian companies.</p>",
  };
  const seltzerIdx = members.findIndex((m) =>
    /ельцер|eltzer/i.test(m.item.title),
  );
  if (seltzerIdx >= 0) members.splice(seltzerIdx + 1, 0, cherkovets);
  else members.push(cherkovets);

  return members;
}
