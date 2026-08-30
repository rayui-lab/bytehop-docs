import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { BrandMark } from "@/components/brand-mark";
import { appName } from "./shared";

function Brand() {
  return (
    <span className="flex items-center gap-2.5 font-semibold tracking-tight">
      <span className="bytehop-mark" aria-hidden="true">
        <BrandMark className="size-5" />
      </span>
      {appName}
    </span>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Brand />,
      transparentMode: "none",
    },
    links: [
      {
        text: "文档",
        url: "/docs",
        active: "nested-url",
        on: "nav",
      },
      {
        text: "开始使用",
        url: "/docs/quickstart",
        type: "button",
        on: "nav",
      },
      {
        text: "下载",
        url: "https://github.com/rayui-lab/bytehop-dist/releases/latest",
        external: true,
        on: "nav",
      },
    ],
  };
}
