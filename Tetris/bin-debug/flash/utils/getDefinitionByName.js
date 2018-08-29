var flash;
(function (flash) {
    var utils;
    (function (utils) {
        function getDefinitionByName(name) {
            name = as(name, 'String');
            if (typeof name != 'string') {
                throw new ArgumentError('ArgumentError: Error #1507: Argument name cannot be null.', 1507);
            }
            if (name.indexOf('::') >= 0) {
                try {
                    return eval(name.replace('::', '.'));
                }
                catch (e) {
                    e = window.asc.e2e(e);
                }
            }
            else {
                try {
                    return eval(name);
                }
                catch (e) {
                    e = window.asc.e2e(e);
                }
                try {
                    return eval('global.' + name);
                }
                catch (e) {
                    e = window.asc.e2e(e);
                }
            }
            throw new ArgumentError('Error #1065: Variable ' + name + ' is not defined.', 1065);
        }
        utils.getDefinitionByName = getDefinitionByName;
    })(utils = flash.utils || (flash.utils = {}));
})(flash || (flash = {}));
//# sourceMappingURL=getDefinitionByName.js.map