const UTMManager = require('../../dist/utm-manager.min')

describe('UTMManager Test - result()', () => {

  it('empty().result() - false', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is('utm_source')
        .empty()
        .result()
    ).toBeFalsy()
  })

  it('empty().result() - true', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is('utm_term')
        .empty()
        .result()
    ).toBeTruthy()
  })

  it('defined().result() - true', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is('utm_source')
        .defined()
        .result()
    ).toBeTruthy()
  })

  it('defined().result() - false', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is('utm_term')
        .defined()
        .result()
    ).toBeFalsy()
  })

  it('undefined().result() - true', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')
    expect(
      utm.is('utm_term')
        .undefined()
        .result()
    ).toBeTruthy()
  })

  it('undefined().result() - false', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is('utm_source')
        .undefined()
        .result()
      ).toBeFalsy()
  })

  it('defined().and().empty().result() - true', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term=')

    expect(
      utm.is('utm_term')
        .defined()
        .and()
        .empty()
        .result()
    ).toBeTruthy()
  })

  it('defined().and().empty().result() - false (undefined)', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is('utm_term')
        .defined()
        .and()
        .empty()
        .result()
    ).toBeFalsy()
  })

  it('defined().and().empty().result() - false (defined but not empty)', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term=term')

    expect(
      utm.is('utm_term')
        .defined()
        .and()
        .empty()
        .result()
    ).toBeFalsy()
  })

})
