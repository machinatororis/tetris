var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var data;
                (function (data_1) {
                    data_1.SWFData = flash.__native.format.swf.SWFData;
                    data_1.Matrix = flash.geom.Matrix;
                    var SWFMatrix = (function () {
                        function SWFMatrix(data) {
                            this.scaleX = 1.0;
                            this.scaleY = 1.0;
                            this.rotateSkew0 = 0.0;
                            this.rotateSkew1 = 0.0;
                            this.translateX = 0;
                            this.translateY = 0;
                            if (data != null) {
                                this.parse(data);
                            }
                        }
                        SWFMatrix.prototype.updateMatrix = function () {
                            if (!this.matrix) {
                                this.matrix = new data_1.Matrix(this.scaleX, this.rotateSkew0, this.rotateSkew1, this.scaleY, this.translateX / 20, this.translateY / 20);
                            }
                            else {
                                this.matrix.__setTo(this.scaleX, this.rotateSkew0, this.rotateSkew1, this.scaleY, this.translateX / 20, this.translateY / 20);
                            }
                        };
                        SWFMatrix.prototype.parse = function (data) {
                            data.resetBitsPending();
                            this.scaleX = 1.0;
                            this.scaleY = 1.0;
                            if (data.readUB(1) == 1) {
                                var scaleBits = data.readUB(5);
                                this.scaleX = data.readFB(scaleBits);
                                this.scaleY = data.readFB(scaleBits);
                            }
                            this.rotateSkew0 = 0.0;
                            this.rotateSkew1 = 0.0;
                            if (data.readUB(1) == 1) {
                                var rotateBits = data.readUB(5);
                                this.rotateSkew0 = data.readFB(rotateBits);
                                this.rotateSkew1 = data.readFB(rotateBits);
                            }
                            var translateBits = data.readUB(5);
                            this.translateX = data.readSB(translateBits);
                            this.translateY = data.readSB(translateBits);
                            this.updateMatrix();
                        };
                        SWFMatrix.prototype.clone = function () {
                            var matrix = new SWFMatrix;
                            matrix.scaleX = this.scaleX;
                            matrix.scaleY = this.scaleY;
                            matrix.rotateSkew0 = this.rotateSkew0;
                            matrix.rotateSkew1 = this.rotateSkew1;
                            matrix.translateX = this.translateX;
                            matrix.translateY = this.translateY;
                            matrix.updateMatrix();
                            return matrix;
                        };
                        SWFMatrix.prototype.isIdentity = function () {
                            return (this.scaleX == 1 && this.scaleY == 1
                                && this.rotateSkew0 == 0 && this.rotateSkew1 == 0 && this.translateX == 0 && this.translateY == 0);
                        };
                        SWFMatrix.prototype.toString = function () {
                            return "(" + this.scaleX + "," + this.rotateSkew0 + "," + this.rotateSkew1 + "," + this.scaleY + "," + this.translateX + "," + this.translateY + ")";
                        };
                        return SWFMatrix;
                    }());
                    data_1.SWFMatrix = SWFMatrix;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFMatrix.js.map