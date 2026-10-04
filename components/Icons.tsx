"use client";

import { useId, type ReactNode } from "react";

/**
 * Illustrated icons: soft gradient shapes on a 48x48 grid with a ground shadow
 * and, often, a small round badge. Each instance gets its own gradient ids so
 * the same icon can appear many times (and inside hidden elements) safely.
 */

type IconProps = { className?: string; label?: string };

function useIds() {
  const raw = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (k: string) => `i${raw}${k}`;
}

function Frame({ children, className = "size-12", label }: { children: ReactNode; className?: string; label?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role={label ? "img" : undefined} aria-hidden={label ? undefined : true} aria-label={label}>
      <ellipse cx="24" cy="44.5" rx="13" ry="2" fill="#000" opacity="0.28" />
      {children}
    </svg>
  );
}

function Grad({ id, from, to, horizontal = false }: { id: string; from: string; to: string; horizontal?: boolean }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={horizontal ? "1" : "0"} y2={horizontal ? "0" : "1"}>
      <stop offset="0%" stopColor={from} />
      <stop offset="100%" stopColor={to} />
    </linearGradient>
  );
}

const P = {
  lime: ["#f0ffc2", "#9cc43f"],
  green: ["#c4e8bb", "#5f9a57"],
  blue: ["#c2e0ff", "#5f93c2"],
  violet: ["#ddd3ff", "#8e79d4"],
  amber: ["#ffdcaa", "#d9853f"],
  mint: ["#c4f3e1", "#3fa883"],
  stone: ["#eef1e6", "#b9c0ad"],
  rose: ["#ffc9c2", "#e0705f"],
} as const;

const screen = "#1b2117";

/* ---------- Layers / skills ---------- */

/** Browser window with a layout sketch. Frontend / client. */
export function AppIcon({ className, label }: IconProps) {
  const id = useIds();
  return (
    <Frame className={className} label={label}>
      <defs>
        <Grad id={id("a")} from={P.blue[0]} to={P.blue[1]} />
      </defs>
      <rect x="5" y="7" width="38" height="31" rx="4.5" fill={`url(#${id("a")})`} />
      <rect x="8" y="14" width="32" height="21" rx="1.5" fill={screen} />
      {[9.5, 13, 16.5].map((x, i) => (
        <circle key={x} cx={x} cy="10.5" r="1.2" fill={["#e0705f", "#ffc97a", "#9cc43f"][i]} />
      ))}
      <rect x="11" y="17" width="8" height="15" rx="1" fill="#3a4535" />
      <rect x="21" y="17" width="16" height="6" rx="1" fill="#e4fd97" opacity="0.85" />
      <rect x="21" y="25" width="7" height="7" rx="1" fill="#3a4535" />
      <rect x="30" y="25" width="7" height="7" rx="1" fill="#3a4535" />
    </Frame>
  );
}

/** Isometric cube with lit faces. 3D web. */
export function CubeIcon({ className, label }: IconProps) {
  const id = useIds();
  return (
    <Frame className={className} label={label}>
      <defs>
        <Grad id={id("t")} from="#fbffe6" to="#e4fd97" />
        <Grad id={id("l")} from={P.amber[0]} to={P.amber[1]} />
        <Grad id={id("r")} from="#e0a25e" to="#a8611f" />
      </defs>
      <path d="M24 5 L41 14.5 L24 24 L7 14.5 Z" fill={`url(#${id("t")})`} />
      <path d="M7 14.5 L24 24 L24 42 L7 32.5 Z" fill={`url(#${id("l")})`} />
      <path d="M41 14.5 L24 24 L24 42 L41 32.5 Z" fill={`url(#${id("r")})`} />
      <path d="M15.5 19.3 L15.5 28 M32.5 19.3 L32.5 28" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" />
      <circle cx="24" cy="14.5" r="2.4" fill="#9cc43f" />
    </Frame>
  );
}

/** Stacked servers with a plus badge. Backend / API. */
export function ServersIcon({ className, label }: IconProps) {
  const id = useIds();
  return (
    <Frame className={className} label={label}>
      <defs>
        <Grad id={id("a")} from={P.lime[0]} to={P.lime[1]} />
        <Grad id={id("b")} from={P.blue[0]} to={P.blue[1]} />
      </defs>
      {[8, 19, 30].map((y, i) => (
        <rect key={y} x="8" y={y} width="27" height="9" rx="2.5" fill={`url(#${id("a")})`} opacity={1 - i * 0.14} />
      ))}
      {[12.5, 23.5, 34.5].map((y) => (
        <g key={y}>
          <circle cx="13" cy={y} r="1.3" fill="#2d3e2c" opacity="0.8" />
          <rect x="18" y={y - 0.8} width="12" height="1.6" rx="0.8" fill="#2d3e2c" opacity="0.35" />
        </g>
      ))}
      <circle cx="38" cy="12" r="6" fill={`url(#${id("b")})`} />
      <path d="M35.5 12 h5 M38 9.5 v5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </Frame>
  );
}

