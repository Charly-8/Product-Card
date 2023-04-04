const {src, dest, watch, parallel} = require("gulp");

// CSS
const sass = require("gulp-sass")(require("sass") );
const plumber = require("gulp-plumber");

// Image
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const webp = require("gulp-webp");

// Functions

function css (done) {
    src("src/scss/**/*.scss") // Identify files
        .pipe( plumber())
        .pipe( sass()) // Compilate
        .pipe( dest("build/css")) // Store 

    done();
}

function images (done) {
    src("images/**/*.{jpg, png}")
        .pipe( cache( imagemin( {optimizationLevel:3})))
        .pipe( dest("build/img"))

    done();
}

function vWep (done) {
    const opciones = {
        quality: 50
    }

    src("images/**/*.{jpg, png}")
        .pipe( webp(opciones) )
        .pipe( dest("build/img"))

    done();
}

function dev (done) {
    watch("src/scss/**/*.scss", css)

    done();
}

exports.css = css;
exports.images = images;
exports.vWvWep =vWep;
exports.dev = parallel(dev, images, vWep);
