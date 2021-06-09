---
title: "Data Templates"
summary: "In addition to Hugo's built-in variables, you can specify your own custom data in templates or shortcodes that pull from both local and dynamic sources."
description: "In addition to Hugo's built-in variables, you can specify your own custom data in templates or shortcodes that pull from both local and dynamic sources."
weight: 18
lastmod: 2017-03-03T14:15:59-06:00
---

In addition to Hugo's built-in variables, you can specify your own custom data in templates or shortcodes that pull from both local and dynamic sources.

<!-- begin data files -->

Hugo supports loading data from YAML, JSON, and TOML files located in the `data` directory in the root of your Hugo project.

## The Data Folder

The `data` folder is where you can store additional data for Hugo to use when generating your site. Data files aren't used to generate standalone pages; rather, they're meant to be supplemental to content files. This feature can extend the content in case your front matter fields grow out of control. Or perhaps you want to show a larger dataset in a template (see example below). In both cases, it's a good idea to outsource the data in their own files.

These files must be YAML, JSON, or TOML files (using the `.yml`, `.yaml`, `.json`, or `.toml` extension). The data will be accessible as a `map` in the `.Site.Data` variable.

## Data Files in Themes

Data Files can also be used in Hugo themes but note that theme data files follow the same logic as other template files in the [Hugo lookup order](/fr/docs/template/lookup-order) (i.e., given two files with the same name and relative path, the file in the root project `data` directory will override the file in the `themes/<THEME>/data` directory).

Therefore, theme authors should take care to not include data files that could be easily overwritten by a user who decides to customize a theme. For theme-specific data items that shouldn't be overridden, it can be wise to prefix the folder structure with a namespace; e.g. `mytheme/data/<THEME>/somekey/...`. To check if any such duplicate exists, run hugo with the `-v` flag.

The keys in the map created with data templates from data files will be a dot-chained set of `path`, `filename`, and `key` in file (if applicable).

This is best explained with an example:

## Example: Jaco Pastorius' Solo Discography

[Jaco Pastorius](https://fr.wikipedia.org/wiki/Jaco_Pastorius_discography) was a great bass player, but his solo discography is short enough to use as an example. [John Patitucci](https://fr.wikipedia.org/wiki/John_Patitucci) is another bass giant.

The example below is a bit contrived, but it illustrates the flexibility of data Files. This example uses TOML as its file format with the two following data files:

* `data/jazz/bass/jacopastorius.toml`
* `data/jazz/bass/johnpatitucci.toml`

`jacopastorius.toml` contains the content below. `johnpatitucci.toml` contains a similar list:

{{< code-toggle file="jacopastorius" >}}
discography = [
"1974 – Modern American Music … Period! The Criteria Sessions",
"1974 – Jaco",
"1976 - Jaco Pastorius",
"1981 - Word of Mouth",
"1981 - The Birthday Concert (released in 1995)",
"1982 - Twins I & II (released in 1999)",
"1983 - Invitation",
"1986 - Broadway Blues (released in 1998)",
"1986 - Honestly Solo Live (released in 1990)",
"1986 - Live In Italy (released in 1991)",
"1986 - Heavy'n Jazz (released in 1992)",
"1991 - Live In New York City, Volumes 1-7.",
"1999 - Rare Collection (compilation)",
"2003 - Punk Jazz: The Jaco Pastorius Anthology (compilation)",
"2007 - The Essential Jaco Pastorius (compilation)"
]
{{< /code-toggle >}}

The list of bass players can be accessed via `.Site.Data.jazz.bass`, a single bass player by adding the filename without the suffix, e.g. `.Site.Data.jazz.bass.jacopastorius`.

You can now render the list of recordings for all the bass players in a template:

```
{{ range $.Site.Data.jazz.bass }}
   {{ partial "artist.html" . }}
{{ end }}
```

And then in the `partials/artist.html`:

```
<ul>
{{ range .discography }}
  <li>{{ . }}</li>
{{ end }}
</ul>
```

Discover a new favorite bass player? Just add another `.toml` file in the same directory.

## Example: Accessing Named Values in a Data File

Assume you have the following data structure in your `User0123.[yml|toml|json]` data file located directly in `data/`:

{{< code-toggle file="User0123" >}}
Name: User0123
"Short Description": "He is a **jolly good** fellow."
Achievements:
  - "Can create a Key, Value list from Data File"
  - "Learns Hugo"
  - "Reads documentation"
{{</ code-toggle >}}

You can use the following code to render the `Short Description` in your layout::

```
<div>Short Description of {{.Site.Data.User0123.Name}}: <p>{{ index .Site.Data.User0123 "Short Description" | markdownify }}</p></div>
```

Note the use of the `markdownify` template function. This will send the description through the Blackfriday Markdown rendering engine.

