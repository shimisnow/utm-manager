# .empty()

Verify if the given variable(s) is empty.

## How to use

Taking action based on result

```javascript
utm.is( 'utm_source' )
  .empty()
  .then( function() {
    console.log( 'it is empty' );
  } );
```

Obtaining the boolean result

```javascript
var result = utm.is( 'utm_source' ).empty().result();
```

To ensure that the variable exists and is empty, use this along with defined()

```javascript
utm.is( 'utm_source' )
  .defined()
  .and()
  .empty()
  .then( function() {
    console.log( 'it is empty' );
  } );
```
