---
title: "Navigation and Search"
weight: 11

summary: "Customize site navigation and search for your Docco site."
description: "Customize site navigation and search for your Docco site."
images: 
  - ""
lastmod: 2017-03-03T14:15:59-06:00
---

Hugo has a simple yet powerful menu system.

You can do this:

* Place content in one or many menus
* Handle nested menus with unlimited depth
* Create menu entries without being attached to any content
* Distinguish active element (and active branch)

## What is a Menu in Hugo?

A **menu** is a named array of menu entries accessible by name via the `.Site.Menus` site variable. For example, you can access your site's `main` menu via `.Site.Menus.main`.

{{% note "Menus on Multilingual Sites" %}}
If you make use of the [multilingual feature](/en/docs/content-and-customization/multilingual/), you can define language-independent menus.
{{% /note %}}

## Add content to menus

Hugo allows you to add content to a menu via the content’s front matter.

### Simple

If all you need to do is add an entry to a menu, the simple form works well.

#### A Single Menu

```
---
menu: "main"
---
```

#### Multiple Menus

```
---
menu: ["main", "footer"]
---
```

#### Advanced Menus

```
---
menu:
  docs:
    parent: 'extras'
    weight: 20
---
```

## Add Non-content Entries to a Menu

You can also add entries to menus that aren’t attached to a piece of content. This takes place in your Hugo project's `config` file.

Here’s an example snippet pulled from a configuration file:


{{< code-toggle file="config" >}}
[[menu.main]]
    name = "about hugo"
    pre = "<i class='fa fa-heart'></i>"
    weight = -110
    identifier = "about"
    url = "/about/"
[[menu.main]]
    name = "getting started"
    pre = "<i class='fa fa-road'></i>"
    post = "<span class='alert'>New!</span>"
    weight = -100
    url = "/getting-started/"
{{< /code-toggle >}}

{{% note %}}
The URLs must be relative to the context root. If the `baseURL` is `https://example.com/mysite/`, then the URLs in the menu must not include the context root `mysite`. Using an absolute URL will override the baseURL. If the value used for `URL` in the above example is `https://subdomain.example.com/`, the output will be `https://subdomain.example.com`.
{{% /note %}}

## Nesting

All nesting of content is done via the `parent` field.

The parent of an entry should be the identifier of another entry. The identifier should be unique (within a menu).

The following order is used to determine an Identifier:

`.Name > .LinkTitle > .Title`

This means that `.Title` will be used unless `.LinkTitle` is present, etc. In practice, `.Name` and `.Identifier` are only used to structure relationships and therefore never displayed.

In this example, the top level of the menu is defined in your site `config` file. All content entries are attached to one of these entries via the `.Parent` field.

## Params

You can also add user-defined content to menu items via the `params` field. 

A common use case is to define a custom param to add a css class to a specific menu item.

{{< code-toggle file="config" >}}
[[menu.main]]
    name = "about hugo"
    pre = "<i class='fa fa-heart'></i>"
    weight = -110
    identifier = "about"
    url = "/about/"
    [menu.main.params]
      class = "highlight-menu-item"
{{</ code-toggle >}}

## Menu Templates

Menus are a powerful but simple feature for content management but can be easily manipulated in your templates to meet your design needs.

The following is an example:

layouts/partials/sidebar.html

```
<!-- sidebar start -->
<aside>
    <ul>
        {{ $currentPage := . }}
        {{ range .Site.Menus.main }}
            {{ if .HasChildren }}
                <li class="{{ if $currentPage.HasMenuCurrent "main" . }}active{{ end }}">
                    <a href="#">
                        {{ .Pre }}
                        <span>{{ .Name }}</span>
                    </a>
                </li>
                <ul class="sub-menu">
                    {{ range .Children }}
                        <li class="{{ if $currentPage.IsMenuCurrent "main" . }}active{{ end }}">
                            <a href="{{ .URL }}">{{ .Name }}</a>
                        </li>
                    {{ end }}
                </ul>
            {{ else }}
                <li>
                    <a href="{{ .URL }}">
                        {{ .Pre }}
                        <span>{{ .Name }}</span>
                    </a>
                </li>
            {{ end }}
        {{ end }}
        <li>
            <a href="#" target="_blank">Hardcoded Link 1</a>
        </li>
        <li>
            <a href="#" target="_blank">Hardcoded Link 2</a>
        </li>
    </ul>
</aside>
```
{{% note "`absLangURL` and `relLangURL`" %}}
Use the `absLangURL` or `relLangURL` functions if your theme makes use of the multilingual feature. In contrast to `absURL` and `relURL`, these two functions add the correct language prefix to the url.
{{% /note %}}

