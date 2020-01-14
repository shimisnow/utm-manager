describe( 'UTM Manager Test - toString()', function() {

	/**** SIMPLE *****/

	it( 'toString() - one variable', function() {
		var string = 'utm_source=source';
		const utm = UTMManager( string );
		expect( utm.toString() ).toBe( string );
	} );

	it( 'toString() - multiple variables', function() {
		var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign';
		const utm = UTMManager( string );
		expect( utm.toString() ).toBe( string );
	} );

	it( 'toString() - multiple variable another order', function() {
		var string = 'utm_term=term&utm_medium=medium&utm_campaign=campaign&utm_content=content&utm_source=source';
		const utm = UTMManager( string );
		expect( utm.toString() ).toBe( string );
	} );

	/**** CONFIG UTM *****/

	it( 'toString() - utm - one variable (defined)', function() {
		var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign';
		const utm = UTMManager( string );
		expect( utm.toString( {
			utm : [ 'utm_source' ]
		} ) ).toBe( 'utm_source=source' );
	} );

	it( 'toString() - utm - one variable (undefined)', function() {
		var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign';
		const utm = UTMManager( string );
		expect( utm.toString( {
			utm : [ 'utm_term' ]
		} ) ).toBe( '' );
	} );

	it( 'toString() - utm - multiple variables (defined)', function() {
		var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign';
		const utm = UTMManager( string );
		expect( utm.toString( {
			utm : [ 'utm_source', 'utm_campaign' ]
		} ) ).toBe( 'utm_source=source&utm_campaign=campaign' );
	} );

	it( 'toString() - utm - multiple variables (some undefined)', function() {
		var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign';
		const utm = UTMManager( string );
		expect( utm.toString( {
			utm : [ 'utm_term', 'utm_source', 'utm_campaign' ]
		} ) ).toBe( 'utm_source=source&utm_campaign=campaign' );
	} );

	/**** CONFIG EMPTY *****/

	it( 'toString() - empty - one variable (undefined)', function() {
		var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign';
		const utm = UTMManager( string );
		expect( utm.toString( {
			utm : [ 'utm_term' ],
			undefined : true
		} ) ).toBe( 'utm_term=' );
	} );

	it( 'toString() - empty - multiple variables (some undefined)', function() {
		var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign';
		const utm = UTMManager( string );
		expect( utm.toString( {
			utm : [ 'utm_term', 'utm_source', 'utm_campaign' ],
			undefined : true
		} ) ).toBe( 'utm_term=&utm_source=source&utm_campaign=campaign' );
	} );

	/**** CONFIG GLUE *****/

	it( 'toString() - one variable', function() {
		var string = 'utm_source=source';
		const utm = UTMManager( string );
		expect( utm.toString( { glue : '-' } ) ).toBe( string );
	} );

	it( 'toString() - multiple variables', function() {
		var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign';
		var result = 'utm_source=source#utm_medium=medium#utm_campaign=campaign';
		const utm = UTMManager( string );
		expect( utm.toString( { glue : '#' } ) ).toBe( result );
	} );

	it( 'toString() - multiple variable another order', function() {
		var string = 'utm_term=term&utm_medium=medium&utm_campaign=campaign&utm_content=content&utm_source=source';
		var result = 'utm_source=source<*>utm_medium=medium<*>utm_campaign=campaign<*>utm_term=term<*>utm_content=content';
		const utm = UTMManager( string );
		expect( utm.toString( {
			utm : [ 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content' ],
			glue : '<*>'
		} ) ).toBe( result );
	} );

} );
