# .always()

`since 1.0.0`

Receives a function as parameter that will always be executed.

```javascript
.always( function() { ... } );
```

## How to use

The follow code display the message `source is google` when utm_source = google, display the message `source is not google` when utm_source != google and always display the message `always execute`.

```javascript
utm.is( 'utm_source' )
  .equals( 'google' ).then( function() {
    console.log( 'source is google' );
  } )
  .equals( 'facebook' ).then( function() {
    console.log( 'source is facebook' );
  } )
  .always( function() {
    console.log( 'always execute' );
  } );
```
