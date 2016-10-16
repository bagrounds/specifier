# specifier

Specify constraints for JavaScript objects.

[![js-standard-style][standard-img]][standard-url]

## Installation
``` bash
$ npm install specifier
```

## Usage
``` js
;(function () {
  'use strict'

  var specifier = require('specifier')

  module.exports = myFunction

  var specification = {
    option1: [
      constraintFunction1: function (option1Candidate) {
        var invalid = false
        // if option1Candidate is invalid, set invalid to true

        if (invalid) {
          var message = 'option1 should be valid!'
          return new Error(message)
        }
      }
    ]
  }

  var specificationChecker = specifier(specification)

  function myFunction (options) {
    // if all options in the spec aren't required, insert default values into options object
    var error = specificationChecker(options)

    if (error) {
      return error
    }
  }
})()
```

## Tests
``` bash
$ npm test
```

## License
[MIT][license-url]

[license-url]: LICENSE

[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
