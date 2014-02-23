var remorse = require('../')(500),
    ws = require('stream').Writable(),
    assert = require('assert')

ws._write = function(data, enc, next) {
  assert.strictEqual(data.toString(), '... --- ...')
  next()
}

remorse.pipe(ws)

remorse.write([500, 500])
remorse.write([500, 500])
remorse.write([500, 1500])
remorse.write([1500, 500])
remorse.write([1500, 500])
remorse.write([1500, 1500])
remorse.write([500, 500])
remorse.write([500, 500])
remorse.write([500, 3500])
remorse.end()
