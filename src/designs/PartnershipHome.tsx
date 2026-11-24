import { Link } from "react-router-dom";
import { normalizeUrl } from "../content";
import { getTeam } from "../data/team";
import { useLang } from "../lang";
import { email, getTransactions, practices } from "./data";
import { TransactionList } from "./Transactions";

export default function PartnershipHome() {
  const { lang } = useLang();
  const ru = lang === "ru";
  const transactions = getTransactions(lang).slice(0, 3);
  const team = getTeam(lang).slice(0, 3);

  return (
    <>
      <section className="partnership-hero" aria-labelledby="partnership-title">
        <img className="partnership-hero-image" src="/design-media/partnership/glass-facade.jpg"
          alt="" width="2560" height="2058" />
        <div className="wrap">
          <h1 id="partnership-title">
            <span>{ru ? "Стратегическое видение." : "Strategic vision."}</span>
            {" "}
            <span>{ru ? "Надёжное партнёрство." : "A trusted partnership."}</span>
          </h1>
          <p>{ru ? "Нам доверяют свой капитал с 2004 года" : "Trusted with your capital since 2004"}</p>
          <Link to="/contacts" className="action partnership-hero-action">{ru ? "Подать заявку" : "Get in touch"}</Link>
        </div>
      </section>

      <section className="partnership-overview" aria-labelledby="partnership-intro">
        <div className="overview-copy">
          <p className="eyebrow">{ru ? "Кто мы" : "Who we are"}</p>
          <h2 id="partnership-intro">{ru
            ? "Мы — частный инвестиционный консультант, работающий на российском рынке купли-продажи бизнеса и привлечения финансирования."
            : "We are an independent investment adviser specialising in business acquisitions, sales and financing in Russia."}</h2>
          <Link className="action action--secondary" to="/about">{ru ? "Узнать больше" : "Learn more"}</Link>
        </div>
        <dl>
          <div className="overview-founded">
            <dt>{ru ? "Год основания" : "Founded"}</dt>
            <dd>2004</dd>
          </div>
          <div className="overview-volume">
            <dt>{ru ? "Общий объём сделок" : "Total transaction value"}</dt>
            <dd>{ru ? "$2,5 млрд+" : "$2.5bn+"}</dd>
          </div>
          <div className="overview-projects">
            <dt>{ru ? "Проектов M&A" : "M&A projects"}</dt>
            <dd>90+</dd>
          </div>
        </dl>
      </section>

      <section className="section partnership-expertise" aria-labelledby="partnership-services">
        <div className="wrap">
          <div className="partnership-section-heading">
            <div>
              <p className="eyebrow">{ru ? "Наши компетенции" : "Our expertise"}</p>
              <h2 id="partnership-services">{ru ? "Решения для вашего бизнеса" : "Advice shaped around your business"}</h2>
            </div>
            <p>{ru
              ? "Помогаем собственникам и инвесторам решать задачи, определяющие будущее компании."
              : "We help owners and investors make the decisions that shape their company’s future."}</p>
          </div>
          <ul className="partnership-service-grid">
            {practices.map((practice) => (
              <li key={practice.id}>
                <h3>{practice[lang]}</h3>
                <p>{ru ? practice.textRu : practice.textEn}</p>
                <Link to={`/services?service=${practice.id}`} className="partnership-text-link"
                  aria-label={`${ru ? "Подробнее" : "Learn more"} — ${practice[lang]}`}>
                  {ru ? "Подробнее" : "Learn more"}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="partnership-principles" aria-labelledby="partnership-principles-title">
        <div className="wrap">
          <div>
            <p className="eyebrow">{ru ? "Наш подход" : "Our approach"}</p>
            <h2 id="partnership-principles-title">{ru
              ? "Понимать бизнес. Видеть перспективу."
              : "Understanding business. Seeing the possibilities."}</h2>
          </div>
          <div className="partnership-principles-copy">
            <p>{ru
              ? "За каждой сделкой стоят цели собственника, история компании и её следующий этап. Мы соединяем финансовую экспертизу с практическим пониманием бизнеса."
              : "Every transaction reflects an owner’s goals, a company’s history and its next chapter. We combine financial expertise with a practical understanding of business."}</p>
            <ul>
              <li>{ru ? "Независимость суждений" : "Independent thinking"}</li>
              <li>{ru ? "Внимание к интересам клиента" : "Attention to our clients’ interests"}</li>
              <li>{ru ? "Опыт российских и международных сделок" : "Domestic and cross-border experience"}</li>
            </ul>
            <Link to="/about" className="partnership-text-link">{ru ? "О компании" : "About the firm"}</Link>
          </div>
        </div>
      </section>

      <section className="section partnership-work" aria-labelledby="partnership-deals">
        <div className="wrap">
          <div className="partnership-section-heading">
            <div>
              <p className="eyebrow">{ru ? "Наш опыт" : "Our experience"}</p>
              <h2 id="partnership-deals">{ru ? "Избранные сделки" : "Selected transactions"}</h2>
            </div>
            <Link className="action action--secondary" to="/deals">{ru ? "Смотреть все сделки" : "View all transactions"}</Link>
          </div>
          <TransactionList design="partnership" items={transactions} />
        </div>
      </section>

      <section className="section partnership-people" aria-labelledby="partnership-team">
        <div className="wrap">
          <div className="partnership-section-heading">
            <div>
              <p className="eyebrow">{ru ? "Наша команда" : "Our team"}</p>
              <h2 id="partnership-team">{ru ? "Опыт, на который можно опереться" : "Experience you can rely on"}</h2>
            </div>
            <Link className="action action--secondary" to="/team">{ru ? "Познакомиться с командой" : "Meet the team"}</Link>
          </div>
          <div className="partnership-team-layout">
            <p className="partnership-team-intro">{ru
              ? "Партнёры с многолетним опытом работы в инвестиционных банках, крупнейших финансовых и промышленных группах, а также компаниях «Большой четвёрки»."
              : "Partners with extensive experience at investment banks, major financial and industrial groups, and Big Four firms."}</p>
            <ul className="partnership-portraits">
              {team.map(({ item }) => (
                <li key={item.id}>
                  <img src={normalizeUrl(item.thumb)} alt="" width="150" height="200" loading="lazy" />
                  <h3>{item.title}</h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="partnership-contact" aria-labelledby="partnership-contact-title">
        <div className="wrap">
          <div>
            <p className="eyebrow">{ru ? "Начало диалога" : "Start a conversation"}</p>
            <h2 id="partnership-contact-title">{ru
              ? "Будущее начинается с разговора"
              : "The next chapter starts with a conversation"}</h2>
            <p>{ru
              ? "Расскажите о ваших планах. Вместе определим следующие шаги."
              : "Tell us about your plans. Let’s explore the next steps together."}</p>
          </div>
          <div className="partnership-contact-actions">
            <Link to="/contacts" className="action">{ru ? "Обсудить проект" : "Discuss a project"}</Link>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        </div>
      </section>
    </>
  );
}
