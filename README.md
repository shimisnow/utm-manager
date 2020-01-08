## How to use

1. Download the the file utm-manager.min.js from the [latest release](https://github.com/shimisnow/utm-manager/releases).
2. Include the file in your project.

After the steps above, you can do:

```javascript
const utm = UTMManager();
// this will parse the value of windows.location.href

utm.is( 'utm_source' )
  .equals( 'google' )
  .and()
  .is( 'utm_medium' )
  .equals( 'cpc' )
  .then( function() {
    console.log( 'Hey! This is a paid campaign from google!' );
  } );
```

For more details how to use see the [guide of examples](examples/basic.md).

## Documentation
UTMManager's documentation is included in this repo in the doc directory as Markdown files.

## Versioning

The release cycle is maintained under the [Semantic Versioning guidelines](https://semver.org/).

## Bugs and feature requests

Have a bug or a feature request? Please first search for existing and closed issues. If your problem or idea is not addressed yet, please open a new issue.

## Copyright and license

Code and documentation copyright 2020 the UTM Manager Authors. Code released under the [MIT License](LICENSE.md).
