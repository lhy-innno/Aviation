import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import createImportPlugin from 'vite-plugin-import'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		createImportPlugin({
			onlyBuild: false, // 只在生产环境中使用
			babelImportPluginOptions: [
				{
					libraryName: 'antd',
					libraryDirectory: 'es',
					style: true
				}
			]
		})
	],
	// 配置路径别名
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
	},
	server: {
		port: 3001, // 启动端口
		hmr: {
			host: '127.0.0.1',
			port: 3001
		},
		// 设置 https 代理
		proxy: {
			'/api': {
				target: 'http://localhost:8964',
				changeOrigin: true,
				rewrite: (url: string) => url.replace(/^\/api/, '')
			}
		}
	},

	build: {
		outDir: 'build'
	},
	css: {
		// 指定传递给 CSS 预处理器的选项; 文件扩展名用作选项的键
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				modifyVars: {
					'@primary-color': '#f95959', // 全局主色
					'@link-color': '#B81419', // 链接色
					'@border-radius-base': '4px' // 组件/浮层圆角
				}
			}
		}
	}
})
