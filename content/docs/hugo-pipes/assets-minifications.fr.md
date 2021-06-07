---
title: "Asset minification"
summary: "Hugo Pipes allows the minification of any CSS, JS, JSON, HTML, SVG or XML resource.
"
description: "Hugo Pipes allows the minification of any CSS, JS, JSON, HTML, SVG or XML resource."
weight: 19
lastmod: 2017-03-03T14:15:59-06:00
---

Any resource of the aforementioned types can be minified using `resources.Minify` which takes for argument the resource object.


```
{{ $css := resources.Get "css/main.css" }}
{{ $style := $css | resources.Minify }}
```

Note that you can also minify the final HTML output to `/public` by running `hugo --minify`.