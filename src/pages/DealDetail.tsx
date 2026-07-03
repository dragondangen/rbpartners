import { Link, useParams } from "react-router-dom";
import { useLang } from "../lang";
import { getBySlug, normalizeUrl } from "../content";
import Html from "../components/Html";
import Breadcrumbs from "../components/Breadcrumbs";
import NotFound from "./NotFound";

export default function DealDetail() {
  const { lang } = useLang();
  const { slug = "" } = useParams();
  const item = getBySlug(lang, "deals", slug);
  if (!item) return <NotFound />;

  return (
    <div className="page-back">
      <div className="wrapper">
        <div className="content">
          <Breadcrumbs current={item.title} />
          <h1>
            {item.title}
            {item.year ? ` — ${item.year}` : ""}
          </h1>
          {item.thumb && (
            <p>
              <img src={normalizeUrl(item.thumb)} alt={item.title} style={{ maxHeight: 120 }} />
            </p>
          )}
          <Html html={item.content || `<p>${item.title}</p>`} />
          <p>
            <Link className="go-detail-inline" to="/deals">
              ← {lang === "ru" ? "Все сделки" : "All deals"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
