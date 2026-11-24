import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { getBySlug } from "../content";
import { useLang } from "../lang";
import { email, navigation, phone, tel, type Design } from "./data";
import { AboutPage, ContactPage, GlobalPage, MissingPage, ServicesPage, TeamPage } from "./Information";
import { DealPage, DealsPage } from "./Transactions";
import { EditorialHome, MeridianHome } from "./Home";
import PartnershipHome from "./PartnershipHome";
import { Brand, Icon } from "./ui";

function Header({ design }: { design: Design }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const ru = lang === "ru";

  useEffect(() => setOpen(false), [location.pathname]);

  function changeLanguage() {
    const next = ru ? "en" : "ru";
    setLang(next);
    const slug = location.pathname.split("/")[2];
    if (location.pathname.startsWith("/deals/") && slug && !getBySlug(next, "deals", slug)) {
      navigate("/deals", { replace: true });
    }
  }

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    }}>
      <div className="wrap header-inner">
        <Brand />
        <nav id="site-menu" className="site-nav" aria-label={ru ? "Основное меню" : "Main navigation"} data-open={open}>
          {navigation.map((item) => <NavLink key={item.path} to={item.path} onClick={() => setOpen(false)}>{item[lang]}</NavLink>)}
        </nav>
        <div className="header-actions">
          <button type="button" className="language-control" onClick={changeLanguage}
            aria-label={ru ? "Switch to English" : "Переключиться на русский"}>
            {design === "partnership" && <Icon name="globe" />}
            <span>{ru ? "EN" : "RU"}</span>
          </button>
          {design === "meridian" && (
            <Link className="header-contact" to="/contacts">
              {ru ? "Связаться" : "Get in touch"} <Icon name="diagonal" />
            </Link>
          )}
          <button ref={menuButton} type="button" className="menu-control" aria-expanded={open} aria-controls="site-menu"
            aria-label={ru ? "Меню" : "Menu"} onClick={() => setOpen(!open)}>
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer({ design }: { design: Design }) {
  const { lang } = useLang();
  const ru = lang === "ru";
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-main">
          <div>
            <Brand />
            <p>{ru ? "Независимый инвестиционный консультант" : "Independent investment adviser"}</p>
          </div>
          <nav className="footer-links" aria-label={ru ? "Разделы сайта" : "Site links"}>
            {navigation.map((item) => <Link key={item.path} to={item.path}>{item[lang]}</Link>)}
            <Link to="/globalscope">Globalscope</Link>
          </nav>
          <address className="footer-contact">
            <a href={`mailto:${email}`}>{email}</a>
            <a href={`tel:${tel}`}>{phone}</a>
          </address>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} RB Partners</span>
          <div>
            <a href="/">{ru ? "Исходный сайт" : "Original site"}</a>
            {[
              { id: "editorial", ru: "Редакционный", en: "Editorial" },
              { id: "meridian", ru: "Меридиан", en: "Meridian" },
              { id: "partnership", ru: "Партнёрство", en: "Partnership" },
            ].filter((item) => item.id !== design).map((item) => (
              <a key={item.id} href={`/designs/${item.id}/`}>{item[lang]}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function Shell({ design }: { design: Design }) {
  const { lang } = useLang();
  const { pathname } = useLocation();
  const main = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    const section = navigation.find(({ path }) => pathname === path || pathname.startsWith(path + "/"));
    const label = section?.[lang] ?? (pathname === "/globalscope" ? "Globalscope" : "");
    document.title = label ? `${label} | RB Partners` : "RB Partners";
  }, [lang, pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <button className="skip-link" onClick={() => main.current?.focus()}>{lang === "ru" ? "К основному содержимому" : "Skip to content"}</button>
      <Header design={design} />
      <main id="main-content" tabIndex={-1} ref={main}><Outlet /></main>
      <Footer design={design} />
    </>
  );
}

export default function DesignApp({ design }: { design: Design }) {
  return (
    <Routes>
      <Route element={<Shell design={design} />}>
        <Route index element={design === "partnership" ? <PartnershipHome /> : design === "editorial" ? <EditorialHome /> : <MeridianHome />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage design={design} />} />
        <Route path="deals" element={<DealsPage design={design} />} />
        <Route path="deals/:slug" element={<DealPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="contacts" element={<ContactPage />} />
        <Route path="globalscope" element={<GlobalPage />} />
        <Route path="*" element={<MissingPage />} />
      </Route>
    </Routes>
  );
}
