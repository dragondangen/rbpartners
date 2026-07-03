import { useEffect, useRef } from "react";
import { useLang } from "../lang";
import { getBySlug } from "../content";
import Html from "../components/Html";
import Breadcrumbs from "../components/Breadcrumbs";
import NotFound from "./NotFound";

/**
 * Services page. The original CMS content is an accordion: a list of service
 * links (.usluga-detail -> #usluga-descN) and hidden detail blocks (.usluga-desc)
 * that the theme revealed via JS by toggling an `active` class. That JS is
 * stripped on sanitisation, so we re-implement the behaviour here with event
 * delegation over the rendered (sanitised) markup.
 */
export default function Services() {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const item =
    getBySlug(lang, "pages", "services") ??
    getBySlug(lang === "ru" ? "en" : "ru", "pages", "services");

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>(".usluga-item"));
    const descs = Array.from(root.querySelectorAll<HTMLElement>(".usluga-desc"));

    const activate = (hash: string) => {
      const target = hash ? root.querySelector<HTMLElement>(hash) : null;
      descs.forEach((d) => d.classList.toggle("active", d === target));
      items.forEach((it) => {
        const a = it.querySelector<HTMLAnchorElement>("a.usluga-detail");
        const h = a?.getAttribute("href") || "";
        it.classList.toggle("active", h === hash);
      });
    };

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a.usluga-detail");
      if (!a || !root.contains(a)) return;
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("#")) return;
      e.preventDefault();
      activate(href);
      const target = root.querySelector<HTMLElement>(href);
      target?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };

    root.addEventListener("click", onClick);

    // open the first service by default
    const firstHref = items[0]
      ?.querySelector<HTMLAnchorElement>("a.usluga-detail")
      ?.getAttribute("href");
    if (firstHref) activate(firstHref);

    return () => root.removeEventListener("click", onClick);
  }, [item, lang]);

  if (!item) return <NotFound />;

  return (
    <div className="page-back" ref={ref}>
      <div className="wrapper">
        <div className="content">
          <Breadcrumbs current={lang === "ru" ? "Наши услуги" : "Services"} />
        </div>
      </div>
      <Html html={item.content} />
    </div>
  );
}
