---
title: "Analytics"
weight: 17

summary:
description: 
images: 
  - ""
---
# Analytics and User Feedback

Add Google Analytics tracking to your site, use the “was this page helpful?” widget data, disable the widget on a single page or all pages, and change the response text.

## Adding Analytics 

The Docco theme contains built-in support for Google Analytics via Hugo’s internal template, which is included in the theme. Once you set Analytics up as described below, usage information for your site (such as page views) is sent to your Google Analytics account.

### Setup 

1. Ensure you have set up a Google Analytics property for your site: this gives you an Analytics ID to add to your config, which Docco in turn adds to all your site’s pages.
1. Open `config.toml`.
1. Enable Google Analytics by setting the Tracking ID property to your site’s Analytics ID.
```
googleAnalytics = "UA-00000000-0"
```
1. Save and close config.toml.
1. Ensure that your site is built with `HUGO_ENV="production"`, as Docco only adds Analytics tracking to production-ready sites. You can specify this variable as a command line flag to Hugo:
```
$ env HUGO_ENV="production" hugo
```
Alternatively, if you’re using Netlify, you can specify it as a Netlify [deployment setting](https://www.netlify.com/docs/continuous-deployment/#build-environment-variables) in `netlify.toml` or the Netlify UI, along with the Hugo version.


