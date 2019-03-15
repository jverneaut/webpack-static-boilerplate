# Webpack Static Boilerplate

This boilerplate makes developing static html sites easy by allowing html imports.

**Transform this:**

```html
<!-- views/index.html -->
<div>
  ${require('../partials/header.html')}

  <h1>Hello, World!</h1>
</div>

<!-- partials/header.html -->
<div>
  My site
</div>
```

**into this:**

```html
<!-- views/index.html -->
<div>
  <div>
    My site
  </div>

  <h1>Hello, World!</h1>
</div>
```

Inspired by [this blog post from extri.co](https://extri.co/2017/07/11/generating-multiple-html-pages-with-htmlwebpackplugin/).

## Install

```shell
$ git clone https://github.com/jverneaut/webpack-static-boilerplate
$ npm install
```

## Run

```shell
$ # Starts a development server on port 4000 with auto relaod
$ npm run watch
```

To build for production use

```shell
$ npm run build
```

## Usage

Use `${require(./myFile.html)}` to include external html files.
