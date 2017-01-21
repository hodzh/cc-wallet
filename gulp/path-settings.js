module.exports = {

  // any js file
  js: [
    '*.js',
    'config/**/*.js',
    'src/**/*.js'],

  // any ts file
  ts: [
    '*.ts',
    'config/**/*.ts',
    'src/**/!(*.spec|*.mock|*integration).ts'],

  // any json file
  json: [
    '*.json',
    'config/**/*.json',
    'src/**/*.json'],

  // backend settings
  server: {
    js: [
      'config/**/!(*.spec|*.mock|*integration).js',
      'src/*/server/**/!(*.spec|*.mock|*integration).js'],
    mochaConf: './mocha.conf.js'
  },

  // frontend settings
  client: {
    public: 'dist/cc-wallet/client',
    temp: 'temp/client',
    favicon: 'src/core/client/favicon.ico',
    index: 'src/core/client/index.html',
    indexTs: 'src/app/client/index.ts',
    karmaConf: 'karma.conf.js',

    js: [
      'src/*/client/**/!(*.spec|*.mock|*.sprite).js'],
    ts: [
      'src/*/client/**/!(*.spec|*.mock|*.sprite).ts'],
    css: [
      'src/*/client/**/*.css'],
    html: [
      'src/*/client/**/*.html'],
    less: [
      'src/*/client/**/*.less'],
    sass: [
      'src/*/client/**/*.scss'],
    images: [
      'src/*/client/images/**/*.{png,jpg}'],
    sounds: [
      'src/*/client/sounds/**/*.{mp3,ogg}'],
    sprites: [
      'src/*/client/sprites/**/*.sprite.js'],

    boot: [
      'src/*/client/**/*.boot.ts'],

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
    js: ['src/*/server/email/index.js'],
    html: ['src/*/server/email/**/*.html'],
    text: ['src/*/server/email/**/*.txt'],
    css: ['src/*/server/email/**/*.css'],
    less: ['src/*/server/email/**/*.less'],
    sass: ['src/*/server/email/**/*.sass']
  }
};
