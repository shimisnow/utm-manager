# .set()

## How to use

### One value for one variable

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.set( 'utm_source', 'google' );

var string = utm.toString();
// return utm_source=google&utm_medium=medium&utm_campaign=campaign
```

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.set( 'utm_term', 'term' );

var string = utm.toString();
// return utm_source=source&utm_medium=medium&utm_campaign=campaign
```

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.set( 'utm_term', 'term', true );

var string = utm.toString();
// return utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term=term
```

### One value for multiples variables

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.set( [ 'utm_source', 'utm_medium', 'utm_campaign' ], 'new-value' );

var string = utm.toString();
// return utm_source=new-value&utm_medium=new-value&utm_campaign=new-value
```

### Multiple values for multiple variables

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );

utm.set( [ 'utm_source', 'utm_medium', 'utm_campaign' ], [ 'google', 'cpc', 'my-campaign' ] );

var string = utm.toString();
// return utm_source=google&utm_medium=cpc&utm_campaign=my-campaign
```

.set( string, string )
.set( string, string, true )
.set( array, string )
.set( array, string, true )
.set( array, array )
.set( array, array, true )
