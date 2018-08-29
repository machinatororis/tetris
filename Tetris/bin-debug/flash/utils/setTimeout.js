var flash;
(function (flash) {
    var utils;
    (function (utils) {
        function setTimeout(closure, delay) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            delay = (+(delay));
            return window.setTimeout.apply(null, arguments);
        }
        utils.setTimeout = setTimeout;
    })(utils = flash.utils || (flash.utils = {}));
})(flash || (flash = {}));
//# sourceMappingURL=setTimeout.js.map