# AMD to ES6 module transpiler

[![Build Status](https://travis-ci.org/jonbretman/amd-to-as6.svg?branch=master)](https://travis-ci.org/jonbretman/amd-to-as6)

### What is it?
A simple tool for converting AMD modules into ES6 modules, either via the command line or programatically.

### Why?
Converting a large project from AMD modules to ES6 modules manually would be a very time consuming and boring task.

### Installing

```sh
npm install amd-to-es6 -g
```

### Usage

You can convert either a single file or a whole directory. By default `amdtoes6` will **NOT** modifiy the existing files, but the `--in-place` option to do this. 


To convert a single file:

```sh
# es6 code will be printed to stdout
amdtoes6 some-file.js

# some-file.js will be modified
amd2toes6 some-file.js --in-place
```

To convert a whole directory.

```sh
# a new directory called es6 will be created
amdtoes6 --dir src/ --out es6/

# modified all files in the directory
amdtoes6 --dir src/ --in-place
```

### Examples

Modules without dependencies.

**AMD**
```js
define(function () {
    return {};
});
```

**ES6**
```js
export default {};
```

---

Modules with dependencies.

**AMD**
```js
define(['path/to/a', 'path/to/b'], function (a, b) {
    return function (x) {
        return a(b(x));
    };
});
```

**ES6**
```js
import a from 'path/to/a';
import b from 'path/to/b';

export default function (x) {
    return a(b(x));
};
```

---

If you have AMD modules that look like this, where not all dependencies are assigned to parameters but accessed in the module using `require`, `amdtoes6` will have to create some variable names. You wil probably want to change these.

**AMD**
```js
define(['require', 'path/to/a', 'path/to/b'], function (require) {
    return function (x) {
        var a = require('a');
        var b = require('b');
        return a(b(x));
    };
});
```

**ES6**
```js
import $__path_to_a from 'path/to/a';
import $__path_to_b from 'path/to/b';

export default function (x) {
    var a = $__path_to_a;
    var b = $__path_to_b;
    return a(b(x));
};
```

---

Imports for side-effects.

**AMD**
```js
define(['path/to/a', 'path/to/b'], function () {
    return {};
});
```

**ES6**
```js
import 'path/to/a';
import 'path/to/b';

export default {};
```
