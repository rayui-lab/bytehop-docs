import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Database,
  ExternalLink,
  KeyRound,
  Radio,
  Server,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { GatewayHeroVisual } from "@/components/gateway-hero-visual";
import { HeroPrincipleCarousel } from "@/components/hero-principle-carousel";
import { HomeMotion } from "@/components/home-motion";
import { InstallCommand } from "@/components/install-command";
import { ResourceConfigDemo } from "@/components/resource-config-demo";
import { RunningQueryVisual } from "@/components/running-query-visual";
import { TechnologyMark } from "@/components/technology-mark";

const connectors = [
  ["clickhouse", "ClickHouse", "HTTP", "/docs/resources/clickhouse"],
  [
    "elasticsearch",
    "Elasticsearch",
    "REST API",
    "/docs/resources/elasticsearch",
  ],
  [
    "mongodb",
    "MongoDB",
    "HTTP Bridge",
    "/docs/resources/http-bridge#用-bridge-接入-mongodb",
  ],
  [
    "http",
    "HTTP API",
    "Internal services",
    "/docs/resources/http-bridge#接入已有内部-api",
  ],
] as const;

const requestSteps = [
  ["01", "发现", "Skill 先让 Agent 发现当前身份可以使用的 Resource。"],
  ["02", "领取", "为当前任务申请绑定 Resource 的短期 Lease。"],
  ["03", "调用", "Skill 按实时 contract 选择 request 或 connect。"],
  ["04", "留痕", "响应返回 Agent，同时写入可查询的 Event。"],
] as const;

const skillStages = [
  {
    step: "01",
    title: "准备 Client",
    note: "先获得 Server 地址和账号，再安装 CLI；Agent 场景额外安装 Skill。",
    example: "Server → CLI → Skill",
    href: "/docs/using/client-installation",
  },
  {
    step: "02",
    title: "管理员配置",
    note: "在有 Server 配置权限的环境中，Agent 修改 YAML 并调用 CLI 校验。",
    example: "描述资源 → bytehop.yaml",
    href: "/docs/using/agent-workflow#配置模式",
  },
  {
    step: "03",
    title: "调用",
    note: "直接描述数据任务，Agent 自动发现 Resource、读取 contract 并执行。",
    example: "描述任务 → request_id",
    href: "/docs/using/agent-workflow#调用模式",
  },
  {
    step: "04",
    title: "更新",
    note: "Skill 随 ByteHop Release 发布；重新运行安装器即可切换到相同版本。",
    example: "Release → bytehop.skill",
    href: "/docs/using/agent-workflow#更新-bytehop-skill",
  },
] as const;

const capabilities = [
  [
    KeyRound,
    "凭证集中保管",
    "数据库密码、Cookie 和 API Key 不进入 Agent 上下文。",
  ],
  [
    Clock3,
    "访问自动到期",
    "Lease 绑定用户、Resource 和过期时间，不形成长期权限。",
  ],
  [
    ShieldCheck,
    "权限按账号分配",
    "用户或用户组绑定 Resource；未授权者在资源列表中不可见，也不能调用。",
  ],
  [
    Database,
    "不绑定 Agent 协议",
    "CLI、curl、脚本与 Agent 使用同一 HTTP 数据面，不要求接入 MCP。",
  ],
] as const;

const operationFeatures = [
  [
    "01",
    "实时可见",
    "成员只看自己的 Operation，管理员查看当前实例全部；ClickHouse SQL 每 3 秒刷新。",
  ],
  [
    "02",
    "单独停止",
    "所有 Operation 先取消本地请求；ClickHouse 再尝试 KILL QUERY，Lease 保持可用。",
  ],
  [
    "03",
    "完成后留痕",
    "运行列表随请求结束而消失；Event 保留 request_id，以及 ClickHouse 的 query_id 与有界 SQL。",
  ],
] as const;

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.16em] text-[#737373]">
      <span className="size-1.5 bg-[#e5484d]" aria-hidden="true" />
      {children}
    </p>
  );
}

