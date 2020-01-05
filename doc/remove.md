# .remove()

## How to use

### Remove all variables

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.remove();

var string = utm.toString();
// return ''
```

### Remove only one variable

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.remove( 'utm_campaign' );

var string = utm.toString();
// return utm_source=google&utm_medium=medium
```

### Remove multiple variables

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.remove( [ 'utm_medium', 'utm_campaign' ] );

var string = utm.toString();
// return utm_source=google
```

### Remove based on a filter

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.remove( function( variable, value ) {
  return ( value == 'medium' );
} );

var string = utm.toString();
// return utm_source=source&utm_campaign=campaign
```

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.remove( 'utm_campaign', function( variable, value ) {
  return ( value == 'my-campaign' );
} );

var string = utm.toString();
// return utm_source=source&utm_medium=medium&utm_campaign=campaign
```

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term=' );

utm.remove( [ 'utm_medium', 'utm_campaign' ], function( variable, value ) {
  return ( value == '' );
} );

var string = utm.toString();
// return utm_source=source&utm_medium=medium&utm_campaign=campaign
```
