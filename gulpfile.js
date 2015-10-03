var gulp = require('gulp');
var sass = require('gulp-sass');

var source = {
  sass: [
    "./stylesheets/main.scss",
    "./stylesheets/styles.scss"
  ]
};

gulp.task("default", ["sass"]);

gulp.task('sass', function () {
  gulp.src(source.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
  gulp.watch(source.sass, ['sass']);
});
