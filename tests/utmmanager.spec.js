const UTMManager = require('../dist/utm-manager.min')

describe('UTMManager Test - UTMManager()', () => {

  it('UTMManager() - valid string', () => {
    var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value'
    var result = 'utm_source=source&utm_medium=medium&utm_campaign=campaign'
    const utm = new UTMManager(string)

    expect(
      utm.toString()
    ).toBe(result)
  })

  it('UTMManager() - valid string (extended)', () => {
    var string = 'utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value'
    const utm = new UTMManager( string, ['variable'])

    expect(
      utm.toString()
    ).toBe(string)
  })

  it('UTMManager() - invalid string', () => {
    var string = 'some-stuff'
    const utm = new UTMManager(string)

    expect(
      utm.toString()
    ).toBe('')
  })

  it('UTMManager() - valid url - with variables', () => {
    var string = 'https://domain.com/?utm_term=term&utm_medium=medium&utm_campaign=campaign&utm_content=content&utm_source=source'
    var result = 'utm_term=term&utm_medium=medium&utm_campaign=campaign&utm_content=content&utm_source=source'
    const utm = new UTMManager(string)

    expect(
      utm.toString()
    ).toBe(result)
  })

  it('UTMManager() - valid url - with variables and hash (#)', () => {
    var string = 'https://domain.com/?utm_term=term&utm_medium=medium&utm_campaign=campaign&utm_content=content&utm_source=source#hey-there-is-a-hash'
    var result = 'utm_term=term&utm_medium=medium&utm_campaign=campaign&utm_content=content&utm_source=source'
    const utm = new UTMManager(string)

    expect(
      utm.toString()
    ).toBe(result)
  })

  it('UTMManager() - valid url - without variables', () => {
    var string = 'https://domain.com/'
    const utm = new UTMManager(string)

    expect(
      utm.toString()
    ).toBe('')
  })

  it('UTMManager() - valid url - without variables and with hash (#)', () => {
    var string = 'https://domain.com/#we-all-love-coffee'
    const utm = new UTMManager(string)

    expect(
      utm.toString()
    ).toBe('')
  })

  it('UTMManager() - json variables (only utm)', () => {
    const utm = new UTMManager({
    'utm_source': 'source',
    'utm_medium': 'medium',
    'utm_campaign': 'campaign'
    })

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_medium=medium&utm_campaign=campaign')
  })

  it('UTMManager() - json variables (extract only utm)', () => {
    const utm = new UTMManager({
    'utm_source': 'source',
    'utm_medium': 'medium',
    'utm_campaign': 'campaign',
    'random_variable': 'random'
    })

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_medium=medium&utm_campaign=campaign')
  })

  it('UTMManager() - json variables (extract utm and some variable)', () => {
    const utm = new UTMManager({
    'utm_source': 'source',
    'utm_medium': 'medium',
    'utm_campaign': 'campaign',
    'random_variable': 'random',
    'another_variable': 'another'
    }, ['another_variable'])

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_medium=medium&utm_campaign=campaign&another_variable=another')
  })

  it('UTMManager() - json variables (extract all variables)', () => {
    const utm = new UTMManager({
    'utm_source': 'source',
    'utm_medium': 'medium',
    'utm_campaign': 'campaign',
    'random_variable': 'random',
    'another_variable': 'another'
    }, 'all')

    expect(
      utm.toString()
    ).toBe('utm_source=source&utm_medium=medium&utm_campaign=campaign&random_variable=random&another_variable=another')
  })

})
