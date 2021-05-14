---
title: "Build in Shortcode"
weight: 20

summary:
description: 
images: 
  - ""
lastmod: 2017-03-03T14:15:59-06:00
---

## Build in Shortcode

### figure

{{< figure src="/images/figure-1.jpeg" title="2 People Sitting With View of Yellow Flowers during Daytime" >}}

## gist

{{< gist spf13 7896402 "img.html" >}} 

## highlight


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

{{< tweet 877500564405444608 >}}

## vimeo
{{< vimeo 146022717 >}}

## youtube
{{< youtube w7Ft2ymGmfc >}}

 