const UTMManager = require('../dist/utm-manager.min')

describe('UTMManager Test - is().not()', () => {

  it('not() - one value - true', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is('utm_source')
        .not('google')
        .result()
    ).toBeTruthy()
  })

  it('not() - one value - false', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is('utm_source')
        .not('source')
        .result()
    ).toBeFalsy()
  })

  it('not() - one value - undefined', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is('utm_term')
        .not('term')
        .result()
    ).toBeTruthy()
  })

  it('not() - multiple values - true', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is('utm_source')
        .not(['source-1', 'source-2'])
        .result()
    ).toBeTruthy()
  })

  it('not() - multiple values - false', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is('utm_source')
        .not(['source-1', 'source'])
        .result()
    ).toBeFalsy()
  })

  it('not() - multiple variables - true', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is(['utm_source', 'utm_medium'])
        .not(['source-1', 'medium-1'])
        .result()
    ).toBeTruthy()
  })

  it('not() - multiple variables - false', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is(['utm_source', 'utm_medium'])
        .not(['source', 'medium-1'])
        .result()
    ).toBeFalsy()
  })

  it('not() - single - true', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    var result = null
    utm.is('utm_source')
      .not('source-1')
      .then(() => {
        result = true
      })
      .otherwise(() => {
        result = false
      })

    expect(result).toBeTruthy()
  })

  it('not() - single - false', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    var result = null
    utm.is('utm_campaign')
      .not('campaign')
      .then(() => {
        result = true
      })
      .otherwise(() => {
        result = false
      })

    expect(result).toBeFalsy()
  })

})
