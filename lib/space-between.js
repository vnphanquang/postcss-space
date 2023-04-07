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
 * @param {import('postcss').Helpers} helpers
 * @param {import('postcss').AtRule} atRule
 * @param {'x' | 'y'} axis
 * @param {SpaceTransformConfig} config
 */
function transform(helpers, atRule, axis, config = {}) {
  const value = config.value ?? atRule.params.trim();
  const global = config.global ?? false;
  let prop;
  switch (axis) {
    case 'x':
      prop = 'margin-left';
      break;
    case 'y':
      prop = 'margin-top';
      break;
  }
  const parent = atRule.parent;

  let selector = helpers.list
    .comma(parent.selector)
    .map((s) => `${s} > * + *`)
    .join(', ');
  if (global) selector = `:global(${selector})`;

  const rule = new helpers.Rule({
    selector,
    source: atRule.source,
    nodes: [new helpers.Declaration({ prop, value })],
  });
  const container = findRootOrMediaNode(parent);
  container.append(rule);
  atRule.remove();
    if (parent.nodes.length === 0) parent.remove();
}

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = function (opts = {}) {
  return {
    postcssPlugin: 'postcss-space-between',
    AtRule: {
      'space-x': (atRule, helpers) => {
        transform(helpers, atRule, 'x');
      },
      'gspace-x': (atRule, helpers) => {
        transform(helpers, atRule, 'x', { global: true });
      },
      'space-y': (atRule, helpers) => {
        transform(helpers, atRule, 'y');
      },
      'gspace-y': (atRule, helpers) => {
        transform(helpers, atRule, 'y', { global: true });
      },
    },
  };
};

module.exports.postcss = true;
