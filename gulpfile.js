var gulp           = require('gulp'),
    browserSync    = require('browser-sync').create(),
    sass           = require('gulp-sass'),
		clean          = require('gulp-clean'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		spritesmith    = require('gulp.spritesmith'),
		watch          = require('gulp-chokidar')(gulp),
		sourcemaps     = require('gulp-sourcemaps');


gulp.task('watch-gulp', function () {
		watch('app/img/sprites/*.*', 'sprite');
});

gulp.task('watch-img', function () {
		watch('app/img/imagemin/*.*', 'imagemin');
});

gulp.task('watch-sass', function () {
	gulp.watch("app/sass/**/*.sass", gulp.series('sass')).on('change', browserSync.reload);
});

gulp.task('watch-html', function () {
	gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('watch', gulp.parallel('watch-html', 'watch-sass', 'watch-img'));

// gulp.watch("app/sass/*.sass", gulp.series('sass')).on('change', browserSync.reload);
// gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js', 'common-js']).on('change', browserSync.reload);

gulp.task('imagemin', function() {
	return gulp.src('app/img/imagemin/*')
	.pipe(clean())
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('app/img'));
});

gulp.task('sprite', function () {
		var spriteData = gulp.src('app/img/sprites/*.*').pipe(spritesmith({
				imgName: 'sprite.png',
				cssName: '_sprite.sass',
				imgPath :  '../img/sprite.png',
				cssFormat: 'sass',
				padding: 2
		}));
		spriteData.img.pipe(gulp.dest('app/img/'));
		spriteData.css.pipe(gulp.dest('app/sass/'));
});

gulp.task('sass', function () {
	return gulp.src('app/sass/**/*.sass')
						.pipe(sourcemaps.init())
						.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
						.pipe(autoprefixer('last 10 versions'))
						.pipe(sourcemaps.write('map/'))
						.pipe(gulp.dest('app/css'))
						.pipe(browserSync.reload({
								stream: true
						}))
});

// Static Server + watching sass/html files
gulp.task('serve', function() {
    browserSync.init({
        server: {
       			baseDir: "app"
        },
        notify: false,
        // tunnel: true,
				// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
    });
 });


gulp.task('default', gulp.parallel('serve', 'watch'));

// gulp.task('common-js', function() {
// 	return gulp.src([
// 		'app/js/common.js',
// 		])
// 	.pipe(concat('common.min.js'))
// 	.pipe(uglify())
// 	.pipe(gulp.dest('app/js'));
// });


// gulp.task('js', ['common-js'], function() {
// 	return gulp.src([
// 		'app/libs/jquery/dist/jquery.min.js',
// 		'app/libs/swiper/js/swiper.min.js'

// 		// 'app/js/common.min.js', // Всегда в конце
// 		])
// 	.pipe(concat('scripts.min.js'))
// 	.pipe(uglify()) // Минимизировать весь js (на выбор)
// 	.pipe(gulp.dest('app/js'))
// 	.pipe(browserSync.stream());
// });
