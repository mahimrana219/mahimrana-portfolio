import { useEffect, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Info } from "lucide-react";
import { ChatbotDemo } from "./ChatbotDemo";
import { WorkflowDemo } from "./WorkflowDemo";
import { InboxDemo } from "./InboxDemo";

// To add a new AI demo, create a component and add it to this list.
const demos: {
  id: number;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  tryIt: string;
  Component: ComponentType;
}[] = [
  {
    id: 1,
    title: "AI Customer Support Chatbot",
    tagline: "24/7 support, zero waiting",
    description:
      "A smart support assistant for online stores that answers customers instantly, any time of day. It understands what the customer is asking, tracks orders, explains policies, recommends products and hands over to a human agent — with the full chat history — when it can't solve the problem itself.",
    features: [
      "Understands natural questions, not just fixed buttons",
      "Order tracking, returns & exchanges handled inside the chat",
      "Product recommendations with live offers & discount codes",
      "Smart handoff to a human agent with a support ticket",
      "Works on website, WhatsApp, Instagram & Messenger",
    ],
    tryIt: "Try: “track order 10482”, “recommend a hoodie” or “I want a refund”.",
    Component: ChatbotDemo,
  },
  {
    id: 2,
    title: "Order Automation Workflow",
    tagline: "Work that runs itself",
    description:
      "An automated pipeline that runs every time a new order comes in. AI checks the order for fraud risk, and the workflow then sends a WhatsApp confirmation, logs the order in Google Sheets and notifies the team on Slack — all in seconds, with no manual copy-paste. Risky orders are stopped automatically and sent for review.",
    features: [
      "Triggered automatically by new orders, forms or emails",
      "AI risk scoring to catch fake & high-risk COD orders",
      "WhatsApp, Google Sheets, Slack & email integrations",
      "Different paths for normal vs flagged orders",
      "Saves hours of repetitive admin work every week",
    ],
    tryIt: "Click “Run workflow”, then switch to “Suspicious order” to see AI stop it.",
    Component: WorkflowDemo,
  },
  {
    id: 3,
    title: "AI Email Inbox Assistant",
    tagline: "An inbox that sorts itself",
    description:
      "An AI assistant that reads every incoming email, sorts it by category, sets the priority, detects the customer's mood and writes a ready-to-send reply. The team just reviews and approves — urgent complaints and sales leads rise to the top, and spam never reaches a human.",
    features: [
      "Auto-categorises: exchange, order status, sales lead, spam",
      "Priority & sentiment detection so angry customers get help first",
      "Drafts personalised replies in the brand's tone",
      "Human approval before anything is sent",
      "Hot sales leads flagged for the sales team instantly",
    ],
    tryIt: "Click “Process with AI”, then open each email to see the analysis & reply.",
    Component: InboxDemo,
  },
];

interface AiShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiShowcase = ({ isOpen, onClose }: AiShowcaseProps) => {
  // Close on Esc + lock background scroll
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            data-lenis-prevent
            className="absolute inset-0 sm:inset-6 overflow-y-auto sm:rounded-3xl bg-background border border-foreground/10"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-5 bg-background/80 backdrop-blur-md border-b border-foreground/10">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 hover:bg-foreground/10 text-sm font-medium shrink-0 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </button>
              <h2 className="text-xl md:text-3xl font-bold tracking-tight text-right">
                <span className="text-neutral-900 dark:text-white">AI Automation</span>{" "}
                <span className="text-gradient-primary">& Chatbots</span>
              </h2>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
              <p className="text-muted-foreground max-w-3xl leading-relaxed">
                Intelligent chatbots and automated workflows that save businesses hours every week — answering customers
                instantly, handling repetitive tasks and connecting tools like WhatsApp, Google Sheets, Slack and email.
                Every demo below is interactive, so go ahead and try them.
              </p>
              <div className="mt-4 mb-12 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 max-w-3xl">
                <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <p className="text-sm leading-relaxed">
                  <span className="font-semibold">Note:</span> The chatbots and automations I've built for clients are
                  private to their businesses, so I can't attach them here. The demos below are my own — built by me to
                  show how these systems work. They use sample data and simulated responses.
                </p>
              </div>

              <div className="space-y-16">
                {demos.map((d, i) => (
                  <motion.div
                    key={d.id}
                    className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <div className={`lg:col-span-3 ${i % 2 ? "lg:order-2" : ""}`}>
                      <d.Component />
                    </div>

                    <div className="lg:col-span-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">{d.tagline}</p>
                      <h3 className="text-2xl font-bold tracking-tight mt-1">{d.title}</h3>
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{d.description}</p>
                      <ul className="mt-4 space-y-2">
                        {d.features.map((f) => (
                          <li key={f} className="flex gap-2 text-sm">
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 text-xs rounded-lg border border-primary/20 bg-primary/5 text-primary px-3 py-2">
                        👉 {d.tryIt}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center mt-16">
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Home
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AiShowcase;
