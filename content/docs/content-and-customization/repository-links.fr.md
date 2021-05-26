---
title: "Repository Links"
weight: 16

summary: "The Docco docs and blog layouts include links for readers to edit the page or create issues for your docs or project via your site’s source repository."
description: "The Docco docs and blog layouts include links for readers to edit the page or create issues for your docs or project via your site’s source repository."
images: 
  - ""
lastmod: 2017-03-03T14:15:59-06:00
---

Help your users interact with your source repository.

The Docco docs and blog layouts include links for readers to edit the page or create issues for your docs or project via your site’s source repository. The current generated links for each docs or blog page are:

+ **Edit this page**: Brings the user to an editable version of the page content in their fork (if available) of your docs repo. If the user doesn’t have a current fork of your docs repo, they are invited to create one before making their edit. The user can then create a pull request for your docs.
+ **Create documentation issue**: Brings the user to a new issue form in your docs repo with the name of the current page as the issue’s title.
+ **Create project issue (optional)**: Brings the user to a new issue form in your project repo. This can be useful if you have separate project and docs repos and your users want to file issues against the project feature being discussed rather than your docs.

This page shows you how to configure these links using your `config.toml` file.

Currently Docco supports only GitHub repository links “out of the box”. If you are using another repository such as Bitbucket and would like generated repository links.

## Link configuration 

There are three variables you can configure in config.toml to set up links:

### github_repo 
The URL for your site’s source repository. This is used to generate the **Edit this page** and **Create documentation issue** links.

```
github_repo = "https://github.com/fatahdigital/docco"
```

### github_subdir (optional)

Specify a value here if your content directory is not in your repo’s root directory. For example, this site is in the userguide subdirectory of its repo. Setting this value means that your edit links will go to the right page.

```
github_subdir = "userguide"
```
### github_project_repo (optional)

Specify a value here if you have a separate project repo and you’d like your users to be able to create issues against your project from the relevant docs. The Create project issue link appears only if this is set.

```
github_project_repo = "https://github.com/fatahdigital/docco"
```

### github_branch (optional) 

Specify a value here if you have would like to reference a different branch for the other github settings like **Edit this page** or **Create project isssue**.

```
github_brach = "release"
```

