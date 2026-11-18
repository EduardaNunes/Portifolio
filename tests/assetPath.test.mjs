import test from 'node:test'
import assert from 'node:assert/strict'
import { isVideoFile, resolveAssetPath } from '../src/utils/assetPath.js'

test('resolveAssetPath prefixes absolute public paths with the Vite base URL', () => {
  assert.equal(resolveAssetPath('/images/test.svg', '/Portifolio/'), '/Portifolio/images/test.svg')
  assert.equal(resolveAssetPath('/Portifolio/images/test.svg', '/Portifolio/'), '/Portifolio/images/test.svg')
  assert.equal(resolveAssetPath('https://example.com/test.svg', '/Portifolio/'), 'https://example.com/test.svg')
})

test('isVideoFile detects supported video extensions case-insensitively', () => {
  for (const path of ['/Videos/demo.mp4', '/Videos/demo.WEBM?preview=1', '/Videos/demo.ogg#start']) {
    assert.equal(isVideoFile(path), true)
  }

  for (const path of ['/images/demo.svg', '/images/demo.mp4.png', '', undefined]) {
    assert.equal(isVideoFile(path), false)
  }
})
