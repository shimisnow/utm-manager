const UTMManager = require('../dist/utm-manager.min')

describe('UTMManager Test - is().equals()', () => {

  it('equals() - one value - true', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is('utm_source')
        .equals('source')
        .result()
    ).toBeTruthy()
  })

  it('equals() - one value - false', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is('utm_source')
        .equals('medium')
        .result()
    ).toBeFalsy()
  })

  it('equals() - one value - undefined', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is('utm_term')
        .equals('term')
        .result()
    ).toBeFalsy()
  })

  it('equals() - multiple values - true [0]', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is('utm_source')
        .equals(['source', 'source-2'])
        .result()
    ).toBeTruthy()
  })

  it('equals() - multiple values - true [1]', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is('utm_source')
        .equals(['source-2', 'source'])
        .result()
    ).toBeTruthy()
  })

  it('equals() - multiple values - false', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is('utm_source')
        .equals(['source-1', 'source-2'])
        .result()
    ).toBeFalsy()
  })

  it('equals() - multiple variables - true', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is(['utm_source', 'utm_medium'])
        .equals(['source', 'medium'])
        .result()
    ).toBeTruthy()
  })

  it('equals() - multiple variables - false [0]', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is(['utm_source', 'utm_medium'])
        .equals(['source-2', 'medium'])
        .result()
    ).toBeFalsy()
  })

  it('equals() - multiple variables - false [1]', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.is(['utm_source', 'utm_medium'])
        .equals(['source', 'medium-2'])
        .result()
    ).toBeFalsy()
  })

  it('equals() - single - true', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    var result = null
    utm.is('utm_source')
      .equals('source')
      .then(() => {
        result = true
      })
      .otherwise(() => {
        result = false
      })

    expect(result).toBeTruthy()
  })

  it('equals() - single - false', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    var result = null
    utm.is('utm_term')
      .equals('term')
      .then(() => {
        result = true
      })
      .otherwise(() => {
        result = false
      })

    expect(result).toBeFalsy()
  })

  it('equals() - multiple - true [0]', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    var result = null
    utm.is('utm_source')
      .equals('source').then(() => {
        result = 1
      })
      .equals('source-2').then(() => {
        result = 2
      })

    expect(result).toBe(1)
  })

  it('equals() - multiple - true [1]', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    var result = null
    utm.is('utm_source')
      .equals('source-2').then(() => {
        result = 1
      })
      .equals('source').then(() => {
        result = 2
      })

    expect(result).toBe(2)
  })

  it('equals() - multiple - false', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    var result = 0
    utm.is('utm_source')
      .equals('source-1').then(() => {
        result = 1
      })
      .equals('source-2').then(() => {
        result = 2
      })
    expect(result).toBe(0)
  })

  it('equals() - multiple - false (otherwise)', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    var result = 0
    utm.is('utm_source')
      .equals('source-1').then(() => {
        result = 1
      })
      .equals('source-2').then(() => {
        result = 2
      })
      .otherwise(() => {
        result = 3
      })

    expect(result).toBe(3)
  })

})
