"use client";

import {
  ChevronLeft,
  ChevronRight,
  Database,
  KeyRound,
  Pause,
  Play,
} from "lucide-react";
import { useEffect, useState } from "react";

const principles = [
  {
    id: "discovery",
    title: "只发现被授权的资源",
    description:
      "目录先按当前用户和用户组过滤，Agent 不会看到无权使用的 Resource。",
  },
  {
    id: "lease",
    title: "只获得任务所需的时间",
    description: "Lease 绑定任务和过期时间，用完可立即释放，到期自动失效。",
  },
  {
    id: "credential",
    title: "不接触上游真实凭证",
    description: "数据库密码、Cookie 与 API Key 由 ByteHop 在服务端注入请求。",
  },
  {
    id: "event",
    title: "每次请求都有记录",
    description: "操作者、Resource、结果与耗时写入 Event，之后可以查询和追踪。",
  },
] as const;

type PrincipleId = (typeof principles)[number]["id"];

function PrincipleVisual({ id }: { id: PrincipleId }) {
  if (id === "discovery") {
    return (
      <div
        className="hero-principle-visual hero-discovery-visual"
        aria-hidden="true"
      >
        <span className="hero-discovery-scan" />
        <div className="hero-discovery-nodes">
          <i />
          <i className="is-authorized" />
          <i />
          <i />
          <i className="is-authorized" />
          <i />
        </div>
        <span className="hero-principle-caption">Policy filtered</span>
      </div>
    );
  }

  if (id === "lease") {
    return (
      <div
        className="hero-principle-visual hero-lease-visual"
        aria-hidden="true"
      >
        <div className="hero-lease-clock">
          <svg viewBox="0 0 64 64">
            <title>Lease 倒计时</title>
            <circle className="hero-lease-clock-base" cx="32" cy="32" r="25" />
            <circle className="hero-lease-clock-value" cx="32" cy="32" r="25" />
          </svg>
          <strong>30m</strong>
        </div>
        <div className="hero-lease-timeline">
          <i />
        </div>
        <span className="hero-principle-caption">Auto expire</span>
      </div>
    );
  }

  if (id === "credential") {
    return (
      <div
        className="hero-principle-visual hero-credential-visual"
        aria-hidden="true"
      >
        <div className="hero-credential-flow">
          <span>Agent</span>
          <i />
          <span className="hero-credential-vault">
            <KeyRound size={15} />
          </span>
          <i />
          <span>
            <Database size={14} />
          </span>
          <b className="hero-credential-packet" />
        </div>
        <span className="hero-credential-secret">Secret stays here</span>
        <span className="hero-principle-caption">Server-side injection</span>
      </div>
    );
  }

  return (
    <div className="hero-principle-visual hero-event-visual" aria-hidden="true">
      <div className="hero-event-row">
        <i />
        <code>request.started</code>
        <span>12 ms</span>
      </div>
      <div className="hero-event-row">
        <i />
        <code>policy.allowed</code>
        <span>data</span>
      </div>
      <div className="hero-event-row">
        <i />
        <code>request.completed</code>
        <span>200</span>
      </div>
      <span className="hero-principle-caption">Append-only events</span>
    </div>
  );
}

export function HeroPrincipleCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const stopped = paused || interacting || reducedMotion;
  const principle = principles[active];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: changing slides restarts the autoplay delay.
  useEffect(() => {
    if (stopped) return;
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % principles.length);
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [active, stopped]);

  function move(direction: -1 | 1) {
    setActive(
      (current) =>
        (current + direction + principles.length) % principles.length,
    );
  }

  return (
    <section
      className="hero-principle-carousel"
      aria-label="ByteHop 访问方式"
      aria-roledescription="carousel"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setInteracting(false);
        }
      }}
    >
      <div className="hero-principle-heading">
        <p>One controlled path</p>
        <span>
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(principles.length).padStart(2, "0")}
        </span>
      </div>

      <section
        key={principle.id}
        className="hero-principle-slide"
        aria-roledescription="slide"
        aria-label={`${active + 1} / ${principles.length}`}
      >
        <PrincipleVisual id={principle.id} />
        <h2>{principle.title}</h2>
        <p>{principle.description}</p>
      </section>

      <div className="hero-carousel-footer">
        <nav className="hero-carousel-pages" aria-label="选择介绍内容">
          {principles.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`bytehop-control ${index === active ? "is-active" : ""}`}
              aria-label={`查看：${item.title}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => setActive(index)}
            />
          ))}
        </nav>
        <div className="hero-carousel-controls">
          <button
            className="bytehop-control"
            type="button"
            onClick={() => move(-1)}
            aria-label="上一项"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            className="bytehop-control"
            type="button"
            onClick={() => setPaused((current) => !current)}
            aria-label={paused ? "继续自动播放" : "暂停自动播放"}
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
          </button>
          <button
            className="bytehop-control"
            type="button"
            onClick={() => move(1)}
            aria-label="下一项"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
