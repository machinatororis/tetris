var flash;
(function (flash) {
    var media;
    (function (media) {
        var SoundTransform = (function () {
            function SoundTransform(vol, panning) {
                if (vol === void 0) { vol = 1; }
                if (panning === void 0) { panning = 0; }
                this._volume = NaN;
                this._pan = NaN;
                vol = (+(vol));
                panning = (+(panning));
                this._volume = vol;
                this._pan = panning;
            }
            Object.defineProperty(SoundTransform.prototype, "volume", {
                get: function () { return this._volume; },
                set: function (vol) { vol = (+(vol)); this._volume = vol; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundTransform.prototype, "pan", {
                get: function () { return this._pan; },
                set: function (panning) { panning = (+(panning)); this._pan = panning; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundTransform.prototype, "leftToLeft", {
                get: function () { return 0; },
                set: function (value) { value = (+(value)); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundTransform.prototype, "leftToRight", {
                get: function () { return 0; },
                set: function (value) { value = (+(value)); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundTransform.prototype, "rightToRight", {
                get: function () { return 0; },
                set: function (value) { value = (+(value)); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundTransform.prototype, "rightToLeft", {
                get: function () { return 0; },
                set: function (value) { value = (+(value)); },
                enumerable: true,
                configurable: true
            });
            SoundTransform.prototype.clone = function () {
                return new SoundTransform(this._volume, this._pan);
            };
            return SoundTransform;
        }());
        media.SoundTransform = SoundTransform;
    })(media = flash.media || (flash.media = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SoundTransform.js.map