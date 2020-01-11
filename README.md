## How to use

1. Download the the file utm-manager.min.js from the [latest release](https://github.com/shimisnow/utm-manager/releases).
2. Include the file in your project.

After the steps above, you can do:

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

## Documentation

UTMManager's documentation is included in the directory [doc](doc/) and each function can be viewed from the following links:

#### Basic

| function                         | since |
| :------------------------------: | :---: |
| [`UTMManager()`](doc/utm-manager.md) | 1.0.0 |
| [`get()`](doc/get.md)                | 1.0.0 |
| [`set()`](doc/set.md)                | 1.0.0 |
| [`remove()`](doc/remove.md)          | 1.0.0 |
| [`toString()`](doc/to-string.md)     | 1.0.0 |

#### Advanced

| function                           | since |
| :--------------------------------: | :---: |
| [`is().defined()`](doc/defined.md)     | 1.0.0 |
| [`is().undefined()`](doc/undefined.md) | 1.0.0 |
| [`is().empty()`](doc/empty.md)         | 1.0.0 |
| [`is().equals()`](doc/equals.md)       | 1.0.0 |
| [`is().not()`](doc/not.md)             | 1.0.0 |
| [`then()`](doc/then.md)                | 1.0.0 |
| [`otherwise()`](doc/otherwise.md)      | 1.0.0 |
| [`always()`](doc/always.md)            | 1.0.0 |
| [`and()`](doc/and.md)                  | 1.0.0 |
| [`or()`](doc/or.md)                    | 1.0.0 |


## Versioning

The release cycle is maintained under the [Semantic Versioning guidelines](https://semver.org/).

## Bugs and feature requests

Have a bug or a feature request? Please first search for existing and closed issues. If your problem or idea is not addressed yet, please open a new issue.

## Copyright and license

Code and documentation copyright 2020 the UTM Manager Authors. Code released under the [MIT License](LICENSE.md).
