var flash;
(function (flash) {
    var display3D;
    (function (display3D) {
        var Context3DClearMask = (function () {
            function Context3DClearMask() {
            }
            Context3DClearMask.COLOR = 1 << 0;
            Context3DClearMask.DEPTH = 1 << 1;
            Context3DClearMask.STENCIL = 1 << 2;
            Context3DClearMask.ALL = asc.sti(Context3DClearMask, function () { Context3DClearMask.ALL = Context3DClearMask.COLOR | Context3DClearMask.DEPTH | Context3DClearMask.STENCIL; });
            return Context3DClearMask;
        }());
        display3D.Context3DClearMask = Context3DClearMask;
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Context3DClearMask.js.map