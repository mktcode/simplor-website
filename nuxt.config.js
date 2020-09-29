
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  ssr: false,
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'SimplOr - Simple & flexible Oracle Service for Ethereum Smart Contracts',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/TweenLite.min.js" },
      { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/EasePack.min.js" }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/main'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/markdown'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    ['@nuxtjs/fontawesome', {
      component: 'fa-icon',
      icons: {
        regular: [
          'faFile',
          'faCopy',
          'faCircle',
        ],
        solid: [
          'faCheck',
          'faInfo',
          'faBookReader',
          'faFileImport',
          'faGenderless',
          'faCode',
          'faChevronLeft',
          'faChevronDown',
          'faPlug'
        ],
        brands: [
          'faEthereum',
          'faTwitter',
          'faGithub',
          'faDiscord'
        ]
      }
    }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
