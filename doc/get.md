# .get()

## How to use

### Getting all variables

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

var variables = utm.get();
// return [ 'source', 'medium', 'campaign' ]
```

### Getting only one variables

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

var variable = utm.get( 'utm_source' );
// return 'source'
```

### Getting two or more variables

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

var variables = utm.get( [ 'utm_source', 'utm_medium' ] );
// return [ 'source', 'medium' ]

variables = utm.get( [ 'utm_source', 'utm_medium', 'utm_term' ] );
// return [ 'source', 'medium', undefined ]
```

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

var variables = utm.get( [ 'utm_source', 'utm_medium', 'utm_term' ] )
  .filter( function( value ) {
    return ( typeof value !== 'undefined' );
  } );
// return [ 'source', 'medium' ]
```
