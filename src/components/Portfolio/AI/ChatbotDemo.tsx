import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Bot, RotateCcw, Send } from "lucide-react";
import { useTimers } from "./useTimers";

// Simulated AI support bot — keyword based replies (portfolio demo, no API key)

type Msg = { from: "bot" | "user"; text: string; chips?: string[] };

const mainChips = ["Track my order", "Return policy", "Recommend a hoodie", "Talk to a human"];

const intro: Msg = {
  from: "bot",
  text: "Hi! 👋 I'm ShopAssist, the AI assistant for Urban Threads. I can track orders, answer questions and help you shop — 24/7.",
  chips: mainChips,
};

const reply = (text: string, awaitingOrder: boolean): { msg: Msg; awaitingOrder: boolean } => {
  const t = text.toLowerCase();
  const orderNo = t.match(/\d{4,}/)?.[0];

  if (orderNo) {
    return {
      msg: {
        from: "bot",
        text: `Order #${orderNo} is on its way 🚚 It was shipped yesterday via TCS and should arrive by Thursday. I've also sent the tracking link to your email.`,
        chips: ["Change delivery address", "Return policy"],
      },
      awaitingOrder: false,
    };
  }
  if (awaitingOrder) {
    return { msg: { from: "bot", text: "Please share your order number (for example 10482) and I'll check it right away." }, awaitingOrder: true };
  }
  if (/track|order|where|status/.test(t)) {
    return { msg: { from: "bot", text: "Sure! What's your order number?" }, awaitingOrder: true };
  }
  if (/start a return|^yes/.test(t)) {
    return {
      msg: { from: "bot", text: "Done ✅ Return request RT-5521 is created. A rider will collect the parcel within 48 hours — no extra charges." },
      awaitingOrder: false,
    };
  }
  if (/return|refund|exchange/.test(t)) {
    return {
      msg: {
        from: "bot",
        text: "You can return or exchange any unworn item within 14 days. Refunds reach your account in 3–5 working days. Want me to start a return for you?",
        chips: ["Yes, start a return", "Track my order"],
      },
      awaitingOrder: false,
    };
  }
  if (/hoodie|recommend|suggest|buy|jacket|winter/.test(t)) {
    return {
      msg: {
        from: "bot",
        text: "Based on what's trending this week, I'd suggest:\n• Classic Fleece Hoodie — Rs 3,490 (best seller)\n• Oversized Zip Hoodie — Rs 4,250\n• Heavyweight Black Hoodie — Rs 3,990\nUse code WINTER10 for 10% off 🎁",
        chips: ["Size guide", "Track my order"],
      },
      awaitingOrder: false,
    };
  }
  if (/size|fit/.test(t)) {
    return {
      msg: { from: "bot", text: "Our hoodies run slightly oversized. If you're usually a Medium, a Small gives a regular fit and Medium a relaxed fit." },
      awaitingOrder: false,
    };
  }
  if (/address|delivery|deliver/.test(t)) {
    return {
      msg: { from: "bot", text: "No problem — please type the new address and I'll update it before the rider is assigned." },
      awaitingOrder: false,
    };
  }
  if (/human|agent|person|call|talk/.test(t)) {
    return {
      msg: {
        from: "bot",
        text: "I've created ticket #T-2291 and shared this chat with our team, so you won't have to repeat yourself. A team member will reply within 10 minutes. 🙌",
      },
      awaitingOrder: false,
    };
  }
  if (/price|cost|discount|sale|offer|code/.test(t)) {
    return { msg: { from: "bot", text: "Right now there's 10% off all winterwear with code WINTER10, plus free delivery on orders above Rs 5,000." }, awaitingOrder: false };
  }
  if (/^(hi|hello|hey|salam|aoa|assalam)/.test(t)) {
    return { msg: { from: "bot", text: "Hello! How can I help you today?", chips: mainChips }, awaitingOrder: false };
  }
  return {
    msg: { from: "bot", text: "I'm not 100% sure about that one. I can help with orders, returns, products and offers — or connect you to our team.", chips: mainChips },
    awaitingOrder: false,
  };
};

export const ChatbotDemo = () => {
  const [messages, setMessages] = useState<Msg[]>([intro]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [awaitingOrder, setAwaitingOrder] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { later, clear } = useTimers();

  // Scroll only inside the chat box, not the whole page
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim() || typing) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    const r = reply(text, awaitingOrder);
    later(() => {
      setTyping(false);
      setAwaitingOrder(r.awaitingOrder);
      setMessages((m) => [...m, r.msg]);
    }, 900);
  };

  const reset = () => {
    clear();
    setTyping(false);
    setAwaitingOrder(false);
    setMessages([intro]);
  };

  const last = messages[messages.length - 1];

  return (
    <div className="w-full rounded-2xl border border-foreground/10 bg-card overflow-hidden flex flex-col h-[480px]">
      <div className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground">
        <span className="w-9 h-9 rounded-full bg-white/20 grid place-items-center">
          <Bot className="w-5 h-5" />
        </span>
        <div className="flex-1">
          <p className="font-semibold text-sm">ShopAssist AI</p>
          <p className="text-xs opacity-80">● Online · replies instantly</p>
        </div>
        <button onClick={reset} className="p-2 rounded-full hover:bg-white/15 cursor-pointer" aria-label="Restart chat">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div ref={scrollRef} data-lenis-prevent className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${
                m.from === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card border border-foreground/10 rounded-bl-sm"
              }`}
            >
              {m.text}
            </div>
          </motion.div>
        ))}
        {typing && (
          <div className="flex gap-1 px-4 py-3 w-fit rounded-2xl bg-card border border-foreground/10">
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: d * 0.15 }}
              />
            ))}
          </div>
        )}
        {!typing && last.from === "bot" && last.chips && (
          <div className="flex flex-wrap gap-2 pt-1">
            {last.chips.map((c) => (
              <button
                key={c}
                onClick={() => send(c)}
                className="px-3 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-medium hover:bg-primary/10 cursor-pointer"
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 p-3 border-t border-foreground/10 bg-card"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message… e.g. track order 10482"
          className="flex-1 px-3.5 py-2 rounded-full bg-foreground/5 text-sm outline-none focus:ring-2 focus:ring-primary/40"
        />
        <button
          type="submit"
          disabled={!input.trim() || typing}
          className="w-9 h-9 rounded-full bg-primary text-primary-foreground grid place-items-center disabled:opacity-40 cursor-pointer"
          aria-label="Send"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default ChatbotDemo;
