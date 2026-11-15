import { SubmitForm } from "@/components/submit-form";
import { PlusCircle } from "lucide-react";

export const metadata = {
  title: "Submit a Tool — AIFindr",
  description: "Share a standout AI tool with the AIFindr community.",
};

export default function SubmitPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-16">
      {/* Page Heading */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#a3ff12] mb-2.5">
          <PlusCircle size={14} className="stroke-[2.5]" />
          <span>PASS IT FORWARD</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Found something extraordinary?
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-[#9eb19a] max-w-md mx-auto">
          Share your favorite AI discovery or submit your own creation to be featured on AIFindr.
        </p>
      </div>

      <SubmitForm />
    </section>
  );
}
