# Atomic CSS Webpack Plugin

**[英文文档](./README.md)**

> **原子化 CSS**开发增强插件. 灵感来自于 [Tailwindcss](https://www.tailwindcss.cn/).

- 框架无关
- 完全定制化 (现在你必须自建一个配置文件, 插件本身不在提供默认的配置文件)
- 自定义的命名规则 (这一点要优于[Tailwindcss](https://www.tailwindcss.cn/))
- 按需配置(根据需要配置, 不会产出一个css类冗余的文件)
- 支持配置utils
- 支持 `!important`

搭配 VSCode Plugin [「IntelliSense for CSS class names in HTML」](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion)体验更好.

## 示例

[atomic css webpack plugin](https://atomic-css-webpack-plugin.vercel.app/)

## 使用

> latest version **0.1.4**

`npm i -D atomic-css-webpack-plugin@latest`

### 示例代码

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
    // new AtomicCSSWebpackPlugin(),
  ]
};
```

### 插件配置字段

| 字段     | 释义                                                                     | 类型               | 默认值 | 是否必填 |
| --------- | --------------------------------------------------------------------------- | ------------------ | ------- | -------- |
| config    | 配置文件路径                                                            | string             | ''      | true     |
| assets    | css文件打包路径 (如果你设置为`css`, atomic.css 将会打包到`css`文件夹下) | string             | ''      | false    |
| importWay | 使用link标签一如还是style标签内联样式                                            | 'link'/'inline'    | 'link'  | false    |
| parser    | 可以针对你的配置文件定制解析逻辑                               | function(config){} | ''      | false    |

## 配置规则

> 配置文件就是一个js模块对象，像下面那样:

```javascript
module.exports = {
  atomic: {
    text: {
      // className 前缀
      color: {
        // css 属性
        "-white": "#fff" // className 后缀 : css 值
      },
      "text-align": {
        "-center!": "center" // 后缀添加英文 `!` 你就可以得到后缀 `!important`的class
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
        // 如果你想一次性设置多个属性，用`$`分割
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

> 上面的配置文件将会编译出下面的css类内容

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
