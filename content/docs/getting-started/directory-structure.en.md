---
title: "Directory Structure"
weight: 4

summary:
description: 
images: 
  - ""
lastmod: 2017-03-03T14:15:59-06:00
---

## New Site Scaffolding

Running the `hugo new site` generator from the command line will create a directory structure with the following elements:

```
.
├── archetypes
├── config.toml
├── content
├── data
├── layouts
├── static
└── themes
```

## Directory Structure Explained

The following is a high-level overview of each of the directories with links to each of their respective sections within the Hugo docs.

### archetypes
You can create new content files in Hugo using the `hugo new` command.

By default, Hugo will create new content files with at least `date`, `title` (inferred from the file name), and `draft = true`. This saves time and promotes consistency for sites using multiple content types. You can create your own [archetypes](/en/docs/getting-started/archetypes) with custom preconfigured front matter fields as well.

### assets

Stores all the files which need be processed by Hugo Pipes. Only the files whose `.Permalink` or `.RelPermalink` are used will be published to the `public` directory. 

Note: assets directory is not created by default.

### config

Hugo ships with a large number of configuration directives.

The config directory is where those directives are stored as JSON, YAML, or TOML files. Every root setting object can stand as its own file and structured by environments.
Projects with minimal settings and no need for environment awareness can use a single `config.toml` file at its root.

Many sites may need little to no configuration, but Hugo ships with a large number of configuration directives for more granular directions on how you want Hugo to build your website. Note: config directory is not created by default.


### content

All content for your website will live inside this directory. Each top-level folder in Hugo is considered a content section. 

For example, if your site has three main sections---`blog` and `tutorials`---you will have three directories at `content/blog` and `content/tutorials`. Hugo uses sections to assign default content types.

### data

This directory is used to store configuration files that can be
used by Hugo when generating your website. You can write these files in YAML, JSON, or TOML format. 

In addition to the files you add to this folder, you can also create data templates that pull from dynamic content.

### layouts

Stores templates in the form of `.html` files that specify how views of your content will be rendered into a static website. Templates include list pages , your homepage, partials, single page templates , and more.

### static

Stores all the static content: images, CSS, JavaScript, etc.

### resources

Caches some files to speed up generation. Can be also used by template authors to distribute built SASS files, so you don't have to have the preprocessor installed. Note: resources directory is not created by default.