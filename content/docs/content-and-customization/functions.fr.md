---
title: "Functions"
date: 2017-10-17T15:26:15Z
draft: false
weight: 14
description: "calling custom Shortcodes into your content files."
summary: "calling custom Shortcodes into your content files."
---

## .Format

Formats built-in Hugo dates—.Date, .PublishDate, and .Lastmod—according to Go’s layout string.

`.Format` will format date values defined in your front matter and can be used as a property on the following page variables:

* `.PublishDate`
* `.Date`
* `.Lastmod`

Assuming a key-value of `date: 2017-03-03` in a content file's front matter, your can run the date through `.Format` followed by a layout string for your desired output at build time:

```
{{ .PublishDate.Format "January 2, 2006" }} => March 3, 2017
```

For formatting *any* string representations of dates defined in your front matter, The `dateFormat` function, which will still leverage the Go layout string explained below but uses a slightly different syntax.


Hugo templates [format your dates](https://golang.org/pkg/time/) via layout strings that point to a specific reference time:

```
Mon Jan 2 15:04:05 MST 2006
```

While this may seem arbitrary, the numerical value of `MST` is `07`, thus making the layout string a sequence of numbers.

Here is a visual explanation [taken directly from the Go docs](https://golang.org/pkg/time/#example_Time_Format):

```
 Jan 2 15:04:05 2006 MST
=> 1 2  3  4  5    6  -7
```


### Hugo Date and Time Templating Reference

The following examples show the layout string followed by the rendered output.

The examples were rendered and tested in [CST](https://fr.wikipedia.org/wiki/Central_Time_Zone) and all point to the same field in a content file's front matter:

```
date: 2017-03-03T14:15:59-06:00
```

`.Date` (i.e. called via page variable)
: **Returns**: `2017-03-03 14:15:59 -0600 CST`

`"Monday, January 2, 2006"`
: **Returns**: `Friday, March 3, 2017`

`"Mon Jan 2 2006"`
: **Returns**: `Fri Mar 3 2017`

`"January 2006"`
: **Returns**: `March 2017`

`"2006-01-02"`
: **Returns**: `2017-03-03`

`"Monday"`
: **Returns**: `Friday`

`"02 Jan 06 15:04 MST"` (RFC822)
: **Returns**: `03 Mar 17 14:15 CST`

`"02 Jan 06 15:04 -0700"` (RFC822Z)
: **Returns**: `03 Mar 17 14:15 -0600`

`"Mon, 02 Jan 2006 15:04:05 MST"` (RFC1123)
: **Returns**: `Fri, 03 Mar 2017 14:15:59 CST`

`"Mon, 02 Jan 2006 15:04:05 -0700"` (RFC1123Z)
: **Returns**: `Fri, 03 Mar 2017 14:15:59 -0600`

More examples can be found in Go's [documentation for the time package](https://golang.org/pkg/time/#ANSIC).

### Cardinal Numbers and Ordinal Abbreviations

Spelled-out cardinal numbers (e.g. "one", "two", and "three") are not currently supported. 

Ordinal abbreviations (i.e., with shorted suffixes like "1st", "2nd", and "3rd") are not currently directly supported. By using `{{.Date.Format "Jan 2nd 2006"}}`, Hugo assumes you want to append `nd` as a string to the day of the month. However, you can chain functions together to create something like this:

```
{{ .Date.Format "2" }}{{ if in (slice 1 21 31) .Date.Day}}st{{ else if in (slice 2 22) .Date.Day}}nd{{ else if in (slice 3 23) .Date.Day}}rd{{ else }}th{{ end }} of {{ .Date.Format "January 2006" }}
```

This will output:

```
5th of March 2017
```

## .GetPage

Gets a Page of a given path.

{{% note %}}
**Note:** We overhauled and simplified the `.GetPage` API in Hugo 0.45. Before that you needed to provide a `Kind` attribute in addition to the path, e.g. `{{ .Site.GetPage "section" "blog" }}`. This will still work, but is now superflous.
{{% /note %}}

```go-html-template
{{ with .Site.GetPage "/blog" }}{{ .Title }}{{ end }}
```

This method wil return `nil` when no page could be found, so the above will not print anything if the blog section is not found.

To find a regular page in the blog section::

```go-html-template
{{ with .Site.GetPage "/blog/my-post.md" }}{{ .Title }}{{ end }}
```

And since `Page` also provides a `.GetPage` method, the above is the same as:

```go-html-template
{{ with .Site.GetPage "/blog" }}
{{ with .GetPage "my-post.md" }}{{ .Title }}{{ end }}
{{ end }}
```

## .GetPage and Multilingual Sites

The previous examples have used the full content filename to lookup the post. Depending on how you have organized your content (whether you have the language code in the file name or not, e.g. `my-post.en.md`), you may want to do the lookup without extension. This will get you the current language's version of the page:

```go-html-template
{{ with .Site.GetPage "/blog/my-post" }}{{ .Title }}{{ end }}
```

## .GetPage Example

This code snippet---in the form of a partial template ---allows you to do the following:

1. Grab the index object of your `tags`.
2. Assign this object to a variable, `$t`
3. Sort the terms associated with the taxonomy by popularity.
4. Grab the top two most popular terms in the taxonomy (i.e., the two most popular tags assigned to content.

grab-top-two-tags.html
```
<ul class="most-popular-tags">
{{ $t := .Site.GetPage "/tags" }}
{{ range first 2 $t.Data.Terms.ByCount }}
    <li>{{ . }}</li>
{{ end }}
</ul>
```
## `.GetPage` on Page Bundles

If the page retrieved by `.GetPage` is a Leaf Bundle, and you
need to get the nested _**page** resources_ in that, you will need to use the
methods in `.Resources` as explained in the Page Resources section.

## .HasMenuCurrent

`.HasMenuCurrent` is a method in `Page` object returning a _boolean_ value. It
returns `true` if the PAGE is the same object as the `.Page` in one of the
**children menu entries** under MENUENTRY in a given MENU.

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

## .IsMenuCurrent

`.IsMenuCurrent` is a method in `Page` object returning a _boolean_ value. It
returns `true` if the PAGE is the same object as the `.Page` in MENUENTRY in a
given MENU.

The [.IsMenuCurrent](#hasmenucurrent) Example.

## .Param

Calls page or site variables into your template.


In Hugo, you can declare site-wide params (i.e. in your [configuration](/fr/docs/getting-started/configuration/)), as well as params for individual pages.

A common use case is to have a general value for the site and a more specific value for some of the pages (e.g., an image).

You can use the `.Param` method to call these values into your template. The following will first look for an `image` param in a specific content's [front matter](/fr/docs/content-and-customization/front-matter). If not found, Hugo will look for an `image` param in your site's configuration:

```
$.Param "image"
```

{{% note %}}
The `Param` method may not consider empty strings in a content's front matter as "not found." If you are setting preconfigured front matter fields to empty strings using Hugo's archetypes, it may be best to use the `default` function instead of `Param`. See the [related issue on GitHub](https://github.com/gohugoio/hugo/issues/3366).
{{% /note %}}

## .Render

The view is an alternative layout and should be a file name that points to a template in one of the locations specified in the documentation for Content Views.

This function is only available when applied to a single piece of content within a list context.

This example could render a piece of content using the content view located at `/layouts/_default/summary.html`:

```
{{ range .Pages }}
    {{ .Render "summary"}}
{{ end }}
```

## .Scratch

Acts as a “scratchpad” to store and manipulate data.

In most cases you can do okay without `Scratch`, but due to scoping issues, there are many use cases that aren't solvable in Go Templates without `Scratch`'s help.

`.Scratch` is available as methods on `Page` and `Shortcode`. Since Hugo 0.43 you can also create a locally scoped `Scratch` using the template func `newScratch`.

### Contexted .Scratch vs. local newScratch 

Since Hugo 0.43, there are two different ways of using Scratch:

### The Page’s .Scratch 

`.Scratch` is available as a Page method or a Shortcode method and attaches the “scratched” data to the given page. Either a Page or a Shortcode context is required to use `.Scratch`.

```
{{ .Scratch.Set "greeting" "bonjour" }}
{{ range .Pages }}
  {{ .Scratch.Set "greeting" (print "bonjour" .Title) }}
{{ end }}
```

### The local newScratch 

A Scratch instance can also be assigned to any variable using the newScratch function. In this case, no Page or Shortcode context is required and the scope of the scratch is only local. The methods detailed below are available from the variable the Scratch instance was assigned to.

```
{{ $data := newScratch }}
{{ $data.Set "greeting" "hola" }}
```
### Methods 

A Scratch has the following methods:

#### .Set 

Set the value of a given key.

```
{{ $scratch.Set "greeting" "Hello" }}
```

#### .Get 

Get the value of a given key.
```
{{ $scratch.Set "greeting" "Hello" }}
----
{{ $scratch.Get "greeting" }} > Hello
```

#### .Add 

Will add a given value to existing value of the given key. 

For single values, `Add` accepts values that support Go's `+` operator. If the first `Add` for a key is an array or slice, the following adds will be appended to that list.

```
{{ $scratch.Add "greetings" "Hello" }}
{{ $scratch.Add "greetings" "Welcome" }}
----
{{ $scratch.Get "greetings" }} > HelloWelcome
```

```
{{ $scratch.Add "total" 3 }}
{{ $scratch.Add "total" 7 }}
----
{{ $scratch.Get "total" }} > 10
```

```
{{ $scratch.Add "greetings" (slice "Hello") }}
{{ $scratch.Add "greetings" (slice "Welcome" "Cheers") }}
----
{{ $scratch.Get "greetings" }} > []interface {}{"Hello", "Welcome", "Cheers"}
```

#### .SetInMap 

Takes a key, mapKey and value and adds a map of mapKey and value to the given key.

```
{{ $scratch.SetInMap "greetings" "english" "Hello" }}
{{ $scratch.SetInMap "greetings" "french" "Bonjour" }}
----
{{ $scratch.Get "greetings" }} > map[french:Bonjour english:Hello]
```

#### .GetSortedMapValues
Returns array of values from `key` sorted by `mapKey`

```
{{ $scratch.SetInMap "greetings" "english" "Hello" }}
{{ $scratch.SetInMap "greetings" "french" "Bonjour" }}
----
{{ $scratch.GetSortedMapValues "greetings" }} > [Hello Bonjour]
```

#### .Delete 

Remove the given key.
```
{{ $scratch.Set "greeting" "Hello" }}
----
{{ $scratch.Delete "greeting" }}
```

#### .Values 

`Values` returns the raw backing map. Note that you should just use this method on the locally scoped `Scratch` instances you obtain via `newScratch`, not
`.Page.Scratch` etc., as that will lead to concurrency issues.

### Scope
The scope of the backing data is global for the given `Page` or `Shortcode`, and spans partial and shortcode includes.

Note that `.Scratch` from a shortcode will return the shortcode's `Scratch`, which in most cases is what you want. If you want to store it in the page scoped Scratch, then use `.Page.Scratch`.

## .Unix

.Unix returns the local Time corresponding to the given Unix time, sec seconds and nsec nanoseconds since January 1, 1970 UTC.

## Example: Time Passed Since Last Modification

This very simple one-liner uses `now.Unix` to calculate the amount of time that has passed between the `.LastMod` for the current page and the last build of the current page.

time-passed.html
```
{{ div (sub now.Unix .Lastmod.Unix) 86400 }}
```


Since both values are integers, they can be subtracted and then divided by the number of seconds in a day (i.e., `60 * 60 * 24 == 86400`).

{{% note %}}
Hugo's output is *static*. For the example above to be realistic, the site needs to be built every day.
{{% /note %}}

## absLangURL

Adds the absolute URL with correct language prefix according to site configuration for multilingual.

Syntax

```
absLangURL INPUT
```

Both absLangURL and `relLangURL` are similar to their `absURL` and `relURL` relatives but will add the correct language prefix when the site is configured with more than one language.

So for a site  `baseURL` set to `https://example.com/hugo/` and the current language is `en`:

```
{{ "blog/" | absLangURL }} → "https://example.com/hugo/fr/blog/"
{{ "blog/" | relLangURL }} → "/hugo/fr/blog/"
```

## absURL

Creates an absolute URL based on the configured baseURL.

Syntax

```
absURL INPUT
```

Both absURL and relURL consider the configured value of baseURL in your site’s [config file](/fr/docs/getting-started/configuration/). Given a baseURL set to https://example.com/hugo/:

```
{{ "mystyle.css" | absURL }} → "https://example.com/hugo/mystyle.css"
{{ "mystyle.css" | relURL }} → "/hugo/mystyle.css"
{{ "http://gohugo.io/" | relURL }} →  "http://gohugo.io/"
{{ "http://gohugo.io/" | absURL }} →  "http://gohugo.io/"
```
The last two examples may look strange but can be very useful. For example, the following shows how to use `absURL` in [JSON-LD structured data (SEO)](https://developers.google.com/search/docs/guides/intro-structured-data), where some of your images for a piece of content may or may not be hosted locally:

layouts/partials/schemaorg-metadata.html

```
<script type="application/ld+json">
{
    "@context" : "http://schema.org",
    "@type" : "BlogPosting",
    "image" : {{ apply .Params.images "absURL" "." }}
}
</script>
```

The above uses the apply function and also exposes how the Go template parser JSON-encodes objects inside `<script>` tags. 

{{% note "Ending Slash" %}}
`absURL` and `relURL` are smart about missing slashes, but they will *not* add a closing slash to a URL if it is not present.
{{% /note %}}

## after

after slices an array to only the items after the Nth item.

syntax

```
after INDEX COLLECTION
```

The following shows `after` being used in conjunction with the `slice` function:

```
{{ $data := slice "one" "two" "three" "four" }}
{{ range after 2 $data }}
    {{ . }}
{{ end }}
→ ["three", "four"]
```

### Example of `after` with `first`: 2nd&ndash;4th Most Recent Articles


You can use after in combination with the first function and Hugo’s powerful sorting methods. 

Let’s assume you have a list page at example.com/articles. You have 10 articles, but you want your templating for the list/section page to show only two rows:

1. The top row is titled "Featured" and shows only the most recently published article (i.e. by `publishdate` in the content files' front matter).
2. The second row is titled "Recent Articles" and shows only the 2nd- to 4th-most recently published articles.

layouts/section/articles.html

```
{{ define "main" }}
<section class="row featured-article">
  <h2>Featured Article</h2>
  {{ range first 1 .Pages.ByPublishDate.Reverse }}
    <header>
      <h3><a href="{{.Permalink}}">{{.Title}}</a></h3>
    </header>
    <p>{{.Description}}</p>
  {{ end }}
</section>
<div class="row recent-articles">
  <h2>Recent Articles</h2>
  {{ range first 3 (after 1 .Pages.ByPublishDate.Reverse) }}
    <section class="recent-article">
      <header>
          <h3><a href="{{.Permalink}}">{{.Title}}</a></h3>
      </header>
      <p>{{.Description}}</p>
    </section>
  {{ end }}
</div>
{{ end }}
```

## append

append appends one or more values to a slice and returns the resulting slice.

Syntax

```
COLLECTION | append VALUE [VALUE]...
```

```
COLLECTION | append COLLECTION
```

An example appending single values:

```
{{ $s := slice "a" "b" "c" }}
{{ $s = $s | append "d" "e" }}
{{/* $s now contains a []string with elements "a", "b", "c", "d", and "e" */}}

```

The same example appending a slice to a slice:

```
{{ $s := slice "a" "b" "c" }}
{{ $s = $s | append (slice "d" "e") }}
```

The append function works for all types, including Pages.

## apply

Given a map, array, or slice, apply returns a new slice with a function applied over it.

Syntax

```
apply COLLECTION FUNCTION [PARAM...]
```

`apply` expects at least three parameters, depending on the function being applied.

1. The first parameter is the sequence to operate on.
2. The second parameter is the name of the function as a string, which must be the name of a valid [Hugo function](/fr/docs/content-and-customization/functions).
3. After that, the parameters to the applied function are provided, with the string `"."` standing in for each element of the sequence the function is to be applied against.

Here is an example of a content file with names: as a front matter field:

```
+++
names: [ "Derek Perkins", "Joe Bergevin", "Tanner Linsley" ]
+++
```

You can then use `apply` as follows:

```
{{ apply .Params.names "urlize" "." }}
```

Which will result in the following:

```
"derek-perkins", "joe-bergevin", "tanner-linsley"
```

This is *roughly* equivalent to using the following with [range][]:

```
{{ range .Params.names }}{{ . | urlize }}{{ end }}
```

However, it is not possible to provide the output of a range to the `delimit` function, so you need to `apply` it.

If you have `post-tag-list.html` and `post-tag-link.html` as partials you *could* use the following snippets, respectively:

layouts/partials/post-tag-list.html
```
{{ with .Params.tags }}
  <div class="tags-list">
    Tags:
    {{ $len := len . }}
    {{ if eq $len 1 }}
      {{ partial "post-tag-link" (index . 0) }}
    {{ else }}
      {{ $last := sub $len 1 }}
      {{ range first $last . }}
        {{ partial "post-tag-link" . }},
      {{ end }}
      {{ partial "post-tag-link" (index . $last) }}
    {{ end }}
  </div>
{{ end }}
```

layouts/partials/post-tag-link.html
```
<a class="post-tag post-tag-{{ . | urlize }}" href="/tags/{{ . | urlize }}">{{ . }}</a>
```
This works, but the complexity of `post-tag-list.html` is fairly high. The Hugo template needs to perform special behavior for the case where there’s only one tag, and it has to treat the last tag as special. Additionally, the tag list will be rendered something like `Tags: tag1 , tag2 , tag3` because of the way that the HTML is generated and then interpreted by a browser.

This first version of `layouts/partials/post-tag-list.html` separates all of the operations for ease of reading. The combined and DRYer version is shown next:

```
{{ with .Params.tags }}
    <div class="tags-list">
      Tags:
      {{ $sort := sort . }}
      {{ $links := apply $sort "partial" "post-tag-link" "." }}
      {{ $clean := apply $links "chomp" "." }}
      {{ delimit $clean ", " }}
    </div>
{{ end }}
```

Now in the completed version, you can sort the tags, convert the tags to links with `layouts/partials/post-tag-link.html`, chomp off stray newlines, and join the tags together in a delimited list for presentation. Here is an even DRYer version of the preceding example:

layouts/partials/post-tag-list.html
```
  {{ with .Params.tags }}
    <div class="tags-list">
      Tags:
      {{ delimit (apply (apply (sort .) "partial" "post-tag-link" ".") "chomp" ".") ", " }}
    </div>  
  {{ end }}
```

{{% note %}}
`apply` does not work when receiving the sequence as an argument through a pipeline.
{{% /note %}}

## base64

base64Encode and base64Decode let you easily decode content with a base64 encoding and vice versa through pipes.

Syntax

```
base64Decode INPUT
```

```
base64Encode INPUT
```

An example:

base64-input.html
```
<p>Hello world = {{ "Hello world" | base64Encode }}</p>
<p>SGVsbG8gd29ybGQ = {{ "SGVsbG8gd29ybGQ=" | base64Decode }}</p>
```

{{< output file="base-64-output.html" >}}
<p>Hello world = SGVsbG8gd29ybGQ=</p>
<p>SGVsbG8gd29ybGQ = Hello world</p>
{{< /output >}}

You can also pass other data types as arguments to the template function which tries to convert them. The following will convert *42* from an integer to a string because both `base64Encode` and `base64Decode` always return a string.

```
{{ 42 | base64Encode | base64Decode }}
=> "42" rather than 42
```

### base64 with APIs 

Using base64 to decode and encode becomes really powerful if we have to handle
responses from APIs.

```
{{ $resp := getJSON "https://api.github.com/repos/gohugoio/hugo/readme"  }}
{{ $resp.content | base64Decode | markdownify }}
```

The response of the GitHub API contains the base64-encoded version of the [README.md](https://github.com/gohugoio/hugo/blob/master/README.md) in the Hugo repository. Now we can decode it and parse the Markdown. The final output will look similar to the rendered version on GitHub.

## dateFormat

Converts the textual representation of the datetime into the specified format.

Syntax

```
dateFormat LAYOUT INPUT
```

`dateFormat` converts a timestamp string `INPUT` into the format specified by the `LAYOUT` string.

```
{{ dateFormat "Monday, Jan 2, 2006" "2015-01-21" }} → "Wednesday, Jan 21, 2015"
```

The `time` function to convert a timestamp string to a Go `time.Time` type value.

## default

Allows setting a default value that can be returned if a first value is not set.

Syntax

```
default DEFAULT INPUT
```

`default` checks whether a given value is set and returns a default value if it is not. *Set* in this context means different things depending on the data type:

* non-zero for numeric types and times
* non-zero length for strings, arrays, slices, and maps
* any boolean or struct value
* non-nil for any other types

`default` function examples reference the following content page:

content/posts/default-function-example.md

```
---
title: Sane Defaults
seo_title:
date: 2017-02-18
font:
oldparam: The default function helps make your templating DRYer.
newparam:
---
```
`default` can be written in more than one way:

```
{{ index .Params "font" | default "Roboto" }}
{{ default "Roboto" (index .Params "font") }}
```
Both of the above `default` function calls return `Roboto`.

A `default` value, however, does not need to be hard coded like the previous example. The `default` value can be a variable or pulled directly from the front matter using dot notation:

variable-as-default-value.html
```
{{$old := .Params.oldparam }}
<p>{{ .Params.newparam | default $old }}</p>
```

Which would return:

```
<p>The default function helps make your templating DRYer.</p>
```

And then using dot notation

dot-notation-default-value.html
```
<title>{{ .Params.seo_title | default .Title }}</title>
```

Which would return

dot-notation-default-return-value.html

```
<title>Sane Defaults</title>
```

The following have equivalent return values but are far less terse. This demonstrates the utility of `default`:

Using `if`:

if-instead-of-default.html
```
<title>{{if .Params.seo_title}}{{.Params.seo_title}}{{else}}{{.Title}}{{end}}</title>
=> Sane Defaults
```

Using `with`:

with-instead-of-default.html
```
<title>{{with .Params.seo_title}}{{.}}{{else}}{{.Title}}{{end}}</title>
=> Sane Defaults
```

## delimit

Loops through any array, slice, or map and returns a string of all the values separated by a delimiter.

Syntax

```
delimit COLLECTION DELIMIT LAST
```

`delimit` called in your template takes the form of

```
{{ delimit array/slice/map delimiter optionallastdelimiter}}
```

`delimit` loops through any array, slice, or map and returns a string of all the values separated by a delimiter, the second argument in the function call. There is an optional third parameter that lets you choose a different delimiter to go between the last two values in the loop.

To maintain a consistent output order, maps will be sorted by keys and only a slice of the values will be returned.

The examples of `delimit` that follow all use the same front matter:

delimit-example-front-matter.toml
```
+++
title: I love Delimit
tags: [ "tag1", "tag2", "tag3" ]
+++
```

delimit-page-tags-input.html

```
<p>Tags: {{ delimit .Params.tags ", " }}</p>
```

delimit-page-tags-output.html
```
<p>Tags: tag1, tag2, tag3</p>
```

Here is the same example but with the optional "last" delimiter:

delimit-page-tags-final-and-input.html

```
Tags: {{ delimit .Params.tags ", " ", and " }}
```

delimit-page-tags-final-and-output.html
```
<p>Tags: tag1, tag2, and tag3</p>
```

## eq

Returns the boolean truth of arg1 == arg2.

Syntax

```
eq ARG1 ARG2
```

```
{{ if eq .Section "blog" }}current{{ end }}
```

## First

Slices an array to only the first N elements.

Syntax

```
first LIMIT COLLECTION
```

`first` works in a similar manner to the `limit` keyword in SQL. It reduces the array to only the `first N` elements. It takes the array and number of elements as input.

`first` takes two arguments:
1. `number of elements`
2. `array` *or* `slice of maps or structs`

layout/_default/section.html

```
{{ range first 10 .Pages }}
  {{ .Render "summary" }}
{{ end }}
```
*Note: Exclusive to `first`, LIMIT can be '0' to return an empty array.*

## `first` and `where` Together

Using `first` and `where` together can be very
powerful. Below snippet gets a list of posts only from **main sections**, sorts it by the `title` parameter, and then ranges through only the first 5 posts in that list:

first-and-where-together.html

```
{{ range first 5 (where site.RegularPages "Type" "in" site.Params.mainSections).ByTitle }}
   {{ .Content }}
{{ end }}
```

## ge

Returns the boolean truth of arg1 >= arg2.

Syntax

```
ge ARG1 ARG2
```

```
{{ if ge 10 5 }}true{{ end }}
```

## gt

Returns the boolean truth of arg1 > arg2.

Syntax

```
gt ARG1 ARG2
```
```
{{ if gt 10 5 }}true{{ end }}
```

## hugo

The hugo function provides easy access to Hugo-related data.

Syntax

```
hugo
```

`hugo` returns an instance that contains the following functions:

hugo.Generator
: `<meta>` tag for the version of Hugo that generated the site. `hugo.Generator` outputs a *complete* HTML tag; e.g. `<meta name="generator" content="Hugo 0.63.2" />`

hugo.Version
: the current version of the Hugo binary you are using e.g. `0.63.2`

`hugo` returns an instance that contains the following functions:

hugo.Environment
: the current running environment as defined through the `--environment` cli tag

hugo.CommitHash
: the git commit hash of the current Hugo binary e.g. `0e8bed9ccffba0df554728b46c5bbf6d78ae5247`

hugo.BuildDate
: the compile date of the current Hugo binary formatted with RFC 3339 e.g. `2002-10-02T10:00:00-05:00`

hugo.IsExtended 
: whether this is the extended Hugo binary.

hugo.IsProduction
: returns true if `hugo.Environment` is set to the production environment

{{% note "Use the Hugo Generator Tag" %}}
We highly recommend using `hugo.Generator` in your website's `<head>`. `hugo.Generator` is included by default in all themes hosted on [themes.gohugo.io](https://themes.gohugo.io). The generator tag allows the Hugo team to track the usage and popularity of Hugo.
{{% /note %}}

## humanize

Returns the humanized version of an argument with the first letter capitalized.

Syntax

```
humanize INPUT
```

If the input is either an int64 value or the string representation of an integer, humanize returns the number with the proper ordinal appended.

```
{{humanize "my-first-post"}} → "My first post"
{{humanize "myCamelPost"}} → "My camel post"
{{humanize "52"}} → "52nd"
{{humanize 103}} → "103rd"
```

## Image Functions

The images namespace provides a list of filters and other image related functions.

## Image Filters

See [images.Filter](#filter) for how to apply these filters to an image.

### Overlay

{{% funcsig %}}
images.Overlay SRC X Y
{{% /funcsig %}}

Overlay creates a filter that overlays the source image at position x y, e.g:


```go-html-template
{{ $logoFilter := (images.Overlay $logo 50 50 ) }}
{{ $img := $img | images.Filter $logoFilter }}
```

A shorter version of the above, if you only need to apply the filter once:

```go-html-template
{{ $img := $img.Filter (images.Overlay $logo 50 50 )}}
```

The above will overlay `$logo` in the upper left corner of `$img` (at position `x=50, y=50`).

### Brightness

{{% funcsig %}}
images.Brightness PERCENTAGE
{{% /funcsig %}}

Brightness creates a filter that changes the brightness of an image.
The percentage parameter must be in range (-100, 100).

### ColorBalance

{{% funcsig %}}
images.ColorBalance PERCENTAGERED PERCENTAGEGREEN PERCENTAGEBLUE
{{% /funcsig %}}

ColorBalance creates a filter that changes the color balance of an image.
The percentage parameters for each color channel (red, green, blue) must be in range (-100, 500).

### Colorize

{{% funcsig %}}
images.Colorize HUE SATURATION PERCENTAGE
{{% /funcsig %}}

Colorize creates a filter that produces a colorized version of an image.
The hue parameter is the angle on the color wheel, typically in range (0, 360).
The saturation parameter must be in range (0, 100).
The percentage parameter specifies the strength of the effect, it must be in range (0, 100).

### Contrast

{{% funcsig %}}
images.Contrast PERCENTAGE
{{% /funcsig %}}

Contrast creates a filter that changes the contrast of an image.
The percentage parameter must be in range (-100, 100).

### Gamma

{{% funcsig %}}
images.Gamma GAMMA
{{% /funcsig %}}

Gamma creates a filter that performs a gamma correction on an image.
The gamma parameter must be positive. Gamma = 1 gives the original image.
Gamma less than 1 darkens the image and gamma greater than 1 lightens it.

### GaussianBlur

{{% funcsig %}}
images.GaussianBlur SIGMA
{{% /funcsig %}}

GaussianBlur creates a filter that applies a gaussian blur to an image.

### Grayscale

{{% funcsig %}}
images.Grayscale
{{% /funcsig %}}

Grayscale creates a filter that produces a grayscale version of an image.

### Hue

{{% funcsig %}}
images.Hue SHIFT
{{% /funcsig %}}

Hue creates a filter that rotates the hue of an image.
The hue angle shift is typically in range -180 to 180.

### Invert

{{% funcsig %}}
images.Invert
{{% /funcsig %}}

Invert creates a filter that negates the colors of an image.

### Pixelate

{{% funcsig %}}
images.Pixelate SIZE
{{% /funcsig %}}

Pixelate creates a filter that applies a pixelation effect to an image.

### Saturation

{{% funcsig %}}
images.Saturation PERCENTAGE
{{% /funcsig %}}

Saturation creates a filter that changes the saturation of an image.

### Sepia

{{% funcsig %}}
images.Sepia PERCENTAGE
{{% /funcsig %}}

Sepia creates a filter that produces a sepia-toned version of an image.

### Sigmoid

{{% funcsig %}}
images.Sigmoid MIDPOINT FACTOR
{{% /funcsig %}}

Sigmoid creates a filter that changes the contrast of an image using a sigmoidal function and returns the adjusted image.
It's a non-linear contrast change useful for photo adjustments as it preserves highlight and shadow detail.

### UnsharpMask

{{% funcsig %}}
images.UnsharpMask SIGMA AMOUNT THRESHOLD
{{% /funcsig %}}

UnsharpMask creates a filter that sharpens an image.
The sigma parameter is used in a gaussian function and affects the radius of effect.
Sigma must be positive. Sharpen radius roughly equals 3 * sigma.
The amount parameter controls how much darker and how much lighter the edge borders become. Typically between 0.5 and 1.5.
The threshold parameter controls the minimum brightness change that will be sharpened. Typically between 0 and 0.05.

## Other Functions

### Filter

{{% funcsig %}}
IMAGE | images.Filter FILTERS...
{{% /funcsig %}}

Can be used to apply a set of filters to an image:

```go-html-template
{{ $img := $img | images.Filter (images.GaussianBlur 6) (images.Pixelate 8) }}
``

### ImageConfig

Parses the image and returns the height, width, and color model.

{{% funcsig %}}
images.ImageConfig PATH
{{% /funcsig %}}

```
{{ with (imageConfig "favicon.ico") }}
favicon.ico: {{.Width}} x {{.Height}}
{{ end }}
```

## index

Looks up the index(es) or key(s) of the data structure passed into it.

```
index COLLECTION INDEXES
```
```
index COLLECTION KEYS
```

The `index` functions returns the result of indexing its first argument by the following arguments. Each indexed item must be a map or a slice, e.g.:

```
{{ $slice := slice "a" "b" "c" }}
{{ index $slice 1 }} => b
{{ $map := dict "a" 100 "b" 200 }}
{{ index $map "b" }} => 200
```

The function takes multiple indices as arguments, and this can be used to get nested values, e.g.:

```
{{ $map := dict "a" 100 "b" 200 "c" (slice 10 20 30) }}
{{ index $map "c" 1 }} => 20
{{ $map := dict "a" 100 "b" 200 "c" (dict "d" 10 "e" 20) }}
{{ index $map "c" "e" }} => 20
```

## Example: Load Data from a Path Based on Front Matter Params

Assume you want to add a `location = ""` field to your front matter for every article written in `content/vacations/`. You want to use this field to populate information about the location at the bottom of the article in your `single.html` template. You also have a directory in `data/locations/` that looks like the following:

```
.
└── data
    └── locations
        ├── abilene.toml
        ├── chicago.toml
        ├── oslo.toml
        └── provo.toml
```

Here is an example:

data/locations/oslo
```
website = "https://www.oslo.kommune.no"
pop_city = 658390
pop_metro = 1717900
```

The example we will use will be an article on Oslo, whose front matter should be set to exactly the same name as the corresponding file name in `data/locations/`:

```
title = "My Norwegian Vacation"
location = "oslo"
```

The content of `oslo.toml` can be accessed from your template using the following node path: `.Site.Data.locations.oslo`. However, the specific file you need is going to change according to the front matter.

This is where the `index` function is needed. `index` takes 2 parameters in this use case:

1. The node path
2. A string corresponding to the desired data; e.g.&mdash;

```
{{ index .Site.Data.locations “oslo” }}
```

The variable for `.Params.location` is a string and can therefore replace `oslo` in the example above:

```
{{ index .Site.Data.locations .Params.location }}
=> map[website:https://www.oslo.kommune.no pop_city:658390 pop_metro:1717900]
```

Now the call will return the specific file according to the location specified in the content's front matter, but you will likely want to write specific properties to the template. You can do this by continuing down the node path via dot notation (`.`):

```
{{ (index .Site.Data.locations .Params.location).pop_city }}
=> 658390
```
