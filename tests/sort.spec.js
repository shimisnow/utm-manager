const UTMManager = require('../dist/utm-manager.min')

describe('UTMManager Test - sort()', () => {

  /**** EMPTY - SAME AS STRICT *****/

  it('sort() - one variable', () => {
    var string = 'utm_source=source'
    const utm = new UTMManager(string)

    utm.sort()

    expect(
      utm.toString()
    ).toBe(string)
  })

  it('sort() - multiple variables', () => {
    var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign'
    const utm = new UTMManager(string)

    utm.sort()

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_medium=medium&utm_campaign=campaign')
  })

  it('sort() - multiple variable another order', () => {
    var string = 'utm_term=term&utm_medium=medium&utm_campaign=campaign&utm_content=content&utm_source=source'
    const utm = new UTMManager(string)

    utm.sort()

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term=term&utm_content=content')
  })

  it('sort() - multiple variable with extended', () => {
    var string = 'utm_term=term&utm_medium=medium&variable=value&utm_campaign=campaign&utm_content=content&utm_source=source&a=b'
    const utm = new UTMManager(string, ['a', 'variable'])

    utm.sort()

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term=term&utm_content=content&variable=value&a=b')
  })

  /**** STRICT *****/

  it('sort( strict ) - one variable', () => {
    var string = 'utm_source=source'
    const utm = new UTMManager(string)

    utm.sort('strict')

    expect(
      utm.toString()
    ).toBe(string)
  })

  it('sort( strict ) - multiple variables', () => {
    var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign'
    const utm = new UTMManager(string)

    utm.sort('strict')

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_medium=medium&utm_campaign=campaign')
  })

  it('sort( strict ) - multiple variable another order', () => {
    var string = 'utm_term=term&utm_medium=medium&utm_campaign=campaign&utm_content=content&utm_source=source'
    const utm = new UTMManager(string)

    utm.sort('strict')

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term=term&utm_content=content')
  })

  it('sort( strict ) - multiple variable with extended', () => {
    var string = 'utm_term=term&utm_medium=medium&variable=value&utm_campaign=campaign&utm_content=content&utm_source=source&a=b'
    const utm = new UTMManager(string,['a', 'variable'])

    utm.sort('strict')

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term=term&utm_content=content&variable=value&a=b')
  })

  /**** STRICT-LEXICAL *****/

  it('sort( strict-lexical ) - one variable', () => {
    var string = 'utm_source=source'
    const utm = new UTMManager(string)

    utm.sort('strict-lexical')

    expect(
      utm.toString()
    ).toBe(string)
  })

  it('sort( strict-lexical ) - multiple variables', () => {
    var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign'
    const utm = new UTMManager(string)

    utm.sort('strict-lexical')

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_medium=medium&utm_campaign=campaign')
  })

  it('sort( strict-lexical ) - multiple variable another order', () => {
    var string = 'utm_term=term&utm_medium=medium&utm_campaign=campaign&utm_content=content&utm_source=source'
    const utm = new UTMManager(string)

    utm.sort('strict-lexical')

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term=term&utm_content=content')
  })

  it('sort( strict-lexical ) - multiple variable with extended', () => {
    var string = 'utm_term=term&utm_medium=medium&variable=value&utm_campaign=campaign&utm_content=content&utm_source=source&a=b'
    const utm = new UTMManager( string,['a', 'variable'])

    utm.sort('strict-lexical')

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term=term&utm_content=content&a=b&variable=value')
  })

  /***** LEXICAL *****/

  it('sort( lexical ) - one variable', () => {
    var string = 'utm_source=source'
    const utm = new UTMManager(string)

    utm.sort('lexical')

    expect(
      utm.toString()
    ).toBe(string)
  })

  it('sort( lexical ) - multiple variables', () => {
    var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign'
    const utm = new UTMManager(string)

    utm.sort('lexical')

    expect(
      utm.toString()
    ).toBe('utm_campaign=campaign&utm_medium=medium&utm_source=source')
  })

  it('sort( lexical ) - multiple variable another order', () => {
    var string = 'utm_term=term&utm_medium=medium&utm_campaign=campaign&utm_content=content&utm_source=source'
    const utm = new UTMManager(string)

    utm.sort('lexical')

    expect(
      utm.toString()
    ).toBe('utm_campaign=campaign&utm_content=content&utm_medium=medium&utm_source=source&utm_term=term')
  })

  it('sort( lexical ) - multiple variable with extended', () => {
    var string = 'utm_term=term&utm_medium=medium&variable=value&utm_campaign=campaign&utm_content=content&utm_source=source&a=b'
    const utm = new UTMManager( string,['a', 'variable'])

    utm.sort('lexical')

    expect(
      utm.toString()
    ).toBe('a=b&utm_campaign=campaign&utm_content=content&utm_medium=medium&utm_source=source&utm_term=term&variable=value')
  })

})
