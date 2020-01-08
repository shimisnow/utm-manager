describe( 'UTM Manager Test - empty()', function() {

	it( 'empty().result() - false', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( 'utm_source' ).empty().result() ).toBeFalsy();
	} );

	it( 'empty().result() - true', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( 'utm_term' ).empty().result() ).toBeTruthy();
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
