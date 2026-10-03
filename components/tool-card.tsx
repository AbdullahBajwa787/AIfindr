"use client";

import Link from "next/link";
import { ArrowUpRight, Bookmark } from "lucide-react";
import type { Tool } from "@/lib/tools";
import { BrandMark } from "@/components/brand-mark";

export function ToolCard({ tool, index = 0 }: { tool: Tool; index?: number }) {
  return (
    <article className="tool-card" style={{ animationDelay: `${index * 40}ms` }}>
      <div className="card-top"><BrandMark tool={tool} /><button className="bookmark" aria-label={`Save ${tool.name}`} onClick={(e) => { e.currentTarget.classList.toggle("bookmarked"); }}><Bookmark size={16} /></button></div>
      <div className="card-heading"><h3>{tool.name}</h3>{tool.featured && <span className="featured-tag">PICK</span>}</div>
      <div className="tool-category">{tool.category}</div>
      <p>{tool.description}</p>
      <div className="card-bottom"><span className={`price-tag price-${tool.price.toLowerCase().replaceAll(" ", "-")}`}>{tool.price}</span><Link href={`/tools/${tool.slug}`} className="card-visit">Details <ArrowUpRight size={14} /></Link></div>
    </article>
  );
}
