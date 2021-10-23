# .empty()

`since 1.0.0`

Verify if the given variable(s) is empty.

## How to use

Taking action based on result

```js
utm.is('utm_source')
  .empty()
  .then(() => {
    console.log('it is empty');
  });
```

Obtaining the boolean result

```js
let result = utm.is('utm_source').empty().result();
// true or false
```

To ensure that the variable exists and is empty, use this along with defined()

```js
utm.is('utm_source')
  .defined()
  .and()
  .empty()
  .then(() => {
    console.log('it is empty');
  });
```

## Function signatures

The following table presents all parameters combination that can be used in this function.

| PARAMETERS | SINCE | DESCRIPTION |
| ---------- | ----- | ----------- |
|            | 1.0.0 | Verifies if the given variables in is() function is empty |
