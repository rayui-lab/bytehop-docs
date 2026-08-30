export const appName = "ByteHop";
export const docsRoute = "/docs";
export const docsImageRoute = "/og/docs";
export const docsContentRoute = "/llms.mdx/docs";
export const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string) {
  if (!path.startsWith("/")) {
    throw new Error(`expected an absolute application path, received: ${path}`);
  }

  return `${siteBasePath}${path}`;
}
