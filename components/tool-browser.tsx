"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { categories, tools } from "@/lib/tools";
import { ToolCard } from "@/components/tool-card";

export function ToolBrowser({ initialCategory = "All tools", initialQuery = "" }: { initialCategory?: string; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [price, setPrice] = useState("Any price");
  const filtered = useMemo(() => tools.filter((tool) => {
    const matchesQuery = `${tool.name} ${tool.category} ${tool.description} ${tool.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (category === "All tools" || tool.category === category) && (price === "Any price" || tool.price === price);
  }), [query, category, price]);

  return <>
    <div className="search-row"><label className="search-box"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try ‘make a presentation’ or ‘write better’" aria-label="Search AI tools" />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={16} /></button>}<kbd>↵</kbd></label><label className="price-select"><SlidersHorizontal size={16} /><select value={price} onChange={(e) => setPrice(e.target.value)} aria-label="Filter by price"><option>Any price</option><option>Free</option><option>Freemium</option><option>Paid</option><option>Check pricing</option></select></label></div>
    <div className="category-chips">{categories.map((item) => <button key={item} className={`category-chip ${category === item ? "chip-active" : ""}`} onClick={() => setCategory(item)}>{item}</button>)}</div>
    <div className="results-caption"><span>{filtered.length} lovely tools to explore</span><span>Curated with care <span className="caption-star">✳</span></span></div>
    {filtered.length ? <div className="tool-grid">{filtered.map((tool, i) => <ToolCard key={tool.slug} tool={tool} index={i} />)}</div> : <div className="empty-state"><span>◌</span><h3>No tools found just yet</h3><p>Try another search or choose a different category.</p><button className="button button-quiet" onClick={() => { setQuery(""); setCategory("All tools"); setPrice("Any price"); }}>Clear filters</button></div>}
  </>;
}
