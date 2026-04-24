import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  base: "/cadreho/bulletin/",
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/main.ts', import.meta.url)),
      name: 'AmxBulletin',
      fileName: 'bulletin',
      formats: ['umd']
    },
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'bulletin.css';
          return assetInfo.name || 'bulletin.css';
        }
      }
    }
  }
})
