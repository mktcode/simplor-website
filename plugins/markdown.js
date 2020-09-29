const markdown = require('markdown-it')
const hljs = require('highlight.js')
const hljsSolidity = require('highlightjs-solidity')
hljsSolidity(hljs)

export default ({
  app
}, inject) => {
  inject('markdown', markdown({
    highlight: function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs rounded-lg p-3"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>';
        } catch (__) {}
      }

      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  }))
}
