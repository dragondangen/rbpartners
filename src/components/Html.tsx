import DOMPurify from "dompurify";
import { useMemo } from "react";
import { normalizeAssets } from "../content";

/**
 * Renders trusted-but-legacy HTML from the old CMS.
 * Every fragment is sanitized with DOMPurify to neutralize any script/handler
 * that may have been injected into the database, and legacy absolute asset
 * URLs are rewritten to local paths.
 */
export default function Html({ html, className }: { html: string; className?: string }) {
  const clean = useMemo(() => {
    const normalized = normalizeAssets(html || "");
    return DOMPurify.sanitize(normalized, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ["target", "rel"],
      FORBID_TAGS: ["script", "style", "iframe", "form", "object", "embed"],
      FORBID_ATTR: ["onerror", "onload", "onclick", "style"],
    });
  }, [html]);

  return <div className={className} dangerouslySetInnerHTML={{ __html: clean }} />;
}
