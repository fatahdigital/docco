---
title: "Hugo Pipes Overview"
summary: "Docco theme support one default taxonomy of gohugo: the tag feature."
description: "Docco theme support one default taxonomy of gohugo: the tag feature."
weight: 21
pre: "<b>4. </b>"
lastmod: 2017-03-03T14:15:59-06:00
---

### Asset directory

Asset files must be stored in the asset directory. This is `/assets` by default, but can be configured via the configuration file's `assetDir` key.

### From file to resource

In order to process an asset with Hugo Pipes, it must be retrieved as a resource using `resources.Get`, which takes one argument: the filepath of the file relative to the asset directory.

```
{{ $style := resources.Get "sass/main.scss" }}
```

### Asset publishing

Assets will only be published (to `/public`) if `.Permalink` or `.RelPermalink` is used.

### Go Pipes

For improved readability, the Hugo Pipes examples of this documentation will be written using Go Pipes:

```
{{ $style := resources.Get "sass/main.scss" | resources.ToCSS | resources.Minify | resources.Fingerprint }}
<link rel="stylesheet" href="{{ $style.Permalink }}">
```

### Method aliases

Each Hugo Pipes `resources` transformation method uses a __camelCased__ alias (`toCSS` for `resources.ToCSS`).
Non-transformation methods deprived of such aliases are `resources.Get`, `resources.FromString`, `resources.ExecuteAsTemplate` and `resources.Concat`.

The example above can therefore also be written as follows:
```
{{ $style := resources.Get "sass/main.scss" | toCSS | minify | fingerprint }}
<link rel="stylesheet" href="{{ $style.Permalink }}">
```

### Caching

Hugo Pipes invocations are cached based on the entire _pipe chain_.

An example of a pipe chain is:

```
{{ $mainJs := resources.Get "js/main.js" | js.Build "main.js" | minify | fingerprint }}
```

The pipe chain is only invoked the first time it is encountered in a site build, and results are otherwise loaded from cache. As such, Hugo Pipes can be used in templates which are executed thousands or millions of times without negatively impacting the build performance.

