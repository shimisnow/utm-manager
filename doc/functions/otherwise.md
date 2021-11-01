# .otherwise()

`since 1.0.0`

Receives a function as parameter that will be executed when the action performed together with is() resulted in false.

```js
utm.otherwise( function() { ... } )
```

## Function signatures

The following table presents all parameters combination that can be used in this function.

| PARAMETERS | SINCE | DESCRIPTION |
| ---------- | ----- | ----------- |
| function   | 1.0.0 | Executes the given function if the performed comparison returns false |


## How to use

The message `source is not google` will be displayed in console when utm_source != google.

```js
utm.is('utm_source')
  .equals('google')
  .then(() => {
    console.log('source is google')
  } )
  .otherwise(() => {
    console.log('source is not google')
  })
```

Using the function then() is optional.

```js
utm.is('utm_source')
  .equals('google')
  .otherwise(() => {
    console.log('source is not google')
  } )
```
