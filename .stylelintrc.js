module.exports = {
  extends: ['stylelint-config-prettier'],
  rules: {
    indentation: 2,
    'at-rule-no-unknown': [true, { ignoreAtRules: ['tailwind', 'apply', 'screen', 'responsive', 'variants'] }],
    'selector-nested-pattern': '^&',
    'no-missing-end-of-source-newline': true,
    'no-empty-source': true,
    'no-duplicate-selectors': true,
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['/^local|^global/'] }],
    'max-nesting-depth': 5,
    'selector-max-compound-selectors': 4,
    'selector-combinator-space-after': 'always',
    'selector-attribute-operator-space-before': 'never',
    'color-no-invalid-hex': true,
    'color-named': 'never',
    'color-hex-length': 'long',
    'string-quotes': 'single',
    'max-empty-lines': 1,
    'rule-empty-line-before': ['always', { except: ['first-nested'], ignore: ['after-comment'] }],
    'at-rule-empty-line-before': [
      'always',
      { except: ['blockless-after-same-name-blockless'], ignore: ['inside-block', 'after-comment'] }
    ],
    'declaration-empty-line-before': ['always', { except: ['first-nested', 'after-comment', 'after-declaration'] }],
    'no-eol-whitespace': [true, { ignore: ['empty-lines'] }],
    'custom-property-empty-line-before': [
      'always',
      { except: ['first-nested', 'after-comment', 'after-custom-property'] }
    ]
  }
}
