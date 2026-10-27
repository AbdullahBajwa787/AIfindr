"use client";

import { ArrowUpRight } from "lucide-react";
import type { Tool } from "@/lib/tools";
import { BrandMark } from "@/components/brand-mark";

export function ToolCard({ tool, index = 0 }: { tool: Tool; index?: number }) {
  const visitUrl = tool.affiliateUrl || tool.website;
  return (
    <a
      className="tool-card"
      style={{ animationDelay: `${index * 40}ms`, color: "inherit", textDecoration: "none" }}
      href={visitUrl}
      target="_blank"
      rel={tool.affiliateUrl ? "sponsored nofollow noopener noreferrer" : "noopener noreferrer"}
      aria-label={`Visit ${tool.name} website (opens in a new tab)`}
    >
      <div className="card-top"><BrandMark tool={tool} /><span className="card-external" aria-hidden="true"><ArrowUpRight size={16} /></span></div>
      <div className="card-heading"><h3>{tool.name}</h3>{tool.featured && <span className="featured-tag">PICK</span>}</div>
      <div className="tool-category">{tool.category}</div>
      <p>{tool.description}</p>
      <div className="card-bottom"><span className={`price-tag price-${tool.price.toLowerCase().replaceAll(" ", "-")}`}>{tool.price}</span><span className="card-visit">Visit site <ArrowUpRight size={14} /></span></div>
      {tool.affiliateUrl && <span className="card-affiliate-note">AIFindr may earn a commission</span>}
    </a>
  );
}
