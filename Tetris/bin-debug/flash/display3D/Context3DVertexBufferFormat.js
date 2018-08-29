var flash;
(function (flash) {
    var display3D;
    (function (display3D) {
        var Context3DVertexBufferFormat = (function () {
            function Context3DVertexBufferFormat() {
            }
            Context3DVertexBufferFormat.FLOAT_1 = "float1";
            Context3DVertexBufferFormat.FLOAT_2 = "float2";
            Context3DVertexBufferFormat.FLOAT_3 = "float3";
            Context3DVertexBufferFormat.FLOAT_4 = "float4";
            Context3DVertexBufferFormat.BYTES_4 = "bytes4";
            return Context3DVertexBufferFormat;
        }());
        display3D.Context3DVertexBufferFormat = Context3DVertexBufferFormat;
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Context3DVertexBufferFormat.js.map