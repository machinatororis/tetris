var flash;
(function (flash) {
    var media;
    (function (media) {
        media.ByteArray = flash.utils.ByteArray;
        var SoundMixer = (function () {
            function SoundMixer() {
            }
            Object.defineProperty(SoundMixer, "bufferTime", {
                get: function () { return 0; },
                set: function (param1) { param1 = ((param1) >> 0); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundMixer, "soundTransform", {
                get: function () { return SoundMixer.__soundTransform; },
                set: function (value) {
                    value = strict(value, media.SoundTransform);
                    SoundMixer.__soundTransform = value.clone();
                    var __for0 = window.asc.of(SoundMixer.__soundChannels);
                    for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                        var channel = __for0_1[_i];
                        channel.soundTransform = channel.soundTransform;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundMixer, "audioPlaybackMode", {
                get: function () { return null; },
                set: function (mode) { mode = as(mode, 'String'); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundMixer, "useSpeakerphoneForVoice", {
                get: function () { return false; },
                set: function (b) { b = Boolean(b); },
                enumerable: true,
                configurable: true
            });
            SoundMixer.stopAll = function () {
                while (SoundMixer.__soundChannels.length) {
                    try {
                        SoundMixer.__soundChannels[0].stop();
                    }
                    catch (e) {
                        e = window.asc.e2e(e);
                    }
                }
            };
            SoundMixer.computeSpectrum = function (outputArray, FFTMode, stretchFactor) {
                if (FFTMode === void 0) { FFTMode = false; }
                if (stretchFactor === void 0) { stretchFactor = 0; }
                outputArray = strict(outputArray, media.ByteArray);
                FFTMode = Boolean(FFTMode);
                stretchFactor = ((stretchFactor) >> 0);
            };
            SoundMixer.areSoundsInaccessible = function () {
                return false;
            };
            SoundMixer.__registerSoundChannel = function (soundChannel) {
                var index = SoundMixer.__soundChannels.indexOf(soundChannel);
                if (index >= 0) {
                    return;
                }
                SoundMixer.__soundChannels[SoundMixer.__soundChannels.length] = soundChannel;
            };
            SoundMixer.__unregisterSoundChannel = function (soundChannel) {
                var index = SoundMixer.__soundChannels.indexOf(soundChannel);
                if (index == -1) {
                    return;
                }
                SoundMixer.__soundChannels.splice(index, 1);
            };
            SoundMixer.__setMute = function (value) {
                SoundMixer.__muted = value;
                SoundMixer.soundTransform = SoundMixer.soundTransform;
            };
            SoundMixer.__muted = false;
            SoundMixer.__soundChannels = [];
            SoundMixer.__soundTransform = asc.sti(SoundMixer, function () { SoundMixer.__soundTransform = new media.SoundTransform; });
            return SoundMixer;
        }());
        media.SoundMixer = SoundMixer;
    })(media = flash.media || (flash.media = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SoundMixer.js.map