import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { LangProvider } from "../lang";
import DesignApp from "./DesignApp";
import "./styles/base.css";
import "./styles/editorial.css";
import "./styles/meridian.css";
import "./styles/partnership.css";

const root = document.getElementById("root")!;
const design = root.dataset.design === "partnership"
  ? "partnership"
  : root.dataset.design === "meridian" ? "meridian" : "editorial";

createRoot(root).render(
  <React.StrictMode>
    <HashRouter future={{ v7_startTransition: false, v7_relativeSplatPath: true }}>
      <LangProvider>
        <DesignApp design={design} />
      </LangProvider>
    </HashRouter>
  </React.StrictMode>,
);
