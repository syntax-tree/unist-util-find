# unist-find

[Unist](https://github.com/wooorm/unist) node finder. Useful for working with [remark](https://github.com/wooorm/remark), [rehype](https://github.com/wooorm/rehype) and [retext](https://github.com/wooorm/retext).

## Installation

    npm install --save unist-find

## Usage

### Example

```js
var remark = require('remark')
var find = require('unist-find')

remark()
  .use(find, { value: 'emphasis' })
  .process('Some _emphasis_, **strongness**, and `code`.')
```

Result:

```js
{ type: 'text', value: 'emphasis' }
```

### API

```
find(node, condition)
```

Find the first node that matches `condition`.

*   `node` (`[Node](https://github.com/wooorm/unist#node)`) - Node to search
*   `condition` (`string`, `object` or `function`) - Condition used to test each node

## License

MIT
