function parseAtomic(atomic) {
  let content = "";
  for (const key in atomic) {
    // key: prefix
    const obj = atomic[key];
    for (const prop in obj) {
      let props = [prop];
      if (prop.includes("$")) {
        props = prop.split("$");
      }
      // prop: css property
      const conf = obj[prop];
      for (const field in conf) {
        // field: postfix
        const value = conf[field];
        let _filed = field;
        let isImportant = false
        if (field.endsWith('!')) {
          isImportant = true;
          _filed = field.split('!')[0];
        }
        const cssContent = props.map((p) => `${p}:${value}${isImportant ? ' !important' : ''}`).join(";");
        content += `.${key.startsWith("$") ? "" : key}${_filed}{${cssContent}}`;
      }
    }
  }
  return content;
}

function parseUtils(utils) {
  let content = "";
  for (const key in utils) {
    const util = utils[key];
    const { css, actions } = util;
    if (css) {
      const cssContent = styleString(css);
      content += `.${key}{${cssContent}}`;
    }
    if (actions) {
      for (const actionKey in actions) {
        const action = actions[actionKey];
        content += `.${key}:${actionKey}{${styleString(action)}}`;
      }
    }
  }
  return content;
}

function styleString(style) {
  if (!style) {
    return "";
  }

  return Object.entries(style)
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
}

module.exports = {
  parse: function (config) {
    const { atomic, utils } = config;

    let content = "";

    if (atomic) {
      content += parseAtomic(atomic);
    }

    if (utils) {
      content += parseUtils(utils);
    }

    return content;
  },
  parseAtomic: parseAtomic,
  parseUtils: parseUtils
};
