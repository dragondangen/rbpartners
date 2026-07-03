import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Lang } from "./types";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const Ctx = createContext<LangCtx>({
  lang: "ru",
  setLang: () => {},
  toggle: () => {},
});

const STORAGE_KEY = "rbp_lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "en" ? "en" : "ru";
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "ru" ? "en" : "ru");
  }, [lang, setLang]);

  return <Ctx.Provider value={{ lang, setLang, toggle }}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  return useContext(Ctx);
}
