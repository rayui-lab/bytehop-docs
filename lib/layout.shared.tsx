import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { appName } from "./shared";

function Brand() {
  return (
    <span className="flex items-center gap-2.5 font-semibold tracking-tight">
      <span className="bytehop-mark" aria-hidden="true">
        B
      </span>
      {appName}
    </span>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Brand />,
      transparentMode: "top",
    },
    links: [
      {
        text: "文档",
        url: "/docs",
        active: "nested-url",
      },
      {
        text: "5 分钟开始",
        url: "/docs/quickstart",
        type: "button",
      },
    ],
  };
}
