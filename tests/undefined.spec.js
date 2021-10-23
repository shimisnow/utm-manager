const UTMManager = require('../dist/utm-manager.min')

describe('UTMManager Test - undefined()', () => {

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

})
