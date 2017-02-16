var webpack = require('webpack');
var WebpackBuildLogger = require('webpack-build-logger');
var path = require('path');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

var commonConfig = {
  resolve: {
    // root: __dirname,
    extensions: [
      '.ts',
      '.js',
      '.json',
      '.html',
      '.css',
      '.scss'
    ]
  },
};

var clientConfig = {
  target: 'web',
  entry: {
    vendor: [
      // Polyfills
      'core-js/es6',
      'core-js/es7/reflect',
      'zone.js/dist/zone',
      'zone.js/dist/long-stack-trace-zone',
      // Angular2
      '@angular/common',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/core',
      '@angular/router',
      '@angular/http',
      // RxJS
      'rxjs'
      // Other
    ],
    app: [
      './src/app/client/index'
    ]
  },
  devtool: 'source-map',
  output: {
    path: root('dist/cc-wallet/client/js'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map'
  },
  module: {
    // preLoaders: [{test: /\.ts$/, loader: 'tslint-loader'}],
    loaders: [
      // .ts files.
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          ignoreDiagnostics: [
            2403, // 2403 -> Subsequent variable declarations
            2300, // 2300 Duplicate identifier
            2304, // 2304 Cannot find name
            2374, // 2374 -> Duplicate number index signature
            2375  // 2375 -> Duplicate string index signature
          ]
        },
        exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/]
      },

      // *.json files.
      {test: /\.json$/, loader: 'json-loader'},

      // CSS as raw text
      {test: /\.css$/, loader: ['to-string-loader', 'css-loader?minimize', 'postcss-loader']},

      // SCSS as raw text
      {test: /\.scss$/, loader: ['to-string-loader', 'css-loader?minimize', 'postcss-loader', 'sass-loader']},

      // support for .html as raw text
      {test: /\.html$/, loader: 'raw-loader'}
    ],
    noParse: [
      /zone\.js\/dist\/.+/,
      /reflect-metadata/,
      /es(6|7)-.+/,
      /.zone-microtask/,
      /.long-stack-trace-zone/,
      /jwt-decode.js$/
    ]
  },

  /* postcss: function () {
    return [precss, autoprefixer];
  }, */

  plugins: [
    //new webpack.NoErrorsPlugin(),
    /*new webpack.ProvidePlugin({
     $: "jquery",
     jQuery: "jquery",
     "windows.jQuery": "jquery"
     }),*/
    /*new webpack.DefinePlugin({
     'process.env': {
     'NODE_ENV': JSON.stringify('production'),
     }
     }),*/
    //new webpack.optimize.DedupePlugin(),
    // Minify all javascript, switch loaders to minimizing mode
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: false,
      sourceMap: true
    }),
    //new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
      minChunks: 2,
      chunks: ['app', 'vendor']
    })
  ]

  /*tslint: {
    emitErrors: false,
    failOnHint: false
  }*/
};

var serverConfig = {
  target: 'node',
  entry: './src/app/server/index',
  // devtool: 'inline-source-map',
  devtool: 'source-map',
  output: {
    path: root('dist/cc-wallet/server'),
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {test: /\.ts$/, loaders: ['ts-loader']},
      {test: /\.json$/, loader: 'raw-loader'}
    ]
  },
  externals: checkNodeImport,
  node: {
    console: false,
    global: false,
    __dirname: false,
    __filename: false,
    process: false,
    Buffer: false,
    setImmediate: false
  },
  plugins: [
    /*new webpack.SourceMapDevToolPlugin({
     test: /\.js$/,
     moduleFilenameTemplate: '[absolute-resource-path]',
     fallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
     filename: "[file].map",
     sourceRoot: '/'
     })*/
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ]
};

// Default config
var defaultConfig = {
  context: __dirname,
  resolve: {
    // root: root('/src')
  },
  output: {
    publicPath: path.resolve(__dirname),
    filename: 'index.js'
  },
  plugins: [
    // new WebpackBuildLogger({
    //   logEnabled: true
    // })
  ]
};

var webpackMerge = require('webpack-merge');
module.exports = [
  // Client
  webpackMerge({}, defaultConfig, commonConfig, clientConfig),
  // Server
  webpackMerge({}, defaultConfig, commonConfig, serverConfig)
];

function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request);
    return;
  }
  cb();
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
