/**
 * @author Richard Smith-Unna
 * @copyright 2016 Richard Smith-Unnar
 * @license MIT
 * @module unist:find
 * @fileoverview Unist node finder
 *
 * @typedef {import('unist').Node} Node
 *
 * @typedef {string} TestStr
 *   Finds first node with a truthy property matching string.
 * @typedef {Object.<string, unknown>} TestObj
 *   Finds first node that has matching values for all properties of object.
 * @typedef {<V extends Node>(node: V) => boolean} TestFn
 *   Finds first node for which function returns true when passed node as argument.
 */

import visit from 'unist-util-visit'
import iteratee from 'lodash.iteratee'

/**
 * Unist node finder utility.
 *
 * @template {Node} V
 *   Node to search for.
 * @param {Node} tree
 *   Tree to search in.
 * @param {TestStr | TestObj | TestFn} condition
 *   Condition used to test each node, which matches `V`.
 * @returns {V | undefined}
 *   The first node that matches condition, or `undefined` if no node matches.
 */
export function find(tree, condition) {
  if (!tree) throw new Error('unist-util-find requires a tree to search')
  if (!condition) throw new Error('unist-util-find requires a condition')

  const predicate = iteratee(condition)
  /** @type {V | undefined} */
  let result

  visit(tree, function (node) {
    if (predicate(node)) {
      // @ts-expect-error: assume `predicate` checks for `V`.
      result = node
      return false
    }
  })

  return result
}
