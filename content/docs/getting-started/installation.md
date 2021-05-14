---
title: "Installation"
weight: 3

summary:
description: 
images: 
  - ""
lastmod: 2017-03-03T14:15:59-06:00
---

# Installation

The following steps are here to help you initialize your new website. If you don’t know Hugo at all, we strongly suggest you learn more about it by following this [great documentation for beginners](https://gohugo.io/getting-started/quick-start/).

## Create your project

Hugo provides a `new` command to create a new website.

```
hugo new site <new_project>
```
## Install the theme

Install the **Docco** theme by following [this documentation](https://gohugo.io/getting-started/quick-start/#step-3-add-a-theme)

This theme's repository is: https://github.com/fatahdigital/docco

Alternatively, you can [download the theme as .zip](https://github.com/fatahdigital/docco/archive/master.zip) file.

## Install Hugo

You need a [recent extended version](https://github.com/gohugoio/hugo/releases) (we recommend version 0.75.0 or later) of [Hugo](https://gohugo.io/) to do local builds and previews of sites (like this one) that use Docco. If you install from the release page, make sure to get the extended Hugo version, which supports [SCSS](https://sass-lang.com/documentation/syntax); you may need to scroll down the list of releases to see it.

For comprehensive Hugo documentation, see [gohugo.io](https://gohugo.io/).

### Linux

Be careful using sudo apt-get install hugo, as it [doesn’t get you the extended version for all Debian/Ubuntu versions](https://gohugo.io/getting-started/installing/#debian-and-ubuntu), and may not be up-to-date with the most recent Hugo version.

```
hugo version
```

If the result is ```v0.75``` or earlier, or if you don’t see Extended, you’ll need to install the latest version. You can see a complete list of Linux installation options in [Install Hugo](https://gohugo.io/getting-started/installing/#linux). The following shows you how to install Hugo from the release page:

1.  Go to the [Hugo releases](https://github.com/gohugoio/hugo/releases) page.
2.  In the most recent release, scroll down until you find a list of
    **Extended** versions.
3.  Download the latest extended version (`hugo_extended_0.5X_Linux-64bit.tar.gz`).
4.  Create a new directory:

        mkdir hugo

5.  Extract the files you downloaded to `hugo`.

6.  Switch to your new directory:

        cd hugo

7.  Install Hugo:

        sudo install hugo /usr/bin   

#### macOS

Install Hugo using [Brew](https://gohugo.io/getting-started/installing/#homebrew-macos).

#### As an `npm` module

You can install Hugo as an `npm` module using [`hugo-bin`](https://www.npmjs.com/package/hugo-bin). This adds `hugo-bin` to your `node_modules` folder and adds the dependency to your `package.json` file.  To install the extended version of Hugo:

```
npm install hugo-extended --save-dev
```

See the [`hugo-bin` documentation](https://www.npmjs.com/package/hugo-bin) for usage details.

### Install PostCSS

To build or update your site's CSS resources, you also need [`PostCSS`](https://postcss.org/) to create the final assets. If you need to install it, you must have a recent version of [NodeJS](https://nodejs.org/en/) installed on your machine so you can use `npm`, the Node package manager. By default `npm` installs tools under the directory where you run [`npm install`](https://docs.npmjs.com/cli/v6/commands/npm-install#description):

```
sudo npm install -D autoprefixer
sudo npm install -D postcss-cli
```

Starting in [version 8 of `postcss-cli`](https://github.com/postcss/postcss-cli/blob/master/CHANGELOG.md), you must also separately install `postcss`:

```
sudo npm install -D postcss
```

Note that versions of `PostCSS` later than 5.0.1 will not load `autoprefixer` if installed [globally](https://flaviocopes.com/npm-packages-local-global/), you must use a local install.

## Create your first content pages

Create content pages. Here are two ways to create content in the docs Folder:

```
hugo new docs/getting-started/first-content.md
hugo new docs/shortcodes/children/_index.md
```
Feel free to edit thoses files by adding some sample content and replacing the `title` value in the beginning of the files. 

## Launching the website locally

Launch by using the following command:

```
hugo serve
```

Go to `http://localhost:1313`

You should notice three things:

1. You have a left-side **Getting Started** menu, containing two submenus with names equal to the `title` properties in the previously created files.
2. The home page explains how to customize it by following the instructions.
3. When you run `hugo serve`, when the contents of the files change, the page automatically refreshes with the changes. Neat!

## Build the website

When your site is ready to deploy, run the following command:

```
hugo
```
A `public` folder will be generated, containing all static content and assets for your website. It can now be deployed on any web server.