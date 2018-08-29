var flash;
(function (flash) {
    var utils;
    (function (utils) {
        var CompressionAlgorithm = (function () {
            function CompressionAlgorithm() {
            }
            CompressionAlgorithm.DEFLATE = "deflate";
            CompressionAlgorithm.LZMA = "lzma";
            CompressionAlgorithm.ZLIB = "zlib";
            return CompressionAlgorithm;
        }());
        utils.CompressionAlgorithm = CompressionAlgorithm;
    })(utils = flash.utils || (flash.utils = {}));
})(flash || (flash = {}));
//# sourceMappingURL=CompressionAlgorithm.js.map