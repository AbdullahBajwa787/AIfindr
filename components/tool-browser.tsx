"use client";

import { useMemo, useState, useEffect } from "react";
import { Search, SlidersHorizontal, X, Bookmark, Sparkles, ArrowUpDown, Filter } from "lucide-react";
import { categories, tools } from "@/lib/tools";
import { ToolCard } from "@/components/tool-card";

export function ToolBrowser({
  initialCategory = "All tools",
  initialQuery = "",
}: {
  initialCategory?: string;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [price, setPrice] = useState("Any price");
  const [sortBy, setSortBy] = useState("default");
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [savedToolSlugs, setSavedToolSlugs] = useState<string[]>([]);

  // Listen to saved tools changes
  useEffect(() => {
    function loadSaved() {
      try {
        const saved = JSON.parse(localStorage.getItem("aifindr_saved_tools") || "[]");
        setSavedToolSlugs(saved);
      } catch {
        setSavedToolSlugs([]);
      }
    }
    loadSaved();
    window.addEventListener("aifindr_saved_changed", loadSaved);
    return () => window.removeEventListener("aifindr_saved_changed", loadSaved);
  }, []);

  const filtered = useMemo(() => {
    let result = tools.filter((tool) => {
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        `${tool.name} ${tool.category} ${tool.description} ${(tool.tags || []).join(" ")}`
          .toLowerCase()
          .includes(q);

      const matchesCategory = category === "All tools" || tool.category === category;
      const matchesPrice = price === "Any price" || tool.price === price;
      const matchesSaved = !showSavedOnly || savedToolSlugs.includes(tool.slug);

      return matchesQuery && matchesCategory && matchesPrice && matchesSaved;
    });

    if (sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "price-free") {
      result = [...result].sort((a, b) => (a.price === "Free" ? -1 : 1));
    }

    return result;
  }, [query, category, price, showSavedOnly, savedToolSlugs, sortBy]);

  return (
    <div className="w-full">
      {/* Search Bar + Filters Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-6">
        {/* Search input */}
        <div className="md:col-span-6 glossy-search flex items-center px-4 py-3">
          <Search size={18} className="text-[#a3ff12] shrink-0 mr-3 stroke-[2.5]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AI tools by name, features, tags..."
            aria-label="Search tools"
            className="w-full bg-transparent text-sm text-white placeholder-[#6d7e68] outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[#6d7e68] hover:text-[#a3ff12] p-1"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Price Filter */}
        <div className="md:col-span-3 glossy-card flex items-center px-4 py-3">
          <SlidersHorizontal size={16} className="text-[#a3ff12] shrink-0 mr-2.5" />
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            aria-label="Filter by price"
            className="w-full bg-transparent text-xs text-[#dbe7d9] outline-none cursor-pointer font-semibold"
          >
            <option value="Any price" className="bg-[#0c1209] text-white">All Pricing</option>
            <option value="Free" className="bg-[#0c1209] text-white">Free / Freemium</option>
            <option value="Paid" className="bg-[#0c1209] text-white">Paid Plans</option>
            <option value="Check pricing" className="bg-[#0c1209] text-white">Check Pricing</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="md:col-span-3 glossy-card flex items-center px-4 py-3">
          <ArrowUpDown size={16} className="text-[#a3ff12] shrink-0 mr-2.5" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort tools"
            className="w-full bg-transparent text-xs text-[#dbe7d9] outline-none cursor-pointer font-semibold"
          >
            <option value="default" className="bg-[#0c1209] text-white">Featured First</option>
            <option value="name" className="bg-[#0c1209] text-white">Name (A-Z)</option>
            <option value="price-free" className="bg-[#0c1209] text-white">Free Tools First</option>
          </select>
        </div>
      </div>

      {/* Category Chips Bar + Saved Toggle */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
          {/* Saved Tools Toggle */}
          <button
            type="button"
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`glossy-chip flex items-center gap-1.5 ${
              showSavedOnly ? "glossy-chip-active" : ""
            }`}
          >
            <Bookmark size={13} className={showSavedOnly ? "fill-[#040603]" : "fill-none"} />
            <span>Saved ({savedToolSlugs.length})</span>
          </button>

          <div className="h-5 w-[1px] bg-[#22331b] mx-1 shrink-0" />

          {/* Categories */}
          {categories.map((item) => {
            const isActive = category === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`glossy-chip ${isActive ? "glossy-chip-active" : ""}`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header Status */}
      <div className="flex items-center justify-between text-xs text-[#82937e] mb-6 px-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[#a3ff12] font-black text-sm">{filtered.length}</span>
          <span className="font-medium">{filtered.length === 1 ? "tool matching" : "tools matching"}</span>
          {(query || category !== "All tools" || price !== "Any price" || showSavedOnly) && (
            <button
              onClick={() => {
                setQuery("");
                setCategory("All tools");
                setPrice("Any price");
                setShowSavedOnly(false);
              }}
              className="text-[#a3ff12] underline ml-2 font-semibold hover:opacity-80"
            >
              Reset filters
            </button>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#71826d]">
          <Sparkles size={12} className="text-[#a3ff12]" />
          <span>Curated with craft</span>
        </div>
      </div>

      {/* Grid of Tool Cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((tool, i) => (
            <ToolCard key={tool.slug} tool={tool} index={i} />
          ))}
        </div>
      ) : (
        <div className="glossy-card text-center p-14 sm:p-20">
          <div className="inline-flex p-4 rounded-3xl bg-[#a3ff12]/15 text-[#a3ff12] mb-5 shadow-[0_0_30px_rgba(163,255,18,0.3)]">
            <Sparkles size={36} />
          </div>
          <h3 className="text-xl font-extrabold text-white mb-2">No tools matched your criteria</h3>
          <p className="text-xs sm:text-sm text-[#8c9d87] max-w-sm mx-auto mb-6">
            Try adjusting your search terms, changing the category, or clearing your active filters.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("All tools");
              setPrice("Any price");
              setShowSavedOnly(false);
            }}
            className="btn-glossy-primary"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
