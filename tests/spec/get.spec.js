describe( 'UTM Manager Test - get()', function() {

	it( 'get() - empty', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.get() ).toEqual( [ 'source', 'medium', 'campaign' ] );
	} );

	it( 'get() - one variable', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.get( 'utm_medium' ) ).toEqual( 'medium' );
	} );

	it( 'get() - one variable that do not exists', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.get( 'utm_term' ) ).toBeUndefined();
	} );

	it( 'get() - multiple variables', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.get( [ 'utm_source', 'utm_medium' ] ) ).toEqual( [ 'source', 'medium' ] );
	} );

	it( 'get() - multiple variables with one that do not exists', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.get( [ 'utm_source', 'utm_term' ] ) ).toEqual( [ 'source', undefined ] );
	} );

	it( 'get() - empty array', function() {
		const utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
		expect( utm.get( [ ] ) ).toEqual( [ ] );
	} );

} );
