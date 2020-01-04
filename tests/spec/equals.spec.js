describe( 'UTM Manager Test - is().equals()', function() {

	it( 'equals() - one value - true', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( 'utm_source' ).equals( 'source' ).result() ).toBeTruthy();
	} );

	it( 'equals() - one value - false', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( 'utm_source' ).equals( 'medium' ).result() ).toBeFalsy();
	} );

	it( 'equals() - one value - undefined', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( 'utm_term' ).equals( 'term' ).result() ).toBeFalsy();
	} );

	it( 'equals() - multiple values - true [0]', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( 'utm_source' ).equals( [ 'source', 'source-2' ] ).result() ).toBeTruthy();
	} );

	it( 'equals() - multiple values - true [1]', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( 'utm_source' ).equals( [ 'source-2', 'source' ] ).result() ).toBeTruthy();
	} );

	it( 'equals() - multiple values - false', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( 'utm_source' ).equals( [ 'source-1', 'source-2' ] ).result() ).toBeFalsy();
	} );

	it( 'equals() - multiple variables - true', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( [ 'utm_source', 'utm_medium' ] ).equals( [ 'source', 'medium' ] ).result() ).toBeTruthy();
	} );

	it( 'equals() - multiple variables - false [0]', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( [ 'utm_source', 'utm_medium' ] ).equals( [ 'source-2', 'medium' ] ).result() ).toBeFalsy();
	} );

	it( 'equals() - multiple variables - false [1]', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.is( [ 'utm_source', 'utm_medium' ] ).equals( [ 'source', 'medium-2' ] ).result() ).toBeFalsy();
	} );

	it( 'equals() - single - true', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		var result = null;
		utm.is( 'utm_source' )
			.equals( 'source' )
			.then( function() { result = true; } )
			.otherwise( function() { result = false; } );
		expect( result ).toBeTruthy();
	} );

	it( 'equals() - single - false', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		var result = null;
		utm.is( 'utm_term' )
			.equals( 'term' )
			.then( function() { result = true; } )
			.otherwise( function() { result = false; } );
		expect( result ).toBeFalsy();
	} );

	it( 'equals() - multiple - true [0]', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		var result = null;
		utm.is( 'utm_source' )
			.equals( 'source' ).then( function() { result = 1; } )
			.equals( 'source-2' ).then( function() { result = 2; } );
		expect( result ).toBe( 1 );
	} );

	it( 'equals() - multiple - true [1]', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		var result = null;
		utm.is( 'utm_source' )
			.equals( 'source-2' ).then( function() { result = 1; } )
			.equals( 'source' ).then( function() { result = 2; } );
		expect( result ).toBe( 2 );
	} );

	it( 'equals() - multiple - false', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		var result = 0;
		utm.is( 'utm_source' )
			.equals( 'source-1' ).then( function() { result = 1; } )
			.equals( 'source-2' ).then( function() { result = 2; } );
		expect( result ).toBe( 0 );
	} );

	it( 'equals() - multiple - false (otherwise)', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		var result = 0;
		utm.is( 'utm_source' )
			.equals( 'source-1' ).then( function() { result = 1; } )
			.equals( 'source-2' ).then( function() { result = 2; } )
			.otherwise( function() { result = 3; } );
		expect( result ).toBe( 3 );
	} );

} );
