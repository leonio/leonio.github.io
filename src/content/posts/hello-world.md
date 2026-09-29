---
title: "Hello, world"
description: "The first post on the new blog, plus a quick reference for how posts are written."
pubDatetime: 2026-09-29T12:00:00Z
tags:
  - meta
featured: true
draft: false
---

Welcome to the new blog. Every post is just a Markdown file in
`src/content/posts/`. Push it to `main` and it's live a minute later.

## Table of contents

## Writing a post

Create a file such as `src/content/posts/my-new-post.md`. The filename becomes
the URL (`/posts/my-new-post/`). Start it with some frontmatter:

```yaml
---
title: "My new post" # required
description: "One-line summary" # required, used for SEO and social cards
pubDatetime: 2026-10-01T09:00:00Z # required
modDatetime: # optional, set when you update a post
tags: [notes, astro] # optional
featured: false # optional, pins it on the home page
draft: true # optional, drafts are never published
---
```

Then write normal Markdown underneath.

## Things that just work

- **Code blocks** get syntax highlighting in both light and dark mode:

  ```ts
  const greet = (name: string) => `Hello, ${name}!`;
  ```

- **Social cards**: each post gets its own Open Graph image, generated from
  its title.
- **SEO**: canonical URLs, sitemap, RSS, structured data and meta
  descriptions are all handled for you.
- **Search** is built in, powered by Pagefind.

> Tip: a `## Table of contents` heading anywhere in a post is replaced with a
> collapsible TOC.
