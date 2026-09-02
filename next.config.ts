import type { NextConfig } from "next";

/* On GitHub Pages a project site is served from /<repo>, so every asset and
   route needs that prefix. It used to be hard-coded to one repository name,
   which silently breaks the moment the site is published from another one —
   the pages return 200 and every stylesheet, script and photograph 404s.
   The prefix is now read from the repository the workflow is running in, so
   it is right wherever it deploys and empty everywhere else. */
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath =
  process.env.GITHUB_ACTIONS === "true" && repo ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
