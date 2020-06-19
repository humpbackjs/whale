const { resolve } = require('path')
// const { NODE_ENV } = process.env
// const output = { filename: `${NODE_ENV}.js` }

// let targets = ['defaults']

// if (NODE_ENV !== 'index') {
//   output.library = NODE_ENV
//   output.libraryTarget = 'amd'
//   output.libraryExport = 'default'

//   targets = { esmodules: true }
// }

module.exports = {
  mode: 'development',
  port: 1234,
  entry: resolve('./entry/index.js'),
  template: resolve('./entry/index.html'),
  // output,
  npm: {
    registry: 'https://registry.npm.taobao.org',
  },
  externals: [
    {
      name: 'react',
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      urls: 'https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js',
    },
    {
      name: 'react-dom',
      root: 'ReactDOM',
      urls: 'https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js',
    },
    {
      name: 'antd',
      root: 'antd',
      amd: 'antd',
      commonjs: 'antd',
      commonjs2: 'antd',
      urls: ['https://cdn.jsdelivr.net/npm/moment/min/moment.min.js', 'https://cdn.jsdelivr.net/npm/antd/dist/antd-with-locales.min.js'],
    },
    {
      name: '@ant-design/icons',
      root: 'icons',
      amd: '@ant-design/icons',
      commonjs: '@ant-design/icons',
      commonjs2: '@ant-design/icons',
      urls: ['https://cdn.jsdelivr.net/npm/@ant-design/icons/dist/index.umd.js'],
    },
    {
      name: 'react-dnd-html5-backend',
      root: 'ReactDnDHTML5Backend',
      amd: 'react-dnd-html5-backend',
      commonjs: 'react-dnd-html5-backend',
      commonjs2: 'react-dnd-html5-backend',
      urls: ['https://cdn.jsdelivr.net/npm/react-dnd-html5-backend/dist/umd/ReactDnDHTML5Backend.min.js'],
    },
    {
      name: 'react-dnd',
      root: 'ReactDnD',
      amd: 'react-dnd',
      commonjs: 'react-dnd',
      commonjs2: 'react-dnd',
      urls: ['https://cdn.jsdelivr.net/npm/react-dnd/dist/umd/ReactDnD.min.js'],
    },
  ],
  // targets,
  // report: true,
}
