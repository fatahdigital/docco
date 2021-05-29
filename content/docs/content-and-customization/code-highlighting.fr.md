---
title: "Code Highlighting"
weight: 10

summary: "Wrap the code block with three backticks and the name of the language. Highlight will try to auto detect the language if one is not provided."
description: "Wrap the code block with three backticks and the name of the language. Highlight will try to auto detect the language if one is not provided."
images: 
  - ""
menu:
  docs:
    parent: Content and Customization
    name: Code Highlighting
    weight: 24
lastmod: 2017-03-03T14:15:59-06:00
---

Docco theme uses [highlight.js](https://highlightjs.org/) to provide code syntax highlighting.

Hugo comes with really fast syntax highlighting from Chroma.

## Generate Syntax Highlighter CSS

If you run with `pygmentsUseClasses=true` in your site config, you need a style sheet.

You can generate one with Hugo:

```bash
hugo gen chromastyles --style=monokai > syntax.css
```

Run `hugo gen chromastyles -h` for more options. See https://xyproto.github.io/splash/docs/ for a gallery of available styles.

## Highlight Shortcode

Highlighting is carried out via the built-in [`highlight` shortcode](https://gohugo.io/content-management/shortcodes/#highlight). It takes exactly one required parameter for the programming language to be highlighted and requires a closing shortcode. Note that `highlight` is *not* used for client-side javascript highlighting.

Options:

* `linenos`: configure line numbers. Valid values are `true`, `false`, `table`, or `inline`. `false` will turn off line numbers if it's configured to be on in site config.  `table` will give copy-and-paste friendly code blocks.
* `hl_lines`: lists a set of line numbers or line number ranges to be highlighted.
* `linenostart=199`: starts the line number count from 199.
* `anchorlinenos`: Configure anchors on line numbers. Valid values are `true` or `false`;
* `lineanchors`: Configure a prefix for the anchors on line numbers. Will be suffixed with `-`, so linking to the line number 1 with the option `lineanchors=prefix` adds the anchor `prefix-1` to the page. 

### Example: Highlight Shortcode

```
{{</* highlight go "linenos=table,hl_lines=8 15-17,linenostart=199" */>}}
// ... code
{{</* / highlight */>}}
```

Gives this:

{{< highlight go "linenos=table,hl_lines=8 15-17,linenostart=199" >}}
  // GetTitleFunc returns a func that can be used to transform a string to
  // title case.
  //
  // The supported styles are
  //
  // - "Go" (strings.Title)
  // - "AP" (see https://www.apstylebook.com/)
  // - "Chicago" (see https://www.chicagomanualofstyle.org/home.html)
  //
  // If an unknown or empty style is provided, AP style is what you get.
  func GetTitleFunc(style string) func(s string) string {
    switch strings.ToLower(style) {
    case "go":
      return strings.Title
    case "chicago":
      return transform.NewTitleConverter(transform.ChicagoStyle)
    default:
      return transform.NewTitleConverter(transform.APStyle)
    }
  }
{{< / highlight >}}

## Markdown syntax
Wrap the code block with three backticks and the name of the language. Highlight will try to auto detect the language if one is not provided.

```
 ```json
    [
      {
        "title": "apples",
        "count": [12000, 20000],
        "description": {"text": "...", "sensitive": false}
      },
      {
        "title": "oranges",
        "count": [17500, null],
        "description": {"text": "...", "sensitive": false}
      }
    ]
    ```
```
Renders to:

```
[
  {
    "title": "apples",
    "count": [12000, 20000],
    "description": {"text": "...", "sensitive": false}
  },
  {
    "title": "oranges",
    "count": [17500, null],
    "description": {"text": "...", "sensitive": false}
  }
]
```

## Supported languages

Docco theme ships with its own version of highlight.js to support offline browsing. The included package supports 38 common languages, as described on the [highlight.js download page](https://highlightjs.org/download/).

## Identifying failed language detection

Highlight will write a warning to the browser console if a requested language was not found. For example, the following code block references an imaginary language `foo`. An error will be output to the console on this page.

```
```foo
    bar
    ```
```

```
Could not find the language 'foo', did you forget to load/include a language module?(anonymous) @ highlight.pack.js
```

## Supporting additional languages

To support languages other than the 38 common languages included in the default highlight.js you will need to download your own version of highlight.js and add it to your site content.

## Download custom highlight.js

Visit [https://highlightjs.org/download/](https://highlightjs.org/download/) and select your desired language support. Note that more languages means greater package size.

## Add custom highlight.js to static resources

Inside the zip archive downloaded from highlight.js extract the file named `highlight.pack.js`. Move this file to the **new** location

```
static/js/highlight.pack.js
```

**Do not** replace the existing file at `/docco/static/js/highlight.pack.js`.

Including the file in the correct path will override the theme default highlight.pack.js and prevent issues caused in the future if the theme default file is updated.

## Further usage information

See [https://highlightjs.org/usage/](https://highlightjs.org/usage/)
