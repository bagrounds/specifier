/**
 * specifier takes a specification object and returns a function that checks
 * a candidate object against the specification. The specification object
 * contains the same fields that are expected in the candidate object. Each
 * field of the specification object contains an array of constraint functions.
 * Each constraint function takes a value and returns an error if that value
 * is invalid.
 *
 * @module specifier
 */
;(function () {
  'use strict'

  /* imports */
  var VError = require('verror')

  /* exports */
  module.exports = specifier

  /**
   * @function specifier
   *
   * @param {Object} specification to check candidates against
   * @return {Function} that checks candidates against specification
   */
  function specifier (specification) {
    return function specificationChecker (candidate) {
      var keys = Object.keys(specification)

      keys.forEach(function (key) {
        specification[key].forEach(function (assertion) {
          try {
            assertion(candidate[key])
          } catch (error) {
            throw new VError(error, 'Error for: ' + key)
          }
        })
      })
    }
  }
})()
