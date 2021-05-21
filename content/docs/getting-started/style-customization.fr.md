---
title: "Style customization"
weight: 5

summary:
description: 
images: 
  - ""
lastmod: 2017-03-03T14:15:59-06:00
---

**Hugo-theme-Docco** has been built to be as configurable as possible by defining multiple [partials](https://gohugo.io/templates/partials/)

In `docco/layouts/partials/`, you will find all the partials defined for this theme. If you need to overwrite something, don’t change the code directly. Instead [follow this page](https://gohugo.io/themes/customizing/). You’d create a new partial in the `layouts/partials` folder of your local project. This partial will have the priority.

This theme defines the following partials :

+ *header*: the header of the content page (contains the breadcrumbs). *Not meant to be overwritten*
+ *custom-header*: custom headers in page. Meant to be overwritten when adding CSS imports. Don’t forget to include `style` HTML tag directive in your file
+ *footer*: the footer of the content page (contains the arrows). *Not meant to be overwritten*
+ *custom-footer*: custom footer in page. Meant to be overwritten when adding Javacript. Don’t forget to include javascript HTML tag directive in your file
+ *favicon*: the favicon
+ *logo*: the logo, on top left hand corner.
+ *meta*: HTML meta tags, if you want to change default behavior
+ *menu*: left menu. Not meant to be overwritten
+ *menu-footer*: footer of the the left menu
+ *search*: search box
+ *toc*: table of contents

## Change the logo

Create a new file in `layouts/partials/` named `logo.html`. Then write any HTML you want. You could use an `img` HTML tag and reference an image created under the static folder, or you could paste a SVG definition !

{{% notice note %}}
The size of the logo will adapt automatically
{{% /notice %}}

## Change the favicon

If your favicon is a png, just drop off your image in your local static/images/ folder and name it favicon.png

If you need to change this default behavior, create a new file in layouts/partials/ named favicon.html. Then write something like this:

```html
<link rel="shortcut icon" href="/images/favicon.png" type="image/x-icon" />
```
