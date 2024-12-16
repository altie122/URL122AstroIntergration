---
title: Basic setup Guide
description: A guide to setup URL122 in a way that is compatible with any framework, or no framework at all.
---

Whether you use a custom written framework, or plain HTML, URL122 is easy and quick to setup.

All you need is a hosted site (it doesn't even need to have content).

## 1. Necessary files
All you will need is a single JSON file.

Make a file called `url122.json` in a `.well-known` folder in your project, if you use a framework, this will likely be in the `public` folder.

## 2. setting up redirects
To make a redirect you simply need to add a new entry to the JSON file.

```json
[
  {
    "prefix/sub-prefix/ID": "https://my-project.com/"
  }
]
```

Almost all of the time, you will never use the sub-prefix, this is for is this is a sub-site or your site is under an URL122 index site.

Prefix is a 3 character string will be given to you by URL122, and is the same for all your redirects. If you are using a sub-prefix, make sure it is the same as the URL122 index site's prefix.

The ID is a string (6 char is recommended but there is no limit), this may be typed in manually, or generated automatically using code, this does not matter it just needs to be unique (to your instance) and 6 characters long.

in the rare case that you need to use a sub-prefix, it is recommended to keep it to 3 characters but there is no limit on it.

## How do I get my site on URL122?

To get your site on URL122 you need to make a pull request to the [URL122 index](https://github.com/altie122/url122-index).

When doing this edit the `index.json` file, adding your site using this format:
```json
[
  {
    "prefix": {
      "url": "https://my-project.com/",
    }
  }
]
```

The prefix should be 3 characters long, this will be the same as the prefix you used in your `/well-known/url122.json` file.

if this instance is a list of sub-sites, make the you will want to add this to your entry:

```json
{
  "prefix": {
    "url": "https://my-project.com/",
    "isIndex": true
  }
}
```

---

Complete example can be viewed below:

https://docs.url122.xyz/.well-known/url122.json