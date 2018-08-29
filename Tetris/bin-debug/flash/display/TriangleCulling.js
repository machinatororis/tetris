var flash;
(function (flash) {
    var display;
    (function (display) {
        var TriangleCulling = (function () {
            function TriangleCulling() {
            }
            TriangleCulling.NONE = "none";
            TriangleCulling.POSITIVE = "positive";
            TriangleCulling.NEGATIVE = "negative";
            return TriangleCulling;
        }());
        display.TriangleCulling = TriangleCulling;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TriangleCulling.js.map