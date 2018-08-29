var flash;
(function (flash) {
    var display3D;
    (function (display3D) {
        var Context3DProgramType = (function () {
            function Context3DProgramType() {
            }
            Context3DProgramType.VERTEX = "vertex";
            Context3DProgramType.FRAGMENT = "fragment";
            return Context3DProgramType;
        }());
        display3D.Context3DProgramType = Context3DProgramType;
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Context3DProgramType.js.map