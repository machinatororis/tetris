var flash;
(function (flash) {
    var display3D;
    (function (display3D) {
        var Context3DTextureFormat = (function () {
            function Context3DTextureFormat() {
            }
            Context3DTextureFormat.BGRA = "bgra";
            Context3DTextureFormat.RGBA_HALF_FLOAT = "rgbaHalfFloat";
            Context3DTextureFormat.COMPRESSED = "compressed";
            Context3DTextureFormat.COMPRESSED_ALPHA = "compressedAlpha";
            Context3DTextureFormat.BGR_PACKED = "bgrPacked565";
            Context3DTextureFormat.BGRA_PACKED = "bgraPacked4444";
            return Context3DTextureFormat;
        }());
        display3D.Context3DTextureFormat = Context3DTextureFormat;
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Context3DTextureFormat.js.map