const markdown = require('markdown-it')
const hljs = require('highlight.js')

export default ({ app }, inject) => {
  inject('markdown', markdown({
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (__) {}
      }

      return ''; // use external default escaping
    }
  }))
}
