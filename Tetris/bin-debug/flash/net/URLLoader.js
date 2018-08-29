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
        var URLLoader = (function (_super) {
            __extends(URLLoader, _super);
            function URLLoader(request) {
                if (request === void 0) { request = null; }
                var _this = this;
                request = strict(request, net.URLRequest);
                _this.data === void 0 && (_this.data = null);
                _this.dataFormat === void 0 && (_this.dataFormat = "text");
                _this.bytesLoaded === void 0 && (_this.bytesLoaded = 0);
                _this.bytesTotal === void 0 && (_this.bytesTotal = 0);
                _this.stream === void 0 && (_this.stream = null);
                _this = _super.call(this) || this;
                _this.stream = new net.URLStream();
                _this.stream.addEventListener(net.Event.OPEN, _this.redirectEvent.__bind(_this));
                _this.stream.addEventListener(net.IOErrorEvent.IO_ERROR, _this.redirectEventWithData.__bind(_this));
                _this.stream.addEventListener(net.SecurityErrorEvent.SECURITY_ERROR, _this.redirectEventWithData.__bind(_this));
                _this.stream.addEventListener(net.HTTPStatusEvent.HTTP_STATUS, _this.redirectEvent.__bind(_this));
                _this.stream.addEventListener(net.ProgressEvent.PROGRESS, _this.onProgress.__bind(_this));
                _this.stream.addEventListener(net.Event.COMPLETE, _this.redirectEventWithData.__bind(_this));
                if (request != null) {
                    _this.load(request);
                }
                return _this;
            }
            URLLoader.prototype.load = function (request) {
                request = strict(request, net.URLRequest);
                this.stream.load(request);
            };
            URLLoader.prototype.close = function () {
                this.stream.close();
            };
            URLLoader.prototype.redirectEvent = function (event) {
                event = strict(event, net.Event);
                event.target = this;
                this.dispatchEvent(event);
            };
            URLLoader.prototype.redirectEventWithData = function (event) {
                event = strict(event, net.Event);
                event.target = this;
                var bytes = this.stream['_data'];
                switch (this.dataFormat) {
                    case net.URLLoaderDataFormat.TEXT:
                        this.data = bytes.toString();
                        break;
                    case net.URLLoaderDataFormat.VARIABLES:
                        if (bytes.length > 0) {
                            this.data = new net.URLVariables(bytes.toString());
                        }
                        break;
                    default:
                        this.data = bytes;
                }
                this.dispatchEvent(event);
            };
            URLLoader.prototype.onProgress = function (event) {
                event = strict(event, net.ProgressEvent);
                event.target = this;
                this.bytesLoaded = ((event.bytesLoaded) >>> 0);
                this.bytesTotal = ((event.bytesTotal) >>> 0);
                this.dispatchEvent(event);
            };
            return URLLoader;
        }(net.EventDispatcher));
        net.URLLoader = URLLoader;
    })(net = flash.net || (flash.net = {}));
})(flash || (flash = {}));
//# sourceMappingURL=URLLoader.js.map