var remorse = require('../')(add_fuzz(500)),
    ws = require('stream').Writable(),
    assert = require('assert')

ws._write = function(data, enc, next) {
  assert.strictEqual(data.toString(), '... --- ...')
  next()
}

remorse.pipe(ws)

remorse.write([add_fuzz(500), add_fuzz(500)])
remorse.write([add_fuzz(500), 15])
remorse.write([add_fuzz(500), add_fuzz(1500)])
remorse.write([add_fuzz(1500), add_fuzz(500)])
remorse.write([add_fuzz(1500), 1])
remorse.write([add_fuzz(1500), add_fuzz(1500)])
remorse.write([add_fuzz(500), add_fuzz(500)])
remorse.write([add_fuzz(500), add_fuzz(500)])
remorse.write([add_fuzz(500), add_fuzz(3500)])
remorse.end()

function add_fuzz(number) {
  return number + ~~(Math.random(199)) + 1
}
