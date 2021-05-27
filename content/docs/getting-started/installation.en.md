---
title: "Installation"
weight: 3

summary:
description: 
images: 
  - ""
lastmod: 2017-03-03T14:15:59-06:00
---

Install Hugo on macOS, Windows, Linux, and on any machine where the Go compiler tool chain can run.

Hugo is written in [Go](https://golang.org/) with support for multiple platforms. The latest release can be found at [Hugo Releases](https://github.com/gohugoio/hugo/releases).

Hugo currently provides pre-built binaries for the following:

* macOS (Darwin) for x64, i386, and ARM architectures
* Windows
* Linux


## Quick Install

### Binary (Cross-platform)

Download the appropriate version for your platform from [Hugo Releases](https://github.com/gohugoio/hugo/releases). Once downloaded, the binary can be run from anywhere. You don't need to install it into a global location. This works well for shared hosts and other systems where you don't have a privileged account.

Ideally, you should install it somewhere in your `PATH` for easy use. `/usr/local/bin` is the most probable location.

### Homebrew (macOS)

If you are on macOS and using [Homebrew][brew], you can install Hugo with the following one-liner:

install-with-homebrew.sh

```
brew install hugo
```

For more detailed explanations, read the installation guides that follow for installing on macOS and Windows.

### MacPorts (macOS)

If you are on macOS and using [MacPorts][macports], you can install Hugo with the following one-liner:

install-with-macports.sh

```
port install hugo
```

### Homebrew (Linux)

If you are using [Homebrew](https://docs.brew.sh/Homebrew-on-Linux) on Linux, you can install Hugo with the following one-liner:

install-with-linuxbrew.sh

```
brew install hugo
```

Installation guides for Homebrew on Linux are available on their [website](https://docs.brew.sh/Homebrew-on-Linux).

### Chocolatey (Windows)

If you are on a Windows machine and use [Chocolatey](https://chocolatey.org/) for package management, you can install Hugo with the following one-liner:

install-with-chocolatey.ps1

```
choco install hugo -confirm
```

Or if you need the “extended” Sass/SCSS version:

install-extended-with-chocolatey.ps1

```
choco install hugo-extended -confirm
```

### Scoop (Windows)

If you are on a Windows machine and use [Scoop][] for package management, you can install Hugo with the following one-liner:

```bash
scoop install hugo
```

Or install the extended version with:

```bash
scoop install hugo-extended
```


## macOS

### Step 1: Install `brew` if you haven't already

Go to the `brew` website, <https://brew.sh/>, and follow the directions there. The most important step is the installation from the command line:

install-brew.sh

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### Step 2: Run the `brew` Command to Install `hugo`

Installing Hugo using `brew` is as easy as the following:

install-brew.sh

```
brew install hugo
```

```
==> Downloading https://homebrew.bintray.com/bottles/hugo-0.21.sierra.bottle.tar.gz
######################################################################### 100.0%
==> Pouring hugo-0.21.sierra.bottle.tar.gz
🍺  /usr/local/Cellar/hugo/0.21: 32 files, 17.4MB
```

{{% note "Installing the Latest Hugo with Brew" %}}
Replace `brew install hugo` with `brew install hugo --HEAD` if you want the absolute latest in-development version.
{{% /note %}}

`brew` should have updated your path to include Hugo. You can confirm by opening a new terminal window and running a few commands:

```
$ # show the location of the hugo executable
which hugo
/usr/local/bin/hugo

# show the installed version
ls -l $( which hugo )
lrwxr-xr-x  1 mdhender admin  30 Mar 28 22:19 /usr/local/bin/hugo -> ../Cellar/hugo/0.13_1/bin/hugo

# verify that hugo runs correctly
hugo version
Hugo Static Site Generator v0.13 BuildDate: 2015-03-09T21:34:47-05:00
```

## Window

The following aims to be a complete guide to installing Hugo on your Windows PC.

### Assumptions

1. You will use `C:\Hugo\Sites` as the starting point for your new project.
2. You will use `C:\Hugo\bin` to store executable files.

### Set up Your Directories

You'll need a place to store the Hugo executable, your [content][], and the generated Hugo website:

1. Open Windows Explorer.
2. Create a new folder: `C:\Hugo`, assuming you want Hugo on your C drive, although this can go anywhere
3. Create a subfolder in the Hugo folder: `C:\Hugo\bin`
4. Create another subfolder in Hugo: `C:\Hugo\Sites`

### Technical Users

1. Download the latest zipped Hugo executable from [Hugo Releases][releases].
2. Extract all contents to your `..\Hugo\bin` folder.
3. In PowerShell or your preferred CLI, add the `hugo.exe` executable to your PATH by navigating to `C:\Hugo\bin` (or the location of your hugo.exe file) and use the command `set PATH=%PATH%;C:\Hugo\bin`. If the `hugo` command does not work after a reboot, you may have to run the command prompt as administrator.

### Less-technical Users

1. Go to the [Hugo Releases](https://github.com/gohugoio/hugo/releases) page.
2. The latest release is announced on top. Scroll to the bottom of the release announcement to see the downloads. They're all ZIP files.
3. Find the Windows files near the bottom (they're in alphabetical order, so Windows is last) – download either the 32-bit or 64-bit file depending on whether you have 32-bit or 64-bit Windows. (If you don't know, [see here](https://esupport.trendmicro.com/en-us/home/pages/technical-support/1038680.aspx).)
4. Move the ZIP file into your `C:\Hugo\bin` folder.
5. Double-click on the ZIP file and extract its contents. Be sure to extract the contents into the same `C:\Hugo\bin` folder – Windows will do this by default unless you tell it to extract somewhere else.
6. You should now have three new files: The hugo executable (`hugo.exe`), `LICENSE`, and `README.md`.

Now you need to add Hugo to your Windows PATH settings:

#### For Windows 10 Users:

* Right click on the **Start** button.
* Click on **System**.
* Click on **Advanced System Settings** on the left.
* Click on the **Environment Variables...** button on the bottom.
* In the User variables section, find the row that starts with PATH (PATH will be all caps).
* Double-click on **PATH**.
* Click the **New...** button.
* Type in the folder where `hugo.exe` was extracted, which is `C:\Hugo\bin` if you went by the instructions above. *The PATH entry should be the folder where Hugo lives and not the binary.* Press <kbd>Enter</kbd> when you're done typing.
* Click OK at every window to exit.

### Verify the Executable

Run a few commands to verify that the executable is ready to run, and then build a sample site to get started.

#### 1. Open a Command Prompt

At the prompt, type `hugo help` and press the <kbd>Enter</kbd> key. You should see output that starts with:

```
hugo is the main command, used to build your Hugo site.

Hugo is a Fast and Flexible Static Site Generator
built with love by spf13 and friends in Go.

Complete documentation is available at https://gohugo.io/.
```

If you do, then the installation is complete. If you don't, double-check the path that you placed the `hugo.exe` file in and that you typed that path correctly when you added it to your `PATH` variable. If you're still not getting the output, search the [Hugo discussion forum][forum] to see if others have already figured out our problem. If not, add a note---in the "Support" category---and be sure to include your command and the output.

At the prompt, change your directory to the `Sites` directory.

```
C:\Program Files> cd C:\Hugo\Sites
C:\Hugo\Sites>
```

#### 2. Run the Command

Run the command to generate a new site. I'm using `example.com` as the name of the site.

```
C:\Hugo\Sites> hugo new site example.com
```

You should now have a directory at `C:\Hugo\Sites\example.com`. Change into that directory and list the contents. You should get output similar to the following:

```
C:\Hugo\Sites> cd example.com
C:\Hugo\Sites\example.com> dir
Directory of C:\hugo\sites\example.com

04/13/2015  10:44 PM    <DIR>          .
04/13/2015  10:44 PM    <DIR>          ..
04/13/2015  10:44 PM    <DIR>          archetypes
04/13/2015  10:44 PM                83 config.toml
04/13/2015  10:44 PM    <DIR>          content
04/13/2015  10:44 PM    <DIR>          data
04/13/2015  10:44 PM    <DIR>          layouts
04/13/2015  10:44 PM    <DIR>          static
               1 File(s)             83 bytes
               7 Dir(s)   6,273,331,200 bytes free
```

## Linux

### Snap Package

In any of the [Linux distributions that support snaps][snaps], you may install the "extended" Sass/SCSS version with this command:

    snap install hugo --channel=extended

To install the non-extended version without Sass/SCSS support:

    snap install hugo

To switch between the two, use either `snap refresh hugo --channel=extended` or `snap refresh hugo --channel=stable`.

{{% note %}}
Hugo installed via Snap can write only inside the user’s `$HOME` directory---and gvfs-mounted directories owned by the user---because of Snaps’ confinement and security model. More information is also available [in this related GitHub issue](https://github.com/gohugoio/hugo/issues/3143).
{{% /note %}}

## Upgrade Hugo

Upgrading Hugo is as easy as downloading and replacing the executable you’ve placed in your `PATH` or run `brew upgrade hugo` if using Homebrew.


<!-- The following steps are here to help you initialize your new website. If you don’t know Hugo at all, we strongly suggest you learn more about it by following this [great documentation for beginners](https://gohugo.io/getting-started/quick-start/).

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

### macOS

Install Hugo using [Brew](https://gohugo.io/getting-started/installing/#homebrew-macos).

### As an `npm` module

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
A `public` folder will be generated, containing all static content and assets for your website. It can now be deployed on any web server. -->