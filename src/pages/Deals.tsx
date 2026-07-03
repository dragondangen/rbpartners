import { useLang } from "../lang";
import { getList, normalizeUrl } from "../content";
import Html from "../components/Html";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Deals() {
  const { lang } = useLang();
  const deals = [...getList(lang, "deals")].sort(
    (a, b) => Number(b.year ?? 0) - Number(a.year ?? 0),
  );
  const title =
    lang === "ru"
      ? "Избранные сделки команды RB Partners"
      : "Selected deals of the RB Partners team";

  return (
    <>
      <div className="page-back">
        <div className="wrapper">
          <div className="content">
            <Breadcrumbs current={lang === "ru" ? "Сделки" : "Deals"} />
            <h1>{title}</h1>
            <br />
            <ul className="sdelka-list">
              <li className="active">
                <span className="tab-link">
                  {lang === "ru" ? "Все сделки" : "All deals"}
                </span>
              </li>
            </ul>
            <br />
          </div>
        </div>
      </div>

      <div className="objects_block_wrp_list">
        <div className="objects_block_wrp active">
          <div className="objects_block">
            <ul className="objects_list">
              {deals.map((d) => (
                <li key={d.id}>
                  <div className="deal-img">
                    <div className="deal-img-wrp">
                      {d.thumb ? (
                        <img src={normalizeUrl(d.thumb)} alt={d.title} />
                      ) : (
                        <span className="deal-noimg">{d.title}</span>
                      )}
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
          </div>
        </div>
      </div>
    </>
  );
}
