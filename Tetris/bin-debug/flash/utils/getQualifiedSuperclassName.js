var flash;
(function (flash) {
    var utils;
    (function (utils) {
        function getQualifiedSuperclassName(value) {
            return avmplus.getQualifiedSuperclassName(value);
        }
        utils.getQualifiedSuperclassName = getQualifiedSuperclassName;
    })(utils = flash.utils || (flash.utils = {}));
})(flash || (flash = {}));
//# sourceMappingURL=getQualifiedSuperclassName.js.map