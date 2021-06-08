---
title: "Variable"
date: 2017-10-17T15:26:15Z
draft: false
weight: 23
description: "calling custom Shortcodes into your content files."
summary: "calling custom Shortcodes into your content files."
---

## Site Variables

Many, but not all, site-wide variables are defined in your site’s configuration. However, Hugo provides a number of built-in variables for convenient access to global values in your templates.

The following is a list of site-level (aka "global") variables. Many of these variables are defined in your site's [configuration file](/fr/docs/getting-started/configuration/), whereas others are built into Hugo's core for convenient usage in your templates.

## Get the Site object from a partial

All the methods below, e.g. `.Site.RegularPages` can also be reached via the global `site` function, e.g. `site.RegularPages`, which can be handy in partials where the `Page` object isn't easily available.

## Site Variables List

.Site.AllPages
: array of all pages, regardless of their translation.

.Site.Author
: a map of the authors as defined in the site configuration.

.Site.BaseURL
: the base URL for the site as defined in the site configuration.

.Site.BuildDrafts
: a boolean (default: `false`) to indicate whether to build drafts as defined in the site configuration.

.Site.Copyright
: a string representing the copyright of your website as defined in the site configuration.

.Site.Data
: custom data, Hugo supports loading data from YAML, JSON, and TOML files located in the data directory in the root of your Hugo project.

.Site.DisqusShortname
: a string representing the shortname of the Disqus shortcode as defined in the site configuration.

.Site.GoogleAnalytics
: a string representing your tracking code for Google Analytics as defined in the site configuration.

.Site.Home
: reference to the homepage's page object , Page-level variables are defined in a content file’s front matter, derived from the content’s file location, or extracted from the content body itself.


.Site.IsMultiLingual
: whether there are more than one language in this site. Hugo supports the creation of websites with multiple languages side by side.


.Site.IsServer
: a boolean to indicate if the site is being served with Hugo's built-in server. Hugo provides its own webserver which builds and serves the site. While hugo server is high performance, it is a webserver with limited options. Many run it in production

.Site.Language.Lang
: the language code of the current locale (e.g., `en`).

.Site.Language.LanguageName
: the full language name (e.g. `English`).

.Site.Language.Weight
: the weight that defines the order in the `.Site.Languages` list.

.Site.Language
: indicates the language currently being used to render the website. This object's attributes are set in site configurations' language definition.

.Site.LanguageCode
: a string representing the language as defined in the site configuration. This is mostly used to populate the RSS feeds with the right language code.

.Site.LanguagePrefix
: this can be used to prefix URLs to point to the correct language. It will even work when only one defined language. 

.Site.Languages
: an ordered list (ordered by defined weight) of languages.

.Site.LastChange
: a string representing the date/time of the most recent change to your site. This string is based on the [`date` variable in the front matter](/fr/docs/content-and-customization/front-matter) of your content pages.

.Site.Menus
: all of the menus in the site.

.Site.Pages
: array of all content ordered by Date with the newest first. This array contains only the pages in the current language. 

.Site.RegularPages
: a shortcut to the *regular* page collection. `.Site.RegularPages` is equivalent to `where .Site.Pages "Kind" "page"`.

.Site.Sections
: top-level directories of the site.

.Site.Taxonomies
: the taxonomies for the entire site.  

.Site.Title
: a string representing the title of the site.

## The `.Site.Params` Variable

`.Site.Params` is a container holding the values from the `params` section of your site configuration.

### Example: `.Site.Params`

The following `config.[yaml|toml|json]` defines a site-wide param for `description`:

{{< code-toggle file="config" >}}
baseURL = "https://yoursite.example.com/"

[params]
  description = "Tesla's Awesome Hugo Site"
  author = "Nikola Tesla"
{{</ code-toggle >}}

You can use `.Site.Params` in a [partial template](en/docs/template/partial-template/) to call the default site description:

{{< code file="layouts/partials/head.html" >}}
<meta name="description" content="{{if .IsHome}}{{ $.Site.Params.description }}{{else}}{{.Description}}{{end}}" />
{{< /code >}}

