define([
    'some/path/to/a',
    'some/path/to/b',
    'some/path/to/c'
], function (varNameForA, varNameForB) {

    // do something with dep A
    varNameForA();

    // do something with dep B
    varNameForB();

    var a = { foo: 1 };
    var b = { ...a, bar: 2 };
});
