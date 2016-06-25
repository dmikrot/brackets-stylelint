/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 2, maxerr: 50 */
/*global define, brackets, $, window */

define(function (require, exports, module) {
  'use strict';

  var AppInit = brackets.getModule('utils/AppInit'),
    CodeInspection = brackets.getModule('language/CodeInspection'),
    NodeDomain = brackets.getModule('utils/NodeDomain'),
    ExtensionUtils = brackets.getModule('utils/ExtensionUtils');

  var modulePath = ExtensionUtils.getModulePath(module, 'node/stylelintDomain');
  var stylelintDomain = new NodeDomain('stylelint', modulePath);

  function getType(severity) {
    return severity === 'error' ? CodeInspection.Type.ERROR : CodeInspection.Type.WARNING;
  }

  function mapWarning(warning) {
    return {
      pos: {
        line: warning.line,
        ch: warning.column
      },
      message: warning.text,
      type: getType(warning.severity)
    };
  }

  function mapWarnings(warnings) {
    return warnings.map(mapWarning);
  }

  function mapResult(result) {
    return mapWarnings(result.warnings || []);
  }

  function mapResults(results) {
    return results.map(mapResult);
  }

  function getResults(data) {
    return data.results || [];
  }

  function flatten(results) {
    return results.reduce([].concat.bind([]));
  }

  function styleLinter(text, path) {
    return stylelintDomain.exec('lint', {
      code: text,
      codeFilename: path,
      formatter: 'string'
    }).then(getResults)
      .then(mapResults)
      .then(flatten);
  }

  AppInit.appReady(function () {
    CodeInspection.register('css', {
      name: 'stylelint',
      scanFileAsync: styleLinter
    });
  });
});
