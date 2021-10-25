UTMManager.extend({

  /**
  * Enable the runtime.and flag to inform other functions that the result need to be processed with &&
  *
  * @since 1.0.0
  *
  * @param {boolean} scalar When used with a boolean parameter, the result will be operated with the value using &&
  *
  * @returns {UTMManager} Return an UTMManager object (this)
  */
  and: function(scalar) {
    if(typeof scalar === 'boolean') {
      this.booleanResult = this.booleanResult && scalar
    } else {
      this.runtime.and = true
    }
    return this
  },



  /**
  * Verify if the variable(s) informed in the function is() is defined
  *
  * @since 1.0.0
  *
  * @returns {UTMManager} Return an UTMManager object (this)
  */
  defined: function() {

    let result = true

    // runtime.is = the utm variable(s) informed as parameter in is()
    if(typeof this.runtime.is !== 'undefined') {

      // just one utm variable used in the function is()
      if(typeof this.runtime.is === 'string') {

        // verifies only one utm variable
        result = (typeof this.variables[this.runtime.is] !== 'undefined')

      // multiple utm variables used in the function is()
      } else if(Array.isArray(this.runtime.is)) {

        for(let i = 0; i < this.runtime.is.length; i++) {
          if(typeof this.variables[this.runtime.is[i]] === 'undefined') {
            result = false
            i = this.runtime.is.length
          }
        }
      }
    } else {
      result = false
    }

    // if and() was used
    if(this.runtime.and !== null) {
      result = (result && this.booleanResult)

    // if or() was used
    } else if(this.runtime.or !== null) {
      result = (result || this.booleanResult)
    }

    // clear the state of and() and or()
    this.runtime.and = this.runtime.or = null

    this.booleanResult = result

    return this
  },



  /**
  * Verify if the variable(s) informed in the function is() is empty
  * An undefined variable is also empty
  *
  * @since 1.0.0
  *
  * @returns {UTMManager} Return an UTMManager object (this)
  */
  empty: function() {

    let result = true

    // runtime.is = the utm variable(s) informed as parameter in is()
    if(typeof this.runtime.is !== 'undefined') {

      // just one utm variable used in the function is()
      if(typeof this.runtime.is === 'string') {

        // verifies only one utm variable
        if(typeof this.variables[this.runtime.is] !== 'undefined') {

          result = (this.variables[this.runtime.is] == '')
        }

      // multiple utm variables used in the function is()
      } else if(Array.isArray(this.runtime.is)) {

        for(let i = 0; i < this.runtime.is.length; i++) {
          if(typeof this.variables[this.runtime.is[i]] !== 'undefined') {
            if(this.variables[this.runtime.is[i]] != '') {
              result = false
              i = this.runtime.is.length
            }
          }
        }
      }
    }

    // if and() was used
    if(this.runtime.and !== null) {
      result = (result && this.booleanResult)

    // if or() was used
    } else if(this.runtime.or !== null) {
      result = (result || this.booleanResult)
    }

    // clear the state of and() and or()
    this.runtime.and = this.runtime.or = null

    this.booleanResult = result

    return this
  },



  /**
  * Verifies if one or more utm variables is equals the given value(s)
  *
  * @since 1.0.0
  *
  * @param {String|Array} utm One (string) or multiple (array) utm variables
  *
  * @returns {UTMManager} Return an UTMManager object (this)
  */
  equals: function(utm) {

    let result = false

    // runtime.is = the utm variable(s) informed as parameter in is()
    if(typeof this.runtime.is !== 'undefined' && typeof utm !== 'undefined') {

      // just one utm variable used in the function is()
      if(typeof this.runtime.is === 'string') {

        // compare one utm variable with one value
        if(typeof utm === 'string') {
          if(this.variables[this.runtime.is] == utm) {
            result = true
          }

        // compare one utm variable with multiple values
        // in this case the result will be true if the utm variable is eauals any of the values
        } else if(Array.isArray(utm)) {
          for(let i = 0; i < utm.length; i++) {
            if(this.variables[this.runtime.is] == utm[i]) {
              result = true
              i = utm.length
            }
          }
        }

      // multiple utm variables used in the function is()
      } else if(Array.isArray(this.runtime.is)) {

        // compare multiple utm variables with one value
        // in this case the result will be true if all utm variables are equals the value
        if(typeof utm === 'string') {
          result = true
          for(let i = 0; i < this.runtime.is.length; i++) {
            if(this.variables[this.runtime.is[i]] != utm) {
              result = false
              i = this.runtime.is.length
            }
          }

        // compare multiple utm variables with one value to each utm variable or multiple values to one or more utm variables
        // is( [ 'utm_source', 'utm_medium' ] ).equals( [ 'source', 'medium' ] )
        // is( [ 'utm_source', 'utm_medium' ] ).equals( [ [ 'source1', 'source2'], 'medium' ] )
        // is( [ 'utm_source', 'utm_medium' ] ).equals( [ 'source', [ 'medium1', 'medium2'] ] )
        // is( [ 'utm_source', 'utm_medium' ] ).equals( [ [ 'source1', 'source2'], [ 'medium1', 'medium2'] ] )
        } else if(Array.isArray(utm)) {

          // if not, fuck, I need a cofffe!
          if(this.runtime.is.length == utm.length) {

            result = true

            // for each pair utm variable <=> value
            for(let i = 0; i < utm.length; i++) {

              // if value is an array, the result will be true if the utm variable is equal any of the values
              if(Array.isArray(utm[i])) {
                let tmp = false
                for(let j = 0; j < utm[i].length; j++) {
                  if(this.variables[this.runtime.is[i]] == utm[i][j]) {
                    tmp = true
                    j = utm[i].length
                  }
                }
                result = tmp

              // if the value is a string, the result will be true if the utm variable is equal the value
              } else {
                if(this.variables[this.runtime.is[i]] != utm[i]) {
                  result = false
                  i = utm.length
                }
              }
            }
          }
        }
      }
    }

    // if and() was used
    if(this.runtime.and !== null) {
      result = (result && this.booleanResult)

    // if or() was used
    } else if(this.runtime.or !== null) {
      result = (result || this.booleanResult)
    }

    // clear the state of and() and or()
    this.runtime.and = this.runtime.or = null

    this.booleanResult = result

    return this
  },



  /**
  * Verify if the variable(s) informed in the function is() is defined and has value
  *
  * @since 1.1.0
  *
  * @returns {UTMManager} Return an UTMManager object (this)
  */
  filled: function() {

    let result = true

    // runtime.is = the utm variable(s) informed as parameter in is()
    if(typeof this.runtime.is !== 'undefined') {

      // just one utm variable used in the function is()
      if(typeof this.runtime.is === 'string') {

        // verifies only one utm variable
        if(typeof this.variables[this.runtime.is] !== 'undefined') {

          result = (this.variables[this.runtime.is] != '')
        } else {
          result = false
        }

      // multiple utm variables used in the function is()
      } else if(Array.isArray(this.runtime.is)) {

        for(let i = 0; i < this.runtime.is.length; i++) {
          if(typeof this.variables[this.runtime.is[i]] !== 'undefined') {
            if(this.variables[this.runtime.is[i]] == '') {
              result = false
              i = this.runtime.is.length
            }
          } else {
            result = false
            i = this.runtime.is.length
          }
        }
      }
    }

    // if and() was used
    if(this.runtime.and !== null) {
      result = (result && this.booleanResult)

    // if or() was used
    } else if(this.runtime.or !== null) {
      result = (result || this.booleanResult)
    }

    // clear the state of and() and or()
    this.runtime.and = this.runtime.or = null

    this.booleanResult = result

    return this
  },



  /**
  * Defines which variable(s) will be verified by the equals() or not() function
  * This function only precedes an equals() or not() function
  * is( 'utm_source' ).equals( ...
  * is( [ 'utm_source', 'utm_medium' ] ).not( ...
  *
  * @since 1.0.0
  *
  * @param {String|Array} utm One (string) or multiple (array) utm variables
  * @returns {UTMManager} Return an UTMManager object (this)
  */
  is: function(utm) {

    if(typeof utm === 'undefined') {
      this.runtime.is = null
    } else if(typeof utm === 'string' || Array.isArray(utm)) {
      this.runtime.is = utm
    }

    return this
  },



  /**
  * Verifies if one or more utm variables is different from the given value(s)
  *
  * @since 1.0.0
  *
  * @param {String|Array} utm One (string) or multiple (array) utm variables
  *
  * @returns {UTMManager} Return an UTMManager object (this)
  */
  not: function(utm) {

    let result = false

    // runtime.is = the utm variable(s) informed as parameter in is()
    if(typeof this.runtime.is !== 'undefined' && typeof utm !== 'undefined') {

      // just one utm variable used in the function is()
      if(typeof this.runtime.is === 'string') {

        // compare one utm variable with one value
        if(typeof utm === 'string') {
          if(this.variables[this.runtime.is] != utm) {
            result = true
          }

        // compare one utm variable with multiple values
        // in this case the result will be false if the utm variable is eauals any of the values
        } else if(Array.isArray(utm)) {
          result = true
          for(let i = 0; i < utm.length; i++) {
            if(this.variables[this.runtime.is] == utm[i]) {
              result = false
              i = utm.length
            }
          }
        }

      // multiple utm variables used in the function is()
      } else if(Array.isArray(this.runtime.is)) {

        // compare multiple utm variables with one value
        if(typeof utm === 'string') {
          result = true
          for(let i = 0; i < this.runtime.is.length; i++) {
            if(this.variables[this.runtime.is[i]] == utm) {
              result = false
              i = this.runtime.is.length
            }
          }

        // compare multiple utm variables with one value to each utm variable or multiple values to one or more utm variables
        // is( [ 'utm_source', 'utm_medium' ] ).not( [ 'source', 'medium' ] )
        // is( [ 'utm_source', 'utm_medium' ] ).not( [ [ 'source1', 'source2'], 'medium' ] )
        // is( [ 'utm_source', 'utm_medium' ] ).not( [ 'source', [ 'medium1', 'medium2'] ] )
        // is( [ 'utm_source', 'utm_medium' ] ).not( [ [ 'source1', 'source2'], [ 'medium1', 'medium2'] ] )
        } else if(Array.isArray(utm)) {

          // if not, fuck, I need a cofffe!
          if(this.runtime.is.length == utm.length) {

            result = true

            // for each pair utm variable <=> value
            for(let i = 0; i < utm.length; i++) {

              // if value is an array, the result will be false if the utm variable is equal any of the values
              if(Array.isArray(utm[i])) {
                let tmp = true
                for(let j = 0; j < utm[i].length; j++) {
                  if(this.variables[this.runtime.is[i]] == utm[i][j]) {
                    tmp = false
                    j = utm[i].length
                  }
                }
                result = tmp

              // if the value is a string, the result will be false if the utm variable is equal the value
              } else {
                if(this.variables[this.runtime.is[i]] == utm[i]) {
                  result = false
                  i = utm.length
                }
              }
            }
          }
        }
      }
    }

    // if and() was used
    if(this.runtime.and !== null) {
      result = (result && this.booleanResult)

    // if or() was used
    } else if(this.runtime.or !== null) {
      result = (result || this.booleanResult)
    }

    // clear the state of and() and or()
    this.runtime.and = this.runtime.or = null

    this.booleanResult = result

    return this
  },



  /**
  * Enable the runtime.or flag to inform other functions that the result need to be processed with ||
  *
  * @since 1.0.0
  *
  * @param {boolean} scalar When used with a boolean parameter, the result will be operated with the value using ||
  *
  * @returns {UTMManager} Return an UTMManager object (this)
  */
  or: function(scalar) {
    if(typeof scalar === 'boolean') {
      this.booleanResult = this.booleanResult || scalar
    } else {
      this.runtime.or = true
    }
    return this
  },



  /**
  * Verify if the variable(s) informed in the function is() is undefined
  *
  * @since 1.0.0
  *
  * @returns {UTMManager} Return an UTMManager object (this)
  */
  undefined: function() {

    let result = true

    // runtime.is = the utm variable(s) informed as parameter in is()
    if(typeof this.runtime.is !== 'undefined') {

      // just one utm variable used in the function is()
      if(typeof this.runtime.is === 'string') {

        // verifies only one utm variable
        result = (typeof this.variables[this.runtime.is] === 'undefined')

      // multiple utm variables used in the function is()
      } else if(Array.isArray(this.runtime.is)) {

        for(let i = 0; i < this.runtime.is.length; i++) {
          if(typeof this.variables[this.runtime.is[i]] !== 'undefined') {
            result = false
            i = this.runtime.is.length
          }
        }
      }
    }

    // if and() was used
    if(this.runtime.and !== null) {
      result = (result && this.booleanResult)

    // if or() was used
    } else if(this.runtime.or !== null) {
      result = (result || this.booleanResult)
    }

    // clear the state of and() and or()
    this.runtime.and = this.runtime.or = null

    this.booleanResult = result

    return this
  }

})
