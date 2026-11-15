"use client";

import { useRouter } from "next/navigation";
import { Search, Sparkles, Flame, ArrowRight, Zap } from "lucide-react";
import { FormEvent, useState, useEffect, useRef } from "react";

const popularTags = [
  { label: "ChatGPT", query: "ChatGPT" },
  { label: "Claude", query: "Claude" },
  { label: "Midjourney", query: "Midjourney" },
  { label: "Cursor", query: "Cursor" },
  { label: "ElevenLabs", query: "ElevenLabs" },
  { label: "Suno", query: "Suno" },
  { label: "Free Tools", query: "Free" },
];

export function HomeSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus search input on '/' shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "/" && document.activeElement !== inputRef.current && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function search(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/tools?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/tools");
    }
  }

  function handleTagClick(tagQuery: string) {
    router.push(`/tools?q=${encodeURIComponent(tagQuery)}`);
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      {/* 3D Glossy Liquid Search Bar */}
      <form onSubmit={search} className="relative group">
        {/* Ambient Neon Outer Glow */}
        <div className="absolute -inset-1 rounded-[26px] bg-gradient-to-r from-[#a3ff12]/50 via-[#c7ff47]/30 to-[#62ce00]/50 opacity-40 blur-xl group-hover:opacity-85 group-focus-within:opacity-100 transition-opacity duration-500 -z-10" />

        <div className="glossy-search flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3.5">
          <div className="p-1 rounded-lg bg-[#a3ff12]/15 text-[#a3ff12] shadow-[0_0_12px_rgba(163,255,18,0.3)]">
            <Search size={20} className="shrink-0 stroke-[2.5]" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 120+ AI tools... (Press '/' to focus)"
            aria-label="Search AI tools"
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-[#758670] outline-none font-medium"
          />

          <button
            type="submit"
            className="btn-glossy-primary text-xs sm:text-sm py-2 sm:py-2.5 px-4 sm:px-6 shrink-0 font-extrabold"
          >
            <span>Search</span>
            <ArrowRight size={15} className="stroke-[2.5]" />
          </button>
        </div>
      </form>

      {/* Glossy Trending Tags */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="flex items-center gap-1.5 text-[#889982] font-mono text-[11px] font-semibold tracking-wider">
          <Flame size={13} className="text-[#a3ff12] animate-bounce" />
          <span>TRENDING:</span>
        </span>
        {popularTags.map((tag) => (
          <button
            key={tag.label}
            type="button"
            onClick={() => handleTagClick(tag.query)}
            className="glossy-chip py-1 px-3 text-[11px]"
          >
            {tag.label}
          </button>
        ))}
      </div>

      <div className="hero-note mt-4 flex items-center justify-center gap-2 text-xs text-[#7f907b]">
        <Sparkles size={13} className="text-[#a3ff12]" />
        <span>Handcrafted directory. <strong>Zero bloat, only high-utility tools.</strong></span>
      </div>
    </div>
  );
}
