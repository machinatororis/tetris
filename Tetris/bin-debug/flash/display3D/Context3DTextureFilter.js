var flash;
(function (flash) {
    var display3D;
    (function (display3D) {
        var Context3DTextureFilter = (function () {
            function Context3DTextureFilter() {
            }
            Context3DTextureFilter.NEAREST = "nearest";
            Context3DTextureFilter.LINEAR = "linear";
            Context3DTextureFilter.ANISOTROPIC2X = "anisotropic2x";
            Context3DTextureFilter.ANISOTROPIC4X = "anisotropic4x";
            Context3DTextureFilter.ANISOTROPIC8X = "anisotropic8x";
            Context3DTextureFilter.ANISOTROPIC16X = "anisotropic16x";
            return Context3DTextureFilter;
        }());
        display3D.Context3DTextureFilter = Context3DTextureFilter;
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Context3DTextureFilter.js.map