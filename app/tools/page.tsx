import { ToolBrowser } from "@/components/tool-browser";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Explore AI Tools — AIFindr",
  description: "Browse 120+ hand-picked AI tools by category, pricing, and features.",
};

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category || "All tools";

  return (
    <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-12">
      {/* Page Heading */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#a3ff12] mb-2">
          <Sparkles size={13} />
          <span>COMPLETE AI CATALOGUE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Find your kind of AI.
        </h1>
        <p className="mt-2.5 text-xs sm:text-sm text-[#9aa895] max-w-xl">
          Filter through top-tier AI software. Use pricing filters to uncover free tools or discover professional creative suites.
        </p>
      </div>

      {/* Directory Browser Component */}
      <ToolBrowser initialCategory={category} initialQuery={params.q || ""} />
    </section>
  );
}
