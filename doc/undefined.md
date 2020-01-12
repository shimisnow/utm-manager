# .undefined()

`since 1.0.0`

Verify if the given variable(s) do not exists in the structure (url, string or json) used in the UTMManager().

## How to use

Taking action based on result

```javascript
utm.is( 'utm_source' )
  .undefined()
  .then( function() {
    console.log( 'it is undefined' );
  } );
```

Obtaining the boolean result

```javascript
var result = utm.is( 'utm_source' ).undefined().result();
```
