const UTMManager = require('../dist/utm-manager.min')

describe('UTMManager Test - add()', () => {

  it('add()', () => {
    const utm = new UTMManager('utm_source=source')

    utm.add()

    expect(
      utm.toString()
    ).toBe('utm_source=source')
  })

  it('add(variable, value) - exists', () => {
    const utm = new UTMManager('utm_source=source')

    utm.add('utm_source', 'new-value')

    expect(
      utm.toString()
    ).toBe('utm_source=source')
  })

  it('add(variable, value) - do not exists', () => {
    const utm = new UTMManager('utm_source=source')

    utm.add('utm_medium', 'medium')

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_medium=medium')
  })

  it('add(variables, value) - exists', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium')

    utm.add(['utm_source', 'utm_medium'], 'value')

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_medium=medium')
  })

  it('add(variables, value) - do not exists', () => {
    const utm = new UTMManager('utm_source=source')

    utm.add(['utm_source', 'utm_medium'], 'new-value')

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_medium=new-value')
  })

  it('add(variables, values) - exists', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium')

    utm.add(['utm_source', 'utm_medium'], ['new-source', 'new-medium'])

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_medium=medium')
  })

  it('add(variables, values) - do not exists', () => {
    const utm = new UTMManager('utm_source=source')

    utm.add(['utm_term', 'utm_campaign'], ['term', 'campaign'])

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_term=term&utm_campaign=campaign')
  })

})
