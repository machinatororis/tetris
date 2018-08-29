var global;
(function (global) {
    var QName = (function () {
        function QName(qNameOrUri, localNameVal) {
            if (qNameOrUri === void 0) { qNameOrUri = null; }
            if (localNameVal === void 0) { localNameVal = null; }
            this._uri = null;
            this._localName = null;
            this._prefix = null;
            this._isAttribute = false;
            if (is(qNameOrUri, QName)) {
                var qn = as(qNameOrUri, QName);
                this._uri = qn.uri;
                this._localName = qn.localName;
                this._prefix = qn.prefix;
            }
            else if (is(qNameOrUri, global.Namespace)) {
                var ns = as(qNameOrUri, global.Namespace);
                this._uri = ns.uri;
                this._prefix = ns.prefix;
                if (localNameVal) {
                    this._localName = as(localNameVal.toString(), 'String');
                }
            }
            else if (localNameVal) {
                this._localName = as(localNameVal, 'String');
                this._uri = as(qNameOrUri, 'String');
            }
            else if (qNameOrUri) {
                var s = as(qNameOrUri.toString(), 'String');
                if (s)
                    this._localName = s;
            }
        }
        Object.defineProperty(QName.prototype, "uri", {
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
        Object.defineProperty(QName.prototype, "localName", {
            get: function () {
                return this._localName;
            },
            set: function (value) {
                value = as(value, 'String');
                this._localName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QName.prototype, "prefix", {
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
        QName.prototype.toString = function () {
            var uriVal = this._uri ? this._uri : '*';
            return uriVal + '::' + this._localName;
        };
        QName.prototype.equals = function (name) {
            name = strict(name, QName);
            return this.localName == name.localName;
        };
        QName.prototype.matches = function (name) {
            name = strict(name, QName);
            if (this.uri == "*" || name.uri == "*") {
                return this.localName == "*" || name.localName == "*" || this.localName == name.localName;
            }
            if (this.localName == "*" || name.localName == "*") {
                return true;
            }
            return this.localName == name.localName;
        };
        Object.defineProperty(QName.prototype, "isAttribute", {
            get: function () {
                return this._isAttribute;
            },
            set: function (value) {
                value = Boolean(value);
                this._isAttribute = value;
            },
            enumerable: true,
            configurable: true
        });
        QName.prototype.getNamespace = function (namespaces) {
            if (namespaces === void 0) { namespaces = null; }
            namespaces = strict(namespaces, Array);
            var possibleMatch;
            if (!namespaces) {
                namespaces = [];
            }
            var len = namespaces.length;
            for (var i = 0; i < len; i++) {
                if (namespaces[i].uri == this._uri) {
                    possibleMatch = namespaces[i];
                    if (possibleMatch.prefix == this._prefix) {
                        return possibleMatch;
                    }
                }
            }
            if (possibleMatch) {
                return possibleMatch;
            }
            if (!this._prefix) {
                return new global.Namespace(this._uri);
            }
            return new global.Namespace(this._prefix, this._uri);
        };
        return QName;
    }());
    global.QName = QName;
})(global || (global = {}));
//# sourceMappingURL=QName.js.map