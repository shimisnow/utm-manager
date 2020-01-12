# .remove()

`since 1.0.0`

## How to use

### Remove all variables

When `remove()` is used without parameters, all variables will be destroyed.

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.remove();

var string = utm.toString();
// return ''
```

### Remove only one variable

When `remove()` is used with a string as parameter, the specified variable will be destroyed.

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.remove( 'utm_campaign' );

var string = utm.toString();
// return utm_source=google&utm_medium=medium
```

### Remove multiple variables

When `remove()` is used with a array as parameter, all the specified variables will be destroyed.

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.remove( [ 'utm_medium', 'utm_campaign' ] );

var string = utm.toString();
// return utm_source=google
```

### Remove based on a filter

When `remove()` is used with a function as parameter, all variables will be analysed and will be destroyed when the filter returns true.

In the following example, the given filter is applied to all variables, but only the utm_medium is destroyed because it is the only one the has the medium value.

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.remove( function( variable, value ) {
  return ( value == 'medium' );
} );

var string = utm.toString();
// return utm_source=source&utm_campaign=campaign
```

The same logic can be used with only one variable. In this case, `remove()` will be used with a string (the variable) as first parameter and a function (the filter) as second.

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.remove( 'utm_campaign', function( variable, value ) {
  return ( value == 'my-campaign' );
} );

var string = utm.toString();
// return utm_source=source&utm_medium=medium&utm_campaign=campaign
```

The same logic can also be used with multiple variables. In this case, `remove()` will be used with a array (the variables) as first parameter and a function (the filter) as second.

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term=' );

utm.remove( [ 'utm_medium', 'utm_term' ], function( variable, value ) {
  return ( value == '' );
} );

var string = utm.toString();
// return utm_source=source&utm_medium=medium&utm_campaign=campaign
```
