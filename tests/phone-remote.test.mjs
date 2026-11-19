import { test } from 'node:test'
import assert from 'node:assert/strict'
import { makeRemoteUrl, readPairing, commandReceiver } from '../lib/phone-remote.mjs'

const key = '0123456789abcdef0123456789abcdef'

test('QR link preserves GitHub Pages base and keeps the pairing secret in the fragment', () => {
  const url = new URL(makeRemoteUrl('https://wuandring.github.io/slidev-Troy/', 'peer-123', key))
  assert.equal(url.pathname, '/slidev-Troy/remote')
  assert.equal(url.search, '')
  assert.deepEqual(readPairing(url.hash), { peer: 'peer-123', key })
  assert.equal(new URL(makeRemoteUrl('http://localhost:3032/', 'peer-123', key)).pathname, '/remote')
})

test('missing, malformed and injected pairing links are rejected', () => {
  for (const hash of ['', '#peer=x', '#peer=x&key=wrong', `#peer=../redirect&key=${key}`])
    assert.equal(readPairing(hash), null)
})

test('only paired next/prev commands with increasing sequences can navigate', () => {
  const actions = []
  const receive = commandReceiver(key, action => actions.push(action))
  const message = { key, type: 'navigate', action: 'next', sequence: 1 }
  assert.equal(receive({ ...message, key: 'other-phone' }), false)
  assert.equal(receive({ ...message, action: 'go-to-url' }), false)
  assert.equal(receive({ ...message, sequence: 1.5 }), false)
  assert.equal(receive(message), true)
  assert.equal(receive(message), false)
  assert.equal(receive({ ...message, action: 'prev', sequence: 2 }), true)
  assert.equal(receive(null), false)
  assert.deepEqual(actions, ['next', 'prev'])
})
