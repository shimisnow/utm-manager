# .sort()

`since 1.1.0`

Sorts the variables.

## How to use

### Basic sorting

Will sort the variables in the order: utm_source, utm_medium, utm_campaign, utm_term and utm_content.

Any other variables will stay in the original order.

```js
const utm = new UTMManager('utm_medium=cpc&utm_campaign=campaign&utm_term=coding&utm_source=google&another=value');

utm.sort();

let result = utm.toString();
// utm_source=google&utm_medium=cpc&utm_campaign=campaign&utm_term=coding&another=value
```

Using `sort()` is identical to use `sort( 'strict' )`.

### Changing the sorting type

The sorting type can be changed passing a string as parameter.

The valid options are:

| type | description |
| :--: | ----------- |
| strict | Use the utm default order (see the basic sorting section) |
| lexical | Sorts all variables lexicographically (follows the alphabet) |
| strict-lexical | Use the utm default order first and sorts other variables lexicographically (follows the alphabet)  |

#### strict

```js
const utm = new UTMManager('utm_medium=cpc&utm_campaign=campaign&utm_term=coding&utm_source=google&variable=value&another=value');

utm.sort('strict');

let result = utm.toString();
// utm_source=google&utm_medium=cpc&utm_campaign=campaign&utm_term=coding&variable=value&another=value
```

#### lexical

```js
const utm = new UTMManager('utm_medium=cpc&utm_campaign=campaign&utm_term=coding&utm_source=google&variable=value&another=value');

utm.sort('lexical');

let result = utm.toString();
// another=value&utm_campaign=campaign&utm_medium=cpc&utm_source=google&utm_term=coding&variable=value
```

#### strict-lexical

```js
const utm = new UTMManager('utm_medium=cpc&utm_campaign=campaign&utm_term=coding&utm_source=google&variable=value&another=value');

utm.sort('strict-lexical');

let result = utm.toString();
// utm_source=google&utm_medium=cpc&utm_campaign=campaign&utm_term=coding&another=value&variable=value
```

## Function signatures

The following table presents all parameters combination that can be used in this function.

| PARAMETERS | SINCE | DESCRIPTION |
| ---------- | ----- | ----------- |
|            | 1.1.0 | Sorts the variables in the default utm order |
| string     | 1.1.0 | Sorts the variables using a pre-defined order |
