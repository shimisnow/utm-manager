describe( 'UTM Manager Test - is().not()', function() {

	it( 'not() - one value - true', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( 'utm_source' ).not( 'google' ).result() ).toBeTruthy();
	} );

	it( 'not() - one value - false', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( 'utm_source' ).not( 'source' ).result() ).toBeFalsy();
	} );

	it( 'not() - one value - undefined', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( 'utm_term' ).not( 'term' ).result() ).toBeTruthy();
	} );

	it( 'not() - multiple values - true', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( 'utm_source' ).not( [ 'source-1', 'source-2' ] ).result() ).toBeTruthy();
	} );

	it( 'not() - multiple values - false', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( 'utm_source' ).not( [ 'source-1', 'source' ] ).result() ).toBeFalsy();
	} );

	it( 'not() - multiple variables - true', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( [ 'utm_source', 'utm_medium' ] ).not( [ 'source-1', 'medium-1' ] ).result() ).toBeTruthy();
	} );

	it( 'not() - multiple variables - false', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( [ 'utm_source', 'utm_medium' ] ).not( [ 'source', 'medium-1' ] ).result() ).toBeFalsy();
	} );

	it( 'not() - single - true', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		var result = null;
		utm.is( 'utm_source' )
			.not( 'source-1' )
			.then( function() { result = true; } )
			.otherwise( function() { result = false; } );
		expect( result ).toBeTruthy();
	} );

	it( 'not() - single - false', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		var result = null;
		utm.is( 'utm_campaign' )
			.not( 'campaign' )
			.then( function() { result = true; } )
			.otherwise( function() { result = false; } );
		expect( result ).toBeFalsy();
	} );

} );
