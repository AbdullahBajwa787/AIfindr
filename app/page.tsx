import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { HomeSearch } from "@/components/home-search";
import { ToolCard } from "@/components/tool-card";
import { tools, categories } from "@/lib/tools";

export default function Home() {
  const featured = [...tools.filter((tool) => tool.featured), tools.find((tool) => tool.slug === "notion-ai")!];
  return <>
    <section className="home-hero"><div className="hero-glow" /><div className="hero-copy"><div className="eyebrow" style={{ justifyContent: "center" }}><span className="eyebrow-dot" />YOUR AI TOOLKIT, SORTED</div><h1>Find your next<br /><em>favorite</em> AI tool.</h1><p>Less searching. More making.<br />Meet the tools that help you do your thing.</p><HomeSearch /><div className="hero-meta"><div><strong>{tools.length}</strong><span>tools to explore</span></div><div><strong>{categories.length - 1}</strong><span>thoughtful categories</span></div><div><strong>0</strong><span>hype, just good tools</span></div></div></div></section>
    <section className="featured-section"><div className="section-head"><div><div className="section-kicker">A good place to start</div><h2>Tools worth knowing</h2></div><Link href="/tools" className="text-link">See all tools <ArrowRight size={14} /></Link></div><div className="tool-grid">{featured.map((tool, i) => <ToolCard key={tool.slug} tool={tool} index={i} />)}</div><div className="category-strip">{categories.slice(1).map((category) => <Link href={`/categories#${encodeURIComponent(category.toLowerCase().replaceAll(" ", "-"))}`} key={category} className="category-link">{category} <span>↗</span></Link>)}</div></section>
    <section className="bottom-cta"><div><div className="section-kicker">Know a good one?</div><h2>Good tools deserve to be found.</h2><p>Send your favorite our way. We’d love to meet it.</p></div><Link href="/submit" className="button button-primary">Suggest a tool <ArrowUpRight size={14} /></Link></section>
  </>;
}
