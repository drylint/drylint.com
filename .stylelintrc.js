module.exports = {
  root: true,
  extends: [
    'stylelint-config-standard',
    // 'stylelint-config-recess-order'
  ],
  plugins: [
    'stylelint-scss',
  ],
  rules: {
    // 规则前空行
    'rule-empty-line-before': null, // 'always'|'never'|'always-multi-line'|'never-multi-line'
    // 命名颜色值
    'color-named': 'never', // 'always-where-possible'|'never'
    // 颜色大小写
    'color-hex-case': null, // 'lower'|'upper'
    'unit-no-unknown': [true, {
      ignoreUnits: ['rpx'],
    }],
    'at-rule-no-unknown': [true, {
      'ignoreAtRules': [
        'each',
        'for',
        'if',
        'else',
        'while',
        'extend',
        'function',
        'return',
        'include',
        'mixin',
        'use',
        'forward',
        'at-root',
        'warn',
        'error',
        'debug',
      ],
    }],
    'property-no-unknown': [true, {
      ignoreProperties: ['system', 'symbols'],
    }],
    'at-rule-empty-line-before': ['always', {
      except: [
        'blockless-after-same-name-blockless',
        'first-nested',
      ],
      ignore: ['after-comment'],
      ignoreAtRules: ['else'],
    }],
    'block-closing-brace-newline-after': [
      'always', {
        'ignoreAtRules': ['if', 'else'],
      },
    ],
  },
}
