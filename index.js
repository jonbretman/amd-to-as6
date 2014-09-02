var falafel = require('falafel');
var beautify = require('js-beautify').js_beautify;
var exportDefaultString = 'export default ';

/**
 * Converts some code from AMD to ES6
 * @param {String} source
 * @returns {String}
 */
module.exports = function convert (source) {

    return falafel(source, function (node) {

        // only interested in require() or define() calls
        if (!isRequireOrDefine(node)) {
            return;
        }

        var modulePaths = [];
        var importNames = [];
        var depsArray = node.arguments.length > 1 ? node.arguments[0] : null;
        var moduleFunc = node.arguments[node.arguments.length > 1 ? 1 : 0];
        var hasDeps = depsArray && depsArray.elements.length > 0;
        var moduleCode = getModuleCode(moduleFunc);

        if (hasDeps) {

            modulePaths = depsArray.elements.map(function (element) {
                return element.raw;
            });

            importNames = moduleFunc.params.map(function (param) {
                return param.name;
            });

            // add import statements to module code
            moduleCode = getImportStatements(modulePaths, importNames).join('\n') + moduleCode;

        }

        // fix indentation
        moduleCode = beautify(moduleCode);

        // jsbeautify doesn't understand es6 module syntax yet
        moduleCode = moduleCode.replace(/export[\s\S]default /, exportDefaultString);

        // update the node with the new es6 code
        node.parent.update(moduleCode);

    }).toString();

};

/**
 * Given an array or modulePaths and importNames
 * returns an array of import statements.
 * @param {String[]} modulePaths
 * @param {String[]} importNames
 * @returns {String[]}
 */
function getImportStatements (modulePaths, importNames) {
    return modulePaths.map(function (modulePath, index) {

        var importStatement = 'import ';

        // it's possible for this import to not be assigned to any variable
        if (importNames[index]) {
            importStatement += importNames[index] + ' from ';
        }

        return importStatement + modulePath + ';';

    });
}

/**
 *
 * @param moduleFuncNode
 */
function updateReturnStatement (moduleFuncNode) {

    var returnStatement = moduleFuncNode.body.body.filter(function (node) {
        return node.type === 'ReturnStatement';
    })[0];

    // if there is a return statement update to be a default export
    if (returnStatement) {
        returnStatement.update(returnStatement.source().replace('return ', exportDefaultString));
    }

}

/**
 *
 * @param {Object} moduleFuncNode
 * @returns {String}
 */
function getModuleCode (moduleFuncNode) {

    updateReturnStatement(moduleFuncNode);

    var moduleCode = moduleFuncNode.body.source();

    // strip '{' and '}' from beginning and end
    moduleCode = moduleCode.substring(1);
    moduleCode = moduleCode.substring(0, moduleCode.length - 1);

    return moduleCode;
}

/**
 * Returns true if the node is a require() or define() CallExpression.
 * @param {Object} node
 * @returns {boolean}
 */
function isRequireOrDefine (node) {
    return node.type === 'CallExpression' && ['define', 'require'].indexOf(node.callee.name) !== -1;
}