## Section Menu for Lazy Bloggers

To enable this menu, configure `sectionPagesMenu` in your site `config`:

```
sectionPagesMenu = "main"
```

The menu name can be anything, but take a note of what it is.

This will create a menu with all the sections as menu items and all the sections' pages as "shadow-members". The _shadow_ implies that the pages isn't represented by a menu-item themselves, but this enables you to create a top-level menu like this:

```
<nav class="sidebar-nav">
    {{ $currentPage := . }}
    {{ range .Site.Menus.main }}
    <a class="sidebar-nav-item{{if or ($currentPage.IsMenuCurrent "main" .) ($currentPage.HasMenuCurrent "main" .) }} active{{end}}" href="{{ .URL }}" title="{{ .Title }}">{{ .Name }}</a>
    {{ end }}
</nav>
```

In the above, the menu item is marked as active if on the current section's list page or on a page in that section.

## Site Config menus

The above is all that's needed. But if you want custom menu items, e.g. changing weight, name, or link title attribute, you can define them manually in the site config file:

{{< code-toggle file="config" >}}
[[menu.main]]
    name = "This is the blog section"
    title = "blog section"
    weight = -110
    identifier = "blog"
    url = "/blog/"
{{</ code-toggle >}}

{{% note %}}
The `identifier` *must* match the section name.
{{% /note %}}

## Menu Entries from the Page's front matter

It's also possible to create menu entries from the page (i.e. the `.md`-file).

Here is a `yaml` example:

```
---
title: Menu Templates
linktitle: Menu Templates
menu:
  docs:
    title: "how to use menus in templates"
    parent: "templates"
    weight: 130
---
...
```

{{% note %}}
You can define more than one menu. It also doesn't have to be a complex value,
`menu` can also be a string, an array of strings, or an array of complex values
like in the example above.
{{% /note %}}

### Using .Page in Menus

If you use the front matter method of defining menu entries, you'll get access to the `.Page` variable.
This allows to use every variable that's reachable from the page variable.

This variable is only set when the menu entry is defined in the page's front matter.
Menu entries from the site config don't know anything about `.Page`.

That's why you have to use the go template's `with` keyword or something similar in your templating language.

Here's an example:

```
<nav class="sidebar-nav">
  {{ range .Site.Menus.main }}
    <a href="{{ .URL }}" title="{{ .Title }}">
      {{- .Name -}}
      {{- with .Page -}}
        <span class="date">
        {{- dateFormat " (2006-01-02)" .Date -}}
        </span>
      {{- end -}}
    </a>
  {{ end }}
</nav>
```

## Using .Params in Menus

User-defined content on menu items are accessible via `.Params`.

Here's an example:

```
<nav class="sidebar-nav">
  {{ range .Site.Menus.main }}
    <a href="{{ .URL }}" title="{{ .Title }}" class="{{ with .Params.class }}{{ . }}{{ end }}">
      {{- .Name -}}
    </a>
  {{ end }}
</nav>
```

{{% note %}}
With Menu-level .Params they can easily exist on one menu item but not another. It's recommended to access them gracefully using the with function.
{{% /note %}}

## Create Automatic Menu 

