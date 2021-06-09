---
title: "Single Page Templates"
summary: "Docco theme support one default taxonomy of gohugo: the tag feature."
description: "Docco theme support one default taxonomy of gohugo: the tag feature."
weight: 18
lastmod: 2017-03-03T14:15:59-06:00
---

The primary view of content in Hugo is the single view. Hugo will render every Markdown file provided with a corresponding single template.

## Example Single Page Templates

Content pages are of the type `page` and will therefore have all the page variables and site variables available to use in their templates.

### `posts/single.html`

This single page template makes use of Hugo base templates, the `.Format` function for dates, the `.WordCount` page variable, and ranges through the single content's specific taxonomies. `with` is also used to check whether the taxonomies are set in the front matter.

layouts/posts/single.html

```
{{ define "main" }}
  <section id="main">
    <h1 id="title">{{ .Title }}</h1>
    <div>
      <article id="content">
          {{ .Content }}
      </article>
    </div>
  </section>
<aside id="meta">
    <div>
    <section>
      <h4 id="date"> {{ .Date.Format "Mon Jan 2, 2006" }} </h4>
      <h5 id="wordcount"> {{ .WordCount }} Words </h5>
    </section>
    {{ with .Params.topics }}
    <ul id="topics">
      {{ range . }}
        <li><a href="{{ "topics" | absURL}}{{ . | urlize }}">{{ . }}</a> </li>
      {{ end }}
    </ul>
    {{ end }}
    {{ with .Params.tags }}
    <ul id="tags">
      {{ range . }}
        <li> <a href="{{ "tags" | absURL }}{{ . | urlize }}">{{ . }}</a> </li>
      {{ end }}
    </ul>
    {{ end }}
    </div>
    <div>
        {{ with .PrevInSection }}
          <a class="previous" href="{{.Permalink}}"> {{.Title}}</a>
        {{ end }}
        {{ with .NextInSection }}
          <a class="next" href="{{.Permalink}}"> {{.Title}}</a>
        {{ end }}
    </div>
</aside>
{{ end }}
```

To easily generate new instances of a content type (e.g., new `.md` files in a section like `project/`) with preconfigured front matter, use content archetypes.
