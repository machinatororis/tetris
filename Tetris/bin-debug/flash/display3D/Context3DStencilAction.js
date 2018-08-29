var flash;
(function (flash) {
    var display3D;
    (function (display3D) {
        var Context3DStencilAction = (function () {
            function Context3DStencilAction() {
            }
            Context3DStencilAction.KEEP = "keep";
            Context3DStencilAction.ZERO = "zero";
            Context3DStencilAction.INCREMENT_SATURATE = "incrementSaturate";
            Context3DStencilAction.DECREMENT_SATURATE = "decrementSaturate";
            Context3DStencilAction.INVERT = "invert";
            Context3DStencilAction.INCREMENT_WRAP = "incrementWrap";
            Context3DStencilAction.DECREMENT_WRAP = "decrementWrap";
            Context3DStencilAction.SET = "set";
            return Context3DStencilAction;
        }());
        display3D.Context3DStencilAction = Context3DStencilAction;
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Context3DStencilAction.js.map