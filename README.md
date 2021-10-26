## How to use

- Download the `utm-manager-x.y.z.zip` file from the [latest release](https://github.com/shimisnow/utm-manager/releases).
- Include the `UTMManager` libray in your project.

Using the library with tag `<script>`:
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

The given examples are the simple ones. Read the [basic section](doc/examples/basic.md) and [advanced section](doc/examples/advanced.md) for more examples.

## Documentation

UTMManager's documentation is included in the directory [doc](doc/) and each function can be viewed from the following links:

#### Basic

| function                                       | since |      |
| :--------------------------------------------: | :---: | :--- |
| [`UTMManager()`](doc/functions/utm-manager.md) | 1.0.0 | Parses an URL or string and extract the utm variables |
| [`get()`](doc/functions/get.md)                | 1.0.0 | Returns the value of one or more variables |
| [`set()`](doc/functions/set.md)                | 1.0.0 | Sets the value of one or more variables |
| [`add()`](doc/functions/add.md)                | 1.1.0 | Adds one or more variables |
| [`remove()`](doc/functions/remove.md)          | 1.0.0 | Removes one or more variables |
| [`toString()`](doc/functions/to-string.md)     | 1.0.0 | Returns some or all variables grouped as a string |

#### Advanced

| function                                         | since |      |
| :----------------------------------------------: | :---: | :--- |
| [`is().defined()`](doc/functions/defined.md)     | 1.0.0 | Verifies if one or more variables are defined |
| [`is().undefined()`](doc/functions/undefined.md) | 1.0.0 | Verifies if one or more variables are undefined |
| [`is().empty()`](doc/functions/empty.md)         | 1.0.0 | Verifies if one or more variables are empty |
| [`is().filled()`](doc/functions/filled.md)       | 1.1.0 | Verifies if one or more variables are defined and has value |
| [`is().equals()`](doc/functions/equals.md)       | 1.0.0 | Verifies if one or more variables are equals the given value |
| [`is().not()`](doc/functions/not.md)             | 1.0.0 | Verifies if all given variables are different from the given value |
| [`then()`](doc/functions/then.md)                | 1.0.0 | Execute if the performed verification with is() return true |
| [`otherwise()`](doc/functions/otherwise.md)      | 1.0.0 | Execute if the performed verification with is() return false |
| [`always()`](doc/functions/always.md)            | 1.0.0 | Execute if the performed verification with is() return either true or false |
| [`and()`](doc/functions/and.md)                  | 1.0.0 | Performs an and operation with the result of two verification with is() |
| [`or()`](doc/functions/or.md)                    | 1.0.0 | Performs an or operation with the result of two verification with is() |
| [`sort()`](doc/functions/sort.md)                | 1.1.0 | Sorts the variables |

## How to build, lint and test

This tasks can be performed with Node.js or Docker containers. See the [developer documentation](doc/developer/main.md) for details.

## Versioning

The release cycle is maintained under the [Semantic Versioning guidelines](https://semver.org/).

## Bugs and feature requests

Have a bug or a feature request? Please first search for existing and closed issues. If your problem or idea is not addressed yet, please open a new issue.

## Copyright and license

Code and documentation copyright 2020 the UTM Manager Authors. Code released under the [MIT License](LICENSE.md).
