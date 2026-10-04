"use client";

import { Play, RotateCcw } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Accent, Reveal, Section, SectionHead } from "./ui";

function Panel({ title, right, children, className = "" }: { title: string; right?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div
      className={`card flex h-full flex-col overflow-hidden rounded-2xl border border-line ${className}`}
      style={{ background: "color-mix(in oklab, var(--color-lime) 9%, var(--color-ink))" }}
    >
      <div
        className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-xs text-fog"
        style={{ background: "color-mix(in oklab, var(--color-lime) 6%, var(--color-ink-2))" }}
      >
        <span>{title}</span>
        {right}
      </div>
      <div className="flex-1" style={{ background: "color-mix(in oklab, var(--color-lime) 7%, var(--color-ink))" }}>{children}</div>
    </div>
  );
}

/* ---------------- terminal ---------------- */
const script: { t: string; c: string }[] = [
  { t: "$ python -m pytest", c: "text-paper" },
  { t: "✓ Python API integration tests passed", c: "text-lime" },
  { t: "✓ PostgreSQL connection verified", c: "text-c-mint" },
  { t: "✓ RAG retrieval returns grounded sources", c: "text-c-violet" },
  { t: "$ npm run build", c: "text-paper" },
  { t: "▲ Next.js — creating optimized build", c: "text-fog" },
  { t: "✓ Compiled successfully", c: "text-lime" },
  { t: "✓ Type check passed", c: "text-lime" },
];

function Terminal() {
  const [n, setN] = useState(0);
  const [run, setRun] = useState(0);
  useEffect(() => {
    setN(0);
    const id = setInterval(() => setN((v) => (v >= script.length ? v : v + 1)), 420);
    return () => clearInterval(id);
  }, [run]);
  return (
    <Panel
      title="~/kunjbihari — zsh"
      right={
        <button type="button" onClick={() => setRun((r) => r + 1)} className="flex items-center gap-1 hover:text-paper">
          <RotateCcw className="size-3" /> rerun
        </button>
      }
    >
      <div className="min-h-[250px] p-4 font-mono text-[13px] leading-7">
        {script.slice(0, n).map((l, i) => (
          <div key={i} className={l.c}>
            {l.t}
          </div>
        ))}
        <span className="text-lime">$ </span>
        <span className="caret inline-block h-4 w-2 translate-y-0.5 bg-paper" />
      </div>
    </Panel>
  );
}

/* ---------------- request.http (RAG chat) ---------------- */
const answer = `{
  "answer": "Refunds go back to the original card in 5–7 days.",
  "sources": ["faq.pdf#refunds"],
  "grounded": true
}`;

function RequestHttp() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [shown, setShown] = useState("");

  const send = () => {
    setState("loading");
    setShown("");
    setTimeout(() => {
      setState("done");
      let i = 0;
      const id = setInterval(() => {
        i += 3;
        setShown(answer.slice(0, i));
        if (i >= answer.length) clearInterval(id);
      }, 18);
    }, 700);
  };

  return (
    <Panel title="request.http">
      <div className="flex h-full flex-col gap-3 p-4">
        <div
          className="flex items-center justify-between rounded-lg border border-line px-3 py-2 font-mono text-xs"
          style={{ background: "color-mix(in oklab, var(--color-lime) 7%, var(--color-ink))" }}
        >
          <span>
            <span className="text-lime">POST</span> <span className="text-paper">/api/chat</span>
          </span>
          <button
            type="button"
            onClick={send}
            disabled={state === "loading"}
            className="flex items-center gap-1 rounded-md bg-lime px-2.5 py-1 font-sans font-medium text-on-lime transition hover:brightness-95 disabled:opacity-60"
          >
            <Play className="size-3" /> Send
          </button>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-fog">
          widget <span className="h-px flex-1 bg-line" /> Python API → RAG → LLM
        </div>
        <div className="grid flex-1 gap-2 sm:grid-cols-2">
          <pre
            className="rounded-lg border border-line p-3 font-mono text-[11px] leading-5 text-paper/85"
            style={{ background: "color-mix(in oklab, var(--color-lime) 5%, var(--color-ink))" }}
          >{`{
  "question": "How do
    refunds work?",
  "site": "acme"
}`}</pre>
          <pre
            className="min-h-[110px] rounded-lg border border-line p-3 font-mono text-[11px] leading-5 whitespace-pre-wrap text-c-mint"
            style={{ background: "color-mix(in oklab, var(--color-lime) 5%, var(--color-ink))" }}
          >
            {state === "idle" && <span className="text-fog">response</span>}
            {state === "loading" && <span className="pulse-dot text-fog">retrieving context…</span>}
            {state === "done" && shown}
          </pre>
        </div>
      </div>
    </Panel>
  );
}

