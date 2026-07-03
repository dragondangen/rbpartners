import { useLang } from "../lang";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Contacts() {
  const { lang } = useLang();
  return (
    <div className="page-back">
      <div className="wrapper">
        <div className="content">
          <Breadcrumbs current={lang === "ru" ? "Контакты" : "Contacts"} />
          <h1>{lang === "ru" ? "Контакты" : "Contacts"}</h1>
          <div className="contacts-block" style={{ fontSize: "18px", lineHeight: 1.8 }}>
            <p>
              {lang === "ru" ? "Эл. почта: " : "E-mail: "}
              <a href="mailto:dzhimbinovkd@rbpartners.ru">dzhimbinovkd@rbpartners.ru</a>
            </p>
            <p>
              {lang === "ru" ? "Тел: " : "Tel: "}
              <a href="tel:+79035636727">+7 903 563 6727</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
