const fs = require('fs')
const path = require('path')


class AtomicCSSWebpackPlugin {
    options = { config: '', assets: '' }
    CSS_ASSET_NAME = 'atomic.css'

    constructor(options) {
        for (const key in options) {
            if (options[key]) {
                this.options[key] = options[key]
            }
        }
    }

    getConfig() {
        if (this.options.config) {
            return require(this.options.config)
        }

        return require(path.resolve(__dirname, './default.config.js'))
    }

    apply(compiler) {
        const pluginName = AtomicCSSWebpackPlugin.name;

        compiler.hooks.make.tap(pluginName, (compilation) => {
            const cssContent = this.parseCSS(this.getConfig());

            compilation.emitAsset(`${this.options.assets}/${this.CSS_ASSET_NAME}`, this.genSource(cssContent));

            this.writeStaticCSSToLocal(cssContent);
        })

        compiler.hooks.shouldEmit.tap(pluginName, (compilation) => {

            compilation.finish(() => {
                Object.keys(compilation.assets).
                    filter(key => key.endsWith('.html')).
                    forEach(key => {
                        const sourceContent = compilation.assets[key].source();
                        const [start, end] = sourceContent.split('</head>');
                        const linkContent = `<link type="text/css" rel="stylesheet" href="${this.options.assets}${this.CSS_ASSET_NAME}">`;
                        const newContent = `${start}${linkContent}</head>${end}`;
                        compilation.updateAsset(key, this.genSource(newContent));
                    })
            });

            return true;
        })
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

    writeStaticCSSToLocal(cssContent) {
        fs.writeFileSync(path.resolve(__dirname, './.atomic.css'), cssContent);
    }

}

module.exports = AtomicCSSWebpackPlugin;
exports['default'] = AtomicCSSWebpackPlugin;