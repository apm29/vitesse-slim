import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from "pinia"
import routes from '~pages'
import 'uno.css'
// preflights from tailwind
import '@unocss/reset/tailwind.css'
//store
const pinia = createPinia()
//router
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(pinia).use(router).mount('#app')
