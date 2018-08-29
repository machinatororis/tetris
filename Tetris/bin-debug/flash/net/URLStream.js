var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var flash;
(function (flash) {
    var net;
    (function (net) {
        net.XML = global.XML;
        net.Event = flash.events.Event;
        net.EventDispatcher = flash.events.EventDispatcher;
        net.HTTPStatusEvent = flash.events.HTTPStatusEvent;
        net.IOErrorEvent = flash.events.IOErrorEvent;
        net.ProgressEvent = flash.events.ProgressEvent;
        net.SecurityErrorEvent = flash.events.SecurityErrorEvent;
        net.ByteArray = flash.utils.ByteArray;
        net.IDataInput = flash.utils.IDataInput;
        var URLStream = (function (_super) {
            __extends(URLStream, _super);
            function URLStream() {
                var _this = this;
                _this.implements_flash_utils_IDataInput = null;
                _this._xhr === void 0 && (_this._xhr = null);
                _this._data === void 0 && (_this._data = null);
                _this = _super.call(this) || this;
                _this._data = new net.ByteArray;
                return _this;
            }
            URLStream.prototype.load = function (request) {
                request = strict(request, net.URLRequest);
                var headers = [];
                var __for0 = window.asc.of(request.requestHeaders);
                for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                    var h = __for0_1[_i];
                    if (h.name.toLowerCase() == 'X-HTTP-Method-Override'.toLowerCase()) {
                        continue;
                    }
                    headers[headers.length] = {
                        name: h.name,
                        value: h.value
                    };
                }
                var len = ((headers.length) >> 0);
                var contentType = false;
                for (var i = 0; i < len; ++i) {
                    if (headers[i].name.toLowerCase() == 'content-type') {
                        contentType = true;
                        break;
                    }
                }
                if (request.contentType && !contentType) {
                    headers.push({
                        name: 'Content-Type',
                        value: request.contentType
                    });
                }
                var _url = request.url;
                if (_url.substr(0, 3).toLowerCase() != 'www' && _url.substr(0, 4).toLowerCase() != 'http' && URLStream.__base) {
                    _url = URLStream.__base + _url;
                }
                var data;
                if (request.data) {
                    if (is(request.data, 'String')) {
                        data = request.data;
                    }
                    else if (is(request.data, net.ByteArray)) {
                        data = new DataView(request.data.buffer);
                    }
                    else if (is(request.data, net.URLVariables)) {
                        _url += '?' + request.data.toString();
                    }
                    else {
                        try {
                            data = JSON.stringify(request.data);
                        }
                        catch (e) {
                            e = window.asc.e2e(e);
                        }
                    }
                }
                try {
                    _create.__bind(this)();
                    _open.__bind(this)(request.method || net.URLRequestMethod.GET, _url, URLStream.sync);
                    for (var i = 0; i < headers.length; ++i) {
                        _header.__bind(this)(headers[i].name, headers[i].value);
                    }
                    _load.__bind(this)(data);
                }
                catch (e) {
                    e = window.asc.e2e(e);
                    this.dispatchEvent(new net.IOErrorEvent(net.IOErrorEvent.IO_ERROR, false, false, e.message));
                }
                function _create() {
                    this._xhr = new XMLHttpRequest;
                }
                function _open(method, url, sync) {
                    this._xhr.open(method, url, !sync);
                }
                function _header(name, value) {
                    this._xhr.setRequestHeader(name, value);
                }
                function _load(data) {
                    this._xhr.responseType = "arraybuffer";
                    this._xhr.onreadystatechange = this.xhr_onreadystatechange.__bind(this);
                    this._xhr.onprogress = this.xhr_progress.__bind(this);
                    this._xhr.send(data);
                }
            };
            URLStream.prototype.readBytes = function (b, offset, length) {
                if (offset === void 0) { offset = 0; }
                if (length === void 0) { length = 0; }
                b = strict(b, net.ByteArray);
                offset = ((offset) >>> 0);
                length = ((length) >>> 0);
                this._data.readBytes(b, offset, length);
            };
            URLStream.prototype.readBoolean = function () {
                return this._data.readBoolean();
            };
            URLStream.prototype.readByte = function () {
                return this._data.readByte();
            };
            URLStream.prototype.readUnsignedByte = function () {
                return this._data.readUnsignedByte();
            };
            URLStream.prototype.readShort = function () {
                return this._data.readShort();
            };
            URLStream.prototype.readUnsignedShort = function () {
                return this._data.readUnsignedShort();
            };
            URLStream.prototype.readUnsignedInt = function () {
                return this._data.readUnsignedInt();
            };
            URLStream.prototype.readInt = function () {
                return this._data.readInt();
            };
            URLStream.prototype.readFloat = function () {
                return this._data.readFloat();
            };
            URLStream.prototype.readDouble = function () {
                return this._data.readDouble();
            };
            URLStream.prototype.readMultiByte = function (param1, param2) {
                param1 = ((param1) >>> 0);
                param2 = as(param2, 'String');
                return this._data.readMultiByte(param1, param2);
            };
            URLStream.prototype.readUTF = function () {
                return this._data.readUTF();
            };
            URLStream.prototype.readUTFBytes = function (param1) {
                param1 = ((param1) >>> 0);
                return this._data.readUTFBytes(param1);
            };
            Object.defineProperty(URLStream.prototype, "connected", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(URLStream.prototype, "bytesAvailable", {
                get: function () {
                    return this._data.bytesAvailable;
                },
                enumerable: true,
                configurable: true
            });
            URLStream.prototype.close = function () {
                try {
                    this._xhr.onreadystatechange = undefined;
                    this._xhr.onprogress = undefined;
                    this._xhr.abort();
                }
                catch (e) {
                    e = window.asc.e2e(e);
                }
            };
            URLStream.prototype.readObject = function () {
                return this._data.readObject();
            };
            Object.defineProperty(URLStream.prototype, "objectEncoding", {
                get: function () { return this._data.objectEncoding; },
                set: function (param1) { param1 = ((param1) >>> 0); this._data.objectEncoding = param1; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(URLStream.prototype, "endian", {
                get: function () { return this._data.endian; },
                set: function (param1) { param1 = as(param1, 'String'); this._data.endian = param1; },
                enumerable: true,
                configurable: true
            });
            URLStream.prototype.xhr_progress = function (e) {
                this.dispatchEvent(new net.ProgressEvent(net.ProgressEvent.PROGRESS, false, false, e.loaded, e.total));
            };
            URLStream.prototype.xhr_onreadystatechange = function (e) {
                var state = ((this._xhr.readyState) >> 0);
                var status = ((this._xhr.status) >> 0);
                var complete = state == 4 && status == 200;
                var error = state == 4 && (status == 400 || status == 403 || status == 404);
                var securityError = state == 4 && status == 0;
                var ev = new net.HTTPStatusEvent(net.HTTPStatusEvent.HTTP_STATUS, false, false, status || 0);
                var headersRaw = 'getAllResponseHeaders' in this._xhr ? this._xhr.getAllResponseHeaders() : undefined;
                if (headersRaw && (complete || error || securityError)) {
                    var headers = new Array;
                    var tmp = headersRaw.split('\n');
                    var len = ((tmp.length) >> 0);
                    for (var i = 0; i < len; ++i) {
                        var str = as(tmp[i].replace(/\r/, ''), 'String');
                        var index = str.indexOf(': ');
                        if (index == -1) {
                            continue;
                        }
                        headers.push(new net.URLRequestHeader(str.substring(0, index), str.substr(index + 2)));
                    }
                    ev.responseHeaders = strict(headers, Array);
                }
                this.dispatchEvent(ev);
                if (state == 4) {
                    var buffer = as(this._xhr.response, ArrayBuffer);
                    if (buffer) {
                        this._data = this._data.__fromArrayBuffer(buffer);
                    }
                }
                if (complete) {
                    this.dispatchEvent(new net.ProgressEvent(net.ProgressEvent.PROGRESS, false, false, this._data.length, this._data.length));
                    this.dispatchEvent(new net.Event(net.Event.COMPLETE));
                }
                else if (error) {
                    this.dispatchEvent(new net.IOErrorEvent(net.IOErrorEvent.IO_ERROR));
                }
                else if (securityError) {
                    this.dispatchEvent(new net.SecurityErrorEvent(net.SecurityErrorEvent.SECURITY_ERROR));
                }
            };
            URLStream.sync = false;
            URLStream.__base = '';
            return URLStream;
        }(net.EventDispatcher));
        net.URLStream = URLStream;
    })(net = flash.net || (flash.net = {}));
})(flash || (flash = {}));
//# sourceMappingURL=URLStream.js.map