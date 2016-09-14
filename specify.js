/**
 * specify takes a specification object and returns a function that checks
 * candidate objects against the specification.
 *
 * @module specify
 */
;(function () {
  'use strict'

  /* imports */

  /* exports */
  module.exports = specify

  // var specification = {
  // option1: {
  // required: true,
  // constraints: [
  // option1constraint1,
  // option1constraint2
  // ]
  // },
  // option2: {
  // required: false,
  // defaultValue: 'some default value',
  // constraints: [
  // option2constraint1,
  // option2constraint2
  // ]
  // }
  // }

  /**
   * invalidOptions returns an error if options are invalid.
   *
   * @function invalidOptions
   * @alias invalid-options
   *
   * @param {Object} specification to check candidates against
   * @return {Function} that checks candidates against specification
   */
  function specify (specification) {
    return function specificationChecker (candidate, callback) {
      var problems = {
        errors: [],
        warnings: []
      }

      problems = missing(specification, candidate, problems)

      problems = outOfConstraints(specification, candidate, problems)

      problems = extraneous(specification, candidate, problems)

      problems.warnings = problems.warnings.map(function (warning) {
        return 'Warning: ' + warning
      })

      var combinedError = combineProblems(problems.errors)
      var combinedWarning = combineProblems(problems.warnings)

      callback(combinedError, combinedWarning)
    }
  }

  function missing (specification, candidate, problems) {
    // identify all missing required options
    return Object.keys(specification).reduce(function (problems, option) {
      if (specification[option].required && !candidate[option]) {
        var message = 'missing option: ' + option
        var error = new Error(message)
        problems.errors.push(error)
      }

      return problems
    }, problems)
  }

  function outOfConstraints (specification, candidate, problems) {
    // identify all problems with expected options
    return Object.keys(candidate).reduce(function (problems, option) {
      if (specification[option]) {
        var constraints = specification[option].constraints

        if (constraints) {
          constraints.forEach(function (invalid) {
            var problem = invalid(candidate[option])
            if (problem) {
              var message = invalid(candidate[option]) + ': ' + option
              problems.errors.push(message)
            }
          })
        }
      }

      return problems
    }, problems)
  }

  function extraneous (specification, candidate, problems) {
    // identify all extraneous options
    return Object.keys(candidate).reduce(function (problems, option) {
      if (!specification[option]) {
        var message = 'extraneous option: ' + option
        problems.warnings.push(message)
      }

      return problems
    }, problems)
  }

  function combineProblems (problems) {
    if (problems && problems.length) {
      return problems.reduce(function (combined, error) {
        return combined + '; ' + error
      })
    }
  }
})()
