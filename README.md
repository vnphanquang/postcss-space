# postcss-space-between

[![github.actions.changeset.badge]][github.actions.changeset] [![codecov.badge]][codecov]

[![MIT][license.badge]][license] [![npm.badge]][npm]

## [Changelog][changelog]

Postcss plugin to add postcss plugin to add vertical / horizontal spacing between direct children

Input

```css
.horizontal-list {
  @space-x 40px;
}
.vertical-list {
  --vertical-spacing: 40px;
  @space-y var(--vertical-spacing);
}
.global-variant {
  /* for usage in css module or web framework that uses :global (such as svelte) */
  @gspace-x 40px;
  @gspace-y 40px;
}
```

Output

```css
.horizontal-list * > * {
  margin-left: 40px;
}
.vertical-list * > * {
  margin-top: 40px;
}
:global(.global-variant * > *) {
  margin-left: 40px;
  margin-top: 40px;
}
```

## Installation

```bash
npm install --save-dev postcss postcss-space-between
```

Add to your postcss config

```diff
module.exports = {
  plugins: [
+   require('postcss-space-between'),
  ],
};
```

## Supported At Rules

| At Rule | Description |
| --- | --- |
| `@space-x` | Add horizontal spacing between direct children |
| `@gspace-x` | Add horizontal spacing between direct children with `:global` |
| `@space-y` | Add vertical spacing between direct children |
| `@gspace-y` | Add vertical spacing between direct children with `:global` |

## Test Cases & Examples

The following table lists test cases covered by this plugin, please refer to [tests][tests] for details and to test input css as examples

| Test Case | Description | Input | Output |
| --- | --- | --- | --- |
| in media queries | `@media min-width: 768px { .list { @space-x 40px; } }` | [input][tests.in-media-queries.input] | [output][tests.in-media-queries.output] |
| with combined selector | `.list-1, .list2 { @space-y: 40px; }` | [input][tests.with-combined-selector.input] | [output][tests.with-combined-selector.output] |
| with [postcss-nesting] | `section { & .list { @space-x 40px; } }` | [input][tests.with-postcss-nesting.input] | [output][tests.with-postcss-nesting.output] |
| with [postcss-nested] | `section { .list { @space-x 40px; } }` | [input][tests.with-postcss-nested.input] | [output][tests.with-postcss-nested.output] |

[changelog]: ./CHANGELOG.md
[tests]: ./src/space-between.test.js

[tests.in-media-queries.input]: ./src/tests/in-media-queries.input.css
[tests.in-media-queries.output]: ./src/tests/in-media-queries.output.css

[tests.with-combined-selector.input]: ./src/tests/with-combined-selector.input.css
[tests.with-combined-selector.output]: ./src/tests/with-combined-selector.output.css

[tests.with-postcss-nesting.input]: ./src/tests/with-postcss-nesting.input.css
[tests.with-postcss-nesting.output]: ./src/tests/with-postcss-nest.output.css

[tests.with-postcss-nested.input]: ./src/tests/with-postcss-nested.input.css
[tests.with-postcss-nested.output]: ./src/tests/with-postcss-nest.output.css

<!-- npm -->
[npm.badge]: https://img.shields.io/npm/v/postcss-space-between
[npm]: https://www.npmjs.com/package/postcss-space-between

<!-- heading badge -->
[license.badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: ./LICENSE
[github.actions.changeset.badge]: https://github.com/vnphanquang/postcsss-space-between/actions/workflows/changeset.yaml/badge.svg
[github.actions.changeset]: https://github.com/vnphanquang/postcss-space-between/actions/workflows/changeset.yaml
[codecov.badge]: https://codecov.io/gh/vnphanquang/postcss-space-between/branch/main/graph/badge.svg?token=fi6Al6JEGA
[codecov]: https://codecov.io/github/vnphanquang/postcsss-space-between?branch=main

[postcss-nesting]: https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-nesting
[postcss-nested]: https://github.com/postcss/postcss-nested
