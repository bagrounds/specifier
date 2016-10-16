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
      return Object.keys(specification).reduce(function (error, option) {
        return error ||
          specification[option].reduce(function (error, constraint) {
            return error || constraint(candidate[option])
          }, null)
      }, null)
    }
  }
})()
