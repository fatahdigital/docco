---
title: "Page Organization"
weight: 7
summary: "In Hugo, pages are the core of your site. Once it is configured, pages are definitely the added value to your documentation site."
description: "In Hugo, pages are the core of your site. Once it is configured, pages are definitely the added value to your documentation site."
images: 
  - ""
lastmod: 2017-03-03T14:15:59-06:00
---

Content organization using Page Bundles

A Page Bundle can be one of:

- Leaf Bundle (leaf means it has no children)
- Branch Bundle (home page, section, taxonomy terms, taxonomy list)

|                                     | Leaf Bundle                                              | Branch Bundle                                                                                                                                                                                                      |
|-------------------------------------|----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  |
| Usage                               | Collection of content and attachments for single pages   | Collection of attachments for section pages (home page, section, taxonomy terms, taxonomy list)                                                                                                                    |
| Index file name                     | `index.md` [^fn:1]                                       | `_index.md` [^fn:1]                                                                                                                                                                                                |
| Allowed Resources                   | Page and non-page (like images, pdf, etc.) types         | Only non-page (like images, pdf, etc.) types                                                                                                                                                                       |
| Where can the Resources live?       | At any directory level within the leaf bundle directory. | Only in the directory level **of** the branch bundle directory i.e. the directory containing the `_index.md` ([ref](https://discourse.gohugo.io/t/question-about-content-folder-structure/11822/4?u=kaushalmodi)). |
| Layout type                         | `single`                                                 | `list`                                                                                                                                                                                                             |
| Nesting                             | Does not allow nesting of more bundles under it          | Allows nesting of leaf or branch bundles under it                                                                                                                                                                  |
| Example                             | `content/posts/my-post/index.md`                         | `content/posts/_index.md`                                                                                                                                                                                          |
| Content from non-index page files... | Accessed only as page resources                          | Accessed only as regular pages                                                                                                          
## Leaf Bundles {#leaf-bundles}

A _Leaf Bundle_ is a directory at any hierarchy within the `content/`
directory, that contains an **`index.md`** file.

### Examples of Leaf Bundle organization {#examples-of-leaf-bundle-organization}

```text
content/
├── about
│   ├── index.md
├── posts
│   ├── my-post
│   │   ├── content1.md
│   │   ├── content2.md
│   │   ├── image1.jpg
│   │   ├── image2.png
│   │   └── index.md
│   └── my-other-post
│       └── index.md
│
└── another-section
    ├── ..
    └── not-a-leaf-bundle
        ├── ..
        └── another-leaf-bundle
            └── index.md
```

In the above example `content/` directory, there are four leaf
bundles:

about
: This leaf bundle is at the root level (directly under
    `content` directory) and has only the `index.md`.

my-post
: This leaf bundle has the `index.md`, two other content
    Markdown files and two image files.

image1
: This image is a page resource of `my-post`
    and only available in `my-post/index.md` resources.

image2
: This image is a page resource of `my-post`
    and only available in `my-post/index.md` resources.

my-other-post
: This leaf bundle has only the `index.md`.

another-leaf-bundle
: This leaf bundle is nested under couple of
    directories. This bundle also has only the `index.md`.

{{% note %}}
The hierarchy depth at which a leaf bundle is created does not matter,
as long as it is not inside another **leaf** bundle.
{{% /note %}}

### Headless Bundle {#headless-bundle}

A headless bundle is a bundle that is configured to not get published
anywhere:

-   It will have no `Permalink` and no rendered HTML in `public/`.
-   It will not be part of `.Site.RegularPages`, etc.

But you can get it by `.Site.GetPage`. Here is an example:

```go-html-template
{{ $headless := .Site.GetPage "/some-headless-bundle" }}
{{ $reusablePages := $headless.Resources.Match "author*" }}
<h2>Authors</h2>
{{ range $reusablePages }}
    <h3>{{ .Title }}</h3>
    {{ .Content }}
{{ end }}
```

_In this example, we are assuming the `some-headless-bundle` to be a headless
   bundle containing one or more **page** resources whose `.Name` matches
   `"author*"`._

Explanation of the above example:

1. Get the `some-headless-bundle` Page "object".
2. Collect a *slice* of resources in this *Page Bundle* that matches
   `"author*"` using `.Resources.Match`.
3. Loop through that *slice* of nested pages, and output their `.Title` and
   `.Content`.

---

A leaf bundle can be made headless by adding below in the Front Matter
(in the `index.md`):

```toml
headless = true
```

There are many use cases of such headless page bundles:

-   Shared media galleries
-   Reusable page content "snippets"

## Branch Bundles {#branch-bundles}

A _Branch Bundle_ is any directory at any hierarchy within the
`content/` directory, that contains at least an **`_index.md`** file.

This `_index.md` can also be directly under the `content/` directory.

{{% note %}}
Here `md` (markdown) is used just as an example. You can use any file
type as a content resource as long as it is a content type recognized by Hugo.
{{% /note %}}

### Examples of Branch Bundle organization {#examples-of-branch-bundle-organization}

```text
content/
├── branch-bundle-1
│   ├── branch-content1.md
│   ├── branch-content2.md
│   ├── image1.jpg
│   ├── image2.png
│   └── _index.md
└── branch-bundle-2
    ├── _index.md
    └── a-leaf-bundle
        └── index.md
```

In the above example `content/` directory, there are two branch
bundles (and a leaf bundle):

`branch-bundle-1`
: This branch bundle has the `_index.md`, two
    other content Markdown files and two image files.

`branch-bundle-2`
: This branch bundle has the `_index.md` and a
    nested leaf bundle.

{{% note %}}
The hierarchy depth at which a branch bundle is created does not
matter.
{{% /note %}}

[^fn:1]: The `.md` extension is just an example. The extension can be `.html`, `.json` or any valid MIME type.

<!-- In **Hugo**, pages are the core of your site. Once it is configured, pages are definitely the added value to your documentation site.

## Folders

Organize your site like [any other Hugo project](https://gohugo.io/content/organization/). Typically, you will have a content folder with all your pages.

```
content
    ├── level-one
    │   ├── level-two
    │   │   ├── level-three
    │   │   │   ├── level-four
    │   │   │   │   ├── _index.md       <-- /level-one/level-two/level-three/level-four
    │   │   │   │   ├── page-4-a.md     <-- /level-one/level-two/level-three/level-four/page-4-a
    │   │   │   │   ├── page-4-b.md     <-- /level-one/level-two/level-three/level-four/page-4-b
    │   │   │   │   └── page-4-c.md     <-- /level-one/level-two/level-three/level-four/page-4-c
    │   │   │   ├── _index.md           <-- /level-one/level-two/level-three
    │   │   │   ├── page-3-a.md         <-- /level-one/level-two/level-three/page-3-a
    │   │   │   ├── page-3-b.md         <-- /level-one/level-two/level-three/page-3-b
    │   │   │   └── page-3-c.md         <-- /level-one/level-two/level-three/page-3-c
    │   │   ├── _index.md               <-- /level-one/level-two
    │   │   ├── page-2-a.md             <-- /level-one/level-two/page-2-a
    │   │   ├── page-2-b.md             <-- /level-one/level-two/page-2-b
    │   │   └── page-2-c.md             <-- /level-one/level-two/page-2-c
    │   ├── _index.md                   <-- /level-one
    │   ├── page-1-a.md                 <-- /level-one/page-1-a
    │   ├── page-1-b.md                 <-- /level-one/page-1-b
    │   └── page-1-c.md                 <-- /level-one/page-1-c
    ├── _index.md                       <-- /
    └── page-top.md                     <-- /page-top
```

{{% notice note %}}
`_index.md` is required in each folder, it’s your “folder home page”
{{% /notice %}}

## Types

**Hugo-theme-Docco** defines two types of pages. Default and Chapter. Both can be used at any level of the documentation, the only difference being layout display.

A **Chapter** displays a page meant to be used as introduction for a set of child pages. Commonly, it contains a simple title and a catch line to define content that can be found under it. You can define any HTML as prefix for the menu. In the example below, it’s just a number but that could be an [icon](https://fortawesome.github.io/Font-Awesome/).

```
+++
title = "Basics"
chapter = true
weight = 5
pre = "<b>1. </b>"
+++

### Chapter 1

# Getting Started

Discover what this Hugo theme is all about and the core-concepts behind it.
```

To tell **Hugo-theme-Docco** to consider a page as a chapter, set `chapter=true` in the Front Matter of the page.

A `Default` page is any other content page.

```
+++
title = "Installation"
weight = 3
+++
```

The following steps are here to help you initialize your new website. If you don’t know Hugo at all, we strongly suggest you to train by following this [great documentation for beginners](https://gohugo.io/overview/quickstart/).

## Create your project

Hugo provides a `new` command to create a new website.

```
hugo new site <new_project>
```
**Hugo-theme-Docco** provides archetypes to help you create this kind of pages.

## Front Matter configuration

Each Hugo page has to define a [Front Matter](https://gohugo.io/content/front-matter/) in yaml, toml or json.

**Hugo-theme-learn** uses the following parameters on top of Hugo ones :
```
+++
# Table of content (toc) is enabled by default. Set this parameter to true to disable it.
# Note: Toc is always disabled for chapter pages
disableToc = "false"
# If set, this will be used for the page's menu entry (instead of the `title` attribute)
menuTitle = ""
# The title of the page in menu will be prefixed by this HTML content
pre = ""
# The title of the page in menu will be postfixed by this HTML content
post = ""
# Set the page as a chapter, changing the way it's displayed
chapter = false
# Hide a menu entry by setting this to true
hidden = false
# Display name of this page modifier. If set, it will be displayed in the footer.
LastModifierDisplayName = ""
# Email of this page modifier. If set with LastModifierDisplayName, it will be displayed in the footer
LastModifierEmail = ""
+++
```

## Add icon to a menu entry

In the page frontmatter, add a pre param to insert any HTML code before the menu label. The example below uses the Github icon.

## Ordering sibling menu/page entries

Hugo provides a [flexible way](https://gohugo.io/content/ordering/) to handle order for your pages.

The simplest way is to set `weight` parameter to a number.

```
+++
title = "My page"
weight = 5
+++
```

## Using a custom title for menu entries

By default, Hugo-theme-docco will use a page’s `title` attribute for the menu item (or `linkTitle` if defined).

But a page’s title has to be descriptive on its own while the menu is a hierarchy. We’ve added the `menuTitle` parameter for that purpose:

For example (for a page named `content/install/linux.md`):

```
+++
title = "Install on Linux"
menuTitle = "Linux"
+++
```

## Homepage

To configure your home page, you basically have three choices:

1. Create an `_index.md` document in `content` folder and fill the file with Markdown content
1. Create an `index.html` file in the `static` folder and fill the file with HTML content
1. Configure your server to automatically redirect home page to one your documentation page -->