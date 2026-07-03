import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useLang } from "../lang";

interface NavItem {
  to: string;
  ru: string;
  en: string;
}

const NAV: NavItem[] = [
  { to: "/about", ru: "О нас", en: "About us" },
  { to: "/services", ru: "Услуги", en: "Services" },
  { to: "/deals", ru: "Сделки", en: "Deals" },
  { to: "/team", ru: "Команда", en: "Team" },
  { to: "/globalscope", ru: "GLOBALSCOPE", en: "GLOBALSCOPE" },
  { to: "/contacts", ru: "Контакты", en: "Contacts" },
];

export default function Header() {
  const { lang, toggle } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="wrapper">
        <div className="dl-menuwrapper">
          <button
            className="dl-trigger"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            Menu
          </button>
        </div>

        <Link to="/" className="logo" aria-label="RB Partners" />

        <div className="rght-block">
          <div className="top-menu-block">
            <div className="soc-icons">
              <a
                href="https://www.facebook.com/rbpartnersmoscow/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src="/i/facebook.jpg" width="22" alt="Facebook" />
              </a>
              <a
                href="https://www.linkedin.com/company/2411542"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src="/i/in.jpg" width="22" alt="LinkedIn" />
              </a>
            </div>

            <div className="lang-go">
              <button onClick={toggle} aria-label="Switch language">
                <img
                  src={lang === "ru" ? "/i/flags/en.jpg" : "/i/flags/ru.jpg"}
                  alt={lang === "ru" ? "English" : "Русский"}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).replaceWith(
                      Object.assign(document.createElement("span"), {
                        textContent: lang === "ru" ? "EN" : "RU",
                      }),
                    );
                  }}
                />
              </button>
            </div>
          </div>

          <div className={`menu ${open ? "menu-open" : ""}`}>
            <nav id="menu">
              <ul>
                {NAV.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) => (isActive ? "current" : "")}
                      onClick={() => setOpen(false)}
                    >
                      {lang === "ru" ? item.ru : item.en}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
