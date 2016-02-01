module.exports = {
  js: [
    './*.js',
    'config/**/*.js',
    'gulp/**/*.js',
    'tools/**/*.js',
    'server/**/*.js',
    'modules/**/*.js',
    '!.*/**',
    '!tests/**',
    '!node_modules/**',
    '!bower_modules/**',
    '!public/**'],

  json: [
    './*.json',
    'config/**/*.json',
    'gulp/**/*.json',
    'tools/**/*.json',
    'server/**/*.json',
    'modules/**/*.json',
    '!.*/**',
    '!tests/**',
    '!node_modules/**',
    '!bower_modules/**',
    '!public/**'],

  jsServer: [
    './config/**/!(*.spec|*.mock|*integration).js',
    './server/**/!(*.spec|*.mock|*integration).js',
    './modules/**/config/**/!(*.spec|*.mock|*integration).js',
    './modules/**/server/**/!(*.spec|*.mock|*integration).js'],

  injectJs: [
    'client/{app,components}/**/!(*.spec|*.mock|*.sprite).js',
    'modules/*/client/**/!(*.spec|*.mock|*.sprite).js'],

  injectDev: [
    './client/**/*.mock.js',
    './client/**/*.spec.js',
    './client/**/*.html',
    './modules/**/client/**/*.mock.js',
    './modules/**/client/**/*.spec.js',
    './modules/**/client/**/*.html'],

  jsMocha: [
    './server/**/*.spec.js',
    './server/**/*.integration.js',
    './modules/**/server/**/*.spec.js',
    './modules/**/server/**/*.integration.js'],

  jsShared: [
    './{config,server}/**/*.public.js',
    './modules/**/{config,server}/**/*.public.js'],

  css: [
    'client/**/*.css',
    'modules/*/client/**/*.css'],

  html: [
    'client/{app,components}/**/*.html',
    'modules/*/client/**/*.html'],

  less: [
    'client/{app,components}/**/*.less',
    'modules/*/client/**/*.less'],

  sass: [
    'client/{app,components}/**/*.scss',
    '!client/app/app.scss',
    'modules/*/client/**/*.scss'],

  assets: [
    'client/assets/**/*.{png,jpg}',
    'modules/wallet/client/assets/**/*.{png,jpg}',
    'modules/vp/client/assets/**/*.{png,jpg}',
    'modules/paygates/client/assets/**/*.{png,jpg}',
    'modules/paygates-bitcoind/client/assets/**/*.{png,jpg}'],

  sounds: [
    'client/assets/**/*.{mp3,ogg}',
    'modules/wallet/client/assets/**/*.{mp3,ogg}',
    'modules/vp/client/assets/**/*.{mp3,ogg}',
    'modules/paygates/client/assets/**/*.{mp3,ogg}',
    'modules/paygates-bitcoind/client/assets/**/*.{mp3,ogg}'],

  sprites: [
    'client/sprites/**/*.sprite.js',
    'modules/wallet/client/sprites/**/*.sprite.js',
    'modules/vp/client/sprites/**/*.sprite.js',
    'modules/paygates/client/sprites/**/*.sprite.js',
    'modules/paygates-bitcoind/client/sprites/**/*.sprite.js'],

  favicon: 'client/favicon.ico',
  index: 'client/index.html',
  karmaConf: 'karma.conf.js',
  mochaConf: './mocha.conf.js',
  publicRoot: 'public',
  tempRoot: 'temp'
};
