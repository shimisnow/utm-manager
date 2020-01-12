# .toString()

`since 1.0.0`

Returns the utm variables in string format to be used in an URL.

## How to use

### Return all variables

```javascript
const utm = UTMManager( 'utm_source=google&utm_medium=cpc&utm_campaign=campaign&utm_term=coding' );

var result = utm.toString();
// utm_source=google&utm_medium=cpc&utm_campaign=campaign&utm_term=coding
```

### Return only some variables

The utm key always needs to be a array.

```javascript
const utm = UTMManager( 'utm_source=google&utm_medium=cpc&utm_campaign=campaign' );

var result = utm.toString( {
  utm : [ 'utm_source' ]
} );
// utm_source=google

result = utm.toString( {
  utm : [ 'utm_source', 'utm_medium' ]
} );
// utm_source=google&utm_medium=cpc
```

```javascript
const utm = UTMManager( 'utm_source=google&utm_medium=cpc&utm_campaign=campaign' );

var result = utm.toString( {
  utm : [ 'utm_source', 'utm_medium', 'utm_term' ]
} );
// utm_source=google&utm_medium=cpc

result = utm.toString( {
  utm : [ 'utm_source', 'utm_medium', 'utm_term' ],
  empty: true
} );
// utm_source=google&utm_medium=cpc&utm_term=
```

### Changing the symbol separating the variables

```javascript
const utm = UTMManager( 'utm_source=google&utm_medium=cpc' );

var result = utm.toString( {
  utm : [ 'utm_medium', 'utm_term' ]
  empty: true,
  glue : '<>'
} );
// utm_medium=cpc<>utm_term=
```
