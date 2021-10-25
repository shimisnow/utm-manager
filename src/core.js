(function(global, factory) {
  if(typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory()
    console.log('export')
    console.log(module.exports)
  } else if(typeof define === 'function' && define.amd) {
    define(factory)
    console.log('define')
  } else {
    global.UTMManager = factory()
    console.log('browser')
  }
})(this, function(){

  function UTMManager(utm, extended) {

    this.version = '2.0.0'

    this.config = {
      variables: [
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content'
      ],
      sort: 'strict',
      strict: [
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content'
      ],
      tostring: {
        glue: '&',
        undefined: false
      }
    }

    // stores all parsed variables
    this.variables = {}

    // stores the result of an operation with is()
    this.booleanResult = false

    // stores information about is() and() e or()
    this.runtime = {
      // stores the value passed in is()
      // this can be a string or an array
      is: null,
      // stores if the function and() was used
      // this can be null or true
      and: null,
      // stores if the function or() was used
      // this can be null or true
      or: null
    }

    if(typeof utm === 'undefined') {
      throw new Error('The utm parameter must be provided')
    }

    if(typeof utm === 'object') {

      // expects a JSON object and transforms it in a string
      // the transformation follows:
      // JSON.stringify( utm );
      // result = {"utm_source":"source","utm_medium":"medium"}
      // .replace( /"|{|}/g, '' );
      // result = utm_source:source,utm_medium:medium
      // .replace( /:/g, '=' )
      // result = utm_source=source,utm_medium=medium
      // .replace( /,/g, '&' )
      // result = utm_source=source&utm_medium=medium

      let string = JSON.stringify(utm).replace(/"|{|}/g, '').replace(/:/g, '=').replace(/,/g, '&')

      this.parse(string, extended)
    } else {
      this.parse(utm, extended)
    }

  }



  UTMManager.extend = UTMManager.prototype.extend = function(options) {

    if(typeof options !== "object") {
      throw new Error('The options parameter must be an object')

    } else {
      const keys = Object.keys(options)

      for(let i = 0; i < keys.length; i++) {
        if(typeof options[keys[i]] === 'function') {
          UTMManager.prototype[keys[i]] = options[keys[i]]
        } else {
          console.warn(`UTMManager: the key '${keys[i]}' cannot be use to extend the library. The key does not provide a function.`)
        }
      }
    }
  }



  /**
  * Parses a string with URL formatted variables or an URL to extract only the ones related with utm. If a set of variables is informed in the extended parameter, the will be extracted too.
  * Ex: utm_source=source&utm_medium=medium ...
  * Ex: https://domain.com/?utm_source=source&utm_medium=medium ...
  *
  * @since 1.0.0
  *
  * @param {String} variables URL formatted variables OR an URL
  * @param {Array} extended (Optional) An array with variables to be extracted from the given string that is not a default utm variable
  *
  * @returns {UTMManager} Return an UTMManager object (this)
  */
  UTMManager.prototype.parse = function(variables, extended) {

    if(typeof variables !== 'undefined') {

      let parts = decodeURIComponent(variables).split('?')

      if(parts.length == 2) {
        // split by hash symbol to get ONLY the real variables part
        variables = parts[1].split('#')[0]
      }

      variables = variables.split('&')

      // stores the variable name and value splited by =
      let pair = []

      // valid variables defined in config
      let valid = {}

      // it is only to process the given string
      if(typeof extended === 'undefined') {

        // valid variables defined in config
        // it can be only utm variables (default) or something else if config() was used
        valid = this.config.variables

        for(let i = 0; i < variables.length; i++) {
          pair = variables[i].split('=')
          if(valid.indexOf(pair[0]) >= 0) {
            this.variables[pair[0]] = pair[1]
          }
        }

      // some configuration was passed
      } else {

        // tells the algorithm to extract all variables from the string
        if(typeof extended === 'string' && extended == 'all') {
          for(let i = 0; i < variables.length; i++) {
            pair = variables[i].split('=')
            this.variables[pair[0]] = pair[1]
          }

        // tells the algorithm to extract only some variables from the string
        } else if(Array.isArray(extended)) {

          valid = this.config.variables.concat(extended)

          for(let i = 0; i < variables.length; i++) {
            pair = variables[i].split('=')
            if(valid.indexOf(pair[0]) >= 0) {
              this.variables[pair[0]] = pair[1]
            }
          }
        }
      }
    }

    return this
  }

  return UTMManager
})

if(typeof exports === 'object' && typeof module !== 'undefined') {
  UTMManager = module.exports
}
