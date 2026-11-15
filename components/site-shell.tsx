"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Sparkles, X, PlusCircle, Compass, Layers, Info, LifeBuoy, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/logo";

const links = [
  { href: "/tools", label: "Explore Tools", icon: Compass },
  { href: "/categories", label: "Categories", icon: Layers },
  { href: "/about", label: "About", icon: Info },
  { href: "/support", label: "Support", icon: LifeBuoy },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-wrapper flex min-h-screen flex-col bg-[#050704] text-[#f2f7ef]">
      {/* Glossy Animated Announcement Bar */}
      <aside className="announcement flex items-center justify-center gap-2.5 px-4 text-xs font-bold select-none">
        <Sparkles size={14} className="text-[#040603] fill-[#040603]" />
        <span>Discover 120+ High-Performance AI Tools — Handcrafted for curious builders.</span>
        <Link
          href="/tools"
          className="announcement-link underline underline-offset-2 ml-1 text-[#040603] hover:opacity-80 font-black"
        >
          Explore now ↗
        </Link>
      </aside>

      {/* Glossy Glass Sticky Header */}
      <header className="site-header sticky top-0 z-40 w-full">
        <div className="header-inner mx-auto flex h-full max-w-[1200px] items-center justify-between px-5 md:px-8">
          {/* Brand with 3D Glossy Logo */}
          <Link href="/" className="brand-link group flex items-center" aria-label="AIFindr Homepage">
            <Logo size="sm" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-[#090f07]/60 border border-[#1a2915]/60 backdrop-blur-md" aria-label="Main navigation">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-[#a3ff12]/20 to-[#a3ff12]/10 text-[#a3ff12] border border-[#a3ff12]/40 shadow-[0_0_15px_rgba(163,255,18,0.25)]"
                      : "text-[#8e9f89] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Action & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/submit"
              className="btn-glossy-primary hidden sm:inline-flex text-xs py-2 px-4 font-bold"
            >
              <PlusCircle size={14} className="stroke-[2.5]" />
              <span>Submit Tool</span>
              <ArrowUpRight size={13} className="stroke-[2.5]" />
            </Link>

            <button
              className="menu-button md:hidden flex items-center justify-center p-2 rounded-xl text-[#8e9f89] hover:text-white hover:bg-[#121b0e] border border-[#1e2e18] transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} className="text-[#a3ff12]" /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <nav className="mobile-nav md:hidden border-b border-[#23351a] bg-[#070b05]/98 backdrop-blur-2xl px-6 py-6 transition-all" aria-label="Mobile navigation">
            <div className="flex flex-col gap-3.5">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? "bg-[#a3ff12]/15 text-[#a3ff12] border border-[#a3ff12]/40 shadow-[0_0_15px_rgba(163,255,18,0.2)]"
                        : "text-[#bfcebb] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={17} className={isActive ? "text-[#a3ff12]" : "text-[#71846c]"} />
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-[#182613]">
                <Link
                  href="/submit"
                  onClick={() => setMenuOpen(false)}
                  className="btn-glossy-primary w-full py-3 text-xs"
                >
                  <PlusCircle size={15} />
                  <span>Submit a Tool</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1">{children}</main>

      {/* Rich Glossy Footer */}
      <footer className="site-footer mt-24 border-t border-[#182613] bg-[#050804] py-16 text-[#8a9b85]">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#182613]">
            {/* Col 1: Brand Info */}
            <div className="md:col-span-2 space-y-4">
              <Link href="/" className="inline-block" aria-label="AIFindr Homepage">
                <Logo size="md" />
              </Link>
              <p className="max-w-md text-xs leading-relaxed text-[#9eb098]">
                AIFindr is your ultimate launchpad for discovering high-leverage artificial intelligence tools. Hand-picked for creators, engineers, writers, and entrepreneurs to spend less time hunting and more time building.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#a3ff12] font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3ff12] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a3ff12]"></span>
                </span>
                <span>Continuously updated with verified AI software</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#a3ff12] mb-4">Quick Links</h4>
              <ul className="space-y-2.5 text-xs font-medium">
                <li><Link href="/tools" className="hover:text-white transition-colors">All AI Tools</Link></li>
                <li><Link href="/categories" className="hover:text-white transition-colors">Browse Categories</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Our Philosophy</Link></li>
                <li><Link href="/submit" className="hover:text-white transition-colors">Submit Your AI App</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Content & Creator Support</Link></li>
                <li><Link href="/admin" className="text-[#a3ff12] hover:underline font-bold transition-colors">Admin Panel ⚡</Link></li>
              </ul>
            </div>

            {/* Col 3: Popular Categories */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#a3ff12] mb-4">Popular Tags</h4>
              <ul className="space-y-2.5 text-xs font-medium">
                <li><Link href="/tools?q=Writing" className="hover:text-white transition-colors">AI Writing & Copy</Link></li>
                <li><Link href="/tools?q=Image" className="hover:text-white transition-colors">Image Generation</Link></li>
                <li><Link href="/tools?q=Coding" className="hover:text-white transition-colors">Developer & Code</Link></li>
                <li><Link href="/tools?q=Audio" className="hover:text-white transition-colors">Voice & Music</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6e7f69]">
            <p>© 2026 AIFindr. Crafted with care for the curious mind.</p>
            <div className="flex items-center gap-6 font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="text-[#a3ff12]">⚡</span> High-Voltage Discovery
              </span>
              <a
                href="#top"
                className="hover:text-[#a3ff12] transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Back to top ↑
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
