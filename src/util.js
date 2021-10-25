UTMManager.extend({

  /**
  * Given the result of the last is() performed
  *
  * @since 1.0.0
  *
  * @returns {boolean} Return result of the last is() performed
  */
  result: function() {
    return this.booleanResult
  },



  sort: function(order) {

    if(typeof order === 'undefined') {
      order = this.config.sort
    }

    if(typeof order === 'string') {

      let i = 0
      let tmp = {}
      let keys = []
      let strict = []
      let extended = []

      switch(order) {
      case 'lexical':

        keys = Object.keys(this.variables).sort()

        for(i = 0; i < keys.length; i++) {
          tmp[keys[i]] = this.variables[keys[i]]
        }

        this.variables = tmp

        break
      case 'strict':
      case 'strict-lexical':
      default:

        strict = this.config.strict

        extended = Object.keys(this.variables).filter(function(value) {
          return (strict.indexOf(value) < 0)
        })

        for(i = 0; i < strict.length; i++) {
          if(typeof this.variables[strict[i]] !== 'undefined') {
            tmp[strict[i]] = this.variables[strict[i]]
          }
        }

        if(order == 'strict-lexical') {
          extended = extended.sort()
        }

        for(i = 0; i < extended.length; i++) {
          tmp[extended[i]] = this.variables[extended[i]]
        }

        this.variables = tmp

        break
      }
    }

    // necessário fazer para quando o parâmetro for array

    return this
  }

})
