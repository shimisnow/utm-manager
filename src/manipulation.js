UTMManager.extend({

  /**
  * Add a variable. Do not update if it exists
  *
  * @since 1.1.0
  *
  * @param {String} variables Variable(s) to be create
  * @param {String} values Value(s) to be used
  *
  * @returns {UTMManager} Return an UTMManager object (this)
  */
  add: function(variables, values) {

    // do not accept undefined parameters
    if(typeof variables !== 'undefined' && typeof values !== 'undefined') {

      // only one variable
      if(typeof variables === 'string') {

        // only one value
        // do not accept multiple values because this do not make sense
        if(typeof values === 'string') {

          // if the variables do not exists, create
          if(typeof this.variables[variables] === 'undefined') {
            this.variables[variables] = values
          }
        }

      // multiple variables
      } else if(Array.isArray(variables)) {

        // one value
        // in this case all informed variables, if do no exists, will be create with the same value
        if(typeof values === 'string') {

          for(let i = 0; i < variables.length; i++) {
            if(typeof this.variables[variables[i]] === 'undefined') {
              this.variables[variables[i]] = values
            }
          }

        // multiple variables and multiple values
        } else if(Array.isArray(values)) {

          // each position of variables array will be mapped with the same position in the values array
          if(variables.length == values.length) {

            for(let i = 0; i < variables.length; i++) {
              if(typeof this.variables[variables[i]] === 'undefined') {
                this.variables[variables[i]] = values[i]
              }
            }
          }
        }
      }
    }

    return this
  },



  /**
  * Get the value of a variable(s)
  *
  * @since 1.0.0
  *
  * @param {String|Array} utm One (string) or multiple (array) utm variables. If empty all variables will be returned.
  *
  * @returns {String|Array} Single value (string) or mutiple values (array). If a variable do not exists, the value undefined will be returned for one variable and, if a set of variables was requested, the position of the array for the variable will be undefined.
  */
  get: function(utm) {

    let result = ''

    switch(typeof utm) {
    case 'string' :
      // only one result (string)
      result = this.variables[utm]
      break
    case 'undefined' :
      // return all variables in an array
      result = this.get(Object.keys(this.variables))
      break
    default :
      // return only the asked variables in an array
      if(Array.isArray(utm)) {
        result = []
        for(let i = 0; i < utm.length; i++) {
          result.push(this.variables[utm[i]])
        }
      }
      break
    }
    return result
  },



  /**
  * Returns the variables and values in string format
  *
  * @since 1.0.0
  *
  * @param {JSON} options A JSON object with three optional keys
  * @param {String|Array} options.utm Single (string) or multple (array) utm variables to be concated
  * @param {String} options.glue Separator for the utm variables
  * @param {boolean} options.undefined True to concat a utm varible even if it is undefined
  *
  * @returns {String} The result of the concat process
  */
  toString: function(options) {

    let result= ''

    if(typeof options === 'undefined') {
      options = {}
    }

    // used in join()
    if(typeof options.glue === 'undefined') {
      options.glue = this.config.tostring.glue
    }

    // if it is to display utm_variables that is not defined or empty
    if(typeof options.undefined === 'undefined') {
      options.undefined = this.config.tostring.undefined
    }

    // concat all the defined utm variables
    if(typeof options.utm === 'undefined') {

      result = []
      let utm = Object.keys(this.variables)

      for(let i = 0; i < utm.length; i++) {
        result.push(utm[i] + '=' + this.variables[utm[i]])
      }

      result = result.join(options.glue)

    } else {

      // only one utm variable
      if(typeof options.utm === 'string') {

        if(typeof this.variables[options.utm] !== 'undefined') {

          result = options.utm + '=' + this.variables[options.utm]

        // if the undefined flag is set to true, concat the variable even if it is undefined
        } else {
          if(options.undefined) {
            result = options.utm + '='
          }
        }

      // multiple utm variables
      } else if(Array.isArray(options.utm)) {

        result = []

        for(let i = 0; i < options.utm.length; i++) {

          if(typeof this.variables[options.utm[i]] !== 'undefined') {

            result.push(options.utm[i] + '=' + this.variables[options.utm[i]])

          // if the undefined flag is set to true, concat the variable even if it is undefined
          } else {
            if(options.undefined) {
              result.push(options.utm[i] + '=')
            }
          }
        }

        result = result.join(options.glue)
      }
    }

    return result
  },



  /**
  * Remove one or more variables. A filter can be used to remove with a condition
  *
  * @since 1.0.0
  *
  * @param {String|Array|Function} elements One (string) or multiple (array) utm variables. If left empty, all the elements will be removed. If a function is passed, this function will be executed to all variables passing the utm variable and value as parameters and the variable will be removed if the function returns true.
  * @param {Function} filter Will be executed passing the utm variable and its value as parameters and the variable will be removed if the function returns true.
  *
  * @returns {UTMManager} Return an UTMManager object (this)
  */
  remove: function(elements, filter) {

    if(typeof elements !== 'undefined') {

      // only one variable
      if(typeof elements === 'string') {

        // remove without condition
        // remove( 'variable' )
        if(typeof filter === 'undefined') {
          delete this.variables[elements]

        // a filter (condition) needs to be applied
        // remove( 'variable', function( value ) { ... } )
        } else if(typeof filter === 'function') {

          if(filter(elements, this.variables[elements])) {
            delete this.variables[elements]
          }
        }

      // multiple variables
      } else if(Array.isArray(elements)) {

        // remove without condition
        // remove( [ 'variable', 'variable' ] )
        if(typeof filter === 'undefined') {
          for(let i = 0; i < elements.length; i++) {
            delete this.variables[elements[i]]
          }

        // a filter (condition) needs to be applied
        // remove( [ 'variable', 'variable' ], function( value ) { ... } )
        } else {
          for(let i = 0; i < elements.length; i++) {
            if(filter(elements[i], this.variables[elements[i]])) {
              delete this.variables[elements[i]]
            }
          }
        }

      // filter is passed as first (and only) parameter
      // remove( function( value ) { ... } )
      } else if(typeof elements == 'function') {

        // apply for all variables
        let variables = Object.keys(this.variables)

        for(let i = 0; i < variables.length; i++) {
          if(elements(variables[i], this.variables[variables[i]])) {
            delete this.variables[variables[i]]
          }
        }
      }

    // removes all elements without condition
    // remove()
    } else {
      this.variables = {}
    }

    return this
  },



  /**
  * Set the value of a variable. Create the variable if the flag create is set to true
  *
  * @since 1.0.0
  *
  * @param {String} variables Variable(s) to be updated
  * @param {String} values Value(s) to be used
  * @param {boolean} create If the variable(s) do not exists and this flag is defined, the variable(s) will be created
  *
  * @returns {UTMManager} Return an UTMManager object (this)
  */
  set: function(variables, values, create) {

    // do not accept undefined parameters
    if(typeof variables !== 'undefined' && typeof values !== 'undefined') {

      // only one variable
      if(typeof variables === 'string') {

        // only one value
        // do not accept multiple values because this do not make sense
        if(typeof values === 'string') {

          // if the variables already exists, update
          if(typeof this.variables[variables] !== 'undefined') {
            this.variables[variables] = values

          // if the variable do not exists
          } else {

            // if the flag to create the variable exists
            if(typeof create !== 'undefined') {
              this.variables[variables] = values
            }
          }
        }

      // multiple variables
      } else if(Array.isArray(variables)) {

        // one value
        // in this case all informed variables will be updated with the same value
        if(typeof values === 'string') {

          // if it is to create the variable if not exists
          if(typeof create !== 'undefined') {
            for(let i = 0; i < variables.length; i++) {
              this.variables[variables[i]] = values
            }

          // if it is to ignore the variable if not exists
          } else {
            for(let i = 0; i < variables.length; i++) {
              if(typeof this.variables[variables[i]] !== 'undefined') {
                this.variables[variables[i]] = values
              }
            }
          }

        // multiple variables and multiple values
        } else if(Array.isArray(values)) {

          // each position of variables array will be mapped with the same position in the values array
          if(variables.length == values.length) {

            // if it is to create the variable if not exists
            if(typeof create !== 'undefined') {
              for(let i = 0; i < variables.length; i++) {
                this.variables[variables[i]] = values[i]
              }

            // if it is to ignore the variable if not exists
            } else {
              for(let i = 0; i < variables.length; i++) {
                if(typeof this.variables[variables[i]] !== 'undefined') {
                  this.variables[variables[i]] = values[i]
                }
              }
            }
          }
        }
      }
    }

    return this
  }

})
