---
title: "Configration"
weight: 5

summary: "On top of Hugo global configuration, Docco lets you define the following parameters in your config.toml (here, values are default)."
description: "On top of Hugo global configuration, Docco lets you define the following parameters in your config.toml (here, values are default)."
images: 
  - ""
lastmod: 2017-03-03T14:15:59-06:00
---

How to configure your Hugo site.

## Configuration File

Hugo uses the `config.toml`, `config.yaml`, or `config.json` (if found in the
site root) as the default site config file.

The user can choose to override that default with one or more site config files
using the command line `--config` switch.

Examples:

```
hugo --config debugconfig.toml
hugo --config a.toml,b.toml,c.toml
```

## Configuration Directory

In addition to using a single site config file, one can use the `configDir` directory (default to `config/`) to maintain easier organization and environment specific settings.

- Each file represents a configuration root object, such as `params.toml` for `[Params]`, `menu(s).toml` for `[Menu]`, `languages.toml` for `[Languages]` etc...

- Each file's content must be top-level, for example:




{{< code-toggle file="config" >}}
[Params]
  foo = "bar"
{{< /code-toggle >}}

{{< code-toggle file="params" >}}
foo = "bar"
{{< /code-toggle >}}

- Each directory holds a group of files containing settings unique to an environment.
- Files can be localized to become language specific.

```
├── config
│   ├── _default
│   │   ├── config.toml
│   │   ├── languages.toml
│   │   ├── menus.en.toml
│   │   ├── menus.zh.toml
│   │   └── params.toml
│   ├── production
│   │   ├── config.toml
│   │   └── params.toml
│   └── staging
│       ├── config.toml
│       └── params.toml
```

Considering the structure above, when running `hugo --environment staging`, Hugo will use every settings from `config/_default` and merge `staging`'s on top of those.

{{% note %}}
Default environments are __development__ with `hugo server` and __production__ with `hugo`.
{{%/ note %}}

## All Configuration Settings

The following is the full list of Hugo-defined variables with their default value in parentheses. Users may choose to override those values in their site config file(s).

archetypeDir ("archetypes")
: The directory where Hugo finds archetype files (content templates).

assetDir ("assets")
: The directory where Hugo finds asset files used in Hugo Pipes.

baseURL
: Hostname (and path) to the root, e.g. https://example.com/

blackfriday
: Blackfriday was Hugo’s default Markdown rendering engine, now replaced with Goldmark.But you can still use it: Just set `defaultMarkdownHandler` to `blackfriday` in your top level markup config.

build
: The build configuration section contains global build-related configuration options.

buildDrafts (false)
: Include drafts when building.

buildExpired  (false)
: Include content already expired.

buildFuture (false)
: Include content with publishdate in the future.

