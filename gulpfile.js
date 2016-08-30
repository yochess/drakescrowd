const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('js', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
      .pipe(gulp.dest('dist'));
});

gulp.task('rest', () => {
  return gulp.src(['src/**/*', '!src/**/*.js'])
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['js', 'rest']);
