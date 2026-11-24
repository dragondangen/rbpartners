import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../lang";
import { figures } from "./data";

const shapes = {
  arrow: <><path d="M3 12h17"/><path d="m14 6 6 6-6 6"/></>,
  diagonal: <><path d="M5 19 19 5"/><path d="M7 5h12v12"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
  close: <path d="m5 5 14 14M19 5 5 19"/>,
  menu: <path d="M3 7h18M3 12h18M3 17h18"/>,
  search: <><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 5 5"/></>,
  deal: <path d="M3 8h17m-4-4 4 4-4 4m5 4H4m4-4-4 4 4 4"/>,
  strategy: <><path d="M4 20V4h16M8 15l4-5 4 2 4-5"/><circle cx="20" cy="7" r="1"/></>,
  capital: <path d="M5 19v-5m5 5V9m5 10V5m5 14V2M3 22h19"/>,
  shield: <><path d="M12 3 4 6v5c0 4 3 7 8 10 5-3 8-6 8-10V6l-8-3Z"/><path d="m9 12 2 2 4-5"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
  phone: <path d="M6 3H4a1 1 0 0 0-1 1c0 9 8 17 17 17a1 1 0 0 0 1-1v-2l-5-2-2 2c-4-2-6-4-8-8l2-2-2-5Z"/>,
  globe: <><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 6.5h14M5 17.5h14"/></>,
} satisfies Record<string, ReactNode>;

export function Icon({ name }: { name: keyof typeof shapes }) {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">
      {shapes[name]}
    </svg>
  );
}

export function Brand() {
  return (
    <Link className="brand" to="/" aria-label="RB Partners">
      <svg aria-hidden="true" viewBox="0 0 48 48" width="40" height="40">
        <path fill="currentColor" d="M2 3h41A89 89 0 0 0 2 25ZM2 42A78 78 0 0 1 46 8v34Z"/>
      </svg>
      <span>RB<strong>Partners</strong></span>
    </Link>
  );
}

export function Action({ to, children, tone = "primary" }: {
  to: string;
  children: ReactNode;
  tone?: "primary" | "secondary" | "text";
}) {
  return <Link className={`action action--${tone}`} to={to}>{children}<Icon name="diagonal" /></Link>;
}

export function Figures() {
  const { lang } = useLang();
  return (
    <dl className="figures">
      {figures.map((figure) => (
        <div key={figure.labelEn}>
          <dt>{lang === "ru" ? figure.labelRu : figure.labelEn}</dt>
          <dd>{figure[lang]}</dd>
        </div>
      ))}
    </dl>
  );
}

export function PageHeading({ index, label, title, intro, back = "/" }: {
  index: string;
  label: string;
  title: string;
  intro?: string;
  back?: string;
}) {
  const { lang } = useLang();
  return (
    <div className="page-heading">
      <div className="wrap">
        <Link className="back-link" to={back}>
          <span aria-hidden="true">←</span> {back === "/deals" ? (lang === "ru" ? "Сделки" : "Transactions") : (lang === "ru" ? "Главная" : "Home")}
        </Link>
        <div className="page-heading-copy">
          <p className="eyebrow"><span data-context={/^\d{4}/.test(index) ? "date" : undefined}>{index}</span>{label}</p>
          <h1>{title}</h1>
          {intro && <p className="lede">{intro}</p>}
        </div>
      </div>
    </div>
  );
}

export function ContactBand() {
  const { lang } = useLang();
  const ru = lang === "ru";
  return (
    <section className="contact-band" aria-labelledby="contact-band-title">
      <div className="wrap">
        <div>
          <p className="eyebrow">{ru ? "Следующий шаг" : "Next steps"}</p>
          <h2 id="contact-band-title">{ru ? "Обсудим вашу задачу" : "Let’s talk about your plans"}</h2>
        </div>
        <Action to="/contacts">{ru ? "Связаться с нами" : "Get in touch"}</Action>
      </div>
    </section>
  );
}
