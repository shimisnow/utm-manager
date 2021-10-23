## How to use

- Download the the `utm-manager-x.y.z.zip` file from the [latest release](https://github.com/shimisnow/utm-manager/releases).
- Include the `UTMManager` libray in your project.

Using the library with the tag `<script>`:
```html
<script src="utm-manager.min.js" type="text/javascript"></script>
```

Using the library with [RequireJS](https://requirejs.org/):
```js
requirejs(['UTMManager'], (UTMManager) => {
  ...
})
```


After loading the library you can do something as:

```js
const utm = new UTMManager('https://domain.net/?utm_source=google&utm_medium=cpc&utm_campaign=campaign-01');

utm.is('utm_source')
  .equals('google')
  .and()
  .is('utm_medium')
  .equals('cpc')
  .then(() => {
    console.log('Hey! This is a paid campaign from google!')
  })
  .otherwise(() => {
    console.log('This is not a paid campaign from google!')
  });
```

or

```js
const utm = new UTMManager('https://domain.net/?utm_source=google&utm_medium=cpc&utm_campaign=campaign-01&utm_term=term-01')

let term = '';

// get utm_term if it exists and has value
utm.is('utm_term')
  .filled()
  .then(() => {
    term = utm.get( 'utm_term' )
  });
```

The given examples are the simple ones. Read the [basic section](examples/basic.md) and [advanced section](examples/advanced.md) for more examples.

## Documentation

UTMManager's documentation is included in the directory [doc](doc/) and each function can be viewed from the following links:

#### Basic

| function                             | since |      |
| :----------------------------------: | :---: | :--- |
| [`UTMManager()`](doc/utm-manager.md) | 1.0.0 | Parses an URL or string and extract the utm variables |
| [`get()`](doc/get.md)                | 1.0.0 | Returns the value of one or more variables |
| [`set()`](doc/set.md)                | 1.0.0 | Sets the value of one or more variables |
| [`add()`](doc/add.md)                | 1.1.0 | Adds one or more variables |
| [`remove()`](doc/remove.md)          | 1.0.0 | Removes one or more variables |
| [`toString()`](doc/to-string.md)     | 1.0.0 | Returns some or all variables grouped as a string |

#### Advanced

| function                               | since |      |
| :------------------------------------: | :---: | :--- |
| [`is().defined()`](doc/defined.md)     | 1.0.0 | Verifies if one or more variables are defined |
| [`is().undefined()`](doc/undefined.md) | 1.0.0 | Verifies if one or more variables are undefined |
| [`is().empty()`](doc/empty.md)         | 1.0.0 | Verifies if one or more variables are empty |
| [`is().filled()`](doc/filled.md)       | 1.1.0 | Verifies if one or more variables are defined and has value |
| [`is().equals()`](doc/equals.md)       | 1.0.0 | Verifies if one or more variables are equals the given value |
| [`is().not()`](doc/not.md)             | 1.0.0 | Verifies if all given variables are different from the given value |
| [`then()`](doc/then.md)                | 1.0.0 | Execute if the performed verification with is() return true |
| [`otherwise()`](doc/otherwise.md)      | 1.0.0 | Execute if the performed verification with is() return false |
| [`always()`](doc/always.md)            | 1.0.0 | Execute if the performed verification with is() return either true or false |
| [`and()`](doc/and.md)                  | 1.0.0 | Performs an and operation with the result of two verification with is() |
| [`or()`](doc/or.md)                    | 1.0.0 | Performs an or operation with the result of two verification with is() |
| [`sort()`](doc/sort.md)                | 1.1.0 | Sorts the variables |

## Versioning

The release cycle is maintained under the [Semantic Versioning guidelines](https://semver.org/).

## Bugs and feature requests

Have a bug or a feature request? Please first search for existing and closed issues. If your problem or idea is not addressed yet, please open a new issue.

## Copyright and license

Code and documentation copyright 2020 the UTM Manager Authors. Code released under the [MIT License](LICENSE.md).
