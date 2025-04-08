import { defineNuxtPlugin } from '#app'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

// 停用自動注入CSS，改在 nuxt.config.js 中手動引入
config.autoAddCss = false

// 將整個 fas (Free Solid) icon 集合加入 library
library.add(fas)

// Nuxt 3 插件方式：export default defineNuxtPlugin(...)
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
