
### Get a variable value

```javascript
// assuming an url as https://domain.com/?utm_source=google&utm_medium=cpc&utm_campaign=campaign-01
var utm = UTMManager();

var utm_source = utm.get( 'utm_source' );
// google
```

### Define a variable value

```javascript
// assuming an url as https://domain.com/?utm_source=google&utm_medium=cpc&utm_campaign=campaign-01
var utm = UTMManager();

utm.set( 'utm_source', 'facebook' );

var utm_source = utm.get( 'utm_source' );
// facebook
```

### Get all variables as a string

```javascript
// assuming an url as https://domain.com/?utm_source=google&utm_medium=cpc&utm_campaign=campaign-01
var utm = UTMManager();

var string = utm.toString();
// utm_source=google&utm_medium=cpc&utm_campaign=campaign-01
```

### Taking action when a variable is equals certain value

```javascript
// assuming an url as https://domain.com/?utm_source=google&utm_medium=cpc&utm_campaign=campaign-01
var utm = UTMManager();

utm.is( 'utm_source' )
  .equals( 'google' )
  .then( function() {
    console.log( 'it is a google campaign' );
  } )
  .otherwise( function() {
    console.log( 'it is not a google campaign' );
  } );
```

### Taking action based on multiple variables

```javascript
// assuming an url as https://domain.com/?utm_source=google&utm_medium=cpc&utm_campaign=campaign-01
var utm = UTMManager();

utm.is( [ 'utm_source', 'utm_medium' ] )
  .equals( [ 'google', 'cpc' ] )
  .then( function() {
    console.log( 'it is a paid google campaign' );
    // utm_source = google AND utm_medium = cpc
  } )
  .otherwise( function() {
    console.log( 'it is not a paid google campaign' );
  } );
```
