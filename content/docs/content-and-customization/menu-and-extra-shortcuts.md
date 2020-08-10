---
title: Menu and Extra Shortcuts
---

# MENU EXTRA SHORTCUTS

You can define additional menu entries or shortcuts in the navigation menu without any link to content.

## Basic configuration

Edit the website configuration `config.toml` and add a `[[menu.shortcuts]]` entry for each link your want to add.

Example from the current website:

```
[[menu.shortcuts]] 
name = "<i class='fab fa-github'></i> Github repo"
identifier = "ds"
url = "https://github.com/matcornic/hugo-theme-learn"
weight = 10

[[menu.shortcuts]]
name = "<i class='fas fa-camera'></i> Showcases"
url = "/showcase"
weight = 11

[[menu.shortcuts]]
name = "<i class='fas fa-bookmark'></i> Hugo Documentation"
identifier = "hugodoc"
url = "https://gohugo.io/"
weight = 20

[[menu.shortcuts]]
name = "<i class='fas fa-bullhorn'></i> Credits"
url = "/credits"
weight = 30
```

By default, shortcuts are preceded by a title. This title can be disabled by setting `disableShortcutsTitle=true`. However, if you want to keep the title but change its value, it can be overriden by changing your local i18n translation string configuration.

For example, in your local `i18n/en.toml` file, add the following content

```
[Shortcuts-Title]
other = "<Your value>"
```
Read more about [hugo menu](https://gohugo.io/extras/menus/) and hugo [i18n translation strings](https://gohugo.io/content-management/multilingual/#menus)