const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

gulp.task('styles', function() {
    return gulp.src('caloCheckfront/src/pages/static/styles/*.css') // путь к вашим CSS файлам
        .pipe(concat('all.css')) // объединение всех CSS файлов в один
        .pipe(cleanCSS({compatibility: 'ie8'})) // сжатие CSS
        .pipe(gulp.dest('caloCheckfront/src/pages/static/styles')); // путь к папке для сохранения
});