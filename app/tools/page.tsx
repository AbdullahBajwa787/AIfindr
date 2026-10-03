import { ToolBrowser } from "@/components/tool-browser";

export const metadata = { title: "Explore AI tools — AIFindr" };

export default async function ToolsPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const params = await searchParams;
  const category = params.category || "All tools";
  return <section className="page-wrap"><div className="page-heading"><div className="eyebrow"><span className="eyebrow-dot" />THE DIRECTORY</div><h1>Find your kind of AI.</h1><p>Good tools, organized so you can get to the fun part sooner.</p></div><ToolBrowser initialCategory={category} initialQuery={params.q || ""} /></section>;
}
