var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var utils;
                (function (utils) {
                    utils.SWFMatrix = flash.__native.format.swf.data.SWFMatrix;
                    var MatrixUtils = (function () {
                        function MatrixUtils() {
                        }
                        MatrixUtils.interpolate = function (matrix1, matrix2, ratio) {
                            matrix1 = strict(matrix1, utils.SWFMatrix);
                            matrix2 = strict(matrix2, utils.SWFMatrix);
                            ratio = (+(ratio));
                            var matrix = new utils.SWFMatrix();
                            matrix.scaleX = matrix1.scaleX + (matrix2.scaleX - matrix1.scaleX) * ratio;
                            matrix.scaleY = matrix1.scaleY + (matrix2.scaleY - matrix1.scaleY) * ratio;
                            matrix.rotateSkew0 = matrix1.rotateSkew0 + (matrix2.rotateSkew0 - matrix1.rotateSkew0) * ratio;
                            matrix.rotateSkew1 = matrix1.rotateSkew1 + (matrix2.rotateSkew1 - matrix1.rotateSkew1) * ratio;
                            matrix.translateX = ((matrix1.translateX + (matrix2.translateX - matrix1.translateX) * ratio) >> 0);
                            matrix.translateY = ((matrix1.translateY + (matrix2.translateY - matrix1.translateY) * ratio) >> 0);
                            matrix.updateMatrix();
                            return matrix;
                        };
                        return MatrixUtils;
                    }());
                    utils.MatrixUtils = MatrixUtils;
                })(utils = swf.utils || (swf.utils = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=MatrixUtils.js.map