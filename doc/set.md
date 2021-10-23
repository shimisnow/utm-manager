# .set()

`since 1.0.0`

## How to use

### One value for one variable

When `set()` is used with two `string` parameters, the variable informed in the first parameter will receive the value from the second parameter if the variable is defined.

```js
const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign');

utm.set('utm_source', 'google');

let string = utm.toString();
// return utm_source=google&utm_medium=medium&utm_campaign=campaign
```

If the variable is undefined, nothing will be done.

```js
const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign');

utm.set('utm_term', 'term');

let string = utm.toString();
// return utm_source=source&utm_medium=medium&utm_campaign=campaign
```

To set the value of a variable even if it is undefined, it is necessary to pass a third parameter as `true`.

```js
const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign');

utm.set('utm_term', 'term', true);

let string = utm.toString();
// return utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term=term
```

### One value for multiples variables

When `set()` is used with two parameters, the first being a array and the second being a string, all defined variables will receive the given value.

```js
const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign');

utm.set(['utm_source', 'utm_medium', 'utm_term'], 'new-value');

let string = utm.toString();
// return utm_source=new-value&utm_medium=new-value&utm_campaign=campaign
```

To set the value of a variable even if it is undefined, it is necessary to pass a third parameter as `true`.

```js
const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign');

utm.set(['utm_source', 'utm_medium', 'utm_term'], 'new-value', true);

let string = utm.toString();
// return utm_source=new-value&utm_medium=new-value&utm_campaign=campaign&utm_term=new-value
```

### Multiple values for multiple variables

When `set()` is used with two arrays with the same length, each defined variable will receive the value in the same position in the second array.

```js
const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign');

utm.set(['utm_source', 'utm_medium', 'utm_campaign'], ['google', 'cpc', 'my-campaign']);

let string = utm.toString();
// return utm_source=google&utm_medium=cpc&utm_campaign=my-campaign
```

To set the value of a variable even if it is undefined, it is necessary to pass a third parameter as `true`.

```js
const utm = new UTMManager('utm_source=source&utm_medium=medium&utm_campaign=campaign');

utm.set(['utm_source', 'utm_medium', 'utm_campaign', 'utm_term'], ['google', 'cpc', 'my-campaign', 'term'], true);

let string = utm.toString();
// return utm_source=google&utm_medium=cpc&utm_campaign=my-campaign&utm_term=term
```

## Function signatures

The following table presents all parameters combination that can be used in this function.

| PARAMETERS           | SINCE | DESCRIPTION |
| -------------------- | ----- | ----------- |
| string, string       | 1.0.0 | Sets the value of a variable |
| string, string, true | 1.0.0 | Sets the value of a variable. Creates the variable if it is undefined |
| array, string        | 1.0.0 | Sets the value of multiple variables. |
| array, string, true  | 1.0.0 | Sets the value of multiple variables. Creates the variables if it is undefined |
| array, array         | 1.0.0 | Sets the value of a variable. Each variable will receive the value from the same array position from the variable name |
| array, array, true   | 1.0.0 | Sets the value of a variable. Each variable will receive the value from the same array position from the variable name. Creates the variables if it is undefined |
