---
title: "Content View Templates"
summary: "Hugo can render alternative views of your content, which is especially useful in list and summary views."
description: "Hugo can render alternative views of your content, which is especially useful in list and summary views."
weight: 18
lastmod: 2017-03-03T14:15:59-06:00
---

Hugo can render alternative views of your content, which is especially useful in list and summary views.

The following are common use cases for content views:

* You want content of every type to be shown on the homepage but only with limited [summary views](/fr/docs/content-and-customization/content-summaries).
* You only want a bulleted list of your content on a [taxonomy list page](/fr/docs/template/taxonomy-templates). Views make this very straightforward by delegating the rendering of each different type of content to the content itself.

## Create a Content View

To create a new view, create a template in each of your different content type directories with the view name. The following example contains an "li" view and a "summary" view for the `posts` and `project` content types. As you can see, these sit next to the [single content view](/fr/docs/template/single-page-template) template, `single.html`. You can even provide a specific view for a given type and continue to use the `_default/single.html` for the primary view.

```
  ▾ layouts/
    ▾ posts/
        li.html
        single.html
        summary.html
    ▾ project/
        li.html
        single.html
        summary.html
```

Hugo also has support for a default content template to be used in the event that a specific content view template has not been provided for that type. Content views can also be defined in the `_default` directory and will work the same as list and single templates who eventually trickle down to the `_default` directory as a matter of the lookup order.


```
▾ layouts/
  ▾ _default/
      li.html
      single.html
      summary.html
```

## Which Template Will be Rendered?

The following is the [lookup order](/fr/docs/template/lookup-order) for content views:

1. `/layouts/<TYPE>/<VIEW>.html`
2. `/layouts/_default/<VIEW>.html`
3. `/themes/<THEME>/layouts/<TYPE>/<VIEW>.html`
4. `/themes/<THEME>/layouts/_default/<VIEW>.html`

## Example: Content View Inside a List

The following example demonstrates how to use content views inside of your [list templates](/fr/docs/template/list-page-template).

### `list.html`

In this example, `.Render` is passed into the template to call the render function. `.Render` is a special function that instructs content to render itself with the view template provided as the first argument. In this case, the template is going to render the `summary.html` view that follows:

layouts/_default/list.html"
```
<main id="main">
  <div>
  <h1 id="title">{{ .Title }}</h1>
  {{ range .Pages }}
    {{ .Render "summary"}}
  {{ end }}
  </div>
</main>
```

### `summary.html`

Hugo will pass the entire page object to the following `summary.html` view template. 

layouts/_default/summary.html" 
```
<article class="post">
  <header>
    <h2><a href='{{ .Permalink }}'> {{ .Title }}</a> </h2>
    <div class="post-meta">{{ .Date.Format "Mon, Jan 2, 2006" }} - {{ .FuzzyWordCount }} Words </div>
  </header>
  {{ .Summary }}
  <footer>
  <a href='{{ .Permalink }}'><nobr>Read more →</nobr></a>
  </footer>
</article>
```

### `li.html`

Continuing on the previous example, we can change our render function to use a smaller `li.html` view by changing the argument in the call to the `.Render` function (i.e., `{{ .Render "li" }}`).

layouts/_default/li.html
```
<li>
  <a href="{{ .Permalink }}">{{ .Title }}</a>
  <div class="meta">{{ .Date.Format "Mon, Jan 2, 2006" }}</div>
</li>
```