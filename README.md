# Atomic CSS Webpack Plugin

> **Atomized CSS** development enhancement plugin. Inspired by [Tailwindcss](https://www.tailwindcss.cn/).

- Framework independent
- Support completely custom configuration
- Flexible naming rules (it's better than [Tailwindcss](https://www.tailwindcss.cn/) in this way)
- Flexible content scope (you can custom your config file follow your need, you won't get one redundant css classes file)

With VSCode Plugin [「IntelliSense for CSS class names in HTML」](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion)experience better.

## demo

[atomic css webpack plugin](https://atomic-css-webpack-plugin.vercel.app/)

## useage

### example

```javascript
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AtomicCSSWebpackPlugin = require('atomic-css-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './app.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.[hash].js",
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Atomic CSS Webpack Plugin",
            minify: 'auto'
        }),
        new AtomicCSSWebpackPlugin({ config: path.resolve(__dirname, './myconfig.js') }) // you can use your customized config file or you just use the default config
         // new AtomicCSSWebpackPlugin(),
    ],
}
```

### plugin config

| Field  | Explain                                                      | Type   | Default |
| ------ | ------------------------------------------------------------ | ------ | ------- |
| config | Config file path                                             | string | ''      |
| assets | Css asset output path (if you set 'css', atomic.css will output in css dir) | string | ''      |



## config rules

> config file is one js module object, just like below:

```javascript
module.exports = {
      text: { // className prefix
        color: { // css property
            "-white": '#fff', // className postfix : css value
            "-black": '#000',
        },
        'text-align': {
            "-left": 'left',
            "-right": 'right',
            "-center": 'center',
        },
    },
}
```

> with beyond config file, you will get below css classes:

```css
.text-white{color:#fff}
.text-black{color:#000}
.text-left{text-align:left}
.text-right{text-align:right}
.text-center{text-align:center}
```
