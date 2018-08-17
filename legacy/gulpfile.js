const gulp = require('gulp');
const WebServer = require('gulp-webserver');
const TS = require("gulp-typescript");
const FS = require("fs");
const Del = require("del");
const Path = require("path");
const runSequence = require('run-sequence');
const http = require('http');

const releaseTsProj = TS.createProject("./src/tsconfig-dist.json");
const testTsProj = TS.createProject("./src/tsconfig.json");


gulp.task('build-script-release', function(done) {
    if (typeof(releaseTsProj) != "undefined") 
        return releaseTsProj.src().pipe(releaseTsProj()).pipe(gulp.dest(releaseTsProj.options.outDir));
    else
        done();
});

gulp.task('update-lib', ['update-dist-popper', 'update-dist-jquery', 'update-dist-bootstrap', 'update-dist-bootstrap-table', 'update-dist-angular']);

gulp.task('update-dist-angular', function(done) {
    return gulp.src([
        'node_modules/angular/**/*', '!node_modules/angular/**/*.gzip', '!node_modules/angular/**/*.json', '!node_modules/angular/**/*.md', '!node_modules/angular/**/index.js'
    ]).pipe(gulp.dest('dist/lib/angular'));
});

gulp.task('update-dist-popper', function(done) {
    return gulp.src('node_modules/popper.js/dist/**/*').pipe(gulp.dest('dist/lib/popper.js'));
});

gulp.task('update-dist-jquery', function(done) {
    return gulp.src('node_modules/jquery/dist/**/*').pipe(gulp.dest('dist/lib/jquery'));
});

gulp.task('update-dist-bootstrap', function(done) {
    return gulp.src('node_modules/bootstrap/dist/**/*').pipe(gulp.dest('dist/lib/bootstrap'));
});

gulp.task('update-dist-bootstrap-table', function(done) {
    return gulp.src('node_modules/bootstrap-table/dist/**/*').pipe(gulp.dest('dist/lib/bootstrap-table'));
});

gulp.task('build-script-test', function(done) {
    if (typeof(testTsProj) != "undefined") 
        return testTsProj.src().pipe(testTsProj()).pipe(gulp.dest(testTsProj.options.outDir));
    else
        done();
});

gulp.task("clean-lib", function(done) {
    Del(['dist/lib/**', '!dist/lib']).then(function(paths) {
        done();
        console.log("Deleted %s", JSON.stringify(paths));
    }, function(reason) {
        done();
        if (typeof(reason) != "undefined" && reason !== null)
            console.error("clean-dist-script failed: %s", JSON.stringify(reason));
        else
            console.error("clean-dist-script failed");
    });
});

gulp.task("clean-script", function(done) {
    Del(['dist/script/**', '!dist/script']).then(function(paths) {
        done();
        console.log("Deleted %s", JSON.stringify(paths));
    }, function(reason) {
        done();
        if (typeof(reason) != "undefined" && reason !== null)
            console.error("clean-dist-script failed: %s", JSON.stringify(reason));
        else
            console.error("clean-dist-script failed");
    });
});

gulp.task('start-webserver', function(done) {
    var mapFileRe = /\.map$/i;
    var killRe = /^[^#?\/]*((?=\/+[^#?\/]+\/+[^#?\/])\/+[^#?\/]+)*\/+__KILL__\/*([?#]|$)/;
    var stream = gulp.src('dist');
    stream.pipe(WebServer({
        livereload: true,
        directoryListing: true,
        open: false,
        port: 8085,
        middleware: function(req, res, next) {
            console.log(req.url);
            if (killRe.test(req.url)) {
                done();
                res.end();
                stream.emit('kill');
            }
            next();
        }
    }));
});

gulp.task('stop-webserver', function(done) {
    return http.request('http://localhost:8085/__KILL__').end(done);
});