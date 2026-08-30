import { llms } from "fumadocs-core/source";
import { siteBasePath } from "@/lib/shared";
import { source } from "@/lib/source";

export const revalidate = false;

export function GET() {
  const index = llms(source).index();

  return new Response(
    siteBasePath ? index.replaceAll("](/", `](${siteBasePath}/`) : index,
  );
}
