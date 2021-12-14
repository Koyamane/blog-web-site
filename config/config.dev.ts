// https://umijs.org/config/
import { defineConfig } from 'umi'

export default defineConfig({
  define: {
    'process.env.REACT_APP_ENV': 'dev',
    'process.env.UMI_ENV': 'dev',
    'process.env.baseUrl': 'http://127.0.0.1:7001'
  },

  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector'
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {}
  }
})
