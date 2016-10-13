/**
 * Tests for specify
 */
;(function () {
  /* global describe, it */
  'use strict'

  /* imports */
  var expect = require('chai').expect
  var typeCheck = require('type-check').typeCheck
  var specify = require('../specify')

  // define a test specification
  var spec = {
    arg1: {
      required: true,
      constraints: [
        function c1 (candidate) {
          var valid = typeCheck('Number', candidate)

          if (!valid) {
            var message = 'should be a number'
            var error = new Error(message)
            return error
          }
        },
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

  describe('specify', function () {
    var specChecker
    before(function () {
      specChecker = specify(spec)
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