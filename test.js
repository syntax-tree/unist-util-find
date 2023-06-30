/**
 * @typedef {import('mdast').Root} Root
 */

const assert = require('node:assert/strict')
const test = require('tape')
const remark = require('remark')
const find = require('./index.js')

test('unist-find', function (t) {
  const tree = /** @type {Root} */ (
    remark().parse('Some _emphasis_, **strongness**, and `code`.')
  )
  assert(tree.type === 'root')
  const paragraph = tree.children[0]
  assert(paragraph.type === 'paragraph')

  t.throws(function () {
    // @ts-expect-error: check that an error is thrown at runtime.
    find()
  }, 'should fail without tree')

  t.throws(function () {
    // @ts-expect-error: check that an error is thrown at runtime.
    find(tree)
  }, 'should fail without condition')

  t.test('should find with string condition', function (st) {
    const result = find(tree, 'value')

    st.equal(result, paragraph.children[0])

    st.end()
  })

  t.test('should find with object condition', function (st) {
    const result = find(tree, {type: 'emphasis'})

    st.equal(result, paragraph.children[1])

    st.end()
  })

  t.test('should find with function condition', function (st) {
    const result = find(tree, function (node) {
      return node.type === 'inlineCode'
    })

    st.equal(result, paragraph.children[5])

    st.end()
  })

  t.test('should return undefined if no matches', function (st) {
    const result = find(tree, 'nope, nope, nope')

    st.equal(result, undefined)

    st.end()
  })
})
