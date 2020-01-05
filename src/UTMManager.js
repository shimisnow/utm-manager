var UTMManager = ( function() {

  var Kernel = function( utm, isURL ) {

		this.version = '0.0.1';

    this.variables = {};

    this.booleanResult = false;

    this.runtime = {
      is  : null,
      and : null,
      or  : null
    }

    // if it is undefined, the value {} will be used
    if( typeof utm !== 'undefined' ) {
      if( typeof utm === 'string' ) {
        if( typeof isURL === 'undefined' ) {
          // parses a string like utm_source=source&utm_medium=medium ...
          this.parse( utm );
        } else {
          if( isURL ) {
            // parses a string like https://domain.com/?utm_source=source&utm_medium=medium ...
            this.parseURL( utm );
          } else {
            // parses a string like utm_source=source&utm_medium=medium ...
            this.parse( utm );
          }
        }
      } else {
        //expect utm to be a json object
        this.variables = utm;
      }
    } else {
      this.parseURL( window.location.href );
    }

		return this;
	};

  /**
   * Parses a set of URL formatted variables to extract only the ones related with utm
   * Ex: variable=value&utm_source=source&utm_medium=medium
   *
   * @since 1.0.0
   *
   * @param {String} variables URL formatted variables
   * @param {Array} extended (Optional) An array with variables to be extracted from the given string that is not a default utm varible
   *
   * @returns {UTMManager}
   */
  Kernel.prototype.parse = function( variables, extended ) {

    // valid variables to utm
    var valid = [ 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content' ];

    if( typeof extended !== 'undefined' && Array.isArray( extended ) ) {
      valid = valid.concat( extended );
    }

    if( typeof variables !== 'undefined' ) {
      variables = variables.split( '&' );
      for( i = 0; i < variables.length; i++ ) {
        var pair = variables[ i ].split( '=' );
        //verifies if variable name is a utm variable
        if( valid.indexOf( pair[ 0 ] ) >= 0 ) {
          this.variables[ pair[ 0 ] ] = pair[ 1 ];
        }
      }
    }

    return this;
  }

  /**
   * Parses a URL to extract only utm variables
   * Ex: https://domain.com/?variable=value&utm_source=source&utm_medium=medium
   *
   * @since 1.0.0
   *
   * @param {String|Array} url An URL to be parsed or a array when only extended is used
   * @param {Array} extended (Optional) An array with variables to be extracted from the given URL that is not a default utm varible
   *
   * @returns {UTMManager} Return an UTMManager object (this)
   */
  Kernel.prototype.parseURL = function( url, extended ) {

    // if used parseURL() process the page URL
    if( typeof url === 'undefined' ) {
      url = window.location.href;
    } else {

      // if url is an array, was used parseURL( extended )
      if( Array.isArray( url ) ) {
        extended = url;
        url = window.location.href;
      }
    }

    // it decodes the url to get a clean string
    // get only the variables part from the url
    var parts = decodeURIComponent( url ).split( '?' );
    if( parts.length == 2 ) {
      // split by hash symbol to get ONLY the real variables part
      var variables = parts[ 1 ].split( '#' )[ 0 ];
      // parses a string like variable=value&utm_source=source ...
      this.parse( variables, extended );
    }

    return this;
  }

  /**
   *
   *
   * @since 1.0.0
   *
   * @returns {UTMManager} Return an UTMManager object (this)
   */
  Kernel.prototype.defined = function() {

    var result = true;

    // runtime.is = the utm variable(s) informed as parameter in is()
    if( typeof this.runtime.is !== 'undefined' ) {

      // just one utm variable used in the function is()
      if( typeof this.runtime.is === 'string' ) {

        // verifies only one utm variable
        result = ( typeof this.variables[ this.runtime.is ] !== 'undefined' );

      // multiple utm variables used in the function is()
      } else if( Array.isArray( this.runtime.is ) ) {

        for( i = 0; i < this.runtime.is.length; i++ ) {
          if( typeof this.variables[ this.runtime.is[ i ] ] === 'undefined' ) {
            result = false;
            i = this.runtime.is.length;
          }
        }
      }
    } else {
      result = false;
    }

    // if and() was used
    if( this.runtime.and !== null ) {
      result = ( result && this.booleanResult );

    // if or() was used
    } else if( this.runtime.or !== null ) {
      result = ( result || this.booleanResult );
    }

    // clear the state of and() and or()
    this.runtime.and = this.runtime.or = null;

    this.booleanResult = result;

    return this;
  }

  /**
   *
   *
   * @since 1.0.0
   *
   * @returns {UTMManager} Return an UTMManager object (this)
   */
  Kernel.prototype.undefined = function() {

    var result = true;

    // runtime.is = the utm variable(s) informed as parameter in is()
    if( typeof this.runtime.is !== 'undefined' ) {

      // just one utm variable used in the function is()
      if( typeof this.runtime.is === 'string' ) {

        // verifies only one utm variable
        result = ( typeof this.variables[ this.runtime.is ] === 'undefined' );

      // multiple utm variables used in the function is()
      } else if( Array.isArray( this.runtime.is ) ) {

        for( i = 0; i < this.runtime.is.length; i++ ) {
          if( typeof this.variables[ this.runtime.is[ i ] ] !== 'undefined' ) {
            result = false;
            i = this.runtime.is.length;
          }
        }

        result = result;
      }
    }

    // if and() was used
    if( this.runtime.and !== null ) {
      result = ( result && this.booleanResult );

    // if or() was used
    } else if( this.runtime.or !== null ) {
      result = ( result || this.booleanResult );
    }

    // clear the state of and() and or()
    this.runtime.and = this.runtime.or = null;

    this.booleanResult = result;

    return this;
  }

  /**
   *
   *
   * @since 1.0.0
   *
   * @returns {UTMManager} Return an UTMManager object (this)
   */
  Kernel.prototype.empty = function() {

    var result = true;

    // runtime.is = the utm variable(s) informed as parameter in is()
    if( typeof this.runtime.is !== 'undefined' ) {

      // just one utm variable used in the function is()
      if( typeof this.runtime.is === 'string' ) {

        // verifies only one utm variable
        if( typeof this.variables[ this.runtime.is ] !== 'undefined' ) {

            result = ( this.variables[ this.runtime.is ] == '' );
        }

      // multiple utm variables used in the function is()
      } else if( Array.isArray( this.runtime.is ) ) {

        for( i = 0; i < this.runtime.is.length; i++ ) {
          if( typeof this.variables[ this.runtime.is[ i ] ] !== 'undefined' ) {
            if( this.variables[ this.runtime.is[ i ] ] != '' ) {
              result = false;
              i = this.runtime.is.length;
            }
          }
        }
      }
    }

    // if and() was used
    if( this.runtime.and !== null ) {
      result = ( result && this.booleanResult );

    // if or() was used
    } else if( this.runtime.or !== null ) {
      result = ( result || this.booleanResult );
    }

    // clear the state of and() and or()
    this.runtime.and = this.runtime.or = null;

    this.booleanResult = result;

    return this;
  }

  /**
   * Verifies if the give utm variable(s) is defined
   *
   * @since 1.0.0
   *
   * @param {String|Array} utm One (string) or multiple (array) utm variables
   *
   * @returns {String|Array} Single value or mutiple values
   */
  Kernel.prototype.get = function( utm ) {

    var result = '';

    switch( typeof utm ) {
    case 'string' :
      // only on result (string)
      result = this.variables[ utm ];
    break;
    case 'undefined' :
      // return all the variables in an array
      result = this.get( Object.keys( this.variables ) );
    break;
    default :
      // return only the asked variables in an array
      if( Array.isArray( utm ) ) {
        result = [];
        for( i = 0; i < utm.length; i++ ) {
          result.push( this.variables[ utm[ i ] ] );
        }
      }
    break;
    }
    return result;
  }

  /**
   * Set the value of a variable. Create the variable if the flag create is set to true
   *
   * @since 1.0.0
   *
   * @param {String} variables Variable(s) to be updated
   * @param {String} values Value(s) to be used
   * @param {boolean} create If the variable(s) do no exists and this flag is defined, the variable(s) will be created
   *
   * @returns {UTMManager} Return an UTMManager object (this)
   */
  Kernel.prototype.set = function( variables, values, create ) {

    // do not accept undefined parameters
    if( typeof variables !== 'undefined' && typeof values !== 'undefined' ) {

      // only on variable
      if( typeof variables === 'string' ) {

        // only one value
        // do not accept multiple values because this do not make sense
        if( typeof values === 'string' ) {

          // if the variables already exists, update
          if( typeof this.variables[ variables ] !== 'undefined' ) {
            this.variables[ variables ] = values;

          // if the variable do not exists
          } else {

            // if the flag to create the variable is set
            if( typeof create !== 'undefined' ) {
              this.variables[ variables ] = values;
            }
          }
        }

      // multiple variables
      } else if( Array.isArray( variables ) ) {

        // one value
        // in this case all informed variables will be updated with the same value
        if( typeof values  === 'string' ) {

          // if it is to create the variable if not exists
          if( typeof create !== 'undefined' ) {
            for( i = 0; i < variables.length; i++ ) {
              this.variables[ variables[ i ] ] = values;
            }

          // if it is to ignore the variable if not exists
          } else {
            for( i = 0; i < variables.length; i++ ) {
              if( typeof this.variables[ variables[ i ] ] !== 'undefined' ) {
                this.variables[ variables[ i ] ] = values;
              }
            }
          }

        // multiple variables and multiple values
        } else if( Array.isArray( values ) ) {

          // each position of variables array will be mapped it the same position of values array
          if( variables.length == values.length ) {

            // if it is to create the variable if not exists
            if( typeof create !== 'undefined' ) {
              for( i = 0; i < variables.length; i++ ) {
                this.variables[ variables[ i ] ] = values[ i ];
              }

            // if it is to ignore the variable if not exists
            } else {
              for( i = 0; i < variables.length; i++ ) {
                if( typeof this.variables[ variables[ i ] ] !== 'undefined' ) {
                  this.variables[ variables[ i ] ] = values[ i ];
                }
              }
            }
          }
        }
      }
    }

    return this;
  }

  /**
   * Remove one or more variables. A filter can be used to remove with a condition
   *
   * @since 1.0.0
   *
   * @param {String|Array|Function} elements One (string) or multiple (array) utm variables. If left empty, all the elements will be removed. If a function is passed, this function will be executed to all variables passing the utm variable value as parameter and the variable will be removed if the function returns true.
   * @param {Function} filter Will be executed passing the utm variable and its value as parameters and the variable will be removed if the function returns true
   *
   * @returns {UTMManager} Return an UTMManager object (this)
   */
  Kernel.prototype.remove = function( elements, filter ) {

    if( typeof elements !== 'undefined' ) {

      // only one variable
      if( typeof elements === 'string' ) {

        // remove without condition
        // remove( 'variable' )
        if( typeof filter === 'undefined' ) {
          delete this.variables[ elements ];

        // a filter (condition) needs to be applied
        // remove( 'variable', function( value ) { ... } )
        } else if( typeof filter === 'function' ) {

          if( filter( elements, this.variables[ elements ] ) ) {
            delete this.variables[ elements ];
          }
        }

      // multiple variables
      } else if( Array.isArray( elements ) ) {

        // remove without condition
        // remove( [ 'variable', 'variable' ] )
        if( typeof filter === 'undefined' ) {
          for( i = 0; i < elements.length; i++ ) {
            delete this.variables[ elements[ i ] ];
          }

        // a filter (condition) needs to be applied
        // remove( [ 'variable', 'variable' ], function( value ) { ... } )
        } else {
          for( i = 0; i < elements.length; i++ ) {
            if( filter( elements[ i ], this.variables[ elements[ i ] ] ) ) {
              delete this.variables[ elements[ i ] ];
            }
          }
        }

      // filter is passed as first (and only) parameter
      // remove( function( value ) { ... } )
      } else if( typeof elements == 'function' ) {

        // apply for all variables
        var variables = Object.keys( this.variables );

        for( i = 0; i < variables.length; i++ ) {
          if( elements( variables[ i ], this.variables[ variables[ i ] ] ) ) {
            delete this.variables[ variables[ i ] ];
          }
        }
      }

    // removes all elements without condition
    // remove()
    } else {
      this.variables = {};
    }

    return this;
  }

  /**
   * Enable the runtime.and flag to inform other functions that the result need to be processed with &&
   *
   * @since 1.0.0
   *
   * @param {boolean} scalar When used and gived a boolean value, the result will be operated with the value using &&
   *
   * @returns {UTMManager} Return an UTMManager object (this)
   */
  Kernel.prototype.and = function( scalar ) {
    if( typeof scalar === 'boolean' ) {
      this.booleanResult = this.booleanResult && scalar;
    } else {
      this.runtime.and = true;
    }
    return this;
  }

  /**
   * Enable the runtime.or flag to inform other functions that the result need to be processed with ||
   *
   * @since 1.0.0
   *
   * @param {boolean} scalar When used and gived a boolean value, the result will be operated with the value using ||
   *
   * @returns {UTMManager} Return an UTMManager object (this)
   */
  Kernel.prototype.or = function( scalar ) {
    if( typeof scalar === 'boolean' ) {
      this.booleanResult = this.booleanResult || scalar;
    } else {
      this.runtime.or = true;
    }
    return this;
  }

  /**
   * Defines which variable(s) will be verified by the equals() or not() function
   * This function only preced a equals() or not() function
   * is( 'utm_source' ).equals( ...
   * is( [ 'utm_source', 'utm_medium' ] ).not( ...
   *
   * @since 1.0.0
   *
   * @param {String|Array} utm One (string) or multiple (array) utm variables
   * @returns {UTMManager} Return an UTMManager object (this)
   */
  Kernel.prototype.is = function( utm ) {

    if( typeof utm === 'undefined' ) {
      this.runtime.is = null;
    } else if( typeof utm === 'string' || Array.isArray( utm ) ) {
      this.runtime.is = utm;
    }

    return this;
  }

  /**
   * Verifies if one or more utm variables is equals the given value(s)
   *
   * @since 1.0.0
   *
   * @param {String|Array} utm One (string) or multiple (array) utm variables
   *
   * @returns {UTMManager} Return an UTMManager object (this)
   */
  Kernel.prototype.equals = function( utm ) {

    var result = false;

    // runtime.is = the utm variable(s) informed as parameter in is()
    if( typeof this.runtime.is !== 'undefined' && typeof utm !== 'undefined' ) {

      // just one utm variable used in the function is()
      if( typeof this.runtime.is === 'string' ) {

        // compare one utm variable with one value
        if( typeof utm === 'string' ) {
          if( this.variables[ this.runtime.is ] == utm ) {
            result = true;
          }

        // compare one utm variable with multiple values
        // in this case the result will be true if the utm variable is eauals any of the values
        } else if( Array.isArray( utm ) ) {
          for( i = 0; i < utm.length; i++ ) {
            if( this.variables[ this.runtime.is ] == utm[ i ] ) {
              result = true;
              i = utm.length;
            }
          }
        }

      // multiple utm variables used in the function is()
      } else if( Array.isArray( this.runtime.is ) ) {

        // compare multiple utm variables with one value
        // in this case the result will be true if all utm variables are equals the value
        if( typeof utm === 'string' ) {
          result = true;
          for( i = 0; i < this.runtime.is.length; i++ ) {
            if( this.variables[ this.runtime.is[ i ] ] != utm ) {
              result = false;
              i = this.runtime.is.length;
            }
          }

        // compare multiple utm variables with one value to each utm variable or multiple values to one or more utm variables
        // is( [ 'utm_source', 'utm_medium' ] ).equals( [ 'source', 'medium' ] )
        // is( [ 'utm_source', 'utm_medium' ] ).equals( [ [ 'source1', 'source2'], 'medium' ] )
        // is( [ 'utm_source', 'utm_medium' ] ).equals( [ 'source', [ 'medium1', 'medium2'] ] )
        // is( [ 'utm_source', 'utm_medium' ] ).equals( [ [ 'source1', 'source2'], [ 'medium1', 'medium2'] ] )
        } else if( Array.isArray( utm ) ) {

          // if not, fuck, I need a cofffe!
          if( this.runtime.is.length == utm.length ) {

            result = true;

            // for each pair utm variable <=> value
            for( i = 0; i < utm.length; i++ ) {

              // if value is an array, the result will be true if the utm variable is equal any of the values
              if( Array.isArray( utm[ i ] ) ) {
                var tmp = false;
                for( j = 0; j < utm[ i ].length; j++ ) {
                  if( this.variables[ this.runtime.is[ i ] ] == utm[ i ][ j ] ) {
                    tmp = true;
                    j = utm[ i ].length;
                  }
                }
                result = tmp;

              // if the value is a string, the result will be true if the utm variable is equal the value
              } else {
                if( this.variables[ this.runtime.is[ i ] ] != utm[ i ] ) {
                  result = false;
                  i = utm.length;
                }
              }
            }
          }
        }
      }
    }

    // if and() was used
    if( this.runtime.and !== null ) {
      result = ( result && this.booleanResult );

    // if or() was used
    } else if( this.runtime.or !== null ) {
      result = ( result || this.booleanResult );
    }

    // clear the state of and() and or()
    this.runtime.and = this.runtime.or = null;

    this.booleanResult = result;

    return this;
  }

  /**
   * Verifies if one or more utm variables is different from the given value(s)
   *
   * @since 1.0.0
   *
   * @param {String|Array} utm One (string) or multiple (array) utm variables
   *
   * @returns {UTMManager} Return an UTMManager object (this)
   */
  Kernel.prototype.not = function( utm ) {

    var result = false;

    // runtime.is = the utm variable(s) informed as parameter in is()
    if( typeof this.runtime.is !== 'undefined' && typeof utm !== 'undefined' ) {

      // just one utm variable used in the function is()
      if( typeof this.runtime.is === 'string' ) {

        // compare one utm variable with one value
        if( typeof utm === 'string' ) {
          if( this.variables[ this.runtime.is ] != utm ) {
            result = true;
          }

        // compare one utm variable with multiple values
        // in this case the result will be false if the utm variable is eauals any of the values
        } else if( Array.isArray( utm ) ) {
          result = true;
          for( i = 0; i < utm.length; i++ ) {
            if( this.variables[ this.runtime.is ] == utm[ i ] ) {
              result = false;
              i = utm.length;
            }
          }
        }

      // multiple utm variables used in the function is()
      } else if( Array.isArray( this.runtime.is ) ) {

        // compare multiple utm variables with one value
        if( typeof utm === 'string' ) {
          result = true;
          for( i = 0; i < this.runtime.is.length; i++ ) {
            if( this.variables[ this.runtime.is[ i ] ] == utm ) {
              result = false;
              i = this.runtime.is.length;
            }
          }

        // compare multiple utm variables with one value to each utm variable or multiple values to one or more utm variables
        // is( [ 'utm_source', 'utm_medium' ] ).not( [ 'source', 'medium' ] )
        // is( [ 'utm_source', 'utm_medium' ] ).not( [ [ 'source1', 'source2'], 'medium' ] )
        // is( [ 'utm_source', 'utm_medium' ] ).not( [ 'source', [ 'medium1', 'medium2'] ] )
        // is( [ 'utm_source', 'utm_medium' ] ).not( [ [ 'source1', 'source2'], [ 'medium1', 'medium2'] ] )
        } else if( Array.isArray( utm ) ) {

          // if not, fuck, I need a cofffe!
          if( this.runtime.is.length == utm.length ) {

            result = true;

            // for each pair utm variable <=> value
            for( i = 0; i < utm.length; i++ ) {

              // if value is an array, the result will be false if the utm variable is equal any of the values
              if( Array.isArray( utm[ i ] ) ) {
                var tmp = true;
                for( j = 0; j < utm[ i ].length; j++ ) {
                  if( this.variables[ this.runtime.is[ i ] ] == utm[ i ][ j ] ) {
                    tmp = false;
                    j = utm[ i ].length;
                  }
                }
                result = tmp;

              // if the value is a string, the result will be false if the utm variable is equal the value
              } else {
                if( this.variables[ this.runtime.is[ i ] ] == utm[ i ] ) {
                  result = false;
                  i = utm.length;
                }
              }
            }
          }
        }
      }
    }

    // if and() was used
    if( this.runtime.and !== null ) {
      result = ( result && this.booleanResult );

    // if or() was used
    } else if( this.runtime.or !== null ) {
      result = ( result || this.booleanResult );
    }

    // clear the state of and() and or()
    this.runtime.and = this.runtime.or = null;

    this.booleanResult = result;

    return this;
  }

  /**
   * Given the result of the last is() performed
   *
   * @since 1.0.0
   *
   * @returns {boolean} Return result of the last is() performed
   */
  Kernel.prototype.result = function() {
    return this.booleanResult;
  }


  /**
   * Executes the given function passing this as parameter when the result of is() is true
   *
   * @since 1.0.0
   *
   * @param {Function} fn Function to be executed
   *
   * @returns {UTMManager} Return an UTMManager object (this)
   */
  Kernel.prototype.then = function( fn ) {
    if( this.booleanResult && typeof fn === 'function' ) {
      fn( this );
    }
    return this;
  }

  /**
   * Executes the given function passing this as parameter when the result of is() is false
   *
   * @since 1.0.0
   *
   * @param {Function} fn Function to be executed
   *
   * @returns {UTMManager} Return an UTMManager object (this)
   */
  Kernel.prototype.otherwise = function( fn ) {
    if( this.booleanResult == false && typeof fn === 'function' ) {
      fn( this );
    }
    return this;
  }

  /**
   * Executes the given function passing this as parameter
   *
   * @since 1.0.0
   *
   * @param {Function} fn Function to be executed
   *
   * @returns {UTMManager} Return an UTMManager object (this)
   */
  Kernel.prototype.always = function( fn ) {
    if( typeof fn === 'function' ) {
      fn( this );
    }
    return this;
  }

  /**
   * Returns the variables and values in string format
   *
   * @since 1.0.0
   *
   * @param {JSON} options A JSON object with three optional keys
   * @param {String|Array} options.utm Single (string) or multple (array) utm variables to be concated
   * @param {String} options.glue Separator for the utm variables
   * @param {boolean} options.empty True to concat a utm varible even if it is undefined
   *
   * @returns {String} The result of the concat process
   */
  Kernel.prototype.toString = function( options ) {

    var result= '';

    if( typeof options === 'undefined' ) {
      options = {};
    }

    // used in join()
    if( typeof options.glue === 'undefined' ) {
      options.glue = '&';
    }

    // if it is to display utm_variables that is not defined or empty
    if( typeof options.empty === 'undefined' ) {
      options.empty = false;
    }

    // concat all the defined utm variables
    if( typeof options.utm === 'undefined' ) {

      result = [];
      var utm = Object.keys( this.variables );

      for( i = 0; i < utm.length; i++ ) {
        result.push( utm[ i ] + '=' +  this.variables[ utm[ i ] ] );
      }

      result = result.join( options.glue );

    } else {

      // only one utm variable
      if( typeof options.utm === 'string' ) {

        if( typeof this.variables[ options.utm ] !== 'undefined' ) {

          result = options.utm + '=' + this.variables[ options.utm ];

        // if the empty flag is set to true, concat the variable even if it is undefined
        } else {
          if( options.empty ) {
            result = options.utm + '=';
          }
        }

      // multiple utm variables
      } else if( Array.isArray( options.utm ) ) {

        result = [];

        for( i = 0; i < options.utm.length; i++ ) {

          if( typeof this.variables[ options.utm[ i ] ] !== 'undefined' ) {

            result.push( options.utm[ i ] + '=' + this.variables[ options.utm[ i ] ] );

          // if the empty flag is set to true, concat the variable even if it is undefined
          } else {
            if( options.empty ) {
              result.push( options.utm[ i ] + '=' );
            }
          }
        }

        result = result.join( options.glue );
      }
    }

    return result;
  }

  return function( utm, isURL ) {
		return new Kernel( utm, isURL );
	};

})();

UTMManager.PARSE_URL = true;
