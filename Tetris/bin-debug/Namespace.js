var global;
(function (global) {
    var Namespace = (function () {
        function Namespace(prefixOrUri, uriValue) {
            if (prefixOrUri === void 0) { prefixOrUri = null; }
            if (uriValue === void 0) { uriValue = null; }
            this._uri = "";
            this._prefix = null;
            if (!uriValue && prefixOrUri) {
                var uriVal = uriValue ? uriValue : prefixOrUri;
                if (is(uriVal, Namespace)) {
                    this._prefix = (as(uriVal, Namespace)).prefix;
                    this._uri = (as(uriVal, Namespace)).uri;
                }
                else if (this.isQName(uriVal)) {
                    this._uri = uriVal.uri ? uriVal.uri : this._uri;
                }
                else {
                    this._uri = is(uriVal, 'String') ? uriVal : uriVal.toString();
                    if (this._uri == "") {
                        this._prefix = "";
                    }
                }
            }
            else if (uriValue) {
                if (this.isQName(uriValue)) {
                    if (uriValue.uri) {
                        this._uri = as(uriValue.uri, 'String');
                    }
                }
                else {
                    this._uri = is(uriValue, 'String') ? uriValue : uriValue.toString();
                }
                if (!this._uri) {
                    if (!prefixOrUri) {
                        this._prefix = "";
                    }
                    else {
                        throw new TypeError("invalid prefix");
                    }
                }
                else {
                    this._prefix = is(prefixOrUri, 'String') ? prefixOrUri : prefixOrUri.toString();
                }
            }
        }
        Namespace.prototype.isQName = function (val) {
            if (val == null) {
                return false;
            }
            if (val.hasOwnProperty("uri") && val.hasOwnProperty("localName") && val.hasOwnProperty("prefix")) {
                return true;
            }
            return false;
        };
        Object.defineProperty(Namespace.prototype, "uri", {
            get: function () {
                return this._uri;
            },
            set: function (value) {
                value = as(value, 'String');
                this._uri = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Namespace.prototype, "prefix", {
            get: function () {
                return this._prefix;
            },
            set: function (value) {
                value = as(value, 'String');
                this._prefix = value;
            },
            enumerable: true,
            configurable: true
        });
        Namespace.prototype.toString = function () {
            return this.uri;
        };
        Namespace.prototype.valueOf = function () {
            return this;
        };
        return Namespace;
    }());
    global.Namespace = Namespace;
})(global || (global = {}));
//# sourceMappingURL=Namespace.js.map