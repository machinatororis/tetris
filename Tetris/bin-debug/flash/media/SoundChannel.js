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
        media.Event = flash.events.Event;
        media.EventDispatcher = flash.events.EventDispatcher;
        var SoundChannel = (function (_super) {
            __extends(SoundChannel, _super);
            function SoundChannel() {
                var _this = this;
                _this._transform === void 0 && (_this._transform = null);
                _this._offset === void 0 && (_this._offset = 0);
                _this._startedAt === void 0 && (_this._startedAt = 0);
                _this._source === void 0 && (_this._source = null);
                _this._gainNode === void 0 && (_this._gainNode = null);
                _this = _super.call(this) || this;
                _this._transform = new media.SoundTransform;
                media.SoundMixer.__registerSoundChannel(_this);
                return _this;
            }
            Object.defineProperty(SoundChannel.prototype, "position", {
                get: function () {
                    var ctx = media.Sound.__getCtx();
                    if (!ctx) {
                        return 0;
                    }
                    if (this._startedAt) {
                        return ((((ctx.currentTime - this._startedAt) + this._offset) * 1000) >> 0);
                    }
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundChannel.prototype, "soundTransform", {
                get: function () { return this._transform; },
                set: function (v) {
                    v = strict(v, media.SoundTransform);
                    var ctx = media.Sound.__getCtx();
                    if (!ctx) {
                        return;
                    }
                    if (!v) {
                        throw new Error('Parameter soundChannel must be non-null.', 2007);
                    }
                    this._transform.pan = v.pan;
                    this._transform.volume = v.volume;
                    if (this._gainNode) {
                        var mixerVolume = media.SoundMixer.__muted ? 0.0 : media.SoundMixer.__soundTransform.volume;
                        var mixedVolume = this._transform.volume * mixerVolume;
                        var jsVolume = mixedVolume * 2 - 1;
                        if ('setValueAtTime' in this._gainNode.gain) {
                            this._gainNode.gain.setValueAtTime(jsVolume, ctx.currentTime);
                        }
                        else {
                            this._gainNode.gain.value = jsVolume;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            SoundChannel.prototype.stop = function () {
                media.SoundMixer.__unregisterSoundChannel(this);
                if (this._source) {
                    this._source.onended = null;
                    this._source.disconnect();
                    this._source.stop(0);
                    this._source = null;
                    this._startedAt = 0;
                }
            };
            Object.defineProperty(SoundChannel.prototype, "leftPeak", {
                get: function () { return 0; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundChannel.prototype, "rightPeak", {
                get: function () { return 0; },
                enumerable: true,
                configurable: true
            });
            SoundChannel.prototype.__init = function (source, transform, offset) {
                var ctx = media.Sound.__getCtx();
                if (!ctx) {
                    return;
                }
                this._offset = offset;
                this._source = source;
                this._source.onended = this.__onEnded.__bind(this);
                this._gainNode = strict(ctx.createGain(), GainNode);
                this._source.connect(this._gainNode);
                this._gainNode.connect(ctx.destination);
                this._startedAt = (+(ctx.currentTime));
                this.soundTransform = transform || this.soundTransform;
            };
            SoundChannel.prototype.__onEnded = function () {
                this.dispatchEvent(new media.Event(media.Event.SOUND_COMPLETE));
            };
            return SoundChannel;
        }(media.EventDispatcher));
        media.SoundChannel = SoundChannel;
    })(media = flash.media || (flash.media = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SoundChannel.js.map