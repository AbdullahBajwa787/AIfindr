import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Sparkles, ShieldCheck, Tag, ExternalLink } from "lucide-react";
import { tools } from "@/lib/tools";
import { BrandMark } from "@/components/brand-mark";
import { ToolCard } from "@/components/tool-card";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((item) => item.slug === slug);
  return {
    title: tool ? `${tool.name} — AIFindr` : "Tool not found — AIFindr",
    description: tool?.description,
  };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((item) => item.slug === slug);
  if (!tool) notFound();

  const visitUrl = tool.affiliateUrl || tool.website;
  const relatedTools = tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 3);

  return (
    <section className="mx-auto max-w-[1100px] px-5 md:px-8 py-14">
      {/* Back link */}
      <Link
        href="/tools"
        className="inline-flex items-center gap-2 text-xs font-bold text-[#8d9e89] hover:text-[#a3ff12] mb-8 transition-colors"
      >
        <ArrowLeft size={16} className="stroke-[2.5]" />
        <span>Back to directory</span>
      </Link>

      {/* Hero Detail Article with 3D Glossy Card */}
      <article className="glossy-card p-6 sm:p-12 relative overflow-hidden border-2 border-[#a3ff12]/30 shadow-[0_0_50px_rgba(163,255,18,0.12)]">
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#a3ff12]/20 blur-3xl animate-pulse-glow" />

        <div className="relative z-10">
          {/* Identity Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-[#1c2c16]">
            <div className="flex items-center gap-5">
              <BrandMark tool={tool} large />
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                    {tool.name}
                  </h1>
                  {tool.featured && (
                    <span className="inline-flex items-center gap-1 rounded-lg border border-[#a3ff12]/60 bg-[#a3ff12]/20 px-3 py-1 text-[10px] font-mono font-black text-[#a3ff12] shadow-[0_0_15px_rgba(163,255,18,0.3)]">
                      <Sparkles size={11} className="fill-[#a3ff12]" />
                      <span>EDITOR'S PICK</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2.5 mt-2.5 text-xs text-[#8e9f89]">
                  <span className="font-mono text-[#a3ff12] font-bold uppercase tracking-wider">{tool.category}</span>
                  <span>•</span>
                  <span className="rounded-full border border-[#2a3c22] bg-[#11190d] px-3 py-0.5 text-[11px] font-bold text-[#d8edd5]">
                    {tool.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Visit Action Button */}
            <div className="flex items-center gap-3">
              <a
                href={visitUrl}
                target="_blank"
                rel={tool.affiliateUrl ? "sponsored nofollow noopener noreferrer" : "noopener noreferrer"}
                className="btn-glossy-primary text-xs sm:text-sm py-3.5 px-7"
              >
                <span>Visit {tool.name}</span>
                <ArrowUpRight size={16} className="stroke-[2.5]" />
              </a>
            </div>
          </div>

          {/* Description */}
          <div className="py-8">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#a3ff12] mb-3">About this tool</h2>
            <p className="text-base sm:text-lg text-[#dae8d6] leading-relaxed max-w-3xl font-medium">
              {tool.description}
            </p>
          </div>

          {/* Tags */}
          {tool.tags && tool.tags.length > 0 && (
            <div className="pt-2 pb-6">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#73846f] mb-3 flex items-center gap-1.5">
                <Tag size={13} className="text-[#a3ff12]" />
                <span>Tags & Classifications</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tools?q=${encodeURIComponent(tag)}`}
                    className="glossy-chip text-xs py-1.5 px-3"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Affiliate & Disclaimer notes */}
          <div className="mt-6 rounded-2xl border border-[#21321a] bg-[#080d05]/80 p-4 sm:p-5 text-xs text-[#7d8f78] leading-relaxed flex items-start gap-3">
            <ShieldCheck size={18} className="text-[#a3ff12] shrink-0 mt-0.5" />
            <div>
              <span className="text-[#a2b59d]">
                AIFindr is an independent software guide curated for craftsmanship and raw capability. Please verify {tool.name}'s official website for current features and subscription plans.
              </span>
              {tool.affiliateUrl && (
                <span className="block mt-1 text-[#657760] font-mono text-[11px]">
                  Transparency: AIFindr may earn a partner commission if you subscribe through this link at no additional cost to you.
                </span>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center justify-between mb-7">
            <h3 className="text-xl font-extrabold text-white">More tools in {tool.category}</h3>
            <Link
              href={`/tools?category=${encodeURIComponent(tool.category)}`}
              className="text-xs font-bold text-[#a3ff12] hover:underline"
            >
              See all in {tool.category} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedTools.map((t, idx) => (
              <ToolCard key={t.slug} tool={t} index={idx} />
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
