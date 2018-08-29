var flash;
(function (flash) {
    var display3D;
    (function (display3D) {
        var Context3DMipFilter = (function () {
            function Context3DMipFilter() {
            }
            Context3DMipFilter.MIPNONE = "mipnone";
            Context3DMipFilter.MIPNEAREST = "mipnearest";
            Context3DMipFilter.MIPLINEAR = "miplinear";
            return Context3DMipFilter;
        }());
        display3D.Context3DMipFilter = Context3DMipFilter;
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Context3DMipFilter.js.map