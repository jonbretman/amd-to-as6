var amdToEs6 = require('../index');
var fs = require('fs');

var readFile = function (name) {
    return fs.readFileSync('test/examples/' + name + '.js', 'utf8');
};

var makeTest = function (name) {

    exports['test ' + name.replace(/-/g, ' ')] = function (test) {
        test.equal(amdToEs6(readFile(name)), readFile(name + '-expected'));
        test.done();
    };

};

makeTest('define-with-deps');
makeTest('define-no-deps');
makeTest('require-with-deps');
makeTest('require-no-deps');
makeTest('inline-sync-requires');

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
