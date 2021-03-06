const gulp    = require( 'gulp' );
const gutil   = require( 'gulp-util' );
const uglify  = require( 'gulp-uglify' );
const rm      = require( 'gulp-rm' );
const rename  = require( 'gulp-rename' );
const zip     = require( 'gulp-zip' );
const hashsum = require( 'gulp-hashsum' );

var paths = {
	js: {
		src: 'src/UTMManager.js',
		dest: 'dist/',
		filename: 'utm-manager.min.js'
	},
	zip : {
		src: 'dist/**/*',
		dest: 'dist/',
		filename: 'utm-manager.zip'
	},
	hashsum : {
		src: 'dist/utm-manager.zip',
		dest: 'dist/',
		filename: 'utm-manager.zip.sha1'
	}
};

gulp.task( 'clean', function() {
	return gulp.src( 'dist/**/*', { read: false } )
		.pipe( rm() );
} );

gulp.task( 'compile', function() {
	return gulp.src( paths.js.src )
		.pipe( gutil.env.env === 'production' ? uglify() : gutil.noop() )
		.pipe( rename( paths.js.filename ) )
		.pipe( gulp.dest( paths.js.dest ) );
} );

gulp.task( 'zip', function() {
	return gulp.src( paths.zip.src )
		.pipe( zip( paths.zip.filename ) )
		.pipe( gulp.dest( paths.zip.dest ) );
} );

gulp.task( 'hashsum', function() {
	return gulp.src( [ paths.hashsum.src ] )
	.pipe( hashsum( {
		dest : paths.hashsum.dest,
		filename : paths.hashsum.filename
	} ) );
} );

gulp.task( 'default',
	gulp.series( [
		'clean',
		'compile',
		gutil.env.env === 'production' ? [ 'zip', 'hashsum' ] : []
	] )
);
