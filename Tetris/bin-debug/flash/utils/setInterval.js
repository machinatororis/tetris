var flash;
(function (flash) {
    var utils;
    (function (utils) {
        function setInterval(closure, delay) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            delay = (+(delay));
            return window.setInterval.apply(null, arguments);
        }
        utils.setInterval = setInterval;
    })(utils = flash.utils || (flash.utils = {}));
})(flash || (flash = {}));
//# sourceMappingURL=setInterval.js.map