export default function HomePage() {
  return (
    <main className="flex-1 bg-[#fafafa] text-[#171717]">
      <HomeMotion />

      <section className="border-b border-[#eaeaea] bg-white">
        <div className="mx-auto max-w-[1440px] border-x border-[#eaeaea]">
          <div className="grid min-h-[620px] lg:grid-cols-[.94fr_1.06fr]">
            <div className="bytehop-hero-copy flex flex-col justify-center border-b border-[#eaeaea] px-7 py-20 sm:px-10 lg:border-r lg:border-b-0 lg:px-14 xl:px-20">
              <SectionLabel>Open source · Self-hosted · v0.1</SectionLabel>
              <h1 className="mt-9 max-w-[680px] text-[3.3rem] font-normal leading-[1.3] tracking-[-0.065em] sm:text-[4.25rem] lg:text-[3.4rem] xl:text-[4rem]">
                <span className="block">AI Agent</span>
                <span className="block">统一数据访问网关</span>
              </h1>
              <div className="mt-8 max-w-[36rem] border-l border-[#d4d4d4] pl-4 sm:pl-5">
                <p className="text-[15px] leading-7 text-[#404040] sm:text-base">
                  ByteHop 部署在 Agent 与数据库、内部 API 之间。
                </p>
                <p className="mt-2 text-sm leading-6 text-[#737373] sm:text-[15px] sm:leading-7">
                  连接和凭证只配置在网关，资源按用户或用户组开放；Codex、Claude
                  和脚本统一经由 ByteHop 转发，无需逐台配置数据库账号和 API
                  Key。
                </p>
                <p className="mt-2 text-sm leading-6 text-[#737373] sm:text-[15px] sm:leading-7">
                  Agent
                  可自动发现当前账号获准的资源并申请短期访问，运行中的查询也能实时查看和单独停止。
                </p>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/docs/quickstart"
                  className="bytehop-action bytehop-action-primary group inline-flex h-12 items-center gap-2 border border-[#171717] bg-[#171717] px-6 text-sm font-medium text-white"
                >
                  连接已有实例
                  <ArrowRight className="size-4 text-[#e5484d] transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/docs/administration/installation"
                  className="bytehop-action bytehop-action-secondary inline-flex h-12 items-center border border-[#d4d4d4] bg-white px-6 text-sm font-medium"
                >
                  部署团队实例
                </Link>
              </div>
            </div>

            <div className="hero-principle-column flex min-w-0 items-center bg-[#fafafa] px-7 py-14 sm:px-10 lg:px-14 xl:px-20">
              <HeroPrincipleCarousel />
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-b border-[#eaeaea] bg-[#fafafa]"
        aria-label="选择使用路径"
      >
        <div className="mx-auto grid max-w-[1440px] border-x border-[#eaeaea] lg:grid-cols-2">
          <Link
            href="/docs/quickstart"
            data-home-reveal
            className="bytehop-interactive-cell group flex min-h-64 flex-col border-b border-[#eaeaea] p-7 sm:p-10 lg:border-r lg:border-b-0 lg:p-14"
          >
            <UserRound className="size-5 text-[#e5484d]" />
            <span className="mt-12 font-mono text-[10px] uppercase tracking-[.15em] text-[#737373]">
              User / Client
            </span>
            <h2 className="mt-3 text-2xl font-normal tracking-[-0.04em]">
              团队已经部署 ByteHop
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#666]">
              向管理员获取 Server 地址和账号。只看资源可直接登录 Web；需要终端或
              AI 时，再安装 CLI 和可选 Skill。
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
              使用者第一次登录
              <ArrowRight className="size-4 text-[#e5484d] transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          <Link
            href="/docs/administration/installation"
            data-home-reveal
            className="bytehop-interactive-cell group flex min-h-64 flex-col p-7 sm:p-10 lg:p-14"
          >
            <Server className="size-5 text-[#e5484d]" />
            <span className="mt-12 font-mono text-[10px] uppercase tracking-[.15em] text-[#737373]">
              Admin / Server
            </span>
            <h2 className="mt-3 text-2xl font-normal tracking-[-0.04em]">
              团队还没有 ByteHop
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#666]">
              先用 Docker 部署 Server，再接入 Resource、创建用户和 Access
              policy，最后把地址与账号交给成员。
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
              管理员部署流程
              <ArrowRight className="size-4 text-[#e5484d] transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      <section
        className="border-b border-[#eaeaea] bg-white"
        aria-label="支持的资源类型"
      >
        <div className="mx-auto grid max-w-[1440px] border-x border-[#eaeaea] lg:grid-cols-[13rem_minmax(0,1fr)]">
          <div className="flex h-20 items-center gap-2 border-b border-[#eaeaea] px-7 font-mono text-[10px] uppercase tracking-[.15em] text-[#737373] lg:border-r lg:border-b-0 lg:px-8">
            <span className="size-1.5 bg-[#e5484d]" aria-hidden="true" />
            Available adapters
          </div>
          <div className="grid min-w-0 flex-1 grid-cols-2 lg:grid-cols-4">
            {connectors.map(([kind, name, protocol, href]) => (
              <Link
                key={name}
                href={href}
                aria-label={`查看 ${name} 接入文档`}
                className="bytehop-interactive-cell group flex h-24 min-w-0 items-center gap-4 border-r border-b border-[#eaeaea] px-5 even:border-r-0 lg:border-b-0 lg:even:border-r lg:last:border-r-0"
              >
                <TechnologyMark
                  className="bytehop-tech-mark size-7 shrink-0 text-[#171717]"
                  kind={kind}
                />
                <span className="bytehop-tech-meta flex min-w-0 flex-1 flex-col text-left">
                  <span className="text-sm font-medium">{name}</span>
                  <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[.12em] text-[#8a8a8a]">
                    {protocol}
                  </span>
                </span>
                <ArrowUpRight
                  className="bytehop-tech-arrow size-3.5 shrink-0 text-[#e5484d]"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="install"
        className="scroll-mt-16 border-b border-[#2a2a2a] bg-[#0a0a0a] text-white"
      >
        <div
          data-home-reveal
          className="mx-auto grid max-w-[1440px] border-x border-[#2a2a2a] lg:grid-cols-[.72fr_1.28fr]"
        >
          <div className="border-b border-[#2a2a2a] px-7 py-14 sm:px-10 lg:border-r lg:border-b-0 lg:px-14 lg:py-20 xl:px-20">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.16em] text-[#8a8a8a]">
              <span className="size-1.5 bg-[#e5484d]" aria-hidden="true" />
              Client setup
            </p>
            <h2 className="mt-5 text-3xl font-normal tracking-[-0.045em] sm:text-4xl">
              连接团队已有实例
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#a3a3a3]">
              CLI 是必需的执行入口，Skill 是可选的 Agent
              使用说明。开始前需要管理员提供 Server 地址和账号；这里不会部署
              Server。
            </p>
          </div>
          <div className="min-w-0 px-7 py-12 sm:px-10 lg:px-14 lg:py-20">
            <InstallCommand />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#888]">
              <span>CLI 必需 · Skill 可选 · 登录另行完成</span>
              <a
                href="https://github.com/rayui-lab/bytehop-dist/releases/latest"
                target="_blank"
                rel="noreferrer"
                className="bytehop-inline-link inline-flex items-center gap-1.5 text-white"
              >
                Windows 与全部下载 <ExternalLink className="size-3.5" />
              </a>
              <Link
                href="/docs/administration/docker"
                className="bytehop-inline-link inline-flex items-center gap-1.5 text-white"
              >
                还没有 Server？使用 Docker 部署
                <ArrowRight className="size-3.5 text-[#e5484d]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="agent-skill"
        className="scroll-mt-16 border-b border-[#eaeaea] bg-white"
      >
        <div className="mx-auto max-w-[1440px] border-x border-[#eaeaea]">
          <div
            data-home-reveal
            className="grid border-b border-[#eaeaea] lg:grid-cols-[.72fr_1.28fr]"
          >
            <div className="border-b border-[#eaeaea] px-7 py-14 sm:px-10 lg:border-r lg:border-b-0 lg:px-14 lg:py-20 xl:px-20">
              <SectionLabel>ByteHop Skill</SectionLabel>
              <h2 className="mt-5 max-w-md text-3xl font-normal leading-tight tracking-[-0.045em] sm:text-4xl">
                CLI 负责执行，Skill 教 Agent 怎么用
              </h2>
            </div>
            <div className="flex flex-col justify-center px-7 py-10 sm:px-10 lg:px-14">
              <p className="max-w-2xl text-sm leading-7 text-[#666] sm:text-base">
                Skill 不包含 CLI、Server、账号或 Resource 权限。Client
                已安装并登录后，Skill 才会让 Agent 按同一套约定发现能力、调用
                Resource
                和处理错误；管理员也可以在有配置权限的环境中使用配置模式。
              </p>
              <Link
                href="/docs/using/agent-workflow"
                className="bytehop-inline-link mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[#171717]"
              >
                阅读 ByteHop Skill 文档
                <ArrowRight className="size-3.5 text-[#e5484d]" />
              </Link>
            </div>
          </div>

          <ol className="grid bg-[#fafafa] sm:grid-cols-2 lg:grid-cols-4">
            {skillStages.map(({ step, title, note, example, href }) => (
              <li
                key={step}
                data-home-reveal
                className="min-h-72 border-b border-[#eaeaea] sm:border-r sm:even:border-r-0 lg:border-b-0 lg:even:border-r lg:last:border-r-0"
              >
                <Link
                  href={href}
                  className="bytehop-interactive-cell group flex h-full flex-col p-7 sm:p-8"
                >
                  <span className="flex items-center justify-between font-mono text-xs text-[#e5484d]">
                    {step}
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                  <h3 className="mt-12 text-lg font-medium">{title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[#666]">
                    {note}
                  </p>
                  <code className="mt-7 border-l-2 border-[#e5484d] pl-3 font-mono text-[11px] text-[#737373]">
                    {example}
                  </code>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#eaeaea] bg-[#fafafa]">
        <div className="mx-auto max-w-[1440px] border-x border-[#eaeaea]">
          <div
            data-home-reveal
            className="grid border-b border-[#eaeaea] lg:grid-cols-[.72fr_1.28fr]"
          >
            <div className="border-b border-[#eaeaea] px-7 py-14 sm:px-10 lg:border-r lg:border-b-0 lg:px-14 lg:py-20 xl:px-20">
              <SectionLabel>Skill / Configure</SectionLabel>
              <h2 className="mt-5 max-w-md text-3xl font-normal leading-tight tracking-[-0.045em] sm:text-4xl">
                描述资源，AI 完成配置
              </h2>
            </div>
            <div className="flex flex-col justify-center px-7 py-10 sm:px-10 lg:px-14">
              <p className="max-w-2xl text-sm leading-7 text-[#666] sm:text-base">
                这个模式只面向有 Server 配置权限的管理员。告诉 AI
                上游地址、凭证引用和谁可以使用；Skill 提供稳定的配置结构，CLI
                负责真实校验、差异预览和热更新。普通用户调用 Resource 不需要接触
                YAML。
              </p>
              <Link
                href="/docs/using/agent-workflow#配置模式"
                className="bytehop-inline-link mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[#171717]"
              >
                查看 Skill 配置模式{" "}
                <ArrowRight className="size-3.5 text-[#e5484d]" />
              </Link>
            </div>
          </div>
          <div data-home-reveal className="min-w-0 p-4 sm:p-8 lg:p-12">
            <ResourceConfigDemo />
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-16 border-b border-[#eaeaea] bg-white"
      >
        <div className="mx-auto max-w-[1440px] border-x border-[#eaeaea]">
          <div className="grid border-b border-[#eaeaea] lg:grid-cols-[.82fr_1.18fr]">
            <div
              data-home-reveal
              className="flex flex-col justify-center border-b border-[#eaeaea] px-7 py-16 sm:px-10 lg:border-r lg:border-b-0 lg:px-14 lg:py-20 xl:px-20"
            >
              <SectionLabel>Skill / Invoke</SectionLabel>
              <h2 className="mt-6 max-w-xl text-4xl font-normal leading-[1.08] tracking-[-0.055em] sm:text-5xl">
                一条稳定、可追踪的访问路径
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-[#666] sm:text-base">
                Agent 面向 Resource 工作；身份、Lease、凭证注入和记录由 ByteHop
                统一处理。
              </p>
            </div>
            <GatewayHeroVisual />
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
            {requestSteps.map(([step, title, note]) => (
              <li
                key={step}
                data-home-reveal
                className="min-h-60 border-b border-r border-[#eaeaea] p-7 last:border-r-0 sm:p-8 lg:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#e5484d]">
                    {step}
                  </span>
                  <Radio className="size-4 text-[#e5484d]" />
                </div>
                <h3 className="mt-16 text-lg font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#666]">{note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#eaeaea] bg-[#fafafa]">
        <div className="mx-auto max-w-[1440px] border-x border-[#eaeaea]">
          <div className="grid border-b border-[#eaeaea] lg:grid-cols-[.82fr_1.18fr]">
            <div
              data-home-reveal
              className="flex flex-col justify-center border-b border-[#eaeaea] px-7 py-16 sm:px-10 lg:border-r lg:border-b-0 lg:px-14 lg:py-20 xl:px-20"
            >
              <SectionLabel>Live operations</SectionLabel>
              <h2 className="mt-6 max-w-xl text-4xl font-normal leading-[1.08] tracking-[-0.055em] sm:text-5xl">
                运行中的请求，不再是黑盒
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-[#666] sm:text-base">
                看见 ByteHop
                正在代理的查询，在它占用资源或迟迟不返回时，只停止这一条
                Operation。
              </p>
              <Link
                href="/docs/administration/operations-audit"
                className="bytehop-inline-link mt-7 inline-flex w-fit items-center gap-2 text-sm font-medium text-[#171717]"
              >
                查看运行中操作说明{" "}
                <ArrowRight className="size-4 text-[#e5484d]" />
              </Link>
            </div>
            <div data-home-reveal className="min-w-0 bg-white">
              <RunningQueryVisual />
            </div>
          </div>

          <div className="grid bg-white md:grid-cols-3">
            {operationFeatures.map(([step, title, note]) => (
              <article
                key={step}
                data-home-reveal
                className="min-h-52 border-b border-[#eaeaea] p-7 last:border-b-0 md:border-r md:border-b-0 md:p-8 md:last:border-r-0"
              >
                <span className="font-mono text-xs text-[#e5484d]">{step}</span>
                <h3 className="mt-10 text-base font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#737373]">{note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#eaeaea] bg-[#fafafa]">
        <div className="mx-auto max-w-[1440px] border-x border-[#eaeaea]">
          <div
            data-home-reveal
            className="grid border-b border-[#eaeaea] lg:grid-cols-[.72fr_1.28fr]"
          >
            <div className="border-b border-[#eaeaea] px-7 py-14 sm:px-10 lg:border-r lg:border-b-0 lg:px-14 lg:py-20 xl:px-20">
              <SectionLabel>Access control</SectionLabel>
              <h2 className="mt-5 max-w-lg text-3xl font-normal leading-tight tracking-[-0.045em] sm:text-4xl">
                每个账号，只看到获准的资源
              </h2>
            </div>
            <div className="flex flex-col justify-center px-7 py-10 sm:px-10 lg:px-14">
              <p className="max-w-2xl text-sm leading-7 text-[#666] sm:text-base">
                例如，data 组只能发现 analytics，support 组只能发现 orders-api；
                admin 只拥有管理能力，不因此获得任何 Resource。修改用户、分组或
                Access policy 后通过热更新生效，不必逐台修改客户端。
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                <Link
                  href="/docs/administration/access-leases"
                  className="bytehop-inline-link inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[#171717]"
                >
                  查看权限模型{" "}
                  <ArrowRight className="size-3.5 text-[#e5484d]" />
                </Link>
                <Link
                  href="/docs/evaluate/use-cases"
                  className="bytehop-inline-link inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[#171717]"
                >
                  查看适用场景{" "}
                  <ArrowRight className="size-3.5 text-[#e5484d]" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid bg-white sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(([Icon, title, note]) => {
              const ItemIcon = Icon as LucideIcon;
              return (
                <article
                  key={title}
                  data-home-reveal
                  className="min-h-64 border-b border-r border-[#eaeaea] p-7 last:border-r-0 sm:p-8 lg:border-b-0"
                >
                  <ItemIcon className="size-5 text-[#e5484d]" />
                  <h3 className="mt-16 text-base font-medium">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#737373]">
                    {note}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div
          data-home-reveal
          className="mx-auto max-w-[1440px] border-x border-[#eaeaea] px-7 py-20 text-center sm:px-10 sm:py-28"
        >
          <span
            className="mx-auto block h-0.5 w-10 bg-[#e5484d]"
            aria-hidden="true"
          />
          <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-normal leading-tight tracking-[-0.05em] sm:text-5xl">
            从 CLI、Skill 和一个只读 Resource 开始
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-[#666] sm:text-base">
            安装 Skill 后直接向 Agent 描述任务；ByteHop
            统一处理发现、Lease、凭证注入、调用与记录。
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/docs/quickstart"
              className="bytehop-action bytehop-action-primary group inline-flex h-12 items-center gap-2 border border-[#171717] bg-[#171717] px-6 text-sm font-medium text-white"
            >
              连接已有实例
              <ArrowRight className="size-4 text-[#e5484d] transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/docs/administration/docker"
              className="bytehop-action bytehop-action-secondary inline-flex h-12 items-center border border-[#d4d4d4] bg-white px-6 text-sm font-medium"
            >
              Docker 部署
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
