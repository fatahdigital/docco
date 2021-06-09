---
title: "Base Template and Block"
summary: "Docco theme support one default taxonomy of gohugo: the tag feature."
description: "Docco theme support one default taxonomy of gohugo: the tag feature."
weight: 18
lastmod: 2017-03-03T14:15:59-06:00
---

The base and block constructs allow you to define the outer shell of your master templates (i.e., the chrome of the page).

The `block` keyword allows you to define the outer shell of your pages' one or more master template(s) and then fill in or override portions as necessary.

## Define the Base Template

The following defines a simple base template at `_default/baseof.html`. As a default template, it is the shell from which all your pages will be rendered unless you specify another `*baseof.html` closer to the beginning of the lookup order.

layouts/_default/baseof.html

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>{{ block "title" . }}
      <!-- Blocks may include default content. -->
      {{ .Site.Title }}
    {{ end }}</title>
  </head>
  <body>
    <!-- Code that all your templates share, like a header -->
    {{ block "main" . }}
      <!-- The part of the page that begins to differ between templates -->
    {{ end }}
    {{ block "footer" . }}
    <!-- More shared code, perhaps a footer but that can be overridden if need be in  -->
    {{ end }}
  </body>
</html>
```

## Override the Base Template

From the above base template, you can define a default list template. The default list template will inherit all of the code defined above and can then implement its own `"main"` block from:

layouts/_default/list.html

```
{{ define "main" }}
  <h1>Posts</h1>
  {{ range .Pages }}
    <article>
      <h2>{{ .Title }}</h2>
      {{ .Content }}
    </article>
  {{ end }}
{{ end }}
```

This replaces the contents of our (basically empty) "main" block with something useful for the list template. In this case, we didn't define a `"title"` block, so the contents from our base template remain unchanged in lists.

The following shows how you can override both the `"main"` and `"title"` block areas from the base template with code unique to your default single page template:

layouts/_default/single.html
```
{{ define "title" }}
  <!-- This will override the default value set in baseof.html; i.e., "{{.Site.Title}}" in the original example-->
  {{ .Title }} &ndash; {{ .Site.Title }}
{{ end }}
{{ define "main" }}
  <h1>{{ .Title }}</h1>
  {{ .Content }}
{{ end }}
```