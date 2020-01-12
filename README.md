## How to use

1. Download the the `utm-manager-x.y.z.zip` file from the [latest release](https://github.com/shimisnow/utm-manager/releases).
2. Include the `utm-manager.min.js` file in your project.

After this, you can do something as:

```javascript
const utm = UTMManager();
// this will parse the value of windows.location.href

utm.is( 'utm_source' ).equals( 'google' )
  .and().is( 'utm_medium' ).equals( 'cpc' )
  .then( function() {
    console.log( 'Hey! This is a paid campaign from google!' );
  } )
  .otherwise( function() {
    console.log( 'This is not a paid campaign from google!' );
  } );
```

or

```javascript
const utm = UTMManager();

var term = '';

// get utm_term if it exists and has value
utm.is( 'utm_term' )
  .defined().and().not( '' )
  .then( function() {
    term = utm.get( 'utm_term' );
  } );
```

The given examples are the simple ones. Read the documentation for the real thing.

## Documentation

UTMManager's documentation is included in the directory [doc](doc/) and each function can be viewed from the following links:

#### Basic

| function                         | since | |
| :------------------------------: | :---: | |
| [`UTMManager()`](doc/utm-manager.md) | 1.0.0 | Parses an URL or string and extract the utm variables |
| [`get()`](doc/get.md)                | 1.0.0 | Returns the value of one or more variables |
| [`set()`](doc/set.md)                | 1.0.0 | Sets the value of one or more variables |
| [`remove()`](doc/remove.md)          | 1.0.0 | Remove one or more variables from the UTMManager object |
| [`toString()`](doc/to-string.md)     | 1.0.0 | Returns some or all variables grouped as a string |

#### Advanced

| function                           | since | |
| :--------------------------------: | :---: | |
| [`is().defined()`](doc/defined.md)     | 1.0.0 | Verifies if one or more variables are defined |
| [`is().undefined()`](doc/undefined.md) | 1.0.0 | Verifies if one or more variables are undefined |
| [`is().empty()`](doc/empty.md)         | 1.0.0 | Verifies if one or more variables are empty |
| [`is().equals()`](doc/equals.md)       | 1.0.0 | Verifies if one or more variables are equals the given value |
| [`is().not()`](doc/not.md)             | 1.0.0 | Verifies if all given variables are different from the given value |
| [`then()`](doc/then.md)                | 1.0.0 | Execute if the performed verification with is() return true |
| [`otherwise()`](doc/otherwise.md)      | 1.0.0 | Execute if the performed verification with is() return false |
| [`always()`](doc/always.md)            | 1.0.0 | Execute if the performed verification with is() return either true or false |
| [`and()`](doc/and.md)                  | 1.0.0 | Performs an and operation with the result of two verification with is() |
| [`or()`](doc/or.md)                    | 1.0.0 | Performs an or operation with the result of two verification with is() |

## Versioning

The release cycle is maintained under the [Semantic Versioning guidelines](https://semver.org/).

## Bugs and feature requests

Have a bug or a feature request? Please first search for existing and closed issues. If your problem or idea is not addressed yet, please open a new issue.

## Copyright and license

Code and documentation copyright 2020 the UTM Manager Authors. Code released under the [MIT License](LICENSE.md).
