var flash;
(function (flash) {
    var display3D;
    (function (display3D) {
        var Context3DBufferUsage = (function () {
            function Context3DBufferUsage() {
            }
            Context3DBufferUsage.STATIC_DRAW = "staticDraw";
            Context3DBufferUsage.DYNAMIC_DRAW = "dynamicDraw";
            return Context3DBufferUsage;
        }());
        display3D.Context3DBufferUsage = Context3DBufferUsage;
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Context3DBufferUsage.js.map