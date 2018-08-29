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
        net.IOErrorEvent = flash.events.IOErrorEvent;
        net.Base64 = flash.__native.utils.Base64;
        net.ByteArray = flash.utils.ByteArray;
        net.setTimeout = flash.utils.setTimeout;
        var FileReference = (function (_super) {
            __extends(FileReference, _super);
            function FileReference() {
                var _this = this;
                _this._data === void 0 && (_this._data = null);
                _this._extension === void 0 && (_this._extension = null);
                _this._name === void 0 && (_this._name = null);
                _this._type === void 0 && (_this._type = null);
                _this._size === void 0 && (_this._size = NaN);
                _this._file === void 0 && (_this._file = null);
                _this._input === void 0 && (_this._input = null);
                _this = _super.call(this) || this;
                return _this;
            }
            Object.defineProperty(FileReference.prototype, "creationDate", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileReference.prototype, "creator", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileReference.prototype, "data", {
                get: function () {
                    return this._data;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileReference.prototype, "extension", {
                get: function () {
                    return this._extension;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileReference.prototype, "modificationDate", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileReference.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileReference.prototype, "size", {
                get: function () {
                    return !isNaN(this._size) ? this._size : 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileReference.prototype, "type", {
                get: function () {
                    return this._type;
                },
                enumerable: true,
                configurable: true
            });
            FileReference.prototype.browse = function (typeFilter) {
                if (typeFilter === void 0) { typeFilter = null; }
                typeFilter = strict(typeFilter, Array);
                var accept;
                var __for0 = window.asc.of(typeFilter);
                for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                    var f = __for0_1[_i];
                    accept = accept || [];
                    var ext = f.extension;
                    if (!ext)
                        continue;
                    ext = ext.substr(ext.lastIndexOf('.'));
                    if (!ext.length)
                        continue;
                    accept.push(ext);
                }
                this._input = document.createElement('input');
                this._input.setAttribute('type', 'file');
                if (accept) {
                    this._input.setAttribute('accept', accept.join(','));
                }
                var timeout = 0;
                this._input.addEventListener('change', function (e) {
                    net.clearTimeout(timeout);
                    this._input = null;
                    var files = e.target.files;
                    for (var i = 0, f; f = files[i]; i++) {
                        this._fromFile(f);
                        this.dispatchEvent(new net.Event(net.Event.SELECT));
                        return;
                    }
                    this.dispatchEvent(new net.Event(net.Event.CANCEL));
                }.__bind(this));
                var onfocus = document.body.onfocus;
                document.body.onfocus = function (e) {
                    document.body.onfocus = onfocus;
                    if (onfocus != undefined)
                        onfocus(e);
                    timeout = net.setTimeout(function () {
                        this._input = null;
                        this.dispatchEvent(new net.Event(net.Event.CANCEL));
                    }.__bind(this), 1000);
                }.__bind(this);
                this._input.click();
                return true;
            };
            FileReference.prototype.cancel = function () {
            };
            FileReference.prototype.download = function (request, defaultFileName) {
                if (defaultFileName === void 0) { defaultFileName = null; }
                request = strict(request, net.URLRequest);
                defaultFileName = as(defaultFileName, 'String');
            };
            FileReference.prototype.load = function () {
                try {
                    var reader = strict(new FileReader(), FileReader);
                    reader.onload = function () {
                        try {
                            this._data = new net.ByteArray;
                            this._data.__fromArrayBuffer(reader.result);
                            this.dispatchEvent(new net.Event(net.Event.COMPLETE));
                        }
                        catch (e) {
                            e = window.asc.e2e(e);
                            this.dispatchEvent(new net.IOErrorEvent(net.IOErrorEvent.IO_ERROR));
                        }
                    }.__bind(this);
                    reader.readAsArrayBuffer(this._file);
                    this.dispatchEvent(new net.Event(net.Event.OPEN));
                }
                catch (e) {
                    e = window.asc.e2e(e);
                    this.dispatchEvent(new net.IOErrorEvent(net.IOErrorEvent.IO_ERROR));
                }
            };
            FileReference.prototype.save = function (data, defaultFileName) {
                if (defaultFileName === void 0) { defaultFileName = null; }
                defaultFileName = as(defaultFileName, 'String');
                this._name = this._name || defaultFileName || 'saved_file';
                var ba;
                if (is(data, net.ByteArray)) {
                    ba = strict(this.data, net.ByteArray);
                }
                else if (is(data, net.XML)) {
                    ba = new net.ByteArray;
                    ba.writeUTFBytes(data.toXMLString());
                }
                else if (is(data, 'String')) {
                    ba = new net.ByteArray;
                    ba.writeUTFBytes(data);
                }
                else {
                    throw new ArgumentError('invalid data');
                }
                this.dispatchEvent(new net.Event(net.Event.OPEN));
                try {
                    var blob = strict(new Blob([ba.buffer], { type: "octet/stream" }), Blob);
                    var a = document.createElement('a');
                    document.body.appendChild(a);
                    a.href = window.URL.createObjectURL(blob);
                    a.setAttribute('download', this._name);
                    a.click();
                    document.body.removeChild(a);
                    this.dispatchEvent(new net.Event(net.Event.COMPLETE));
                }
                catch (e) {
                    e = window.asc.e2e(e);
                    this.dispatchEvent(new net.IOErrorEvent(net.IOErrorEvent.IO_ERROR));
                }
            };
            FileReference.prototype.upload = function (request, uploadDataFieldName, testUpload) {
                if (uploadDataFieldName === void 0) { uploadDataFieldName = "Filedata"; }
                if (testUpload === void 0) { testUpload = false; }
                request = strict(request, net.URLRequest);
                uploadDataFieldName = as(uploadDataFieldName, 'String');
                testUpload = Boolean(testUpload);
            };
            FileReference.prototype.uploadUnencoded = function (request) {
                request = strict(request, net.URLRequest);
            };
            FileReference.prototype._fromFile = function (f) {
                if (!f)
                    return this;
                this._file = strict(f, File);
                this._name = as(f.name, 'String');
                this._size = (+(f.size));
                this._type = this._name.substr(this._name.lastIndexOf('.'));
                return this;
            };
            return FileReference;
        }(net.EventDispatcher));
        net.FileReference = FileReference;
    })(net = flash.net || (flash.net = {}));
})(flash || (flash = {}));
//# sourceMappingURL=FileReference.js.map