"use client";

import { Bot, Check, Copy, FileCheck2, RefreshCw } from "lucide-react";
import type { CSSProperties } from "react";
import { useState } from "react";

type HighlightedToken = {
  id: string;
  content: string;
  color?: string;
  backgroundColor?: string;
  fontStyle?: number;
};

export type HighlightedYaml = {
  background?: string;
  foreground?: string;
  lines: Array<{
    id: string;
    tokens: HighlightedToken[];
    newline: boolean;
  }>;
};

export type ResourceConfigDemoItem = {
  id: "clickhouse" | "elasticsearch" | "mongodb" | "http";
  label: string;
  prompt: string;
  highlightedYaml: HighlightedYaml;
};

const applySteps = [
  [FileCheck2, "检查配置", "bytehop config check"],
  [Check, "预览差异", "bytehop config diff"],
  [RefreshCw, "热更新", "bytehop config reload"],
] as const;

function getTokenStyle(token: HighlightedToken): CSSProperties {
  const fontStyle = token.fontStyle ?? 0;
  const decorations = [
    fontStyle & 4 ? "underline" : "",
    fontStyle & 8 ? "line-through" : "",
  ].filter(Boolean);

  return {
    color: token.color,
    backgroundColor: token.backgroundColor,
    fontStyle: fontStyle & 1 ? "italic" : undefined,
    fontWeight: fontStyle & 2 ? 600 : undefined,
    textDecoration: decorations.length > 0 ? decorations.join(" ") : undefined,
  };
}

export function ResourceConfigDemoClient({
  demos,
}: {
  demos: ResourceConfigDemoItem[];
}) {
  const [activeId, setActiveId] =
    useState<ResourceConfigDemoItem["id"]>("clickhouse");
  const [copied, setCopied] = useState(false);
  const active = demos.find((demo) => demo.id === activeId) ?? demos[0];

  async function copyPrompt() {
    await navigator.clipboard.writeText(active.prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="min-w-0 overflow-hidden border border-[#d9d9d9] bg-white">
      <div
        className="grid grid-cols-2 border-b border-[#d9d9d9] lg:grid-cols-4"
        role="tablist"
        aria-label="Resource 配置示例"
      >
        {demos.map((demo) => {
          const selected = demo.id === activeId;
          return (
            <button
              key={demo.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="resource-config-panel"
              onClick={() => {
                setActiveId(demo.id);
                setCopied(false);
              }}
              className={`bytehop-control relative min-h-12 border-r border-b border-[#e5e5e5] px-4 text-left text-xs font-medium transition-colors last:border-r-0 lg:border-b-0 ${
                selected
                  ? "bg-[#171717] text-white"
                  : "bg-white text-[#666] hover:bg-[#f5f5f5] hover:text-[#171717]"
              }`}
            >
              {selected && (
                <span
                  className="absolute inset-x-0 top-0 h-0.5 bg-[#e5484d]"
                  aria-hidden="true"
                />
              )}
              {demo.label}
            </button>
          );
        })}
      </div>

      <div
        key={active.id}
        id="resource-config-panel"
        role="tabpanel"
        className="bytehop-panel-enter grid min-w-0 lg:grid-cols-[.76fr_1.24fr]"
      >
        <div className="flex min-w-0 flex-col border-b border-[#d9d9d9] p-6 sm:p-8 lg:border-r lg:border-b-0">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.15em] text-[#737373]">
            <span className="size-1.5 bg-[#e5484d]" aria-hidden="true" />
            Tell your AI
          </div>
          <p className="mt-6 text-base leading-7 text-[#262626]">
            “{active.prompt}”
          </p>
          <button
            type="button"
            onClick={copyPrompt}
            className="bytehop-control mt-8 inline-flex h-10 w-fit items-center gap-2 border border-[#d4d4d4] px-3 text-xs font-medium transition-colors hover:border-[#171717]"
          >
            {copied ? (
              <Check className="size-3.5" />
            ) : (
              <Copy className="size-3.5" />
            )}
            {copied ? "已复制" : "复制给 AI"}
          </button>
        </div>

        <div className="min-w-0 bg-white">
          <div className="flex h-11 items-center justify-between border-b border-[#e5e5e5] px-4 font-mono text-[10px] uppercase tracking-[.12em] text-[#737373]">
            <span>bytehop.yaml</span>
            <span className="inline-flex items-center gap-2">
              <Bot className="size-3.5" /> AI generated
            </span>
          </div>
          <div className="resource-config-code min-w-0 overflow-x-auto">
            <pre
              className="shiki github-light"
              style={{
                backgroundColor: active.highlightedYaml.background,
                color: active.highlightedYaml.foreground,
              }}
            >
              <code>
                {active.highlightedYaml.lines.map((line) => (
                  <span className="line" key={line.id}>
                    {line.tokens.map((token) => (
                      <span key={token.id} style={getTokenStyle(token)}>
                        {token.content}
                      </span>
                    ))}
                    {line.newline ? "\n" : null}
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <div className="grid border-t border-[#d9d9d9] sm:grid-cols-3">
        {applySteps.map(([Icon, label, command]) => (
          <div
            key={command}
            className="flex min-w-0 items-start gap-3 border-b border-r border-[#e5e5e5] p-4 last:border-r-0 sm:border-b-0"
          >
            <Icon className="mt-0.5 size-4 shrink-0 text-[#e5484d]" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#262626]">{label}</p>
              <code className="mt-1 block break-all text-[11px] text-[#737373]">
                {command}
              </code>
            </div>
          </div>
        ))}
      </div>

      <span className="sr-only" aria-live="polite">
        {copied ? "提示词已复制" : ""}
      </span>
    </div>
  );
}
