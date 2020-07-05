const path = require('path');

module.exports = {
mode: 'development',
  entry: [
      'core-js/stable',
      './public/scripts/app.js',
      './public/scripts/components/application-element/application-element.js',
      './public/scripts/components/host-element/host-element.js',
      './public/scripts/components/modal/modal.js',
    ],
  output: {
    filename: 'main.js'
  },
  module: {
      rules: [
        {
            test: /\.js?$/,
            use: [
                {
                    loader: 'babel-loader',
                }
            ],
            exclude: /node_modules/
        }
    ]
  }
};