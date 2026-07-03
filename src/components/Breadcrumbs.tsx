import { Link } from "react-router-dom";
import { useLang } from "../lang";

/** Reproduces the theme's .bredcrums block (Breadcrumb NavXT output). */
export default function Breadcrumbs({ current }: { current: string }) {
  const { lang } = useLang();
  return (
    <div className="bredcrums" typeof="BreadcrumbList">
      <h1>
        <Link to="/">{lang === "ru" ? "Главная" : "Home"}</Link>
        {" » "}
        <span>{current}</span>
      </h1>
    </div>
  );
}
