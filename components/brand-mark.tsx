"use client";

import { useState } from "react";
import type { Tool } from "@/lib/tools";

/** Shows the tool's own site icon, with the catalogue initials as a safe fallback. */
export function BrandMark({ tool, large = false }: { tool: Pick<Tool, "name" | "icon" | "color" | "website">; large?: boolean }) {
  const [failed, setFailed] = useState(false);
  const host = new URL(tool.website).hostname;
  const favicon = `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(`https://${host}`)}&sz=128`;

  return <span className={`tool-icon icon-${tool.color} ${large ? "tool-icon-large" : ""}`} aria-label={`${tool.name} logo`}>
    {!failed && <img src={favicon} alt="" loading="lazy" onError={() => setFailed(true)} />}
    {failed && <span aria-hidden="true">{tool.icon}</span>}
  </span>;
}
