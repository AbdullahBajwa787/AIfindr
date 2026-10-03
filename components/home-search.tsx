"use client";

import { useRouter } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";

export function HomeSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  function search(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(query.trim() ? `/tools?q=${encodeURIComponent(query.trim())}` : "/tools");
  }
  return <>
    <form className="hero-search" onSubmit={search}><Search size={19} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try ‘make a presentation’ or ‘write better’" aria-label="Search AI tools" /><button type="submit">Find your tool <span>↗</span></button></form>
    <div className="hero-note"><Sparkles size={13} /><span>Hand-picked tools, <strong>no endless scrolling.</strong></span></div>
  </>;
}
