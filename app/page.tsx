import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles, Zap, Layers, Star, Flame } from "lucide-react";
import { HomeSearch } from "@/components/home-search";
import { ToolCard } from "@/components/tool-card";
import { tools, categories } from "@/lib/tools";
import { Logo } from "@/components/logo";

export default function Home() {
  const featured = [
    ...tools.filter((tool) => tool.featured),
    tools.find((tool) => tool.slug === "notion-ai"),
    tools.find((tool) => tool.slug === "claude"),
    tools.find((tool) => tool.slug === "deepseek"),
  ].filter(Boolean) as typeof tools;

  return (
    <div className="relative overflow-hidden">
      {/* Dynamic Ambient Neon Lighting in Background */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(163,255,18,0.2)_0%,rgba(100,220,0,0.08)_45%,transparent_70%)] blur-3xl -z-10" />

      {/* Hero Section */}
      <section className="mx-auto max-w-[1200px] px-5 md:px-8 pt-14 pb-20 text-center relative">
        {/* Floating 3D Glossy Logo Centerpiece */}
        <div className="mb-7 flex flex-col items-center justify-center animate-fade-down">
          <div className="animate-float">
            <Logo size="hero" showText={false} />
          </div>

          {/* Glossy Pill Badge */}
          <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-[#a3ff12]/40 bg-gradient-to-r from-[#141e10]/90 to-[#0c1309]/90 px-4 py-1.5 shadow-[0_0_20px_rgba(163,255,18,0.25),inset_0_1px_1px_rgba(255,255,255,0.3)] backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3ff12] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a3ff12]"></span>
            </span>
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#d8edd4] uppercase">
              NEXT-GEN AI LAUNCHPAD <span className="text-[#a3ff12] font-black">2026</span>
            </span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.06] mb-6">
            Find your next <br className="hidden sm:inline" />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#a3ff12] via-[#e5ff80] to-[#73e600] bg-clip-text text-transparent italic font-serif pr-2 drop-shadow-[0_0_35px_rgba(163,255,18,0.6)]">
                favorite
              </span>
              <span className="absolute -bottom-1.5 left-0 right-0 h-[4px] bg-gradient-to-r from-[#a3ff12] via-[#c6ff47] to-transparent rounded-full shadow-[0_0_10px_#a3ff12]"></span>
            </span>{" "}
            AI tool.
          </h1>

          <p className="text-sm sm:text-lg text-[#9eb19a] max-w-xl mx-auto leading-relaxed font-normal">
            A little less searching. A lot more making. Discover handpicked, supercharged AI tools engineered for creators, coders, and forward thinkers.
          </p>

          {/* Interactive 3D Glossy Search */}
          <HomeSearch />

          {/* 3D Glossy Stats Cards */}
          <div className="mt-14 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-8">
            <div className="glossy-card p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black font-mono text-[#a3ff12] drop-shadow-[0_0_15px_rgba(163,255,18,0.5)]">
                {tools.length}+
              </div>
              <div className="text-[11px] font-semibold text-[#8ca087] mt-1 uppercase tracking-wider">
                Curated Tools
              </div>
            </div>

            <div className="glossy-card p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black font-mono text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                {categories.length - 1}
              </div>
              <div className="text-[11px] font-semibold text-[#8ca087] mt-1 uppercase tracking-wider">
                Categories
              </div>
            </div>

            <div className="glossy-card p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black font-mono text-[#a3ff12] drop-shadow-[0_0_15px_rgba(163,255,18,0.5)]">
                100%
              </div>
              <div className="text-[11px] font-semibold text-[#8ca087] mt-1 uppercase tracking-wider">
                Free to Explore
              </div>
            </div>

            <div className="glossy-card p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black font-mono text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                0
              </div>
              <div className="text-[11px] font-semibold text-[#8ca087] mt-1 uppercase tracking-wider">
                Hype, Just Value
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Picks Section */}
      <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#a3ff12] mb-1 font-bold">
              <Sparkles size={13} className="fill-[#a3ff12]" />
              <span>HANDPICKED EXCELLENCE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Tools worth knowing
            </h2>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#a3ff12] hover:text-[#d4ff66] transition-colors group"
          >
            <span>See all {tools.length} tools</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform stroke-[2.5]" />
          </Link>
        </div>

        {/* Featured Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((tool, i) => (
            <ToolCard key={tool.slug} tool={tool} index={i} />
          ))}
        </div>

        {/* Glossy Category Strip */}
        <div className="glossy-card mt-12 p-6 sm:p-7">
          <div className="text-xs font-mono uppercase text-[#889b83] font-bold mb-4 flex items-center gap-2">
            <Layers size={14} className="text-[#a3ff12]" />
            <span>DISCOVER TOOLS BY INDUSTRY:</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {categories.slice(1, 11).map((cat) => (
              <Link
                key={cat}
                href={`/categories#${encodeURIComponent(cat.toLowerCase().replaceAll(" ", "-"))}`}
                className="glossy-chip flex items-center gap-1.5"
              >
                <span>{cat}</span>
                <span className="text-[10px] text-[#6e8268]">↗</span>
              </Link>
            ))}
            <Link
              href="/categories"
              className="btn-glossy-primary text-xs py-1.5 px-3.5 rounded-xl font-bold"
            >
              <span>All Categories</span>
              <ArrowRight size={13} className="stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </section>

      {/* High-Voltage Glossy CTA Section */}
      <section className="mx-auto max-w-[1200px] px-5 md:px-8 my-16">
        <div className="glossy-card relative p-8 sm:p-14 overflow-hidden border-2 border-[#a3ff12]/40 shadow-[0_0_50px_rgba(163,255,18,0.2)]">
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-[#a3ff12]/20 blur-3xl animate-pulse-glow" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3.5 max-w-xl text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#a3ff12] uppercase tracking-wider font-extrabold">
                <Zap size={14} className="fill-[#a3ff12]" />
                <span>BUILDING SOMETHING REVOLUTIONARY?</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                Good tools deserve to be found.
              </h2>
              <p className="text-xs sm:text-sm text-[#9eb098] leading-relaxed">
                Have you launched or uncovered an indispensable AI tool? Submit it to AIFindr and get discovered by thousands of active creators and developers.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3.5">
              <Link
                href="/submit"
                className="btn-glossy-primary text-xs sm:text-sm py-3.5 px-7"
              >
                <span>Submit Your Tool</span>
                <ArrowUpRight size={16} className="stroke-[2.5]" />
              </Link>
              <Link
                href="/tools"
                className="btn-glossy-secondary text-xs sm:text-sm py-3.5 px-6"
              >
                <span>Browse Catalogue</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
