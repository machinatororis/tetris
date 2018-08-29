var flash;
(function (flash) {
    var display3D;
    (function (display3D) {
        display3D.ByteArray = flash.utils.ByteArray;
        var VertexBuffer3D = (function () {
            function VertexBuffer3D(context3D, numVertices, dataPerVertex, bufferUsage) {
                this.__context = null;
                this.__gl = null;
                this.__data = undefined;
                this.__id = null;
                this.__numVertices = 0;
                this.__stride = 0;
                this.__usage = 0;
                this.__vertexSize = 0;
                context3D = strict(context3D, display3D.Context3D);
                numVertices = ((numVertices) >> 0);
                dataPerVertex = ((dataPerVertex) >> 0);
                bufferUsage = as(bufferUsage, 'String');
                this.__gl = strict((this.__context = context3D).__gl, WebGLRenderingContext);
                this.__numVertices = numVertices;
                this.__vertexSize = dataPerVertex;
                this.__id = this.__gl.createBuffer();
                this.__stride = ((this.__vertexSize * 4) >> 0);
                this.__usage = (((bufferUsage == display3D.Context3DBufferUsage.DYNAMIC_DRAW) ? this.__gl.DYNAMIC_DRAW : this.__gl.STATIC_DRAW) >> 0);
            }
            VertexBuffer3D.prototype.dispose = function () {
                this.__gl.deleteBuffer(this.__id);
            };
            VertexBuffer3D.prototype.uploadFromVector = function (data, startVertex, numVertices) {
                startVertex = ((startVertex) >> 0);
                numVertices = ((numVertices) >> 0);
                if (data == null)
                    return;
                var start = startVertex * this.__vertexSize;
                var count = numVertices * this.__vertexSize;
                var length = start + count;
                var buffer = new Float32Array(count);
                for (var i = start; i < length; ++i) {
                    buffer[i - start] = data[i];
                }
                this.uploadFromTypedArray(buffer);
            };
            VertexBuffer3D.prototype.uploadFromByteArray = function (data, byteArrayOffset, startVertex, numVertices) {
                data = strict(data, display3D.ByteArray);
                byteArrayOffset = ((byteArrayOffset) >> 0);
                startVertex = ((startVertex) >> 0);
                numVertices = ((numVertices) >> 0);
                var offset = byteArrayOffset + startVertex * this.__stride;
                var length = numVertices * this.__vertexSize;
                this.uploadFromTypedArray(new Float32Array(data.buffer, offset, length));
            };
            VertexBuffer3D.prototype.uploadFromTypedArray = function (data) {
                if (data == null)
                    return;
                this.__gl.bindBuffer(this.__gl.ARRAY_BUFFER, this.__id);
                this.__gl.bufferData(this.__gl.ARRAY_BUFFER, data, this.__usage);
            };
            return VertexBuffer3D;
        }());
        display3D.VertexBuffer3D = VertexBuffer3D;
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=VertexBuffer3D.js.map