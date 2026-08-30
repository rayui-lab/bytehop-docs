import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "@/components/provider";
import "./global.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "ByteHop 文档",
    template: "%s · ByteHop",
  },
  description:
    "面向 AI Agent 的自托管临时访问网关：集中保管上游凭证，按资源签发短期 Lease，并记录实际访问。",
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
