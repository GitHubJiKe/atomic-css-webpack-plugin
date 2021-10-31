const fs = require("fs");
const path = require("path");
const parser = require("./parser");

class AtomicCSSWebpackPlugin {
  options = { config: "", assets: "", importWay: "link", parser: null };
  CSS_ASSET_NAME = "atomic.css";
  cssContent = "";

  constructor(options) {
    for (const key in options) {
      if (options[key]) {
        this.options[key] = options[key];
      }
    }
    if (this.options.parser) {
      if (typeof this.options.parser === "function") {
        this.cssContent = this.options.parser(this.getConfig());
      } else {
        throw new Error(
          "Customizer parser should be function,which params is config"
        );
      }
    } else {
      this.cssContent = parser.parse(this.getConfig());
    }
  }

  getConfig() {
    if (!this.options.config) {
      throw new Error(`config path is required, please check.`);
    }

    if (this.options.config) {
      if (!fs.existsSync(this.options.config)) {
        throw new Error(`config path is not valid, please check.`);
      }
      return require(this.options.config);
    }
  }

  getAssetsPath(hash) {
    const assets = this.options.assets;
    return hash
      ? `${assets}/${this.CSS_ASSET_NAME}.${hash}.css`
      : `${assets}/${this.CSS_ASSET_NAME}.css`;
  }

  apply(compiler) {
    const pluginName = AtomicCSSWebpackPlugin.name;

    const { Compilation, sources } = compiler.webpack;

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        { name: pluginName, stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE },
        (assets) => {
          if (this.options.importWay === "link") {
            compilation.emitAsset(
              this.getAssetsPath(compilation.hash),
              new sources.RawSource(this.cssContent)
            );
          }

          Object.keys(assets)
            .filter((key) => key.endsWith(".html"))
            .forEach((key) => {
              const sourceContent = assets[key].source();
              const [start, end] = sourceContent.split("</head>");
              const newContent = `${start}${this.getMiddlePart(
                compilation.hash
              )}</head>${end}`;
              compilation.updateAsset(key, new sources.RawSource(newContent));
            });
          fs.writeFileSync(
            path.resolve(__dirname, "./.atomic.css"),
            this.cssContent
          );
        }
      );
    });
  }

  getMiddlePart(hash) {
    const linkTag = `<link type="text/css" rel="stylesheet" href="${this.getAssetsPath(
      hash
    )}">`;
    switch (this.options.importWay) {
      case "link":
        return linkTag;
      case "inline":
        return `<style type="text/css">${this.cssContent}</style>`;
      default:
        return linkTag;
    }
  }
}

module.exports = AtomicCSSWebpackPlugin;
exports["default"] = AtomicCSSWebpackPlugin;
