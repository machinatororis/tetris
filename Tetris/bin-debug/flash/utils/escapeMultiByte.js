var flash;
(function (flash) {
    var utils;
    (function (utils) {
        function escapeMultiByte(value) {
            value = as(value, 'String');
            return encodeURIComponent(value);
        }
        utils.escapeMultiByte = escapeMultiByte;
    })(utils = flash.utils || (flash.utils = {}));
})(flash || (flash = {}));
//# sourceMappingURL=escapeMultiByte.js.map