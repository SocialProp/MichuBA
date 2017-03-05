var gulp = require('gulp'),
		sass = require('gulp-sass'),
		rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
		cleanCss = require('gulp-clean-css'),
		browserSync = require('browser-sync').create();

gulp.task('uglify', function(){
	gulp.src('./js/index.js')
	.pipe(uglify())
	.pipe(rename({ suffix: '.min'}))
	.pipe(gulp.dest('./js/'))
	.pipe(browserSync.stream());
});

gulp.task('sass', function(){
	return gulp.src('./css/style.sass')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./css/'))
	.pipe(browserSync.stream());
});

gulp.task('minify-css', function(){
	return gulp.src('./css/style.css')
	.pipe(cleanCss({compability: 'ie8'}))
	.pipe(rename({ suffix: '.min'}))
	.pipe(gulp.dest('./css/'))
});

gulp.task('watch', function(){
	gulp.watch('./js/index.js', ['uglify']),
	gulp.watch('./css/style.sass', ['sass']);
	gulp.watch('./css/style.css', ['minify-css']);
});

gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['uglify', 'sass', 'minify-css','watch', 'serve']);
