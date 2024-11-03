// Import necessary modules
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleancss = require('gulp-clean-css');
const csscomb = require('gulp-csscomb');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// Define paths
const paths = {
    source: './scss/**/*.scss',
    dest: './css-compiled'
};

// Compile SCSS to CSS
function compileSass() {
    return gulp.src(paths.source)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded', // Expanded for readability before minification
            precision: 10
        }).on('error', sass.logError))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(csscomb())
        .pipe(gulp.dest(paths.dest)) // Unminified output
        .pipe(cleancss({ level: 2, rebase: false })) // Optimized minification
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dest))
        .pipe(browserSync.stream()); // Stream changes to BrowserSync
}

// Serve with BrowserSync and watch for file changes
function serve() {
    browserSync.init({
        proxy: "http://127.0.0.1:8000", // Proxy for localhost
        notify: false
    });

    gulp.watch(paths.source, compileSass);
    gulp.watch('./blueprints/*.yaml').on('change', browserSync.reload);
    gulp.watch('./templates/**/*.twig').on('change', browserSync.reload);
    gulp.watch('../../pages/**/*.md').on('change', browserSync.reload);
    gulp.watch('../../config/**/*.yaml').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

// Define Gulp tasks
exports.compileSass = compileSass;
exports.serve = serve;
exports.default = gulp.series(compileSass, serve);
