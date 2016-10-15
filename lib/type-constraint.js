/**
 * type-constraint uses the type-check module to check types
 *
 * @module type-constraint
 */
;(function () {
  'use strict'

  /* imports */
  var typeCheck = require('type-check').typeCheck

  /* exports */
  module.exports = typeConstraint

  /**
   * typeConstraint uses the type-check module to check types
   *
   * @function typeConstraint
   * @alias type-constraint
   *
   * @param {String} type as defined by type-check module
   * @return {Error} if type is incorrect
   */
  function typeConstraint (type) {
    return function (candidate) {
      var valid = typeCheck(type, candidate)

      if (!valid) {
        var message = 'should be a ' + type
        var error = new Error(message)
        return error
      }
    }
  }
})()
