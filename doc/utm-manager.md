# UTMManager()

## How to use

### Extract utm from the page url

```javascript
var utm = UTMManager();
// will process the value of window.location.href
```

### Extract utm from a string with variables

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
```

### Set the variables from a JSON

```javascript
var utm = UTMManager( {
  'utm_source' : 'source',
  'utm_medium' : 'medium',
  'utm_campaign' : 'campaign'
} );
```

### Extract utm from the given url

```javascript
var utm = UTMManager( 'https://domain.com/?utm_source=source&utm_medium=medium&utm_campaign=campaign' );
```
