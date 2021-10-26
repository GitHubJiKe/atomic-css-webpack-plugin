module.exports = function (config) {
    const { atomic, utils } = config;

    let content = ''

    if (atomic) {
        content += parseAtomic(atomic)
    }

    if (utils) {
        content += parseUtils(utils)
    }

    return content
}

function parseAtomic(atomic) {
    let content = '';
    for (const key in atomic) {
        // key: prefix
        const obj = atomic[key];
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

function parseUtils(utils) {
    let content = '';
    for (const key in utils) {
        const util = utils[key];
        const { css, actions } = util;
        if (css) {
            const cssContent = styleString(css);
            content += `.${key}{${cssContent}}`
        }
        if (actions) {
            for (const actionKey in actions) {
                const action = actions[actionKey];
                content += `.${key}:${actionKey}{${styleString(action)}}`
            }
        }
    }
    return content;
}

function styleString(style) {
    if (!style) {
        return ''
    }

    return Object.entries(style).map(([k, v]) => `${k}:${v}`).join(';')
}