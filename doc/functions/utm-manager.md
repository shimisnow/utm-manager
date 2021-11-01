# UTMManager()

`since 1.0.0`

## Function signatures

The following table presents all parameters combination that can be used in this function.

| PARAMETERS     | SINCE | DESCRIPTION |
| -------------- | ----- | ----------- |
| string         | 1.0.0 | Extracts utm variables from the given string |
| string, array  | 1.0.0 | Extracts utm variables and the variables given within the array from the given string |
| string, string | 1.1.0 | Extracts all variables. The second parameter must be passed with the value 'all' |
| json           | 1.0.0 | Extracts utm variables from the given json |
| json, array    | 1.1.0 | Extracts utm variables and the variables given within the array from the given json |
| json, string   | 1.1.0 | Extracts all variables. The second parameter must be passed with the value 'all' |

## How to use

### Extract utm from the given url

```js
const utm = new UTMManager('https://domain.com/?utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value')

let string = utm.toString()
// utm_source=source&utm_medium=medium&utm_campaign=campaign
```

Variables that is not from utm can also be extracted. For this, an array with the variables name must be given as the second parameter.

```js
const utm = new UTMManager('https://domain.com/?utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value', ['variable'])

let string = utm.toString()
// utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value
```

To extract all variables, the second parameter must be a string with value `all`.

```js
const utm = new UTMManager('https://domain.com/?utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value', 'all')

let string = utm.toString()
// utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value
```

### Extract from a string with variables

```js
const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value')

let string = utm.toString()
// utm_source=source&utm_medium=medium&utm_campaign=campaign
```

Variables that is not from utm can also be extracted. For this, an array with the variables name must be given as the second parameter.

```js
const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value', ['variable'])

let string = utm.toString()
// utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value
```

To extract all variables, the second parameter must be a string with value `all`.

```js
const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value', 'all')

let string = utm.toString()
// utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value
```

### Extract from a json

```js
const utm = new UTMManager({
  'utm_source': 'source',
  'utm_medium': 'medium',
  'utm_campaign': 'campaign',
  'variable': 'value',
  'another': 'value'
})

let string = utm.toString()
// utm_source=source&utm_medium=medium&utm_campaign=campaign
```

Variables that is not from utm can also be extracted. For this, an array with the variables name must be given as the second parameter.

```js
const utm = new UTMManager({
  'utm_source': 'source',
  'utm_medium': 'medium',
  'utm_campaign': 'campaign',
  'variable': 'value',
  'another': 'value'
}, ['variable'])

let string = utm.toString()
// utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value
```

To extract all variables, the second parameter must be a string with value `all`.

```js
const utm = new UTMManager({
  'utm_source': 'source',
  'utm_medium': 'medium',
  'utm_campaign': 'campaign',
  'variable': 'value',
  'another': 'value'
}, 'all')

let string = utm.toString()
// utm_source=source&utm_medium=medium&utm_campaign=campaign&variable=value&another=value
```
