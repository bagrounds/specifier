;(function () {
  'use strict'

  /* imports */
  var funTest = require('fun-test')
  var funAssert = require('fun-assert')
  var VError = require('verror')

  /* exports */
  module.exports = [
    test1()
  ]

  var isFunction = funAssert.type('Function')
  var isNumber = funAssert.type('Number')
  var isString = funAssert.type('String')

  // define a test specification
  var spec = {
    arg1: [
      isNumber,
      function isPositive (candidate) {
        if (candidate <= 0) {
          throw new Error(candidate + ' should be positive')
        }
      }
    ],
    arg2: [
      isString
    ]
  }

  function test1 () {
    var funTestOptions = {
      input: spec,
      verifier: verifier,
      sync: true
    }

    function verifier (error, result) {
      if (error) {
        throw new VError(error, 'Should not error')
      }

      isFunction(result)
    }

    var test = funTest(funTestOptions)

    test.description = 'Should return a function'

    return test
  }
})()
