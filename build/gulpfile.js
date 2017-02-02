var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var open = require('gulp-open');
var connect = require('gulp-connect');
var browserSync = require('browser-sync').create();

var isProduction = true;
var sassStyle = 'compressed';
var sourceMap = false;
if(gutil.env.dev === true) {
    sassStyle = 'expanded';
    sourceMap = true;
    isProduction = false;
}

var basePaths = {
    src: '../app/',
    dest: '../public/',
    bower: './bower_components/'
};

var paths = {
    scripts: {
        src: basePaths.src + 'scripts/',
        dest: basePaths.dest + 'js/min/'
    },
    styles: {
        src: basePaths.src + 'content/sass/',
        dest: basePaths.dest + 'css/min/'
    }
};

var appFiles = {
    styles: paths.styles.src + '**/*.scss',
    scripts: [paths.scripts.src + '**/*.js']
};

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: '../'
        }
    });
});
//
// var opened = false;
// gulp.task('open', function(){
//     if (opened == false) {
//         gulp.src("../index.html")
//             .pipe(open());
//         opened = true;
//     }
//     else {
//         gulp.src("../index.html")
//             .pipe(livereload());
//     }
// });

// var options = {
//     uri: 'http://localhost:9000/',
//     app: 'chrome'
// };
//
// gulp.task('open', function(){
//     gulp.src('../index.html')
//         .pipe(open(options));
// });
//
// gulp.task('connect', function () {
//     connect.server({
//         root: '../',
//         port: 9000,
//         livereload: true
//     });
// });
// A display error function, to format and make custom errors more uniform
// Could be combined with gulp-util or npm colors for nicer output

var displayError = function(error) {
    // Initial building up of the error
    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end
    // If the error contains the filename or line number add it to the string
    if(error.fileName)
        errorString += ' in ' + error.fileName;
    if(error.lineNumber)
        errorString += ' on line ' + error.lineNumber;
    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
};


gulp.task('sass', function (){
    var sassFiles = gulp.src(appFiles.styles, { base: paths.styles.src })
        .pipe(sass({
            outputStyle: sassStyle,
            includePaths : [paths.styles.src]
        }))
        .pipe(sourcemaps.init())
        .on('error', function(err){
            displayError(err);
        })
        .pipe(prefix(
            'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
        ))
        .pipe(concat(paths.styles.dest + "app.min.css"))
        .pipe(sourcemaps.write('../map'))
        .pipe(gulp.dest(basePaths.dest))
        .pipe(browserSync.reload({stream:true}));
    console.log('aaaaaaaaaa');
});

gulp.task('uglify', function () {
    var jsFiles = gulp.src(appFiles.scripts, { base: paths.scripts.src })
        .pipe(sourcemaps.init())
        .pipe(concat(paths.scripts.dest + 'app.min.js'))
        //only uglify if gulp is ran with '--type production'
        .pipe(jshint())
        .pipe(gutil.env.type === 'dev' ? gutil.noop() : uglify())
        .pipe(sourcemaps.write('../map'))
        .pipe(gulp.dest(basePaths.dest))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('jshint', function() {
    return gulp.src(appFiles.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});



gulp.task('default',['browser-sync', 'sass', 'jshint', 'uglify'], function() {
    // Also when there is a change, display what file was changed, only showing the path after the 'sass folder'
    //livereload.listen(9000);
    
    gulp.watch(appFiles.styles, ['sass', 'browser-sync'])
        .on('change', function(evt) {
            console.log(
                '[watcher] File ' + evt.path.replace(/.*(?=sass)/,'') + ' was ' + evt.type + ', compiling...'
            );
        });
    gulp.watch(appFiles.scripts, ['jshint', 'uglify', 'browser-sync'])
        .on('change', function(evt) {
            console.log(
                '[watcher] File ' + evt.path.replace(/.*(?=js)/,'') + ' was ' + evt.type + ', compiling...'
            );
        });
    gulp.watch('..//app/views/')
        .on('change', function(evt) {
            console.log(
                '[watcher] File ' + evt.path.replace(/.*(?=html)/,'') + ' was ' + evt.type + ', compiling...'
            );
        });
    

    // gulp.watch(['../index.html', '../content/sass/**/*.scss', '../scripts/**/*.js'], function(event) {
    //     console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    // });
    // place code for your default task here
});