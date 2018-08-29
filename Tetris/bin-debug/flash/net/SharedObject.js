var flash;
(function (flash) {
    var net;
    (function (net) {
        net.Main = global.Main;
        net.Namespace = global.Namespace;
        net.Base64 = flash.__native.utils.Base64;
        net.ByteArray = flash.utils.ByteArray;
        var SharedObject = (function () {
            function SharedObject() {
                this.client = null;
                this.data = {};
                this.objectEncoding = 0;
                this._name = null;
            }
            Object.defineProperty(SharedObject.prototype, "fps", {
                set: function (value) {
                    value = (+(value));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SharedObject.prototype, "size", {
                get: function () {
                    if (this.data) {
                        SharedObject.sHelperByteArray = SharedObject.sHelperByteArray || new net.ByteArray;
                        SharedObject.sHelperByteArray.position = 0;
                        SharedObject.sHelperByteArray.writeObject(this.data);
                        return SharedObject.sHelperByteArray.length;
                    }
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            SharedObject.prototype.clear = function () {
                this.data = {};
                try {
                    window.asc.getLocalStorage().removeItem(this._name);
                }
                catch (e) {
                    e = window.asc.e2e(e);
                }
            };
            SharedObject.prototype.close = function () {
            };
            SharedObject.prototype.connect = function (myConnection, params) {
                if (params === void 0) { params = null; }
                params = as(params, 'String');
            };
            SharedObject.prototype.flush = function (minDiskSpace) {
                if (minDiskSpace === void 0) { minDiskSpace = 0; }
                minDiskSpace = ((minDiskSpace) >> 0);
                var encodedData = '';
                try {
                    var serializedData = new net.ByteArray;
                    serializedData.objectEncoding = this.objectEncoding;
                    serializedData.writeObject(this.data);
                    encodedData = net.Base64.encode(serializedData);
                }
                catch (e) {
                    e = window.asc.e2e(e);
                    trace(e.getStackTrace());
                }
                try {
                    window.asc.getLocalStorage().setItem(this._name, encodedData);
                    return net.SharedObjectFlushStatus.FLUSHED;
                }
                catch (e) {
                    e = window.asc.e2e(e);
                }
                return net.SharedObjectFlushStatus.PENDING;
            };
            SharedObject.getLocal = function (name, localPath, secure) {
                if (localPath === void 0) { localPath = null; }
                if (secure === void 0) { secure = false; }
                name = as(name, 'String');
                localPath = as(localPath, 'String');
                secure = Boolean(secure);
                var encodedData = as(window.asc.getLocalStorage().getItem(name), 'String');
                var data, encoding = SharedObject.defaultObjectEncoding;
                if (encodedData) {
                    try {
                        var serializedData = net.Base64.decode(encodedData);
                        serializedData.position = 0;
                        data = serializedData.readObject();
                        encoding = serializedData.objectEncoding;
                    }
                    catch (e) {
                        e = window.asc.e2e(e);
                        trace('Error encountered while decoding LocalStorage entry. Resetting data.');
                    }
                    if (!data || typeof data != 'object') {
                        data = {};
                    }
                }
                else {
                    data = {};
                }
                var so = new SharedObject;
                so.data = data;
                so._name = name;
                so.objectEncoding = ((encoding) >>> 0);
                return so;
            };
            SharedObject.getRemote = function (name, remotePath, persistence, secure) {
                if (remotePath === void 0) { remotePath = null; }
                if (persistence === void 0) { persistence = false; }
                if (secure === void 0) { secure = false; }
                name = as(name, 'String');
                remotePath = as(remotePath, 'String');
                secure = Boolean(secure);
                return null;
            };
            SharedObject.prototype.send = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
            };
            SharedObject.prototype.setDirty = function (propertyName) {
                propertyName = as(propertyName, 'String');
            };
            SharedObject.prototype.setProperty = function (propertyName, value) {
                if (value === void 0) { value = null; }
                propertyName = as(propertyName, 'String');
            };
            SharedObject.defaultObjectEncoding = asc.sti(SharedObject, function () { SharedObject.defaultObjectEncoding = net.ObjectEncoding.DEFAULT; });
            SharedObject.preventBackup = false;
            SharedObject.sHelperByteArray = null;
            return SharedObject;
        }());
        net.SharedObject = SharedObject;
    })(net = flash.net || (flash.net = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SharedObject.js.map