var flash;
(function (flash) {
    var utils;
    (function (utils) {
        function getQualifiedClassName(value) {
            return avmplus.getQualifiedClassName(value);
        }
        utils.getQualifiedClassName = getQualifiedClassName;
    })(utils = flash.utils || (flash.utils = {}));
})(flash || (flash = {}));
//# sourceMappingURL=getQualifiedClassName.js.map