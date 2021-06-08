---
title: "Comments"
date: 2017-10-17T15:26:15Z
draft: false
weight: 13
description: "calling custom Shortcodes into your content files."
summary: "calling custom Shortcodes into your content files."
TableOfContents: true
---

Hugo ships with an internal Disqus template, but this isn’t the only commenting system that will work with your new Hugo website.

Hugo ships with support for [Disqus](https://disqus.com/), a third-party service that provides comment and community capabilities to websites via JavaScript.

Your theme may already support Disqus, but if not, it is easy to add to your templates via Hugo's built-in Disqus partialtial.

## Add Disqus

Hugo comes with all the code you need to load Disqus into your templates. Before adding Disqus to your site, you'll need to [set up an account][https://disqus.com/profile/signup/].

### Configure Disqus

Disqus comments require you set a single value in your [site's configuration file][/fr/docs/getting-started/configuration/] like so:

{{< code-toggle copy="false" >}}
disqusShortname = "yourdiscussshortname"
{{</ code-toggle >}}

For many websites, this is enough configuration. However, you also have the option to set the following in the [front matter](/fr/docs/content-and-customization/front-matter) of a single content file:

* `disqus_identifier`
* `disqus_title`
* `disqus_url`

### Render Hugo's Built-in Disqus Partial Template

Disqus has its own internal template available, to render it add the following code where you want comments to appear:

```
{{ template "_internal/disqus.html" . }}
```

## Comments Alternatives

There are a few alternatives to commenting on static sites for those who do not want to use Disqus:

* [Staticman](https://staticman.net/)
* [Talkyard](https://www.talkyard.io/blog-comments) (Open source, & serverless hosting)
* [IntenseDebate](https://intensedebate.com/)
* [Graph Comment](https://graphcomment.com/)
* [Muut](https://muut.com/)
* [Isso](https://posativ.org/isso/) (Self-hosted, Python)
  * [Tutorial on Implementing Isso with Hugo](https://stiobhart.net/2017-02-24-isso-comments/)
* [Utterances](https://utteranc.es/) (Open source, GitHub comments widget built on GitHub issues)
* [Remark](https://github.com/umputun/remark) (Open source, Golang, Easy to run docker)
* [Commento](https://commento.io/) (Open Source, available as a service, local install, or docker image)
* [Hyvor Talk](https://talk.hyvor.com/) (Available as a service)
