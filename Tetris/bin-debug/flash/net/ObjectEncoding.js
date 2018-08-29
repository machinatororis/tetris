var flash;
(function (flash) {
    var net;
    (function (net) {
        net.XML = global.XML;
        var ObjectEncoding = (function () {
            function ObjectEncoding() {
            }
            ObjectEncoding.AMF0 = 0;
            ObjectEncoding.AMF3 = 3;
            ObjectEncoding.DEFAULT = 3;
            ObjectEncoding.dynamicPropertyWriter = null;
            return ObjectEncoding;
        }());
        net.ObjectEncoding = ObjectEncoding;
    })(net = flash.net || (flash.net = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ObjectEncoding.js.map