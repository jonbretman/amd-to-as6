(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        root.components = factory();
    }

}(this, function (jQuery) {

    return jQuery.version;

}));
