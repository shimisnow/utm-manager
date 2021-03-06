# .defined()

`since 1.0.0`

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
// true or false
```

## Function signatures

The following table presents all parameters combination that can be used in this function.

| PARAMETERS | SINCE | DESCRIPTION |
| ---------- | ----- | ----------- |
|            | 1.0.0 | Verifies if the given variables in is() function is defined |
