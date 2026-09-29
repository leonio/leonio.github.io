import {
  defineConfig,
  envField,
  fontProviders,
  svgoOptimizer,
} from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import rehypeCallouts from "rehype-callouts";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import config from "./astro-paper.config";

// Inter from @fontsource. The .woff copy is also listed because satori
// (used to render OG images) can't read woff2.
const interVariant = (weight: number, style: "normal" | "italic") => ({
  weight,
  style,
  src: [
    `@fontsource/inter/files/inter-latin-${weight}-${style}.woff2`,
    `@fontsource/inter/files/inter-latin-${weight}-${style}.woff`,
  ] as [string, string],
});

export default defineConfig({
  site: config.site.url,
  integrations: [
    mdx(),
    sitemap({
      filter: page =>
        config.features?.showArchives !== false || !page.endsWith("/archives/"),
    }),
  ],
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkToc,
        [remarkCollapse, { test: "Table of contents" }],
      ],
      rehypePlugins: [rehypeCallouts],
    }),
    shikiConfig: {
      themes: { light: "github-light", dark: "vitesse-dark" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  // Self-hosted from @fontsource packages: no third-party font requests at
  // runtime or build time, and Renovate keeps them up to date.
  fonts: [
    {
      name: "Inter",
      cssVariable: "--font-inter",
      provider: fontProviders.local(),
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          interVariant(400, "normal"),
          interVariant(400, "italic"),
          interVariant(500, "normal"),
          interVariant(600, "normal"),
          interVariant(700, "normal"),
          interVariant(700, "italic"),
        ],
      },
    },
    {
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      provider: fontProviders.local(),
      fallbacks: ["monospace"],
      options: {
        variants: [
          {
            weight: 400,
            style: "normal",
            src: [
              "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2",
            ],
          },
          {
            weight: 700,
            style: "normal",
            src: [
              "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2",
            ],
          },
        ],
      },
    },
  ],
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
      PUBLIC_BING_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
      PUBLIC_CF_ANALYTICS_TOKEN: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
});
