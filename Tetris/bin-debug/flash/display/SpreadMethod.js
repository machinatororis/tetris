var flash;
(function (flash) {
    var display;
    (function (display) {
        var SpreadMethod = (function () {
            function SpreadMethod() {
            }
            SpreadMethod.PAD = "pad";
            SpreadMethod.REFLECT = "reflect";
            SpreadMethod.REPEAT = "repeat";
            return SpreadMethod;
        }());
        display.SpreadMethod = SpreadMethod;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SpreadMethod.js.map