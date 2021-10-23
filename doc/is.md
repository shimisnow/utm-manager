# .is()

`since 1.0.0`

Define which variable(s) must be compared.

Use this with [defined()](defined.md), [undefined()](undefined.md), [empty()](empty.md), [equals()](equals.md) or [not()](not.md).

## How to use

Verify only one variable

```js
utm.is( 'utm_source' )
```

Verify multiple variables

```js
utm.is(['utm_source', 'utm_medium'])
```

## Function signatures

The following table presents all parameters combination that can be used in this function.

| PARAMETERS | SINCE | DESCRIPTION |
| ---------- | ----- | ----------- |
| string     | 1.0.0 | Process one variable |
| array      | 1.0.0 | Process multiple variables |
