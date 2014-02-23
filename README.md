remorse
=====

turn timing information into morse code

## usage

remorse is a through stream that takes arrays of timing information and turns
them into morse code.

remorse accepts two optional parameters:

* the first is what is to be considered the time unit (defaults to 500ms)
* the second is the "fuzziness allowance", as in: "within how many milliseconds
can we smudge the timing to fit our idea of morse code" (defaults to 200ms)

## example

```js
var remorse = require('remorse'),
    fs = require('fs')

fs.createReadStream('mouse-timing-events.dat')
  .pipe(remorse(225, 100))
  .pipe(fs.createWriteStream('secret-morse-codezzz.txt'))
```

## license

MIT
