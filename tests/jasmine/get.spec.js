const UTMManager = require('../../dist/utm-manager.min')

describe('UTMManager Test - get()', () => {

  it('get() - empty', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.get()
    ).toEqual(['source', 'medium', 'campaign'])
  })

  it('get() - one variable', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.get('utm_medium')
    ).toEqual('medium')
  })

  it('get() - one variable that do not exists', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.get('utm_term')
    ).toBeUndefined()
  })

  it('get() - multiple variables', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.get(['utm_source', 'utm_medium']))
    .toEqual(['source', 'medium'])
  })

  it('get() - multiple variables with one that do not exists', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.get(['utm_source', 'utm_term']))
    .toEqual(['source', undefined])
  })

  it('get() - empty array', () => {
    const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign')

    expect(
      utm.get([])
    ).toEqual([])
  })

})
