var UTMManager = ( function() {

  var Kernel = function( utm, extended ) {

    // current library version
		this.version = '1.1.0';

    this.config = {
      variables : [ 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content' ],
      sort : 'strict',
      strict : [ 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content' ],
      tostring : {
        glue : '&',
        undefined : false
      }
    };

    // stores all parsed variables
    this.variables = {};

    // stores the result of an operation with is()
    this.booleanResult = false;

    // stores information about is() and() e or()
    this.runtime = {
      // stores the value passed in is()
      // this can be a string or an array
      is  : null,
      // stores if the function and() was used
      // this can be null or true
      and : null,
      // stores if the function or() was used
      // this can be null or true
      or  : null
    }

    // if parameter utm is undefined, parse the page URL
    if( typeof utm !== 'undefined' ) {

      // if a string, parses the string content
      if( typeof utm === 'string' ) {

        if( utm == 'all' ) {
          this.parse( window.location.href, 'all' );
        } else {
          this.parse( utm, extended );
        }

      // if an array, parse the page URL with extended variables
      } else if( Array.isArray( utm ) ) {

        this.parse( window.location.href, utm );

      } else if( typeof utm === 'object' ) {

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

        var string = JSON.stringify( utm ).replace( /"|{|}/g, '' ).replace( /:/g, '=' ).replace( /,/g, '&' );

        this.parse( string, extended );
      }
    } else {

      // parse the page URL
      this.parse( window.location.href );
    }

		return this;
	};



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
  Kernel.prototype.parse = function( variables, extended ) {

    if( typeof variables !== 'undefined' ) {

      var parts = decodeURIComponent( variables ).split( '?' );

      if( parts.length == 2 ) {
        // split by hash symbol to get ONLY the real variables part
        variables = parts[ 1 ].split( '#' )[ 0 ];
      }

      variables = variables.split( '&' );

      // it is only to process the given string
      if( typeof extended === 'undefined' ) {

        // valid variables defined in config
        // it can be only utm variables (default) or something else if config() was used
        var valid = this.config.variables;

        for( i = 0; i < variables.length; i++ ) {
          var pair = variables[ i ].split( '=' );
          if( valid.indexOf( pair[ 0 ] ) >= 0 ) {
            this.variables[ pair[ 0 ] ] = pair[ 1 ];
          }
        }

      // some configuration was passed
      } else {

        // tells the algorithm to extract all variables from the string
        if( typeof extended === 'string' && extended == 'all' ) {
          for( i = 0; i < variables.length; i++ ) {
            var pair = variables[ i ].split( '=' );
            this.variables[ pair[ 0 ] ] = pair[ 1 ];
          }

        // tells the algorithm to extract only some variables from the string
        } else if( Array.isArray( extended ) ) {

          var valid = this.config.variables;
          valid = valid.concat( extended );

          for( i = 0; i < variables.length; i++ ) {
            var pair = variables[ i ].split( '=' );
            if( valid.indexOf( pair[ 0 ] ) >= 0 ) {
              this.variables[ pair[ 0 ] ] = pair[ 1 ];
            }
          }
        }
      }
    }

    return this;
  }




  /**
   * Verify if the variable(s) informed in the function is() is defined
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
   * Verify if the variable(s) informed in the function is() is undefined
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
   * Verify if the variable(s) informed in the function is() is empty
   * An undefined variable is also empty
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
   * Verify if the variable(s) informed in the function is() is defined and has value
   *
   * @since 1.1.0
   *
   * @returns {UTMManager} Return an UTMManager object (this)
   */
  Kernel.prototype.filled = function() {

    var result = true;

    // runtime.is = the utm variable(s) informed as parameter in is()
    if( typeof this.runtime.is !== 'undefined' ) {

      // just one utm variable used in the function is()
      if( typeof this.runtime.is === 'string' ) {

        // verifies only one utm variable
        if( typeof this.variables[ this.runtime.is ] !== 'undefined' ) {

            result = ( this.variables[ this.runtime.is ] != '' );
        } else {
          result = false;
        }

      // multiple utm variables used in the function is()
      } else if( Array.isArray( this.runtime.is ) ) {

        for( i = 0; i < this.runtime.is.length; i++ ) {
          if( typeof this.variables[ this.runtime.is[ i ] ] !== 'undefined' ) {
            if( this.variables[ this.runtime.is[ i ] ] == '' ) {
              result = false;
              i = this.runtime.is.length;
            }
          } else {
            result = false;
            i = this.runtime.is.length;
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
   * Get the value of a variable(s)
   *
   * @since 1.0.0
   *
   * @param {String|Array} utm One (string) or multiple (array) utm variables. If empty all variables will be returned.
   *
   * @returns {String|Array} Single value (string) or mutiple values (array). If a variable do not exists, the value undefined will be returned for one variable and, if a set of variables was requested, the position of the array for the variable will be undefined.
   */
  Kernel.prototype.get = function( utm ) {

    var result = '';

    switch( typeof utm ) {
    case 'string' :
      // only one result (string)
      result = this.variables[ utm ];
    break;
    case 'undefined' :
      // return all variables in an array
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
   * @param {boolean} create If the variable(s) do not exists and this flag is defined, the variable(s) will be created
   *
   * @returns {UTMManager} Return an UTMManager object (this)
   */
  Kernel.prototype.set = function( variables, values, create ) {

    // do not accept undefined parameters
    if( typeof variables !== 'undefined' && typeof values !== 'undefined' ) {

      // only one variable
      if( typeof variables === 'string' ) {

        // only one value
        // do not accept multiple values because this do not make sense
        if( typeof values === 'string' ) {

          // if the variables already exists, update
          if( typeof this.variables[ variables ] !== 'undefined' ) {
            this.variables[ variables ] = values;

          // if the variable do not exists
          } else {

            // if the flag to create the variable exists
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

          // each position of variables array will be mapped with the same position in the values array
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
   * Add a variable. Do not update if it exists
   *
   * @since 1.1.0
   *
   * @param {String} variables Variable(s) to be create
   * @param {String} values Value(s) to be used
   *
   * @returns {UTMManager} Return an UTMManager object (this)
   */
  Kernel.prototype.add = function( variables, values ) {

    // do not accept undefined parameters
    if( typeof variables !== 'undefined' && typeof values !== 'undefined' ) {

      // only one variable
      if( typeof variables === 'string' ) {

        // only one value
        // do not accept multiple values because this do not make sense
        if( typeof values === 'string' ) {

          // if the variables do not exists, create
          if( typeof this.variables[ variables ] === 'undefined' ) {
            this.variables[ variables ] = values;
          }
        }

      // multiple variables
      } else if( Array.isArray( variables ) ) {

        // one value
        // in this case all informed variables, if do no exists, will be create with the same value
        if( typeof values  === 'string' ) {

          for( i = 0; i < variables.length; i++ ) {
            if( typeof this.variables[ variables[ i ] ] === 'undefined' ) {
              this.variables[ variables[ i ] ] = values;
            }
          }

        // multiple variables and multiple values
        } else if( Array.isArray( values ) ) {

          // each position of variables array will be mapped with the same position in the values array
          if( variables.length == values.length ) {

            for( i = 0; i < variables.length; i++ ) {
              if( typeof this.variables[ variables[ i ] ] === 'undefined' ) {
                this.variables[ variables[ i ] ] = values[ i ];
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
   * @param {String|Array|Function} elements One (string) or multiple (array) utm variables. If left empty, all the elements will be removed. If a function is passed, this function will be executed to all variables passing the utm variable and value as parameters and the variable will be removed if the function returns true.
   * @param {Function} filter Will be executed passing the utm variable and its value as parameters and the variable will be removed if the function returns true.
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



  Kernel.prototype.sort = function( order ) {

    if( typeof order === 'undefined' ) {
      order = this.config.sort;
    }

    if( typeof order === 'string' ) {

      switch( order ) {
      case 'strict' :
      case 'strict-lexical' :

        var strict = this.config.strict;

        var extended = Object.keys( this.variables ).filter( function( value ) {
          return ( strict.indexOf( value ) < 0 );
        } );

        var tmp = {};

        for( var i = 0; i < strict.length; i++ ) {
          if( typeof this.variables[ strict[ i ] ] !== 'undefined' ) {
            tmp[ strict[ i ] ] = this.variables[ strict[ i ] ];
          }
        }

        if( order == 'strict-lexical' ) {
          extended = extended.sort();
        }

        for( var i = 0; i < extended.length; i++ ) {
          tmp[ extended[ i ] ] = this.variables[ extended[ i ] ];
        }

        this.variables = tmp;

      break;
      case 'lexical' :

        var keys = Object.keys( this.variables ).sort();

        var tmp = {};

        for( var i = 0; i < keys.length; i++ ) {
          tmp[ keys[ i ] ] = this.variables[ keys[ i ] ];
        }

        this.variables = tmp;

      break;
      }
    }

    // necessário fazer para quando o parâmetro for array

    return this;
  }



  /**
   * Enable the runtime.and flag to inform other functions that the result need to be processed with &&
   *
   * @since 1.0.0
   *
   * @param {boolean} scalar When used with a boolean parameter, the result will be operated with the value using &&
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
   * @param {boolean} scalar When used with a boolean parameter, the result will be operated with the value using ||
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
   * This function only precedes an equals() or not() function
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
   * @param {boolean} options.undefined True to concat a utm varible even if it is undefined
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
      options.glue = this.config.tostring.glue;
    }

    // if it is to display utm_variables that is not defined or empty
    if( typeof options.undefined === 'undefined' ) {
      options.undefined = this.config.tostring.undefined;
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

        // if the undefined flag is set to true, concat the variable even if it is undefined
        } else {
          if( options.undefined ) {
            result = options.utm + '=';
          }
        }

      // multiple utm variables
      } else if( Array.isArray( options.utm ) ) {

        result = [];

        for( i = 0; i < options.utm.length; i++ ) {

          if( typeof this.variables[ options.utm[ i ] ] !== 'undefined' ) {

            result.push( options.utm[ i ] + '=' + this.variables[ options.utm[ i ] ] );

          // if the undefined flag is set to true, concat the variable even if it is undefined
          } else {
            if( options.undefined ) {
              result.push( options.utm[ i ] + '=' );
            }
          }
        }

        result = result.join( options.glue );
      }
    }

    return result;
  }

  return function( utm, extended ) {
		return new Kernel( utm, extended );
	};

})();
