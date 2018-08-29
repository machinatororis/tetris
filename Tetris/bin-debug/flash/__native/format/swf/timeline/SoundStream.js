var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var timeline;
                (function (timeline) {
                    timeline.ByteArray = flash.utils.ByteArray;
                    var SoundStream = (function () {
                        function SoundStream() {
                            this.startFrame = 0;
                            this.numFrames = 0;
                            this.numSamples = 0;
                            this.compression = 0;
                            this.rate = 0;
                            this.size = 0;
                            this.type = 0;
                            this._data = null;
                            this._data = new timeline.ByteArray();
                        }
                        Object.defineProperty(SoundStream.prototype, "data", {
                            get: function () { return this._data; },
                            enumerable: true,
                            configurable: true
                        });
                        SoundStream.prototype.toString = function () {
                            return "[SoundStream] " +
                                "StartFrame: " + this.startFrame + ", " +
                                "Frames: " + this.numFrames + ", " +
                                "Samples: " + this.numSamples + ", " +
                                "Bytes: " + this.data.length;
                        };
                        return SoundStream;
                    }());
                    timeline.SoundStream = SoundStream;
                })(timeline = swf.timeline || (swf.timeline = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SoundStream.js.map