var flash;
(function (flash) {
    var net;
    (function (net) {
        var URLRequestMethod = (function () {
            function URLRequestMethod() {
            }
            URLRequestMethod.POST = "POST";
            URLRequestMethod.GET = "GET";
            URLRequestMethod.PUT = "PUT";
            URLRequestMethod.DELETE = "DELETE";
            URLRequestMethod.HEAD = "HEAD";
            URLRequestMethod.OPTIONS = "OPTIONS";
            return URLRequestMethod;
        }());
        net.URLRequestMethod = URLRequestMethod;
    })(net = flash.net || (flash.net = {}));
})(flash || (flash = {}));
//# sourceMappingURL=URLRequestMethod.js.map