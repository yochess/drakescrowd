const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');

gulp.task('build-backend', () => {
  return gulp.src(['src/api/**/*.js', 'src/app.js'], {base: 'src'})
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-frontend', () => {
  return gulp.src('src/public/**/*.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/public'));
});

gulp.task('build-rest', () => {
  return gulp.src(['src/**/*', '!src/**/*.js'])
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['build-backend', 'build-frontend', 'build-rest']);
