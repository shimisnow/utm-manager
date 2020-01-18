# UTMManager()

`since 1.0.0`

## How to use

### Extract variables from the page url

```javascript
var utm = UTMManager();
// will process the value of window.location.href
// Ex: https://domain.com/?utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value

var string = utm.toString();
// utm_source=source&utm_medium=medium&utm_campaign=campaign
```

Variables that is not from utm can also be extracted. For this, an array with the variables name must be given as parameter.

```javascript
var utm = UTMManager( [ 'variable' ] );
// will process the value of window.location.href and extract all utm variable plus the 'variable'
// Ex: https://domain.com/?utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value

var string = utm.toString();
// utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value
```

To extract all variables, the parameter must be a string with value `all`.

```javascript
var utm = UTMManager( 'all' );
// will process the value of window.location.href and extract all variables
// Ex: https://domain.com/?utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value

var string = utm.toString();
// utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value
```

### Extract from a string with variables

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value' );

var string = utm.toString();
// utm_source=source&utm_medium=medium&utm_campaign=campaign
```

Variables that is not from utm can also be extracted. For this, an array with the variables name must be given as the second parameter.

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value', [ 'variable' ] );

var string = utm.toString();
// utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value
```

To extract all variables, the second parameter must be a string with value `all`.

```javascript
var utm = UTMManager( 'utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value', 'all' );

var string = utm.toString();
// utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value
```

### Extract utm from the given url

```javascript
var utm = UTMManager( 'https://domain.com/?utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value' );

var string = utm.toString();
// utm_source=source&utm_medium=medium&utm_campaign=campaign
```

Variables that is not from utm can also be extracted. For this, an array with the variables name must be given as the second parameter.

```javascript
var utm = UTMManager( 'https://domain.com/?utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value', [ 'variable' ] );

var string = utm.toString();
// utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value
```

To extract all variables, the second parameter must be a string with value `all`.

```javascript
var utm = UTMManager( 'https://domain.com/?utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value', 'all' );

var string = utm.toString();
// utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value
```

### Extract from a json

```javascript
var utm = UTMManager( {
  'utm_source' : 'source',
  'utm_medium' : 'medium',
  'utm_campaign' : 'campaign',
  'variable' : 'value',
  'another' : 'value'
} );

var string = utm.toString();
// utm_source=source&utm_medium=medium&utm_campaign=campaign
```

Variables that is not from utm can also be extracted. For this, an array with the variables name must be given as the second parameter.

```javascript
var utm = UTMManager( {
  'utm_source' : 'source',
  'utm_medium' : 'medium',
  'utm_campaign' : 'campaign',
  'variable' : 'value',
  'another' : 'value'
}, [ 'variable' ] );

var string = utm.toString();
// utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value
```

To extract all variables, the second parameter must be a string with value `all`.

```javascript
var utm = UTMManager( {
  'utm_source' : 'source',
  'utm_medium' : 'medium',
  'utm_campaign' : 'campaign',
  'variable' : 'value',
  'another' : 'value'
}, 'all' );

var string = utm.toString();
// utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value
```

## Function signatures

The following table presents all parameters combination that can be used in this function.

| PARAMETERS     | SINCE | DESCRIPTION |
| -------------- | ----- | ----------- |
|                | 1.0.0 | Extracts utm variables from page url |
| string         | 1.0.0 | Extracts utm variables from the given string |
| string, array  | 1.0.0 | Extracts utm variables and the variables given within the array from the given string |
| string, string | 1.1.0 | Extracts all variables. The second parameter must be passed with the value 'all' |
| array          | 1.0.0 | Extracts utm variables and the variables given within the array from the page url |
| json           | 1.0.0 | Extracts utm variables from the given json |
| json, array    | 1.1.0 | Extracts utm variables and the variables given within the array from the given json |
| json, string   | 1.1.0 | Extracts all variables. The second parameter must be passed with the value 'all' |
