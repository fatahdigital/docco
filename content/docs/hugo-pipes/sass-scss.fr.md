---
title: "SASS / SCSS"
summary: "Hugo Pipes allows the processing of SASS and SCSS files."
description: "Docco theme support one default taxonomy of gohugo: the tag feature."
weight: 26
lastmod: 2017-03-03T14:15:59-06:00
---


Any SASS or SCSS file can be transformed into a CSS file using `resources.ToCSS` which takes two arguments, the resource object and a map of options listed below.

```
{{ $sass := resources.Get "sass/main.scss" }}
{{ $style := $sass | resources.ToCSS }}
```

### Options

transpiler [string] 

: The `transpiler` to use, valid values are `libsass` (default) and `dartsass`. Note that the Embedded Dart Sass project is still in beta (beta 5 at the time of writing). The release is scheduled for Q1 2021. We will try to improve the installation process by then, but if you want to use Hugo with Dart Sass you need to download a release binary from [Embedded Dart Sass](https://github.com/sass/dart-sass-embedded/releases) (Hugo after 0.81.0 requires beta 6 or newer) and make sure it's in your PC's `$PATH` (or `%PATH%` on Windows).

targetPath [string]
: If not set, the resource's target path will be the asset file original path with its extension replaced by `.css`.

outputStyle [string]
: Default is `nested` (LibSass) and `expanded` (Dart Sass). Other available output styles for LibSass are `expanded`, `compact` and `compressed`. Dart Sass only supports `expanded` and `compressed`.

precision [int]
: Precision of floating point math. **Note:** This option is not supported by Dart Sass.

enableSourceMap [bool]
: When enabled, a source map will be generated.

includePaths [string slice]
: Additional SCSS/SASS include paths. Paths must be relative to the project directory.

```
{{ $options := (dict "targetPath" "style.css" "outputStyle" "compressed" "enableSourceMap" true "includePaths" (slice "node_modules/myscss")) }}
{{ $style := resources.Get "sass/main.scss" | resources.ToCSS $options }}
```
