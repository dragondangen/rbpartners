import { useState } from "react";
import { useLang } from "../lang";
import { normalizeUrl } from "../content";
import Html from "../components/Html";
import Breadcrumbs from "../components/Breadcrumbs";
import { getTeam } from "../data/team";
import type { ContentItem } from "../types";

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

  const members = getTeam(lang);

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
