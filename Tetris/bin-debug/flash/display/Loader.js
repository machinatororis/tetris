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
    var display;
    (function (display) {
        display.SystemBitmapData = flash.__native.display.SystemBitmapData;
        display.SWF = flash.__native.format.swf.SWF;
        display.SWFErrorEvent = flash.__native.format.swf.events.SWFErrorEvent;
        display.SWFProgressEvent = flash.__native.format.swf.events.SWFProgressEvent;
        display.ErrorEvent = flash.events.ErrorEvent;
        display.Event = flash.events.Event;
        display.IOErrorEvent = flash.events.IOErrorEvent;
        display.ProgressEvent = flash.events.ProgressEvent;
        display.SecurityErrorEvent = flash.events.SecurityErrorEvent;
        display.UncaughtErrorEvents = flash.events.UncaughtErrorEvents;
        display.URLLoader = flash.net.URLLoader;
        display.URLLoaderDataFormat = flash.net.URLLoaderDataFormat;
        display.URLRequest = flash.net.URLRequest;
        display.LoaderContext = flash.system.LoaderContext;
        display.ByteArray = flash.utils.ByteArray;
        var Loader = (function (_super) {
            __extends(Loader, _super);
            function Loader() {
                var _this = this;
                _this._swf === void 0 && (_this._swf = null);
                _this._loader === void 0 && (_this._loader = null);
                _this._image === void 0 && (_this._image = null);
                _this._contentLoaderInfo === void 0 && (_this._contentLoaderInfo = null);
                _this._predefinedData === void 0 && (_this._predefinedData = null);
                _this._predefinedAlphaData === void 0 && (_this._predefinedAlphaData = null);
                _this = _super.call(this) || this;
                _this._contentLoaderInfo = new display.LoaderInfo;
                _this._contentLoaderInfo._loader = _this;
                return _this;
            }
            Loader.prototype.load = function (request, context) {
                if (context === void 0) { context = null; }
                request = strict(request, display.URLRequest);
                context = strict(context, display.LoaderContext);
                this.__unload();
                var url = request.url;
                if (url.substr(0, 3).toLowerCase() != 'www' && url.substr(0, 4).toLowerCase() != 'http' && Loader.__base) {
                    url = Loader.__base + url;
                }
                this._loader = new display.URLLoader;
                this._loader.dataFormat = display.URLLoaderDataFormat.BINARY;
                this._loader.addEventListener(display.Event.COMPLETE, this.__onLoaderComplete.__bind(this));
                this._loader.addEventListener(display.ProgressEvent.PROGRESS, this.__onLoaderProgress.__bind(this));
                this._loader.addEventListener(display.IOErrorEvent.IO_ERROR, this.__onLoaderError.__bind(this));
                this._loader.addEventListener(display.SecurityErrorEvent.SECURITY_ERROR, this.__onLoaderError.__bind(this));
                this._loader.load(new display.URLRequest(this._contentLoaderInfo._url = as(url, 'String')));
            };
            Loader.prototype.loadBytes = function (bytes, context) {
                if (context === void 0) { context = null; }
                bytes = strict(bytes, display.ByteArray);
                context = strict(context, display.LoaderContext);
                if (!bytes) {
                    throw new TypeError('Parameter bytes must be non-null.', 2007);
                }
                if (bytes.length == 0) {
                    throw new ArgumentError('The ByteArray parameter in Loader.loadBytes() must have length greater than 0.', 2100);
                }
                this.__unload();
                var mimeType = window.asc.getMimeType(bytes);
                if (mimeType == 'image/svg' || mimeType == 'image/svg-xml' || mimeType == 'text/xml') {
                    mimeType = 'image/svg+xml';
                }
                switch (this._contentLoaderInfo._contentType = as(mimeType, 'String')) {
                    case 'application/x-shockwave-flash':
                        this._swf = new display.SWF(bytes);
                        this._swf.addEventListener(display.SWFProgressEvent.COMPLETE, this.__decodeSWFAssetsComplete.__bind(this));
                        this._swf.addEventListener(display.SWFErrorEvent.ERROR, this.__decodeSWFAssetsError.__bind(this));
                        this._swf.decodeImageDataAsync();
                        break;
                    default:
                        this._image = new Image;
                        this._image.onload = this.__decompressComplete.__bind(this);
                        this._image.onerror = this.__decompressError.__bind(this);
                        var data = bytes;
                        var blob = new window.Blob([new Uint8Array(data._dataView.buffer)], { type: mimeType });
                        this._image.src = (window.URL || window.webkitURL).createObjectURL(blob);
                }
            };
            Loader.prototype.close = function () {
                if (this._loader) {
                    this._loader.close();
                }
                this.__forgetImage();
            };
            Loader.prototype.unload = function () {
                this.__unload(false, false);
            };
            Loader.prototype.unloadAndStop = function (gc) {
                if (gc === void 0) { gc = true; }
                gc = Boolean(gc);
                this.__unload(true, gc);
            };
            Object.defineProperty(Loader.prototype, "content", {
                get: function () {
                    return this._contentLoaderInfo._content;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loader.prototype, "contentLoaderInfo", {
                get: function () {
                    return this._contentLoaderInfo;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loader.prototype, "uncaughtErrorEvents", {
                get: function () {
                    return this.contentLoaderInfo.uncaughtErrorEvents;
                },
                enumerable: true,
                configurable: true
            });
            Loader.prototype.__unload = function (stop, gc) {
                if (stop === void 0) { stop = false; }
                if (gc === void 0) { gc = false; }
                this.__forgetImage();
                if (this._swf) {
                    if (stop) {
                        this.stopAllMovieClips(true);
                    }
                    this._swf.removeEventListener(display.SWFProgressEvent.COMPLETE, this.__decodeSWFAssetsComplete.__bind(this));
                    this._swf.removeEventListener(display.SWFErrorEvent.ERROR, this.__decodeSWFAssetsError.__bind(this));
                    this._swf = null;
                }
                var c = this._contentLoaderInfo._content;
                if (c) {
                    var cp = c.parent, cpc;
                    if (cp && (cpc = cp._children)) {
                        cp.__removeChildAt(cpc.indexOf(c));
                    }
                    this._contentLoaderInfo._content = null;
                }
                if (this._loader) {
                    this._loader.removeEventListener(display.Event.COMPLETE, this.__onLoaderComplete.__bind(this));
                    this._loader.removeEventListener(display.ProgressEvent.PROGRESS, this.__onLoaderProgress.__bind(this));
                    this._loader.removeEventListener(display.IOErrorEvent.IO_ERROR, this.__onLoaderError.__bind(this));
                    this._loader.removeEventListener(display.SecurityErrorEvent.SECURITY_ERROR, this.__onLoaderError.__bind(this));
                    if (stop) {
                        this._loader.close();
                    }
                    this._loader = null;
                }
            };
            Loader.prototype.__forgetImage = function () {
                if (!this._image) {
                    return;
                }
                this._image.onload = undefined;
                this._image.onerror = undefined;
                this._image = null;
            };
            Loader.prototype.__fromSWF = function (data) {
                this._contentLoaderInfo._contentType = 'application/x-shockwave-flash';
                this._contentLoaderInfo._swfVersion = ((data.version) >>> 0);
                this._contentLoaderInfo._frameRate = data.frameRate;
                window.asc.mapSWF(data);
                var mainClass = data.getDisplayObjectConstructor(0);
                var mainClassArgs = [data];
                window.asc.createDisplayObject(mainClass, mainClassArgs, this, this._childrenLength, true, this._contentLoaderInfo);
                display.Stage.sCurrent.__exitInternal(0);
                this._contentLoaderInfo.__setProgress(0, data.sourceLength);
                this._contentLoaderInfo.__contentComplete();
                return this;
            };
            Loader.prototype.__onLoaderComplete = function (event) {
                this.loadBytes(this._contentLoaderInfo._bytes = strict(this._loader.data, display.ByteArray));
            };
            Loader.prototype.__onLoaderProgress = function (event) {
                this._contentLoaderInfo.__setProgress(this._loader.bytesLoaded, this._loader.bytesTotal);
            };
            Loader.prototype.__onLoaderError = function (event) {
                this._contentLoaderInfo.dispatchEvent(event);
            };
            Loader.prototype.__decompressComplete = function (e) {
                try {
                    var width = ((this._image.width || 1) >> 0);
                    var height = ((this._image.height || 1) >> 0);
                    var systemBitmapDataType = display.SystemBitmapData.LOADER;
                    var transparent = this._contentLoaderInfo._contentType != 'image/jpeg';
                    if (this._predefinedAlphaData) {
                        systemBitmapDataType = display.SystemBitmapData.SWF;
                        transparent = true;
                    }
                    var bd = (this._predefinedData || new display.SystemBitmapData(systemBitmapDataType, width, height, transparent, 0x0, false));
                    var element = this._image;
                    if (this._predefinedAlphaData) {
                        element = display.BitmapData.__getElementFromImageAndRawAlpha(this._image, this._predefinedAlphaData);
                    }
                    var ins = new display.Bitmap(bd.__fromElement(element));
                    ins._root = true;
                    ins._loaderInfo = this._contentLoaderInfo;
                    this._contentLoaderInfo._content = this.__addChildAt(ins, this._childrenLength);
                }
                catch (e) {
                    e = window.asc.e2e(e);
                    trace(e.getStackTrace());
                    this.__onLoaderError(new display.IOErrorEvent(display.IOErrorEvent.IO_ERROR));
                    return;
                }
                this.__forgetImage();
                this._contentLoaderInfo.__contentComplete();
            };
            Loader.prototype.__decompressError = function (e) {
                this.__forgetImage();
                this.__onLoaderError(new display.IOErrorEvent(display.IOErrorEvent.IO_ERROR));
            };
            Loader.prototype.__decodeSWFAssetsComplete = function (e) {
                this.__fromSWF(this._swf);
            };
            Loader.prototype.__decodeSWFAssetsError = function (e) {
                this.__onLoaderError(new display.IOErrorEvent(display.IOErrorEvent.IO_ERROR, false, false, e.reason));
            };
            Loader.prototype.toString = function () {
                return '[object Loader]';
            };
            Loader.__base = '';
            return Loader;
        }(display.DisplayObjectContainer));
        display.Loader = Loader;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Loader.js.map