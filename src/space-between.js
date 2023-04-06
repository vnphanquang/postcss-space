const postcss = require('postcss');

/** @typedef {{ value?: string; global?: boolean }} SpaceTransformConfig */

/**
 * @param {import('postcss').Node} node
 * @returns {import('postcss').Container}
 */
function findRootOrMediaNode(node) {
  const parent = node.parent;
  if (parent.type === 'root' || (parent.type === 'atrule' && parent.name === 'media')) {
    return parent;
  }
  return findRootOrMediaNode(parent);
}

/**
 * @param {import('postcss').AtRule} atRule
 * @param {'x' | 'y'} axis
 * @param {SpaceTransformConfig} config
 */
function transform(atRule, axis, config = {}) {
  const { value, global } = {
    value: atRule.params.trim(),
    global: false,
    ...config,
  };
  try {
    let prop;
    switch (axis) {
      case 'x':
        prop = 'margin-left';
        break;
      case 'y':
        prop = 'margin-top';
        break;
      default:
        throw error('[postcss-space] @space axis must be x or y');
    }
    const parent = atRule.parent;

    let selector = postcss.list
      .comma(parent.selector)
      .map((s) => `${s} > * + *`)
      .join(', ');
    if (global) selector = `:global(${selector})`;

    const rule = new postcss.Rule({
      selector,
      source: atRule.source,
      nodes: [new postcss.Declaration({ prop, value })],
    });
    const container = findRootOrMediaNode(parent);
    container.append(rule);
    atRule.remove();
    if (parent.nodes.length === 0) parent.remove();
  } catch (error) {
    console.error(error);
  }
}

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = function (opts = {}) {
  // Work with options here

  return {
    postcssPlugin: 'postcss-space-between',
    AtRule: {
      'space-x': (atRule) => {
        transform(atRule, 'x');
      },
      'gspace-x': (atRule) => {
        transform(atRule, 'x', { global: true });
      },
      'space-y': (atRule) => {
        transform(atRule, 'y');
      },
      'gspace-y': (atRule) => {
        transform(atRule, 'y', { global: true });
      },
    },
  };
};

module.exports.postcss = true;
