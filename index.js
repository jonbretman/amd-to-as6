var falafel = require('falafel');
var beautify = require('js-beautify').js_beautify;

var getImportStatements = function (modulePaths, importNames) {
    return modulePaths.map(function (modulePath, index) {

        var importStatement = 'import ';

        // it's possible for this import to not be assigned to any variable
        if (importNames[index]) {
            importStatement += importNames[index] + ' from ';
        }

        return importStatement + modulePath + ';';

    });
};

var isRequireOrDefine = function (node) {
    return node.type === 'CallExpression' && ['define', 'require'].indexOf(node.callee.name) !== -1;
};

var amdToES6 = function (source) {

    return falafel(source, function (node) {

        if (!isRequireOrDefine(node)) {
            return;
        }

        var modulePaths = [];
        var importNames = [];

        var depsArray = node.arguments.length > 1 ? node.arguments[0] : null;
        var moduleFunc = node.arguments[node.arguments.length > 1 ? 1 : 0];

        var hasDeps = depsArray && depsArray.elements.length > 0;

        var returnStatement = moduleFunc.body.body.filter(function (node) {
            return node.type === 'ReturnStatement';
        })[0];

        if (returnStatement) {
            returnStatement.update(returnStatement.source().replace('return ', 'export default '));
        }

        var moduleCode = moduleFunc.body.source();

        // strip '{' and '}' from beginning and end
        moduleCode = moduleCode.substring(1);
        moduleCode = moduleCode.substring(0, moduleCode.length - 1);


        if (hasDeps) {

            modulePaths = depsArray.elements.map(function (element) {
                return element.raw;
            });

            importNames = moduleFunc.params.map(function (param) {
                return param.name;
            });

            var importStatements = getImportStatements(modulePaths, importNames);

            moduleCode = importStatements.join('\n') + moduleCode;

        }

        // beautify the module
        moduleCode = beautify(moduleCode);

        // jsbeautify doesn't understand es6 module syntax yet
        moduleCode = moduleCode.replace(/export[\s\S]default/, 'export default');

        node.parent.update(moduleCode);

    });

};

module.exports = amdToES6;
