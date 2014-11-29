var test = require('tape')

var remorse = require('../')

test('turns timing data into morse code', function(t) {
  t.plan(1)

  var remorseStream = remorse(500)

  remorseStream.on('data', function(data) {
    t.equal(data.toString(), '... --- ...')
  })

  remorseStream.write([500, 500])
  remorseStream.write([500, 500])
  remorseStream.write([500, 1500])
  remorseStream.write([1500, 500])
  remorseStream.write([1500, 500])
  remorseStream.write([1500, 1500])
  remorseStream.write([500, 500])
  remorseStream.write([500, 500])
  remorseStream.write([500, 3500])
  remorseStream.end()
})

test('deals with fuzziness', function(t) {
  t.plan(1)

  var remorseStream = remorse(addFuzz(500))

  remorseStream.on('data', function(data) {
    t.equal(data.toString(), '... --- ...')
  })

  remorseStream.write([addFuzz(500), addFuzz(500)])
  remorseStream.write([addFuzz(500), 15])
  remorseStream.write([addFuzz(500), addFuzz(1500)])
  remorseStream.write([addFuzz(1500), addFuzz(500)])
  remorseStream.write([addFuzz(1500), 1])
  remorseStream.write([addFuzz(1500), addFuzz(1500)])
  remorseStream.write([addFuzz(500), addFuzz(500)])
  remorseStream.write([addFuzz(500), addFuzz(500)])
  remorseStream.write([addFuzz(500), addFuzz(3500)])
  remorseStream.end()
})

function addFuzz(number) {
  return number + (Math.random(199) | 0) + 1
}
