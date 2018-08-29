var flash;
(function (flash) {
    var display3D;
    (function (display3D) {
        display3D.ByteArray = flash.utils.ByteArray;
        var IndexBuffer3D = (function () {
            function IndexBuffer3D(context3D, numIndices, bufferUsage) {
                this.__context = null;
                this.__gl = null;
                this.__elementType = 0;
                this.__id = null;
                this.__numIndices = 0;
                this.__usage = 0;
                context3D = strict(context3D, display3D.Context3D);
                numIndices = ((numIndices) >> 0);
                bufferUsage = as(bufferUsage, 'String');
                this.__gl = strict((this.__context = context3D).__gl, WebGLRenderingContext);
                this.__numIndices = numIndices;
                this.__elementType = ((this.__gl.UNSIGNED_SHORT) >> 0);
                this.__id = this.__gl.createBuffer();
                this.__usage = (((bufferUsage == display3D.Context3DBufferUsage.DYNAMIC_DRAW) ? this.__gl.DYNAMIC_DRAW : this.__gl.STATIC_DRAW) >> 0);
            }
            IndexBuffer3D.prototype.dispose = function () {
                this.__gl.deleteBuffer(this.__id);
            };
            IndexBuffer3D.prototype.uploadFromVector = function (data, startOffset, count) {
                startOffset = ((startOffset) >> 0);
                count = ((count) >> 0);
                var length = startOffset + count;
                var buffer = new Int16Array(count);
                for (var i = startOffset; i < length; ++i) {
                    buffer[i - startOffset] = data[i];
                }
                this.uploadFromTypedArray(buffer);
            };
            IndexBuffer3D.prototype.uploadFromByteArray = function (data, byteArrayOffset, startOffset, count) {
                data = strict(data, display3D.ByteArray);
                byteArrayOffset = ((byteArrayOffset) >> 0);
                startOffset = ((startOffset) >> 0);
                count = ((count) >> 0);
                var offset = byteArrayOffset + startOffset * 2;
                this.uploadFromTypedArray(new Int16Array(data.buffer, offset, count));
            };
            IndexBuffer3D.prototype.uploadFromTypedArray = function (data) {
                if (data == null)
                    return;
                this.__gl.bindBuffer(this.__gl.ELEMENT_ARRAY_BUFFER, this.__id);
                this.__gl.bufferData(this.__gl.ELEMENT_ARRAY_BUFFER, data, this.__usage);
            };
            return IndexBuffer3D;
        }());
        display3D.IndexBuffer3D = IndexBuffer3D;
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=IndexBuffer3D.js.map