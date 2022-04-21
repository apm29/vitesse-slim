# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)


## vite安装scss
`pnpm add sass`

vite.config.js
```js
 /* CSS 预处理器 */
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/assets/styles/var.scss";'
      }
    }
  }
```

## 基于文件的路由
`pnpm add vite-plugin-pages -D`
`pnpm add vue-router`

vite.config.js
```js
import Pages from 'vite-plugin-pages'
export default {
  plugins: [
    Pages({
      //可以配置页面文件路径,默认为src/pages
      dirs: 'src/pages',
    })
  ]
}
```

vue
```js
import { createRouter } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  // ...
  routes,
})
```

## 自动导入组件
`pnpm add unplugin-vue-components -D`

vite.config.ts
```js
// vite.config.ts
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Components({ /* options */ }),
  ],
})
```

## 自动导入Vue,VueRouter等
`pnpm add -D unplugin-auto-import`

vite.config.ts
```js
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({ /* options */ }),
  ],
})
```


## UNOCSS
`pnpm add -D unocss`

```js
// vite.config.ts
import Unocss from 'unocss/vite'

export default {
  plugins: [
    Unocss({ /* options */ }),
  ],
}
```

添加preset,可以移到单独的unocss.config.js文件中
```js
// vite.config.ts
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'

export default {
  plugins: [
    Unocss({
      presets: [
        presetAttributify({ /* preset options */}),
        presetUno(),
        // ...custom presets
      ],
    }),
  ],
}
```

## 添加纯css Icon
[github](https://github.com/unocss/unocss/tree/main/packages/preset-icons)
添加preset-icon, mdi和carbon的json集
`pnpm add -D @unocss/preset-icons @iconify-json/mdi @iconify-json/carbon`

添加配置
```js
import presetIcons from '@unocss/preset-icons'

Unocss({
  presets: [
    presetIcons({ /* options */ }),
    // ...other presets
  ],
})
```
