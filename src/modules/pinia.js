import { createPinia } from 'pinia'

// Setup Pinia
// https://pinia.esm.dev/
export const install = ({ app }) => {
  const pinia = createPinia()
  app.use(pinia)
}
