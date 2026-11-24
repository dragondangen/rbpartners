import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Html from "../components/Html";
import { getBySlug, getHome, normalizeUrl } from "../content";
import { getTeam } from "../data/team";
import { useLang } from "../lang";
import { email, getServiceDetails, phone, tel, type Design } from "./data";
import { Action, ContactBand, Figures, Icon, PageHeading } from "./ui";

export function AboutPage() {
  const { lang } = useLang();
  const ru = lang === "ru";
  const about = getBySlug(lang, "pages", "about-us");
  return (
    <>
      <PageHeading index="01" label="RB Partners"
        title={ru ? "О компании" : "About the firm"}
        intro={ru ? "Инвестиционный консалтинг для собственников бизнеса и инвесторов с 2004 года."
          : "Investment advisory for business owners and investors since 2004."} />
      <section className="wrap content-section">
        <Figures />
        <div className="about-body">
          <Html className="prose" html={about?.content ?? ""} />
          <aside className="context-card">
            <p className="eyebrow">{ru ? "Международный опыт" : "International experience"}</p>
            <h2>Globalscope</h2>
            <p>{ru ? "История участия RB Partners в международной ассоциации M&A консультантов."
              : "The history of RB Partners’ participation in the international M&A advisory network."}</p>
            <Action to="/globalscope" tone="text">{ru ? "Об ассоциации" : "About the network"}</Action>
          </aside>
        </div>
      </section>
      <ContactBand />
    </>
  );
}

