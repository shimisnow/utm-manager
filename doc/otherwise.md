# .otherwise()

Receives a function as parameter that will be executed when the action performed together with is() resulted in false.

```javascript
.otherwise( function() { ... } );
```

## How to use

#### Basic use case

The message "source is not google" will be displayed in console when utm_source != google.

```javascript
utm.is( 'utm_source' )
  .equals( 'google' )
  .then( function() {
    console.log( 'source is google' );
  } )
  .otherwise( function() {
    console.log( 'source is not google' );
  } );
```

Using the function then() is optional.

```javascript
utm.is( 'utm_source' )
  .equals( 'google' )
  .otherwise( function() {
    console.log( 'source is not google' );
  } );
```
