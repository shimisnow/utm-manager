# UTMManager()

`since 1.0.0`

## How to use

### Extract utm variables from the page url

```javascript
var utm = UTMManager();
// will process the value of window.location.href
// Ex: https://domain.com/?utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value

var string = utm.toString();
// utm_source=source&utm_medium=medium&utm_campaign=campaign
```

Variables that is not from utm can also be extracted. For this, an array with the variables name must be given as parameter.

```javascript
var utm = UTMManager( [ 'variable' ] );
// will process the value of window.location.href
// Ex: https://domain.com/?utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value

var string = utm.toString();
// utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value
```

### Extract utm from a string with variables

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value' );

var string = utm.toString();
// utm_source=source&utm_medium=medium&utm_campaign=campaign
```

Variables that is not from utm can also be extracted. For this, an array with the variables name must be given as parameter.

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value', [ 'variable' ] );

var string = utm.toString();
// utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value
```

### Set the variables from a JSON

```javascript
var utm = UTMManager( {
  'utm_source' : 'source',
  'utm_medium' : 'medium',
  'utm_campaign' : 'campaign'
} );

var string = utm.toString();
// utm_source=source&utm_medium=medium&utm_campaign=campaign
```

The given variables in the json are not filtered, so if a non utm variable is present, that will be saved.

```javascript
var utm = UTMManager( {
  'utm_source' : 'source',
  'utm_medium' : 'medium',
  'utm_campaign' : 'campaign',
  'variable' : 'value'
} );

var string = utm.toString();
// utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value
```

### Extract utm from the given url

```javascript
var utm = UTMManager( 'https://domain.com/?utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value' );

var string = utm.toString();
// utm_source=source&utm_medium=medium&utm_campaign=campaign
```

Variables that is not from utm can also be extracted. For this, an array with the variables name must be given as parameter.

```javascript
var utm = UTMManager( 'https://domain.com/?utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value', [ 'variable' ] );

var string = utm.toString();
// utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value
```

## Function signatures

The following table presents all parameters combination that can be used in this function.

| PARAMETERS    | SINCE | DESCRIPTION |
| ------------- | ----- | ----------- |
|               | 1.0.0 | Extracts utm variables from page url |
| string        | 1.0.0 | Extracts utm variables from the given string |
| array         | 1.0.0 | Extracts utm variables and the variables given within the array from the page url |
| string, array | 1.0.0 | Extracts utm variables and the variables given within the array from the given string |
| url           | 1.0.0 | Extracts utm variables from the given url |
| url, array    | 1.0.0 | Extracts utm variables and the variables given within the array from the given url |
| json          | 1.0.0 | Saves all variables from the json |
