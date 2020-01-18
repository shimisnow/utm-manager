# .filled()

`since 1.1.0`

Verify if the given variable(s) is filled (is defined and has value).

## How to use

Taking action based on result

```javascript
utm.is( 'utm_source' )
  .filled()
  .then( function() {
    console.log( 'it has value' );
  } );
```

Obtaining the boolean result

```javascript
var result = utm.is( 'utm_source' ).filled().result();
// true or false
```

## Function signatures

The following table presents all parameters combination that can be used in this function.

| PARAMETERS | SINCE | DESCRIPTION |
| ---------- | ----- | ----------- |
|            | 1.1.0 | Verifies if the given variables in is() function is defined and has value |
