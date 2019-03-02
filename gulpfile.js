const {src, dest, watch, series, parallel} = require('gulp');
const bs = require('browser-sync').create(),
      sass = require('gulp-sass'),
      babel = require('gulp-babel'),
      pug = require('gulp-pug');

const PUBLIC_DIR = './public';
const STATIC_DIR = './public/static';
const TEMPLATES_DIR = './templates';
const SRC_DIR = './src';
const MEDIA_DIR = './media';

// Local Server
const serve = () => {
  bs.init({
    server: {
      baseDir: PUBLIC_DIR
    }
  });
  watch(`${SRC_DIR}/scss/**/**`, css);
  watch(`${SRC_DIR}/js/**/**`, js);
  watch(`${SRC_DIR}/img/**/**`, img);
  watch(`${TEMPLATES_DIR}/**/**`, html);
}

const html = () =>
  src(`${TEMPLATES_DIR}/**.pug`)
    .pipe( pug({}) )
    .pipe( dest(PUBLIC_DIR) )
    .pipe( bs.stream() );

const css = () =>
  src(`${SRC_DIR}/scss/**/**`)
    .pipe( sass() )
    .pipe( dest(`${STATIC_DIR}/css`) )
    .pipe( bs.stream() );

const js = () =>
  src([
    `${SRC_DIR}/js/**/**`,
    `./node_modules/parallax-js/dist/parallax.min.js`
  ])
    .pipe( babel({
      presets: ['@babel/preset-env']
    }) )
    .pipe( dest(`${STATIC_DIR}/js`) )
    .pipe( bs.stream() )

const img = () =>
  src(`${SRC_DIR}/img/**/**`)
    .pipe( dest(`${STATIC_DIR}/img`) )

const media = () =>
src(`${MEDIA_DIR}/**/**`)
  .pipe( dest(`${STATIC_DIR}/media`) )

const build = series(parallel(html, css, js, img, media), serve)

module.exports = {
  serve,
  html,
  css,
  js,
  build,
  default: build
}
