"use client";

import type { PointerEvent } from "react";
import { BrandMark } from "@/components/brand-mark";

const nodes = [
  ["left-[23%] top-[35%]", "Agent session"],
  ["left-[23%] top-[65%]", "CLI request"],
  ["right-[23%] top-[30%]", "ClickHouse"],
  ["right-[23%] top-[50%]", "Elasticsearch"],
  ["right-[23%] top-[70%]", "Internal API"],
] as const;

export function GatewayHeroVisual() {
  function updatePointer(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    event.currentTarget.style.setProperty("--pointer-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${y * 100}%`);
  }

  function resetPointer(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--pointer-x", "50%");
    event.currentTarget.style.setProperty("--pointer-y", "50%");
  }

  return (
    <div
      className="bytehop-hero-visual relative min-h-[420px] overflow-hidden border-y border-[#eaeaea] bg-[#f7f7f7] lg:min-h-0 lg:border-x lg:border-y-0"
      onPointerMove={updatePointer}
      onPointerLeave={resetPointer}
    >
      <div className="bytehop-pointer-glow absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,.14),transparent_56%)]" />
      <div className="absolute inset-x-[12%] top-1/2 h-px bg-[#cfcfcf]" />
      <div className="absolute inset-y-[18%] left-1/2 w-px bg-[#d8d8d8]" />

      <div className="bytehop-flow-stage absolute left-1/2 top-1/2 h-[180px] w-[240px]">
        <svg
          aria-hidden="true"
          className="absolute inset-0 size-full"
          viewBox="0 0 240 180"
          fill="none"
        >
          <path
            className="bytehop-flow-curve"
            d="M0 90C50 135 87 123 120 90C153 57 190 45 240 90"
          />
        </svg>
        <span
          className="bytehop-flow-packet bytehop-flow-packet-in"
          aria-hidden="true"
        />
        <span
          className="bytehop-flow-packet bytehop-flow-packet-center"
          aria-hidden="true"
        />
        <span
          className="bytehop-flow-packet bytehop-flow-packet-out"
          aria-hidden="true"
        />
        <span className="bytehop-hole-ripple" aria-hidden="true" />
        <span
          className="bytehop-hole-ripple bytehop-hole-ripple-secondary"
          aria-hidden="true"
        />
        <div className="bytehop-gateway-core absolute left-1/2 top-1/2 size-20 bg-[#171717] shadow-[0_28px_80px_rgba(0,0,0,.18)]" />
        <BrandMark className="bytehop-gateway-glyph absolute left-1/2 top-1/2 size-11 text-white" />
        <div className="bytehop-flow-label bytehop-flow-label-agents absolute left-0 top-1/2 bg-[#f7f7f7] px-3 font-mono text-[10px] uppercase tracking-[.16em] text-[#737373]">
          Agents
        </div>
        <div className="bytehop-flow-label bytehop-flow-label-resources absolute left-full top-1/2 bg-[#f7f7f7] px-3 font-mono text-[10px] uppercase tracking-[.16em] text-[#737373]">
          Resources
        </div>
      </div>

      {nodes.map(([position, label], index) => (
        <span
          key={position}
          title={label}
          className={`bytehop-resource-node absolute size-2 -translate-x-1/2 -translate-y-1/2 ${
            index === 3 ? "bg-[#e5484d]" : "bg-[#737373]"
          } ${position}`}
          style={{ animationDelay: `${index * 420}ms` }}
        />
      ))}

      <div className="absolute inset-x-8 bottom-8 flex items-center justify-between border-t border-[#d8d8d8] pt-4 font-mono text-[10px] uppercase tracking-[.12em] text-[#737373]">
        <span>Identity + Lease</span>
        <span className="inline-flex items-center gap-2">
          <span className="bytehop-live-dot size-1.5 bg-[#e5484d]" />
          Request + Event
        </span>
      </div>
    </div>
  );
}
