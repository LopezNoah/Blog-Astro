import { defineConfig } from 'astro/config'; //import node from '@astrojs/node';

import deno from '@astrojs/deno';
import tailwind from '@astrojs/tailwind';
import solidJs from "@astrojs/solid-js";
import compress from "astro-compress";
import prefetch from "@astrojs/prefetch";
import mdx from "@astrojs/mdx";

import critters from "astro-critters";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs(), compress(), prefetch(), mdx(), critters()],
  output: 'server',
  adapter: deno()
});