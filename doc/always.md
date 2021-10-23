# .always()

`since 1.0.0`

Receives a function as parameter that will always be executed.

```js
.always(function() { ... })
```

## How to use

The follow code display the message `source is google` when utm_source = google, display the message `source is not google` when utm_source != google and always display the message `always execute`.

```js
utm.is('utm_source')
  .equals('google')
  .then(() => {
    console.log('source is google')
  })
  .equals('facebook').then(() => {
    console.log('source is facebook')
  })
  .always(() => {
    console.log('always execute')
  });
```

## Function signatures

The following table presents all parameters combination that can be used in this function.

| PARAMETERS | SINCE | DESCRIPTION |
| ---------- | ----- | ----------- |
| function   | 1.0.0 | Executes the given function if the performed comparison returns either true or false  |
