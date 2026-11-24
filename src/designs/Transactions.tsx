import { useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Html from "../components/Html";
import { getBySlug, normalizeUrl } from "../content";
import { useLang } from "../lang";
import type { ContentItem } from "../types";
import { getTransactions, plainText, type Design } from "./data";
import { ContactBand, Icon, PageHeading } from "./ui";

export function TransactionList({ items, design }: { items: ContentItem[]; design: Design }) {
  const { lang } = useLang();
  const ru = lang === "ru";
  return (
    <div className={`transaction-set transaction-set--${design}`}>
      {design === "meridian" && (
        <div className="transaction-columns" aria-hidden="true">
          <span>{ru ? "Компания" : "Company"}</span>
          <span>{ru ? "Услуга" : "Advisory"}</span>
          <span>{ru ? "Год" : "Year"}</span>
        </div>
      )}
      <ul className="transaction-list">
        {items.map((item) => {
          const logo = normalizeUrl(item.thumb);
          return (
            <li key={item.id}>
              <Link className="transaction" to={`/deals/${encodeURIComponent(item.slug)}`}>
                {design !== "meridian" && (
                  <span className="transaction-logo">
                    {logo ? <img src={logo} alt="" loading="lazy" width="180" height="84" /> : <span>{item.title}</span>}
                  </span>
                )}
                <strong className="transaction-title">{item.title}</strong>
                <span className="transaction-description">{plainText(item.content || item.excerpt || "")}</span>
                {item.year && <span className="transaction-year">{item.year}</span>}
                {design !== "partnership" && <span className="transaction-arrow"><Icon name="diagonal" /></span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function DealsPage({ design }: { design: Design }) {
  const { lang } = useLang();
  const ru = lang === "ru";
  const [params, setParams] = useSearchParams();
  const items = useMemo(() => getTransactions(lang), [lang]);
  const search = params.get("q") ?? "";
  const year = params.get("year") ?? "";
  const term = search.trim().toLocaleLowerCase(lang);
  const years = Array.from(new Set(items.flatMap((item) => item.year ? [item.year] : [])));
  const visible = items.filter((item) => (
    (!year || item.year === year) &&
    (!term || [item.title, plainText(item.content || "")].join(" ").toLocaleLowerCase(lang).includes(term))
  ));

  function changeFilter(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  }

  return (
    <>
      <PageHeading index="03" label={ru ? "Практика" : "Experience"}
        title={ru ? "Избранные сделки" : "Selected transactions"}
        intro={ru ? "Проекты RB Partners по продаже и покупке бизнеса, привлечению капитала и корпоративным финансам."
          : "RB Partners projects in business sales and acquisitions, capital raising and corporate finance."} />
      <section className="wrap content-section">
        <div className="deal-filters">
          <label className="search-field">
            <span>{ru ? "Поиск по сделкам" : "Search transactions"}</span>
            <span className="search-control">
              <Icon name="search" />
              <input type="search" value={search} onChange={(event) => changeFilter("q", event.currentTarget.value)}
                placeholder={ru ? "Компания или услуга" : "Company or advisory service"} />
            </span>
          </label>
          <label className="year-field">
            <span>{ru ? "Год сделки" : "Transaction year"}</span>
            <select value={year} onChange={(event) => changeFilter("year", event.currentTarget.value)}>
              <option value="">{ru ? "Все годы" : "All years"}</option>
              {year && !years.includes(year) && <option value={year}>{year}</option>}
              {years.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          {(search || year) && <button type="button" className="reset-filter" onClick={() => setParams({}, { replace: true })}>
            {ru ? "Сбросить" : "Reset"} <Icon name="close" />
          </button>}
        </div>
        <p className="results-count" role="status">{ru ? "Найдено" : "Results"} {visible.length} / {items.length}</p>
        {visible.length ? <TransactionList items={visible} design={design} /> : (
          <div className="empty-state">
            <h2>{ru ? "Сделки не найдены" : "No transactions found"}</h2>
            <p>{ru ? "Попробуйте другое название компании или выберите другой год." : "Try a different company name or year."}</p>
          </div>
        )}
      </section>
      <ContactBand />
    </>
  );
}

export function DealPage() {
  const { lang } = useLang();
  const { slug = "" } = useParams();
  const ru = lang === "ru";
  const other = ru ? "en" : "ru";
  const localItem = getBySlug(lang, "deals", slug);
  const item = localItem ?? getBySlug(other, "deals", slug);
  const logo = normalizeUrl(item?.thumb);

  if (!item) return (
    <PageHeading index="404" label={ru ? "Архив" : "Archive"}
      title={ru ? "Сделка не найдена" : "Transaction not found"} back="/deals" />
  );

  return (
    <>
      <PageHeading index={item.year ?? "03"} label={ru ? "Избранная сделка" : "Selected transaction"}
        title={item.title} back="/deals" />
      <section className="wrap content-section deal-detail">
        {logo && <div className="transaction-logo"><img src={logo} alt="" /></div>}
        <div lang={localItem ? lang : other}>
          <h2>{ru ? "Роль RB Partners" : "RB Partners’ role"}</h2>
          <Html className="prose" html={item.content || item.excerpt || ""} />
        </div>
      </section>
      <ContactBand />
    </>
  );
}
