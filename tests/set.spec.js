const UTMManager = require('../dist/utm-manager.min')

describe('UTMManager Test - set()', () => {

  it('set()', () => {
    const utm = new UTMManager('utm_source=source')

    utm.set()

    expect(
      utm.toString()
    ).toBe('utm_source=source')
  })

  it('set( variable, value ) - exists', () => {
    const utm = new UTMManager('utm_source=source')

    utm.set('utm_source', 'new-value')

    expect(
      utm.toString()
    ).toBe('utm_source=new-value')
  })

  it('set( variable, value ) - do not exists', () => {
    const utm = new UTMManager('utm_source=source')

    utm.set('utm_medium', 'medium')

    expect(
      utm.toString()
    ).toBe('utm_source=source')
  })

  it('set( variable, value, true ) - do not exists (with flag)', () => {
    const utm = new UTMManager('utm_source=source')

    utm.set('utm_medium', 'medium', true)

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_medium=medium')
  })

  it('set( variables, value ) - exists', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium')

    utm.set(['utm_source', 'utm_medium'], 'value')

    expect(
      utm.toString()
    ).toBe('utm_source=value&utm_medium=value')
  })

  it('set( variables, value ) - do not exists', () => {
    const utm = new UTMManager('utm_source=source')

    utm.set(['utm_source', 'utm_medium'], 'new-value')

    expect(
      utm.toString()
    ).toBe('utm_source=new-value')
  })

  it('set( variables, value, true ) - do not exists (with flag)', () => {
    const utm = new UTMManager('utm_source=source')

    utm.set(['utm_source', 'utm_medium'], 'medium', true)

    expect(
      utm.toString()
    ).toBe('utm_source=medium&utm_medium=medium')
  })

  it('set( variables, values ) - exists', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium')

    utm.set(['utm_source', 'utm_medium'],['new-source', 'new-medium'])

    expect(
      utm.toString()
    ).toBe('utm_source=new-source&utm_medium=new-medium')
  })

  it('set( variables, values ) - do not exists', () => {
    const utm = new UTMManager('utm_source=source')

    utm.set(['utm_term', 'utm_campaign'],['term', 'campaign'])

    expect(
      utm.toString()
    ).toBe('utm_source=source')
  })

  it('set( variables, values, true ) - do not exists (with flag)', () => {
    const utm = new UTMManager('utm_source=source')

    utm.set(['utm_term', 'utm_campaign'],['term', 'campaign'], true)

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_term=term&utm_campaign=campaign')
  })

})
