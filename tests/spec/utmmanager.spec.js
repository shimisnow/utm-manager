describe( 'UTM Manager Test - UTMManager()', function() {

	it( 'UTMManager() - valid string', function() {
		var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value';
		var result = 'utm_source=source&utm_medium=medium&utm_campaign=campaign'
		const utm = UTMManager( string );
		expect( utm.toString() ).toBe( result );
	} );

	it( 'UTMManager() - valid string (extended)', function() {
		var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value';
		const utm = UTMManager( string, [ 'variable' ] );
		expect( utm.toString() ).toBe( string );
	} );

	it( 'UTMManager() - invalid string', function() {
		var string = 'some-stuff';
		const utm = UTMManager( string );
		expect( utm.toString() ).toBe( '' );
	} );

	it( 'UTMManager() - valid url - with variables', function() {
		var string = 'https://domain.com/?utm_term=term&utm_medium=medium&utm_campaign=campaign&utm_content=content&utm_source=source';
		var result = 'utm_term=term&utm_medium=medium&utm_campaign=campaign&utm_content=content&utm_source=source';
		const utm = UTMManager( string );
		expect( utm.toString() ).toBe( result );
	} );

	it( 'UTMManager() - valid url - with variables and hash (#)', function() {
		var string = 'https://domain.com/?utm_term=term&utm_medium=medium&utm_campaign=campaign&utm_content=content&utm_source=source#hey-there-is-a-hash';
		var result = 'utm_term=term&utm_medium=medium&utm_campaign=campaign&utm_content=content&utm_source=source';
		const utm = UTMManager( string );
		expect( utm.toString() ).toBe( result );
	} );

	it( 'UTMManager() - valid url - without variables', function() {
		var string = 'https://domain.com/';
		const utm = UTMManager( string );
		expect( utm.toString() ).toBe( '' );
	} );

	it( 'UTMManager() - valid url - without variables and with hash (#)', function() {
		var string = 'https://domain.com/#we-all-love-coffee';
		const utm = UTMManager( string );
		expect( utm.toString() ).toBe( '' );
	} );

	it( 'UTMManager() - json variables (only utm)', function() {
		const utm = UTMManager( {
			'utm_source'   : 'source',
			'utm_medium'   : 'medium',
			'utm_campaign' : 'campaign'
		} );
		expect( utm.toString() ).toBe( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
	} );

	it( 'UTMManager() - json variables (extract only utm)', function() {
		const utm = UTMManager( {
			'utm_source'   : 'source',
			'utm_medium'   : 'medium',
			'utm_campaign' : 'campaign',
			'random_variable' : 'random'
		} );
		expect( utm.toString() ).toBe( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
	} );

	it( 'UTMManager() - json variables (extract utm and some variable)', function() {
		const utm = UTMManager( {
			'utm_source'   : 'source',
			'utm_medium'   : 'medium',
			'utm_campaign' : 'campaign',
			'random_variable' : 'random',
			'another_variable' : 'another'
		}, [ 'another_variable' ] );
		expect( utm.toString() ).toBe( 'utm_source=source&utm_medium=medium&utm_campaign=campaign&another_variable=another' );
	} );

	it( 'UTMManager() - json variables (extract all variables)', function() {
		const utm = UTMManager( {
			'utm_source'   : 'source',
			'utm_medium'   : 'medium',
			'utm_campaign' : 'campaign',
			'random_variable' : 'random',
			'another_variable' : 'another'
		}, 'all' );
		expect( utm.toString() ).toBe( 'utm_source=source&utm_medium=medium&utm_campaign=campaign&random_variable=random&another_variable=another' );
	} );

} );
