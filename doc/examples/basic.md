# Basic examples

## Getting the value

You can get only one value

```js
const utm = new UTMManager('?utm_source=google&utm_medium=cpc&utm_campaign=01123581321');

let medium = utm.get('utm_medium');
// 'cpc'
```

Or multiple values

```js
const utm = new UTMManager('?utm_source=google&utm_medium=cpc&utm_campaign=01123581321');

let source_medium = utm.get(['utm_source', 'utm_medium']);
// [ 'google', 'cpc' ]
```

## Verifying if the variable exists

```js
const utm = new UTMManager('?utm_source=google&utm_medium=cpc&utm_campaign=01123581321&utm_term=');

let medium = utm.is('utm_source').defined().result();
// true

let term = utm.is('utm_term').defined().result();
// true

let content = utm.is('utm_content').defined().result();
// false
```

It is necessary to use the result() function to get the boolean result. See the [advanced examples](advanced.md) section to more details.

## Verifying if the variable exists and has value

```js
const utm = new UTMManager('?utm_source=google&utm_medium=cpc&utm_campaign=01123581321&utm_term=');

let medium = utm.is('utm_medium').filled().result();
// true

let term = utm.is('utm_term').filled().result();
// false
```

## Verifying if the variable exists and is empty

```js
const utm = new UTMManager('?utm_source=google&utm_medium=cpc&utm_campaign=01123581321&utm_term=');

let term = utm.is('utm_term').defined().and().empty().result();
// true
```

It is necessary to use the defined function because empty() will return true if the variable do not exists.

```js
const utm = new UTMManager('?utm_source=google&utm_medium=cpc&utm_campaign=01123581321&utm_term=');

let content = utm.is('utm_content').empty().result();
// true
```

## Changing the value of a variable

```js
const utm = new UTMManager('?utm_source=google&utm_medium=cpc&utm_campaign=01123581321');

let old = utm.get('utm_campaign');
// '01123581321'

utm.set('utm_campaign', 'campaign');

let changed = utm.get('utm_campaign');
// 'campaign'
```

## Adding a variable to the list

```js
const utm = new UTMManager('?utm_source=google&utm_medium=cpc&utm_campaign=01123581321');

let old = utm.toString();
// 'utm_source=google&utm_medium=cpc&utm_campaign=01123581321'

utm.add('utm_term', 'term');

let changed = utm.toString();
// 'utm_source=google&utm_medium=cpc&utm_campaign=01123581321&utm_term=term'
```
