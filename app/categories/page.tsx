import Link from "next/link";
import { ArrowUpRight, Sparkles, Layers } from "lucide-react";
import { tools, categories } from "@/lib/tools";

const details: Record<string, { icon: string; copy: string }> = {
  Writing: { icon: "✎", copy: "Find a first draft, a sharper sentence, or a fresh idea." },
  "Image generation": { icon: "✺", copy: "Make visuals, explore styles, and see ideas take shape." },
  Research: { icon: "⌕", copy: "Find answers, follow sources, and learn something new." },
  Productivity: { icon: "◷", copy: "Clear a little space in your day for the work you love." },
  Audio: { icon: "♫", copy: "Play with sound, voice, music, and everything in between." },
  Coding: { icon: "⌘", copy: "Build, debug, and bring your next idea to life." },
  Video: { icon: "▰", copy: "Turn a thought into a moving picture." },
  Design: { icon: "◈", copy: "Make the blank canvas feel a little less blank." },
  "AI assistants": { icon: "✳", copy: "Chat, brainstorm, and get a helpful start on almost anything." },
  Presentations: { icon: "▤", copy: "Turn your notes and ideas into slides worth sharing." },
  Education: { icon: "⌂", copy: "Learn new things with tools for practice, study, and teaching." },
  Automation: { icon: "↗", copy: "Connect everyday apps and let repeatable tasks run themselves." },
  "Meeting assistants": { icon: "◷", copy: "Spend less time taking notes and more time in the conversation." },
  Transcription: { icon: "≋", copy: "Turn recorded speech into searchable, useful text." },
  Marketing: { icon: "◌", copy: "Research, plan, and create content for the people you serve." },
  "Data & analytics": { icon: "▥", copy: "Ask better questions of your data and find useful patterns." },
  "Customer support": { icon: "♡", copy: "Help customers find answers and give support teams a hand." },
  Sales: { icon: "↗", copy: "Find prospects, improve outreach, and understand customer conversations." },
};

export const metadata = { title: "Explore AI Categories — AIFindr" };

export default function CategoriesPage() {
  const list = categories.slice(1);

  return (
    <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-16">
      {/* Page Heading */}
      <div className="mb-12 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#a3ff12] mb-2.5 font-bold">
          <Layers size={13} className="text-[#a3ff12]" />
          <span>A UNIVERSE FOR EVERY WORKFLOW</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Explore by Category
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#9eb19a] max-w-xl">
          Whatever you are creating, building, or automating, discover specialized tools built specifically for your domain.
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((category) => {
          const detail = details[category] || { icon: "✳", copy: "Tools to streamline your creative process." };
          const count = tools.filter((tool) => tool.category === category).length;
          const anchorId = category.toLowerCase().replaceAll(" ", "-");

          return (
            <Link
              key={category}
              id={anchorId}
              href={`/tools?category=${encodeURIComponent(category)}`}
              className="glossy-card group relative flex flex-col justify-between p-6 sm:p-7"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#a3ff12]/30 bg-gradient-to-b from-[#a3ff12]/20 to-[#0e160a] text-2xl text-[#a3ff12] group-hover:border-[#a3ff12] group-hover:scale-110 shadow-[0_0_15px_rgba(163,255,18,0.2)] transition-all">
                    {detail.icon}
                  </span>
                  <span className="rounded-full border border-[#22331b] bg-[#0c130a] px-3.5 py-1 font-mono text-[11px] font-bold text-[#8ea087] group-hover:text-[#a3ff12] group-hover:border-[#a3ff12]/50 shadow-sm transition-colors">
                    {count} {count === 1 ? "tool" : "tools"}
                  </span>
                </div>

                <h2 className="mt-6 text-xl font-black text-white group-hover:text-[#a3ff12] transition-colors">
                  {category}
                </h2>
                <p className="mt-2 text-xs text-[#9eb19a] leading-relaxed">
                  {detail.copy}
                </p>
              </div>

              <div className="relative z-10 mt-7 flex items-center gap-1.5 text-xs font-bold text-[#81927d] group-hover:text-[#a3ff12] transition-colors">
                <span>Browse {category}</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform stroke-[2.5]" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
