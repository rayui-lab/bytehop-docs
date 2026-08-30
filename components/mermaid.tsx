import { renderMermaidSVG } from "beautiful-mermaid";

export function Mermaid({ chart }: { chart: string }) {
  try {
    const svg = renderMermaidSVG(chart, {
      bg: "var(--color-fd-card)",
      fg: "var(--color-fd-foreground)",
      accent: "var(--bytehop-accent)",
      border: "var(--color-fd-border)",
      surface: "var(--color-fd-muted)",
      transparent: true,
    });

    return (
      <div
        className="bytehop-diagram not-prose"
        role="img"
        aria-label="流程图"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: the local MDX source is rendered to SVG at build time, not from user input.
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return <pre className="bytehop-diagram-error">图表无法渲染：{message}</pre>;
  }
}
