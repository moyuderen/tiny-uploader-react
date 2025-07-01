import { fileURLToPath, URL } from 'node:url'
import type ts from 'typescript'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-ignore
import dts from 'unplugin-dts/vite'

// https://vite.dev/config/pn
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      bundleTypes: true, // 合并类型到一个文件
      tsconfigPath: './tsconfig.app.json',
      outDirs: ['./dist/types'], //
      skipDiagnostics: false, // 不跳过类型检查
      logDiagnostics: true, // 输出诊断日志
      include: ['src/**/*'], // 明确包含源文件
      afterDiagnostic: (diagnostics: readonly ts.Diagnostic[]) => {
        console.log('TypeScript Diagnostics:', diagnostics) // 调试类型错误
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/variables.scss";'
      }
    }
  },
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'TinyUploader',
      fileName: (format) => `uploader.${format}.js`,
      formats: ['es', 'umd', 'cjs']
    },
    minify: true,
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        assetFileNames: 'style.[ext]'
      }
    }
  }
})
