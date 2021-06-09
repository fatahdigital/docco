---
title: "Asset bundling"
summary: "Hugo Pipes can bundle any number of assets together."
description: "Hugo Pipes can bundle any number of assets together."
weight: 22
lastmod: 2017-03-03T14:15:59-06:00
---

Asset files of the same MIME type can be bundled into one resource using `resources.Concat` which takes two arguments, a target path and a slice of resource objects.

```
{{ $plugins := resources.Get "js/plugins.js" }}
{{ $global := resources.Get "js/global.js" }}
{{ $js := slice $plugins $global | resources.Concat "js/bundle.js" }}
```
