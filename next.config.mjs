import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

if (basePath && (!basePath.startsWith("/") || basePath.endsWith("/"))) {
  throw new Error(
    "NEXT_PUBLIC_BASE_PATH must start with / and must not end with /",
  );
}

/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
};

export default withMDX(config);
