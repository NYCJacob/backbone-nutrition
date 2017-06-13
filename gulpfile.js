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

gulp.task('lint:js',	function	()	{
    return	gulp.src(['src/js/**/*.js', '!src/js/**/*.min'])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
});

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
    return gulp.src('src/css/*.css', {base: 'src'})
        .pipe(concatCss("css/styles.min.css"))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist'));
});
