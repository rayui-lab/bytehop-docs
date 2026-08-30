"use client";

import type { MermaidConfig } from "mermaid";
import { useEffect, useId, useState } from "react";

let renderSequence = 0;
let renderQueue: Promise<void> = Promise.resolve();

function getMermaidConfig(): MermaidConfig {
  const dark = document.documentElement.classList.contains("dark");

  return {
    startOnLoad: false,
    securityLevel: "strict",
    theme: "base",
    look: "classic",
    htmlLabels: false,
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    flowchart: {
      defaultRenderer: "dagre-wrapper",
      curve: "basis",
      diagramPadding: 16,
      nodeSpacing: 40,
      rankSpacing: 60,
      inheritDir: true,
    },
    themeVariables: dark
      ? {
          background: "#111817",
          primaryColor: "#17201f",
          primaryTextColor: "#e7efed",
          primaryBorderColor: "#5b7470",
          lineColor: "#87a39f",
          secondaryColor: "#13302d",
          tertiaryColor: "#0c1110",
          edgeLabelBackground: "#111817",
          clusterBkg: "#111817",
          clusterBorder: "#5b7470",
          textColor: "#e7efed",
          titleColor: "#e7efed",
          mainBkg: "#17201f",
          nodeBorder: "#5b7470",
          stateBkg: "#17201f",
          stateBorder: "#5b7470",
          stateLabelColor: "#e7efed",
          transitionColor: "#87a39f",
          transitionLabelColor: "#c3d3d0",
          noteBkgColor: "#13302d",
          noteTextColor: "#e7efed",
          noteBorderColor: "#5b7470",
        }
      : {
          background: "#f5f8f7",
          primaryColor: "#eef3f2",
          primaryTextColor: "#17201f",
          primaryBorderColor: "#9db0ad",
          lineColor: "#5f7471",
          secondaryColor: "#e7f2f0",
          tertiaryColor: "#fbfcfc",
          edgeLabelBackground: "#f5f8f7",
          clusterBkg: "#f5f8f7",
          clusterBorder: "#9db0ad",
          textColor: "#17201f",
          titleColor: "#17201f",
          mainBkg: "#eef3f2",
          nodeBorder: "#9db0ad",
          stateBkg: "#eef3f2",
          stateBorder: "#9db0ad",
          stateLabelColor: "#17201f",
          transitionColor: "#5f7471",
          transitionLabelColor: "#40514e",
          noteBkgColor: "#e7f2f0",
          noteTextColor: "#17201f",
          noteBorderColor: "#9db0ad",
        },
  };
}

function renderChart(chart: string, id: string, config: MermaidConfig) {
  const job = renderQueue.then(async () => {
    const { default: mermaid } = await import("mermaid");
    mermaid.initialize(config);
    const result = await mermaid.render(id, chart);
    return result.svg;
  });

  renderQueue = job.then(
    () => undefined,
    () => undefined,
  );

  return job;
}

export function Mermaid({ chart }: { chart: string }) {
  const componentId = useId().replaceAll(":", "");
  const [themeRevision, setThemeRevision] = useState(0);
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setThemeRevision((value) => value + 1);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let active = true;
    const id = `bytehop-mermaid-${componentId}-${themeRevision}-${renderSequence++}`;

    void renderChart(chart, id, getMermaidConfig())
      .then((renderedSvg) => {
        if (!active) return;
        setError("");
        setSvg(renderedSvg);
      })
      .catch((cause: unknown) => {
        if (!active) return;
        setSvg("");
        setError(cause instanceof Error ? cause.message : String(cause));
      });

    return () => {
      active = false;
    };
  }, [chart, componentId, themeRevision]);

  if (error) {
    return <pre className="bytehop-diagram-error">图表无法渲染：{error}</pre>;
  }

  if (!svg) {
    return (
      <div
        className="bytehop-diagram bytehop-diagram-loading not-prose"
        aria-busy="true"
      >
        <span className="sr-only">正在渲染流程图</span>
      </div>
    );
  }

  return (
    <div
      className="bytehop-diagram not-prose"
      role="img"
      aria-label="流程图"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Mermaid emits SVG from local, repository-owned MDX source.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
