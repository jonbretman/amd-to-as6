var amdToEs6 = require('../index');
var fs = require('fs');

var readFile = function (name) {
    return fs.readFileSync('test/examples/' + name + '.js', 'utf8');
};

var makeTest = function (name) {

    exports['test ' + name.replace(/-/g, ' ')] = function (test) {
        test.equal(amdToEs6(readFile(name), {beautify: true}), readFile(name + '-expected'));
        test.done();
    };

};
makeTest('define-with-deps');
makeTest('define-no-deps');
makeTest('require-with-deps');
makeTest('require-no-deps');
makeTest('inline-sync-requires');
makeTest('preserve-quotes');
makeTest('use-strict');

var makeErrorCaseTest = function (name, message) {

    exports['test ' + name.replace(/-/g, ' ') + ' throws error'] = function (test) {
        test.throws(function () {
            amdToEs6(readFile(name));
        }, new RegExp(message));
        test.done();
    };

};
makeErrorCaseTest('multiple-module-definitions', 'Found multiple module definitions in one file.');
makeErrorCaseTest('named-define', 'Found a named define - this is not supported.');
makeErrorCaseTest('umd-module', 'Found a define using a variable as the callback - this is not supported.');
makeErrorCaseTest('nested-module-definitions', 'Found multiple module definitions in one file.');
makeErrorCaseTest('dynamic-module-names', 'Dynamic module names are not supported.');

exports['test no beautify'] = function (test) {
     test.equal(amdToEs6(readFile('no-beautify'), {beautify: false}), readFile('no-beautify-expected'));
     test.done();
};
