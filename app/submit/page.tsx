import { SubmitForm } from "@/components/submit-form";

export const metadata = { title: "Suggest a tool — AIFindr" };

export default function SubmitPage() {
  return <section className="page-wrap"><div className="page-heading"><div className="eyebrow"><span className="eyebrow-dot" />PASS IT ALONG</div><h1>Found something good?</h1><p>There’s probably someone else looking for it, too.</p></div><SubmitForm /></section>;
}
