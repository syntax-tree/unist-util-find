# unist-find [![Travis](https://img.shields.io/travis/blahah/unist-find.svg)](https://travis-ci.org/blahah/unist-find)

[Unist](https://github.com/wooorm/unist) node finder. Useful for working with [remark](https://github.com/wooorm/remark), [rehype](https://github.com/wooorm/rehype) and [retext](https://github.com/wooorm/retext).

## Installation

```
npm install --save unist-find
```

## Usage

### Example

```js
var remark = require('remark')
var find = require('unist-find')

remark()
  .use(function (tree) {
    // string condition
    console.log(find(tree, 'value'))

    // object condition
    console.log(find(tree, { value: 'emphasis' }))

    // function condition
    console.log(find(tree, function (node) {
      return node.type === 'inlineCode'
    }))
  })
  .process('Some _emphasis_, **strongness**, and `code`.')

```

Result:

```js
// string condition: 'value'
{ type: 'text', value: 'Some' }

// object condition: { value: 'emphasis' }
{ type: 'text', value: 'emphasis' }

// function condition: function (node) { return node.type === 'inlineCode' }
{ type: 'inlineCode', value: 'code' }
```

### API

```
find(node, condition)
```

Return the first node that matches `condition`, or `undefined` if no node matches.

*   `node` (`[Node](https://github.com/wooorm/unist#node)`) - Node to search
*   `condition` (`string`, `object` or `function`) - Condition used to test each node. Behaviour depends on the type of the condition:
  - `string` finds first node with a truthy property matching `string`
  - `object` finds first node that has matching values for all properties of `object`
  - `function` finds first node for which `function` returns true when passed `node` as argument

## License

MIT
