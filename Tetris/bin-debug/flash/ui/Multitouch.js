var flash;
(function (flash) {
    var ui;
    (function (ui) {
        var Multitouch = (function () {
            function Multitouch() {
            }
            Object.defineProperty(Multitouch, "inputMode", {
                get: function () { return null; },
                set: function (param1) { param1 = as(param1, 'String'); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Multitouch, "supportsTouchEvents", {
                get: function () {
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Multitouch, "supportsGestureEvents", {
                get: function () {
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Multitouch, "supportedGestures", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Multitouch, "maxTouchPoints", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Multitouch, "mapTouchToMouse", {
                get: function () { return false; },
                set: function (param1) { param1 = Boolean(param1); },
                enumerable: true,
                configurable: true
            });
            return Multitouch;
        }());
        ui.Multitouch = Multitouch;
    })(ui = flash.ui || (flash.ui = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Multitouch.js.map