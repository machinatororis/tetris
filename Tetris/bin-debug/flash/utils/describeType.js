var flash;
(function (flash) {
    var utils;
    (function (utils) {
        utils.XML = global.XML;
        function describeType(value) {
            return avmplus.describeType(value, avmplus.FLASH10_FLAGS);
        }
        utils.describeType = describeType;
    })(utils = flash.utils || (flash.utils = {}));
})(flash || (flash = {}));
//# sourceMappingURL=describeType.js.map