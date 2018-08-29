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
    var media;
    (function (media) {
        media.XML = global.XML;
        media.Event = flash.events.Event;
        media.EventDispatcher = flash.events.EventDispatcher;
        media.IOErrorEvent = flash.events.IOErrorEvent;
        media.ProgressEvent = flash.events.ProgressEvent;
        media.SecurityErrorEvent = flash.events.SecurityErrorEvent;
        media.URLRequest = flash.net.URLRequest;
        media.Capabilities = flash.system.Capabilities;
        media.ByteArray = flash.utils.ByteArray;
        var Sound = (function (_super) {
            __extends(Sound, _super);
            function Sound(stream, context) {
                if (stream === void 0) { stream = null; }
                if (context === void 0) { context = null; }
                var _this = this;
                stream = strict(stream, media.URLRequest);
                context = strict(context, media.SoundLoaderContext);
                _this._source === void 0 && (_this._source = null);
                _this._buffer === void 0 && (_this._buffer = null);
                _this._xhr === void 0 && (_this._xhr = null);
                _this._loops === void 0 && (_this._loops = 0);
                _this._sndTransform === void 0 && (_this._sndTransform = null);
                _this._stream === void 0 && (_this._stream = null);
                _this._context === void 0 && (_this._context = null);
                _this._queue === void 0 && (_this._queue = undefined);
                _this._request === void 0 && (_this._request = null);
                _this._bytesLoaded === void 0 && (_this._bytesLoaded = 0);
                _this._bytesTotal === void 0 && (_this._bytesTotal = 0);
                _this = _super.call(this) || this;
                _this._context = context;
                _this._stream = stream;
                _this._queue = new Array;
                var ctx = Sound.__getCtx();
                if (!ctx) {
                    return;
                }
                if (stream) {
                    _this.load(stream, context);
                }
                return _this;
            }
            Object.defineProperty(Sound.prototype, "url", {
                get: function () {
                    return this._request ? this._request.url : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sound.prototype, "isURLInaccessible", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Sound.prototype.load = function (stream, context) {
                if (context === void 0) { context = null; }
                stream = strict(stream, media.URLRequest);
                context = strict(context, media.SoundLoaderContext);
                var ctx = Sound.__getCtx();
                if (!ctx) {
                    return;
                }
                this._request = stream;
                var address = this._request.url;
                if (Sound.__base && address.substr(0, 3).toLowerCase() != 'www' && address.substr(0, 4).toLowerCase() != 'http') {
                    address = Sound.__base + address;
                }
                this._xhr = new XMLHttpRequest;
                this._xhr.open('GET', address);
                this._xhr.responseType = 'arraybuffer';
                this._xhr.onprogress = this.__onProgress.__bind(this);
                this._xhr.onreadystatechange = this.__onReadyStateChange.__bind(this);
                this._xhr.send();
                this.dispatchEvent(new media.Event(media.Event.OPEN));
            };
            Sound.prototype.loadCompressedDataFromByteArray = function (bytes, bytesLength) {
                bytes = strict(bytes, media.ByteArray);
                bytesLength = ((bytesLength) >>> 0);
                var ctx = Sound.__getCtx();
                if (!ctx) {
                    this.__decodeAudioDataSuccess(null);
                    return;
                }
                if (bytes.length > bytesLength) {
                    var copy = new media.ByteArray;
                    copy.writeBytes(bytes, 0, bytesLength);
                    bytes = strict(copy, media.ByteArray);
                }
                ctx.decodeAudioData(bytes.buffer, this.__decodeAudioDataSuccess.__bind(this), this.__decodeAudioDataError.__bind(this));
            };
            Sound.prototype.loadPCMFromByteArray = function (bytes, samples, format, stereo, sampleRate) {
                if (format === void 0) { format = "float"; }
                if (stereo === void 0) { stereo = true; }
                if (sampleRate === void 0) { sampleRate = 44100; }
                bytes = strict(bytes, media.ByteArray);
                samples = ((samples) >>> 0);
                format = as(format, 'String');
                stereo = Boolean(stereo);
                sampleRate = (+(sampleRate));
                this.dispatchEvent(new media.IOErrorEvent(media.IOErrorEvent.IO_ERROR));
            };
            Sound.prototype.play = function (startTime, loops, sndTransform) {
                if (startTime === void 0) { startTime = 0; }
                if (loops === void 0) { loops = 0; }
                if (sndTransform === void 0) { sndTransform = null; }
                startTime = (+(startTime));
                loops = ((loops) >> 0);
                sndTransform = strict(sndTransform, media.SoundTransform);
                var ctx = Sound.__getCtx();
                if (!ctx) {
                    return null;
                }
                var channel = new media.SoundChannel;
                if (sndTransform == null) {
                    sndTransform = new media.SoundTransform();
                }
                else {
                    sndTransform = sndTransform.clone();
                }
                this._sndTransform = sndTransform;
                this._loops = loops;
                if (!this._buffer && !this._xhr && this._stream && this._stream.url) {
                    this.load(this._stream, this._context);
                }
                if (this._buffer) {
                    bufferReady.__bind(this)();
                }
                else {
                    this._queue.push(bufferReady.__bind(this));
                }
                return channel;
                function bufferReady() {
                    var source = strict(ctx.createBufferSource(), AudioBufferSourceNode);
                    source.loop = loops > 0;
                    source.buffer = this._buffer;
                    source.connect(ctx.destination);
                    source.start(0, startTime / 1000);
                    this._source = source;
                    channel.__init(this._source, sndTransform, startTime / 1000);
                }
            };
            Object.defineProperty(Sound.prototype, "length", {
                get: function () {
                    if (this._buffer) {
                        return ((this._buffer.duration) >> 0) * 1000;
                    }
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sound.prototype, "isBuffering", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sound.prototype, "bytesLoaded", {
                get: function () { return this._bytesLoaded; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sound.prototype, "bytesTotal", {
                get: function () { return this._bytesTotal; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sound.prototype, "id3", {
                get: function () { return null; },
                enumerable: true,
                configurable: true
            });
            Sound.prototype.close = function () {
                this._request = null;
                this._bytesLoaded = this._bytesTotal = 0;
                if (this._xhr) {
                    try {
                        this._xhr.onreadystatechange = null;
                        this._xhr.onprogress = null;
                        this._xhr.abort();
                        this._xhr = null;
                    }
                    catch (e) {
                        e = window.asc.e2e(e);
                    }
                }
            };
            Sound.prototype.extract = function (target, length, startPosition) {
                if (startPosition === void 0) { startPosition = -1; }
                target = strict(target, media.ByteArray);
                length = (+(length));
                startPosition = (+(startPosition));
                return 0;
            };
            Sound.prototype.__fromAudioBuffer = function (buffer) {
                this._buffer = buffer;
            };
            Sound.prototype.__onProgress = function (e) {
                this._bytesLoaded = ((e.loaded) >> 0);
                this._bytesTotal = ((e.total) >> 0);
                this.dispatchEvent(new media.ProgressEvent(media.ProgressEvent.PROGRESS, false, false, this._bytesLoaded, this._bytesTotal));
            };
            Sound.prototype.__onReadyStateChange = function (e) {
                var ctx = Sound.__getCtx();
                var readyState = this._xhr.readyState;
                var status = this._xhr.status;
                if (readyState == 4 && status == 200) {
                    ctx.decodeAudioData(this._xhr.response, this.__decodeAudioDataSuccess.__bind(this), this.__decodeAudioDataError.__bind(this));
                }
                else if (readyState == 4 && (status == 403 || status == 404)) {
                    this.dispatchEvent(new media.IOErrorEvent(media.IOErrorEvent.IO_ERROR));
                }
                else if (readyState == 4 && status == 0) {
                    this.dispatchEvent(new media.SecurityErrorEvent(media.SecurityErrorEvent.SECURITY_ERROR));
                }
            };
            Sound.prototype.__decodeAudioDataSuccess = function (buffer) {
                this.__fromAudioBuffer(buffer);
                while (this._queue.length) {
                    this._queue.shift()();
                }
                this.dispatchEvent(new media.Event(media.Event.COMPLETE));
            };
            Sound.prototype.__decodeAudioDataError = function () {
                this.dispatchEvent(new media.IOErrorEvent(media.IOErrorEvent.IO_ERROR));
            };
            Sound.__getCtx = function () {
                if (Sound.__ctxDisabled) {
                    return null;
                }
                if (!Sound.__ctx) {
                    if (typeof window.AudioContext != "undefined") {
                        Sound.__ctx = new window.AudioContext;
                    }
                    else if (typeof window.webkitAudioContext != "undefined") {
                        Sound.__ctx = new window.webkitAudioContext;
                    }
                    else {
                        Sound.__ctxDisabled = true;
                    }
                    if (Sound.__ctx) {
                        Sound.__fixCtx();
                        Sound.__ctx.onstatechange = Sound.__fixCtx.__bind(this);
                    }
                }
                return Sound.__ctx;
            };
            Sound.__isSuspended = function () {
                return Sound.__ctx && typeof Sound.__ctx.state == 'string' && Sound.__ctx.state != 'running';
            };
            Sound.__fixCtx = function () {
                if (!Sound.__ctx) {
                    return;
                }
                if (Sound.__isSuspended()) {
                    window.removeEventListener("click", Sound.__resumeCtx.__bind(this));
                    window.addEventListener("click", Sound.__resumeCtx.__bind(this));
                    if (media.Capabilities.isMobile) {
                        window.removeEventListener("touchstart", Sound.__resumeCtx.__bind(this));
                        window.addEventListener("touchstart", Sound.__resumeCtx.__bind(this));
                    }
                }
            };
            Sound.__resumeCtx = function () {
                if (!Sound.__ctx) {
                    return;
                }
                if (typeof Sound.__ctx.resume == 'function') {
                    Sound.__ctx.resume();
                }
                if (Sound.__isSuspended()) {
                    return;
                }
                window.removeEventListener("click", Sound.__resumeCtx.__bind(this));
                if (media.Capabilities.isMobile) {
                    window.removeEventListener("touchstart", Sound.__resumeCtx.__bind(this));
                }
            };
            Sound.__base = '';
            Sound.__ctx = undefined;
            Sound.__ctxDisabled = false;
            return Sound;
        }(media.EventDispatcher));
        media.Sound = Sound;
    })(media = flash.media || (flash.media = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Sound.js.map