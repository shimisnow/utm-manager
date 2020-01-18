# Basic examples

## Getting the value

You can get only one value

```javascript
const utm = UTMManager( '?utm_source=google&utm_medium=cpc&utm_campaign=01123581321' );

var medium = utm.get( 'utm_medium' );
// 'cpc'
```

Or multiple values

```javascript
const utm = UTMManager( '?utm_source=google&utm_medium=cpc&utm_campaign=01123581321' );

var source_medium = utm.get( [ 'utm_source', 'utm_medium' ] );
// [ 'google', 'cpc' ]
```

## Verifying if the variable exists

```javascript
const utm = UTMManager( '?utm_source=google&utm_medium=cpc&utm_campaign=01123581321&utm_term=' );

var medium = utm.is( 'utm_source' ).defined().result();
// true

var term = utm.is( 'utm_term' ).defined().result();
// true

var content = utm.is( 'utm_content' ).defined().result();
// false
```

It is necessary to use the result() function to get the boolean result. See the [advanced examples](advanced.md) section to more details.

## Verifying if the variable exists and has value

```javascript
const utm = UTMManager( '?utm_source=google&utm_medium=cpc&utm_campaign=01123581321&utm_term=' );

var medium = utm.is( 'utm_medium' ).filled().result();
// true

var term = utm.is( 'utm_term' ).filled().result();
// false
```

## Verifying if the variable exists and is empty

```javascript
const utm = UTMManager( '?utm_source=google&utm_medium=cpc&utm_campaign=01123581321&utm_term=' );

var term = utm.is( 'utm_term' ).defined().and().empty().result();
// true
```

It is necessary to use the defined function because empty() will return true if the variable do not exists.

```javascript
const utm = UTMManager( '?utm_source=google&utm_medium=cpc&utm_campaign=01123581321&utm_term=' );

var content = utm.is( 'utm_content' ).empty().result();
// true
```

## Changing the value of a variable

```javascript
const utm = UTMManager( '?utm_source=google&utm_medium=cpc&utm_campaign=01123581321' );

var old = utm.get( 'utm_campaign' );
// '01123581321'

utm.set( 'utm_campaign', 'campaign' );

var changed = utm.get( 'utm_campaign' );
// 'campaign'
```

## Adding a variable to the list

```javascript
const utm = UTMManager( '?utm_source=google&utm_medium=cpc&utm_campaign=01123581321' );

var old = utm.toString();
// 'utm_source=google&utm_medium=cpc&utm_campaign=01123581321'

utm.add( 'utm_term', 'term' );

var changed = utm.toString();
// 'utm_source=google&utm_medium=cpc&utm_campaign=01123581321&utm_term=term'
```