export function ServicesPage({ design }: { design: Design }) {
  const { lang } = useLang();
  const ru = lang === "ru";
  const [params, setParams] = useSearchParams();
  const services = useMemo(() => getServiceDetails(lang), [lang]);
  const panel = useRef<HTMLElement>(null);
  const requested = params.get("service");
  const selected = services.find((item) => item.id === requested) ?? services[0];
  const isOpen = requested !== "closed";

  function selectService(id: string) {
    setParams({ service: id }, { replace: true });
    if (design === "meridian" && window.matchMedia("(max-width: 760px)").matches) {
      panel.current?.focus({ preventScroll: true });
      panel.current?.scrollIntoView({ block: "start" });
    }
  }

  return (
    <>
      <PageHeading index="02" label={ru ? "Экспертиза" : "Expertise"}
        title={ru ? "Наши услуги" : "Advisory services"}
        intro={ru ? "Сопровождаем сделки, готовим компании к инвестициям и помогаем решать задачи финансирования."
          : "We advise on transactions, help prepare companies for investment and address financing needs."} />
      <div className="wrap content-section">
        {design !== "meridian" ? (
          <div className="service-accordion">
            {services.map((item, index) => {
              const expanded = isOpen && item.id === selected?.id;
              return (
                <section key={item.id} className="service-disclosure">
                  <h2>
                    <button type="button" id={`trigger-${item.id}`} aria-expanded={expanded} aria-controls={`panel-${item.id}`}
                      onClick={() => selectService(expanded ? "closed" : item.id)}>
                      <span className="service-index-number">0{index + 1}</span>
                      <span>{item.title}</span>
                      <Icon name="plus" />
                    </button>
                  </h2>
                  <div className="service-body" id={`panel-${item.id}`} hidden={!expanded}
                    role="region" aria-labelledby={`trigger-${item.id}`}>
                    {expanded && <Html className="prose" html={item.content} />}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="service-console">
            <div className="service-console-index" aria-label={ru ? "Направления" : "Services"}>
              {services.map((item, index) => (
                <button type="button" key={item.id} aria-pressed={item.id === selected?.id}
                  aria-controls="service-content" onClick={() => selectService(item.id)}>
                  <span className="service-index-number">0{index + 1}</span>
                  {item.title}
                  <Icon name="arrow" />
                </button>
              ))}
            </div>
            {selected && (
              <section id="service-content" className="service-console-panel" ref={panel}
                tabIndex={-1} aria-labelledby="service-panel-title">
                <h2 id="service-panel-title">{selected.title}</h2>
                <Html className="prose" html={selected.content} />
              </section>
            )}
          </div>
        )}
      </div>
      <ContactBand />
    </>
  );
}

export function TeamPage() {
  const { lang } = useLang();
  const ru = lang === "ru";
  const team = useMemo(() => getTeam(lang), [lang]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex === null ? null : team[selectedIndex];
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (selectedIndex !== null && dialog.current && !dialog.current.open) dialog.current.showModal();
  }, [selectedIndex]);

  return (
    <>
      <PageHeading index="04" label="RB Partners"
        title={ru ? "Команда" : "Our team"}
        intro={ru ? "Партнёры с практическим опытом в инвестиционном банкинге, корпоративных финансах и реальном секторе."
          : "Partners with hands-on experience in investment banking, corporate finance and industry."} />
      <section className="wrap content-section">
        <ul className="team-grid">
          {team.map(({ item, bio }, index) => {
            const photo = normalizeUrl(item.thumb);
            return (
              <li key={item.id} className="person">
                <div className="person-photo">
                  {photo ? <img src={photo} alt="" width="150" height="200" loading="lazy" /> : <span>RB</span>}
                </div>
                <div className="person-copy">
                  <span className="person-index">0{index + 1}</span>
                  <h2>{item.title}</h2>
                  {bio && (
                    <button type="button" onClick={() => setSelectedIndex(index)} aria-haspopup="dialog"
                      aria-label={`${ru ? "Биография" : "Biography"}: ${item.title}`}>
                      {ru ? "Биография" : "Biography"} <Icon name="diagonal" />
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <dialog ref={dialog} className="profile-dialog" aria-labelledby="profile-title"
        onClose={() => setSelectedIndex(null)}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        {selected && (
          <div className="profile-content">
            <button className="dialog-close" type="button" autoFocus
              aria-label={ru ? "Закрыть биографию" : "Close biography"}
              onClick={() => dialog.current?.close()}><Icon name="close" /></button>
            <p className="eyebrow">{ru ? "Команда RB Partners" : "RB Partners team"}</p>
            <h2 id="profile-title">{selected.item.title}</h2>
            <Html className="prose" html={selected.bio} />
          </div>
        )}
      </dialog>
      <ContactBand />
    </>
  );
}

export function ContactPage() {
  const { lang } = useLang();
  const ru = lang === "ru";
  return (
    <>
      <PageHeading index="05" label={ru ? "Контакты" : "Contact"}
        title={ru ? "Обсудим ваш проект" : "Let’s discuss your project"}
        intro={ru ? "Напишите или позвоните нам, чтобы обсудить задачу и возможные следующие шаги."
          : "Email or call us to discuss your plans and possible next steps."} />
      <div className="wrap content-section contact-options">
        <a href={`mailto:${email}`}>
          <span className="contact-option-icon"><Icon name="mail" /></span>
          <span><span className="eyebrow">{ru ? "Электронная почта" : "Email"}</span><strong>{email}</strong></span>
          <Icon name="diagonal" />
        </a>
        <a href={`tel:${tel}`}>
          <span className="contact-option-icon"><Icon name="phone" /></span>
          <span><span className="eyebrow">{ru ? "Телефон" : "Phone"}</span><strong>{phone}</strong></span>
          <Icon name="diagonal" />
        </a>
      </div>
    </>
  );
}

export function GlobalPage() {
  const { lang } = useLang();
  const ru = lang === "ru";
  return (
    <>
      <PageHeading index="2010–2022" label={ru ? "Международный опыт" : "International experience"} title="Globalscope"
        intro={ru ? "История участия RB Partners в международной ассоциации инвестиционных консультантов."
          : "The history of RB Partners’ participation in the international association of investment advisers."} />
      <section className="wrap content-section globalscope-body">
        <Html className="prose" html={getHome(lang).globalscope || ""} />
        <Link className="action action--text" to="/about">
          {ru ? "О компании RB Partners" : "About RB Partners"} <Icon name="diagonal" />
        </Link>
      </section>
      <ContactBand />
    </>
  );
}

export function MissingPage() {
  const { lang } = useLang();
  const ru = lang === "ru";
  return (
    <>
      <PageHeading index="404" label="RB Partners" title={ru ? "Страница не найдена" : "Page not found"} />
      <div className="wrap content-section">
        <Action to="/">{ru ? "На главную" : "Go to homepage"}</Action>
      </div>
    </>
  );
}
