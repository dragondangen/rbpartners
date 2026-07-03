import { Link } from "react-router-dom";
import { useLang } from "../lang";

export default function Footer() {
  const { lang } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="wrapper">
        <div className="left-menu">
          <ul>
            <li><Link to="/about">{lang === "ru" ? "О нас" : "About us"}</Link></li>
            <li><Link to="/services">{lang === "ru" ? "Услуги" : "Services"}</Link></li>
            <li><Link to="/deals">{lang === "ru" ? "Сделки" : "Deals"}</Link></li>
            <li><Link to="/team">{lang === "ru" ? "Команда" : "Team"}</Link></li>
          </ul>
          <ul>
            <li><Link to="/globalscope">GLOBALSCOPE</Link></li>
            <li><Link to="/contacts">{lang === "ru" ? "Контакты" : "Contacts"}</Link></li>
          </ul>
        </div>

        <div className="right-info">
          <div className="office">
            <div className="copyrite">
              © {year} <Link to="/">RB Partners</Link>
            </div>
            {lang === "ru" ? (
              <>
                E-mail: <a href="mailto:dzhimbinovkd@rbpartners.ru">dzhimbinovkd@rbpartners.ru</a>
                <br />
                Тел.: <a href="tel:+79035636727">+7 903 563 6727</a>
              </>
            ) : (
              <>
                E-mail: <a href="mailto:dzhimbinovkd@rbpartners.ru">dzhimbinovkd@rbpartners.ru</a>
                <br />
                Tel.: <a href="tel:+79035636727">+7 903 563 6727</a>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
