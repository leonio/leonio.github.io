import satori from "satori";
import sharp from "sharp";
import { fontData, experimental_getFontFileURL } from "astro:assets";
import { getFontPathByWeight } from "@/utils/getFontPathByWeight";
import config from "@/config";

// "Paper & Ink" palette, kept in sync with src/styles/theme.css (light mode).
const PAPER = "#faf8f5";
const INK = "#1f1e1c";
const RUST = "#b4451f";
const MUTED = "#66625b";

type OgContent = {
  /** Large headline (post title or site title). */
  title: string;
  /** Optional line under the headline. */
  subtitle?: string;
  /** Left side of the footer, e.g. "by Leon". */
  byline?: string;
};

async function loadFonts(url: URL) {
  const fonts = fontData["--font-inter"];
  // satori can read woff/ttf/otf but not woff2
  const regularFontPath = getFontPathByWeight(fonts, 400, { format: "woff" });
  const boldFontPath = getFontPathByWeight(fonts, 700, { format: "woff" });

  if (regularFontPath === undefined || boldFontPath === undefined) {
    throw new Error("Cannot find the font path.");
  }

  return Promise.all([
    fetch(experimental_getFontFileURL(regularFontPath, url)).then(res =>
      res.arrayBuffer()
    ),
    fetch(experimental_getFontFileURL(boldFontPath, url)).then(res =>
      res.arrayBuffer()
    ),
  ]);
}

export async function renderOgImage(
  { title, subtitle, byline }: OgContent,
  url: URL
): Promise<Response> {
  const [regularData, boldData] = await loadFonts(url);
  const hostname = new URL(config.site.url).hostname;

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          background: PAPER,
          color: INK,
          width: "100%",
          height: "100%",
          display: "flex",
          fontFamily: "Inter",
        },
        children: [
          // Accent rule down the left edge
          {
            type: "div",
            props: { style: { width: "24px", background: RUST } },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "72px 80px",
                flex: 1,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      fontSize: 28,
                      fontWeight: 700,
                      color: RUST,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    },
                    children: config.site.title,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      maxHeight: "70%",
                      overflow: "hidden",
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            fontSize: 68,
                            fontWeight: 700,
                            lineHeight: 1.15,
                            letterSpacing: "-0.02em",
                          },
                          children: title,
                        },
                      },
                      subtitle && {
                        type: "div",
                        props: {
                          style: {
                            marginTop: "24px",
                            fontSize: 30,
                            color: MUTED,
                            lineHeight: 1.4,
                          },
                          children: subtitle,
                        },
                      },
                    ].filter(Boolean),
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 26,
                      color: MUTED,
                    },
                    children: [
                      { type: "span", props: { children: byline ?? "" } },
                      { type: "span", props: { children: hostname } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: [
        { name: "Inter", data: regularData, weight: 400, style: "normal" },
        { name: "Inter", data: boldData, weight: 700, style: "normal" },
      ],
    }
  );

  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(pngBuffer), {
    headers: { "Content-Type": "image/png" },
  });
}
