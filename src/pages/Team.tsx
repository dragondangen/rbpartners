import { useState } from "react";
import { useLang } from "../lang";
import { getList, normalizeUrl } from "../content";
import Html from "../components/Html";
import Breadcrumbs from "../components/Breadcrumbs";
import { TEAM_BIOS_RU, TEAM_BIOS_EN } from "../data/teamBios";
import type { ContentItem } from "../types";

/* Per the June 2026 edits, the team is reduced to these partners only,
   in this order. Surnames are matched against member titles (RU + EN). */
const KEEP = {
  ru: ["Джимбинов", "Лукин", "Горячев", "ельцер", "Глотов", "Идрисов"],
  en: ["Dzhimbinov", "Lukin", "Goryachev", "eltzer", "Glotov", "Idrisov"],
};

function MemberCard({
  m,
  bio,
  open,
  onToggle,
}: {
  m: ContentItem;
  bio: string;
  open: boolean;
  onToggle: () => void;
}) {
  const img = normalizeUrl(m.thumb);
  return (
    <div className={`item-team${open ? " item-open" : ""}`}>
      <a className="go-team-desc" onClick={onToggle}>
        {img ? <img src={img} alt={m.title} /> : <span className="team-noimg">RB</span>}
        <div className="team-ttl">{m.title}</div>
      </a>
      {bio && (
        <div className={`team-desc${open ? " active" : ""}`}>
          <a className="close-desc" onClick={onToggle}>
            X
          </a>
          <Html html={bio} />
        </div>
      )}
    </div>
  );
}

export default function Team() {
  const { lang } = useLang();
  const [openId, setOpenId] = useState<number | null>(null);

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

    // Prefer the RU photo: EN records point at /en/wp-content/uploads/... which
    // is not bundled, whereas the RU photos live under /wp-content/uploads/...
    const thumb =
      findThumb(poolRu, ruKey) ?? chosen.thumb ?? findThumb(poolEn, enKey) ?? null;

    const bio =
      (lang === "ru" ? TEAM_BIOS_RU[ruKey] : TEAM_BIOS_EN[enKey]) ??
      chosen.content ??
      chosen.excerpt ??
      "";

    members.push({ item: { ...chosen, thumb }, bio });
  });

  return (
    <>
      <div className="page-back">
        <div className="wrapper">
          <Breadcrumbs current={lang === "ru" ? "Команда" : "Team"} />
        </div>
      </div>

      <div className="partners-block-wrp">
        <div className="wrapper">
          <div className="partners-block">
            <h2>{lang === "ru" ? "Команда RB Partners" : "RB Partners Team"}</h2>
            {members.map(({ item, bio }) => (
              <MemberCard
                key={item.id}
                m={item}
                bio={bio}
                open={openId === item.id}
                onToggle={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
