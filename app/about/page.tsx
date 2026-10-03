import Link from "next/link";
import { ArrowUpRight, Check, Compass, Heart, Sparkles } from "lucide-react";

export const metadata = { title: "About AIFindr" };

export default function AboutPage() {
  return <section className="page-wrap"><div className="about-layout"><div className="about-copy"><div className="eyebrow"><span className="eyebrow-dot" />A SMALL NOTE FROM US</div><h1>For curious minds<br />and <em>big ideas.</em></h1><p>The AI world moves fast. New tools show up every day, and finding the one that actually helps can feel like a job on its own.</p><p>AIFindr is a little corner of the internet to make that easier. A thoughtful, growing guide to useful tools, so you can spend less time looking and more time making something you’re proud of.</p><Link href="/tools" className="button button-primary" style={{ marginTop: 12 }}>Explore the directory <ArrowUpRight size={14} /></Link></div><div className="about-card"><div className="big-star"><Sparkles size={40} /></div><h2>Made for the making.</h2><p>We believe the best technology gets out of your way and helps your good ideas happen. That’s what we look for in every tool we share.</p><div className="about-values"><div className="about-value"><span><Check size={14} /></span>Useful beats noisy</div><div className="about-value"><span><Compass size={14} /></span>Curiosity is a good compass</div><div className="about-value"><span><Heart size={14} /></span>Made with a little care</div></div></div></div></section>;
}
