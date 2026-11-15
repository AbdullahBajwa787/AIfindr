"use client";

import { useState } from "react";
import type { Tool } from "@/lib/tools";

/** Shows the tool's custom logo if set, or its site favicon, with initials as fallback. */
export function BrandMark({
  tool,
  large = false,
}: {
  tool: Pick<Tool, "name" | "icon" | "color" | "website"> & { logoUrl?: string };
  large?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  let src = tool.logoUrl;
  if (!src) {
    try {
      const host = new URL(tool.website).hostname;
      src = `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(`https://${host}`)}&sz=128`;
    } catch {
      src = "";
    }
  }

  return (
    <span
      className={`tool-icon icon-${tool.color || "mint"} ${large ? "tool-icon-large" : ""}`}
      aria-label={`${tool.name} logo`}
    >
      {src && !failed && (
        <img
          src={src}
          alt={`${tool.name} logo`}
          loading="lazy"
          className="w-full h-full object-contain"
          onError={() => setFailed(true)}
        />
      )}
      {(failed || !src) && <span aria-hidden="true">{tool.icon || "✳"}</span>}
    </span>
  );
}
