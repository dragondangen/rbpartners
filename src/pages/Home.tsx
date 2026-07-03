import { Link } from "react-router-dom";
import { useLang } from "../lang";
import { getHome, getList, normalizeUrl } from "../content";
import Html from "../components/Html";

const L = (ru: string, en: string, lang: string) => (lang === "ru" ? ru : en);

export default function Home() {
  const { lang } = useLang();
  const h = getHome(lang);
  const deals = [...getList(lang, "deals")]
    .filter((d) => d.thumb)
    .sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0))
    .slice(0, 5);

  return (
    <>
      {/* ----- Banner with awards ----- */}
      <div className="home-slide">
        <div className="wrapper">
          <div className="slide-ttl">
            <Html html={h.baner_ttl || ""} />
          </div>
          <div className="awrd-wrp">
            {[1, 2, 3].map((i) => (
              <div className={`slide-awrd slide-awrd-${i}`} key={i}>
                <div className="awrd-count">{h[`awrd${i}_count`]}</div>
                <div className="awrd-desct">
                  {h[`awrd${i}_txt`]}
                  <em>{h[`awrd${i}_version`]}</em>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ----- Globalscope membership ----- */}
      <div className="home-slide-1">
        <div className="wrapper">
          <div className="left-slide-1">
            <div className="home-slide-ttl">
              {L(
                "RB Partners обладают уникальным многолетним опытом взаимодействия с международными инвесторами и сопровождения трансграничных сделок купли-продажи бизнеса.",
                "RB Partners has unique long-standing experience of working with international investors and advising on cross-border M&A transactions.",
                lang,
              )}
            </div>
            <Html html={h.globalscope || ""} />
            <Link className="go-detail" to="/about">
              {L("Всё о Нас", "About us", lang)}
            </Link>
          </div>
          <a
            href="https://player.vimeo.com/video/159844120?autoplay=1"
            className="right-slide-1 vimeo"
            target="_blank"
            rel="noreferrer noopener"
          >
            {" "}
          </a>
        </div>
      </div>

      {/* ----- Services ----- */}
      <div className="home-slide-2">
        <div className="wrapper">
          <div className="home-slide-ttl">
            {L("Услуги оказываемые компанией", "Our services", lang)}
          </div>
          <Html html={h.services || ""} />
          <Link className="go-detail" to="/services">
            {L("Подробнее", "More", lang)}
          </Link>
        </div>
      </div>

      {/* ----- Advantages ----- */}
      <div className="home-slide-4 prem-full">
        <div className="wrapper">
          <div className="home-slide-ttl">
            {L("Наши Преимущества", "Our advantages", lang)}
          </div>
          <div className="prem-full-wrp-short">
            <Html html={h.advantages || ""} />
          </div>
          <Link className="go-detail" to="/about">
            {L("Подробнее", "More", lang)}
          </Link>
        </div>
      </div>

      {/* ----- Featured deals ----- */}
      <div className="home-slide-3">
        <div className="wrapper">
          <div className="home-slide-ttl">
            {L("Избранные сделки", "Featured deals", lang)}
          </div>
          <ul className="deals-list">
            {deals.map((d) => (
              <li key={d.id}>
                <div className="deal-img">
                  <div className="deal-img-wrp">
                    <img src={normalizeUrl(d.thumb)} alt={d.title} />
                  </div>
                </div>
                <div className="deal-desc">
                  <div className="deal-txt">
                    <Html html={d.content || `<p>${d.title}</p>`} />
                  </div>
                  <div className="deal-date">{d.year}</div>
                </div>
              </li>
            ))}
          </ul>
          <Link className="go-detail" to="/deals">
            {L("Все сделки", "All deals", lang)}
          </Link>
        </div>
      </div>

      {/* ----- Team ----- */}
      <div className="home-slide-4">
        <div className="wrapper">
          <div className="home-slide-ttl">{L("Команда", "Team", lang)}</div>
          <Html html={h.team || ""} />
          <Link className="go-detail" to="/team">
            {L("Подробнее", "More", lang)}
          </Link>
        </div>
      </div>
    </>
  );
}
