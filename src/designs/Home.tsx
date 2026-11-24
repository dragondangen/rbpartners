import { Link } from "react-router-dom";
import { normalizeUrl } from "../content";
import { getTeam } from "../data/team";
import { useLang } from "../lang";
import { getTransactions, practices, type Design } from "./data";
import { TransactionList } from "./Transactions";
import { Action, ContactBand, Figures, Icon } from "./ui";

function PracticeLinks({ design }: { design: Design }) {
  const { lang } = useLang();
  return (
    <ul className={`practice-links practice-links--${design}`}>
      {practices.map((practice, index) => (
        <li key={practice.id}>
          <Link to={`/services?service=${practice.id}`}>
            <span className="practice-number">0{index + 1}</span>
            {design === "meridian" && <span className="practice-icon"><Icon name={practice.icon} /></span>}
            <span className="practice-copy">
              <strong>{practice[lang]}</strong>
              <span>{lang === "ru" ? practice.textRu : practice.textEn}</span>
            </span>
            <span className="practice-arrow"><Icon name="diagonal" /></span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function SelectedWork({ design }: { design: Design }) {
  const { lang } = useLang();
  const ru = lang === "ru";
  const featured = getTransactions(lang).slice(0, design === "editorial" ? 3 : 4);
  return (
    <section className="section selected-work" aria-labelledby="selected-work-title">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span>02</span>{ru ? "Опыт" : "Experience"}</p>
            <h2 id="selected-work-title">{ru ? "Избранные сделки" : "Selected transactions"}</h2>
          </div>
          <Action tone="text" to="/deals">{ru ? "Все сделки" : "All transactions"}</Action>
        </div>
        <TransactionList design={design} items={featured} />
      </div>
    </section>
  );
}

function PeoplePreview({ design }: { design: Design }) {
  const { lang } = useLang();
  const ru = lang === "ru";
  const team = getTeam(lang).slice(0, 3);
  return (
    <section className={`section people-preview people-preview--${design}`} aria-labelledby="people-preview-title">
      <div className="wrap people-preview-grid">
        <div>
          <p className="eyebrow"><span>03</span>{ru ? "Команда" : "Team"}</p>
          <h2 id="people-preview-title">{ru ? "Люди, которые ведут сделки" : "The people behind the deals"}</h2>
          <p className="lede">{ru
            ? "Опыт работы в инвестиционных банках, финансовых и промышленных группах и компаниях «Большой четвёрки»."
            : "Experience across investment banks, financial and industrial groups, and Big Four firms."}</p>
          <Action tone="text" to="/team">{ru ? "Познакомиться с командой" : "Meet the team"}</Action>
        </div>
        <ul className="people-preview-portraits">
          {team.map(({ item }) => (
            <li key={item.id}>
              <img src={normalizeUrl(item.thumb)} alt="" width="150" height="200" loading="lazy" />
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function EditorialHome() {
  const { lang } = useLang();
  const ru = lang === "ru";
  return (
    <>
      <section className="editorial-hero wrap" aria-labelledby="home-title">
        <div className="editorial-hero-copy">
          <p className="eyebrow"><span className="brand-dot" />{ru ? "Инвестиционный консалтинг с 2004 года" : "Investment advisory since 2004"}</p>
          <h1 id="home-title">{ru ? "Решения для" : "Advice for"} <em>{ru ? "бизнеса и капитала" : "business and capital"}</em></h1>
          <p className="lede">{ru
            ? "Сопровождаем собственников и инвесторов в сделках M&A, привлечении финансирования и развитии бизнеса."
            : "We advise business owners and investors on M&A, financing and business growth."}</p>
          <div className="actions">
            <Action to="/contacts">{ru ? "Обсудить проект" : "Discuss a project"}</Action>
            <Action tone="text" to="/services">{ru ? "Наши услуги" : "Our services"}</Action>
          </div>
        </div>
        <figure className="editorial-photo">
          <img src="/design-media/editorial-architecture.jpg" alt="" width="1122" height="1402" />
          <figcaption><span>RB PARTNERS</span><span>EST. 2004</span></figcaption>
        </figure>
      </section>
      <section className="wrap editorial-credentials" aria-label={ru ? "RB Partners в цифрах" : "RB Partners in numbers"}>
        <Figures />
      </section>
      <section className="section editorial-practices" aria-labelledby="practice-title">
        <div className="wrap editorial-practice-grid">
          <div>
            <p className="eyebrow"><span>01</span>{ru ? "Экспертиза" : "Expertise"}</p>
            <h2 id="practice-title">{ru ? "Чем мы помогаем" : "How we can help"}</h2>
            <p className="lede">{ru ? "От подготовки бизнеса к сделке до её закрытия." : "From preparing a business for a deal through to closing."}</p>
          </div>
          <PracticeLinks design="editorial" />
        </div>
      </section>
      <SelectedWork design="editorial" />
      <PeoplePreview design="editorial" />
      <ContactBand />
    </>
  );
}

function MeridianGraphic() {
  const { lang } = useLang();
  const ru = lang === "ru";
  return (
    <div className="meridian-graphic" aria-hidden="true">
      <svg viewBox="0 0 560 425" fill="none" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="meridian-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0v28" stroke="#86b8b6" strokeOpacity=".14"/>
          </pattern>
          <radialGradient id="meridian-aura">
            <stop stopColor="#60e7c7" stopOpacity=".24"/>
            <stop offset="1" stopColor="#60e7c7" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="meridian-path" x1="54" y1="352" x2="513" y2="95" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2a746c"/>
            <stop offset=".55" stopColor="#8bf1d8"/>
            <stop offset="1" stopColor="#a7f0df"/>
          </linearGradient>
        </defs>
        <rect width="560" height="425" fill="url(#meridian-grid)"/>
        <circle cx="288" cy="216" r="179" fill="url(#meridian-aura)"/>
        <g stroke="#5b938e" strokeOpacity=".42">
          <circle cx="288" cy="216" r="70"/>
          <circle cx="288" cy="216" r="116"/>
          <circle cx="288" cy="216" r="166" strokeDasharray="2 6"/>
          <path d="M23 216h515M288 23v382" strokeDasharray="3 5"/>
          <path d="M18 51V18h33m458 0h33v33M18 374v33h33m458 0h33v-33"/>
        </g>
        <path d="M49 346 155 346 288 216 373 216 502 88" stroke="url(#meridian-path)" strokeWidth="2.5"/>
        <path d="M288 216 288 113 224 49M288 216l83 82h134" stroke="#4b9489" strokeDasharray="4 6"/>
        <circle cx="288" cy="216" r="33" fill="#182f36" stroke="#7de6cc"/>
        <circle cx="288" cy="216" r="9" fill="#8bf1d8"/>
        <circle cx="155" cy="346" r="6" fill="#8bf1d8"/>
        <circle cx="502" cy="88" r="6" fill="#8bf1d8"/>
        <circle cx="288" cy="113" r="4" fill="#8bf1d8"/>
        <circle cx="371" cy="298" r="4" fill="#8bf1d8"/>
      </svg>
      <span className="graphic-label graphic-label--top">{ru ? "Капитал" : "Capital"}</span>
      <span className="graphic-label graphic-label--mid">{ru ? "Стратегия" : "Strategy"}</span>
      <span className="graphic-label graphic-label--low">M&A</span>
    </div>
  );
}

export function MeridianHome() {
  const { lang } = useLang();
  const ru = lang === "ru";
  return (
    <>
      <section className="meridian-hero" aria-labelledby="home-title">
        <div className="wrap">
          <div className="meridian-hero-grid">
            <div className="meridian-hero-copy">
              <p className="eyebrow"><span className="brand-dot" />{ru ? "Независимый инвестиционный консультант" : "Independent investment adviser"}</p>
              <h1 id="home-title">{ru ? "Капитал" : "Capital"} <em>{ru ? "в движении." : "in motion."}</em></h1>
              <p className="lede">{ru
                ? "Помогаем покупать и продавать бизнес, привлекать капитал и принимать стратегические решения."
                : "We help businesses buy, sell, raise capital and make strategic decisions."}</p>
              <div className="actions">
                <Action to="/contacts">{ru ? "Обсудить задачу" : "Discuss a project"}</Action>
                <Action tone="secondary" to="/deals">{ru ? "Изучить сделки" : "Explore transactions"}</Action>
              </div>
            </div>
            <MeridianGraphic />
          </div>
          <Figures />
        </div>
      </section>
      <section className="section meridian-practices" aria-labelledby="practice-title">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span>01</span>{ru ? "Экспертиза" : "Expertise"}</p>
              <h2 id="practice-title">{ru ? "Направления работы" : "Advisory services"}</h2>
            </div>
            <Action tone="text" to="/services">{ru ? "Все услуги" : "All services"}</Action>
          </div>
          <PracticeLinks design="meridian" />
        </div>
      </section>
      <SelectedWork design="meridian" />
      <PeoplePreview design="meridian" />
      <ContactBand />
    </>
  );
}
