# ByteHop documentation

面向 ByteHop 使用者的 Fumadocs 文档站。它与 `web/` 管理后台分开构建，输出是可部署到任意静态站点服务的 `out/` 目录。

## 本地开发

需要 Bun 1.4 和 Node.js 22 或更高版本。

```bash
cd docs-site
bun install --frozen-lockfile
bun run dev
```

打开 <http://localhost:3000>。

## 检查与构建

```bash
bun run types:check
bun run lint
bun run build
```

`next.config.mjs` 使用 static export。构建完成后可直接托管 `docs-site/out/`。

部署时通过 `NEXT_PUBLIC_SITE_URL` 设置站点绝对 URL，供 Open Graph metadata 使用：

```bash
NEXT_PUBLIC_SITE_URL=https://docs.example.com bun run build
```

## 内容结构

- `content/docs/`：MDX 文档与侧边栏 `meta.json`；
- `app/(home)/page.tsx`：文档首页；
- `components/mermaid.tsx`：Mermaid 官方 SVG renderer；
- `source.config.ts`：MDX / Mermaid 配置。

搜索索引使用 Fumadocs 的静态 multilingual 模式。`/llms.txt`、`/llms-full.txt` 与每页 Markdown 路由由构建自动生成，便于 Agent 读取。

## Netlify

仓库根目录的 `netlify.toml` 已将构建目录固定为 `docs-site`，发布目录固定为 `docs-site/out`。在 Netlify 连接 `rayui-lab/bytehop` 后，不需要在网页中重复填写构建命令；每次推送 `main` 都会重新生成并部署静态文档。

本地预演 Netlify 使用的构建：

```bash
cd docs-site
bun install --frozen-lockfile
NEXT_PUBLIC_SITE_URL=https://docs.example.com bun run build
```
