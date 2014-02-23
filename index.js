var through = require('through')

module.exports = remorse

function remorse(_time_unit, _fuzziness) {
  var time_unit = _time_unit || 500,
      fuzziness = _fuzziness || 200

  var DOT = time_unit,
      DASH = time_unit * 3,
      INTER_DOTDASH = time_unit,
      INTER_LETTER = time_unit * 3,
      INTER_WORD = time_unit * 7

  var stream = through(process)

  var current_word = [],
      conversion = {}

  conversion['' + DOT] = '.'
  conversion['' + DASH] = '-'

  return stream

  function process(data) {
    var character = defuzz(data[0]),
        space = defuzz(data[1])

    current_word.push(conversion[character])
    if (space === INTER_WORD) {
      stream.queue(current_word.join(''))
      return current_word = []
    }
    if (space === INTER_LETTER) current_word.push(' ')
  }

  function defuzz(time) {
    if (time < (DOT + fuzziness)) return DOT
    if (Math.abs(time - DASH) <= fuzziness) return DASH

    return INTER_WORD
  }
}
