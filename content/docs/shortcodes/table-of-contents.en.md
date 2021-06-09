---
title: "Table of Contents"
date: 2017-10-17T15:26:15Z
draft: false
weight: 33
description: "calling custom Shortcodes into your content files."
summary: "calling custom Shortcodes into your content files."
TableOfContents: true
---

Hugo can automatically parse Markdown content and create a Table of Contents you can use in your templates.

{{% note "TOC Heading Levels are Fixed" %}}

Previously, there was no out-of-the-box way to specify which heading levels you want the TOC to render. [See the related GitHub discussion (#1778)](https://github.com/gohugoio/hugo/issues/1778). As such, the resulting `<nav id="TableOfContents"><ul></ul></nav>` was going to start at `<h1>` when pulling from `{{.Content}}`.

Hugo [v0.60.0](https://github.com/gohugoio/hugo/releases/tag/v0.60.0) made a switch to [Goldmark](https://github.com/yuin/goldmark/) as the default library for Markdown which has improved and configurable implementation of TOC. Take a look at [how to configure TOC](/getting-started/configuration-markup/#table-of-contents) for Goldmark renderer.

{{% /note %}}

## Usage

Create your markdown the way you normally would with the appropriate headings. Here is some example content:

```
<!-- Your front matter up here -->

## Introduction

One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.

## My Heading

He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.

### My Subheading

A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops
```

Hugo will take this Markdown and create a table of contents from `## Introduction`, `## My Heading`, and `### My Subheading` and then store it in the page variable `.TableOfContents`.

The built-in `.TableOfContents` variables outputs a `<nav id="TableOfContents">` element with a child `<ul>`, whose child `<li>` elements begin with appropriate HTML headings. 

{{% note "Table of contents not available for MMark" %}}
Hugo documents created in the [MMark](/content-management/formats/#mmark) Markdown dialect do not currently display TOCs. TOCs are, however, compatible with all other supported Markdown formats.
{{% /note %}}

## Template Example: Basic TOC

The following is an example of a very basic [single page template][]:

layout/_default/single.html
```
{{ define "main" }}
<main>
    <article>
    <header>
        <h1>{{ .Title }}</h1>
    </header>
        {{ .Content }}
    </article>
    <aside>
        {{ .TableOfContents }}
    </aside>
</main>
{{ end }}
```

## Template Example: TOC Partial

The following is a [partial template](/en/docs/template/partial-template) that adds slightly more logic for page-level control over your table of contents. It assumes you are using a `toc` field in your content's [front matter][] that, unless specifically set to `false`, will add a TOC to any page with a `.WordCount` (see [Page Variables][pagevars]) greater than 400. This example also demonstrates how to use [conditionals][] in your templating:

ayouts/partials/toc.html
```
{{ if and (gt .WordCount 400 ) (.Params.toc) }}
<aside>
    <header>
    <h2>{{.Title}}</h2>
    </header>
    {{.TableOfContents}}
</aside>
{{ end }}

```

{{% note %}}
With the preceding example, even pages with > 400 words *and* `toc` not set to `false` will not render a table of contents if there are no headings in the page for the `{{.TableOfContents}}` variable to pull from.
{{% /note %}}


## Usage with AsciiDoc

Hugo supports table of contents with AsciiDoc content format.

In the header of your content file, specify the AsciiDoc TOC directives necessary to ensure that the table of contents is generated. Hugo will use the generated TOC to populate the page variable `.TableOfContents` in the same way as described for Markdown. See example below:

```
// <!-- Your front matter up here -->
:toc:
// Set toclevels to be at least your hugo [markup.tableOfContents.endLevel] config key
:toclevels: 4

== Introduction

One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.

== My Heading

He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.

=== My Subheading

A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops
```
Hugo will take this AsciiDoc and create a table of contents store it in the page variable `.TableOfContents`, in the same as described for Markdown.


<!-- 
The built-in .TableOfContents variables outputs a <nav id="TableOfContents"> element with a child <ul>, whose child <li> elements begin with appropriate HTML headings. See the available settings to configure what heading levels you want to include in TOC.

{{% panel status="primary" title="Note" icon="far fa-lightbulb" %}}
The `TableOfContents` field with `true` in your content’s frr willont matte render a table of contents.

```
TableOfContents: true
```

## Template Example: Basic TOC 

The following is an example of a very basic single page template:

`layout/_default/single.html" download="single.html" `
```
{{ define "main" }}
<main>
    <article>
    <header>
        <h1>{{ .Title }}</h1>
    </header>
        {{ .Content }}
    </article>
    <aside>
        {{ .TableOfContents }}
    </aside>
</main>
{{ end }}
```

Setting the built-in .TableOfContents variables can configure what heading levels you want to include in TOC. See [the built-in .TableOfContents variables settings](https://gohugo.io/getting-started/configuration-markup/#table-of-contents).

{{% /panel %}}

## Section 1

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Section 1 - 1

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Section 1 - 1 - 1

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Section 1 - 1 - 1 - 1

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Section 1 - 1 - 1 - 1 - 1

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Section 2


### Section 2 - 1

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Section 3Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. -->