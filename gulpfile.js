// Load plugins
import gulp from 'gulp';
import path from 'node:path';
import autoprefixer from 'gulp-autoprefixer';
import changed from 'gulp-changed';
import { deleteAsync } from 'del';
import typescript from 'gulp-typescript';
import babel from 'gulp-babel';
// import sourcemaps from 'gulp-sourcemaps';

import { create as browserSyncCreate } from 'browser-sync';
const browserSync = browserSyncCreate();

import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

// Constants
const srcDir = './src'
const outDir = './dist'

const srcPath = {
    ts: './src/ts/**/*.ts',
    sass: './src/scss/**/*.scss',
}

// relative to srcDir
const looseFiles = [
    './index.html',
    './theme/theme.css'
]

const sassImports = [
    "./node_modules"
]

function outPath(relativePath) {
    if (!relativePath) return outDir;
    return path.join(outDir, relativePath)
}

// Clean assets

function cleanOutDir() {
    return deleteAsync([
        outPath()
    ]);
}

// TypeScript

var tsProject;
function tsBuild() {
    if (!tsProject) {
        tsProject = typescript.createProject('./tsconfig.json');
    }

    const dest = outPath('js');
    var reporter = typescript.reporter.fullReporter();
    var tsResult = gulp.src(srcPath.ts)
        .pipe(changed(dest))
        // .pipe(sourcemaps.init())
        .pipe(tsProject(reporter));

    return tsResult.js
        .pipe(babel())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream());
}

// SASS

function sassBuild() {
    const dest = outPath('css');
    return gulp.src(srcPath.sass)
        .pipe(changed(dest))
        .pipe(sass({
            indentType: "space",
            indentWidth: 4,
            includePaths: sassImports
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream());
}

// Loose files

function looseFilesBuild() {
    if (looseFiles.length <= 0) return gulp.src('.')

    const dest = outPath();
    return gulp.src(looseFiles, { base: srcDir, cwd: srcDir })
        .pipe(changed(dest))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream())
}

// Watch files

function watchFiles() {
    gulp.watch(srcPath.sass, sassBuild);
    gulp.watch(srcPath.ts, tsBuild);

    if (looseFiles.length > 0)
        gulp.watch(looseFiles, looseFilesBuild);
}

// BrowserSync

function browserSyncInit() {
    browserSync.init({
        server: {
            baseDir: outDir,
            index: 'index.html'
        },
        port: 8080,
        open: 'local',
        browser: 'chrome'
    });
}

// Exports

const { parallel, series } = gulp;
const buildTask = parallel(tsBuild, sassBuild, looseFilesBuild);
const rebuildTask = series(cleanOutDir, buildTask);
const serveTask = series(cleanOutDir, buildTask, parallel(watchFiles, browserSyncInit));
serveTask.description = 'Runs a browser-sync server';

export {
    rebuildTask as default,
    rebuildTask as build,
    cleanOutDir as clean,
    serveTask as serve,
    tsBuild as typescript,
    sassBuild as sass
}
