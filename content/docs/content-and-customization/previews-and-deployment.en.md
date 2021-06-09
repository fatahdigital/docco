---
title: "Previews and Deployment"
weight: 17

summary: "There are multiple possible options for deploying a Hugo site, including Netlify, Firebase Hosting, Bitbucket with Aerobatic, and more; you can read about them all in Hosting and Deployment."
description: "There are multiple possible options for deploying a Hugo site, including Netlify, Firebase Hosting, Bitbucket with Aerobatic, and more; you can read about them all in Hosting and Deployment."
images: 
  - ""
lastmod: 2017-03-03T14:15:59-06:00
---

Deploying your Docco site.

There are multiple possible options for deploying a Hugo site, including Netlify, Firebase Hosting, Bitbucket with Aerobatic, and more; you can read about them all in Hosting and Deployment. Hugo also makes it easy to deploy your site locally for quick previews of your content.

## Assumptions

* You have completed the [Getting Started](/en/docs/getting-started/) or have a Hugo website you are ready to deploy and share with the world.
* You have an account with the service provider ([Google Cloud](https://cloud.google.com/), [AWS](https://aws.amazon.com), or [Azure](https://azure.microsoft.com)) that you want to deploy to.
* You have authenticated.
  * Google Cloud: [Install the CLI](https://cloud.google.com/sdk) and run [`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login).
  * AWS: [Install the CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) and run [`aws configure`](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html).
  * Azure: [Install the CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) and run [`az login`](https://docs.microsoft.com/en-us/cli/azure/authenticate-azure-cli).
  * NOTE: Each service supports alternatives for authentication, including using environment variables. See [here](https://gocloud.dev/howto/blob/#services) for more details.

## Deploy

To deploy to a target:

```bash
hugo deploy [--target=<target name>, defaults to first target]
```

Hugo will identify and apply any local changes that need to be reflected to the
remote target. You can use `--dryRun` to see the changes without applying them,
or `--confirm` to be prompted before making changes.

See `hugo help deploy` for more command-line options.

## Host on Netlify

Netlify can host your Hugo site with CDN, continuous deployment, 1-click HTTPS, an admin GUI, and its own CLI.

[Netlify](https://app.netlify.com/) provides continuous deployment services, global CDN, ultra-fast DNS, atomic deploys, instant cache invalidation, one-click SSL, a browser-based interface, a CLI, and many other features for managing your Hugo website.

## Assumptions

* You have an account with GitHub, GitLab, or Bitbucket.
* You have completed the [Getting Started](/en/docs/getting-started) or have a Hugo website you are ready to deploy and share with the world.
* You do not already have a Netlify account.

## Create a Netlify account

Go to [app.netlify.com](https://app.netlify.com/) and select your preferred signup method. This will likely be a hosted Git provider, although you also have the option to sign up with an email address.

The following examples use GitHub, but other git providers will follow a similar process.

![Screenshot of the homepage for app.netlify.com, containing links to the most popular hosted git solutions.](/images/hosting-on-netlify/netlify-signup.jpg)

Selecting GitHub will bring up an authorization modal for authentication. Select "Authorize application."

![Screenshot of the authorization popup for Netlify and GitHub.](/images/hosting-on-netlify/netlify-first-authorize.jpg)

## Create a New Site with Continuous Deployment

You're now already a Netlify member and should be brought to your new dashboard. Select "New site from git."

![Screenshot of the blank Netlify admin panel with no sites and highlighted 'add new site' button'](/images/hosting-on-netlify/netlify-add-new-site.jpg)

Netlify will then start walking you through the steps necessary for continuous deployment. First, you'll need to select your git provider again, but this time you are giving Netlify added permissions to your repositories.

![Screenshot of step 1 of create a new site for Netlify: selecting the git provider](/images/hosting-on-netlify/netlify-create-new-site-step-1.jpg)

And then again with the GitHub authorization modal:

![Screenshot of step 1 of create a new site for Netlify: selecting the git provider](/images/hosting-on-netlify/netlify-authorize-added-permissions.jpg)

Select the repo you want to use for continuous deployment. If you have a large number of repositories, you can filter through them in real time using repo search:

![Screenshot of step 1 of create a new site for Netlify: selecting the git provider](/images/hosting-on-netlify/netlify-create-new-site-step-2.jpg)

Once selected, you'll be brought to a screen for basic setup. Here you can select the branch you wanted published, your build command, and your publish (i.e. deploy) directory. The publish directory should mirror that of what you've set in your site configuration config, the default of which is `public`. The following steps assume you are publishing from the `master` branch.

## Configure Hugo Version in Netlify

You can [set Hugo version](https://www.netlify.com/blog/2017/04/11/netlify-plus-hugo-0.20-and-beyond/) for your environments in `netlify.toml` file or set `HUGO_VERSION` as a build environment variable in the Netlify console.

For production:

netlify.toml
```
[context.production.environment]
  HUGO_VERSION = "0.82.1"
```

For testing:

netlify.toml
```
[context.deploy-preview.environment]
  HUGO_VERSION = "0.82.1"
```

The Netlify configuration file can be a little hard to understand and get right for the different environment, and you may get some inspiration and tips from this site's `netlify.toml`:

netlify.toml

```
[build]
publish = "public"
command = "hugo --gc --minify"

[context.production.environment]
HUGO_VERSION = "0.83.1"
HUGO_ENV = "production"
HUGO_ENABLEGITINFO = "true"

[context.split1]
command = "hugo --gc --minify --enableGitInfo"

[context.split1.environment]
HUGO_VERSION = "0.83.1"
HUGO_ENV = "production"

[context.deploy-preview]
command = "hugo --gc --minify --buildFuture -b $DEPLOY_PRIME_URL"

[context.deploy-preview.environment]
HUGO_VERSION = "0.83.1"

[context.branch-deploy]
command = "hugo --gc --minify -b $DEPLOY_PRIME_URL"

[context.branch-deploy.environment]
HUGO_VERSION = "0.83.1"

[context.next.environment]
HUGO_ENABLEGITINFO = "true"

```

## Build and Deploy Site

In the Netlify console, selecting "Deploy site" will immediately take you to a terminal for your build:.

![Animated gif of deploying a site to Netlify, including the terminal read out for the build.](/images/hosting-on-netlify/netlify-deploying-site.gif)

Once the build is finished---this should only take a few seconds--you should now see a "Hero Card" at the top of your screen letting you know the deployment is successful. The Hero Card is the first element that you see in most pages. It allows you to see a quick summary of the page and gives access to the most common/pertinent actions and information. You'll see that the URL is automatically generated by Netlify. You can update the URL in "Settings."

![Screenshot of successful deploy badge at the top of a deployments screen from within the Netlify admin.](/images/hosting-on-netlify/netlify-deploy-published.jpg)

![Screenshot of homepage to https://hugo-netlify-example.netlify.com, which is mostly dummy text](/images/hosting-on-netlify/netlify-live-site.jpg)

[Visit the live site](https://hugo-netlify-example.netlify.com/).

Now every time you push changes to your hosted git repository, Netlify will rebuild and redeploy your site.

## Use Hugo Themes with Netlify

The `git clone` method for installing themes is not supported by Netlify. If you were to use `git clone`, it would require you to recursively remove the `.git` subdirectory from the theme folder and would therefore prevent compatibility with future versions of the theme.

A *better* approach is to install a theme as a proper git submodule. You can [read the GitHub documentation for submodules][https://github.com/blog/2104-working-with-submodules] or those found on Git's website][https://git-scm.com/book/en/v2/Git-Tools-Submodules] for more information, but the command is similar to that of `git clone`:

```
cd themes
git submodule add https://github.com/<THEMECREATOR>/<THEMENAME>
```

It is recommended to only use stable versions of a theme (if it’s versioned) and always check the changelog. This can be done by checking out a specific release within the theme's directory.

Switch to the theme's directory and list all available versions:

```
cd themes/<theme>
git tag
# exit with q
```

Switch to the theme's directory and list all available versions:

```
cd themes/<theme>
git tag
# exit with q
```

## Next Steps

You now have a live website served over https, distributed through CDN, and configured for continuous deployment. Dig deeper into the Netlify documentation:

1. [Using a Custom Domain](https://www.netlify.com/docs/custom-domains/)
2. [Setting up HTTPS on Custom Domains](https://www.netlify.com/docs/ssl/)
3. [Redirects and Rewrite Rules](https://www.netlify.com/docs/redirects/)

## Host on AWS Amplify

Develop and deploy a cloud-powered web app with AWS Amplify.

AWS Amplify is a combination of client library, CLI toolchain, and a Console for continuous deployment and hosting. The Amplify CLI and library allow developers to get up & running with full-stack cloud-powered applications with features like authentication, storage, serverless GraphQL or REST APIs, analytics, Lambda functions, & more. The Amplify Console provides continuous deployment and hosting for modern web apps (single page apps and static site generators). Continuous deployment allows developers to deploy updates to their web app on every code commit to their Git repository. Hosting includes features such as globally available CDNs, easy custom domain setup + HTTPS, feature branch deployments, and password protection.

## Pre-requisites

* [Sign up for an AWS Account](https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation). There are no upfront charges or any term commitments to create an AWS account and signing up gives you immediate access to the AWS Free Tier.
* You have an account with GitHub, GitLab, or Bitbucket.
* You have completed the [Quick Start][] or have a Hugo website you are ready to deploy and share with the world.

## Hosting

1. Log in to the [AWS Amplify Console](https://console.aws.amazon.com/amplify/home) and choose Get Started under Deploy.
   ![Hugo Amplify](/images/hosting-on-aws-amplify/amplify-gettingstarted.png)

1. Connect a branch from your GitHub, Bitbucket, GitLab, or AWS CodeCommit repository. Connecting your repository allows Amplify to deploy updates on every code commit to a branch.
   ![Hugo Amplify](/images/hosting-on-aws-amplify/amplify-connect-repo.gif)

1.  Accept the default build settings. The Amplify Console automatically detects your Hugo build settings and output directory.
   ![Hugo Amplify](/images/hosting-on-aws-amplify/amplify-build-settings.png)

1. Review your changes and then choose **Save and deploy**. The Amplify Console will pull code from your repository, build changes to the backend and frontend, and deploy your build artifacts at `https://master.unique-id.amplifyapp.com`. Bonus: Screenshots of your app on different devices to find layout issues.

## Using a Newer Version of Hugo

If you need to use a different, perhaps newer, version of Hugo than the version currently supported by AWS Amplify:

1. Visit the [AWS Amplify Console](https://console.aws.amazon.com/amplify/home), and click the app you would like to modify
1. In the side navigation bar, Under App Settings, click **Build settings**
1. On the Build settings page, near the bottom, there is a section called **Build image settings**. Click **Edit**
1. Under **Live package updates**, click **Add package version override**
1. From the selection, click **Hugo** and ensure the version field says `latest`
1. Click **Save** to save the changes.

## Host on Firebase

You can use Firebase’s free tier to host your static website; this also gives you access to Firebase’s NOSQL API.

## Assumptions

1. You have an account with [Firebase][signup]. (If you don't, you can sign up for free using your Google account.)
2. You have completed the [Quick Start][] or have a completed Hugo website ready for deployment.

## Initial setup

Go to the [Firebase console](https://console.firebase.google.com/) and create a new project (unless you already have a project). You will need to globally install `firebase-tools` (node.js):


```
npm install -g firebase-tools
```

Log in to Firebase (setup on your local machine) using `firebase login`, which opens a browser where you can select your account. Use `firebase logout` in case you are already logged in but to the wrong account.


```
firebase login
```
In the root of your Hugo project, initialize the Firebase project with the `firebase init` command:

```
firebase init
```
From here:

1. Choose Hosting in the feature question
2. Choose the project you just set up
3. Accept the default for your database rules file
4. Accept the default for the publish directory, which is `public`
5. Choose "No" in the question if you are deploying a single-page app

## Deploy

To deploy your Hugo site, execute the `firebase deploy` command, and your site will be up in no time:

```
hugo && firebase deploy
```

## CI Setup

You can generate a deploy token using


```
firebase login:ci
```

You can also set up your CI (e.g., with [Wercker](https://gohugo.io/hosting-and-deployment/deployment-with-wercker/)) and add the token to a private variable like `$FIREBASE_DEPLOY_TOKEN`.

{{% note %}}
This is a private secret and it should not appear in a public repository. Make sure you understand your chosen CI and that it's not visible to others.
{{% /note %}}

You can then add a step in your build to do the deployment using the token:

```
firebase deploy --token $FIREBASE_DEPLOY_TOKEN
```

## Reference links

* [Firebase CLI Reference](https://firebase.google.com/docs/cli/#administrative_commands)

## Host on GitHub

Deploy Hugo as a GitHub Pages project or personal/organizational site and automate the whole process with Github Action Workflow.

GitHub provides free and fast static hosting over SSL for personal, organization, or project pages directly from a GitHub repository via its [GitHub Pages service](https://help.github.com/articles/what-is-github-pages/) and automating development workflows and build with [GitHub Actions](https://docs.github.com/en/actions).

## Assumptions

1. You have Git 2.8 or greater [installed on your machine](https://git-scm.com/downloads).
2. You have a GitHub account. [Signing up](https://github.com/join) for GitHub is free.
3. You have a ready-to-publish Hugo website or have at least completed the [Getting Started](/en/getting-started).

Please refer to the [GitHub Pages documentation](https://help.github.com/articles/user-organization-and-project-pages/#user--organization-pages) to decide which type of site you would like to create as it will determine which of the below methods to use.

## GitHub User or Organization Pages

As mentioned in the [GitHub Pages documentation](https://help.github.com/articles/user-organization-and-project-pages/#user--organization-pages), you can host a user/organization page in addition to project pages. Here are the key differences in GitHub Pages websites for Users and Organizations:

1. You must use a `<USERNAME>.github.io` to host your **generated** content
2. Content from the `main` branch will be used to publish your GitHub Pages site

This is a much simpler setup as your Hugo files and generated content are published into two different repositories.

## Build Hugo With GitHub Action

GitHub execute your software development workflows. Everytime you push your code on the Github repository, Github Action will build the site automatically.

Create a file in `.github/workflows/gh-pages.yml` containing the following content (based on https://github.com/marketplace/actions/hugo-setup ):

```yml
name: github pages

on:
  push:
    branches:
      - main  # Set a branch to deploy

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true  # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          # extended: true

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

## Use a Custom Domain

If you'd like to use a custom domain for your GitHub Pages site, create a file `static/CNAME`. Your custom domain name should be the only contents inside `CNAME`. Since it's inside `static`, the published site will contain the CNAME file at the root of the published site, which is a requirement of GitHub Pages.

Refer to the [official documentation for custom domains](https://help.github.com/articles/using-a-custom-domain-with-github-pages/) for further information.

## Host on Bitbucket

You can use Bitbucket in conjunction with Aerobatic to build, deploy, and host a Hugo website.

You can use [Bitbucket](https://bitbucket.org/) and [Aerobatic](https://www.aerobatic.com/) to build, deploy, and host a Hugo website. Aerobatic is a static hosting service that integrates with Bitbucket and provides a free hosting tier.

## Assumptions

* Working familiarity with Git for version control
* A [Bitbucket account](https://bitbucket.org/account/signup/)

## Install Aerobatic CLI

If you haven't previously used Aerobatic, you'll first need to install the Command Line Interface (CLI) and create an account. For a list of all commands available, see the [Aerobatic CLI](https://www.aerobatic.com/docs/cli/) docs.

```
npm install aerobatic-cli -g
aero register
```

## Create and Deploy Site

```
hugo new site my-new-hugo-site
cd my-new-hugo-site
cd themes; git clone https://github.com/eliasson/liquorice
hugo -t liquorice
aero create                                           # create the Aerobatic site
hugo --baseURL https://my-new-hugo-site.aerobatic.io  # build the site overriding baseURL
aero deploy -d public                                 # deploy output to Aerobatic

Version v1 deployment complete.
View now at https://hugo-docs-test.aerobatic.io
```

In the rendered page response, the `https://__baseurl__` will be replaced with your actual site url (in this example, `https://my-new-hugo-site.aerobatic.io`). You can always rename your Aerobatic website with the `aero rename` command.

## Push Hugo site to Bitbucket

We will now create a git repository and then push our code to Bitbucket. In Bitbucket, create a repository.

![Bitbucket Screenshot][1]

[1]: /images/hosting-on-bitbucket/bitbucket-create-repo.png

```
# initialize new git repository
git init

# set up our .gitignore file
echo -e "/public \n/themes \naero-deploy.tar.gz" >> .gitignore

# commit and push code to master branch
git add --all
git commit -m "Initial commit"
git remote add origin git@bitbucket.org:YourUsername/my-new-hugo-site.git
git push -u origin master
```

## Continuous Deployment With Bitbucket Pipelines

In the example above, we pushed the compiled assets in the `/public` folder to Aerobatic. In the following example, we use Bitbucket Pipelines to continuously create and deploy the compiled assets to Aerobatic.

### Step 1: Configure Bitbucket Pipelines

In your Hugo website's Bitbucket repo;

1. Click the Pipelines link in the left nav menu of your Bitbucket repository.
2. Click the Enable Pipelines button.
3. On the next screen, leave the default template and click Next.
4. In the editor, paste in the yaml contents below and click Commit.


```
image: beevelop/nodejs-python
pipelines:
  branches:
    master:
      - step:
          script:
            - apt-get update -y && apt-get install wget
            - apt-get -y install git
            - wget https://github.com/gohugoio/hugo/releases/download/v0.18/hugo_0.18-64bit.deb
            - dpkg -i hugo*.deb
            - git clone https://github.com/eliasson/liquorice themes/liquorice
            - hugo --theme=liquorice --baseURL https://__baseurl__ --buildDrafts
            - npm install -g aerobatic-cli
            - aero deploy
```

### Step 2: Create `AEROBATIC_API_KEY` environment variable.

This step only needs to be done once per account. From the command line;

```
aero apikey
```

1. Navigate to the Bitbucket account settings for the account that the website repo belongs to.
2. Scroll down to the bottom of the left nav and click the Environment variables link in the PIPELINES section.
3. Create a new environment variable called AEROBATIC_API_KEY with the value you got by running the `aero apikey` command. Be sure to click the Secured checkbox.

### Step 3: Edit and Commit Code

```
hugo new posts/good-to-great.md
hugo server --buildDrafts -t liquorice #Check that all looks good

# commit and push code to master branch
git add --all
git commit -m "New blog post"
git push -u origin master
```

Your code will be committed to Bitbucket, Bitbucket Pipelines will run your build, and a new version of your site will be deployed to Aerobatic.

At this point, you can now create and edit blog posts directly in the Bitbucket UI.

![Bitbucket blog Screenshot][2]

[2]: /images/hosting-on-bitbucket/bitbucket-blog-post.png

## Suggested next steps

The code for this example can be found in this Bitbucket [repository](https://bitbucket.org/dundonian/hugo-docs-test). Aerobatic also provides a number of additional [plugins](https://www.aerobatic.com/docs) such as auth and redirects that you can use for your Hugo site.


<!-- ## Serving your site locally

Depending on your deployment choice you may want to serve your site locally during development to preview content changes. To serve your site locally:

1. Ensure you have an up to date local copy of your site files cloned from your repo. Don’t forget to use `--recurse-submodules` or you won’t pull down some of the code you need to generate a working site.

```
git clone --recurse-submodules --depth 1 https://github.com/my/example.git
```

> #### Note
If you’ve just added the theme as a submodule in a local version of your site and haven’t committed it to a repo yet, you must get local copies of the theme’s own submodules before serving your site.
```
git submodule update --init --recursive
```
2. Ensure you have the tools described in Installation and Prerequisites installed on your local machine, including `postcss-cli`(you’ll need it to generate the site resources the first time you run the server).

3. Run the `hugo server` command in your site root. By default your site will be available at [http://localhost:1313/](http://localhost:1313/).

Now that you’re serving your site locally, Hugo will watch for changes to the content and automatically refresh your site. If you have more than one local git branch, when you switch between git branches the local website reflects the files in the current branch.

## Deployment with Netlify 

We recommend using [Netlify](https://www.netlify.com/) as a particularly simple way to serve your site from your Git provider (GitHub, GitLab, or BitBucket), with [continuous deployment](https://www.netlify.com/docs/continuous-deployment/), previews of the generated site when you or your users create pull requests against the doc repo, and more. Netlify is free to use for Open Source projects, with premium tiers if you require greater support.

Before deploying with Netlify, make sure that you’ve pushed your site source to your chosen GitHub (or other provider) repo, following any setup instructions in Using the theme.

Then follow the instructions in [Host on Netlify](https://gohugo.io/hosting-and-deployment/hosting-on-netlify/) to set up a Netlify account (if you don’t have one already) and authorize access to your GitHub or other Git provider account. Once you’re logged in:

1. Click **New site from Git**.
1. Click your chosen Git provider, then choose your site repo from your list of repos.
1. In the **Deploy settings page**:
  1. For your **Build command**, specify `cd themes/docco && git submodule update -f --init && cd ../.. && hugo`. You need to specify this rather than just `hugo` so that Netlify can use the theme’s submodules.
  1. Click **Show advanced**.
  1. In the **Advanced build settings** section, click New variable.
  1. Specify `HUGO_VERSION` as the **Key** for the new variable, and 0.72 or later as its **Value**.
  1. (Optional) Click **New variable** again, and this time set `HUGO_ENV` to `production`. Do this if you want your site to be indexed by search engines. You must do this if you want to use a Google Custom Search Engine.
  1. Click **Deploy site**.

Alternatively, you can follow the same instructions but specify your **Deploy settings** in a [`netlify.toml` file](https://docs.netlify.com/configure-builds/file-based-configuration/) in your repo rather than in the **Deploy settings** page. You can see an example of this in the Docco theme repo.

If you have an existing deployment you can view and update the relevant information by selecting the site from your list of sites in Netlify, then clicking **Site settings - Build and deploy**. Ensure that **Ubuntu Xenial 16.04** is selected in the **Build image selection** section - if you’re creating a new deployment this is used by default. You need to use this image to run the extended version of Hugo.
 -->
