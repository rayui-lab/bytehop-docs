import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Database,
  ExternalLink,
  KeyRound,
  Radio,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { InstallCommand } from "@/components/install-command";

const requestSteps = [
  ["01", "发现", "Agent 只看到当前用户获准使用的 Resource"],
  ["02", "领取", "为单一 Resource 创建短期 Lease"],
  ["03", "调用", "ByteHop 在服务端注入上游身份"],
  ["04", "留痕", "结果返回 Agent，请求写入 Event"],
] as const;

export default function HomePage() {
  return (
    <main className="relative flex-1 overflow-hidden">
      <div className="bytehop-grid pointer-events-none absolute inset-x-0 top-0 h-[52rem]" />
      <div className="bytehop-glow pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[64rem] -translate-x-1/2" />

      <section className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-20 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-20 lg:pb-28 lg:pt-28">
        <div className="max-w-3xl">
          <div className="mb-7 flex flex-wrap items-center gap-3 text-xs font-medium text-fd-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border bg-fd-background/75 px-3 py-1.5 backdrop-blur">
              <span className="size-1.5 rounded-full bg-fd-primary shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-fd-primary)_14%,transparent)]" />
              Open source · Self-hosted
            </span>
            <span>HTTP-first · v0.1</span>
          </div>

          <h1 className="text-[2.7rem] font-semibold leading-[1.08] tracking-[-0.048em] text-fd-foreground sm:text-6xl lg:text-[4.25rem]">
            <span className="inline-block">AI Agent 的</span>{" "}
            <span className="inline-block text-fd-primary">生产访问网关。</span>
          </h1>

          <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-fd-muted-foreground sm:text-lg sm:leading-8">
            把 ClickHouse、Elasticsearch 和内部 API 接到一个自托管入口。
            ByteHop 按用户授予短期访问，真实凭证始终留在服务端。
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="#install"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-fd-primary px-5 text-sm font-semibold text-fd-primary-foreground shadow-[0_12px_30px_-16px_color-mix(in_oklab,var(--color-fd-primary)_80%,transparent)] transition-transform hover:-translate-y-0.5"
            >
              安装 ByteHop <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/docs/overview"
              className="inline-flex h-11 items-center rounded-lg border bg-fd-background/70 px-5 text-sm font-medium text-fd-foreground backdrop-blur hover:bg-fd-accent"
            >
              先了解工作方式
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-fd-muted-foreground sm:text-sm">
            {["凭证留在服务端", "短期访问自动失效", "请求全程留痕"].map(
              (item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-fd-primary" />
                  {item}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-fd-primary/8 blur-3xl" />
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a100f] shadow-[0_35px_90px_-45px_rgba(2,45,40,.9)]">
            <div className="flex h-11 items-center justify-between border-b border-white/8 px-4">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-zinc-700" />
                <span className="size-2.5 rounded-full bg-zinc-700" />
                <span className="size-2.5 rounded-full bg-zinc-700" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                agent session
              </span>
            </div>
            <div className="space-y-5 p-5 font-mono text-[12px] leading-6 sm:p-7 sm:text-[13px]">
              <div>
                <p className="text-zinc-500"># Agent 发现当前可用资源</p>
                <p className="mt-1 text-zinc-200">
                  <span className="text-emerald-400">$</span> bytehop resources
                  --json
                </p>
                <p className="mt-1 text-zinc-400">
                  analytics&nbsp;&nbsp; clickhouse-http&nbsp;&nbsp; ready
                </p>
              </div>
              <div>
                <p className="text-zinc-500"># 请求短期访问并执行查询</p>
                <p className="mt-1 text-zinc-200">
                  <span className="text-emerald-400">$</span> bytehop request
                  analytics POST /
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-3">
                  <span className="rounded-md border border-white/8 bg-white/[.03] px-2.5 py-1 text-zinc-400">
                    lease&nbsp; 15m
                  </span>
                  <span className="rounded-md border border-white/8 bg-white/[.03] px-2.5 py-1 text-zinc-400">
                    policy&nbsp; allow
                  </span>
                  <span className="col-span-2 rounded-md border border-emerald-400/20 bg-emerald-400/8 px-2.5 py-1 text-emerald-300 sm:col-span-1">
                    status&nbsp; 200
                  </span>
                </div>
              </div>
              <div className="border-t border-white/8 pt-4 text-zinc-500">
                credential: retained server-side · event: recorded
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="install"
        className="relative border-y bg-fd-card/55 scroll-mt-20"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[.7fr_1.3fr] lg:items-center lg:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-fd-primary">
              Quick install
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              一条命令，先把 CLI 装好
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-fd-muted-foreground">
              安装器会识别 macOS / Linux 与 CPU 架构，下载公开
              Release，并在安装前核对 SHA-256。
            </p>
          </div>
          <div>
            <InstallCommand />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-1 text-xs text-fd-muted-foreground">
              <span>macOS · Linux · amd64 · arm64</span>
              <a
                href="https://github.com/rayui-lab/bytehop-dist/releases/latest"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-fd-foreground hover:text-fd-primary"
              >
                Windows 与全部下载 <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-fd-primary">
              One path
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
              Agent 只走一条稳定路径
            </h2>
            <p className="mt-4 text-sm leading-7 text-fd-muted-foreground sm:text-base">
              不为每个 Agent 复制数据库地址、密码和使用说明。Resource
              定义能力，Policy 决定谁能用，Lease 控制这一次访问。
            </p>
          </div>

          <ol className="grid gap-px overflow-hidden rounded-2xl border bg-fd-border sm:grid-cols-2">
            {requestSteps.map(([step, title, note]) => (
              <li key={step} className="bg-fd-background p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-fd-muted-foreground">
                    {step}
                  </span>
                  <Radio className="size-4 text-fd-primary" />
                </div>
                <h3 className="mt-8 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                  {note}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y bg-fd-card/40">
        <div className="mx-auto grid max-w-7xl divide-y px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {[
            [
              KeyRound,
              "凭证留在服务端",
              "Agent 与成员机器只持有 ByteHop Session",
            ],
            [Clock3, "访问默认是临时的", "Lease 绑定用户、Resource 与过期时间"],
            [ShieldCheck, "权限集中定义", "按用户组控制可见资源与最大租期"],
            [
              Database,
              "统一 HTTP 数据面",
              "ClickHouse、Elasticsearch 与内部 API",
            ],
          ].map(([Icon, title, note]) => {
            const ItemIcon = Icon as LucideIcon;
            return (
              <div
                key={title as string}
                className="py-7 sm:px-6 first:pl-0 last:pr-0"
              >
                <ItemIcon className="mb-4 size-5 text-fd-primary" />
                <p className="text-sm font-semibold">{title as string}</p>
                <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                  {note as string}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-28">
        <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          先接入一个只读 Resource，跑通真实查询
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-7 text-fd-muted-foreground sm:text-base">
          不需要替换现有数据库权限体系。先使用数据库侧已限制好的只读账号，再由
          ByteHop 统一登录、Lease、调用与记录。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/docs/quickstart"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-fd-primary px-5 text-sm font-semibold text-fd-primary-foreground"
          >
            第一次使用 <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/docs/administration/docker"
            className="inline-flex h-11 items-center gap-2 rounded-lg border px-5 text-sm font-medium hover:bg-fd-accent"
          >
            Docker 部署
          </Link>
        </div>
      </section>
    </main>
  );
}
