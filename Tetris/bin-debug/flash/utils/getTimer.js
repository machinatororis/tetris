var flash;
(function (flash) {
    var utils;
    (function (utils) {
        function getTimer() {
            return Date.now() - window.asc.startTime;
        }
        utils.getTimer = getTimer;
    })(utils = flash.utils || (flash.utils = {}));
})(flash || (flash = {}));
//# sourceMappingURL=getTimer.js.map