var flash;
(function (flash) {
    var display3D;
    (function (display3D) {
        var Context3DCompareMode = (function () {
            function Context3DCompareMode() {
            }
            Context3DCompareMode.ALWAYS = "always";
            Context3DCompareMode.NEVER = "never";
            Context3DCompareMode.LESS = "less";
            Context3DCompareMode.LESS_EQUAL = "lessEqual";
            Context3DCompareMode.EQUAL = "equal";
            Context3DCompareMode.GREATER_EQUAL = "greaterEqual";
            Context3DCompareMode.GREATER = "greater";
            Context3DCompareMode.NOT_EQUAL = "notEqual";
            return Context3DCompareMode;
        }());
        display3D.Context3DCompareMode = Context3DCompareMode;
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Context3DCompareMode.js.map