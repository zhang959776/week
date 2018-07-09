var gulp = require('gulp');
//gulp-webserver   起服务
var server = require('gulp-webserver');

var url = require('url');

var fs = require('fs');

var path = require('path');

var sass = require('gulp-sass');

var minCss = require('gulp-clean-css');

var autoprefixer = require('gulp-autoprefixer');

var uglify = require('gulp-uglify');

var htmlmin = require('gulp-htmlmin');

var listData = require('./data/list.json');

//gulp-babel babel-preset-es2015
var es6 = require('gulp-babel');
//起服务
gulp.task('server', ['scss'], function() {
        gulp.src("src")
            .pipe(server({
                //端口号
                port: 8889,
                //拦截前端请求
                middleware: function(req, res, next) {
                    var pathname = url.parse(req.url).pathname;
                    if (pathname === '/favicon.ico') {
                        return false
                    }

                    if (pathname === '/api/list') {
                        res.end(JSON.stringify({ code: 1, data: listData }))
                    } else {
                        pathname = pathname === '/' ? '/index.html' : pathname;
                        console.log(pathname);

                        res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                    }

                }
            }))
    })
    //     //压缩css
    // gulp.task('scss', function() {
    //         gulp.src('./src/scss/*.scss')
    //             .pipe(sass())
    //             .pipe(autoprefixer({
    //                 browsers: ['last 2 versions', 'Android >= 4.0']
    //             }))
    //             .pipe(minCss())
    //             .pipe(gulp.dest('build/css'))
    //     })
    //     //压缩js
    // gulp.task('js', function() {
    //     gulp.src('./src/js/*.js')
    //         .pipe(uglify())
    //         .pipe(gulp.dest('build/js'))
    // })
    // var options = {
    //         //压缩html
    //         collapseWhitespace: true
    //     }
    //     //压缩html
    // gulp.task('html', function() {
    //     gulp.src('./src/**/*.html')
    //         .pipe(htmlmin())
    //         .pipe(gulp.dest("build"))
    // })