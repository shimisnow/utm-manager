# .defined()

Verify if the given variable(s) exists in the structure (url, string or json) used in the UTMManager().

## How to use

Taking action based on result

```javascript
utm.is( 'utm_source' )
  .defined()
  .then( function() {
    console.log( 'it is defined' );
  } );
```

Obtaining the boolean result

```javascript
var result = utm.is( 'utm_source' ).defined().result();
```
