"use client";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import SearchDialog from "@/components/search";

const translations = {
  Search: "搜索",
  "Close Search": "关闭搜索",
  "No results found": "没有找到结果",
  "On this page": "本页内容",
  "Table of Contents": "目录",
  "No Headings": "本页没有标题",
  "Previous Page": "上一页",
  "Next Page": "下一页",
  "Copy Markdown": "复制 Markdown",
  "Page Not Found": "页面不存在",
  "Back to Home": "返回首页",
  "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.":
    "页面可能已被移动、重命名或暂时不可用。",
};

export function Provider({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      search={{ SearchDialog }}
      i18n={{ locale: "zh-CN", translations }}
    >
      {children}
    </RootProvider>
  );
}
