var flash;
(function (flash) {
    var net;
    (function (net) {
        var URLRequest = (function () {
            function URLRequest(url) {
                if (url === void 0) { url = null; }
                this._url = null;
                this._method = null;
                this._data = null;
                this._contentType = null;
                this._headers = null;
                url = as(url, 'String');
                if (url != null) {
                    this.url = url;
                }
                this.requestHeaders = [];
            }
            Object.defineProperty(URLRequest.prototype, "url", {
                get: function () { return this._url; },
                set: function (value) { value = as(value, 'String'); this._url = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(URLRequest.prototype, "data", {
                get: function () { return this._data; },
                set: function (value) {
                    this._data = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(URLRequest.prototype, "method", {
                get: function () { return this._method; },
                set: function (value) {
                    value = as(value, 'String');
                    this._method = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(URLRequest.prototype, "contentType", {
                get: function () { return this._contentType; },
                set: function (value) {
                    value = as(value, 'String');
                    this._contentType = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(URLRequest.prototype, "requestHeaders", {
                get: function () { return this._headers; },
                set: function (value) {
                    value = strict(value, Array);
                    this._headers = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(URLRequest.prototype, "digest", {
                get: function () { return null; },
                set: function (param1) { param1 = as(param1, 'String'); },
                enumerable: true,
                configurable: true
            });
            URLRequest.prototype.useRedirectedURL = function (param1, param2, param3, param4) {
                if (param2 === void 0) { param2 = false; }
                if (param3 === void 0) { param3 = null; }
                if (param4 === void 0) { param4 = null; }
                param1 = strict(param1, URLRequest);
                param2 = Boolean(param2);
                param4 = as(param4, 'String');
            };
            return URLRequest;
        }());
        net.URLRequest = URLRequest;
    })(net = flash.net || (flash.net = {}));
})(flash || (flash = {}));
//# sourceMappingURL=URLRequest.js.map