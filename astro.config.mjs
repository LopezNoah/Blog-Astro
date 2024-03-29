import { defineConfig } from "astro/config"; //import node from '@astrojs/node';
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import prefetch from "@astrojs/prefetch";
import mdx from "@astrojs/mdx";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs(), prefetch(), mdx()],
  output: "server",
  adapter: vercel()
});