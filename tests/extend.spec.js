const UTMManager = require('../dist/utm-manager.min')

describe('UTMManager Test - extend()', () => {

  it('extend() - one function', () => {

    UTMManager.extend({
      print: (value) => {
        return value
      }
    })

    const utm = new UTMManager('utm_source=source')

    const result = utm.print('extend-test')

    expect(
      result
    ).toBe('extend-test')
  })

  it('extend() - multiple functions', () => {

    UTMManager.extend({
      print: (value) => {
        return value
      },
      printAgain: (value) => {
        return value + '-1'
      },
    })

    const utm = new UTMManager('utm_source=source')

    const result = utm.printAgain('extend-test')

    expect(
      result
    ).toBe('extend-test-1')
  })

  it('extend() - error', () => {

    expect(() => {
      UTMManager.extend({
        print: 'value'
      })
    }).toThrow(
      new Error("UTMManager: the key 'print' cannot be use to extend the library. The key does not provide a function.")
    )
  })

})
