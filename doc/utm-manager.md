# UTMManager()

## How to use

### Process the page url

```javascript
var utm = UTMManager();
// will process the value of window.location.href
```

### Process a string with variables

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign' );
```

### Process a json

```javascript
var utm = UTMManager( {
  'utm_source' : 'source',
  'utm_medium' : 'medium',
  'utm_campaign' : 'campaign'
} );
```

### Process a given url

```javascript
var utm = UTMManager( 'https://domain.com/?utm_source=source&utm_medium=medium&utm_campaign=campaign', true );
```