```
  {{ $disableShortcutsTitle := .Site.Params.DisableShortcutsTitle}}
  {{with .Site.Menus.shortcuts}}
   
    <h3>{{ if not $disableShortcutsTitle}}{{ T "Shortcuts-Title"}}{{ end }}</h3>
    <ul>
      {{ range sort . "Weight"}}
          <li> 
              {{.Pre}}<a href="{{.URL | absLangURL }}">{{safeHTML .Name}}</a>{{.Post}}
          </li>
      {{end}}
    </ul>
    
  {{end}}

  {{ define "section-tree-nav" }}
    {{ $showvisitedlinks := .showvisitedlinks }}
    {{ $currentNode := .currentnode }}
    {{ $currentFileUniqueID := "" }}
    {{ with $currentNode.File }}{{ $currentFileUniqueID = .UniqueID }}{{ end }}
    {{with .sect}}
      {{if and .IsSection (or (not .Params.hidden) $.showhidden)}}
        {{safeHTML .Params.head}}
        <li data-nav-id="{{.RelPermalink}}" title="{{.Title}}" class="dd-item 
            {{if .IsAncestor $currentNode }}parent{{end}}
            {{if eq .File.UniqueID $currentFileUniqueID}}active{{end}}
            {{if .Params.alwaysopen}}parent{{end}}
            ">
          <a href="{{.RelPermalink}}">
              {{safeHTML .Params.Pre}}{{or .Params.menuTitle .LinkTitle .Title}}{{safeHTML .Params.Post}}
              {{ if $showvisitedlinks}}
                <i>Read</i>
              {{ end }}
          </a>
          {{ $numberOfPages := (add (len .Pages) (len .Sections)) }}
          {{ if ne $numberOfPages 0 }}
            <ul>
              {{ $currentNode.Scratch.Set "pages" .Pages }}
              {{ if .Sections}}
                {{ $currentNode.Scratch.Set "pages" (.Pages | union .Sections) }}
              {{end}}
              {{ $pages := ($currentNode.Scratch.Get "pages") }}
              
            {{if eq .Site.Params.ordersectionsby "title"}}  
              {{ range $pages.ByTitle }}
                {{ if and .Params.hidden (not $.showhidden) }} 
                {{else}}
                {{ template "section-tree-nav" dict "sect" . "currentnode" $currentNode "showvisitedlinks" $showvisitedlinks }}
                {{end}}
              {{ end }}
            {{else}}
              {{ range $pages.ByWeight }}
                {{ if and .Params.hidden (not $.showhidden) }} 
                {{else}}
                {{ template "section-tree-nav" dict "sect" . "currentnode" $currentNode "showvisitedlinks" $showvisitedlinks }}
                {{end}}
              {{ end }}
            {{end}}
            </ul>
          {{ end }}        
        </li>
      {{else}}
        {{ if not .Params.Hidden }}
          <li data-nav-id="{{.RelPermalink}}" title="{{.Title}}" class="dd-item {{if eq .File.UniqueID $currentFileUniqueID}}active{{end}}">
            <a href="{{ .RelPermalink}}">
            {{safeHTML .Params.Pre}}{{or .Params.menuTitle .LinkTitle .Title}}{{safeHTML .Params.Post}}
            {{ if $showvisitedlinks}}<i>Read</i>{{end}}
            </a>
        </li>
        {{ end }}
      {{end}}
    {{ end }}
  {{ end }}
```

## Search for your Hugo Website

Hugo provides an alternative to embeddable scripts from Google or other search engines for static websites. Hugo allows you to provide your visitors with a custom search function by indexing your content files directly.

