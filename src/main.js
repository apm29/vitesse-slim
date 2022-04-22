import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
//生成基于页面的路由
import routes from '~pages'
//导入基础样式
import './styles/main.css'
import 'uno.css'
// preflights from tailwind 基于tailwind的css重置
import '@unocss/reset/tailwind.css'
//router
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


const app = createApp(App)
app.use(router)
// install all modules under `modules/` 自动导入modules文件夹下的js模块,并且自动注册到vue实例中,需要暴露install方法方法,接收一个参数,包含vue实例
Object.values(import.meta.globEager('./modules/*.js')).forEach(function (i) {
  return i.install?.({ app, router })
})
//挂载到#app元素
app.mount('#app')
