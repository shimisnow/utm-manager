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
| [`UTMManager()`](utm-manager.md) | 1.0.0 |
| [`get()`](get.md)                | 1.0.0 |
| [`set()`](set.md)                | 1.0.0 |
| [`remove()`](remove.md)          | 1.0.0 |
| [`toString()`](to-string.md)     | 1.0.0 |

#### Advanced

| function                           | since |
| :--------------------------------: | :---: |
| [`is().defined()`](defined.md)     | 1.0.0 |
| [`is().undefined()`](undefined.md) | 1.0.0 |
| [`is().empty()`](empty.md)         | 1.0.0 |
| [`is().equals()`](equals.md)       | 1.0.0 |
| [`is().not()`](not.md)             | 1.0.0 |
| [`then()`](then.md)                | 1.0.0 |
| [`otherwise()`](otherwise.md)      | 1.0.0 |
| [`always()`](always.md)            | 1.0.0 |
| [`and()`](and.md)                  | 1.0.0 |
| [`or()`](or.md)                    | 1.0.0 |


## Versioning

The release cycle is maintained under the [Semantic Versioning guidelines](https://semver.org/).

## Bugs and feature requests

Have a bug or a feature request? Please first search for existing and closed issues. If your problem or idea is not addressed yet, please open a new issue.

## Copyright and license

Code and documentation copyright 2020 the UTM Manager Authors. Code released under the [MIT License](LICENSE.md).
