# .get()

## How to use

### Get all variables

When `get()` is used without parameters, all defined variables will be returned.

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

var variables = utm.get();
// return [ 'source', 'medium', 'campaign' ]
```

An array will always be returned, even if there is no defined variable. In this case, `[]` will be returned.

### Get only one variable

When `get()` is used with a string as parameter, a `string` will be returned if the variable is defined and an `undefined` value if the variable is undefined.

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=' );

var variable = utm.get( 'utm_source' );
// return 'source'

variable = utm.get( 'utm_campaign' );
// return ''

variable = utm.get( 'utm_term' );
// return undefined
```

### Getting two or more variables

When `get()` is used with an array as parameter, an array will be returned with the variables value.

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

var variables = utm.get( [ 'utm_source', 'utm_medium' ] );
// return [ 'source', 'medium' ]

variables = utm.get( [ 'utm_source', 'utm_medium', 'utm_term' ] );
// return [ 'source', 'medium', undefined ]
```

One way to remove the undefined values is to apply a filter:

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

var variables = utm.get( [ 'utm_source', 'utm_medium', 'utm_term' ] )
  .filter( function( value ) {
    return ( typeof value !== 'undefined' );
  } );
// return [ 'source', 'medium' ]
```
