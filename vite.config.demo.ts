import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { copyFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

// Configuration for building the demo/documentation site
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'copy-images',
      closeBundle() {
        // Copy images to docs folder after build
        const imageTypes = ['arousal', 'valence', 'dominance']
        const docsDir = join(__dirname, 'docs', 'images')
        
        imageTypes.forEach(type => {
          const targetDir = join(docsDir, type)
          if (!existsSync(targetDir)) {
            mkdirSync(targetDir, { recursive: true })
          }
          
          for (let i = 1; i <= 9; i++) {
            const srcPath = join(__dirname, 'images', type, `${type}-${i}.svg`)
            const destPath = join(targetDir, `${type}-${i}.svg`)
            if (existsSync(srcPath)) {
              copyFileSync(srcPath, destPath)
            }
          }
        })
        
        console.log('Images copied to docs folder')
      }
    }
  ],
  base: process.env.BASE_PATH || '/SAM.vue/',  // GitHub Pages base path, configurable via env
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  }
})
