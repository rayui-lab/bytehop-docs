import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "@/components/provider";
import "./global.css";

const inter = Inter({
  subsets: ["latin"],
});

const siteTitle = "ByteHop — AI Agent 统一数据访问网关";
const siteDescription =
  "开源自托管的 AI Agent 数据访问网关。统一代理 Codex、Claude 和脚本访问数据库与内部 API，集中保管凭证，按用户或用户组开放资源，并支持短期 Lease 与运行查询管理。";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: siteTitle,
    template: "%s · ByteHop",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "ByteHop",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
