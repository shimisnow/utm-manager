# .then()

Receives a function as parameter that will be executed when the action performed together with is() resulted in true.

```javascript
.then( function() { ... } );
```

## How to use

### Basic use case

The message "source is google" will be displayed in console when utm_source=google.

```javascript
utm.is( 'utm_source' )
  .equals( 'google' )
  .then( function() {
    console.log( 'source is google' );
  } );
```

### Advanced use case

The message "source is google" will be displayed in console when utm_source=google and the messagem "source is facebook" when utm_source=facebook.

```javascript
utm.is( 'utm_source' )
  .equals( 'google' ).then( function() {
    console.log( 'source is google' );
  } )
  .equals( 'facebook' ).then( function() {
    console.log( 'source is facebook' );
  } );
```
