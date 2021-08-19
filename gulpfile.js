'use strict';

// Plugins
const gulp = require('gulp'),
  prefixer = require('gulp-autoprefixer'),
  htmlmin = require('gulp-htmlmin'),
  plumber = require('gulp-plumber'),
  rigger = require('gulp-rigger'),
  sass = require('gulp-sass')(require('sass')),
  terser = require('gulp-terser'),
  rimraf = require('rimraf'),
  debug = require('gulp-debug'),
  browserSync = require('browser-sync');

const reload = browserSync.reload;

// Routs for sources and build
const path = {
  build: {
    all: 'build/',
    html: 'build/',
    scss: 'build/css/',
    js: 'build/js/',
    img: 'build/img/',
    fonts: 'build/fonts/',
  },
  src: {
    html: 'src/*.{html, htm}',
    scss: 'src/scss/main.scss',
    js: 'src/js/app.js',
    img: 'src/img/**/*.{jpg,jpeg,svg,png,gif,webp}',
    fonts: 'src/fonts/**/*.{eot,svg,ttf,woff,woff2}',
  },
  watch: {
    html: 'src/*.{html, htm}',
    scss: 'src/scss/**/*.*',
    js: 'src/js/**/*.js',
    img: 'src/img/**/*.{jpg,jpeg,svg,png,gif,webp}',
    fonts: 'src/fonts/**/*.{eot,svg,ttf,woff,woff2}',
  },
  clear: 'build/'
}

// Local server config
const serverConfig = {
  server: {
    baseDir: 'build/',
    index: 'index.html'
  },
  tunnel: true,
  host: 'localhost',
  port: 3000,
  logPrefix: 'WebDev'
}

// Tasks
gulp.task('clear', function(done) {
  rimraf(path.clear, done);
});

gulp.task('dev:html', function(done) {
  gulp.src(path.src.html)
    .pipe(plumber())
    .pipe(debug({title: 'html'}))
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));

  done();
});

gulp.task('dev:sass', function(done) {
  gulp.src(path.src.scss)
    .pipe(plumber())
    .pipe(debug({title: 'sass'}))
    .pipe(sass({
      outputStyle: 'expanded',
      sourcemaps: false
    }))
    .pipe(prefixer())
    .pipe(gulp.dest(path.build.scss))
    .pipe(reload({stream: true}));

  done();
});

gulp.task('dev:js', function(done) {
  gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(debug({title: 'js'}))
    .pipe(rigger())
    .pipe(terser())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));

  done();
});

gulp.task('mv:img', function(done) {
  gulp.src(path.src.img)
    .pipe(plumber())
    .pipe(debug({title: 'img'}))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));

  done();
});

gulp.task('mv:fonts', function(done) {
  gulp.src(path.src.fonts)
    .pipe(debug({title: 'fonts'}))
    .pipe(gulp.dest(path.build.fonts))
    .pipe(reload({stream: true}));

  done();
});

gulp.task('server', function(done) {
  browserSync(serverConfig);

  done();
});

gulp.task('watch', function(done) {
  gulp.watch(path.watch.html, gulp.series('dev:html'));
  gulp.watch(path.watch.scss, gulp.series('dev:sass'));
  gulp.watch(path.watch.js, gulp.series('dev:js'));
  gulp.watch(path.watch.img, gulp.series('mv:img'));
  gulp.watch(path.watch.fonts, gulp.series('mv:fonts'));

  done();
});



gulp.task('default', gulp.series('clear', gulp.parallel('dev:html', 'dev:sass', 'dev:js', 'mv:img', 'mv:fonts'), 'server', 'watch'));
// gulp.task('default', gulp.series('clear', gulp.parallel('dev:html', 'dev:sass', 'dev:js', 'mv:img', 'mv:fonts')));
