const { src, dest, watch, parallel } = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();


function styles() {
    return src(['caloCheckfront/src/pages/static/styles/*.css', '!caloCheckfront/src/pages/static/styles/style.min.css'])
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(dest('caloCheckfront/src/pages/static/styles'))
        .pipe(browserSync.stream());
}

function watching() {
    watch(['caloCheckfront/src/pages/static/styles/*.css', '!caloCheckfront/src/pages/static/styles/style.min.css'], styles);
    watch("caloCheckfront/src/pages/*.js").on('change', browserSync.reload);
}

function browsersync() {

    browserSync.init({
        proxy: "http://localhost:3000", 
        port: 3001,
        open: false,
        browser: "google chrome"
    });
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;

exports.default = parallel(styles, browsersync, watching);
