var gulp = require('gulp'),

    browserSync  = require('browser-sync').create(), 
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),

    imagemin     = require('gulp-imagemin'),

    notify       = require('gulp-notify');

var input  = './app/assets/stylesheets/**/*.scss';
var output = './dist/stylesheets/';
var styleWatchFiles = './app/assets/stylesheets/**/*.scss';

var inputImages  = './app/assets/images/**/*.{png,jpg,gif,svg}';
var outputImages = './dist/images/';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var autoprefixerOptions = {
  browsers: [
    'Android >= 2.3',
    'BlackBerry >= 7',
    'Chrome >= 30',
    'Firefox >= 36',
    'Explorer >= 8',
    'iOS >= 7',
    'Opera >= 36',
    'Safari >= 5',
    'OperaMobile >= 11',
    'OperaMini >= 6',
    'ChromeAndroid >= 9',
    'FirefoxAndroid >= 4',
    'ExplorerMobile >= 9'
  ]
};

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: "./"
  });

  gulp.watch(input, ['sass']);
  gulp.watch("app/*.html").on('change', browserSync.reload);
});


gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(output))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  gulp.src(inputImages)
      .pipe(imagemin({
        progressive: true,
        optimizationLevel: 3,
        interlaced: true,
        svgoPlugins: [{removeViewBox: false}]
      }))
      .pipe(gulp.dest(outputImages))
      .pipe(notify({
        message: 'TASK: "images" Completed! 💯',
        onLast: true
      }));
});

gulp.task('watch', function() {
  return gulp
    .watch(input, ['sass'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('prod', function() {
  return gulp
    .src(input)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output));
});

gulp.task('default', ['serve', 'watch', 'images']);
