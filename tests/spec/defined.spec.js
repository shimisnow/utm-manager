describe( 'UTM Manager Test - defined()', function() {

	it( 'defined().result() - true', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( 'utm_source' ).defined().result() ).toBeTruthy();
	} );

	it( 'defined().result() - false', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( 'utm_term' ).defined().result() ).toBeFalsy();
	} );

	it( 'defined().and().empty().result() - true', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term=' );
		expect( utm.is( 'utm_term' ).defined().and().empty().result() ).toBeTruthy();
	} );

	it( 'defined().and().empty().result() - false (undefined)', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( 'utm_term' ).defined().and().empty().result() ).toBeFalsy();
	} );

	it( 'defined().and().empty().result() - false (defined but not empty)', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term=term' );
		expect( utm.is( 'utm_term' ).defined().and().empty().result() ).toBeFalsy();
	} );

} );
