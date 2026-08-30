"use client";

import { Bot, Check, Copy, Terminal } from "lucide-react";
import { useState } from "react";

const installCommand = `# Client：连接团队已有的 ByteHop Server
# 1. 安装必需的 CLI
curl -fsSL https://raw.githubusercontent.com/rayui-lab/bytehop-dist/main/install.sh | sh
bytehop version

# 2. 可选：让 Codex 理解 ByteHop（Claude 改为 --agent claude）
curl -fsSL https://github.com/rayui-lab/bytehop-dist/releases/latest/download/install-skill.sh | sh -s -- --agent codex`;

const agentInstallPrompt = `这是 ByteHop Client 安装任务，不要部署 ByteHop Server。

请先阅读：
https://rayui-lab.github.io/bytehop-docs/docs/using/client-installation/

先确认我已经从管理员处拿到 ByteHop Server 地址和用户名；如果没有，停下来告诉我需要向管理员索取什么。检查操作系统、CPU 架构和当前 Agent，安装 ByteHop CLI，并只为当前 Agent 安装 ByteHop Skill。不要部署 Server，不要索要或输入密码，也不要修改其他 Agent。完成后运行 bytehop version，检查 Skill 已就位，并告诉我如何在可信终端登录以及是否需要重新打开 Agent 会话。`;

type InstallMode = "agent" | "manual";

export function InstallCommand() {
  const [mode, setMode] = useState<InstallMode>("agent");
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    await navigator.clipboard.writeText(
      mode === "agent" ? agentInstallPrompt : installCommand,
    );
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="min-w-0 overflow-hidden border border-[#333] bg-[#111]">
      <div
        className="flex items-center border-b border-[#333]"
        role="tablist"
        aria-label="安装方式"
      >
        <button
          type="button"
          role="tab"
          id="install-tab-agent"
          aria-controls="install-panel"
          aria-selected={mode === "agent"}
          onClick={() => {
            setMode("agent");
            setCopied(false);
          }}
          className={`bytehop-control inline-flex h-11 items-center gap-2 border-r border-[#333] px-4 text-sm font-medium transition-colors ${
            mode === "agent"
              ? "bg-white text-[#171717]"
              : "text-[#888] hover:bg-[#1a1a1a] hover:text-white"
          }`}
        >
          <Bot className="size-4" />
          交给 AI 安装 Client
        </button>
        <button
          type="button"
          role="tab"
          id="install-tab-manual"
          aria-controls="install-panel"
          aria-selected={mode === "manual"}
          onClick={() => {
            setMode("manual");
            setCopied(false);
          }}
          className={`bytehop-control inline-flex h-11 items-center gap-2 border-r border-[#333] px-4 text-sm font-medium transition-colors ${
            mode === "manual"
              ? "bg-white text-[#171717]"
              : "text-[#888] hover:bg-[#1a1a1a] hover:text-white"
          }`}
        >
          <Terminal className="size-4" />
          手动安装 Client
        </button>
      </div>

      <div
        key={mode}
        id="install-panel"
        role="tabpanel"
        aria-labelledby={
          mode === "agent" ? "install-tab-agent" : "install-tab-manual"
        }
        className="bytehop-panel-enter grid min-h-32 min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 p-5 sm:p-6"
      >
        {mode === "manual" && (
          <span
            className="mt-0.5 select-none font-mono text-sm text-white"
            aria-hidden="true"
          >
            $
          </span>
        )}
        <pre
          className={`min-w-0 overflow-hidden font-mono text-[13px] leading-6 text-[#d4d4d4] sm:text-sm ${
            mode === "agent"
              ? "whitespace-pre-wrap break-words"
              : "whitespace-pre-wrap break-all [overflow-wrap:anywhere]"
          }`}
        >
          {mode === "agent" ? agentInstallPrompt : installCommand}
        </pre>
        <button
          type="button"
          onClick={copyCommand}
          className="bytehop-control grid size-9 shrink-0 place-items-center border border-[#333] text-[#888] transition-colors hover:border-[#666] hover:text-white"
          aria-label={copied ? "内容已复制" : "复制当前内容"}
        >
          {copied ? (
            <Check className="size-4 text-white" />
          ) : (
            <Copy className="size-4" />
          )}
        </button>
      </div>

      <span className="sr-only" aria-live="polite">
        {copied ? "内容已复制" : ""}
      </span>
    </div>
  );
}
