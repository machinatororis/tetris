var flash;
(function (flash) {
    var display3D;
    (function (display3D) {
        var Context3DWrapMode = (function () {
            function Context3DWrapMode() {
            }
            Context3DWrapMode.REPEAT = "repeat";
            Context3DWrapMode.CLAMP = "clamp";
            Context3DWrapMode.CLAMP_U_REPEAT_V = "clamp_u_repeat_v";
            Context3DWrapMode.REPEAT_U_CLAMP_V = "repeat_u_clamp_v";
            return Context3DWrapMode;
        }());
        display3D.Context3DWrapMode = Context3DWrapMode;
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Context3DWrapMode.js.map