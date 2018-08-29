var flash;
(function (flash) {
    var display;
    (function (display) {
        var BlendMode = (function () {
            function BlendMode() {
            }
            BlendMode.NORMAL = "normal";
            BlendMode.LAYER = "layer";
            BlendMode.MULTIPLY = "multiply";
            BlendMode.SCREEN = "screen";
            BlendMode.LIGHTEN = "lighten";
            BlendMode.DARKEN = "darken";
            BlendMode.ADD = "add";
            BlendMode.SUBTRACT = "subtract";
            BlendMode.DIFFERENCE = "difference";
            BlendMode.INVERT = "invert";
            BlendMode.OVERLAY = "overlay";
            BlendMode.HARDLIGHT = "hardlight";
            BlendMode.ALPHA = "alpha";
            BlendMode.ERASE = "erase";
            BlendMode.SHADER = "shader";
            BlendMode.INTERSECT_INTERCHANGE = "intersectInterchange";
            return BlendMode;
        }());
        display.BlendMode = BlendMode;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=BlendMode.js.map