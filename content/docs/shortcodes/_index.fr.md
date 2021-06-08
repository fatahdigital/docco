---
title: "ShortCode"
weight: 19

summary: "Shortcodes are simple snippets inside your content files calling built-in or custom templates."
description: "Shortcodes are simple snippets inside your content files calling built-in or custom templates."
images: 
  - ""
pre: "<b>3. </b>"
lastmod: 2017-03-03T14:15:59-06:00
---

Hugo uses Markdown for its simple content format. However, there are a lot of things that Markdown doesn’t support well. You could use pure HTML to expand possibilities.

Shortcodes are simple snippets inside your content files calling built-in or custom templates.

But this happens to be a bad idea. Everyone uses Markdown because it's pure and simple to read even non-rendered. You should avoid HTML to keep it as simple as possible.

To avoid this limitations, Hugo created [shortcodes](/fr/docs/shortcodes/). A shortcode is a simple snippet inside a page.

**Hugo-theme-Docco** provides multiple shortcodes on top of existing ones.

{{%children style="h2" description="true" %}}