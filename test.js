import assert from 'node:assert/strict'
import test from 'node:test'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {find} from 'unist-util-find'

test('find', async function (t) {
  const tree = fromMarkdown('Some _emphasis_, **strongness**, and `code`.')
  assert(tree.type === 'root')
  const paragraph = tree.children[0]
  assert(paragraph.type === 'paragraph')

  await t.test('should fail without tree', function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      find()
    })
  })

  await t.test('should fail without condition', function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      find(tree)
    })
  })

  await t.test('should find with string condition', function () {
    const result = find(tree, 'value')

    assert.equal(result, paragraph.children[0])
  })

  await t.test('should find with object condition', function () {
    const result = find(tree, {type: 'emphasis'})

    assert.equal(result, paragraph.children[1])
  })

  await t.test('should find with function condition', function () {
    const result = find(tree, function (node) {
      return node.type === 'inlineCode'
    })

    assert.equal(result, paragraph.children[5])
  })

  await t.test('should return undefined if no matches', function () {
    const result = find(tree, 'nope, nope, nope')

    assert.equal(result, undefined)
  })
})
