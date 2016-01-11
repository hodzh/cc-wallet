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

  injectJs: [
    'client/{app,components}/**/!(*.spec|*.mock).js',
    'modules/*/client/**/!(*.spec|*.mock).js'],

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
    './config/**/*.public.js',
    './modules/**/config/**/*.public.js',],

  css: [
    'client/{app,components}/**/*.css',
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
    'client/assets/**/*.{css,png,jpg}',
    'modules/*/client/assets/**/*.{css,png,jpg}'],

  favicon: 'client/favicon.ico',
  index: 'client/index.html',
  karmaConf: 'karma.conf.js',
  mochaConf: './mocha.conf.js',
  publicRoot: 'public'
};
