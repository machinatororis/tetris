var flash;
(function (flash) {
    var display;
    (function (display) {
        var GradientType = (function () {
            function GradientType() {
            }
            GradientType.LINEAR = "linear";
            GradientType.RADIAL = "radial";
            return GradientType;
        }());
        display.GradientType = GradientType;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GradientType.js.map