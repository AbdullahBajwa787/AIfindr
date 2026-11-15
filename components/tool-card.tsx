"use client";

import { ArrowUpRight, Bookmark, Sparkles, ExternalLink } from "lucide-react";
import type { Tool } from "@/lib/tools";
import { BrandMark } from "@/components/brand-mark";
import { useState, useEffect } from "react";

export function ToolCard({ tool, index = 0 }: { tool: Tool; index?: number }) {
  const visitUrl = tool.affiliateUrl || tool.website;
  const [isSaved, setIsSaved] = useState(false);

  // Sync bookmark state with localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("aifindr_saved_tools") || "[]");
      setIsSaved(saved.includes(tool.slug));
    } catch {
      // ignore
    }
  }, [tool.slug]);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const saved = JSON.parse(localStorage.getItem("aifindr_saved_tools") || "[]");
      let nextSaved: string[];
      if (saved.includes(tool.slug)) {
        nextSaved = saved.filter((id: string) => id !== tool.slug);
        setIsSaved(false);
      } else {
        nextSaved = [...saved, tool.slug];
        setIsSaved(true);
      }
      localStorage.setItem("aifindr_saved_tools", JSON.stringify(nextSaved));
      window.dispatchEvent(new Event("aifindr_saved_changed"));
    } catch {
      setIsSaved(!isSaved);
    }
  };

  const getPriceBadgeStyle = (price: string) => {
    if (price === "Free") {
      return "border-emerald-400/40 text-emerald-300 bg-gradient-to-r from-emerald-950/60 to-emerald-900/30 shadow-[0_0_12px_rgba(52,211,153,0.2)]";
    }
    if (price === "Paid") {
      return "border-violet-400/40 text-violet-300 bg-gradient-to-r from-violet-950/60 to-violet-900/30 shadow-[0_0_12px_rgba(167,139,250,0.2)]";
    }
    return "border-[#a3ff12]/40 text-[#a3ff12] bg-gradient-to-r from-[#a3ff12]/15 to-[#a3ff12]/5 shadow-[0_0_12px_rgba(163,255,18,0.25)]";
  };

  return (
    <div
      className="glossy-card tool-card-modern group relative flex flex-col justify-between p-5 sm:p-6"
      style={{ animationDelay: `${index * 35}ms` }}
    >
      {/* Top Header: Icon + Category + Bookmark */}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <BrandMark tool={tool} />
            <div>
              <h3 className="text-base font-extrabold text-white group-hover:text-[#a3ff12] transition-colors flex items-center gap-1.5 drop-shadow-sm">
                {tool.name}
              </h3>
              <span className="text-[10px] font-mono font-semibold text-[#8ca087] uppercase tracking-wider">
                {tool.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {tool.featured && (
              <span className="inline-flex items-center gap-1 rounded-lg border border-[#a3ff12]/60 bg-gradient-to-b from-[#a3ff12]/25 to-[#a3ff12]/10 px-2 py-0.5 text-[9px] font-black font-mono text-[#a3ff12] tracking-wider shadow-[0_0_12px_rgba(163,255,18,0.35)]">
                <Sparkles size={10} className="fill-[#a3ff12]" />
                <span>PICK</span>
              </span>
            )}
            <button
              type="button"
              onClick={toggleSave}
              className={`p-1.5 rounded-xl border backdrop-blur-md transition-all ${
                isSaved
                  ? "border-[#a3ff12] bg-[#a3ff12]/20 text-[#a3ff12] shadow-[0_0_15px_rgba(163,255,18,0.4)]"
                  : "border-[#22331b] bg-[#0c130a]/80 text-[#71826d] hover:text-[#a3ff12] hover:border-[#a3ff12]/50 hover:bg-[#121c0e]"
              }`}
              title={isSaved ? "Remove from saved" : "Save tool"}
              aria-label={isSaved ? "Remove from saved" : "Save tool"}
            >
              <Bookmark size={14} className={isSaved ? "fill-[#a3ff12]" : ""} />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-xs text-[#9eb098] leading-relaxed line-clamp-3 font-normal">
          {tool.description}
        </p>

        {/* Tags */}
        {tool.tags && tool.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tool.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[#21301b] bg-[#0f170c]/80 px-2 py-0.5 text-[10px] font-mono text-[#84967f]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Bar: Price & Visit CTA */}
      <div className="relative z-10 mt-6 pt-4 border-t border-[#1a2815] flex items-center justify-between">
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${getPriceBadgeStyle(tool.price)}`}>
          {tool.price}
        </span>

        <a
          href={visitUrl}
          target="_blank"
          rel={tool.affiliateUrl ? "sponsored nofollow noopener noreferrer" : "noopener noreferrer"}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d4e2d0] hover:text-[#a3ff12] transition-colors group/link"
        >
          <span>Visit</span>
          <ArrowUpRight size={14} className="text-[#a3ff12] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform stroke-[2.5]" />
        </a>
      </div>

      {tool.affiliateUrl && (
        <span className="relative z-10 block mt-2 text-[9px] text-[#5c6e57] italic text-right">
          Partner link
        </span>
      )}
    </div>
  );
}
