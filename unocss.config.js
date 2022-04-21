import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-blue-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['btn-icon', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-blue-700'],
    ['divider-h', 'h-1px w-9/10 bg-gray-400/30 block'],
    ['btn-on-bg-surface', 'disabled:bg-gray-600 disabled:opacity-50 cursor-pointer inline-block select-none hover:text-blue-600 dark:hover:text-blue-200 text-gray-500 dark:text-gray-400'],
    ['btn-primary', 'disabled:bg-gray-600 disabled:opacity-50 cursor-pointer inline-block select-none transition-all hover:shadow-lg hover:bg-blue-600 text-white bg-blue-500 rounded-full px-4 py-2'],
    ['btn-send', 'disabled:bg-gray-600 disabled:opacity-50 cursor-pointer inline-block select-none transition-all hover:shadow-lg  hover:bg-blue-600 dark:hover:bg-blue-600 text-white bg-dark-300 dark:bg-purple-500 rounded px-4 py-2'],
    ["bg-surface", "bg-gray-100 dark:bg-dark-500 text-gray-500/60"],
    ["bg-surface-secondary", "bg-white dark:bg-dark-400 text-gray-500/60"],
    ["title-1", "text-2xl font-bold text-gray-700 dark:text-gray-200 "],
    ["title-2", "text-xl font-normal text-gray-500/80"],
    ["link", "disabled:bg-gray-600 disabled:opacity-50 hover:text-blue-700 transition-colors flex items-center"],
    ["colored-scrollbar", "scrollbar scrollbar-rounded dark:scrollbar-track-color-transparent dark:scrollbar-thumb-color-gray-800"],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetScrollbar(),
    presetIcons({
      scale: 1,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
