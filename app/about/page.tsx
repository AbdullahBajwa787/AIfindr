import Link from "next/link";
import { ArrowUpRight, Check, Compass, Sparkles, Shield, Zap } from "lucide-react";
import { Logo } from "@/components/logo";

export const metadata = {
  title: "About AIFindr — Curated for Curious Minds",
  description: "Learn more about AIFindr's mission to curate the best AI tools on the web.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-[1100px] px-5 md:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Story */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#a3ff12]">
            <span className="h-2 w-2 rounded-full bg-[#a3ff12] shadow-[0_0_8px_#a3ff12] animate-ping" />
            <span>A SMALL NOTE FROM OUR TEAM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.12]">
            For curious minds <br />
            and <em className="font-serif italic font-normal text-[#a3ff12] drop-shadow-[0_0_20px_rgba(163,255,18,0.5)]">big ideas.</em>
          </h1>

          <p className="text-sm sm:text-base text-[#9eb19a] leading-relaxed font-normal">
            The artificial intelligence landscape is exploding. Every single morning, hundreds of new algorithms, tools, and wrappers appear online. Finding the tools that actually save hours and elevate your work has become a full-time job.
          </p>

          <p className="text-sm sm:text-base text-[#9eb19a] leading-relaxed font-normal">
            <strong className="text-white font-bold">AIFindr</strong> is designed to cut through that noise. We cut through the hype cycles and benchmark reality, maintaining a clean, fast, and thoughtful catalogue of high-signal tools.
          </p>

          <div className="pt-2">
            <Link
              href="/tools"
              className="btn-glossy-primary text-xs sm:text-sm py-3.5 px-7"
            >
              <span>Explore the Directory</span>
              <ArrowUpRight size={16} className="stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* Right Column: Values Card with 3D Glossy Logo Motif */}
        <div className="lg:col-span-5">
          <div className="glossy-card p-8 sm:p-10 relative overflow-hidden border-2 border-[#a3ff12]/30 shadow-[0_0_40px_rgba(163,255,18,0.12)]">
            <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-[#a3ff12]/20 blur-2xl animate-pulse-glow" />

            <div className="mb-6 animate-float">
              <Logo size="md" showText={false} />
            </div>

            <h2 className="text-2xl font-black text-white mb-2">
              Made for the making.
            </h2>
            <p className="text-xs text-[#9eb19a] leading-relaxed mb-6 font-normal">
              We believe the best tools get out of your way and let your creativity, code, and vision shine.
            </p>

            <div className="space-y-3.5 pt-5 border-t border-[#1c2c16]">
              <div className="flex items-center gap-3.5 text-xs text-[#d8edd4] font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#a3ff12]/40 bg-[#a3ff12]/15 text-[#a3ff12] shadow-[0_0_12px_rgba(163,255,18,0.3)] shrink-0">
                  <Check size={16} className="stroke-[2.5]" />
                </span>
                <span>Useful always beats noisy</span>
              </div>
              <div className="flex items-center gap-3.5 text-xs text-[#d8edd4] font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#a3ff12]/40 bg-[#a3ff12]/15 text-[#a3ff12] shadow-[0_0_12px_rgba(163,255,18,0.3)] shrink-0">
                  <Compass size={16} className="stroke-[2.5]" />
                </span>
                <span>Curiosity is our compass</span>
              </div>
              <div className="flex items-center gap-3.5 text-xs text-[#d8edd4] font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#a3ff12]/40 bg-[#a3ff12]/15 text-[#a3ff12] shadow-[0_0_12px_rgba(163,255,18,0.3)] shrink-0">
                  <Shield size={16} className="stroke-[2.5]" />
                </span>
                <span>Zero spam, thoroughly vetted entries</span>
              </div>
              <div className="flex items-center gap-3.5 text-xs text-[#d8edd4] font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#a3ff12]/40 bg-[#a3ff12]/15 text-[#a3ff12] shadow-[0_0_12px_rgba(163,255,18,0.3)] shrink-0">
                  <Zap size={16} className="stroke-[2.5]" />
                </span>
                <span>Constantly refreshed with breakthroughs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
