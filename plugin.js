const fs = require('fs')
const path = require('path')
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

        this.cssContent = this.parseCSS(this.getConfig());
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

    getAssetsPath(delimiter = '') {
        return `${this.options.assets}${delimiter}${this.CSS_ASSET_NAME}`
    }

    apply(compiler) {
        const pluginName = AtomicCSSWebpackPlugin.name;

        compiler.hooks.make.tap(pluginName, (compilation) => {

            compilation.emitAsset(this.getAssetsPath('/'), this.genSource(this.cssContent));

            this.writeStaticCSSToLocal();
        })

        compiler.hooks.shouldEmit.tap(pluginName, (compilation) => {

            compilation.finish(() => {
                Object.keys(compilation.assets).
                    filter(key => key.endsWith('.html')).
                    forEach(key => this.insertStyleTag(compilation, key))
            });

            return true;
        })
    }

    getMiddlePart() {
        switch (this.options.importWay) {
            case 'link':
                return `<link type="text/css" rel="stylesheet" href="${this.getAssetsPath()}">`
            case 'inline':
                return `<style type="text/css">${this.cssContent}</style>`;
            default:
                return `<link type="text/css" rel="stylesheet" href="${this.getAssetsPath()}">`
        }
    }


    insertStyleTag(compilation, key) {
        const sourceContent = compilation.assets[key].source();
        const [start, end] = sourceContent.split('</head>');
        const newContent = `${start}${this.getMiddlePart()}</head>${end}`;
        compilation.updateAsset(key, this.genSource(newContent));
    }

    genSource(content) {
        return { source: () => content, size: () => content.length };
    }

    parseCSS(config) {
        let content = ''
        for (const key in config) {
            // key: prefix
            const obj = config[key];
            for (const prop in obj) {
                // prop: css property
                const conf = obj[prop];
                for (const field in conf) {
                    // field: postfix 
                    const value = conf[field];
                    content += `.${key.startsWith('$') ? '' : key}${field}{${prop}:${value}}`
                }
            }
        }

        return content;
    }

    writeStaticCSSToLocal() {
        fs.writeFileSync(path.resolve(__dirname, './.atomic.css'), this.cssContent);
    }

}

module.exports = AtomicCSSWebpackPlugin;
exports['default'] = AtomicCSSWebpackPlugin;