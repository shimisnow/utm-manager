# Advanced examples

## Taking action based on values

Verifying if the source is google

```js
const utm = new UTMManager('?utm_source=google&utm_medium=cpc&utm_campaign=01123581321');

utm.is('utm_source')
  .equals('google')
  .then(() => {
    console.log('Hey! It is from google');
  });
```

Verifying if the source is google and the medium is cpc

```js
const utm = new UTMManager('?utm_source=google&utm_medium=cpc&utm_campaign=01123581321');

utm.is(['utm_source', 'utm_medium'])
  .equals(['google', 'cpc'])
  .then(() => {
    console.log('Hey! It is from a paid google campaign');
  })
  .otherwise(() => {
    console.log('It is not from google');
  });
```

Verifying if the source is google or facebook and the medium is cpc

```js
const utm = new UTMManager('?utm_source=google&utm_medium=cpc&utm_campaign=01123581321');

utm.is(['utm_source', 'utm_medium'])
  .equals([['google', 'facebook'], 'cpc'])
  .then(() => {
    console.log('Hey! It is from a paid google/facebook campaign');
  })
  .otherwise(() => {
    console.log('It is not from google or facebook or it is not a paid campaign');
  });
```

## Taking action based on multiple verifications

Verifying if the source is google and the medium is cpc. It is the same as the last example, but using the and() function.

```js
const utm = new UTMManager('?utm_source=google&utm_medium=cpc&utm_campaign=01123581321');

utm.is('utm_source')
  .equals('google')
  .and()
  .is('utm_medium')
  .equals('cpc')
  .then(() => {
    console.log('Hey! It is from a paid google campaign');
  });
```

Verifying if the source is google or facebook and the medium is cpc.

```js
const utm = new UTMManager('?utm_source=google&utm_medium=cpc&utm_campaign=01123581321');

utm.is('utm_source')
  .equals('google')
  .or()
  .equals('facebook')
  .and()
  .is('utm_medium')
  .equals('cpc')
  .then(() => {
    console.log('Hey! It is from a paid google/facebook campaign');
  });
```

## Using some kind of switch-case

```js
const utm = new UTMManager('?utm_source=google&utm_medium=cpc&utm_campaign=01123581321');

utm.is('utm_source')
  .equals('google')
  .then(() => {
    console.log('Hey! It is from google');
  })
  .equals('facebook')
  .then(() => {
    console.log('Hey! It is from facebook');
  });
```
