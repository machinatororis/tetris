var flash;
(function (flash) {
    var utils;
    (function (utils) {
        function unescapeMultiByte(value) {
            value = as(value, 'String');
            return decodeURIComponent(value);
        }
        utils.unescapeMultiByte = unescapeMultiByte;
    })(utils = flash.utils || (flash.utils = {}));
})(flash || (flash = {}));
//# sourceMappingURL=unescapeMultiByte.js.map