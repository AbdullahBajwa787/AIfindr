import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { tools } from "@/lib/tools";
import { BrandMark } from "@/components/brand-mark";

export function generateStaticParams() { return tools.map((tool) => ({ slug: tool.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((item) => item.slug === slug);
  return { title: tool ? `${tool.name} — AIFindr` : "Tool not found — AIFindr", description: tool?.description };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((item) => item.slug === slug);
  if (!tool) notFound();
  return <section className="page-wrap"><Link href="/tools" className="detail-back"><ArrowLeft size={14} />Back to all tools</Link><article className="detail-hero"><div className="detail-identity"><BrandMark tool={tool} large /><div><h1>{tool.name}</h1><p>{tool.category} · {tool.price}</p></div></div><p className="detail-desc">{tool.description}</p><div className="detail-actions"><a className="button button-primary" href={tool.website} target="_blank" rel="noreferrer">Visit {tool.name} <ArrowUpRight size={14} /></a><Link className="button button-quiet" href="/tools">Explore more tools</Link></div><div className="detail-tags">{tool.tags.map((tag) => <span className="detail-tag" key={tag}>{tag}</span>)}</div><div className="detail-note">AIFindr is an independent guide. Please check {tool.name}’s website for the latest features and pricing.</div></article></section>;
}
