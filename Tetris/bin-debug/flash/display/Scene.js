var flash;
(function (flash) {
    var display;
    (function (display) {
        var Scene = (function () {
            function Scene() {
            }
            Object.defineProperty(Scene.prototype, "labels", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scene.prototype, "name", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scene.prototype, "numFrames", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            return Scene;
        }());
        display.Scene = Scene;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Scene.js.map