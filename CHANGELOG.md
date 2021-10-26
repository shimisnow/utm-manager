Changelog
===========

### 2.0.0 - [2021-10-26]

**New features**

- Native support for use with RequireJS
- `BC` The UTMManager() cannot be used without parameters and the `new` keyword needs to be used

**Project improvements**

- The library can be tested with Jasmine using Node.js
- The process of build, lint and test can all be done with Docker containers
- Added ESLint to statically analyzes the code
- Library files separation to better code management
- Implementation of UTMManager.extend() to allow third-party functions
- Define of GitHub actions

### 1.1.0 - [2020-01-14]

**New features**

- Function add() included to be used to add one or more variables
- Function sort() included to be used to sort the registered variables
- Function filled() included to be used to verify if a variable is defined and has value

**Improvements**

- UTMManager constructor with an option to use a string as second parameter to register all variables from the given string/url

### 1.0.0 - [2020-01-14]

- The first stable version of this awesome library is here :-)
- Supports perform manipulations with the functions get(), remove(), set(), and toString()
- Supports perform verifications with the functions and(), defined(), empty(), equals(), not(), or(), and undefined()
- Supports taking action with the functions always(), otherwide(), and then()
