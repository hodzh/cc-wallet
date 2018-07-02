'use strict';

const webpack = require('webpack');
const path = require('path');
const CopyPkgJsonPlugin = require('copy-pkg-json-webpack-plugin');

module.exports = function({
                            root,
                            name,
                            index,
                          }) {
  /**
   * Env
   * Get npm lifecycle event to identify the environment
   */
  const ENV = process.env.npm_lifecycle_event;
  const isTest = ENV === 'test' || ENV === 'test-watch';
  const isProd = ENV === 'build';
  if (isProd) {
    console.log('production mode');
  }
  const isDev = !isProd && !isTest;
  if (isDev) {
    console.log('development mode');
  }

  const serverConfig = {
    mode: isDev ? 'development' : 'production',
    context  : root,
    target   : 'node',
    resolve  : {
      // root: rootDir,moduleServer
      extensions: [
        '.ts',
        '.js',
        '.json',
      ]
    },
    entry    : index,
    // devtool: 'inline-source-map',
    devtool  : 'source-map',
    output   : {
      publicPath   : path.resolve(root),
      filename     : 'index.js',
      path         : resolve(`dist/${name}/server`),
      libraryTarget: 'commonjs2'
    },
    module   : {
      rules: [
        {
          test   : /\.ts$/,
          loader : 'ts-loader',
          options: {
            // configFileName : path.join(__dirname, 'tsconfig.server.json')
            "compilerOptions": {
              "emitDecoratorMetadata" : true,
              "experimentalDecorators": true,
              "target"                : "ES2017",
              "module"                : "commonjs",
              "removeComments"        : true,
              "sourceMap"             : true,
              "inlineSources"         : true,
              "lib"                   : [
                "es2017",
                "dom",
              ],
              "types"                 : [
                "core-js",
                "node"
              ]
            },
            ignoreDiagnostics: [
              2403, // 2403 -> Subsequent variable declarations
              //     2300, // 2300 Duplicate identifier
              //     2304, // 2304 Cannot find name
              //     2374, // 2374 -> Duplicate number index signature
              //     2375  // 2375 -> Duplicate string index signature
            ],
          },
          exclude: [
            "src/*/client/**/*",
            "src/app/*/client/**/*",
            /\.spec\.ts$/,
            /\.e2e\.ts$/,
            /node_modules/,
            "**/*.spec.ts"
          ]
        },
        {test: /\.json$/, loader: 'raw-loader'}
      ],
      noParse: [
        /zone\.js\/dist\/.+/,
        /reflect-metadata/,
        /es(6|7)-.+/,
        /\.zone-microtask/,
        /\.long-stack-trace-zone/,
        /jwt-decode\.js$/,
        /\.spec\.js$/,
      ],
    },
    externals: checkNodeImport,
    node     : {
      console     : false,
      global      : false,
      __dirname   : false,
      __filename  : false,
      process     : false,
      Buffer      : false,
      setImmediate: false
    },
    plugins  : [
      new webpack.BannerPlugin({
        banner   : 'require("source-map-support").install();',
        raw      : true,
        entryOnly: false
      }),
      new CopyPkgJsonPlugin({
        remove: ['devDependencies', 'scripts'],
        replace: {scripts: {start: 'node index.js'}}
      })
    ]
  };

  return serverConfig;

  function checkNodeImport(context, request, cb) {
    if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
      cb(null, 'commonjs ' + request);
      return;
    }
    cb();
  }

  function resolve(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [root].concat(args));
  }
};
