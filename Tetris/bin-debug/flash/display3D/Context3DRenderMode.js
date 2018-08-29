var flash;
(function (flash) {
    var display3D;
    (function (display3D) {
        var Context3DRenderMode = (function () {
            function Context3DRenderMode() {
            }
            Context3DRenderMode.AUTO = "auto";
            Context3DRenderMode.SOFTWARE = "software";
            return Context3DRenderMode;
        }());
        display3D.Context3DRenderMode = Context3DRenderMode;
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Context3DRenderMode.js.map