# specifier

Specify constraints for JavaScript objects.

[![js-standard-style][standard-img]][standard-url]

## Installation
``` bash
$ npm install specifier
```

## Usage
```js
;(function () {
  'use strict'

  var specifier = require('specifier')

  module.exports = myFunction

  var optionsSpec = {
    option1: [
      function c1 (candidate) {
        // if candidate doesn't satisfy constraint, throw an error
      }
    ]
  }

  var optionsChecker = specifier(optionsSpec)

  function myFunction (options) {
    // will throw error if options.option1 fails specification constraint c1
    optionsChecker(options)
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
