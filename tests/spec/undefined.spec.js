describe( 'UTM Manager Test - undefined()', function() {

	it( 'undefined().result() - true', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( 'utm_term' ).undefined().result() ).toBeTruthy();
	} );

	it( 'undefined().result() - false', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( 'utm_source' ).undefined().result() ).toBeFalsy();
	} );

} );
