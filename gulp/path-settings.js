module.exports = {

  // any js file
  js: [
    '*.js',
    'config/**/*.js',
    'gulp/**/*.js',
    'tools/**/*.js',
    'modules/**/*.js'],

  // any ts file
  ts: [
    '*.ts',
    'config/**/*.ts',
    'gulp/**/*.ts',
    'tools/**/*.ts',
    'modules/**/*.ts'],

  // any json file
  json: [
    '*.json',
    'config/**/*.json',
    'gulp/**/*.json',
    'tools/**/*.json',
    'modules/**/*.json'],

  // backend settings
  server: {
    js: [
      'config/**/!(*.spec|*.mock|*integration).js',
      'modules/*/server/**/!(*.spec|*.mock|*integration).js'],
    mochaConf: './mocha.conf.js'
  },

  // frontend settings
  client: {
    public: 'public',
    temp: 'temp/client',
    favicon: 'modules/core/client/favicon.ico',
    index: 'modules/core/client/index.html',
    indexTs: 'modules/core/client/index.ts',
    karmaConf: 'karma.conf.js',

    js: [
      'modules/*/client/**/!(*.spec|*.mock|*.sprite).js'],
    ts: [
      'modules/*/client/**/!(*.spec|*.mock|*.sprite).ts'],
    css: [
      'modules/*/client/**/*.css'],
    html: [
      'modules/*/client/**/*.html'],
    less: [
      'modules/*/client/**/*.less'],
    sass: [
      'modules/*/client/**/*.scss'],
    images: [
      'modules/*/client/images/**/*.{png,jpg}'],
    sounds: [
      'modules/*/client/assets/**/*.{mp3,ogg}'],
    sprites: [
      'modules/*/client/sprites/**/*.sprite.js'],

    boot: [
      'modules/**/client/**/*.boot.ts'],

    assets: [
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js',
      'node_modules/angular2/bundles/router.dev.js'
    ]
  },

  // email builder settings
  email: {
    public: 'public-email',
    temp: 'temp/email',
    js: ['modules/*/server/email/index.js'],
    html: ['modules/*/server/email/**/*.html'],
    text: ['modules/*/server/email/**/*.txt'],
    css: ['modules/*/server/email/**/*.css'],
    less: ['modules/*/server/email/**/*.less'],
    sass: ['modules/*/server/email/**/*.sass']
  }
};
