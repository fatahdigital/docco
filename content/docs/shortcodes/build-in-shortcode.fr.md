---
title: "Build in Shortcode"
weight: 20

summary: "Hugo ships with a set of predefined shortcodes that represent very common usage."
description: "Hugo ships with a set of predefined shortcodes that represent very common usage."
images: 
  - ""
lastmod: 2017-03-03T14:15:59-06:00
---
## figure

`figure` is an extension of the image syntax in markdown, which does not provide a shorthand for the more semantic [HTML5 `<figure>` element][figureelement].

The `figure` shortcode can use the following named parameters:

src
: URL of the image to be displayed.

link
: If the image needs to be hyperlinked, URL of the destination.

target
: Optional `target` attribute for the URL if `link` parameter is set.

rel
: Optional `rel` attribute for the URL if `link` parameter is set.

alt
: Alternate text for the image if the image cannot be displayed.

title
: Image title.

caption
: Image caption.  Markdown within the value of `caption` will be rendered.

class
: `class` attribute of the HTML `figure` tag.

height
: `height` attribute of the image.

width
: `width` attribute of the image.

attr
: Image attribution text. Markdown within the value of `attr` will be rendered.

attrlink
: If the attribution text needs to be hyperlinked, URL of the destination.

### Example figure Input



```
{{</* figure src="/media/spf13.jpg" title="Steve Francia" */>}}
```

### Example figure Output

```
<figure>
  <img src="/media/spf13.jpg"  />
  <figcaption>
      <h4>Steve Francia</h4>
  </figcaption>
</figure>
```

{{< figure src="/images/figure-1.jpeg" title="2 People Sitting With View of Yellow Flowers during Daytime" >}}

## gist

{{< gist spf13 7896402 "img.html" >}} 

## highlight

This shortcode will convert the source code provided into syntax-highlighted HTML. Read more on highlighting. highlight takes exactly one required language parameter and requires a closing shortcode.

{{< highlight html >}}
<section id="main">
  <div>
   <h1 id="title">{{ .Title }}</h1>
    {{ range .Data.Pages }}
        {{ .Render "summary"}}
    {{ end }}
  </div>
</section>
{{< /highlight >}}

## tweet

You want to include a single tweet into your blog post? Everything you need is the URL of the tweet:

```
https://twitter.com/spf13/status/877500564405444608
```
Example tweet Input 
Pass the tweet’s ID from the URL as a parameter to the tweet shortcode:

Example tweet Display

{{< tweet 877500564405444608 >}}

## vimeo

Extract the ID from the video’s URL and pass it to the vimeo shortcode:

Example vimeo Display 

Using the preceding vimeo example, the following simulates the displayed experience for visitors to your website. Naturally, the final display will be contingent on your stylesheets and surrounding markup.

{{< vimeo 146022717 >}}

## youtube

The youtube shortcode embeds a responsive video player for YouTube videos. Only the ID of the video is required, e.g.:

```
https://www.youtube.com/watch?v=w7Ft2ymGmfc
```

Example youtube Display 

{{< youtube w7Ft2ymGmfc >}}

 