/* ---------------- editor ---------------- */
const files: Record<string, { lang: string; lines: ReactNode[] }> = {
  "schema.sql": {
    lang: "PostgreSQL",
    lines: [
      <><span className="text-c-violet">CREATE TABLE</span> question_bank (</>,
      <>  id          <span className="text-c-blue">uuid</span> <span className="text-c-violet">PRIMARY KEY</span>,</>,
      <>  subject_id  <span className="text-c-blue">uuid</span> <span className="text-c-violet">REFERENCES</span> subjects,</>,
      <>  body        <span className="text-c-blue">text</span> <span className="text-c-violet">NOT NULL</span>,</>,
      <>  ai_generated <span className="text-c-blue">boolean</span> <span className="text-c-violet">DEFAULT</span> <span className="text-c-amber">false</span></>,
      <>);</>,
    ],
  },
  "api.py": {
    lang: "Python",
    lines: [
      <><span className="text-c-violet">async def</span> create_assessment(payload):</>,
      <>  response = <span className="text-c-blue">await</span> client.post(</>,
      <>    <span className="text-lime">&quot;/assessments&quot;</span>, json=payload</>,
      <>  )</>,
      <>  response.raise_for_status()</>,
      <>  <span className="text-c-violet">return</span> response.json()</>,
    ],
  },
  "Decal.tsx": {
    lang: "React Three Fiber",
    lines: [
      <><span className="text-c-violet">function</span> <span className="text-c-amber">onPointerDown</span>(e) {"{"}</>,
      <>  <span className="text-c-violet">const</span> hit = e.intersections[<span className="text-c-amber">0</span>];</>,
      <>  place(hit.point, hit.face.normal);</>,
      <>  place(mirror(hit.point), mirror(hit.face.normal));</>,
      <>{"}"}</>,
    ],
  },
};

function Editor() {
  const names = Object.keys(files);
  const [tab, setTab] = useState(names[0]);
  const f = files[tab];
  return (
    <Panel title="editor" right={<span className="text-lime">{f.lang}</span>}>
      <div className="flex gap-1 border-b border-line px-3 pt-2">
        {names.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setTab(n)}
            className={`rounded-t-md px-3 py-1.5 font-mono text-xs transition ${tab === n ? "bg-[var(--color-ink)] text-paper" : "bg-[var(--color-ink-2)] text-fog hover:text-paper"}`}
          >
            {n}
          </button>
        ))}
      </div>
      <div
        className="min-h-[200px] overflow-x-auto"
        aria-label="Scrollable code editor preview"
        tabIndex={0}
        style={{ background: "color-mix(in oklab, var(--color-lime) 6%, var(--color-ink))" }}
      >
        <div className="min-w-max p-4 font-mono text-[12px] leading-6">
          {f.lines.map((l, i) => (
            <div key={tab + i} className="flex gap-4 whitespace-pre">
              <span className="w-4 shrink-0 text-right text-fog/50 select-none">{i + 1}</span>
              <span className="text-paper/90">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* ---------------- psql ---------------- */
const rows = [
  { tenant: "xyz-school", type: "school", staff: "Teacher" },
  { tenant: "abc-university", type: "university", staff: "Faculty" },
  { tenant: "pqr-academy", type: "academy", staff: "Faculty" },
];

function Psql() {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setShown((v) => Math.min(rows.length, v + 1)), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <Panel title="psql — gograde_master" right={<span className="text-c-mint">PostgreSQL</span>}>
      <div className="min-h-[200px] p-4 font-mono text-[12px]">
        <div className="text-paper">
          <span className="text-c-violet">SELECT</span> subdomain, org_type, staff_label
        </div>
        <div className="text-paper">
          <span className="text-c-violet">FROM</span> tenants <span className="text-c-violet">ORDER BY</span> created_at;
        </div>
        <div className="mt-3 overflow-hidden rounded-lg border border-line">
          <div
            className="grid grid-cols-3 px-3 py-1.5 text-[10px] uppercase tracking-wider text-fog"
            style={{ background: "color-mix(in oklab, var(--color-lime) 7%, var(--color-ink))" }}
          >
            <span>subdomain</span>
            <span>org_type</span>
            <span>staff_label</span>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.tenant}
              className={`grid grid-cols-3 border-t border-line px-3 py-1.5 transition-opacity duration-300 ${i < shown ? "opacity-100" : "opacity-0"}`}
            >
              <span className="truncate text-paper">{r.tenant}</span>
              <span className="text-fog">{r.type}</span>
              <span className="text-lime">{r.staff}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 text-[11px] text-fog">({shown} rows) · one database per tenant</div>
      </div>
    </Panel>
  );
}

export default function Workspace() {
  return (
    <Section id="workspace">
      <SectionHead index="06" label="Workspace" title={<>Step into my <Accent>workspace</Accent>.</>} />
      <div className="grid gap-4 md:grid-cols-2">
        <Reveal>
          <Terminal />
        </Reveal>
        <Reveal delay={0.05}>
          <RequestHttp />
        </Reveal>
        <Reveal>
          <Editor />
        </Reveal>
        <Reveal delay={0.05}>
          <Psql />
        </Reveal>
      </div>
    </Section>
  );
}
