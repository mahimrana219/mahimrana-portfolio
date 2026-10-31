import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Check, Loader2, MessageCircle, Play, ShoppingBag, Sheet, Slack, TriangleAlert, Minus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTimers } from "./useTimers";

// Simulated order automation pipeline — pressing "Run" animates each step

type Result = "done" | "flag" | "skip";
type StepState = "idle" | "running" | Result;

const steps: { icon: LucideIcon; title: string }[] = [
  { icon: ShoppingBag, title: "New order received" },
  { icon: BrainCircuit, title: "AI fraud & risk check" },
  { icon: MessageCircle, title: "WhatsApp confirmation" },
  { icon: Sheet, title: "Update Google Sheet" },
  { icon: Slack, title: "Notify team on Slack" },
];

const scenarios = {
  Normal: [
    { result: "done", detail: "Order #10482 · Rs 7,450 · 3 items · Lahore" },
    { result: "done", detail: "Low risk (0.08) — returning customer, phone & address verified" },
    { result: "done", detail: "Personalised confirmation sent to customer with order summary" },
    { result: "done", detail: 'Row added to "Orders 2026" with status Confirmed' },
    { result: "done", detail: "#orders channel updated — ready to pack" },
  ],
  Suspicious: [
    { result: "done", detail: "Order #10483 · Rs 89,900 · 12 items · COD" },
    { result: "flag", detail: "High risk (0.91) — new account, city mismatch, unusually large COD" },
    { result: "skip", detail: "Held — customer will be messaged after verification" },
    { result: "done", detail: 'Row added with status "On hold – review"' },
    { result: "flag", detail: "Alert sent to @ops-team for manual call verification" },
  ],
} as const satisfies Record<string, readonly { result: Result; detail: string }[]>;

type Scenario = keyof typeof scenarios;

const badge: Record<StepState, string> = {
  idle: "bg-foreground/5 text-muted-foreground",
  running: "bg-primary/10 text-primary",
  done: "bg-emerald-500/10 text-emerald-600",
  flag: "bg-rose-500/10 text-rose-600",
  skip: "bg-amber-500/10 text-amber-600",
};

const StatusIcon = ({ state }: { state: StepState }) => {
  if (state === "running") return <Loader2 className="w-4 h-4 animate-spin" />;
  if (state === "done") return <Check className="w-4 h-4" />;
  if (state === "flag") return <TriangleAlert className="w-4 h-4" />;
  if (state === "skip") return <Minus className="w-4 h-4" />;
  return <span className="w-1.5 h-1.5 rounded-full bg-current" />;
};

export const WorkflowDemo = () => {
  const [scenario, setScenario] = useState<Scenario>("Normal");
  const [states, setStates] = useState<StepState[]>(steps.map(() => "idle"));
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const { later, clear } = useTimers();

  const run = (s: Scenario = scenario) => {
    clear();
    setRunning(true);
    setFinished(false);
    setStates(steps.map(() => "idle"));
    scenarios[s].forEach((step, i) => {
      later(() => setStates((st) => st.map((v, j) => (j === i ? "running" : v))), i * 800);
      later(() => setStates((st) => st.map((v, j) => (j === i ? step.result : v))), i * 800 + 650);
    });
    later(() => {
      setRunning(false);
      setFinished(true);
    }, steps.length * 800);
  };

  const pick = (s: Scenario) => {
    setScenario(s);
    run(s);
  };

  return (
    <div className="w-full rounded-2xl border border-foreground/10 bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="inline-flex p-0.5 rounded-lg bg-foreground/5">
          {(Object.keys(scenarios) as Scenario[]).map((s) => (
            <button
              key={s}
              onClick={() => pick(s)}
              disabled={running}
              className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer disabled:cursor-not-allowed ${
                scenario === s ? "bg-card shadow-sm" : "text-muted-foreground"
              }`}
            >
              {s} order
            </button>
          ))}
        </div>
        <button
          onClick={() => run()}
          disabled={running}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50 cursor-pointer"
        >
          {running ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          {running ? "Running…" : "Run workflow"}
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-5 top-5 bottom-5 w-px bg-foreground/10" />
        <div className="space-y-3">
          {steps.map(({ icon: Icon, title }, i) => {
            const state = states[i];
            const active = state !== "idle";
            return (
              <motion.div
                key={title}
                animate={{ opacity: active || !finished ? 1 : 0.5 }}
                className="relative flex items-start gap-3"
              >
                <span
                  className={`relative z-[1] w-10 h-10 rounded-xl grid place-items-center shrink-0 border transition-colors ${
                    active ? "bg-card border-primary/30 text-primary" : "bg-card border-foreground/10 text-muted-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </span>
                <div className="flex-1 min-w-0 rounded-xl border border-foreground/10 px-3.5 py-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold">{title}</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium capitalize ${badge[state]}`}>
                      <StatusIcon state={state} /> {state === "flag" ? "flagged" : state === "skip" ? "on hold" : state}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 transition-colors ${active && state !== "running" ? "text-muted-foreground" : "text-transparent select-none"}`}>
                    {scenarios[scenario][i].detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 h-10">
        {finished && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xs px-3 py-2 rounded-lg ${
              scenario === "Normal" ? "bg-emerald-500/10 text-emerald-700" : "bg-rose-500/10 text-rose-700"
            }`}
          >
            {scenario === "Normal"
              ? "✓ Completed in 4.1s — about 6 minutes of manual work saved on this order."
              : "⚠ Risky order stopped automatically and sent to the team for review."}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default WorkflowDemo;
