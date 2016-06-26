# brackets-stylelint
A Brackets extension to lint css with stylelint. Place in your brackets/src/extensions/user folder to install. Not currently available through extension registry.

brackets-stylelint integrates with Brackets' built-in linting system. Errors and warnings are indicated in the lower right corner of the Brackets editor.

# Status
The built-in Node runtime that Brackets uses is version 0.10. stylelint is not compatable with this old version of Node, so this extension is blocked on https://github.com/adobe/brackets/issues/11748. This issue was in the 1.6 release milestone, but has not been included in the 1.6 or 1.7 Brackets releases.

# Credit
Built with [stylelint](http://stylelint.io/)
