/*
 * @Author: dingyun
 * @Date: 2021-12-10 20:54:10
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2022-01-05 15:16:44
 * @Description:
 */
// https://umijs.org/config/
import { defineConfig } from 'umi'
import defaultSettings from './defaultSettings'
import proxy from './proxy'
import routes from './routes'
import theme from './theme'

const { REACT_APP_ENV } = process.env

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading'
  },
  targets: {
    ie: 11
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // 这里不能按照文档写，@primary-color，会导致下面的 scripts 失效
    'primary-color': defaultSettings.primaryColor,
    ...theme
  },
  scripts: [
    {
      src: '/js/canvas-nest.min.js',
      defer: true
    }
  ],
  request: {
    dataField: ''
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/'
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  nodeModulesTransform: {
    type: 'none'
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
  outputPath: 'yamanesi'
})
