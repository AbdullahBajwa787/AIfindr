"use client";

import { useState } from "react";
import { 
  LifeBuoy, 
  Mail, 
  Send, 
  Check, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  ArrowRight,
  Clock,
  Layers
} from "lucide-react";
import { saveTicket } from "@/lib/tools-store";

const faqs = [
  {
    q: "How can I update my tool's description or logo?",
    a: "You can submit an update request using this form or contact our editorial team directly. Verified tool creators can request instant updates to pricing, features, and branding assets.",
  },
  {
    q: "How long does it take for a submitted tool to appear?",
    a: "Our editorial team tests and reviews each submission manually. Approvals typically take between 24 to 48 hours to ensure top-notch directory quality.",
  },
  {
    q: "Is listing my tool on AIFindr free?",
    a: "Yes! Standard inclusion in our directory is 100% free. We also offer featured 'Editor's Pick' placements for exceptional products.",
  },
  {
    q: "How do I report a broken link or outdated pricing?",
    a: "Select 'Report Broken Link / Outdated Info' in the support form below, provide the tool name, and our team will verify and resolve it within hours.",
  },
];

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "Tool Update Request",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveTicket({
      name: formData.name,
      email: formData.email,
      type: formData.type,
      subject: formData.subject,
      message: formData.message,
    });
    setSubmitted(true);
  };

  return (
    <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#a3ff12]/40 bg-[#121c0e]/80 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#a3ff12] shadow-[0_0_20px_rgba(163,255,18,0.2)] mb-4">
          <LifeBuoy size={14} className="stroke-[2.5]" />
          <span>CONTENT & CREATOR SUPPORT</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          How can we help your craft?
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#9eb19a] leading-relaxed">
          Need to correct a tool listing, update a logo, report a dead link, or discuss partnership opportunities? Reach our dedicated editorial team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Support Channels & Info */}
        <div className="lg:col-span-5 space-y-5">
          <div className="glossy-card p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#a3ff12]/20 text-[#a3ff12] border border-[#a3ff12]/40 shadow-[0_0_15px_rgba(163,255,18,0.3)]">
                <Mail size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Direct Email Support</h3>
                <p className="text-xs text-[#8ca087]">Available 7 days a week</p>
              </div>
            </div>
            <p className="text-xs text-[#9eb19a] leading-relaxed">
              Prefer writing an email? Send inquiries directly to our team and we'll reply within 24 hours.
            </p>
            <a
              href="mailto:support@aifindr.com"
              className="inline-flex items-center gap-2 text-xs font-bold font-mono text-[#a3ff12] hover:underline"
            >
              <span>support@aifindr.com</span>
              <ArrowRight size={13} />
            </a>
          </div>

          <div className="glossy-card p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#a3ff12]/20 text-[#a3ff12] border border-[#a3ff12]/40 shadow-[0_0_15px_rgba(163,255,18,0.3)]">
                <Clock size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Speedy Response Guarantee</h3>
                <p className="text-xs text-[#8ca087]">Avg. turnaround: 12-24 hours</p>
              </div>
            </div>
            <p className="text-xs text-[#9eb19a] leading-relaxed">
              Tool corrections and editorial updates are treated with high priority to maintain the highest data reliability across our platform.
            </p>
          </div>

          <div className="glossy-card p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#a3ff12]/20 text-[#a3ff12] border border-[#a3ff12]/40 shadow-[0_0_15px_rgba(163,255,18,0.3)]">
                <ShieldCheck size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Creator Verification</h3>
                <p className="text-xs text-[#8ca087]">Claim your official profile</p>
              </div>
            </div>
            <p className="text-xs text-[#9eb19a] leading-relaxed">
              Are you the author of an AI tool listed here? Submit a verification request to receive direct editing privileges.
            </p>
          </div>
        </div>

        {/* Support Ticket Form */}
        <div className="lg:col-span-7">
          <div className="glossy-card p-6 sm:p-10 border-2 border-[#a3ff12]/30 shadow-[0_0_40px_rgba(163,255,18,0.1)] relative">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#a3ff12] font-bold mb-1">
                <Sparkles size={13} className="fill-[#a3ff12]" />
                <span>SUPPORT TICKET SYSTEM</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight mb-2">
                Send a Message
              </h2>
              <p className="text-xs sm:text-sm text-[#9eb19a] mb-7">
                Fill out the details below. Messages are logged into our internal support desk for swift resolution.
              </p>

              {submitted ? (
                <div className="rounded-2xl border-2 border-[#a3ff12]/60 bg-gradient-to-b from-[#a3ff12]/20 to-[#0e160a] p-8 text-center space-y-4 animate-fade-up">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#a3ff12] text-[#040603] font-black shadow-[0_0_25px_rgba(163,255,18,0.6)]">
                    <Check size={28} className="stroke-[3]" />
                  </div>
                  <h3 className="text-xl font-black text-white">Ticket Submitted Successfully!</h3>
                  <p className="text-xs sm:text-sm text-[#b8ccb5] max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-[#a3ff12] font-bold">{formData.name}</span>. Your support request regarding <span className="text-white font-bold">{formData.subject}</span> has been routed to our team.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", type: "Tool Update Request", subject: "", message: "" });
                    }}
                    className="mt-4 btn-glossy-primary text-xs py-2 px-5"
                  >
                    <span>Send Another Ticket</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#d8edd4]">
                        Your Name <span className="text-[#a3ff12]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Abdullah Khan"
                        className="w-full rounded-xl border border-[#23351b] bg-[#070c05]/90 px-4 py-3 text-xs text-white placeholder-[#5a6b57] outline-none focus:border-[#a3ff12] focus:ring-1 focus:ring-[#a3ff12] transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#d8edd4]">
                        Email Address <span className="text-[#a3ff12]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full rounded-xl border border-[#23351b] bg-[#070c05]/90 px-4 py-3 text-xs text-white placeholder-[#5a6b57] outline-none focus:border-[#a3ff12] focus:ring-1 focus:ring-[#a3ff12] transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#d8edd4]">
                        Inquiry Category <span className="text-[#a3ff12]">*</span>
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full rounded-xl border border-[#23351b] bg-[#070c05]/90 px-4 py-3 text-xs text-[#dce8da] outline-none focus:border-[#a3ff12] transition-colors cursor-pointer font-medium"
                      >
                        <option value="Tool Update Request" className="bg-[#0b1208]">Tool Update / Logo Change</option>
                        <option value="Partnership" className="bg-[#0b1208]">Partnership / Featured Placement</option>
                        <option value="Broken Link" className="bg-[#0b1208]">Report Broken Link or Scam</option>
                        <option value="General Inquiry" className="bg-[#0b1208]">General Question / Feedback</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#d8edd4]">
                        Subject / Tool Name <span className="text-[#a3ff12]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Update logo for Perplexity"
                        className="w-full rounded-xl border border-[#23351b] bg-[#070c05]/90 px-4 py-3 text-xs text-white placeholder-[#5a6b57] outline-none focus:border-[#a3ff12] focus:ring-1 focus:ring-[#a3ff12] transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#d8edd4]">
                      Message & Details <span className="text-[#a3ff12]">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify any requested changes, image URLs, or questions in detail..."
                      className="w-full rounded-xl border border-[#23351b] bg-[#070c05]/90 px-4 py-3 text-xs text-white placeholder-[#5a6b57] outline-none focus:border-[#a3ff12] focus:ring-1 focus:ring-[#a3ff12] transition-all resize-y font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-glossy-primary w-full py-4 text-sm font-black"
                  >
                    <Send size={16} />
                    <span>Submit Ticket</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion Grid */}
      <div className="mt-20 pt-12 border-t border-[#182613]">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#a3ff12] uppercase tracking-wider font-bold mb-1">
            <HelpCircle size={13} />
            <span>KNOWLEDGE BASE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glossy-card p-6 space-y-2.5">
              <h3 className="text-base font-bold text-white flex items-start gap-2">
                <span className="text-[#a3ff12] font-mono text-sm">0{idx + 1}.</span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#9eb19a] leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
