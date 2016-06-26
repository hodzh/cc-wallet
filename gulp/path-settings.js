module.exports = {
  js: [
    '*.js',
    'config/**/*.js',
    'gulp/**/*.js',
    'tools/**/*.js',
    'modules/**/*.js'],

  json: [
    '*.json',
    'config/**/*.json',
    'gulp/**/*.json',
    'tools/**/*.json',
    'modules/**/*.json'],

  jsServer: [
    'config/**/!(*.spec|*.mock|*integration).js',
    'modules/*/server/**/!(*.spec|*.mock|*integration).js'],

  jsClient: [
    'modules/*/client/**/!(*.spec|*.mock|*.sprite).js'],

  injectJs: [
    'modules/*/client/**/!(*.spec|*.mock|*.sprite).js'],

  injectDev: [
    'modules/*/client/**/*.{mock,spec}.js',
    'modules/*/client/**/*.html'],

  jsMocha: [
    'modules/*/server/**/*.{spec,integration}.js'],

  jsShared: [
    'config/**/*.public.js',
    'modules/*/{server}/**/*.public.js'],

  css: [
    'modules/*/client/**/*.css'],

  html: [
    'modules/*/client/**/*.html'],

  less: [
    'modules/*/client/**/*.less'],

  sass:[
    'modules/*/client/**/*.scss'],

  assets: [
    'modules/*/client/assets/**/*.{png,jpg}'],

  sounds: [
    'modules/*/client/assets/**/*.{mp3,ogg}'],

  sprites: [
    'modules/*/client/sprites/**/*.sprite.js'],

  favicon: 'modules/core/client/favicon.ico',
  index: 'modules/core/client/index.html',
  karmaConf: 'karma.conf.js',
  mochaConf: './mocha.conf.js',
  publicRoot: 'public',
  tempRoot: 'temp/client',

  email: {
    public: 'public-email',
    temp: 'temp/email',
    css: ['modules/*/server/email/**/*.css'],
    less: ['modules/*/server/email/**/*.less'],
    sass: ['modules/*/server/email/**/*.sass'],
    html: ['modules/*/server/email/**/*.html']
  }
};