var flash;
(function (flash) {
    var utils;
    (function (utils) {
        function clearInterval(id) {
            id = ((id) >>> 0);
            window.clearInterval(id);
        }
        utils.clearInterval = clearInterval;
    })(utils = flash.utils || (flash.utils = {}));
})(flash || (flash = {}));
//# sourceMappingURL=clearInterval.js.map