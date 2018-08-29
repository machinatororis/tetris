var flash;
(function (flash) {
    var net;
    (function (net) {
        var URLRequestHeader = (function () {
            function URLRequestHeader(name, value) {
                if (name === void 0) { name = ""; }
                if (value === void 0) { value = ""; }
                this.name = null;
                this.value = null;
                name = as(name, 'String');
                value = as(value, 'String');
                this.name = name;
                this.value = value;
            }
            return URLRequestHeader;
        }());
        net.URLRequestHeader = URLRequestHeader;
    })(net = flash.net || (flash.net = {}));
})(flash || (flash = {}));
//# sourceMappingURL=URLRequestHeader.js.map