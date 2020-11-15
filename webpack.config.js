const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

// Electron Webpack Configuration
const electronConfiguration = {
  // Build Mode
  mode: 'development',
  // Electron Entrypoint
  entry: './src/main.ts',
  target: 'electron-main',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }]
      }
    ]
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js'
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'src/assets', to: 'assets' }]
    })
  ]
};

module.exports = [electronConfiguration];
