var flash;
(function (flash) {
    var display;
    (function (display) {
        var InterpolationMethod = (function () {
            function InterpolationMethod() {
            }
            InterpolationMethod.RGB = "rgb";
            InterpolationMethod.LINEAR_RGB = "linearRGB";
            return InterpolationMethod;
        }());
        display.InterpolationMethod = InterpolationMethod;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=InterpolationMethod.js.map