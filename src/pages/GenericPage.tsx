import { useLang } from "../lang";
import { getBySlug } from "../content";
import Html from "../components/Html";
import Breadcrumbs from "../components/Breadcrumbs";
import NotFound from "./NotFound";

/** Renders a single CMS page by slug, using the theme's content-page markup. */
export default function GenericPage({ slug, title }: { slug: string; title?: string }) {
  const { lang } = useLang();
  const item =
    getBySlug(lang, "pages", slug) ??
    getBySlug(lang === "ru" ? "en" : "ru", "pages", slug);

  if (!item) return <NotFound />;

  return (
    <div className="page-back">
      <div className="wrapper">
        <div className="content">
          <Breadcrumbs current={title || item.title} />
          <Html html={item.content} />
        </div>
      </div>
    </div>
  );
}
