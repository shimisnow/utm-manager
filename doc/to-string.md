# .toString()

Returns the utm variables in string format to be used in an URL.

#### .toString()

Return all the utm variables that is defined and is not empty.

```javascript
const utm = UTMManager(
  'https://domain.com/?utm_source=google&utm_medium=cpc&utm_campaign=campaign&utm_term=coding#hash',
  UTMManager.PARSE_URL
);

const result = utm.toString();
```
The value of result will be "utm_source=facebo&utm_medium=cpc&utm_campaign=campaign&utm_term=coding".


#### .toString( json )

The config json passed as parameter accepts three keys: utm, glue and empty.

- **utm** : variables to be concated. Default: all
- **glue** : the character/string to be used when concatening the variables. Default: &
- **empty** : when true, empty or undefined utm variables will be included. Default: false

**Examples**

```javascript
const utm = UTMManager(
  'https://domain.com/?utm_source=google&utm_medium=cpc&utm_campaign=campaign&utm_term=coding#hash',
  UTMManager.PARSE_URL
);
```

```javascript
result = utm.toString( { utm : [ 'utm_medium', 'utm_term' ] } );
// utm_medium=cpc&utm_term=coding
```

```javascript
result = utm.toString( { glue : '%' } );
// utm_source=google%utm_medium=cpc%utm_campaign=campaign%utm_term=coding
```

```javascript
result = utm.toString( { empty : true } );
// utm_source=google&utm_medium=cpc&utm_campaign=campaign&utm_term=coding&utm_content=
```

```javascript
result = utm.toString( {
  utm : [ 'utm_medium', 'utm_term' ]
  glue : '<>'
} );
// utm_medium=cpc<>utm_term=coding
```
