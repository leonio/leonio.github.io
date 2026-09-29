import type { APIRoute } from "astro";
import { renderOgImage } from "@/utils/renderOgImage";
import config from "@/config";

export const GET: APIRoute = async ({ url }) =>
  renderOgImage(
    {
      title: config.site.title,
      subtitle: config.site.description,
      byline: config.site.author,
    },
    url
  );
