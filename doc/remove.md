# .remove()

`since 1.0.0`

## How to use

### Remove all variables

When `remove()` is used without parameters, all variables will be destroyed.

```js
const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign');

utm.remove();

let string = utm.toString();
// return ''
```

### Remove only one variable

When `remove()` is used with a string as parameter, the specified variable will be destroyed.

```js
const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign');

utm.remove('utm_campaign');

let string = utm.toString();
// return utm_source=google&utm_medium=medium
```

### Remove multiple variables

When `remove()` is used with a array as parameter, all the specified variables will be destroyed.

```js
const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign');

utm.remove(['utm_medium', 'utm_campaign']);

let string = utm.toString();
// return utm_source=google
```

### Remove based on a filter

When `remove()` is used with a function as parameter, all variables will be analysed and will be destroyed when the filter returns true.

In the following example, the given filter is applied to all variables, but only the utm_medium is destroyed because it is the only one the has the medium value.

```js
const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign');

utm.remove((variable, value) => {
  return (value == 'medium');
});

let string = utm.toString();
// return utm_source=source&utm_campaign=campaign
```

The same logic can be used with only one variable. In this case, `remove()` will be used with a string (the variable) as first parameter and a function (the filter) as second.

```js
const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign');

utm.remove('utm_campaign',  variable, value) => {
  return (value == 'my-campaign');
});

let string = utm.toString();
// return utm_source=source&utm_medium=medium&utm_campaign=campaign
```

The same logic can also be used with multiple variables. In this case, `remove()` will be used with a array (the variables) as first parameter and a function (the filter) as second.

```js
const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term=');

utm.remove(['utm_medium', 'utm_term'], (variable, value) => {
  return (value == '');
});

let string = utm.toString();
// return utm_source=source&utm_medium=medium&utm_campaign=campaign
```

## Function signatures

The following table presents all parameters combination that can be used in this function.

| PARAMETERS       | SINCE | DESCRIPTION |
| ---------------- | ----- | ----------- |
|                  | 1.0.0 | Removes all variables |
| function         | 1.0.0 | Removes the variables that returns true for the given filter |
| string           | 1.0.0 | Remove one variable |
| string, function | 1.0.0 | Removes one variable if it returns true for the given filter |
| array            | 1.0.0 | Remove multiple variables |
| array, function  | 1.0.0 | Removes the given variables that returns true for the given filter |
