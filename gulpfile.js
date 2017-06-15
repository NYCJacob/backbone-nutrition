/**
 * Created by jsherman on 6/13/17.
 */
var gulp = require('gulp');

// Load all gulp plugins automatically
// and attach them to the `plugins` object
var plugins = require('gulp-load-plugins')();

// browser-sync does not seem to load in load-plugins function
// these plugins do not seem to register with load-plugins
var htmlreplace = require('gulp-html-replace');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var serve = require('gulp-serve');

// js tasks  *********************
//
gulp.task('lint:js',	function	()	{
    return	gulp.src(['src/js/**/*.js', '!src/js/**/*.min'])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
});

gulp.task('concat-min:js', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(plugins.concat('app.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('concat:vendor-js', function() {
    return gulp.src(['./src/js/vendor/*min.js', './src/js/vendor/*.min.js'])
        .pipe(plugins.concat('vendor.min.js'))
        // .pipe(plugins.uglify())  files already minified
        .pipe(gulp.dest('./dist/js/vendor'));
});


// ************************************************
// css tasks
// ***********************************
gulp.task('sass',	function()	{
    return	gulp.src('src/sass/*.scss')
    // pass custom title to gulp-plumber error handler function
        .pipe(plugins.plumber('Error Running	Sass'))
        //	Initialize	sourcemap
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass())
        //	Runs	produced	CSS	through	autoprefixer
        // .pipe(plugins.autoprefixer())   there is a bug in this node version
        //	Writing	sourcemaps
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('src/css'))
});

gulp.task('min-css', function() {
    return gulp.src(['src/css/*.css', '!src/css/{vendor,vendor/*.css}'], {base: 'src'})
        .pipe(concatCss("css/app.min.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist'));
});

// this may not be needed because only one vendor css file and it has min
gulp.task('vendor-css', function() {
    return gulp.src('src/css/vendor/*.min.css', {base: 'src'})
        .pipe(concatCss("css/vendor/vendor.min.css"))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:css', function () {
    return gulp.src(['src/css/vendor/*.min.css'], {
        base: 'src'
    }).pipe(gulp.dest('dist'));
});

// html tasks
// todo: fix: htmlmin seems to break html and concating all vender min files breaks js
gulp.task('replace:html', function () {
    return gulp.src('src/index.html')
        .pipe(htmlreplace({
            'css' : 'css/app.min.css',
            'js01': 'js/app.min.js'
        }))
        .pipe(plugins.htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            removeEmptyAttributes: true
        }))
        .pipe(gulp.dest('dist'))
});

// utility functions
// delete dist directory
gulp.task('clean', function (done) {
    require('del')('dist').then(function () {
        done();
    });
});

gulp.task('serve:dist', serve('dist'));
gulp.task('serve:src', serve('src'));