---
title: "Content Summaries"
summary: "Hugo generates summaries of your content."
description: "Hugo generates summaries of your content."
weight: 22
lastmod: 2017-03-03T14:15:59-06:00
---

With the use of the `.Summary` page variable, Hugo generates summaries of content to use as a short version in summary views.


## Summary Splitting Options

* Automatic Summary Split
* Manual Summary Split
* Front Matter Summary

It is natural to accompany the summary with links to the original content, and a common design pattern is to see this link in the form of a "Read More ..." button. See the `.RelPermalink`, `.Permalink`, and `.Truncated` page variables.

### Automatic Summary Splitting

By default, Hugo automatically takes the first 70 words of your content as its summary and stores it into the `.Summary` page variable for use in your templates. You may customize the summary length by setting `summaryLength` in your [site configuration](/getting-started/configuration/).

{{% note %}}
You can customize how HTML tags in the summary are loaded using functions such as `plainify` and `safeHTML`.
{{% /note %}}

{{% note %}}
The Hugo-defined summaries are set to use word count calculated by splitting the text by one or more consecutive whitespace characters. If you are creating content in a `CJK` language and want to use Hugo's automatic summary splitting, set `hasCJKLanguage` to `true` in your [site configuration](/getting-started/configuration/).
{{% /note %}}

### Manual Summary Splitting

Alternatively, you may add the <code>&#60;&#33;&#45;&#45;more&#45;&#45;&#62;</code> summary divider where you want to split the article. 

For [Org mode content][org], use `# more` where you want to split the article. 

Content that comes before the summary divider will be used as that content's summary and stored in the `.Summary` page variable with all HTML formatting intact.

{{% note "Summary Divider"%}}
The concept of a *summary divider* is not unique to Hugo. It is also called the "more tag" or "excerpt separator" in other literature.
{{% /note %}}

Pros
: Freedom, precision, and improved rendering.  All HTML tags and formatting are preserved.

Cons
: Extra work for content authors, since they need to remember to type <code>&#60;&#33;&#45;&#45;more&#45;&#45;&#62;</code> (or `# more` for [org content][org]) in each content file. This can be automated by adding the summary divider below the front matter of an [archetype](/en/docs/content-and-customization/archetypes/).

### Front Matter Summary

You might want your summary to be something other than the text that starts the article.  In this case you can provide a separate summary in the `summary` variable of the article front matter.

Pros
: Complete freedom of text independent of the content of the article.  Markup can be used within the summary.

Cons
: Extra work for content authors as they need to write an entirely separate piece of text as the summary of the article.

## Summary Selection Order

Because there are multiple ways in which a summary can be specified it is useful to understand the order of selection Hugo follows when deciding on the text to be returned by `.Summary`.  It is as follows:

1. If there is a <code>&#60;&#33;&#45;&#45;more&#45;&#45;&#62;</code> summary divider present in the article the text up to the divider will be provided as per the manual summary split method
2. If there is a `summary` variable in the article front matter the value of the variable will be provided as per the front matter summary method
3. The text at the start of the article will be provided as per the automatic summary split method

## Example: First 10 Articles with Summaries

You can show content summaries with the following code. You could use the following snippet, for example, in a [section template](/en/docs/content-and-customization/section/).

page-list-with-summaries.html
```
{{ range first 10 .Pages }}
    <article>
      <!-- this <div> includes the title summary -->
      <div>
        <h2><a href="{{ .RelPermalink }}">{{ .Title }}</a></h2>
        {{ .Summary }}
      </div>
      {{ if .Truncated }}
      <!-- This <div> includes a read more link, but only if the summary is truncated... -->
      <div>
        <a href="{{ .RelPermalink }}">Read More…</a>
      </div>
      {{ end }}
    </article>
{{ end }}
```

Note how the `.Truncated` boolean variable value may be used to hide the "Read More..." link when the content is not truncated; i.e., when the summary contains the entire article.