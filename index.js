var through = require('through')

module.exports = remorse

function remorse(time_unit) {
  var stream = through(process)

  var DOT = time_unit,
      DASH = time_unit * 3,
      INTER_DOTDASH = time_unit,
      INTER_LETTER = time_unit * 3,
      INTER_WORD = time_unit * 7

  var current_word = [],
      conversion = {}

  conversion['' + DOT] = '.'
  conversion['' + DASH] = '-'

  return stream

  function process(data) {
    var character = data[0],
        space = data[1]

    current_word.push(conversion[character])
    if (space === INTER_WORD) {
      stream.queue(current_word.join(''))
      return current_word = []
    }
    if (space === INTER_LETTER) current_word.push(' ')
  }
}
