;(function () {
  'use strict'

  /* imports */
  var funTest = require('fun-test')
  var funAssert = require('fun-assert')
  var VError = require('verror')

  /* exports */
  module.exports = [
    test1(),
    test2(),
    test3(),
    test4(),
    test5(),
    test6(),
    test7()
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

  function test2 () {
    var candidate = {
      arg1: 3,
      arg2: 'a string'
    }

    var funTestOptions = {
      input: candidate,
      verifier: verifier,
      transformer: transformer,
      sync: true
    }

    function verifier (error) {
      if (error) {
        throw new VError(error, 'Should not error')
      }
    }

    var test = funTest(funTestOptions)

    test.description = 'Should not throw errors if candidate matches spec'

    return test
  }

  function test3 () {
    var candidate = {
      arg1: 3
    }

    var funTestOptions = {
      input: candidate,
      verifier: verifier,
      transformer: transformer,
      sync: true
    }

    function verifier (error) {
      if (!error) {
        throw new Error('Should error')
      }
    }

    var test = funTest(funTestOptions)

    test.description = 'Should throw error for missing option'

    return test
  }

  function test4 () {
    var candidate = {
      arg1: 3,
      arg2: 'a string',
      extra: 'an extraneous option'
    }

    var funTestOptions = {
      input: candidate,
      verifier: verifier,
      transformer: transformer,
      sync: true
    }

    function verifier (error) {
      if (error) {
        throw new VError(error, 'Should not error')
      }
    }

    var test = funTest(funTestOptions)

    test.description = 'Should not throw error for extraneous options'

    return test
  }

  function test5 () {
    var candidate = {
      arg1: -1,
      arg2: 'a string'
    }

    var funTestOptions = {
      input: candidate,
      verifier: verifier,
      transformer: transformer,
      sync: true
    }

    function verifier (error) {
      if (!error) {
        throw new Error('Should error')
      }
    }

    var test = funTest(funTestOptions)

    test.description = 'Should throw error for option out of constriant'

    return test
  }

  function test6 () {
    var spec = {
      'arg1.arg1a': [
        funAssert.type('Number')
      ]
    }

    var candidate = {
      arg1: {
        arg1a: 3
      }
    }

    var funTestOptions = {
      input: candidate,
      verifier: verifier,
      transformer: function transformer (specifier) {
        return specifier(spec, true)
      },
      sync: true
    }

    function verifier (error) {
      if (error) {
        throw new VError(error, 'Should not error')
      }
    }

    var test = funTest(funTestOptions)

    test.description = 'Should work with objectPath'

    return test
  }

  function test7 () {
    var spec = {
      'arg1.arg1a': [
        funAssert.type('Number')
      ]
    }

    var candidate = {
      arg1: {
        arg1a: '3'
      }
    }

    var funTestOptions = {
      input: candidate,
      verifier: verifier,
      transformer: function transformer (specifier) {
        return specifier(spec, true)
      },
      sync: true
    }

    function verifier (error) {
      if (!error) {
        throw new Error('Should error')
      }
    }

    var test = funTest(funTestOptions)

    test.description = 'Should work with objectPath and throw'

    return test
  }

  function transformer (specifier) {
    return specifier(spec)
  }
})()
