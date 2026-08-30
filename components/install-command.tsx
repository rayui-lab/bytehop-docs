"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

const installCommand =
  "curl -fsSL https://raw.githubusercontent.com/rayui-lab/bytehop-dist/main/install.sh | sh";

export function InstallCommand() {
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="group flex min-w-0 items-center rounded-xl border border-white/10 bg-[#0b1110] p-1.5 shadow-[0_22px_65px_-35px_rgba(5,65,57,.75)]">
      <span
        className="ml-3 select-none font-mono text-sm text-emerald-400"
        aria-hidden="true"
      >
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap px-3 py-2 font-mono text-[13px] text-zinc-200 [scrollbar-width:none] sm:text-sm">
        {installCommand}
      </code>
      <button
        type="button"
        onClick={copyCommand}
        className="grid size-9 shrink-0 place-items-center rounded-lg text-zinc-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
        aria-label={copied ? "安装命令已复制" : "复制安装命令"}
      >
        {copied ? (
          <Check className="size-4 text-emerald-400" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "安装命令已复制" : ""}
      </span>
    </div>
  );
}
