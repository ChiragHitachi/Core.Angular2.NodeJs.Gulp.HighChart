var gulp = require('gulp'),
    gp_clean = require('gulp-clean'),
    gp_concat = require('gulp-concat'),
    gp_less = require('gulp-less'),
    gp_sourcemaps = require('gulp-sourcemaps'),
    gp_typescript = require('gulp-typescript'),
    gp_uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var tslint = require("gulp-tslint");

var del = require('del');
var htmlmin = require('gulp-htmlmin');
//var gulpLoadPlugins = require('gulp-load-plugins');
//var plugins = gulpLoadPlugins();
//var minifyCSS = require('gulp-minify-css');
//var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');

/// Define paths
var srcPaths = {
    app: ['Scripts/app/main.ts', 'Scripts/app/**/*.ts'],
    images: ['Scripts/app/images/*.tiff', 'Scripts/app/images/*.jpg'],
    js: [
        'Scripts/js/**/*.js',
        'Scripts/tiff/*.js',
        'Scripts/raphael/*.js',
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/typescript/lib/typescript.js',
        'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.min.js',
        'node_modules/moment/moment.js',
         'node_modules/bootstrap/**/*.js',
         'node_modules/ng2-dragula/**/*.js',
         'node_modules/ng2-drag-drop/**/*.js',
         'node_modules/d3/**/*.js'
    ],
    js_angular: [
        'node_modules/@angular/**'
    ],
    js_rxjs: [
        'node_modules/rxjs/**'
    ],
    icons: [
        'node_modules/bootstrap/fonts/**'
    ],
    sass: [
       'node_modules/bootstrap-sass/**/*.scss',
       'src/sass/**/*.scss'
    ]
};

var destPaths = {
    app: 'wwwroot/app/',
    css: 'wwwroot/css/',
    js: 'wwwroot/js/',
    html: 'wwwroot/view/',
    js_angular: 'wwwroot/js/@angular/',
    js_rxjs: 'wwwroot/js/rxjs/',
    images: 'wwwroot/images/',
    icons: 'wwwroot/fonts/'
};

gulp.task("tslint", function () {
    gulp.src(srcPaths.app)
        .pipe(tslint({
            formatter: "prose"
        }))
        .pipe(tslint.report({
            emitError: false
        }));
});

gulp.task('sass', function () {
    return gulp.src(srcPaths.sass)
      .pipe(sass().on('error', sass.logError))
      //.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(gulp.dest(destPaths.css));
});
gulp.task('sass:watch', function () {
    gulp.watch(srcPaths.sass, ['sass']);
});

gulp.task('images', function () {
    return gulp.src(srcPaths.images)
        .pipe(gulp.dest(destPaths.images));
});

// Compile, minify and create sourcemaps all TypeScript files 
// and place them to wwwroot/app, together with their js.map files.
gulp.task('app', ['app_clean'], function () {
    return gulp.src(srcPaths.app)
        .pipe(gp_sourcemaps.init())
        .pipe(gp_typescript(require('./tsconfig.json').compilerOptions))
       // .pipe(gp_uglify({ mangle: false }))
		.pipe(gp_sourcemaps.write('/'))
        .pipe(gulp.dest(destPaths.app));
});

// Delete wwwroot/app contents
gulp.task('app_clean', function () {
    return gulp.src(destPaths.app + "*", { read: false })
    .pipe(gp_clean({ force: true }));
});

//// Delete wwwroot/js contents
gulp.task('js_clean', function () {
    return gulp.src(destPaths.js + "*", { read: false })
    .pipe(gp_clean({ force: true }));
});

// Copy all JS files from external libraries to wwwroot/js
gulp.task('js', function () {
    gulp.src(srcPaths.js_angular)
        .pipe(gulp.dest(destPaths.js_angular));
    gulp.src(srcPaths.js_rxjs)
        .pipe(gulp.dest(destPaths.js_rxjs));
    return gulp.src(srcPaths.js)
        .pipe(gulp.dest(destPaths.js));
});

//// Global cleanup task
//gulp.task('cleanup', ['app_clean', 'js_clean']);

// Watch specified files and define what to do upon file changes
gulp.task('watch', function () {
    gulp.watch([srcPaths.app, srcPaths.js], ['app', 'js']);
});

gulp.task('icons', function () {
    return gulp.src(srcPaths.icons)         .pipe(gulp.dest(destPaths.icons));
});

gulp.task('css', function () {
    return gulp.src('Scripts/content/**/*.css')
      .pipe(concatCss("styles/bundle.css"))
      .pipe(gulp.dest(destPaths.css));
});
gulp.task('html', function () {
    return gulp.src('Scripts/app/**/*.html')
      .pipe(htmlmin({ collapseWhitespace: true, caseSensitive: true }))
      .pipe(gulp.dest(destPaths.html));
});
// Define the default task so it will launch all other tasks
gulp.task('default', ['app', 'js', 'watch', 'css', 'html', 'images', 'icons']);

//gulp.task('html', function ()  {
//    return gulp.src('Scripts/app/*.html')
//.pipe($.useref({ searchPath: ['.tmp', 'app', '.'] }))
//.pipe($.if('*.js', $.uglify()))
//.pipe($.if('*.css', $.cssnano()))
//      .pipe(htmlmin())
//      .pipe(gulp.dest(destPaths.html));
//});
//gulp.task('css', function () {
//    gulp.src('Content/**/*.css')
//    .pipe(minifyCSS())
//    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
//    .pipe(concat('style.min.css'))
//    .pipe(gulp.dest(destPaths.css))
//});



//gulp.task('build', ['app', 'js', 'watch', 'css', 'html'], function () {
//    return gulp.src('wwwroot/**/*').pipe(plugins.size({ title: 'build', gzip: true }));
//});

//gulp.task('default', function () {
//    gulp.start('build');
//});

