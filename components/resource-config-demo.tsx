import { codeToTokens } from "shiki";
import {
  type HighlightedYaml,
  ResourceConfigDemoClient,
  type ResourceConfigDemoItem,
} from "@/components/resource-config-demo.client";

const demos = [
  {
    id: "clickhouse",
    label: "ClickHouse",
    prompt:
      "使用已安装的 ByteHop Skill：接入生产 ClickHouse，只允许 data 组使用，最长 30 分钟。使用数据库侧只读账号，密码只能引用环境变量。写入 bytehop.yaml，运行检查并展示差异，不要直接热更新。",
    yaml: `resources:
  prod-clickhouse:
    description: "生产分析数据，只读"
    kind: clickhouse
    upstream: "https://clickhouse.internal:8123"
    credential:
      basic:
        username: bh_analytics_ro
        password: "\${CLICKHOUSE_PASSWORD}"

access:
  - subjects: ["group:data"]
    resources: [prod-clickhouse]
    max_ttl: 30m`,
  },
  {
    id: "elasticsearch",
    label: "Elasticsearch",
    prompt:
      "使用已安装的 ByteHop Skill：接入订单 Elasticsearch，只允许 support 组做只读检索，Lease 最长 20 分钟。凭证从环境变量读取，生成配置并运行检查；展示差异，不要直接热更新。",
    yaml: `resources:
  prod-orders-search:
    description: "生产订单索引，只读检索"
    kind: elasticsearch
    upstream: "https://es.internal:9200"
    credential:
      basic:
        username: bh_orders_ro
        password: "\${ELASTICSEARCH_PASSWORD}"

access:
  - subjects: ["group:support"]
    resources: [prod-orders-search]
    max_ttl: 20m`,
  },
  {
    id: "mongodb",
    label: "MongoDB Bridge",
    prompt:
      "使用已安装的 ByteHop Skill：通过现有 HTTP Bridge 接入 MongoDB 用户资料查询，只允许 operations 组使用，最长 15 分钟。关联 OpenAPI，并从环境变量读取 Bridge Token。",
    yaml: `resources:
  prod-mongo-users:
    description: "用户资料，只读查询"
    kind: http
    upstream: "http://mongo-bridge:8080"
    openapi: "./openapi/mongo-users.yaml"
    credential:
      bearer: "\${MONGO_BRIDGE_TOKEN}"

access:
  - subjects: ["group:operations"]
    resources: [prod-mongo-users]
    max_ttl: 15m`,
  },
  {
    id: "http",
    label: "Internal API",
    prompt:
      "使用已安装的 ByteHop Skill：接入订单运营 API，使用现有 tide_sid，但不要把 Cookie 暴露给 Agent。只允许 operations 组使用，最长 15 分钟，并关联 OpenAPI。",
    yaml: `resources:
  orders-api:
    description: "订单运营能力"
    kind: http
    upstream: "https://orders.internal"
    openapi: "./openapi/orders.yaml"
    credential:
      headers:
        Cookie: "tide_sid=\${ORDERS_API_TIDE_SID}"

access:
  - subjects: ["group:operations"]
    resources: [orders-api]
    max_ttl: 15m`,
  },
] as const;

export async function ResourceConfigDemo() {
  const highlightedDemos: ResourceConfigDemoItem[] = await Promise.all(
    demos.map(async ({ yaml, ...demo }) => {
      const highlighted = await codeToTokens(yaml, {
        lang: "yaml",
        theme: "github-light",
      });
      const highlightedYaml: HighlightedYaml = {
        background: highlighted.bg,
        foreground: highlighted.fg,
        lines: highlighted.tokens.map((line, lineIndex) => ({
          id: `line-${lineIndex + 1}`,
          newline: lineIndex < highlighted.tokens.length - 1,
          tokens: line.map((token) => ({
            id: `token-${token.offset}`,
            content: token.content,
            color: token.color,
            backgroundColor: token.bgColor,
            fontStyle: token.fontStyle,
          })),
        })),
      };

      return { ...demo, highlightedYaml };
    }),
  );

  return <ResourceConfigDemoClient demos={highlightedDemos} />;
}
