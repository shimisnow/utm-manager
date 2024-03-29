# .then()

`since 1.0.0`

Receives a function as parameter that will be executed when the action performed together with is() resulted in true.

```js
.then( function() { ... } )
```

## Function signatures

The following table presents all parameters combination that can be used in this function.

| PARAMETERS | SINCE | DESCRIPTION |
| ---------- | ----- | ----------- |
| function   | 1.0.0 | Executes the given function if the performed comparison returns true |

## How to use

### Basic use case

The message "source is google" will be displayed in console when utm_source=google.

```js
utm.is('utm_source')
  .equals('google')
  .then(() => {
    console.log('source is google')
  })
```

### Advanced use case

The message "source is google" will be displayed in console when utm_source=google and the messagem "source is facebook" when utm_source=facebook.

```js
utm.is('utm_source')
  .equals('google')
  .then(() => {
    console.log('source is google')
  })
  .equals('facebook')
  .then(() => {
    console.log('source is facebook')
  })
```
