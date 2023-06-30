const remark = require('remark')
const find = require('./index.js')

remark()
  .use(function () {
    return function (tree) {
      // String condition
      console.log(find(tree, 'value'))

      // Object condition
      console.log(find(tree, {value: 'emphasis'}))

      // Function condition
      console.log(
        find(tree, function (node) {
          return node.type === 'inlineCode'
        })
      )
    }
  })
  .processSync('Some _emphasis_, **strongness**, and `code`.')
