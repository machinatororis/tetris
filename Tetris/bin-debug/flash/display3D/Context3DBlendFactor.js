var flash;
(function (flash) {
    var display3D;
    (function (display3D) {
        var Context3DBlendFactor = (function () {
            function Context3DBlendFactor() {
            }
            Context3DBlendFactor.ONE = "one";
            Context3DBlendFactor.ZERO = "zero";
            Context3DBlendFactor.SOURCE_ALPHA = "sourceAlpha";
            Context3DBlendFactor.SOURCE_COLOR = "sourceColor";
            Context3DBlendFactor.ONE_MINUS_SOURCE_ALPHA = "oneMinusSourceAlpha";
            Context3DBlendFactor.ONE_MINUS_SOURCE_COLOR = "oneMinusSourceColor";
            Context3DBlendFactor.DESTINATION_ALPHA = "destinationAlpha";
            Context3DBlendFactor.DESTINATION_COLOR = "destinationColor";
            Context3DBlendFactor.ONE_MINUS_DESTINATION_ALPHA = "oneMinusDestinationAlpha";
            Context3DBlendFactor.ONE_MINUS_DESTINATION_COLOR = "oneMinusDestinationColor";
            return Context3DBlendFactor;
        }());
        display3D.Context3DBlendFactor = Context3DBlendFactor;
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Context3DBlendFactor.js.map