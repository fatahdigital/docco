---
title: "Multilingual Mode"
summary: "Hugo supports the creation of websites with multiple languages side by side." 
description: "Hugo supports the creation of websites with multiple languages side by side."
weight: 21
lastmod: 2017-03-03T14:15:59-06:00
---

<!-- Hugo supports the creation of websites with multiple languages side by side.

> Also See [Hugo Multilingual Part 1: Content translation](https://regisphilibert.com/blog/2018/08/hugo-multilingual-part-1-managing-content-translation/)

## Configure Languages

The following is an example of a site configuration for a multilingual Hugo project:

{{< code-toggle file="config" >}}
defaultContentLanguage = "en"
copyright = "Everything is mine"

[params]
[params.navigation]
help  = "Help"

[languages]
[languages.en]
title = "My blog"
weight = 1
[languages.en.params]
linkedin = "https://linkedin.com/whoever"

[languages.fr]
title = "Mon blogue"
weight = 2
[languages.fr.params]
linkedin = "https://linkedin.com/fr/whoever"
[languages.fr.params.navigation]
help  = "Aide"

[languages.ar]
title = "مدونتي"
weight = 2
languagedirection = "rtl"

[languages.pt-pt]
title = "O meu blog"
weight = 3
{{< /code-toggle >}}

Anything not defined in a `languages` block will fall back to the global value for that key (e.g., `copyright` for the English `en` language). This also works for `params`, as demonstrated with `help` above: You will get the value `Aide` in French and `Help` in all the languages without this parameter set.

With the configuration above, all content, sitemap, RSS feeds, paginations,
and taxonomy pages will be rendered below `/` in English (your default content language) and then below `/fr` in French.

When working with front matter `Params` in [single page templates](/en/docs/template/single-page-template), omit the `params` in the key for the translation.

`defaultContentLanguage` sets the project's default language. If not set, the default language will be `en`.

If the default language needs to be rendered below its own language code (`/en`) like the others, set `defaultContentLanguageInSubdir: true`.

Only the obvious non-global options can be overridden per language. Examples of global options are `baseURL`, `buildDrafts`, etc.

**Please note:** use lowercase language codes, even when using regional languages (ie. use pt-pt instead of pt-PT). Currently Hugo language internals lowercase language codes, which can cause conflicts with settings like `defaultContentLanguage` which are not lowercased.

### Disable a Language

You can disable one or more languages. This can be useful when working on a new translation.

{{< code-toggle file="config" >}}
disableLanguages = ["fr", "ja"]
{{< /code-toggle >}}

Note that you cannot disable the default content language.

We kept this as a standalone setting to make it easier to set via OS environment:

```bash
HUGO_DISABLELANGUAGES="fr ja" hugo
```
If you have already a list of disabled languages in `config.toml`, you can enable them in development like this:

```bash
HUGO_DISABLELANGUAGES=" " hugo server
```
### Configure Multilingual Multihost

From **Hugo 0.31** we support multiple languages in a multihost configuration.

This means that you can now configure a `baseURL` per `language`:

> If a `baseURL` is set on the `language` level, then all languages must have one and they must all be different.

Example:

{{< code-toggle file="config" >}}
[languages]
[languages.fr]
baseURL = "https://example.fr"
languageName = "Français"
weight = 1
title = "En Français"

[languages.en]
baseURL = "https://example.com"
languageName = "English"
weight = 2
title = "In English"
{{</ code-toggle >}}

With the above, the two sites will be generated into `public` with their own root:

```bash
public
├── en
└── fr
```

**All URLs (i.e `.Permalink` etc.) will be generated from that root. So the English home page above will have its `.Permalink` set to `https://example.com/`.**

When you run `hugo server` we will start multiple HTTP servers. You will typically see something like this in the console:

```bash
Web Server is available at 127.0.0.1:1313 (bind address 127.0.0.1)
Web Server is available at 127.0.0.1:1314 (bind address 127.0.0.1)
Press Ctrl+C to stop
```

Live reload and `--navigateToChanged` between the servers work as expected.

### Taxonomies and Blackfriday

Taxonomies and [Blackfriday configuration](/en/docs/getting-started/configration/) can also be set per language:


{{< code-toggle file="config" >}}
[Taxonomies]
tag = "tags"

[blackfriday]
angledQuotes = true
hrefTargetBlank = true

[languages]
[languages.en]
weight = 1
title = "English"
[languages.en.blackfriday]
angledQuotes = false

[languages.fr]
weight = 2
title = "Français"
[languages.fr.Taxonomies]
plaque = "plaques"
{{</ code-toggle >}}

## Translate Your Content

There are two ways to manage your content translations. Both ensure each page is assigned a language and is linked to its counterpart translations.

### Translation by filename

Considering the following example:

1. `/content/about.en.md`
2. `/content/about.fr.md`

The first file is assigned the English language and is linked to the second.
The second file is assigned the French language and is linked to the first.

Their language is __assigned__ according to the language code added as a __suffix to the filename__. 

By having the same **path and base filename**, the content pieces are __linked__ together as translated pages.

{{< note >}}
If a file has no language code, it will be assigned the default language.
{{</ note >}}

### Translation by content directory

This system uses different content directories for each of the languages. Each language's content directory is set using the `contentDir` param.

{{< code-toggle file="config" >}}

languages:
  en:
    weight: 10
    languageName: "English"
    contentDir: "content/english"
  fr:
    weight: 20
    languageName: "Français"
    contentDir: "content/french"

{{< /code-toggle >}}

The value of `contentDir` can be any valid path -- even absolute path references. The only restriction is that the content directories cannot overlap.

Considering the following example in conjunction with the configuration above:

1. `/content/english/about.md`
2. `/content/french/about.md`

The first file is assigned the English language and is linked to the second.
The second file is assigned the French language and is linked to the first.

Their language is __assigned__ according to the content directory they are __placed__ in.

By having the same **path and basename** (relative to their language content directory), the content pieces are __linked__ together as translated pages.

### Bypassing default linking.

Any pages sharing the same `translationKey` set in front matter will be linked as translated pages regardless of basename or location.

Considering the following example:

1. `/content/about-us.en.md`
2. `/content/om.nn.md`
3. `/content/presentation/a-propos.fr.md`

```yaml
# set in all three pages
translationKey: "about"
```

By setting the `translationKey` front matter param to `about` in all three pages, they will be __linked__ as translated pages.

### Localizing permalinks

Because paths and filenames are used to handle linking, all translated pages will share the same URL (apart from the language subdirectory).

To localize the URLs, the `slug` or `url` front matter param can be set in any of the non-default language file. 

For example, a French translation (`content/about.fr.md`) can have its own localized slug.

{{< code-toggle >}}
Title: A Propos
slug: "a-propos"
{{< /code-toggle >}}


At render, Hugo will build both `/about/` and `/fr/a-propos/` while maintaining their translation linking.

{{% note %}}
If using `url`, remember to include the language part as well: `/fr/compagnie/a-propos/`.
{{%/ note %}}

### Page Bundles

To avoid the burden of having to duplicate files, each Page Bundle inherits the resources of its linked translated pages' bundles except for the content files (markdown files, html files etc...).

Therefore, from within a template, the page will have access to the files from all linked pages' bundles.

If, across the linked bundles, two or more files share the same basename, only one will be included and chosen as follows:

* File from current language bundle, if present.
* First file found across bundles by order of language `Weight`.

{{% note %}}
Page Bundle resources follow the same language assignment logic as content files, both by filename (`image.jpg`, `image.fr.jpg`) and by directory (`english/about/header.jpg`, `french/about/header.jpg`).
{{%/ note %}}

## Reference the Translated Content

To create a list of links to translated content, use a template similar to the following:

layouts/partials/i18nlist.html
```
{{ if .IsTranslated }}
<h4>{{ i18n "translations" }}</h4>
<ul>
    {{ range .Translations }}
    <li>
        <a href="{{ .Permalink }}">{{ .Lang }}: {{ .Title }}{{ if .IsPage }} ({{ i18n "wordCount" . }}){{ end }}</a>
    </li>
    {{ end }}
</ul>
{{ end }}
```

The above can be put in a `partial` (i.e., inside `layouts/partials/`) and included in any template, whether a [single content page](/en/docs/template/single-page-template) or the [homepage](/en/docs/template/homepage-template). It will not print anything if there are no translations for a given page.

The above also uses the `i18n` function described in the next section.

### List All Available Languages

`.AllTranslations` on a `Page` can be used to list all translations, including the page itself. On the home page it can be used to build a language navigator:


layouts/partials/allLanguages.html
```
<ul>
{{ range $.Site.Home.AllTranslations }}
<li><a href="{{ .Permalink }}">{{ .Language.LanguageName }}</a></li>
{{ end }}
</ul>
```

## Translation of Strings

Hugo uses go-i18n to support string translations.

Translations are collected from the `themes/<THEME>/i18n/` folder (built into the theme), as well as translations present in `i18n/` at the root of your project. In the `i18n`, the translations will be merged and take precedence over what is in the theme folder.

### Query basic translation

From within your templates, use the `i18n` function like this:

```
{{ i18n "home" }}
```

The function will search for the `"home"` id:

{{< code-toggle file="i18n/en-US" >}}
[home]
other = "Home"
{{< /code-toggle >}}

The result will be

```
Home
```

### Query a flexible translation with variables

Often you will want to use the page variables in the translation strings. To do so, pass the `.` context when calling `i18n`:

```
{{ i18n "wordCount" . }}
```

The function will pass the `.` context to the `"wordCount"` id:

{{< code-toggle file="i18n/en-US" >}}
[wordCount]
other = "This article has {{ .WordCount }} words."
{{< /code-toggle >}}

Assume `.WordCount` in the context has value is 101. The result will be:

```
This article has 101 words.
```

### Query a singular/plural translation

In order to meet singular/plural requirement, you must pass a dictionary (map) with a numeric `.Count` property to the `i18n` function. The below example uses `.ReadingTime` variable which has a built-in `.Count` property.

```
{{ i18n "readingTime" .ReadingTime }}
```

The function will read `.Count` from `.ReadingTime` and evaluate where the number is singular (`one`) or plural (`other`). After that, it will pass to `readingTime` id:

{{< code-toggle file="i18n/en-US" >}}
[readingTime]
one = "One minute to read"
other = "{{.Count}} minutes to read"
{{< /code-toggle >}}

Assume `.ReadingTime.Count` in the context has value of 525600. The result will be:

```
525600 minutes to read
```

If `.ReadingTime.Count` in the context has value is 1. The result is:

```
One minute to read
```

In case you need to pass custom data: (`(dict "Count" 25)` is minimum requirement)

```
{{ i18n "readingTime" (dict "Count" 25 "FirstArgument" true "SecondArgument" false "Etc" "so on, so far") }}
```


## Customize Dates

At the time of this writing, Go does not yet have support for internationalized locales for dates, but if you do some work, you can simulate it. For example, if you want to use French month names, you can add a data file like ``data/mois.yaml`` with this content:

~~~yaml
1: "janvier"
2: "février"
3: "mars"
4: "avril"
5: "mai"
6: "juin"
7: "juillet"
8: "août"
9: "septembre"
10: "octobre"
11: "novembre"
12: "décembre"
~~~

...then index the non-English date names in your templates like so:

~~~html
<time class="post-date" datetime="{{ .Date.Format `2006-01-02T15:04:05Z07:00` | safeHTML }}">
  Article publié le {{ .Date.Day }} {{ index $.Site.Data.mois (printf "%d" .Date.Month) }} {{ .Date.Year }} (dernière modification le {{ .Lastmod.Day }} {{ index $.Site.Data.mois (printf "%d" .Lastmod.Month) }} {{ .Lastmod.Year }})
</time>
~~~

This technique extracts the day, month and year by specifying ``.Date.Day``, ``.Date.Month``, and ``.Date.Year``, and uses the month number as a key, when indexing the month name data file.


## Menus

You can define your menus for each language independently. Creating multilingual menus works just like creating regular menus except they're defined in language-specific blocks in the configuration file:

{{< code-toggle file="config" >}}
defaultContentLanguage = "en"

[languages.en]
weight = 0
languageName = "English"

[[languages.en.menu.main]]
url    = "/"
name   = "Home"
weight = 0


[languages.de]
weight = 10
languageName = "Deutsch"

[[languages.de.menu.main]]
url    = "/"
name   = "Startseite"
weight = 0
{{< /code-toggle >}}

The rendering of the main navigation works as usual. `.Site.Menus` will just contain the menu in the current language. Note that `absLangURL` below will link to the correct locale of your website. Without it, menu entries in all languages would link to the English version, since it's the default content language that resides in the root directory.

```
<ul>
    {{- $currentPage := . -}}
    {{ range .Site.Menus.main -}}
    <li class="{{ if $currentPage.IsMenuCurrent "main" . }}active{{ end }}">
        <a href="{{ .URL | absLangURL }}">{{ .Name }}</a>
    </li>
    {{- end }}
</ul>

```

## Missing Translations

If a string does not have a translation for the current language, Hugo will use the value from the default language. If no default value is set, an empty string will be shown.

While translating a Hugo website, it can be handy to have a visual indicator of missing translations. The `enableMissingTranslationPlaceholders` configuration option will flag all untranslated strings with the placeholder `[i18n] identifier`, where `identifier` is the id of the missing translation.

{{% note %}}
Hugo will generate your website with these missing translation placeholders. It might not be suitable for production environments.
{{% /note %}}

To track down missing translation strings, run Hugo with the `--i18n-warnings` flag:

```
 hugo --i18n-warnings | grep i18n
i18n|MISSING_TRANSLATION|en|wordCount
```

## Multilingual Themes support

To support Multilingual mode in your themes, some considerations must be taken for the URLs in the templates. If there is more than one language, URLs must meet the following criteria:

* Come from the built-in `.Permalink` or `.RelPermalink`
* Be constructed with the `relLangURL` template function or the `absLangURL` template function **OR** be prefixed with `{{ .LanguagePrefix }}`

If there is more than one language defined, the `LanguagePrefix` variable will equal `/en` (or whatever your `CurrentLanguage` is). If not enabled, it will be an empty string (and is therefore harmless for single-language Hugo websites). -->

Hugo handles multilingual perfectly from you content translation to your string localization, everything is simplified so coders and editors alike can focus on the rest.

In this first part, we’ll see how set up your multilingual Hugo project and translate your content!

## Configuring our languages

When undertaking a multilingual project in Hugo, the first thing to do would be to tell Hugo what our supported languages are. For this project, we’ll have three:

1. English
2. French
3. Spanish

So we add the following params to our config file.

{{< code-toggle file="config" >}}
  # config.yaml
    languages:
      en:
      languageName: English
      weight: 1
      fr:
      languageName: Français
      weight: 2
      es:
      languageName: Spanish
      weight: 3
{{< /code-toggle >}}

Now, our languages will be available using .Site.Languages and sorted by Weight. The lower the… firster. As we’ll cover later, it is highly recommanded to make the default language come first.

Any custom parameter will be used when calling .Site.Params or .Param in place of the default site parameter. Se we never have to worry about which parameter to call!

{{< code-toggle file="config" >}}
  # config.yaml
  params:
    description: Everything you need to know about the three languages.
    twitter_handle: 3Languages

  languages:
    en:
    languageName: English
    weight: 1
    fr:
    languageName: Français
    weight: 2
    description: Tous ce que vous avez toujours voulu savoir sur les trois langues.
    twitter_handle: 3Languages_france
    es:
    languageName: Spanish
    weight: 3
    description: Todo lo que necesitas saber sobre los tres idiomas.
    twitter_handle`: 3Languages_espana

{{< /code-toggle >}}

```
<meta name="description" content="{{ .Param "description" }}">
<meta name="twitter:site" content="{{ .Param "twitter_handle" }}">
```

## Translating our pages

To manage your translated content, Hugo offers two different ways. The first one implies including the language code in your content file’s as such: `/content/about.fr.md`. The second one implies creating your file inside a dedicated content directory as such: `/content/french/about.md`

We’ll take a deeper look at how each ways ensure two things :

1. Each page is assigned a language.
2. Each page is linked to its respective translations.

## Managing translations by Filename 

Let’s take a look at our about page, and its translations.

```
content
	├── about.md
	├── about.es.md
	└── about.fr.md
```

Hugo will assign the French language to about.fr.md and the Spanish one to `about.es.md` . Easy guess!

Now what about `about.md`? Well this one, because it lacks any language code will be assigned the default language.

If `DefaultContentLanguage` is not set in your configuration file, the default language will always be English. So for example, if we needed Hugo to assign Spanish to `about.md`, we would have to make this language the default one by adding this line:

{{< code-toggle file="config" >}}
  # config.yaml
  DefaultContentLanguage: es
{{< /code-toggle >}}

## Managing translations by Directory 

It is also possible to assign a different content directory to each of your languages. In order to use this system we would have to include a `contentDir` parameter to our languages configuration.

{{< code-toggle file="config" >}}
  languages:
    en:
    languageName: English
    weight: 1
    contentDir: content/english
    fr:
    languageName: Français
    weight: 2
    contentDir: content/french
    es:
    languageName: Spanish
    weight: 3
    contentDir: content/spanish
{{< /code-toggle >}}

The parameter takes a relative path to your project, or an absolute path. Using an absolute path means the content directories don’t necessarily need to live inside your project, they can be anywhere on your computer.

Going back to our about pages, this is how our content directories would look like:

```
content
    ├── english
    │   └── about.md
	├── french
	│   └── about.md
	└── spanish
	    └── about.md
```

Now, Hugo will assign a language to each of the about pages by looking at which directory they live in.

## Linking our pages 🔗

Translation linking is important.

We usually want to advertise the available translations of a page to our users be it in the form of a language switch menu or some SEO meta tags.

We’ve seen how Hugo assign a language to a particular page, but how will it be able to link pages as translations of each other?

For both systems, Hugo will look at the filename and its location relative to its content directory. So depending on your translation management system, we can check those linkings:

### By Filename	

1. content/about.md	
2. content/about.fr.md	
3. content/about.es.md	
4. content/about/index.md	
5. content/about/index.fr.md	
6. content/a-propos.fr.md	
7. content/company/about.md

### By Directory	

1. content/english/about.md	
2. content/french/about.md	✅
3. content/english/about/index.md	
4. content/french/about/index.md	✅

Note that you can force a linking even if default linking factors don’t match. All you’d have to do is add to your pages a translationKey Front Matter param which share the same value.

```
# From all three pages: about.md, a-propos.fr.md, acerda.es.md
---
translationKey: about
---
```

Now, even though their names won’t match, Hugo will gladly link those pages for you.

### Using linked translations in your template.

Hugo stores the linked translations in two Page variables:

+ Translations, the linked pages.
+ AllTranslations, the linked pages including the current one.

The collections are sorted by language ``Weight` as defined in our configuration file.

So in order to build our alternate meta tags, we would just add this in our `<head>`:

```
  {{ if .IsTranslated }}
    {{ range .Translations }}
    <link rel="alternate" hreflang="{{ .Language.Lang }}" href="{{ .Permalink }}" title="{{ .Language.LanguageName }}">
    {{ end }}
  {{ end }}
```

Some may argue the current translation should also be added as an alternate, in this case, we could use .AllTranslations.

This also works perfectly to build a language menu which will only show up if one or more translations are available.

```
  {{ if .IsTranslated }}
    <nav class="LangNav">
    {{ range .Translations }}
      <a href="{{ .Permalink }}">{{ .Language.LanguageName }}</a>
    {{ end}}
    </nav>
  {{ end }}
```


## Crossing the language barrier with .Sites

It is important to note that Hugo will build as many Sites as languages are set. And each of those are available through the`.Sites` Page property, or the global `site.Sites` one.

We just covered how you could find any translation of a page, but what about a random page from another language, like the french home for example? Well, we can use a typical `range where` on `.Sites` to isolate the french site like so.

```
  {{ $frSite := false}}
  {{ range where .Sites ".Language.Lang" "fr" }}
    {{ $frSite = . }}
  {{ end }}
  {{/* ⛑️ Safely wrap the result in a with clause and voilà: */}}
  {{ with $frSite }}
    <a href="{{ .Home.RelPermalink }}">🏠 Accueil</a>
  {{ end }}
```

## Default at first Site

Often you will need to refer to your default language’s Site and for this, with the proper config, .Sites.First will be your go-to method.

.Sites.First returns the first Site. Note that this will not necessarily be your default language. Hugo’s first Site is any Site whose Language has the lower Weight value or in absence of any weight set, the one whose language code alphabetically comes first.

To rely on .Sites.First to fetch the default language, you should do what is expected on any Hugo Multilingual setup and previously mentionned:

1. Set weights on all your languages.
2. Make sure your default has the lower value.
Good! Now you’ll have the default language’s Site at `.Sites.First`

```
  <a href="{{ .Sites.First.Home.RelPermalink }}">🏠 Default Home</a>
  {{ with.Sites.First.GetPage "/in-construction" }}
    <a href="{{ .RelPermalink }}">🏗️ {{ .Title }}</a>
  {{ end }}
```

## Page Bundles

Not only does Hugo make it possible to share resources among translations, it also lets you localize a resource!

Let’s go back to our about pages and turn them into Bundles. For clarity we’ll use the “By Directory” management system.

```
  content
      ├── english
      │   └── about
      │       ├── index.md
    │		└── header.jpg
    ├── spanish
    │	└── about
    │		└── index.md
    └── french
        └── about
            └── index.md
```

For now, every pages share the same `header.jpg`, the one in the English translation. This has nothing to do with it being the default language though.

Hugo help save on duplicates here by making any ressource available to every linked translations. Meaning we can access this header image regardless of the current language using our favorite `.Resources` method, say `.Resources.GetMatch "headers.jpg"`

This is very convenient. But what if we want a header image better aligned with our Spanish audience. How to add a dedicated `header.jpg` for the Spanish page?

By doing exactly that!

```
  content
    ├── english
    │   └── about
    │       ├── index.md
    │		└── header.jpg
    ├── spanish
    │   └── about
    │       ├── index.md
    │		└── header.jpg ✨
    └── french
      └── about
        └── index.md
```

That’s it, when building the Spanish translation of the about page our `.Resources` method will return the Spanish bundle’s very own `header.jpg`.

Well here, Hugo will look at the languages respective `Weight` and return the winners’s file. If we look at our initial configuration file, the French should get the English header.

You should know that any file, content or not, can be renamed to match a language. For this Page Bundle localization, we chose to manage our translations by directory but had we chosen to manage them by filename, this is how our About page’s Bundle would have looked like:

```
  content
	└── about
		├── index.md
		├── index.es.md
		├── index.fr.md
		├── header.jpg
		└── header.es.jpg
```

## Data Files

Contrary to pages resources, Data Files are not language aware. You must therefore create your own minimal solution to store and retrieve localized data files.

Consider the following structure for your data directories where `en` and `fr` are your website’s languages' respective codes.

```
data
  ├── en
  │   └── team.yaml
  └── fr
      └── team.yaml
```
Now from your template:

```
  {{ $data := index .Site.Data .Site.Language.Lang }}
  {{ range $data.team }}
    <a href="{{ .url }}">{{ .name }}</a>
  {{ end }}
```

We use the index function to find the directory in `.Site.Data` which corresponds to the current language’s code. Then we can use `$data` wherever needed in the template file.

## Setting our URLs

By default, Hugo will store your default language pages at the root of your `public` directory and the other languages’ pages below their respective directories. It will generate their URL like any page using their filename.

So quiet logically our About pages would en up at:

+ about/index.html 
+ fr/about/index.html 
+ es/about/index.html

That looks okay though I doubt the SEO team agrees. To make sure the pages’s url mathes their title, we have to update the slug param like the following:

```
  # about.fr.md
  title: À Propos
  slug: a-propos
```

```
  # acerda.es.md
  title: Acerda
  slug: acerda
```

Now we end up with the better looking:

+ fr/a-propos/index.html 
+ es/acerda/index.html 

We could have the default language also live below a directory by simply setting `defaultContentLanguageInSubdirto` ``true` in our `config.yaml`