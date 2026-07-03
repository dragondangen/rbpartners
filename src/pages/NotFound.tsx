import { Link } from "react-router-dom";
import { useLang } from "../lang";
import Breadcrumbs from "../components/Breadcrumbs";

export default function NotFound() {
  const { lang } = useLang();
  return (
    <div className="page-back">
      <div className="wrapper">
        <div className="content">
          <Breadcrumbs current="404" />
          <h1>404</h1>
          <p>{lang === "ru" ? "Страница не найдена." : "Page not found."}</p>
          <p>
            <Link className="go-detail-inline" to="/">
              {lang === "ru" ? "На главную" : "Go home"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
