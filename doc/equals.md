# .equals()

`since 1.0.0`

Verify if one or more variables is equals to one or more values.

This function do not return a boolean result. It is necessary to use alongside with [result()](result.md) to obtain the boolean result.

## How to use

### One variable and one value

Verify if a variable is equals to the given value.

```js
utm.is('utm_source')
  .equals('google')
```

Using [result()](result.md) to obtain the boolean result.

```js
let result = utm.is('utm_source').equals('google').result()
```

Using [then()](then.md) to execute a function when the result is true.

```js
utm.is('utm_source')
  .equals('google')
  .then(() => {
    console.log('it is google')
  });
```

### One variable and multiple values

Verify if a variable is equals to any one the given values.

```js
utm.is('utm_source')
  .equals(['google', 'facebook'])
```

### Multiple variables and one value

Verify if all variables are equals the given value.

```js
utm.is(['utm_source', 'utm_campaign'])
  .equals('google')
```

### Multiple variables and multiple values

Verifies if each variable from is() is equals to the given value in the same position of equals().

It will be true only if utm_source is equals google and utm_medium is equals cpc.

```js
utm.is(['utm_source', 'utm_medium'])
  .equals(['google', 'cpc'])
```

A more complex verification can also be performed.

For example, verify if utm_source is either google or facebook and if utm_medium is equals cpc.

```js
utm.is(['utm_source', 'utm_medium'])
  .equals([['google', 'facebook'], 'cpc'])
```

## Function signatures

The following table presents all parameters combination that can be used in this function.

| PARAMETERS | SINCE | DESCRIPTION |
| ---------- | ----- | ----------- |
| string     | 1.0.0 | Compare the value of one variable |
| array      | 1.0.0 | Compare the value for multiple variables |
