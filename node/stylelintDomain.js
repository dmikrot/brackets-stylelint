/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 2, maxerr: 50, node: true, es5: true */

(function () {
  'use strict';

  var stylelint = require('stylelint');

  function lintCommand(config, errback) {
    stylelint.lint(config)
      .then(function (data) {
        errback(null, data);
      }).catch(function (err) {
        errback('stylelint threw an error');
      });
  }

  function init(domainManager) {
    if (!domainManager.hasDomain('stylelint')) {
      domainManager.registerDomain('stylelint', {major: 0, minor: 1});
    }
    domainManager.registerCommand('stylelint', 'lint', lintCommand, true);
  }

  exports.init = init;
}());
