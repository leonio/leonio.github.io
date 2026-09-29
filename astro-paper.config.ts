import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://leonio.github.io/",
    title: "Leon",
    description: "Notes, ideas and things I've learned.",
    author: "Leon",
    profile: "https://github.com/leonio",
    // No file in public/ with this name, so the branded /og.png is generated
    // at build time. Drop a 1200x630 image in public/ to override it.
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Europe/London",
    dir: "ltr",
  },
  posts: {
    perPage: 6,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/leonio/leonio.github.io/edit/main/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/leonio" },
  ],
  shareLinks: [
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "linkedin", url: "https://www.linkedin.com/sharing/share-offsite/?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
