---
title: "Content Section"
weight: 8
summary: "In Hugo, pages are the core of your site. Once it is configured, pages are definitely the added value to your documentation site."
description: "In Hugo, pages are the core of your site. Once it is configured, pages are definitely the added value to your documentation site."
images: 
  - ""
lastmod: 2017-03-03T14:15:59-06:00
---

Hugo generates a section tree that matches your content.

A **Section** is a collection of pages that gets defined based on the
organization structure under the `content/` directory.

By default, all the **first-level** directories under `content/` form their own
sections (**root sections**).

If a user needs to define a section `foo` at a deeper level, they need to create
a directory named `foo` with an `_index.md` file.

{{% note %}}
A **section** cannot be defined or overridden by a front matter parameter -- it
is strictly derived from the content organization structure.
{{% /note %}}

## Nested Sections

The sections can be nested as deeply as you need.

```bash
content
└── blog        <-- Section, because first-level dir under content/
    ├── funny-cats
    │   ├── mypost.md
    │   └── kittens         <-- Section, because contains _index.md
    │       └── _index.md
    └── tech                <-- Section, because contains _index.md
        └── _index.md
```

**The important part to understand is, that to make the section tree fully navigational, at least the lower-most section need a content file. (e.g. `_index.md`).**

{{% note %}}
When we talk about a **section** in correlation with template selection, it is
currently always the *root section* only (`/blog/funny-cats/mypost/ => blog`).

If you need a specific template for a sub-section, you need to adjust either the `type` or `layout` in front matter.
{{% /note %}}

## Example: Breadcrumb Navigation

With the available section variables and methods you can build powerful navigation. One common example would be a partial to show Breadcrumb navigation:

/partials/breadcrumb.html"
```
<ol  class="nav navbar-nav">
  {{ template "breadcrumbnav" (dict "p1" . "p2" .) }}
</ol>
{{ define "breadcrumbnav" }}
{{ if .p1.Parent }}
{{ template "breadcrumbnav" (dict "p1" .p1.Parent "p2" .p2 )  }}
{{ else if not .p1.IsHome }}
{{ template "breadcrumbnav" (dict "p1" .p1.Site.Home "p2" .p2 )  }}
{{ end }}
<li{{ if eq .p1 .p2 }} class="active"{{ end }}>
  <a href="{{ .p1.Permalink }}">{{ .p1.Title }}</a>
</li>
{{ end }}
```

## Section Page Variables and Methods

.CurrentSection
: The page's current section. The value can be the page itself if it is a section or the homepage.

.FirstSection
: The page's first section below root, e.g. `/docs`, `/blog` etc.

.InSection $anotherPage
: Whether the given page is in the current section.

.IsAncestor $anotherPage
: Whether the current page is an ancestor of the given page.

.IsDescendant $anotherPage
: Whether the current page is a descendant of the given page.

.Parent
: A section's parent section or a page's section.

.Section
: The [section](/en/docs/content-and-customization/sections/) this content belongs to. **Note:** For nested sections, this is the first path element in the directory, for example, `/blog/funny/mypost/ => blog`.

.Sections
: The [sections](/en/docs/content-and-customization/sections/) below this content.