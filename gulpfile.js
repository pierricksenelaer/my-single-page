var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    terser = require('gulp-terser');
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync'),
    wait = require('gulp-wait'),
    del = require('del');

// BrowserSync
gulp.task('browser-sync', function () {
    browserSync({
        proxy: "127.0.0.1:8021",
        port: 3112
    });
});

sass.compiler = require('node-sass');

gulp.task('styles', function () {
    return gulp.src('src/scss/style.scss')
        .pipe(wait(500))
        .pipe(sass())
        .pipe(sourcemaps.init())
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
            .pipe(browserSync.reload({
                stream: true
            }))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({
        message: 'SCSS compiled - BOOM'
    }));
});

gulp.task('scripts', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({
        message: 'Scripts task complete'
    }));
});

gulp.task('async-scripts', function () {
    return gulp.src('src/js-async/**/*.js')
        .pipe(concat('main-async.js'))
        .pipe(gulp.dest('dist/assets/js-async'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(terser())
        .pipe(gulp.dest('dist/assets/js-async'))
    .pipe(notify({
        message: 'Async Scripts task complete'
    }));
});

gulp.task('images', function () {
    return gulp.src('src/img/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(notify({
            message: 'Images task complete'
        }));
});

gulp.task('fonts', function () {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/assets/fonts'))
        .pipe(notify({
            message: 'Fonts moved into the the DIST folder'
        }));
});

gulp.task('clean', function () {
    return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
});

gulp.task('default', ['clean'], function () {
    gulp.start('styles', 'scripts', 'images', 'fonts');
});

gulp.task('watch', function () {

    // Watch .scss files
    gulp.watch('src/scss/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/js/**/*.js', ['scripts']);

    // Watch .js files (async)
    gulp.watch('src/js-async/**/*.js', ['async-scripts']);

    // Watch image files
    gulp.watch('src/img/*', ['images']);

    // Watch font files
    gulp.watch('src/fonts/*', ['fonts']);

});

gulp.task('default', ['scripts', 'images', 'fonts', 'styles', 'browser-sync', 'watch']);
