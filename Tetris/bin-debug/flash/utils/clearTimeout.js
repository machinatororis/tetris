var flash;
(function (flash) {
    var utils;
    (function (utils) {
        function clearTimeout(id) {
            id = ((id) >>> 0);
            window.clearTimeout(id);
        }
        utils.clearTimeout = clearTimeout;
    })(utils = flash.utils || (flash.utils = {}));
})(flash || (flash = {}));
//# sourceMappingURL=clearTimeout.js.map