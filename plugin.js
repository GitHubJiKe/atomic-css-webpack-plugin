const fs = require('fs')
const path = require('path')
const parse = require('./parse')
class AtomicCSSWebpackPlugin {
    options = { config: '', assets: '', importWay: 'link' }
    CSS_ASSET_NAME = 'atomic.css'
    cssContent = ''

    constructor(options) {

        for (const key in options) {
            if (options[key]) {
                this.options[key] = options[key]
            }
        }

        this.cssContent = parse(this.getConfig());
    }

    getConfig() {
        if (this.options.config) {
            if (!fs.existsSync(this.options.config)) {
                throw new Error(`config path is not valid, please check.`)
            }
            return require(this.options.config)
        }

        return require(path.resolve(__dirname, './default.config.js'))
    }

    getAssetsPath() {
        const assets = this.options.assets
        return `${assets.endsWith('/') ? assets : `${assets}/`}${this.CSS_ASSET_NAME}`
    }

    apply(compiler) {
        const pluginName = AtomicCSSWebpackPlugin.name;

        const { Compilation, sources } = compiler.webpack;

        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            compilation.hooks.processAssets.tap({ name: pluginName, stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE }, (assets) => {
                if (this.options.importWay === 'link') {
                    compilation.emitAsset(this.getAssetsPath(), new sources.RawSource(this.cssContent));
                }

                Object.keys(assets).
                    filter(key => key.endsWith('.html')).
                    forEach(key => {
                        const sourceContent = assets[key].source();
                        const [start, end] = sourceContent.split('</head>');
                        const newContent = `${start}${this.getMiddlePart()}</head>${end}`;
                        compilation.updateAsset(key, new sources.RawSource(newContent));
                    })
                fs.writeFileSync(path.resolve(__dirname, './.atomic.css'), this.cssContent);
            })
        })
    }

    getMiddlePart() {
        const linkTag = `<link type="text/css" rel="stylesheet" href="${this.getAssetsPath()}">`;
        switch (this.options.importWay) {
            case 'link':
                return linkTag
            case 'inline':
                return `<style type="text/css">${this.cssContent}</style>`;
            default:
                return linkTag
        }
    }
}

module.exports = AtomicCSSWebpackPlugin;
exports['default'] = AtomicCSSWebpackPlugin;