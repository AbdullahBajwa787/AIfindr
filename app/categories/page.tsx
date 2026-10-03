import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
};

export default function CategoriesPage() {
  const list = categories.slice(1);
  return <section className="page-wrap"><div className="page-heading"><div className="eyebrow"><span className="eyebrow-dot" />A PLACE FOR EVERY IDEA</div><h1>Explore by category.</h1><p>Whatever you’re working on, there’s a tool that can help.</p></div><div className="categories-grid">{list.map((category) => { const detail = details[category]; const count = tools.filter((tool) => tool.category === category).length; return <Link href={`/tools?category=${encodeURIComponent(category)}`} id={category.toLowerCase().replaceAll(" ", "-")} key={category} className="category-card"><span className="category-emoji">{detail.icon}</span><span className="category-count">{count} {count === 1 ? "tool" : "tools"}</span><h2>{category}</h2><p>{detail.copy}</p><ArrowUpRight className="category-card-arrow" size={16} /></Link>; })}</div></section>;
}
