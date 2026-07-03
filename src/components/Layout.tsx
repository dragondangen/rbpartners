import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Mirrors the original theme markup:
  // page-wrapper > (page > header + content) + footer
  return (
    <div className="page-wrapper">
      <div className="page">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
