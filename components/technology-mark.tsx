type TechnologyKind = "clickhouse" | "elasticsearch" | "mongodb" | "http";

type TechnologyMarkProps = {
  className?: string;
  kind: TechnologyKind;
};

const svgProps = {
  "aria-hidden": true,
  fill: "none",
  viewBox: "0 0 32 32",
  xmlns: "http://www.w3.org/2000/svg",
} as const;

export function TechnologyMark({ className, kind }: TechnologyMarkProps) {
  if (kind === "clickhouse") {
    return (
      <svg {...svgProps} className={className}>
        <title>ClickHouse</title>
        <path
          d="M4 5h3v22H4V5Zm5.25 0h3v22h-3V5Zm5.25 0h3v22h-3V5Zm5.25 0h3v22h-3V5ZM25 11h3v10h-3V11Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (kind === "elasticsearch") {
    return (
      <svg {...svgProps} className={className}>
        <title>Elasticsearch</title>
        <path
          d="M6.3 7.4A12 12 0 0 1 25.9 11H14.2l-3.6-3.6H6.3Zm-2 6.1h18.9l4.5 4.5H4.1a12.2 12.2 0 0 1 .2-4.5Zm2.1 7h11.4l3.8 3.8A12 12 0 0 1 6.4 20.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (kind === "mongodb") {
    return (
      <svg {...svgProps} className={className}>
        <title>MongoDB</title>
        <path
          d="M16.1 2.5c-.7 3.2-5.8 5.6-5.8 12.4 0 4.8 2.6 8.3 5.2 9.8l.5-2.3.5 2.3c2.7-1.5 5.2-5 5.2-9.8 0-6.8-4.8-9.4-5.6-12.4Z"
          fill="currentColor"
        />
        <path d="M16 8.1v21.2" stroke="#fafafa" strokeWidth="1.35" />
      </svg>
    );
  }

  return (
    <svg {...svgProps} className={className}>
      <title>HTTP API</title>
      <path
        d="m11.5 7-7 9 7 9M20.5 7l7 9-7 9M18.2 4.5 13.8 27.5"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="2.4"
      />
    </svg>
  );
}
