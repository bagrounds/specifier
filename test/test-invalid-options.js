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

  var specChecker
  describe('specify', function () {
    it('should return a function', function () {
      specChecker = specify(spec)
      expect(typeCheck('Function', specChecker))
    })

    it('return no errors or warnings on good input', function (done) {
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
  })
})()
