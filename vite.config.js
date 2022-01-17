import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const { resolve } = require('path')

export default {
    // 起个别名，在引用资源时，可以用‘@/资源路径’直接访问
    resolve: {
        alias: {
        "@": resolve(__dirname, "src"),
        },
    },
    base: './',
    plugins: [vue()],
    server: {
        host: 'localhost',
        port: 8888,
        // 是否开启 https
        https: false,
    },
    optimizeDeps: {
        include: ['schart.js']
    }
}