UTMManager.extend({

  /**
  * Executes the given function passing this as parameter
  *
  * @since 1.0.0
  *
  * @param {Function} fn Function to be executed
  *
  * @returns {UTMManager} Return an UTMManager object (this)
  */
  always: function(fn) {
    if(typeof fn === 'function') {
      fn(this)
    }
    return this
  },



  /**
  * Executes the given function passing this as parameter when the result of is() is false
  *
  * @since 1.0.0
  *
  * @param {Function} fn Function to be executed
  *
  * @returns {UTMManager} Return an UTMManager object (this)
  */
  otherwise: function(fn) {
    if(this.booleanResult == false && typeof fn === 'function') {
      fn(this)
    }
    return this
  },



  /**
  * Executes the given function passing this as parameter when the result of is() is true
  *
  * @since 1.0.0
  *
  * @param {Function} fn Function to be executed
  *
  * @returns {UTMManager} Return an UTMManager object (this)
  */
  then: function(fn) {
    if(this.booleanResult && typeof fn === 'function') {
      fn(this)
    }
    return this
  }

})
