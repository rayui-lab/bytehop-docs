import {
  ArrowRight,
  Clock3,
  Database,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative flex-1 overflow-hidden">
      <div className="bytehop-grid pointer-events-none absolute inset-x-0 top-0 h-[44rem]" />
      <section className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-20 md:grid-cols-[1.12fr_.88fr] md:items-center md:pb-24 md:pt-28">
        <div>
          <p className="mb-5 inline-flex items-center rounded-full border bg-fd-background/80 px-3 py-1 text-xs font-medium text-fd-muted-foreground backdrop-blur">
            Self-hosted · HTTP-first · v0.1
          </p>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-5xl md:text-6xl">
            AI Agent 的<span className="text-fd-primary">生产资源访问层</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-fd-muted-foreground sm:text-lg">
            ByteHop 将生产凭证集中保留在服务端，以短期、可撤销、绑定单一
            Resource 的 Lease，统一 ClickHouse、Elasticsearch 与内部 API
            的访问边界。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/docs/quickstart"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-fd-primary px-4 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
            >
              开始使用 <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/docs/overview"
              className="inline-flex h-10 items-center rounded-lg border bg-fd-background px-4 text-sm font-medium text-fd-foreground hover:bg-fd-accent"
            >
              先看边界
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border bg-fd-card/90 p-5 shadow-[0_20px_70px_-45px_rgba(8,125,118,.65)] backdrop-blur sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-medium">一次查询发生了什么</span>
            <span className="rounded-md border px-2 py-1 font-mono text-[11px] text-fd-muted-foreground">
              TTL 15m
            </span>
          </div>
          <ol className="space-y-1" aria-label="ByteHop 请求流程">
            {[
              ["1", "Agent 登录并发现资源", "只看到允许访问的能力"],
              ["2", "申请 analytics Lease", "短期、绑定单一资源"],
              ["3", "请求经过 ByteHop", "注入服务端只读凭证"],
              ["4", "返回结果并写入 Event", "真实凭证从不下发"],
            ].map(([step, title, note], index) => (
              <li
                key={step}
                className="relative grid grid-cols-[2rem_1fr] gap-3 pb-4 last:pb-0"
              >
                {index < 3 ? (
                  <span className="absolute bottom-0 left-[.94rem] top-8 w-px bg-fd-border" />
                ) : null}
                <span className="grid size-8 place-items-center rounded-full border bg-fd-background font-mono text-xs text-fd-primary">
                  {step}
                </span>
                <div className="pt-0.5">
                  <p className="text-sm font-medium text-fd-foreground">
                    {title}
                  </p>
                  <p className="mt-0.5 text-xs leading-5 text-fd-muted-foreground">
                    {note}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y bg-fd-card/40">
        <div className="mx-auto grid max-w-6xl divide-y px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {[
            [TerminalSquare, "Agent 友好", "CLI 与稳定 JSON 输出"],
            [ShieldCheck, "凭证不落地", "上游身份只在网关内"],
            [Clock3, "Lease-first", "到期、撤销、资源隔离"],
            [Database, "HTTP 数据面", "数据库与内部 API 共用"],
          ].map(([Icon, title, note]) => {
            const ItemIcon = Icon as typeof TerminalSquare;
            return (
              <div
                key={title as string}
                className="py-6 sm:px-6 first:pl-0 last:pr-0"
              >
                <ItemIcon className="mb-3 size-5 text-fd-primary" />
                <p className="text-sm font-medium">{title as string}</p>
                <p className="mt-1 text-sm text-fd-muted-foreground">
                  {note as string}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-2 md:py-24">
        <div className="rounded-xl border p-6">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-fd-primary">
            适合
          </p>
          <h2 className="mt-3 text-xl font-semibold">
            已有只读账号，但不想散发给每台电脑
          </h2>
          <p className="mt-3 text-sm leading-6 text-fd-muted-foreground">
            小团队需要让 Codex、Claude
            或脚本查线上数据，同时希望身份、有效期、资源范围和操作记录集中可见。
          </p>
        </div>
        <div className="rounded-xl border p-6">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-fd-muted-foreground">
            不适合
          </p>
          <h2 className="mt-3 text-xl font-semibold">
            需要完整 PAM 或原生数据库协议
          </h2>
          <p className="mt-3 text-sm leading-6 text-fd-muted-foreground">
            如果必须接管 SSH、Kubernetes、RDP，或让原生 MongoDB / PostgreSQL
            客户端透明连接，应优先评估更完整的访问平台。
          </p>
        </div>
      </section>
    </main>
  );
}
