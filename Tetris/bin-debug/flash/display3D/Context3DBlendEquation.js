var flash;
(function (flash) {
    var display3D;
    (function (display3D) {
        var Context3DBlendEquation = (function () {
            function Context3DBlendEquation() {
            }
            Context3DBlendEquation.ADD = "add";
            Context3DBlendEquation.SUBTRACT = "subtract";
            Context3DBlendEquation.REVERSE_SUBTRACT = "reverseSubtract";
            Context3DBlendEquation.MIN = "min";
            Context3DBlendEquation.MAX = "max";
            return Context3DBlendEquation;
        }());
        display3D.Context3DBlendEquation = Context3DBlendEquation;
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Context3DBlendEquation.js.map