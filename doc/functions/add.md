# .add()

`since 1.1.0`

Adds a variable in the last position. If the variable is already defined, nothing will happen.

## Function signatures

The following table presents all parameters combination that can be used in this function.

| PARAMETERS     | SINCE | DESCRIPTION |
| -------------- | ----- | ----------- |
| string, string | 1.1.0 | Adds one variable |
| array, string  | 1.1.0 | Adds multiple variables with the same value |
| array, array   | 1.1.0 | Adds multiple variables with individual values |

## How to use

### One value for one variable

```js
const utm = new UTMManager('utm_medium=medium&utm_campaign=campaign')

utm.add('utm_source', 'google')

let string = utm.toString()
// return utm_medium=medium&utm_campaign=campaign&utm_source=google
```

### One value for multiples variables

```js
const utm = new UTMManager('utm_campaign=campaign')

utm.add(['utm_source', 'utm_medium'], 'new-value')

let string = utm.toString()
// return utm_campaign=campaign&utm_source=new-value&utm_medium=new-value
```

### Multiple values for multiple variables

When `add()` is used with two arrays with the same length, each variable will be added with the value in the same position in the second array.

```js
const utm = new UTMManager('utm_source=source')

utm.add(['utm_medium', 'utm_campaign'], ['cpc', 'my-campaign'])

let string = utm.toString()
// return utm_source=source&utm_medium=cpc&utm_campaign=my-campaign
```

