require([
    'css/css!./TextBox.css',
    'some/path/to/b',
    'some/path/to/c'
], function (someCSS) {

    // do something with dep A
    varNameForA();

    // do something with dep B
    varNameForB();

});
