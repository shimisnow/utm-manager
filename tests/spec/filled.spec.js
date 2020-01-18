describe( 'UTM Manager Test - filled()', function() {

	it( 'filled().result() - true', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( 'utm_source' ).filled().result() ).toBeTruthy();
	} );

	it( 'filled().result() - false (undefined)', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( 'utm_term' ).filled().result() ).toBeFalsy();
	} );

	it( 'filled().result() - false (defined)', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term' );
		expect( utm.is( 'utm_term' ).filled().result() ).toBeFalsy();
	} );

	it( 'filled().result() - multiple variables - true', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( [ 'utm_source', 'utm_medium' ] ).filled().result() ).toBeTruthy();
	} );

	it( 'filled().result() - multiple variables - false (one undefined)', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( [ 'utm_source', 'utm_term' ] ).filled().result() ).toBeFalsy();
	} );

	it( 'filled().result() - multiple variables - false (all undefined)', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( [ 'utm_term', 'utm_content' ] ).filled().result() ).toBeFalsy();
	} );

} );
