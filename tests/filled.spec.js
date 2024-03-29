const UTMManager = require('../dist/utm-manager.min')

describe('UTMManager Test - filled()', () => {

  it('filled().result() - true', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is('utm_source')
        .filled()
        .result()
    ).toBeTruthy()
  })

  it('filled().result() - false (undefined)', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is('utm_term')
        .filled()
        .result()
    ).toBeFalsy()
  })

  it('filled().result() - false (defined)', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term')

    expect(
      utm.is('utm_term')
        .filled()
        .result()
    ).toBeFalsy()
  })

  it('filled().result() - multiple variables - true', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is(['utm_source', 'utm_medium'])
        .filled()
        .result()
    ).toBeTruthy()
  })

  it('filled().result() - multiple variables - false (one undefined)', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is(['utm_source', 'utm_term'])
        .filled()
        .result()
    ).toBeFalsy()
  })

  it('filled().result() - multiple variables - false (all undefined)', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is(['utm_term', 'utm_content'])
        .filled()
        .result()
    ).toBeFalsy()
  })

})
