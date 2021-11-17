const fs = require("fs");
const path = require("path");
const parser = require("./parser");
const { PurgeCSS } = require('purgecss')

class AtomicCSSWebpackPlugin {
  options = {
    version: 4,
    config: "",
    assets: "",
    publicPath: '/',
    importWay: "inline",
    parser: null
  };
  CSS_ASSET_NAME = "atomic";
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

  getAssetsPath(hash, addPublicPath = false) {
    const { assets, publicPath } = this.options;
    const fullAssets = addPublicPath ? `${publicPath}${assets}` : assets;
    return hash
      ? `${fullAssets}/${this.CSS_ASSET_NAME}.${hash}.css`
      : `${fullAssets}/${this.CSS_ASSET_NAME}.css`;
  }

  apply(compiler) {
    const isProduction = compiler.options.mode === 'production';

    const pluginName = AtomicCSSWebpackPlugin.name;
    if (!this.options.version) {
      throw new Error(`Please make sure you specify the version field.`)
    }
    if (this.options.version == '5') {
      const { Compilation, sources } = compiler.webpack;
      compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
        compilation.hooks.processAssets.tap(
          { name: pluginName, stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE },
          async (assets) => {
            if (isProduction) {
              await this.purge(assets);
            }
            this.emitAsset(compilation, sources)
            this.updateAssets(assets, compilation, sources);
            this.writeFile();
          }
        );
      });
    } else if (this.options.version == '4') {
      compiler.hooks.watchRun.tap(pluginName, (c) => {
        c.hooks.emit.tapAsync(pluginName, (compilation, cb) => {
          const assets = compilation.assets;
          if (isProduction) {
            this.purge(assets).then(() => {
              this.emitAsset(compilation)
              this.updateAssets(assets, compilation);
              this.writeFile();
              cb();
            })
          } else {
            this.emitAsset(compilation)
            this.updateAssets(assets, compilation);
            this.writeFile();
            cb();
          }
        }
        );
      })
      compiler.hooks.emit.tapAsync(pluginName, (compilation, cb) => {
        const assets = compilation.assets;
        if (isProduction) {
          this.purge(assets).then(() => {
            this.emitAsset(compilation)
            this.updateAssets(assets, compilation);
            this.writeFile();
            cb();
          })
        } else {
          this.emitAsset(compilation)
          this.updateAssets(assets, compilation);
          this.writeFile();
          cb();
        }
      }
      );
    } else {
      throw new Error(`Doesn't support webpack version ${this.options.version}.`)
    }
  }

  emitAsset(compilation, sources) {
    if (this.options.importWay === "link") {
      compilation.emitAsset(
        this.getAssetsPath(compilation.hash),
        this.getSource(this.cssContent, sources)
      );
    }
  }

  updateAssets(assets, compilation, sources) {
    Object.keys(assets)
      .filter((key) => key.endsWith(".html"))
      .forEach((key) => {
        const sourceContent = assets[key].source();
        const [start, end] = sourceContent.split("</head>");
        const middle = this.getMiddlePart(compilation.hash)
        const newContent = `${start}${middle}</head>${end}`;
        if (!sourceContent.includes(middle)) {
          compilation.updateAsset(key, this.getSource(newContent, sources));
        }
      });
  }

  writeFile() {
    fs.writeFileSync(
      path.resolve(__dirname, ".atomic.css"),
      this.cssContent
    );
  }

  getSource(content, sources) {
    if (this.options.version == '4') {
      return {
        source: () => content,
        size: () => content.length
      }
    } else if (this.options.version == '5') {
      return new sources.RawSource(content);
    }
  }

  getMiddlePart(hash) {
    const linkTag = `<link type="text/css" rel="stylesheet" href="${this.getAssetsPath(hash, true)}">`;
    switch (this.options.importWay) {
      case "link":
        return linkTag;
      case "inline":
        return `<style type="text/css">${this.cssContent}</style>`;
      default:
        return linkTag;
    }
  }

  async purge(assets) {
    const content = Object.keys(assets).filter(key => key.endsWith('.js') || key.endsWith('.html')).map(key => {
      const extension = key.split('.').pop();
      return { raw: assets[key].source(), extension }
    });

    const purgeCSSResult = await new PurgeCSS().purge({ content, css: [{ raw: this.cssContent }] })

    this.cssContent = purgeCSSResult.map(v => v.css).join('')
  }
}

module.exports = AtomicCSSWebpackPlugin;
exports["default"] = AtomicCSSWebpackPlugin;
