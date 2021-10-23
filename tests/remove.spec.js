const UTMManager = require('../dist/utm-manager.min')

describe('UTMManager Test - remove()', () => {

  it('remove()', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    utm.remove()

    expect(
      utm.toString()
    ).toBe('')
  })

  it('remove( variable )', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    utm.remove('utm_medium')

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_campaign=campaign')
  })

  it('remove( filter )', () => {
    const utm = new UTMManager('utm_source=value&utm_medium=medium&utm_campaign=value')

    utm.remove((variable, value) => value == 'value')

    expect(
      utm.toString()
    ).toBe('utm_medium=medium')
  })

  it('remove( variable, filter ) - true', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    utm.remove('utm_medium', (variable, value) => value == 'medium')

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_campaign=campaign')
  })

  it('remove( variable, filter ) - false', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    utm.remove('utm_campaign', (variable, value) => value == 'campaign-02')

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_medium=medium&utm_campaign=campaign')
  })

  it('remove( variables )', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    utm.remove(['utm_medium', 'utm_campaign'])

    expect(
      utm.toString()
    ).toBe('utm_source=source')
  })

  it('remove( variables, filter )', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    utm.remove(['utm_source', 'utm_medium'], (variable, value) => value == 'source')

    expect(
      utm.toString()
    ).toBe('utm_medium=medium&utm_campaign=campaign')
  })

})
