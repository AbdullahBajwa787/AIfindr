"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

export function SubmitForm() {
  const [sent, setSent] = useState(false);
  function handleSubmit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setSent(true); }
  return <form className="submit-panel" onSubmit={handleSubmit}>
    <h2>Tell us about the tool</h2><p>Share a little about it. We’ll take a look and decide if it’s a good fit for the directory.</p>
    {sent && <div className="submit-confirm"><Check size={15} style={{ verticalAlign: "-3px", marginRight: 7 }} />Thanks for sharing! This demo form doesn’t send your details anywhere yet.</div>}
    <div className="form-row"><div className="form-field"><label htmlFor="tool-name">Tool name</label><input id="tool-name" name="name" placeholder="e.g. A really useful AI tool" required /></div><div className="form-field"><label htmlFor="tool-url">Website address</label><input id="tool-url" name="url" type="url" placeholder="https://example.com" required /></div></div>
    <div className="form-row"><div className="form-field"><label htmlFor="tool-category">Category</label><select id="tool-category" name="category" required defaultValue=""><option value="" disabled>Choose a category</option>{["Writing", "Image generation", "Research", "Productivity", "Audio", "Coding", "Video", "Design"].map((c) => <option key={c}>{c}</option>)}</select></div><div className="form-field"><label htmlFor="tool-price">Price</label><select id="tool-price" name="price" defaultValue="Freemium"><option>Free</option><option>Freemium</option><option>Paid</option></select></div></div>
    <div className="form-field"><label htmlFor="tool-description">What does it do?</label><textarea id="tool-description" name="description" placeholder="Tell us what makes this tool useful…" required /></div>
    <button type="submit" className="button button-primary">{sent ? "Share another tool" : "Send for review"} <ArrowUpRight size={14} /></button>
  </form>;
}
