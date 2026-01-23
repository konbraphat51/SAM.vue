import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { copyFileSync, mkdirSync, existsSync, writeFileSync } from 'fs'
import { join } from 'path'

// Configuration for building the demo/documentation site
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'copy-images',
      closeBundle() {
        // Copy images to dist folder after build
        const imageTypes = ['arousal', 'valence', 'dominance']
        const distDir = join(__dirname, 'dist', 'images')
        
        imageTypes.forEach(type => {
          const targetDir = join(distDir, type)
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
        
        // Create .nojekyll file to prevent Jekyll processing on GitHub Pages
        const distRootDir = join(__dirname, 'dist')
        if (!existsSync(distRootDir)) {
          mkdirSync(distRootDir, { recursive: true })
        }
        const nojekyllPath = join(distRootDir, '.nojekyll')
        writeFileSync(nojekyllPath, '', 'utf8')
        
        console.log('Images copied to dist folder')
        console.log('.nojekyll file created')
      }
    }
  ],
  base: process.env.BASE_PATH || './',  // GitHub Pages base path, configurable via env
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})
