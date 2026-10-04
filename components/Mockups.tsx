"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { ProjectId } from "@/data/content";
import { Browser } from "./ui";

function useTick(ms: number, size: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v + 1) % size), ms);
    return () => clearInterval(id);
  }, [ms, size]);
  return n;
}

const Bar = ({ w, className = "" }: { w: string; className?: string }) => <span className={`block h-1.5 rounded-full bg-line-2 ${className}`} style={{ width: w }} />;

/* ---------------- GoGrade: tenant admin that re-labels itself per institution ---------------- */
const tenants = [
  { host: "xyz-school", org: "School", one: "Teacher", many: "Teachers" },
  { host: "abc-university", org: "University", one: "Faculty", many: "Faculties" },
  { host: "pqr-academy", org: "Academy", one: "Faculty", many: "Faculties" },
];
const questions = [
  { q: "Explain photosynthesis with a diagram", tag: "Long", ai: true },
  { q: "Solve: 2x + 7 = 19", tag: "Short", ai: false },
  { q: "Newton's third law, one example", tag: "Short", ai: true },
  { q: "Causes of the French Revolution", tag: "Long", ai: true },
];

function GoGradeMock() {
  const auto = useTick(2600, tenants.length);
  const [picked, setPicked] = useState<number | null>(null);
  const t = tenants[picked ?? auto];
  const marking = useTick(140, 100);

  return (
    <Browser url={`${t.host}.gograde.in/admin`}>
      <div className="grid min-h-[300px] grid-cols-[104px_minmax(0,1fr)] text-[11px] sm:grid-cols-[150px_minmax(0,1fr)]">
        <aside className="flex flex-col gap-1 border-r border-line bg-ink-2 p-3">
          <div className="mb-3 flex items-center gap-2">
            <span className="size-4 rounded bg-lime" />
            <span className="truncate font-medium text-paper">{t.org}</span>
          </div>
          {["Dashboard", t.many, "Question bank", "Papers", "Assessments"].map((n, i) => (
            <span key={n + i} className={`rounded-md px-2 py-1.5 transition-colors ${i === 2 ? "bg-canopy/60 text-lime" : "text-fog"}`}>
              {n}
            </span>
          ))}
        </aside>

        <div className="flex flex-col gap-3 p-3 sm:p-4">
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Tenant">
            {tenants.map((x, i) => (
              <button
                key={x.host}
                type="button"
                role="tab"
                aria-selected={t.host === x.host}
                onClick={() => setPicked(i)}
                className={`rounded-full border px-2.5 py-1 font-mono text-[10px] transition ${
                  t.host === x.host ? "border-lime/60 bg-canopy/50 text-lime" : "border-line text-fog hover:text-paper"
                }`}
              >
                {x.host}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-paper">Question bank</span>
            <span className="rounded-md bg-lime px-2 py-1 font-medium text-on-lime">+ Add {t.one.toLowerCase()}</span>
          </div>

          <div className="overflow-hidden rounded-lg border border-line">
            {questions.map((q, i) => (
              <div key={q.q} className={`flex items-center gap-2 px-3 py-2 ${i ? "border-t border-line" : ""}`}>
                <span className="truncate text-paper/85">{q.q}</span>
                {q.ai && (
                  <span className="ml-auto flex shrink-0 items-center gap-1 rounded-full bg-c-violet/15 px-1.5 py-0.5 text-[9px] text-c-violet">
                    <Sparkles className="size-2.5" /> AI
                  </span>
                )}
                <span className={`${q.ai ? "" : "ml-auto"} shrink-0 rounded border border-line px-1.5 py-0.5 text-[9px] text-fog`}>{q.tag}</span>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-dashed border-line-2 p-2.5">
            <div className="mb-1.5 flex justify-between font-mono text-[10px] text-fog">
              <span>pub/sub · marking-service</span>
              <span className="text-lime">{marking}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-lime transition-[width] duration-150" style={{ width: `${marking}%` }} />
            </div>
            <div className="mt-1.5 font-mono text-[10px] text-fog">
              en.json · <span className="text-paper">&quot;Add %org%:lower&quot;</span> → <span className="text-lime">Add {t.one.toLowerCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </Browser>
  );
}

/* ---------------- Asphalta: paint, finish, draggable decal, AI render queue ---------------- */
const paints = ["#e4fd97", "#d94b3d", "#f2f2ee", "#1b1b1b", "#3b6fd8"];
const finishes = ["Gloss", "Matte", "Carbon"] as const;
const decals = ["star", "bolt", "number"] as const;
type Decal = (typeof decals)[number];
const BODY = "M18 96 L26 74 Q36 64 70 61 L112 40 Q126 32 150 32 L206 32 Q226 32 240 45 L266 62 Q300 66 308 80 L312 96 Z";

function DecalShape({ kind }: { kind: Decal }) {
  if (kind === "bolt") return <path d="M1.5 -8 L-5 1 L-0.5 1 L-2 8 L5 -1.5 L0.5 -1.5 Z" fill="#2d3e2c" />;
  if (kind === "number")
    return (
      <text y="4" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2d3e2c">
        07
      </text>
    );
  return <path d="M0 -7 L2 -2 L7 -2 L3 1 L4.5 6.5 L0 3.2 L-4.5 6.5 L-3 1 L-7 -2 L-2 -2 Z" fill="#2d3e2c" />;
}

const renderStates = ["Render with AI", "Queued · BullMQ", "Gemini rendering…", "Render ready ✓"];

function AsphaltaMock() {
  const [paint, setPaint] = useState(paints[1]);
  const [finish, setFinish] = useState<(typeof finishes)[number]>("Gloss");
  const [kind, setKind] = useState<Decal>("star");
  const [decal, setDecal] = useState({ x: 196, y: 78 });
  const [render, setRender] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const move = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (!dragging.current || !svgRef.current) return;
    const r = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 320;
    const y = ((e.clientY - r.top) / r.height) * 130;
    setDecal({ x: Math.min(262, Math.max(118, x)), y: Math.min(86, Math.max(66, y)) });
  };

  const startRender = () => {
    if (render !== 0 && render !== 3) return;
    setRender(1);
    setTimeout(() => setRender(2), 900);
    setTimeout(() => setRender(3), 2300);
  };

  return (
    <Browser url="asphalta.3dxai.io/garage">
      <div className="flex flex-col gap-3 p-3 text-[11px] sm:p-4">
        <div className="relative rounded-lg border border-line bg-[radial-gradient(ellipse_at_center,#1a2217,#080b07)]">
          <svg
            ref={svgRef}
            viewBox="0 0 320 130"
            className="w-full touch-none select-none"
            onPointerMove={move}
            onPointerUp={() => (dragging.current = false)}
            onPointerLeave={() => (dragging.current = false)}
            role="img"
            aria-label="Car configurator with a draggable decal"
          >
            <defs>
              <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
                <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <pattern id="carbon" width="6" height="6" patternUnits="userSpaceOnUse">
                <rect width="6" height="6" fill="#161616" />
                <rect width="3" height="3" fill="#2c2c2c" />
                <rect x="3" y="3" width="3" height="3" fill="#2c2c2c" />
              </pattern>
            </defs>
            <ellipse cx="165" cy="118" rx="140" ry="6" fill="#000" opacity="0.5" />
            <path d={BODY} fill={finish === "Carbon" ? "url(#carbon)" : paint} stroke="#000" strokeOpacity="0.4" style={{ transition: "fill .4s" }} />
            {finish === "Gloss" && <path d={BODY} fill="url(#gloss)" />}
            <path d="M120 44 L146 37 L182 37 L182 59 L104 59 Z" fill="#0e140d" opacity="0.85" />
            <path d="M190 37 L208 37 Q220 39 234 58 L190 59 Z" fill="#0e140d" opacity="0.85" />
            <line x1="186" y1="62" x2="186" y2="94" stroke="#000" strokeOpacity="0.3" />
            <g
              transform={`translate(${decal.x} ${decal.y})`}
              onPointerDown={(e) => {
                dragging.current = true;
                (e.target as Element).setPointerCapture?.(e.pointerId);
              }}
              className="cursor-grab active:cursor-grabbing"
            >
              <circle r="11" fill="#e4fd97" stroke="#2d3e2c" strokeWidth="2" />
              <DecalShape kind={kind} />
            </g>
            {[80, 250].map((cx) => (
              <g key={cx}>
                <circle cx={cx} cy="98" r="20" fill="#0b0b0b" />
                <circle cx={cx} cy="98" r="11" fill="none" stroke="#e4fd97" strokeWidth="2" />
                {[0, 72, 144, 216, 288].map((a) => (
                  <line key={a} x1={cx} y1="98" x2={cx + 11 * Math.cos((a * Math.PI) / 180)} y2={98 + 11 * Math.sin((a * Math.PI) / 180)} stroke="#e4fd97" strokeWidth="1.5" />
                ))}
              </g>
            ))}
          </svg>
          <span className="absolute top-2 left-2 rounded-full border border-line bg-ink/80 px-2 py-0.5 font-mono text-[9px] text-fog">drag the decal</span>
          <span className="absolute top-2 right-2 rounded-full border border-line bg-ink/80 px-2 py-0.5 font-mono text-[9px] text-lime">mirror: on</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-1.5" role="radiogroup" aria-label="Paint">
            {paints.map((p) => (
              <button
                key={p}
                type="button"
                role="radio"
                aria-checked={paint === p}
                aria-label={`Paint ${p}`}
                onClick={() => {
                  setPaint(p);
                  if (finish === "Carbon") setFinish("Gloss");
                }}
                className={`size-5 rounded-full ring-offset-2 ring-offset-ink transition ${paint === p && finish !== "Carbon" ? "ring-2 ring-lime" : ""}`}
                style={{ background: p }}
              />
            ))}
          </div>
          <div className="flex gap-1" role="radiogroup" aria-label="Finish">
            {finishes.map((f) => (
              <button
                key={f}
                type="button"
                role="radio"
                aria-checked={finish === f}
                onClick={() => setFinish(f)}
                className={`rounded-md border px-2 py-1 transition ${finish === f ? "border-lime/60 bg-canopy/50 text-lime" : "border-line text-fog hover:text-paper"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-fog">decals</span>
            {decals.map((d) => (
              <button
                key={d}
                type="button"
                aria-label={`Decal ${d}`}
                aria-pressed={kind === d}
                onClick={() => setKind(d)}
                className={`rounded-full p-0.5 transition ${kind === d ? "ring-1 ring-lime" : "opacity-60 hover:opacity-100"}`}
              >
                <svg viewBox="-12 -12 24 24" className="size-6" aria-hidden>
                  <circle r="11" fill="#e4fd97" />
                  <DecalShape kind={d} />
                </svg>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={startRender}
            className={`rounded-md px-3 py-1.5 font-medium transition ${render === 3 ? "bg-c-mint text-on-lime" : render ? "border border-c-violet/50 text-c-violet" : "bg-lime text-on-lime hover:brightness-95"}`}
          >
            {renderStates[render]}
          </button>
        </div>
      </div>
    </Browser>
  );
}

/* ---------------- Chatbot: admin settings theming a widget on a customer site ---------------- */
const themes = ["#e4fd97", "#9cc9ff", "#ffc97a", "#f5a3c7"];
const greetings = ["Hi! Ask me anything about Acme.", "Hey 👋 Need help with an order?", "Welcome! How can I help today?"];

function ChatbotMock() {
  const [theme, setTheme] = useState(themes[0]);
  const [g, setG] = useState(0);
  const typing = useTick(500, 4);

  return (
    <Browser url="acme.com">
      <div className="grid text-[11px] lg:min-h-[300px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <div className="flex flex-col gap-3 border-b border-line bg-ink-2 p-3 lg:border-r lg:border-b-0">
          <span className="font-mono text-[10px] text-fog">widget.settings</span>
          <div>
            <div className="mb-1.5 text-fog">Primary color</div>
            <div className="flex gap-1.5">
              {themes.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={`Theme ${c}`}
                  aria-pressed={theme === c}
                  onClick={() => setTheme(c)}
                  className={`size-5 rounded-full ring-offset-2 ring-offset-ink-2 transition ${theme === c ? "ring-2 ring-paper/70" : ""}`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-fog">Greeting</div>
            <button type="button" onClick={() => setG((v) => (v + 1) % greetings.length)} className="w-full truncate rounded-md border border-line bg-ink px-2 py-1.5 text-left text-paper/85 hover:border-line-2">
              {greetings[g]}
            </button>
          </div>
          <div>
            <div className="mb-1.5 text-fog">Knowledge base</div>
            {["faq.pdf", "pricing.docx"].map((f) => (
              <div key={f} className="mb-1 flex items-center justify-between rounded-md border border-line bg-ink px-2 py-1 font-mono text-[10px]">
                <span className="text-paper/80">{f}</span>
                <span className="text-c-mint">indexed</span>
              </div>
            ))}
          </div>
          <code className="mt-auto truncate rounded-md border border-line bg-ink px-2 py-1 font-mono text-[9px] text-lime">{'<script src="widget.js">'}</code>
        </div>

        <div className="relative min-h-[270px] bg-ink p-3">
          <div className="flex flex-col gap-2 opacity-60">
            <Bar w="40%" className="h-2.5" />
            <Bar w="85%" />
            <Bar w="70%" />
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-10 rounded-md bg-ink-3" />
              ))}
            </div>
          </div>

          <div className="absolute right-2 bottom-2 left-6 overflow-hidden rounded-xl border border-line-2 bg-ink-2 shadow-2xl sm:left-10">
            <div className="flex items-center gap-2 px-2.5 py-2 text-[#2d3e2c]" style={{ background: theme, transition: "background .3s" }}>
              <span className="grid size-5 place-items-center rounded-full bg-[#2d3e2c]/15 text-[9px] font-semibold">AI</span>
              <span className="font-medium">Acme Assistant</span>
            </div>
            <div className="flex flex-col gap-1.5 p-2.5">
              <div className="max-w-[90%] rounded-xl rounded-tl-sm bg-ink-3 px-2.5 py-1.5 text-paper/90">{greetings[g]}</div>
              <div className="flex flex-wrap gap-1">
                {["Pricing", "Refunds"].map((o) => (
                  <span key={o} className="rounded-full border-[1.5px] px-2 py-0.5 text-paper/85" style={{ borderColor: theme }}>
                    {o}
                  </span>
                ))}
              </div>
              <div className="ml-auto rounded-xl rounded-tr-sm px-2.5 py-1.5 text-[#2d3e2c]" style={{ background: theme }}>
                How do refunds work?
              </div>
              <div className="flex w-12 gap-1 rounded-xl bg-ink-3 px-2.5 py-2">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="size-1.5 rounded-full bg-paper/70 transition-opacity" style={{ opacity: typing === i ? 1 : 0.3 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Browser>
  );
}

/* ---------------- Co-Health: 13-step form, ECG feed, nurse slots, order flow ---------------- */
const slots = [
  { t: "09:00", booked: 2 },
  { t: "09:30", booked: 1 },
  { t: "10:00", booked: 0 },
  { t: "10:30", booked: 2 },
];
const ECG = "M0 32 H40 L48 28 L54 32 H70 L76 40 L84 6 L92 52 L98 32 H130 L138 26 L146 32 H170 L176 40 L184 6 L192 52 L198 32 H230 L238 27 L246 32 H260 L266 40 L274 6 L282 52 L288 32 H300";

function CoHealthMock() {
  const step = useTick(650, 13);
  const order = useTick(1200, 3);
  return (
    <Browser url="admin.co-health / patients / household">
      <div className="grid gap-3 p-3 text-[11px] sm:p-4 md:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-line bg-ink-2 p-3">
            <div className="mb-2 flex justify-between font-mono text-[10px] text-fog">
              <span>household.form</span>
              <span className="text-lime">step {String(step + 1).padStart(2, "0")} / 13</span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 13 }, (_, i) => (
                <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= step ? "bg-lime" : "bg-line"}`} />
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {["Head of household", "Members", "Village", "Phone"].map((f) => (
                <div key={f}>
                  <div className="mb-1 text-fog">{f}</div>
                  <div className="h-6 rounded-md border border-line bg-ink" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-line bg-ink-2 p-3">
            <div className="mb-1 flex justify-between font-mono text-[10px] text-fog">
              <span>ecg · sensor feed</span>
              <span className="flex items-center gap-1 text-c-mint">
                <span className="pulse-dot size-1.5 rounded-full bg-c-mint" /> live
              </span>
            </div>
            <svg viewBox="0 0 300 60" className="h-14 w-full" fill="none" aria-hidden>
              <path d={ECG} stroke="var(--color-line-2)" strokeWidth="2" />
              <path className="ecg-line" d={ECG} stroke="var(--color-c-mint)" strokeWidth="2.2" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-line bg-ink-2 p-3">
            <div className="mb-2 font-mono text-[10px] text-fog">clinic.slots · 2 nurses</div>
            <div className="grid grid-cols-2 gap-1.5">
              {slots.map((s) => (
                <div key={s.t} className={`flex items-center justify-between rounded-md border px-2 py-1.5 ${s.booked === 2 ? "border-line text-fog line-through" : "border-line-2 text-paper"}`}>
                  <span className="font-mono">{s.t}</span>
                  <span className="flex gap-0.5">
                    {[0, 1].map((i) => (
                      <span key={i} className={`size-2 rounded-full border border-lime/70 ${i < s.booked ? "bg-lime" : ""}`} />
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-line bg-ink-2 p-3">
            <div className="mb-2 font-mono text-[10px] text-fog">medicine.order · recurring monthly</div>
            <div className="flex items-center gap-1">
              {["Nurse", "Pharmacy", "Delivery"].map((s, i) => (
                <div key={s} className="flex flex-1 items-center gap-1">
                  <span className={`flex-1 rounded-md border px-1.5 py-1.5 text-center transition-colors duration-300 ${i <= order ? "border-lime/60 bg-canopy/50 text-lime" : "border-line text-fog"}`}>{s}</span>
                  {i < 2 && <span className="text-fog">→</span>}
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-1">
              {["Quick", "Partial", "Daily", "Monthly"].map((k) => (
                <span key={k} className="rounded border border-line px-1.5 py-0.5 text-[9px] text-fog">
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Browser>
  );
}

export default function Mockup({ id }: { id: ProjectId }) {
  switch (id) {
    case "gograde":
      return <GoGradeMock />;
    case "asphalta":
      return <AsphaltaMock />;
    case "chatbot":
      return <ChatbotMock />;
    case "cohealth":
      return <CoHealthMock />;
  }
}