/** Conveyor with job boxes. Queues / BullMQ / Pub/Sub. */
export function QueueIcon({ className, label }: IconProps) {
  const id = useIds();
  return (
    <Frame className={className} label={label}>
      <defs>
        <Grad id={id("a")} from={P.violet[0]} to={P.violet[1]} />
        <Grad id={id("b")} from={P.amber[0]} to={P.amber[1]} />
      </defs>
      <rect x="5" y="30" width="38" height="7" rx="3.5" fill="#3a4535" />
      {[10, 17, 24, 31, 38].map((x) => (
        <circle key={x} cx={x} cy="33.5" r="1.7" fill="#8c9886" />
      ))}
      <rect x="8" y="19" width="10" height="10" rx="1.8" fill={`url(#${id("b")})`} />
      <rect x="19.5" y="17" width="10" height="12" rx="1.8" fill={`url(#${id("a")})`} />
      <rect x="31" y="21" width="9" height="8" rx="1.8" fill={`url(#${id("b")})`} opacity="0.75" />
      <path d="M13 22.5 v3 M24.5 20.5 v5" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M30 10 h8 l-2.5 -2.5 M38 10 l-2.5 2.5" stroke="#8e79d4" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

/** Database cylinder with a lock badge. PostgreSQL / storage. */
export function DatabaseIcon({ className, label }: IconProps) {
  const id = useIds();
  return (
    <Frame className={className} label={label}>
      <defs>
        <Grad id={id("a")} from={P.mint[0]} to={P.mint[1]} />
        <Grad id={id("b")} from={P.amber[0]} to={P.amber[1]} />
      </defs>
      <path d="M8 11 v22 a14 5 0 0 0 28 0 v-22" fill={`url(#${id("a")})`} />
      <ellipse cx="22" cy="11" rx="14" ry="5" fill="#d9f7ea" />
      <path d="M8 18.5 a14 5 0 0 0 28 0 M8 26 a14 5 0 0 0 28 0" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.2" />
      <path d="M34 30 v-2.5 a4 4 0 0 1 8 0 v2.5" fill="none" stroke="#b86a2c" strokeWidth="2" />
      <rect x="31.5" y="30" width="13" height="10" rx="2" fill={`url(#${id("b")})`} />
      <circle cx="38" cy="35" r="1.5" fill="#fff" />
    </Frame>
  );
}

/** Stacked document cards with a leaf. MongoDB / documents. */
export function DocsIcon({ className, label }: IconProps) {
  const id = useIds();
  return (
    <Frame className={className} label={label}>
      <defs>
        <Grad id={id("a")} from={P.stone[0]} to={P.stone[1]} />
        <Grad id={id("b")} from={P.green[0]} to={P.green[1]} />
      </defs>
      <rect x="14" y="5" width="24" height="30" rx="3" fill={`url(#${id("a")})`} opacity="0.55" />
      <rect x="9" y="9" width="24" height="31" rx="3" fill={`url(#${id("a")})`} />
      {[16, 21, 26].map((y, i) => (
        <rect key={y} x="13" y={y} width={i === 2 ? 10 : 16} height="2" rx="1" fill="#8c9886" />
      ))}
      <path d="M36 25 c6 2 7 10 1 15 c-6 -4 -6 -11 -1 -15 z" fill={`url(#${id("b")})`} />
      <path d="M36.8 27 v12" stroke="#fff" strokeOpacity="0.6" strokeWidth="1" />
    </Frame>
  );
}

/** Chip with a sparkle. AI / LLM. */
export function AiIcon({ className, label }: IconProps) {
  const id = useIds();
  return (
    <Frame className={className} label={label}>
      <defs>
        <Grad id={id("a")} from={P.violet[0]} to={P.violet[1]} />
      </defs>
      {[16, 22, 28].map((v) => (
        <g key={v} stroke="#8e79d4" strokeWidth="2" strokeLinecap="round">
          <path d={`M${v} 6 v4 M${v} 34 v4 M6 ${v} h4 M34 ${v} h4`} />
        </g>
      ))}
      <rect x="10" y="10" width="24" height="24" rx="5" fill={`url(#${id("a")})`} />
      <rect x="14" y="14" width="16" height="16" rx="3" fill="#2a2347" />
      <path d="M22 16.5 l1.6 3.9 3.9 1.6 -3.9 1.6 -1.6 3.9 -1.6 -3.9 -3.9 -1.6 3.9 -1.6 z" fill="#e4fd97" />
      <circle cx="38" cy="10" r="4" fill="#e4fd97" />
      <path d="M38 7.8 v4.4 M35.8 10 h4.4" stroke="#2d3e2c" strokeWidth="1.3" strokeLinecap="round" />
    </Frame>
  );
}

/** Shield with a check. RBAC / security. */
export function ShieldIcon({ className, label }: IconProps) {
  const id = useIds();
  return (
    <Frame className={className} label={label}>
      <defs>
        <Grad id={id("a")} from={P.blue[0]} to={P.blue[1]} />
      </defs>
      <path d="M24 5 L39 10.5 V22 C39 31.5 32.5 38 24 41.5 C15.5 38 9 31.5 9 22 V10.5 Z" fill={`url(#${id("a")})`} />
      <path d="M24 8.5 L35.5 12.8 V22 C35.5 29.5 30.5 34.6 24 37.6 Z" fill="#fff" opacity="0.18" />
      <path d="M17 23 l5 5 9.5 -10" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

/** Three buildings, one per tenant. Multi-tenancy. */
export function TenantsIcon({ className, label }: IconProps) {
  const id = useIds();
  return (
    <Frame className={className} label={label}>
      <defs>
        <Grad id={id("a")} from={P.lime[0]} to={P.lime[1]} />
        <Grad id={id("b")} from={P.blue[0]} to={P.blue[1]} />
        <Grad id={id("c")} from={P.violet[0]} to={P.violet[1]} />
      </defs>
      <rect x="5" y="20" width="12" height="20" rx="2" fill={`url(#${id("b")})`} />
      <rect x="18" y="9" width="13" height="31" rx="2" fill={`url(#${id("a")})`} />
      <rect x="32" y="16" width="11" height="24" rx="2" fill={`url(#${id("c")})`} />
      {[13, 18, 23, 28, 33].map((y) => (
        <g key={y} fill="#fff" opacity="0.6">
          <rect x="21" y={y} width="2.5" height="2.5" rx="0.5" />
          <rect x="25.5" y={y} width="2.5" height="2.5" rx="0.5" />
        </g>
      ))}
      {[24, 29, 34].map((y) => (
        <rect key={y} x="9" y={y} width="4" height="2.5" rx="0.5" fill="#fff" opacity="0.55" />
      ))}
      {[20, 25, 30].map((y) => (
        <rect key={y} x="35.5" y={y} width="4" height="2.5" rx="0.5" fill="#fff" opacity="0.55" />
      ))}
    </Frame>
  );
}

/* ---------- Products ---------- */

/** Mortarboard with a check badge. EdTech / GoGrade / education. */
export function CapIcon({ className, label }: IconProps) {
  const id = useIds();
  return (
    <Frame className={className} label={label}>
      <defs>
        <Grad id={id("a")} from="#4a5a44" to="#1f2b1e" />
        <Grad id={id("b")} from={P.lime[0]} to={P.lime[1]} />
      </defs>
      <path d="M14 20 v9 c0 3 4.5 5.5 10 5.5 s10 -2.5 10 -5.5 v-9" fill="#3a4535" />
      <path d="M24 8 L44 17 L24 26 L4 17 Z" fill={`url(#${id("a")})`} />
      <path d="M24 17 L37 21.5 v8" stroke="#ffc97a" strokeWidth="1.6" fill="none" />
      <circle cx="37" cy="31" r="1.8" fill="#ffc97a" />
      <circle cx="36" cy="38" r="6" fill={`url(#${id("b")})`} />
      <path d="M33.3 38 l1.9 1.9 3.6 -3.8" stroke="#2d3e2c" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

/** Coupe side view. Asphalta / 3D studio. */
export function CarIcon({ className, label }: IconProps) {
  const id = useIds();
  return (
    <Frame className={className} label={label}>
      <defs>
        <Grad id={id("a")} from={P.rose[0]} to={P.rose[1]} />
      </defs>
      <path d="M4 32 L6 25 Q8 22 15 21 L20 14 Q22 12 26 12 L33 12 Q36 12 38 15 L41 21 Q45 22 45 26 L45 32 Z" fill={`url(#${id("a")})`} />
      <path d="M21.5 15.5 L25 14 H30.5 V21 H18 Z" fill={screen} opacity="0.85" />
      <path d="M32.5 14 H34 Q36 14.5 38 20.5 L32.5 21 Z" fill={screen} opacity="0.85" />
      <path d="M6 25 Q24 22 44 25" stroke="#fff" strokeOpacity="0.4" strokeWidth="1.2" fill="none" />
      {[13, 36].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="33" r="5.5" fill="#1b1b1b" />
          <circle cx={cx} cy="33" r="2.6" fill="#e4fd97" />
        </g>
      ))}
      <circle cx="27" cy="26.5" r="2.6" fill="#e4fd97" stroke="#2d3e2c" strokeWidth="0.8" />
    </Frame>
  );
}

/** Two speech bubbles with a sparkle. Chatbot. */
export function ChatIcon({ className, label }: IconProps) {
  const id = useIds();
  return (
    <Frame className={className} label={label}>
      <defs>
        <Grad id={id("a")} from={P.violet[0]} to={P.violet[1]} />
        <Grad id={id("b")} from={P.lime[0]} to={P.lime[1]} />
      </defs>
      <path d="M6 9 h24 a4 4 0 0 1 4 4 v12 a4 4 0 0 1 -4 4 h-14 l-6 5 v-5 h-4 a4 4 0 0 1 -4 -4 v-12 a4 4 0 0 1 4 -4 z" fill={`url(#${id("a")})`} />
      {[12, 18, 24].map((x) => (
        <circle key={x} cx={x} cy="19" r="1.8" fill="#fff" opacity="0.85" />
      ))}
      <path d="M26 24 h14 a3.5 3.5 0 0 1 3.5 3.5 v8 a3.5 3.5 0 0 1 -3.5 3.5 h-2 v4 l-5 -4 h-7 a3.5 3.5 0 0 1 -3.5 -3.5 v-8 a3.5 3.5 0 0 1 3.5 -3.5 z" fill={`url(#${id("b")})`} />
      <path d="M33 27.5 l1 2.4 2.4 1 -2.4 1 -1 2.4 -1 -2.4 -2.4 -1 2.4 -1 z" fill="#2d3e2c" />
    </Frame>
  );
}

/** Heart with an ECG line. Healthcare. */
export function HeartIcon({ className, label }: IconProps) {
  const id = useIds();
  return (
    <Frame className={className} label={label}>
      <defs>
        <Grad id={id("a")} from={P.rose[0]} to={P.rose[1]} />
      </defs>
      <path d="M24 40 C10 30 5 23 5 16 C5 10 9.5 6 15 6 C19 6 22 8 24 11 C26 8 29 6 33 6 C38.5 6 43 10 43 16 C43 23 38 30 24 40 Z" fill={`url(#${id("a")})`} />
      <path d="M8 21 h8 l2.5 -5 4 11 3.5 -8 2 2 h12" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

/* ---------- People / contact ---------- */

/** Briefcase with a star badge. Role / experience. */
export function RoleIcon({ className, label }: IconProps) {
  const id = useIds();
  return (
    <Frame className={className} label={label}>
      <defs>
        <Grad id={id("a")} from={P.green[0]} to={P.green[1]} />
        <Grad id={id("b")} from={P.amber[0]} to={P.amber[1]} />
      </defs>
      <path d="M18 14 v-3 a2 2 0 0 1 2 -2 h8 a2 2 0 0 1 2 2 v3" fill="none" stroke="#5f9a57" strokeWidth="2.4" />
      <rect x="7" y="14" width="34" height="24" rx="4" fill={`url(#${id("a")})`} />
      <path d="M7 23 h34" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.4" />
      <rect x="21" y="20.5" width="6" height="5" rx="1.2" fill="#fff" opacity="0.85" />
      <circle cx="37" cy="36" r="7" fill={`url(#${id("b")})`} />
      <path d="M37 32.2 l1.2 2.5 2.7 .3 -2 1.8 .6 2.6 -2.5 -1.4 -2.5 1.4 .6 -2.6 -2 -1.8 2.7 -.3 z" fill="#fff" />
    </Frame>
  );
}

/** Calendar with a streak. Years of experience. */
export function CalendarIcon({ className, label }: IconProps) {
  const id = useIds();
  return (
    <Frame className={className} label={label}>
      <defs>
        <Grad id={id("a")} from={P.stone[0]} to={P.stone[1]} />
        <Grad id={id("b")} from={P.lime[0]} to={P.lime[1]} />
      </defs>
      <rect x="6" y="9" width="36" height="31" rx="4" fill={`url(#${id("a")})`} />
      <path d="M6 13 a4 4 0 0 1 4 -4 h28 a4 4 0 0 1 4 4 v4 h-36 z" fill={`url(#${id("b")})`} />
      <path d="M15 6 v6 M33 6 v6" stroke="#5f6b58" strokeWidth="2.4" strokeLinecap="round" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={10 + (i % 3) * 10} y={21 + Math.floor(i / 3) * 8} width="7" height="5" rx="1.2" fill={i < 5 ? "#9cc43f" : "#c9cfbf"} opacity={0.45 + i * 0.1} />
      ))}
    </Frame>
  );
}

/** Rocket. Shipped products. */
export function RocketIcon({ className, label }: IconProps) {
  const id = useIds();
  return (
    <Frame className={className} label={label}>
      <defs>
        <Grad id={id("a")} from={P.stone[0]} to={P.stone[1]} />
        <Grad id={id("b")} from={P.amber[0]} to={P.amber[1]} />
      </defs>
      <path d="M24 4 C31 9 33 18 31 28 H17 C15 18 17 9 24 4 Z" fill={`url(#${id("a")})`} />
      <circle cx="24" cy="16" r="3.6" fill={P.blue[1]} stroke="#fff" strokeWidth="1.4" />
      <path d="M17 22 L11 30 L17 29 Z M31 22 L37 30 L31 29 Z" fill="#9cc43f" />
      <path d="M19.5 30 C20 35 22 38 24 41 C26 38 28 35 28.5 30 Z" fill={`url(#${id("b")})`} />
    </Frame>
  );
}

/** Envelope with a notification dot. */
export function MailIcon({ className, label }: IconProps) {
  const id = useIds();
  return (
    <Frame className={className} label={label}>
      <defs>
        <Grad id={id("a")} from={P.stone[0]} to={P.stone[1]} />
      </defs>
      <rect x="5" y="11" width="36" height="26" rx="4" fill={`url(#${id("a")})`} />
      <path d="M7 14 L23 26 L39 14" stroke="#8c9886" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <circle cx="39" cy="12" r="5.5" fill="#9cc43f" stroke="#fff" strokeWidth="1.5" />
    </Frame>
  );
}

/** Phone handset in a bubble. */
export function PhoneIcon({ className, label }: IconProps) {
  const id = useIds();
  return (
    <Frame className={className} label={label}>
      <defs>
        <Grad id={id("a")} from={P.mint[0]} to={P.mint[1]} />
      </defs>
      <rect x="13" y="4" width="22" height="37" rx="5" fill={`url(#${id("a")})`} />
      <rect x="16" y="9" width="16" height="24" rx="1.5" fill={screen} />
      <circle cx="24" cy="37" r="1.6" fill="#fff" opacity="0.8" />
      <path d="M20 15 h8 M20 19 h6" stroke="#e4fd97" strokeWidth="1.6" strokeLinecap="round" />
    </Frame>
  );
}

/** Map pin. */
export function PinIcon({ className, label }: IconProps) {
  const id = useIds();
  return (
    <Frame className={className} label={label}>
      <defs>
        <Grad id={id("a")} from={P.rose[0]} to={P.rose[1]} />
      </defs>
      <ellipse cx="24" cy="38" rx="11" ry="3.5" fill="#9cc43f" opacity="0.45" />
      <path d="M24 39 C15 29 11 23 11 17 C11 9.8 16.8 4 24 4 C31.2 4 37 9.8 37 17 C37 23 33 29 24 39 Z" fill={`url(#${id("a")})`} />
      <circle cx="24" cy="17" r="5" fill="#fff" />
    </Frame>
  );
}

/** Resume page with a PDF badge. */
export function ResumeIcon({ className, label }: IconProps) {
  const id = useIds();
  return (
    <Frame className={className} label={label}>
      <defs>
        <Grad id={id("a")} from="#ffffff" to={P.stone[1]} />
        <Grad id={id("b")} from={P.rose[0]} to={P.rose[1]} />
      </defs>
      <path d="M9 5 h20 l9 9 v26 a3 3 0 0 1 -3 3 h-26 a3 3 0 0 1 -3 -3 v-32 a3 3 0 0 1 3 -3 z" fill={`url(#${id("a")})`} />
      <path d="M29 5 v9 h9" fill="#d8ddd0" />
      <rect x="11" y="10" width="7" height="7" rx="1.5" fill="#9cc43f" />
      {[21, 26, 31].map((y, i) => (
        <rect key={y} x="11" y={y} width={i === 2 ? 12 : 20} height="2" rx="1" fill="#a3ab98" />
      ))}
      <rect x="26" y="31" width="16" height="9" rx="2.5" fill={`url(#${id("b")})`} />
      <text x="34" y="37.8" textAnchor="middle" fontSize="6" fontWeight="700" fill="#fff" fontFamily="sans-serif">
        PDF
      </text>
    </Frame>
  );
}
