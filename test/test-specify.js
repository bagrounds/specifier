/**
 * Tests for specifier
 */
;(function () {
  /* global describe, it */
  'use strict'

  /* imports */
  var expect = require('chai').expect
  var typeCheck = require('type-check').typeCheck
  var specifier = require('../src/index')

  // define a test specification
  var spec = {
    arg1: [
      function c1 (candidate) {
        var valid = typeCheck('Number', candidate)

        if (!valid) {
          var message = 'should be a Number'
          var error = new Error(message)
          return error
        }
      },
      function c1 (candidate) {
        var valid = candidate > 0

        if (!valid) {
          var message = 'should be positive'
          var error = new Error(message)
          return error
        }
      }
    ],
    arg2: [
      function c1 (candidate) {
        var valid = typeCheck('String', candidate)

        if (!valid) {
          var message = 'should be a String'
          var error = new Error(message)
          return error
        }
      }
    ]
  }

  describe('specifier', function () {
    var specChecker

    before(function () {
      specChecker = specifier(spec)
    })

    describe('constructor', function () {
      it('returns a function', function () {
        expect(typeCheck('Function', specChecker))
      })
    })

    describe('specification checker', function () {
      it('returns no errors or warnings on good input', function () {
        var candidate = {
          arg1: 3,
          arg2: 'a string'
        }

        var error = specChecker(candidate)
        expect(error).not.to.be.ok
      })

      it('returns an error if missing options', function () {
        var candidate = {
          arg2: 'a string'
        }

        var error = specChecker(candidate)
        expect(error).to.be.ok
      })

      it('ignores extraneous options', function () {
        var candidate = {
          arg1: 3,
          arg2: 'a string',
          arg3: 'anything'
        }

        var error = specChecker(candidate)
        expect(error).not.to.be.ok
      })

      it('returns an error for options out of constraints', function () {
        var candidate = {
          arg1: -3,
          arg2: 'a string'
        }

        var error = specChecker(candidate)
        expect(error).to.be.ok
      })
    })
  })
})()
