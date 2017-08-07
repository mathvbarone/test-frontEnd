const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    beautifycss = require('gulp-cssbeautify'),
    cssmin = require('gulp-cssmin'),
    imagemin = require('gulp-imagemin'),
    htmlclean = require('gulp-htmlclean'),
    babel = require('gulp-babel');




//CAMINHO DOS ARQUIVOS
var paths = {
    src: {
        html: 'src/html/**/*',
        sass: 'src/scss/**/*.scss',
        js: 'src/js/**/*.js',
        img: 'src/images/**/*'
    },
    dest: {
        html: '../',
        sass: 'dist/css',
        js: 'dist/js',
        img: 'dist/images',
        beauty: {
            sass: 'dist/css/beauty'
        }
    }
}

// HTML
gulp.task('html', function() {
    gulp.src(paths.src.html)
        .pipe(htmlclean())
        .pipe(gulp.dest(paths.dest.html));
});


// CSS
gulp.task('css', function() {
    gulp.src(paths.src.sass)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 30 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(plumber.stop())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(paths.dest.sass))
        .pipe(beautifycss())
        .pipe(gulp.dest(paths.dest.beauty.sass))
});



// JAVASCRIPT
gulp.task('js', function() {
    gulp.src(['src/js/jquery-3.2.1.js','src/js/main.js'])
        .pipe(babel({presets: ['es2015']}))
        .pipe(plumber())
        .pipe(concat('concat.js'))
        .pipe(gulp.dest(paths.dest.js))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(gulp.dest(paths.dest.js));
});


//COMPRESSOR DE IMAGEM
gulp.task('image', function() {
    gulp.src(paths.src.img)
        .pipe(imagemin({
            verbose: true
        }))
        .pipe(gulp.dest(paths.dest.img));
});

//VIGIAR AS PASTAS
gulp.task('watch', function() {
    gulp.watch(paths.src.html, ['html']);
    gulp.watch(paths.src.js, ['js']);
    gulp.watch(paths.src.sass, ['css']);
    gulp.watch(paths.src.img, ['image']);
})

gulp.task('default', ['html', 'css', 'js', 'image', 'watch']);