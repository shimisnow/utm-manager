describe( 'UTM Manager Test - remove()', function() {

	it( 'remove()', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		utm.remove();
		expect( utm.toString() ).toBe( '' );
	} );

	it( 'remove( variable )', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		utm.remove( 'utm_medium' );
		expect( utm.toString() ).toBe( 'utm_source=source&utm_campaign=campaign' );
	} );

	it( 'remove( filter )', function() {
		const utm = UTMManager( 'utm_source=value&utm_medium=medium&utm_campaign=value' );
		utm.remove( function( variable, value ) {
			return ( value == 'value' );
		} );
		expect( utm.toString() ).toBe( 'utm_medium=medium' );
	} );

	it( 'remove( variable, filter ) - true', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		utm.remove( 'utm_medium', function( variable, value ) {
			return ( value == 'medium' );
		} );
		expect( utm.toString() ).toBe( 'utm_source=source&utm_campaign=campaign' );
	} );

	it( 'remove( variable, filter ) - false', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		utm.remove( 'utm_campaign', function( variable, value ) {
			return ( value == 'campaign-02' );
		} );
		expect( utm.toString() ).toBe( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
	} );

	it( 'remove( variables )', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		utm.remove( [ 'utm_medium', 'utm_campaign' ] );
		expect( utm.toString() ).toBe( 'utm_source=source' );
	} );

	it( 'remove( variables, filter )', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		utm.remove( [ 'utm_source', 'utm_medium' ], function( variable, value ) {
			return ( value == 'source' );
		} );
		expect( utm.toString() ).toBe( 'utm_medium=medium&utm_campaign=campaign' );
	} );

} );

/*

it( 'remove( string )', function() {
	const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
	utm.remove();
	expect( utm.toString() ).toBe( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
} );

*/
