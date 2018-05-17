define([
    'some/path/to/a',
    'some/path/to/b',
    'some/path/to/c'
], (varNameForA, varNameForB) => {

    // do something with dep A
    varNameForA();

    // do something with dep B
    varNameForB();

});
