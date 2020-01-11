# .equals()

Verify if one or more variables is equals to one or more values.

This function do not return a boolean result. It is necessary to use alongside with [result()](result.md) to obtain the boolean result.

## How to use

### One variable and one value

Verify if a variable is equals to the given value.

```javascript
.is( 'utm_source' ).equals( 'google' )
```

Using [result()](result.md) to obtain the boolean result.

```javascript
var result = is( 'utm_source' ).equals( 'google' ).result();
```

Using [then()](then.md) to execute a function when the result is true.

```javascript
.is( 'utm_source' )
  .equals( 'google' )
  .then( function() {
    console.log( 'it is google' );
  } );
```

### One variable and multiple values

Verify if a variable is equals to any one the given values.

```javascript
.is( 'utm_source' ).equals( [ 'google', 'facebook' ] )
```

### Multiple variables and one value

Verify if all variables are equals the given value.

```javascript
.is( [ 'utm_source', 'utm_campaign' ] ).equals( 'google' )
```

### Multiple variables and multiple values

Verifies if each variable from is() is equals to the given value in the same position of equals().

It will be true only if utm_source is equals google and utm_medium is equals cpc.

```javascript
.is( [ 'utm_source', 'utm_medium' ] ).equals( [ 'google', 'cpc' ] )
```

A more complex verification can also be performed.

For example, verify if utm_source is either google or facebook and if utm_medium is equals cpc.

```javascript
.is( [ 'utm_source', 'utm_medium' ] ).equals( [ [ 'google', 'facebook' ], 'cpc' ] )
```
