# .not()

Verify if one or more variables is not equals to one or more values.

This function do not return a boolean result. It is necessary to use alongside with [result()](result.md) to obtain the boolean result.

## How to use

#### One variable and one value

Verify if a variable is not equals to the given value.

```javascript
.is( 'utm_source' ).not( 'google' )
```

Using [result()](result.md) to obtain the boolean result.

```javascript
var result = is( 'utm_source' ).not( 'google' ).result();
```

Using [then()](then.md) to execute a function when the result is true.

```javascript
.is( 'utm_source' )
  .not( 'google' )
  .then( function() {
    console.log( 'it is not google' );
  } );
```

#### One variable and multiple values

Verify if a variable is not equals to any one the given values.

```javascript
.is( 'utm_source' ).not( [ 'google', 'facebook' ] )
```

#### Multiple variables and one value

Verify if all variables are not equals the given value.

```javascript
.is( [ 'utm_source', 'utm_campaign' ] ).not( 'google' )
```

#### Multiple variables and multiple values

Verifies if each variable from is() is not equals to the given value in the same position of not().

It will be true only if utm_source is not equals google and utm_medium is not equals cpc.

```javascript
.is( [ 'utm_source', 'utm_medium' ] ).not( [ 'google', 'cpc' ] )
```

A more complex verification can also be performed.

For example, verify if utm_source is different from both google or facebook and if utm_medium is not equals cpc.

```javascript
.is( [ 'utm_source', 'utm_medium' ] ).not( [ [ 'google', 'facebook' ], 'cpc' ] )
```
