# .parse()

Extract variables from the given string.

## Basic

Extract only utm variables (source, medium, campaign, term, content)

```javascript
var utm = UTMManager().parse( '?utm_source=source&utm_medium=medium&utm_campaign=campaign' );
```

## Extended variables

Extract utm variables and other variables informed in the second parameter.
The second parameter is always an array.

```javascript
var utm = UTMManager().parse( '?utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_extended=value', [ 'utm_extended' ] );
```

# .parseURL()

Extract variables from the given URL.

## Basic

Extract only utm variables (source, medium, campaign, term, content)

```javascript
var utm = UTMManager().parseURL( 'https://domain.com/?utm_source=source&utm_medium=medium&utm_campaign=campaign' );
```

## Extended variables

Extract utm variables and other variables informed in the second parameter.
The second parameter is always an array.

```javascript
var utm = UTMManager().parseURL( 'https://domain.com/?utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_extended=value', [ 'utm_extended' ] );
```
