import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Mail, Send, Sparkles } from "lucide-react";
import { useTimers } from "./useTimers";

// Simulated AI email triage — category, priority, mood and a ready reply draft

const emails = [
  {
    id: 1,
    from: "Hamza Raza",
    subject: "Wrong size delivered — need exchange",
    preview: "Hi, I ordered a Large hoodie but received a Medium. Can I exchange it?",
    category: "Exchange",
    priority: "High",
    mood: "Frustrated",
    reply:
      "Hi Hamza, sorry about the mix-up! I've booked a free exchange — a rider will drop the Large and collect the Medium within 48 hours. No extra charges.",
  },
  {
    id: 2,
    from: "Nadia (Bloom Café)",
    subject: "Bulk order for 60 staff uniforms",
    preview: "We're opening a new branch and need 60 branded T-shirts. Can you share pricing?",
    category: "Sales lead",
    priority: "High",
    mood: "Positive",
    reply:
      "Hi Nadia, congratulations on the new branch! For 60 branded T-shirts we offer 18% bulk pricing. I've attached a quote and can share fabric samples this week.",
  },
  {
    id: 3,
    from: "Ali Khan",
    subject: "When will my order arrive?",
    preview: "Order #10471 was placed on Monday, any update on the delivery?",
    category: "Order status",
    priority: "Medium",
    mood: "Neutral",
    reply: "Hi Ali, order #10471 is out for delivery today and should reach you by 6 PM. Here's your tracking link.",
  },
  {
    id: 4,
    from: "promo@cheap-seo.biz",
    subject: "Get 10,000 followers in 24 hours!!!",
    preview: "Limited offer — boost your brand instantly with our guaranteed package…",
    category: "Spam",
    priority: "Low",
    mood: "—",
    reply: "",
  },
];

const categoryStyle: Record<string, string> = {
  Exchange: "bg-amber-500/10 text-amber-600",
  "Sales lead": "bg-emerald-500/10 text-emerald-600",
  "Order status": "bg-sky-500/10 text-sky-600",
  Spam: "bg-foreground/10 text-muted-foreground",
};

export const InboxDemo = () => {
  const [processed, setProcessed] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [selected, setSelected] = useState(1);
  const [sent, setSent] = useState<number[]>([]);
  const { later, clear } = useTimers();

  const process = () => {
    clear();
    setProcessed(0);
    setSent([]);
    setProcessing(true);
    emails.forEach((_, i) => later(() => setProcessed(i + 1), (i + 1) * 650));
    later(() => setProcessing(false), emails.length * 650);
  };

  const current = emails.find((e) => e.id === selected)!;
  const currentDone = emails.indexOf(current) < processed;

  return (
    <div className="w-full rounded-2xl border border-foreground/10 bg-card overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-foreground/10">
        <p className="text-sm font-semibold inline-flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" /> Support Inbox
          <span className="text-xs font-normal text-muted-foreground">{emails.length} new</span>
        </p>
        <button
          onClick={process}
          disabled={processing}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium disabled:opacity-50 cursor-pointer"
        >
          {processing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          {processing ? "Analysing…" : processed ? "Run again" : "Process with AI"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="divide-y divide-foreground/5 md:border-r border-foreground/10">
          {emails.map((e, i) => {
            const done = i < processed;
            return (
              <button
                key={e.id}
                onClick={() => setSelected(e.id)}
                className={`w-full text-left px-4 py-3 cursor-pointer transition-colors ${selected === e.id ? "bg-primary/5" : "hover:bg-foreground/[0.03]"}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold truncate">{e.from}</p>
                  {done ? (
                    <motion.span
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`px-2 py-0.5 rounded-full text-[11px] font-medium shrink-0 ${categoryStyle[e.category]}`}
                    >
                      {e.category}
                    </motion.span>
                  ) : processing && i === processed ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-primary shrink-0" />
                  ) : null}
                </div>
                <p className="text-xs font-medium mt-0.5 truncate">{e.subject}</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{e.preview}</p>
              </button>
            );
          })}
        </div>

        <div className="p-4 min-h-[300px] flex flex-col">
          <p className="text-sm font-semibold">{current.subject}</p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{current.preview}</p>

          {currentDone ? (
            <motion.div key={current.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex-1 flex flex-col">
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  ["Category", current.category],
                  ["Priority", current.priority],
                  ["Mood", current.mood],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-foreground/5 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{k}</p>
                    <p className="text-xs font-semibold mt-0.5">{v}</p>
                  </div>
                ))}
              </div>

              {current.reply ? (
                <>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-primary mt-4 mb-1.5 inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI drafted reply
                  </p>
                  <p className="text-sm leading-relaxed rounded-lg border border-primary/20 bg-primary/5 p-3">{current.reply}</p>
                  <button
                    onClick={() => setSent((s) => [...s, current.id])}
                    disabled={sent.includes(current.id)}
                    className="mt-auto pt-3 self-end inline-flex items-center gap-1.5 text-xs font-medium text-primary disabled:text-emerald-600 cursor-pointer"
                  >
                    {sent.includes(current.id) ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Reply sent
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" /> Approve & send
                      </>
                    )}
                  </button>
                </>
              ) : (
                <p className="text-xs text-muted-foreground mt-4 rounded-lg bg-foreground/5 p-3">
                  Detected as spam — moved to the spam folder automatically. No reply needed.
                </p>
              )}
            </motion.div>
          ) : (
            <div className="flex-1 grid place-items-center text-center text-xs text-muted-foreground mt-4 rounded-lg border border-dashed border-foreground/10 p-6">
              Click “Process with AI” to categorise, prioritise and draft replies for every email.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InboxDemo;
