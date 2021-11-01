const {
  src,
  dest,
  series
} = require('gulp');

const concat  = require('gulp-concat')
const noop    = require("gulp-noop")
const uglify  = require('gulp-uglify')
const rm      = require('gulp-rm')
const rename  = require('gulp-rename')
const zip     = require('gulp-zip')
const hashsum = require('gulp-hashsum')

const paths = {
  js: {
    src: [
      'src/core.js',
      'src/condition.js',
      'src/action.js',
      'src/manipulation.js',
      'src/util.js'
    ],
    dest: 'dist/',
    filename: 'utm-manager.min.js'
  },
    zip: {
    src: 'dist/**/*',
    dest: 'dist/',
    filename: 'utm-manager.zip'
  },
  hashsum: {
    src: 'dist/utm-manager.zip',
    dest: 'dist/',
    filename: 'utm-manager.zip.sha1'
  }
}

function clean() {
  return src('dist/**/*', { read: false })
    .pipe(rm())
}

function compile() {
  return src(paths.js.src)
    .pipe(concat('tmp.js'))
    .pipe(process.env.NODE_ENV === 'production' ? uglify() : noop())
    .pipe(rename(paths.js.filename))
    .pipe(dest(paths.js.dest))
}

function compact() {
  return src(paths.zip.src)
    .pipe(zip(paths.zip.filename))
    .pipe(dest(paths.zip.dest))
}

function hash() {
  return src([paths.hashsum.src])
    .pipe(hashsum({
      dest: paths.hashsum.dest,
      filename: paths.hashsum.filename
    }))
}

if(process.env.NODE_ENV === 'production') {
  exports.default = series(clean, compile, compact, hash)
} else {
  exports.default = series(clean, compile)
}
