define(['a', 'b'], function (a) {

    var b = require('b');

    return function () {
        a(b());
    }

});
