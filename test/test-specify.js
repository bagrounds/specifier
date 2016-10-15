/**
 * Tests for specifier
 */
;(function () {
  /* global describe, it */
  'use strict'

  /* imports */
  var expect = require('chai').expect
  var typeCheck = require('type-check').typeCheck
  var specifier = require('../specifier')

  // define a test specification
  var spec = {
    arg1: {
      required: true,
      constraints: [
        specifier.type('Number'),
        function c2 (candidate) {
          var valid = candidate > 0

          if (!valid) {
            var message = 'should be positive'
            var error = new Error(message)
            return error
          }
        }
      ]
    },
    arg2: {
      required: false,
      constraints: [
        function c1 (candidate) {
          var valid = typeCheck('String', candidate)

          if (!valid) {
            var message = 'should be a string'
            var error = new Error(message)
            return error
          }
        }
      ]
    }
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
      it('returns no errors or warnings on good input', function (done) {
        var candidate = {
          arg1: 3,
          arg2: 'a string'
        }

        specChecker(candidate, function (error, warning) {
          expect(error).not.to.be.ok
          expect(warning).not.to.be.ok
          done()
        })
      })

      it('returns an error if missing required options', function (done) {
        var candidate = {
          arg2: 'a string'
        }

        specChecker(candidate, function (error, warning) {
          expect(error).to.be.ok
          done()
        })
      })

      it('returns a warning for extraneous options', function (done) {
        var candidate = {
          arg1: 3,
          arg2: 'a string',
          arg3: 'anything'
        }

        specChecker(candidate, function (error, warning) {
          expect(error).not.to.be.ok
          expect(warning).to.be.ok
          done()
        })
      })

      it('returns an error for options out of constraints', function (done) {
        var candidate = {
          arg1: -3,
          arg2: 'a string'
        }

        specChecker(candidate, function (error, warning) {
          expect(error).to.be.ok
          expect(warning).not.to.be.ok
          done()
        })
      })
    })
  })
})()