* [GitHub Gist for Hugo Workflow](https://gist.github.com/sebz/efddfc8fdcb6b480f567). This gist contains a simple workflow to create a search index for your static website. It uses a simple Grunt script to index all your content files and [lunr.js](https://lunrjs.com/) to serve the search results.
* [hugo-elasticsearch](https://www.npmjs.com/package/hugo-elasticsearch). Generate [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html) indexes for Hugo static sites by parsing front matter. Hugo-Elasticsearch will generate a newline delimited JSON (NDJSON) file that can be bulk uploaded into Elasticsearch using any one of the available [clients](https://www.elastic.co/guide/en/elasticsearch/client/index.html).
* [hugo-lunr](https://www.npmjs.com/package/hugo-lunr). A simple way to add site search to your static Hugo site using [lunr.js](https://lunrjs.com/). Hugo-lunr will create an index file of any html and markdown documents in your Hugo project.
* [hugo-lunr-zh](https://www.npmjs.com/package/hugo-lunr-zh). A bit like Hugo-lunr, but Hugo-lunr-zh can help you separate the Chinese keywords.
* [Github Gist for Fuse.js integration](https://gist.github.com/eddiewebb/735feb48f50f0ddd65ae5606a1cb41ae). This gist demonstrates how to leverage Hugo's existing build time processing to generate a searchable JSON index used by [Fuse.js](https://fusejs.io/) on the client side. Although this gist uses Fuse.js for fuzzy matching, any client side search tool capable of reading JSON indexes will work. Does not require npm, grunt or other build-time tools except Hugo!
* [hugo-search-index](https://www.npmjs.com/package/hugo-search-index). A library containing Gulp tasks and a prebuilt browser script that implements search. Gulp generates a search index from project markdown files.
* [hugofastsearch](https://gist.github.com/cmod/5410eae147e4318164258742dd053993). A usability and speed update to "GitHub Gist for Fuse.js integration" — global, keyboard-optimized search.

## Commercial Search Services

* [Algolia](https://www.algolia.com/)'s Search API makes it easy to deliver a great search experience in your apps and websites. Algolia Search provides hosted full-text, numerical, faceted, and geolocalized search.
* [Bonsai](https://www.bonsai.io) is a fully-managed hosted Elasticsearch service that is fast, reliable, and simple to set up. Easily ingest your docs from Hugo into Elasticsearch following [this guide from the docs](https://docs.bonsai.io/docs/hugo).
* [ExpertRec](https://www.expertrec.com/) is a hosted search-as-a-service solution that is fast and scalable. Set-up and integration is extremely easy and takes only a few minutes. The search settings can be modified without coding using a dashboard.

Docco Theme Provide `lurn` search option:

Example:

/layout/prtials/search.html

```
 <div class="searchbox has-search">
    <label for="search-by"><i class="fa fa-search" aria-hidden="true"></i></label>
    <input data-search-input id="search-by" type="search"  placeholder="{{T "Search-placeholder"}}">
    <!-- <span data-search-clear=""  class="hide-clear"><i class="fa fa-times" aria-hidden="true"></i>
    </span> -->
  </div>
  {{ $assetBusting := not .Site.Params.disableAssetsBusting }}
  <script type="text/javascript" src="{{"js/lunr.min.js" | relURL}}{{ if $assetBusting }}?{{ now.Unix }}{{ end }}"></script>
  <script type="text/javascript" src="{{"js/auto-complete.js" | relURL}}{{ if $assetBusting }}?{{ now.Unix }}{{ end }}"></script>
  <script type="text/javascript">
    {{ if .Site.IsMultiLingual }}
        var baseurl = "{{.Site.BaseURL}}{{.Site.LanguagePrefix}}";
    {{ else }}
        var baseurl = "{{.Site.BaseURL}}";
    {{ end }}
  </script>
  <script type="text/javascript" src="{{"js/search.js" | relURL}}{{ if $assetBusting }}?{{ now.Unix }}{{ end }}"></script>
```

Under static/js I created a search.js script. This script does most of the work.

/stactic/js/search.js

```
var lunrIndex, pagesIndex;

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

// Initialize lunrjs using our generated index file
function initLunr() {
    if (!endsWith(baseurl,"/")){
        baseurl = baseurl+'/'
    };

    // First retrieve the index file
    $.getJSON(baseurl +"index.json")
        .done(function(index) {
            pagesIndex = index;
            // Set up lunrjs by declaring the fields we use
            // Also provide their boost level for the ranking
            lunrIndex = lunr(function() {
                this.ref("uri");
                this.field('title', {
		    boost: 15
                });
                this.field('tags', {
		    boost: 10
                });
                this.field("content", {
		    boost: 5
                });
				
                this.pipeline.remove(lunr.stemmer);
                this.searchPipeline.remove(lunr.stemmer);
				
                // Feed lunr with each file and let lunr actually index them
                pagesIndex.forEach(function(page) {
		    this.add(page);
                }, this);
            })
        })
        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.error("Error getting Hugo index file:", err);
        });
}

/**
 * Trigger a search in lunr and transform the result
 *
 * @param  {String} query
 * @return {Array}  results
 */
function search(queryTerm) {
    // Find the item in our index corresponding to the lunr one to have more info
    return lunrIndex.search(queryTerm+"^100"+" "+queryTerm+"*^10"+" "+"*"+queryTerm+"^10"+" "+queryTerm+"~2^1").map(function(result) {
            return pagesIndex.filter(function(page) {
                return page.uri === result.ref;
            })[0];
        });
}

// Let's get started
initLunr();
$( document ).ready(function() {
    var searchList = new autoComplete({
        /* selector for the search box element */
        selector: $("#search-by").get(0),
        /* source is the callback to perform the search */
        source: function(term, response) {
            response(search(term));
        },
        /* renderItem displays individual search results */
        renderItem: function(item, term) {
            var numContextWords = 2;
            var text = item.content.match(
                "(?:\\s?(?:[\\w]+)\\s?){0,"+numContextWords+"}" +
                    term+"(?:\\s?(?:[\\w]+)\\s?){0,"+numContextWords+"}");
            item.context = text;
            return '<div class="autocomplete-suggestion" ' +
                'data-term="' + term + '" ' +
                'data-title="' + item.title + '" ' +
                'data-uri="'+ item.uri + '" ' +
                'data-context="' + item.context + '">' +
                '» ' + item.title +
                '<div class="context">' +
                (item.context || '') +'</div>' +
                '</div>';
        },
        /* onSelect callback fires when a search suggestion is chosen */
        onSelect: function(e, term, item) {
            location.href = item.getAttribute('data-uri');
        }
    });
});
```