'use strict';

const webpack = require('webpack');
const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = function({
  root,
  name,
  index,
}){
  const ENV = process.env.npm_lifecycle_event;
  const isTest = ENV==='test' || ENV==='test-watch';
  const isProd = ENV==='build';
  if (isProd)
  {
    console.log('production mode');
  }
  const isDev = !isProd && !isTest;
  if (isDev)
  {
    console.log('development mode');
  }

  const clientConfig = {
    mode   : isDev ? 'development' : 'production',
    context: root,
    target : 'web',
    resolve: {
      // root: rootDir,
      extensions: [
        '.ts',
        '.js',
        '.json',
        '.html',
        '.css',
        '.scss',
      ],
    },
    entry  : {
      app: [
        index,
      ],
    },
    devtool: 'source-map',
    output : {
      path             : resolve(`dist/${name}/client/js`),
      filename         : '[name].js',
      sourceMapFilename: '[name].js.map',
    },
    module : {
      // preLoaders: [{test: /\.ts$/, loader: 'tslint-loader'}],
      rules  : [
        // .ts files.
        {
          test   : /\.ts$/,
          loader : 'ts-loader',
          options: {
            // configFileName : path.join(__dirname, 'tsconfig.client.json'),
            'compilerOptions': {
              'emitDecoratorMetadata' : true,
              'experimentalDecorators': true,
              'target'                : 'es5',
              'module'                : 'commonjs',
              'removeComments'        : true,
              'sourceMap'             : true,
              'inlineSources'         : true,
              'lib'                   : [
                'es2017',
                'dom',
              ],
              'types'                 : [
                'core-js',
                'node',
              ],
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
            /\.spec\.ts$/,
            /\.e2e\.ts$/,
            /node_modules/,
            '**/*.spec.ts',
          ],
        },

        // *.json files.
        {test: /\.json$/, loader: 'json-loader'},

        // CSS as raw text
        {
          test  : /\.css$/,
          loader: ['to-string-loader', 'css-loader?minimize', 'postcss-loader'],
        },

        // SCSS as raw text
        {
          test  : /\.scss$/,
          loader: [
            'to-string-loader',
            'css-loader?minimize',
            'postcss-loader',
            'sass-loader',
          ],
        },

        // support for .html as raw text
        {test: /\.html$/, loader: 'raw-loader'},
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

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks : 'initial',
            test   : path.resolve(__dirname, 'node_modules'),
            name   : 'vendor',
            enforce: true,
          },
        },
      },
      // minimizer  : (isDev ? new webpack.optimize.UglifyJsPlugin({
      //     compress : {
      //       warnings: false,
      //     },
      //     mangle   : true,
      //     sourceMap: true,
      //     comments : false,
      //   }) : false
      // ),
    },

    plugins: [
      new webpack.DefinePlugin({
        PRODUCTION: isProd,
      }),
    ],
  };

  return clientConfig;

  function resolve(args){
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [root].concat(args));
  }
};
