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

The following is a list of site-level (aka "global") variables. Many of these variables are defined in your site's [configuration file](/getting-started/configuration/), whereas others are built into Hugo's core for convenient usage in your templates.

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
: a string representing the date/time of the most recent change to your site. This string is based on the [`date` variable in the front matter](/content-and-customization/front-matter) of your content pages.

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

You can use `.Site.Params` in a [partial template](/content-and-customization/partials/) to call the default site description:

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
