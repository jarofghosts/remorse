var through = require('through')

module.exports = remorse

function remorse(_timeUnit, _fuzziness) {
  var timeUnit = _timeUnit || 500
    , fuzziness = _fuzziness || 200

  var DOT = timeUnit
    , DASH = timeUnit * 3
    , INTER_LETTER = timeUnit * 3
    , INTER_WORD = timeUnit * 7

  var stream = through(process)

  var currentWord = []
    , conversion = {}

  conversion['' + DOT] = '.'
  conversion['' + DASH] = '-'

  return stream

  function process(data) {
    var character = defuzz(data[0])
      , space = defuzz(data[1])

    currentWord.push(conversion[character])

    if(space === INTER_WORD) {
      stream.queue(currentWord.join(''))

      return currentWord = []
    }

    if(space === INTER_LETTER) currentWord.push(' ')
  }

  function defuzz(time) {
    if(time <= (DOT + fuzziness)) return DOT
    if(time > (DOT + fuzziness) && time < (INTER_WORD - fuzziness)) {
      return DASH
    }

    return INTER_WORD
  }
}
