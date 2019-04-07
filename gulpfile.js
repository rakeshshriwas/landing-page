
const { src, dest, task, watch, series, parallel } = require('gulp');

// CSS related plugins
var sass         = require( 'gulp-sass' );
var autoprefixer = require( 'gulp-autoprefixer' );

// JS related plugins
var uglify       = require( 'gulp-uglify' );

// Utility plugins
var rename       = require( 'gulp-rename' );
var sourcemaps   = require( 'gulp-sourcemaps' );
var notify       = require( 'gulp-notify' );
var plumber      = require( 'gulp-plumber' );

// Browers related plugins
var browserSync  = require( 'browser-sync' ).create();

// Project related variables
var styleSrc     = 'src/sass/styles.scss';
var styleDest    = 'dist/assets/css/';
var mapURL       = '/';

var jsSrc        = 'src/js/**/*.js';
var jsDest       = 'dist/assets/js/';

var imgSrc       = 'src/images/**/*';
var imgDest      = 'dist/assets/images/';

var fontsSrc     = 'src/fonts/**/*';
var fontsDest    = 'dist/assets/fonts/';

var htmlSrc      = 'src/**/*.html';
var htmlDest     = 'dist/';

var cssSrc      = 'src/**/*.css';
var cssDest     = 'dist/assets/';

var styleWatch   = 'src/sass/**/*.scss';
var jsWatch      = 'src/js/**/*.js';
var imgWatch     = 'src/media/**/*.*';
var fontsWatch   = 'src/fonts/**/*.*';
var htmlWatch    = 'src/**/*.html';

// Tasks
function browser_sync() {
	browserSync.init({
        open: false,
		server: {
			baseDir: './dist/'
		}
	});
}

function reload(done) {
	browserSync.reload();
	done();
}

function css(done) {
	src( [ styleSrc ] )
		.pipe( sourcemaps.init() )
		.pipe( sass({
			errLogToConsole: true
			// outputStyle: 'compressed'
		}) )
		.on( 'error', console.error.bind( console ) )
		.pipe( autoprefixer({ browsers: [ 'last 2 versions', '> 5%', 'Firefox ESR' ] }) )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( sourcemaps.write( mapURL ) )
		.pipe( dest( styleDest ) )
		.pipe( browserSync.stream() );
	done();
};

function js(done){
    src( jsSrc )
    .pipe( rename({
        extname: '.min.js'
    }) )
    .pipe( sourcemaps.init({ loadMaps: true }) )
    .pipe( uglify() )
    .pipe( sourcemaps.write( '.' ) )
    .pipe(dest(jsDest))
    .pipe( browserSync.stream() );

    done();
};

function triggerPlumber( src_file, dest_file ) {
	return src( src_file )
		.pipe( plumber() )
		.pipe( dest( dest_file ) );
}

function cssCopy() {
	return triggerPlumber( cssSrc, cssDest );
};

function images() {
	return triggerPlumber( imgSrc, imgDest );
};

function fonts() {
	return triggerPlumber( fontsSrc, fontsDest );
};

function html() {
	return triggerPlumber( htmlSrc, htmlDest );
};

function watch_files() {

	watch(styleWatch, series(css));
	watch(jsWatch, series(js, reload));
	watch(imgWatch, series(images, reload));
	watch(fontsWatch, series(fonts, reload));
	watch(htmlWatch, series(html, reload));
}

task("css", css);
task("cssCopy", cssCopy);
task("js", js);
task("images", images);
task("fonts", fonts);
task("html", html);
task("default", parallel(css,cssCopy, js, images, fonts, html));
task("watch", parallel(browser_sync, watch_files));