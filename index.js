/**
 * @author Richard Smith-Unna
 * @copyright 2016 Richard Smith-Unnar
 * @license MIT
 * @module unist:find
 * @fileoverview Unist node finder
 */
import { visit } from 'unist-util-visit'
import iteratee from 'lodash.iteratee'

/**
 * Find
 *
 * @param {Node} tree - Root node
 * @param {string|object|function} [condition] - Condition to match node.
 */
function find (tree, condition) {
  if (!tree) throw new Error('unist-find requires a tree to search')
  if (!condition) throw new Error('unist-find requires a condition')

  const predicate = iteratee(condition)
  let result

  visit(tree, function (node) {
    if (predicate(node)) {
      result = node
      return false
    }
  })

  return result
}

/*
 * Expose.
 */
export default find
