# Atomic CSS Webpack Plugin

**[Chinese Docs](./README.zh.md)**

> **Atomized CSS** development enhancement plugin. Inspired by [Tailwindcss](https://www.tailwindcss.cn/).

- Framework independent
- Support completely custom configuration (now you have to have one config file, plugin will not support default config anymore)
- Flexible naming rules (it's better than [Tailwindcss](https://www.tailwindcss.cn/) in this way)
- On-demanded usage(you can custom your config file follow your need, you won't get one redundant css classes file)
- Support utils to custom css utils
- Support `!important` (it's better than [Tailwindcss](https://www.tailwindcss.cn/))

With VSCode Plugin [「IntelliSense for CSS class names in HTML」](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion)experience better.

## demo

[atomic css webpack plugin](https://atomic-css-webpack-plugin.vercel.app/)

## useage

> latest version **0.1.5**

`npm i -D atomic-css-webpack-plugin@latest`

### example

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AtomicCSSWebpackPlugin = require("atomic-css-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./app.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[hash].js",
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Atomic CSS Webpack Plugin",
      minify: "auto"
    }),
    new AtomicCSSWebpackPlugin({
      config: path.resolve(__dirname, "./myconfig.js")
    }) // you can use your customized config file or you just use the default config
  ]
};
```

### plugin config

| Field     | Explain                                                                     | Type               | Default | Required |
| --------- | --------------------------------------------------------------------------- | ------------------ | ------- | -------- |
| config    | Config file path                                                            | string             | ''      | true     |
| versoin   | webpack big version                                                         | string/number 5 or 4 | '4'     | false     |
| assets    | Css asset output path (if you set 'css', atomic.css will output in css dir) | string             | ''      | false    |
| importWay | use link or style tag import css                                            | 'link'/'inline'    | 'inline'  | false    |
| parser    | customer parse logic for your own config file                               | function(config){} | null      | false    |

## config rules

> config file is one js module object, just like below:

```javascript
module.exports = {
  atomic: {
    text: {
      // className prefix
      color: {
        // css property
        "-white": "#fff" // className postfix : css value
      },
      "text-align": {
        "-center!": "center" // postfix with `!` you will get `!important` class
      }
    },
    p: {
      "padding-left": {
        "l-10": "10px"
      },
      "padding-right": {
        "r-10": "10px"
      },
      "padding-left$padding-right": {
        // if you want to set more than one property, use `$` to split
        "x-10": "10px"
      }
    }
  },
  utils: {
    link: {
      css: {
        color: "blue",
        cursor: "pointer"
      },
      actions: {
        hover: {
          color: "red"
        }
      }
    }
  }
};
```

> with above config file, you will get below css classes:

```css
.text-white {
  color: #fff;
}
.text-center {
  text-align: center !important;
}
.pl-10 {
  padding-left: 10px;
}
.pr-10 {
  padding-right: 10px;
}
.px-10 {
  padding-left: 10px;
  padding-right: 10px;
}
.link {
  color: blue;
  cursor: pointer;
}
.link:hover {
  color: red;
}
```
