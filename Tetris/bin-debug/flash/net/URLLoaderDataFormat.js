var flash;
(function (flash) {
    var net;
    (function (net) {
        var URLLoaderDataFormat = (function () {
            function URLLoaderDataFormat() {
                throw new Error('Abstract class error');
            }
            URLLoaderDataFormat.TEXT = "text";
            URLLoaderDataFormat.BINARY = "binary";
            URLLoaderDataFormat.VARIABLES = "variables";
            return URLLoaderDataFormat;
        }());
        net.URLLoaderDataFormat = URLLoaderDataFormat;
    })(net = flash.net || (flash.net = {}));
})(flash || (flash = {}));
//# sourceMappingURL=URLLoaderDataFormat.js.map