caches
: See [Configure File Caches](/getting-started/configuration/#configure-file-caches)

canonifyURLs (false)
: Enable to turn relative URLs into absolute.

contentDir ("content")
: The directory from where Hugo reads content files. 

dataDir ("data")
: The directory from where Hugo reads data files. 

defaultContentLanguage ("en")
: Content without language indicator will default to this language.

defaultContentLanguageInSubdir (false)
: Render the default content language in subdir, e.g. `content/en/`. The site root `/` will then redirect to `/en/`.

disableAliases (false)
: Will disable generation of alias redirects. Note that even if `disableAliases` is set, the aliases themselves are preserved on the page. The motivation with this is to be able to generate 301 redirects in an `.htaccess`, a Netlify `_redirects` file or similar using a custom output format.

disableHugoGeneratorInject (false)
: Hugo will, by default, inject a generator meta tag in the HTML head on the _home page only_. You can turn it off, but we would really appreciate if you don't, as this is a good way to watch Hugo's popularity on the rise.

disableKinds ([])
: Enable disabling of all pages of the specified *Kinds*. Allowed values in this list: `"page"`, `"home"`, `"section"`, `"taxonomy"`, `"term"`, `"RSS"`, `"sitemap"`, `"robotsTXT"`, `"404"`.

disableLiveReload (false)
: Disable automatic live reloading of browser window.

disablePathToLower (false)
: Do not convert the url/path to lowercase.

enableEmoji (false)
: Enable Emoji emoticons support for page content; see the [Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet/).

enableGitInfo (false)
: Enable `.GitInfo` object for each page (if the Hugo site is versioned by Git). This will then update the `Lastmod` parameter for each page using the last git commit date for that content file.

enableInlineShortcodes (false)
: Enable inline shortcode support. See [Inline Shortcodes](/templates/shortcode-templates/#inline-shortcodes).

enableMissingTranslationPlaceholders (false)
: Show a placeholder instead of the default value or an empty string if a translation is missing.

enableRobotsTXT (false)
: Enable generation of `robots.txt` file.

frontmatter
: See [Front matter Configuration](/getting-started/configuration/#configure-front-matter).

footnoteAnchorPrefix ("")
: Prefix for footnote anchors.

footnoteReturnLinkContents ("")
: Text to display for footnote return links.

googleAnalytics ("")
: Google Analytics tracking ID.

hasCJKLanguage (false)
: If true, auto-detect Chinese/Japanese/Korean Languages in the content. This will make `.Summary` and `.WordCount` behave correctly for CJK languages.

imaging
: You can configure an imaging section in config.toml with default image processing options.

languages
: Anything not defined in a languages block will fall back to the global value for that key (e.g., copyright for the English en language). This also works for params. When working with front matter Params in single page templates, omit the params in the key for the translation

languageCode ("")
: The site's language code. It is used in the default RSS template and can be useful for multi-lingual sites.

languageName ("")
: The site's language name.

disableLanguages
: You can disable one or more languages. This can be useful when working on a new translation.

layoutDir ("layouts")
: The directory from where Hugo reads layouts (templates).

log (false)
: Enable logging.

logFile ("")
: Log File path (if set, logging enabled automatically).

markup
: 

menu
: You can also add entries to menus that aren’t attached to a piece of content. This takes place in your Hugo project’s config file.

minify
: 

module
: 

newContentEditor ("")
: The editor to use when creating new content.

noChmod (false)
: Don't sync permission mode of files.

noTimes (false)
: Don't sync modification time of files.

paginate (10)
: Default number of elements per page in pagination.

paginatePath ("page")
: The path element used during pagination (https://example.com/page/2).

permalinks
: The default Hugo target directory for your built website is public/. However, you can change this value by specifying a different publishDir in your site configuration.

pluralizeListTitles (true)
: Pluralize titles in lists.

publishDir ("public")
: The directory to where Hugo will write the final static site (the HTML files etc.).

related 
: Hugo provides a sensible default configuration of Related Content, but you can fine-tune this in your configuration, on the global or language level if needed.

relativeURLs (false)
: Enable this to make all relative URLs relative to content root. Note that this does not affect absolute URLs.

refLinksErrorLevel ("ERROR")
: When using `ref` or `relref` to resolve page links and a link cannot resolved, it will be logged with this logg level. Valid values are `ERROR` (default) or `WARNING`. Any `ERROR` will fail the build (`exit -1`).

refLinksNotFoundURL
: URL to be used as a placeholder when a page reference cannot be found in `ref` or `relref`. Is used as-is.

rssLimit (unlimited)
: Maximum number of items in the RSS feed.

sectionPagesMenu 
: To enable this menu, configure sectionPagesMenu in your site config:

sitemap
: Defaults for `<changefreq>`, `<priority>` and `filename` values can be set in the site’s config file

staticDir ("static")
: A directory or a list of directories from where Hugo reads static files.

summaryLength (70)
: The length of text in words to show in a `.Summary`.

taxonomies
: Custom taxonomies other than the defaults must be defined in your site config before they can be used throughout the site. 

theme 
: Theme to use (located by default in `/themes/THEMENAME/`).

themesDir ("themes")
: The directory where Hugo reads the themes from.

timeout (10000)
: Timeout for generating page contents, in milliseconds (defaults to 10&nbsp;seconds). *Note:* this is used to bail out of recursive content generation, if your pages are slow to generate (e.g., because they require large image processing or depend on remote contents) you might need to raise this limit.

title ("")
: Site title.

titleCaseStyle ("AP")
: See [Configure Title Case](/getting-started/configuration/#configure-title-case)

uglyURLs (false)
: When enabled, creates URL of the form `/filename.html` instead of `/filename/`.

verbose (false)
: Enable verbose output.

verboseLog (false)
: Enable verbose logging.

watch (false)
: Watch filesystem for changes and recreate as needed.

{{% note %}}
If you are developing your site on a \*nix machine, here is a handy shortcut for finding a configuration option from the command line:

```
cd ~/sites/yourhugosite
hugo config | grep emoji
```

which shows output like

```
enableemoji: true
```
{{% /note %}}

## Configure Title Case 

Set `titleCaseStyle` to specify the title style used by the title function and the automatic section titles in Hugo. It defaults to [AP Stylebook](https://www.apstylebook.com/) for title casing, but you can also set it to `Chicago` or `Go` (every word starts with a capital letter).

## Configuration Lookup Order

Similar to the template lookup order, Hugo has a default set of rules for searching for a configuration file in the root of your website's source directory as a default behavior:

1. `./config.toml`
2. `./config.yaml`
3. `./config.json`

In your `config` file, you can direct Hugo as to how you want your website rendered, control your website's menus, and arbitrarily define site-wide parameters specific to your project.


## Example Configuration

The following is a typical example of a configuration file. The values nested under `params:` will populate the `.Site.Params` variable for use in templates:

{{< code-toggle file="config">}}
baseURL: "https://yoursite.example.com/"
title: "My Hugo Site"
footnoteReturnLinkContents: "↩"
permalinks:
  posts: /:year/:month/:title/
params:
  Subtitle: "Hugo is Absurdly Fast!"
  AuthorName: "Jon Doe"
  GitHubUser: "spf13"
  ListOfFoo:
    - "foo1"
    - "foo2"
  SidebarRecentLimit: 5
{{< /code-toggle >}}

## Configure with Environment Variables

In addition to the 3 config options already mentioned, configuration key-values can be defined through operating system environment variables.

For example, the fol lowing command will effectively set a website's title on Unix-like systems:

```
$ env HUGO_TITLE="Some Title" hugo
```

## Ignore Content and Data Files when Rendering

To exclude specific files from the content and data directories when rendering your site, set `ignoreFiles` to one or more regular expressions.

For example, to ignore content and data files ending with `.foo` and `.boo`:

{{< code-toggle >}}
ignoreFiles = [ "\\.foo$","\\.boo$"]
{{< /code-toggle >}}

## Configure Front Matter

### Configure Dates

Dates are important in Hugo, and you can configure how Hugo assigns dates to your content pages. You do this by adding a `frontmatter` section to your `config.toml`.


The default configuration is:

{{< code-toggle file="config" >}}
[frontmatter]
date = ["date", "publishDate", "lastmod"]
lastmod = [":git", "lastmod", "date", "publishDate"]
publishDate = ["publishDate", "date"]
expiryDate = ["expiryDate"]
{{< /code-toggle >}}

If you, as an example, have a non-standard date parameter in some of your content, you can override the setting for `date`:

{{< code-toggle file="config" >}}
[frontmatter]
date = ["myDate", ":default"]
{{< /code-toggle >}}

The `:default` is a shortcut to the default settings. The above will set `.Date` to the date value in `myDate` if present, if not we will look in `date`,`publishDate`, `lastmod` and pick the first valid date.

In the list to the right, values starting with ":" are date handlers with a special meaning (see below). The others are just names of date parameters (case insensitive) in your front matter configuration.  Also note that Hugo have some built-in aliases to the above: `lastmod` => `modified`, `publishDate` => `pubdate`, `published` and `expiryDate` => `unpublishdate`. With that, as an example, using `pubDate` as a date in front matter, will, by default, be assigned to `.PublishDate`.

The special date handlers are:

`:fileModTime`
: Fetches the date from the content file's last modification timestamp.

An example:

{{< code-toggle file="config" >}}
[frontmatter]
lastmod = ["lastmod", ":fileModTime", ":default"]
{{< /code-toggle >}}


The above will try first to extract the value for `.Lastmod` starting with the `lastmod` front matter parameter, then the content file's modification timestamp. The last, `:default` should not be needed here, but Hugo will finally look for a valid date in `:git`, `date` and then `publishDate`.


`:filename`
: Fetches the date from the content file's filename. For example, `2018-02-22-mypage.md` will extract the date `2018-02-22`. Also, if `slug` is not set, `mypage` will be used as the value for `.Slug`.

An example:

{{< code-toggle file="config" >}}
[frontmatter]
date  = [":filename", ":default"]
{{< /code-toggle >}}

The above will try first to extract the value for `.Date` from the filename, then it will look in front matter parameters `date`, `publishDate` and lastly `lastmod`.


`:git`
: This is the Git author date for the last revision of this content file. This will only be set if `--enableGitInfo` is set or `enableGitInfo = true` is set in site config.

<!-- ## Global site parameters

On top of [Hugo global configuration](https://gohugo.io/overview/configuration/), **Docco** lets you define the following parameters in your `config.toml` (here, values are default).

Note that some of these parameters are explained in details in other sections of this documentation.

```toml
[params]
  # Prefix URL to edit current page. Will display an "Edit this page" button on top right hand corner of every page.
  # Useful to give opportunity to people to create merge request for your doc.
  # See the config.toml file from this documentation site to have an example.
  editURL = ""
  # Author of the site, will be used in meta information
  author = ""
  # Description of the site, will be used in meta information
  description = ""
  # Shows a checkmark for visited pages on the menu
  showVisitedLinks = false
  # Disable search function. It will hide search bar
  disableSearch = false
  # Javascript and CSS cache are automatically busted when new version of site is generated.
  # Set this to true to disable this behavior (some proxies don't handle well this optimization)
  disableAssetsBusting = false
  # Set this to true to disable copy-to-clipboard button for inline code.
  disableInlineCopyToClipBoard = false
  # A title for shortcuts in menu is set by default. Set this to true to disable it.
  disableShortcutsTitle = false
  # When using mulitlingual website, disable the switch language button.
  disableLanguageSwitchingButton = false
  # Hide breadcrumbs in the header and only show the current page title
  disableBreadcrumb = true
  # Hide Next and Previous page buttons normally displayed full height beside content
  disableNextPrev = true
  # Order sections in menu by "weight" or "title". Default to "weight"
  ordersectionsby = "weight"
  # Change default color scheme with a variant one. Can be "red", "blue", "green".
  themeVariant = ""
  # Provide a list of custom css files to load relative from the `static/` folder in the site root.
  custom_css = ["css/foo.css", "css/bar.css"]
```

## Activate search

If not already present, add the follow lines in the same `config.toml` file.

```toml
[outputs]
home = [ "HTML", "RSS", "JSON"]
```

Docco uses the last improvement available in hugo version 20+ to generate a json index file ready to be consumed by lunr.js javascript search engine.

> Hugo generate lunrjs index.json at the root of public folder.
> When you build the site with `hugo server`, hugo generates it internally and of course it doesn’t show up in the filesystem.
 -->
