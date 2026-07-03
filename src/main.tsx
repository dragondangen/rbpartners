import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LangProvider } from "./lang";
// Original rbpartner2 theme stylesheets are linked statically from index.html
// (public/theme/*) so the browser parses them verbatim, tolerating the legacy
// CSS quirks that strict build-time tooling would reject.

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LangProvider>
        <App />
      </LangProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
