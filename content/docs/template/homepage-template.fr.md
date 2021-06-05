---
title: "Homepage Template"
summary: "Docco theme support one default taxonomy of gohugo: the tag feature."
description: "Docco theme support one default taxonomy of gohugo: the tag feature."
weight: 18
lastmod: 2017-03-03T14:15:59-06:00
---

The homepage of a website is often formatted differently than the other pages. For this reason, Hugo makes it easy for you to define your new site’s homepage as a unique template.

Homepage is a `Page` and therefore has all the page variables and site variables for use.

{{% note "The Only Required Template" %}}
The homepage template is the *only* required template for building a site and therefore useful when bootstrapping a new site and template. It is also the only required template if you are developing a single-page website.
{{% /note %}}

## Add Content and Front Matter to the Homepage

The homepage, similar to other list pages in Hugo, accepts content and front matter from an `_index.md` file. This file should live at the root of your `content` folder (i.e., `content/_index.md`). You can then add body copy and metadata to your homepage the way you would any other content file.

See the homepage template below or Content Organization for more information on the role of `_index.md` in adding content and front matter to list pages.

## Example Homepage Template

The following is an example of a homepage template that uses partial, base templates, and a content file at `content/_index.md` to populate the `{{.Title}}` and `{{.Content}}` page variables.

layouts/index.html" download="index.html
```
{{ define "main" }}
  <main aria-role="main">
    <header class="homepage-header">
      <h1>{{.Title}}</h1>
      {{ with .Params.subtitle }}
        <span class="subtitle">{{.}}</span>
      {{ end }}
    </header>
    <div class="homepage-content">
      <!-- Note that the content for index.html, as a sort of list page, will pull from content/_index.md -->
      {{.Content}}
    </div>
    <div>
      {{ range first 10 .Site.RegularPages }}
        {{ .Render "summary"}}
      {{ end }}
    </div>
  </main>
{{ end }}
```