## The `.Site.Pages` Variable {#site-pages}

### `.Site.Pages` compared to `.Pages`

* A _regular_ page is a "post" page or a "content" page.
  * A _leaf bundle_ is a regular page.
* A _list_ page can list _regular_ pages and other _list_ pages. Some
  examples are: homepage, section pages, _taxonomy term_ (`/tags/`) and
  _taxonomy_ (`/tags/foo/`) pages.
  * A _branch bundle_ is a _list_ page.

`.Site.Pages`
: Collection of **all** pages of the site: _regular_ pages,
    sections, taxonomies, etc. -- Superset of everything!

`.Site.RegularPages`
: Collection of only _regular_ pages.

The above `.Site. ..` page collections can be accessed from any scope in
the templates.

Below variables return a collection of pages only from the scope of
the current _list_ page:

`.Pages`
: Collection of _regular_ pages and _only first-level_
    section pages under the current _list_ page.

`.RegularPages`
: Collection of only _regular_ pages under the
    current _list_ page. This **excludes** regular pages in nested sections/_list_ pages (those are subdirectories with an `_index.md` file.

`.RegularPagesRecursive`
: Collection of **all** _regular_ pages under a _list_ page. This **includes** regular pages in nested sections/_list_ pages.

This feature was added in Hugo version 0.68.0

Note
: From the scope of _regular_ pages, `.Pages` and
    `.RegularPages` return an empty slice.

## Page Variables

Page-level variables are defined in a content file’s front matter, derived from the content’s file location, or extracted from the content body itself.

The following is a list of page-level variables. Many of these will be defined in the front matter, derived from file location, or extracted from the content itself.

## Page Variables

.AlternativeOutputFormats
: contains all alternative formats for a given page; this variable is especially useful `link rel` list in your site's `<head>`. Hugo can output content in multiple formats, including calendar events, e-book formats, Google AMP, and JSON search indexes, or any custom text format.

.Aliases
: aliases of this page

.Content
: the content itself, defined below the front matter.

.Data
: the data specific to this type of page.

.Date
: the date associated with the page; `.Date` pulls from the `date` field in a content's front matter. See also `.ExpiryDate`, `.PublishDate`, and `.Lastmod`.

.Description
: the description for the page.

.Dir
: the path of the folder containing this content file. The path is relative to the `content` folder.

.Draft
: a boolean, `true` if the content is marked as a draft in the front matter.

.ExpiryDate
: the date on which the content is scheduled to expire; `.ExpiryDate` pulls from the `expirydate` field in a content's front matter. See also `.PublishDate`, `.Date`, and `.Lastmod`.

.File
: filesystem-related data for this content file.

.FuzzyWordCount
: the approximate number of words in the content.

.Hugo
: .Description
: the description for the page.

.Dir
: the path of the folder containing this content file. The path is relative to the `content` folder.

.Draft
: a boolean, `true` if the content is marked as a draft in the front matter.

.ExpiryDate
: the date on which the content is scheduled to expire; `.ExpiryDate` pulls from the `expirydate` field in a content's front matter. See also `.PublishDate`, `.Date`, and `.Lastmod`.

.File
: filesystem-related data for this content file. See also [File Variables][].

.FuzzyWordCount
: the approximate number of words in the content.

.Hugo
: The .Hugo variable provides easy access to Hugo-related data.

.IsHome
: `true` in the context of the homepage.

.IsNode
: always `false` for regular content pages.

.IsPage
: always `true` for regular content pages.

.IsSection
: `true` if `.Kind` is `section`.

.IsTranslated
: `true` if there are translations to display.

.Keywords
: the meta keywords for the content.

.Kind
: the page's *kind*. Possible return values are `page`, `home`, `section`, `taxonomy`, or `taxonomyTerm`. Note that there are also `RSS`, `sitemap`, `robotsTXT`, and `404` kinds, but these are only available during the rendering of each of these respective page's kind and therefore *not* available in any of the `Pages` collections.

.Language
: a language object that points to the language's definition in the site `config`. `.Language.Lang` gives you the language code.

.Lastmod
: the date the content was last modified. `.Lastmod` pulls from the `lastmod` field in a content's front matter.

 - If `lastmod` is not set, and `.GitInfo` feature is disabled, the front matter `date` field will be used.
 - If `lastmod` is not set, and `.GitInfo` feature is enabled, `.GitInfo.AuthorDate` will be used instead.

See also `.ExpiryDate`, `.Date`, `.PublishDate`, and `.GitInfo`.

.LinkTitle
: access when creating links to the content. If set, Hugo will use the `linktitle` from the front matter before `title`.

.Next
: Points up to the next regular page (sorted by Hugo's default sort). Example: `{{with .Next}}{{.Permalink}}{{end}}`. Calling `.Next` from the first page returns `nil`.

.NextInSection
: Points up to the next regular page below the same top level section (e.g. in `/blog`)). Pages are sorted by Hugo's default sort. Example: `{{with .NextInSection}}{{.Permalink}}{{end}}`. Calling `.NextInSection` from the first page returns `nil`.

.OutputFormats
: contains all formats, including the current format, for a given page. Can be combined the with `.Get` function to grab a specific format.

.Pages
: a collection of associated pages. This value will be `nil` within
  the context of regular content pages.

.Permalink
: the Permanent link for this page;

.Plain
: the Page content stripped of HTML tags and presented as a string.

.PlainWords
: the slice of strings that results from splitting .Plain into words, as defined in Go's strings.Fields.

.Prev
: Points down to the previous regular page (sorted by Hugo's default sort). Example: `{{if .Prev}}{{.Prev.Permalink}}{{end}}`.  Calling `.Prev` from the last page returns `nil`.

.PrevInSection
: Points down to the previous regular page below the same top level section (e.g. `/blog`). Pages are sorted by Hugo's default sort. Example: `{{if .PrevInSection}}{{.PrevInSection.Permalink}}{{end}}`.  Calling `.PrevInSection` from the last page returns `nil`.

.PublishDate
: the date on which the content was or will be published; `.Publishdate` pulls from the `publishdate` field in a content's front matter. See also `.ExpiryDate`, `.Date`, and `.Lastmod`.

.RSSLink (deprecated)
: link to the page's RSS feed. This is deprecated. You should instead do something like this: `{{ with .OutputFormats.Get "RSS" }}{{ .RelPermalink }}{{ end }}`.

.RawContent
: raw markdown content without the front matter. Useful with [remarkjs.com](
https://remarkjs.com)

.ReadingTime
: the estimated time, in minutes, it takes to read the content.

.Resources
: resources such as images and CSS that are associated with this page

.Ref
: returns the permalink for a given reference (e.g., `.Ref "sample.md"`).  `.Ref` does *not* handle in-page fragments correctly.

.RelPermalink
: the relative permanent link for this page.

.RelRef
: returns the relative permalink for a given reference (e.g., `RelRef "sample.md"`). `.RelRef` does *not* handle in-page fragments correctly. 

.Site
: see [Site Variables](#site-variables).

.Sites
: returns all sites (languages). A typical use case would be to link back to the main language: `<a href="{{ .Sites.First.Home.RelPermalink }}">...</a>`.

.Sites.First
: returns the site for the first language. If this is not a multilingual setup, it will return itself.

.Summary
: a generated summary of the content for easily showing a snippet in a summary view. The breakpoint can be set manually by inserting <code>&lt;!&#x2d;&#x2d;more&#x2d;&#x2d;&gt;</code> at the appropriate place in the content page, or the summary can be written independent of the page text.  

.TableOfContents
: the rendered [table of contents](/fr/docs/shortcodes/table-of-contents/) for the page.

.Title
: the title for this page.

.Translations
: a list of translated versions of the current page.

.TranslationKey
: the key used to map language translations of the current page. 

.Truncated
: a boolean, `true` if the `.Summary` is truncated. Useful for showing a "Read more..." link only when necessary.

.Type
: the content type of the content (e.g., `posts`).

.UniqueID (deprecated)
: the MD5-checksum of the content file's path. This variable is deprecated and will be removed, use `.File.UniqueID` instead.

.Weight
: assigned weight (in the front matter) to this content, used in sorting.

.WordCount
: the number of words in the content.

## Section Variables and Methods

Also see [Sections](/fr/docs/content-and-customization/sections/).

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
: The [Sections](/fr/docs/content-and-customization/sections/) this content belongs to. **Note:** For nested sections, this is the first path element in the directory, for example, `/blog/funny/mypost/ => blog`.

.Sections
: The [Sections](/fr/docs/content-and-customization/sections/) below this content.

## The `.Pages` Variable {#pages}

`.Pages` is an alias to `.Data.Pages`. It is conventional to use the
aliased form `.Pages`.

* A _regular_ page is a "post" page or a "content" page.
  * A _leaf bundle_ is a regular page.
* A _list_ page can list _regular_ pages and other _list_ pages. Some
  examples are: homepage, section pages, _taxonomy term_ (`/tags/`) and
  _taxonomy_ (`/tags/foo/`) pages.
  * A _branch bundle_ is a _list_ page.

`.Site.Pages`
: Collection of **all** pages of the site: _regular_ pages,
    sections, taxonomies, etc. -- Superset of everything!

`.Site.RegularPages`
: Collection of only _regular_ pages.

The above `.Site. ..` page collections can be accessed from any scope in
the templates.

Below variables return a collection of pages only from the scope of
the current _list_ page:

`.Pages`
: Collection of _regular_ pages and _only first-level_
    section pages under the current _list_ page.

`.RegularPages`
: Collection of only _regular_ pages under the
    current _list_ page. This **excludes** regular pages in nested sections/_list_ pages (those are subdirectories with an `_index.md` file.

`.RegularPagesRecursive`
: Collection of **all** _regular_ pages under a _list_ page. This **includes** regular pages in nested sections/_list_ pages.

This feature was added in Hugo version 0.68.0

Note
: From the scope of _regular_ pages, `.Pages` and
    `.RegularPages` return an empty slice.

## Page-level Params

Any other value defined in the front matter in a content file, including taxonomies, will be made available as part of the `.Params` variable.

```
---
title: My First Post
date: 2017-02-20T15:26:23-06:00
categories: [one]
tags: [two,three,four]
```

With the above front matter, the `tags` and `categories` taxonomies are accessible via the following:

* `.Params.tags`
* `.Params.categories`

{{% note "Casing of Params" %}}
Page-level `.Params` are *only* accessible in lowercase.
{{% /note %}}

The `.Params` variable is particularly useful for the introduction of user-defined front matter fields in content files. For example, a Hugo website on book reviews could have the following front matter in `/content/review/book01.md`:

```
---
...
affiliatelink: "http://www.my-book-link.here"
recommendedby: "My Mother"
...
---
```

These fields would then be accessible to the `/themes/yourtheme/layouts/review/single.html` template through `.Params.affiliatelink` and `.Params.recommendedby`, respectively.

Two common situations where this type of front matter field could be introduced is as a value of a certain attribute like `href=""` or by itself to be displayed as text to the website's visitors.

/themes/yourtheme/layouts/review/single.html

```
<h3><a href={{ printf "%s" $.Params.affiliatelink }}>Buy this book</a></h3>
<p>It was recommended by {{ .Params.recommendedby }}.</p>
```

This template would render as follows, assuming you've set `uglyURLs`to `false` in your site `config`.

{{< output file="yourbaseurl/review/book01/index.html" >}}
<h3><a href="http://www.my-book-link.here">Buy this book</a></h3>
<p>It was recommended by my Mother.</p>
{{< /output >}}

{{% note %}}
See [Archetypes](/content-and-customization/archetypes/) for consistency of `Params` across pieces of content.
{{% /note %}}

### The `.Param` Method

In Hugo, you can declare params in individual pages and globally for your entire website. A common use case is to have a general value for the site param and a more specific value for some of the pages (i.e., a header image):

```
{{ $.Param "header_image" }}
```

The `.Param` method provides a way to resolve a single value according to it's definition in a page parameter (i.e. in the content's front matter) or a site parameter (i.e., in your `config`).

### Access Nested Fields in Front Matter

When front matter contains nested fields like the following:

```
---
author:
  given_name: John
  family_name: Feminella
  display_name: John Feminella
---
```
`.Param` can access these fields by concatenating the field names together with a dot:

```
{{ $.Param "author.display_name" }}
```

If your front matter contains a top-level key that is ambiguous with a nested key, as in the following case:

```
---
favorites.flavor: vanilla
favorites:
  flavor: chocolate
---
```

The top-level key will be preferred. Therefore, the following method, when applied to the previous example, will print `vanilla` and not `chocolate`:

```
{{ $.Param "favorites.flavor" }}
=> vanilla
```

## Pages 

Pages is the core page collection in Hugo and has many useful methods.

## .Next PAGE

`.Next` and `.Prev` on `Pages` work similar to the methods with the same names on `.Page`, but are more flexible (and slightly slower) as they can be used on any page collection.

`.Next` points **up** to the next page relative to the page sent in as the argument. Example: `{{with .Site.RegularPages.Next . }}{{.RelPermalink}}{{end}}`. Calling `.Next` with the first page in the collection returns `nil`. 

## .Prev PAGE

`.Prev` points **down** to the previous page relative to the page sent in as the argument. Example: `{{with .Site.RegularPages.Prev . }}{{.RelPermalink}}{{end}}`. Calling `.Prev` with the last page in the collection returns `nil`. 

## Taxonomy Variables

Taxonomy pages are of type Page and have all page-, site-, and list-level variables available to them. However, taxonomy terms templates have additional variables available to their templates.

### Taxonomy Terms Page Variables

Taxonomy terms pages are of the type `Page` and have the following additional variables.

For example, the following fields would be available in `layouts/_defaults/terms.html`, depending on how you organize your taxonomy templates:

.Data.Singular
: The singular name of the taxonomy (e.g., `tags => tag`)

.Data.Plural
: The plural name of the taxonomy (e.g., `tags => tags`)

.Data.Pages
: The list of pages in the taxonomy

.Data.Terms
: The taxonomy itself

.Data.Terms.Alphabetical
: The taxonomy terms alphabetized

.Data.Terms.ByCount
: The Terms ordered by popularity

Note that `.Data.Terms.Alphabetical` and `.Data.Terms.ByCount` can also be reversed:

* `.Data.Terms.Alphabetical.Reverse`
* `.Data.Terms.ByCount.Reverse`

### Use `.Site.Taxonomies` Outside of Taxonomy Templates

The `.Site.Taxonomies` variable holds all the taxonomies defined site-wide. `.Site.Taxonomies` is a map of the taxonomy name to a list of its values (e.g., `"tags" -> ["tag1", "tag2", "tag3"]`). Each value, though, is not a string but rather a *Taxonomy variable*.

### The `.Taxonomy` Variable

The `.Taxonomy` variable, available, for example, as `.Site.Taxonomies.tags`, contains the list of tags (values) and, for each tag, their corresponding content pages.

### Example Usage of `.Site.Taxonomies`

The following partial template will list all your site's taxonomies, each of their keys, and all the content assigned to each of the keys. For more examples of how to order and render your taxonomies.

all-taxonomies-keys-and-pages.html

```
<section>
  <ul>
    {{ range $taxonomyname, $taxonomy := .Site.Taxonomies }}
      <li><a href="{{ "/" | relLangURL}}{{ $taxonomyname | urlize }}">{{ $taxonomyname }}</a>
        <ul>
          {{ range $key, $value := $taxonomy }}
          <li> {{ $key }} </li>
                <ul>
                {{ range $value.Pages }}
                    <li><a href="{{ .Permalink}}"> {{ .LinkTitle }} </a> </li>
                {{ end }}
                </ul>
          {{ end }}
        </ul>
      </li>
    {{ end }}
  </ul>
</section>
```

## Menu Entry Properties

A menu entry in a menu-template has specific variables and functions to make menu management easier.

A **menu entry** has the following properties available that can be used in a menu template.

### Menu Entry Variables

.Menu
: _string_ <br />
Name of the **menu** that contains this **menu entry**.

.URL
: _string_ <br />
URL that the menu entry points to. The `url` key, if set for the menu entry,
sets this value. If that key is not set, and if the menu entry is set in a page
front-matter, this value defaults to the page's `.RelPermalink`.

.Page
: _\*Page_ <br />
Reference to the page object associated with the menu entry. This
will be non-nil if the menu entry is set via a page's front-matter and not via
the site config.

.Name
: _string_ <br />
Name of the menu entry. The `name` key, if set for the menu entry, sets
this value. If that key is not set, and if the menu entry is set in a page
front-matter, this value defaults to the page's `.LinkTitle`.

.Identifier
: _string_ <br />
Value of the `identifier` key if set for the menu entry. This value must be
unique for each menu entry. **It is necessary to set a unique identifier
manually if two or more menu entries have the same `.Name`.**

.Pre
: _template.HTML_ <br />
Value of the `pre` key if set for the menu entry. This value typically contains
a string representing HTML.

.Post
: _template.HTML_ <br />
Value of the `post` key if set for the menu entry. This value typically contains
a string representing HTML.

.Weight
: _int_ <br />
Value of the `weight` key if set for the menu entry. By default the entries in 
a menu are sorted ascending by their `weight`. If that key is not set, and if 
the menu entry is set in a page front-matter, this value defaults to the page's 
`.Weight`.

.Parent
: _string_ <br />
Name (or Identifier if present) of this menu entry's parent **menu entry**. The
`parent` key, if set for the menu entry, sets this value. If this key is set,
this menu entry nests under that parent entry, else it nests directly under the
`.Menu`.

.Children
: _Menu_ <br />
This value is auto-populated by Hugo. It is a collection of children menu
entries, if any, under the current menu entry.

## Menu Entry Functions

Menus also have the following functions available:

.HasChildren
: _boolean_ <br />
Returns `true` if `.Children` is non-nil.

.KeyName
: _string_ <br />
Returns the `.Identifier` if present, else returns the `.Name`.

.IsEqual
: _boolean_ <br />
Returns `true` if the two compared menu entries represent the same menu entry.

.IsSameResource
: _boolean_ <br />
Returns `true` if the two compared menu entries have the same `.URL`.

.Title
: _string_ <br />
Link title, meant to be used in the `title` attribute of a menu entry's
`<a>`-tags.  Returns the menu entry's `title` key if set. Else, if the menu
entry was created through a page's front-matter, it returns the page's
`.LinkTitle`. Else, it just returns an empty string.

## Other Menu-related Functions

Additionally, here are some relevant methods available to menus on a page:

.IsMenuCurrent
: _(menu string, menuEntry *MenuEntry ) 

.HasMenuCurrent
: _(menu string, menuEntry *MenuEntry)

## Hugo-specific Variables

The .Hugo variable provides easy access to Hugo-related data.

It contains the following fields:

.Hugo.Generator
: `<meta>` tag for the version of Hugo that generated the site. `.Hugo.Generator` outputs a *complete* HTML tag; e.g. `<meta name="generator" content="Hugo 0.18" />`

.Hugo.Version
: the current version of the Hugo binary you are using e.g. `0.13-DEV`<br>

.Hugo.Environment
: the current running environment as defined through the `--environment` cli tag.

.Hugo.CommitHash
: the git commit hash of the current Hugo binary e.g. `0e8bed9ccffba0df554728b46c5bbf6d78ae5247`

.Hugo.BuildDate
: the compile date of the current Hugo binary formatted with RFC 3339 e.g. `2002-10-02T10:00:00-05:00`<br>

{{% note "Use the Hugo Generator Tag" %}}
We highly recommend using `.Hugo.Generator` in your website's `<head>`. `.Hugo.Generator` is included by default in all themes hosted on [themes.gohugo.io](https://themes.gohugo.io). The generator tag allows the Hugo team to track the usage and popularity of Hugo.
{{% /note %}}
