const gulp   = require( 'gulp' );
const gutil  = require( 'gulp-util' );
const uglify = require( 'gulp-uglify' );
const rm     = require( 'gulp-rm' );
const rename = require( 'gulp-rename' );

var paths = {
	js: {
		src: 'src/UTMManager.js',
		dest: 'dist/',
		filename: 'utm-manager.min.js'
	}
};

gulp.task( 'clean', function() {
	return gulp.src( 'dist/**/*', { read: false } )
		.pipe( rm() );
} );

gulp.task( 'minify', function() {
	return gulp.src( paths.js.src )
		.pipe( gutil.env.env === 'production' ? uglify() : gutil.noop() )
		.pipe( rename( paths.js.filename ) )
		.pipe( gulp.dest( paths.js.dest ) );
} );

gulp.task( 'default', gulp.series( [ 'clean', 'minify' ] ) );
