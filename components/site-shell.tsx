"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/tools", label: "Explore tools" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="announcement"><Sparkles size={14} /><span>A little less searching. A lot more making.</span><span className="announcement-arrow">↗</span></div>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand" aria-label="AIFindr home"><span className="brand-mark"><Sparkles size={18} strokeWidth={2.4} /></span><span>AI<span className="brand-light">Findr</span></span></Link>
          <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
            {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className={pathname === link.href ? "nav-active" : ""}>{link.label}</Link>)}
          </nav>
          <Link href="/submit" className="submit-link">Add a tool <ArrowUpRight size={15} /></Link>
          <button className="menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer"><div className="footer-inner"><Link href="/" className="brand"><span className="brand-mark"><Sparkles size={16} /></span><span>AI<span className="brand-light">Findr</span></span></Link><p>A thoughtful directory for curious minds.</p><span className="footer-copy">Made for what’s next <span>✳</span> © 2026 AIFindr</span></div></footer>
    </>
  );
}
