var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');
var watch = require('gulp-watch');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('minify-css', function() {
return gulp.src('css/style.css')
.pipe(cleanCSS({compatibility: 'ie8'}))
.pipe(gulp.dest('css/min/'));
});

gulp.task('compress', function() {
gulp.src('js/app.js')
.pipe(minify({
ext:{
src:'-debug.js',
min:'.js'
},
exclude: ['tasks'],
ignoreFiles: ['.combo.js', '-min.js']
}))
.pipe(gulp.dest('js/min/'));
});

// ... variables
var input = 'scss/style.scss';
var output = 'css';
var sassOptions = {
errLogToConsole: true,
outputStyle: 'expanded'
};

var autoprefixerOptions = {
browsers: ['last 2 versions', '> 1%', 'Firefox ESR']
};

var sassdocOptions = {
dest: './trump/sassdoc'
};

gulp.task('sassdoc', function () {
return gulp
.src(input)
.pipe(sassdoc(sassdocOptions))
.resume();
});

gulp.task('sass', function () {
return gulp
.src(input)
.pipe(sourcemaps.init())
.pipe(sass(sassOptions).on('error', sass.logError))
.pipe(sourcemaps.write())
.pipe(autoprefixer(autoprefixerOptions))
.pipe(gulp.dest(output))
// .pipe(sassdoc())
// Release the pressure back and trigger flowing mode (drain)
// See: http://sassdoc.com/gulp/#drain-event
.resume();
});
gulp.task('watcher', function() {
return gulp
// Watch the input folder for change,
// and run `sass` task when something happens
.watch('scss/*.scss', ['sass'])
// When there is a change,
// log a message in the console
.on('change', function(event) {
console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
});
gulp.task('watch', ['sass', 'watcher']);
