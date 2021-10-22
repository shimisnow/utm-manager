const UTMManager = require('../../dist/utm-manager.min')

describe('UTMManager Test - toString()', () => {

  /**** SIMPLE *****/

  it('toString() - one variable', () => {
    var string = 'utm_source=source'
    const utm = new UTMManager(string)

    expect(
      utm.toString()
    ).toBe(string)
  })

  it('toString() - multiple variables', () => {
    var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign'
    const utm = new UTMManager(string)

    expect(
      utm.toString()
    ).toBe(string)
  })

  it('toString() - multiple variable another order', () => {
    var string = 'utm_term=term&utm_medium=medium&utm_campaign=campaign&utm_content=content&utm_source=source'
    const utm = new UTMManager(string)

    expect(
      utm.toString()
    ).toBe(string)
  })

  /**** CONFIG UTM *****/

  it('toString() - utm - one variable (defined)', () => {
    var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign'
    const utm = new UTMManager(string)

    expect(
      utm.toString({
        utm: ['utm_source']
      })
    ).toBe('utm_source=source')
  })

  it('toString() - utm - one variable (undefined)', () => {
    var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign'
    const utm = new UTMManager(string)

    expect(
      utm.toString({
        utm: ['utm_term']
      })
    ).toBe('')
  })

  it('toString() - utm - multiple variables (defined)', () => {
    var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign'
    const utm = new UTMManager(string)

    expect(
      utm.toString({
        utm: ['utm_source', 'utm_campaign']
      })
    ).toBe('utm_source=source&utm_campaign=campaign')
  })

  it('toString() - utm - multiple variables (some undefined)', () => {
    var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign'
    const utm = new UTMManager(string)

    expect(
      utm.toString({
        utm: ['utm_term', 'utm_source', 'utm_campaign']
      })
    ).toBe('utm_source=source&utm_campaign=campaign')
  })

  /**** CONFIG EMPTY *****/

  it('toString() - empty - one variable (undefined)', () => {
    var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign'
    const utm = new UTMManager(string)

    expect(
      utm.toString({
        utm: ['utm_term'],
        undefined: true
      })
    ).toBe('utm_term=')
  })

  it('toString() - empty - multiple variables (some undefined)', () => {
    var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign'
    const utm = new UTMManager(string)

    expect(
      utm.toString({
        utm: ['utm_term', 'utm_source', 'utm_campaign'],
        undefined: true
      })
    ).toBe('utm_term=&utm_source=source&utm_campaign=campaign')
  })

  /**** CONFIG GLUE *****/

  it('toString() - one variable', () => {
    var string = 'utm_source=source'
    const utm = new UTMManager(string)

    expect(
      utm.toString({
        glue : '-'
      })
    ).toBe(string)
  })

  it('toString() - multiple variables', () => {
    var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign'
    var result = 'utm_source=source#utm_medium=medium#utm_campaign=campaign'
    const utm = new UTMManager(string)

    expect(
      utm.toString({
        glue: '#'
      })
    ).toBe(result)
  })

  it('toString() - multiple variable another order', () => {
    var string = 'utm_term=term&utm_medium=medium&utm_campaign=campaign&utm_content=content&utm_source=source'
    var result = 'utm_source=source<*>utm_medium=medium<*>utm_campaign=campaign<*>utm_term=term<*>utm_content=content'
    const utm = new UTMManager(string)

    expect(
      utm.toString({
        utm: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'],
        glue: '<*>'
      })
    ).toBe(result)
  })

})
