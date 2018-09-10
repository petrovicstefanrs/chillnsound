const env = process.env.BABEL_ENV || process.env.NODE_ENV;

const presets = [
  [require('@babel/preset-env'), {
    targets: { browsers: ["last 1 version", "not dead", "> 1% in US"] }
  }],
  [require('@babel/preset-react'), {development: env === 'development'}]
]

const plugins = [
  require('@babel/plugin-transform-flow-comments'),


  require('react-hot-loader/babel'),
]

module.exports = { presets, plugins }