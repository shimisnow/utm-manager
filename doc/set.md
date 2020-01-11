# .set()

## How to use

### One value for one variable

When `set()` is used with two `string` parameters, the variable informed in the first parameter will receive the value from the second parameter if the variable is defined.

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.set( 'utm_source', 'google' );

var string = utm.toString();
// return utm_source=google&utm_medium=medium&utm_campaign=campaign
```

If the variable is undefined, nothing will be done.

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.set( 'utm_term', 'term' );

var string = utm.toString();
// return utm_source=source&utm_medium=medium&utm_campaign=campaign
```

To set the value of a variable even if it is undefined, it is necessary to pass a third parameter as `true`.

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.set( 'utm_term', 'term', true );

var string = utm.toString();
// return utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term=term
```

### One value for multiples variables

When `set()` is used with two parameters, the first being a array and the second being a string, all defined variables will receive the given value.

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.set( [ 'utm_source', 'utm_medium', 'utm_term' ], 'new-value' );

var string = utm.toString();
// return utm_source=new-value&utm_medium=new-value&utm_campaign=campaign
```

To set the value of a variable even if it is undefined, it is necessary to pass a third parameter as `true`.

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.set( [ 'utm_source', 'utm_medium', 'utm_term' ], 'new-value', true );

var string = utm.toString();
// return utm_source=new-value&utm_medium=new-value&utm_campaign=campaign&utm_term=new-value
```

### Multiple values for multiple variables

When `set()` is used with two arrays with the same length, each defined variable will receive the value in the same position in the second array.

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.set( [ 'utm_source', 'utm_medium', 'utm_campaign' ], [ 'google', 'cpc', 'my-campaign' ] );

var string = utm.toString();
// return utm_source=google&utm_medium=cpc&utm_campaign=my-campaign
```

To set the value of a variable even if it is undefined, it is necessary to pass a third parameter as `true`.

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.set( [ 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term' ], [ 'google', 'cpc', 'my-campaign', 'term' ], true );

var string = utm.toString();
// return utm_source=google&utm_medium=cpc&utm_campaign=my-campaign&utm_term=term
```
