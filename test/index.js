#!/usr/bin/env node
;(function () {
  'use strict'

  /* imports */
  var funTestRunner = require('fun-test-runner')
  var VError = require('verror')
  var tests = require('./tests')
  var subject = require('../src/index')

  main()

  function main () {
    var funTestRunnerOptions = {
      tests: tests,
      subject: subject
    }

    funTestRunner(funTestRunnerOptions, function (error) {
      if (error) {
        throw new VError(error, 'Error running tests')
      }
    })
  }
})()
