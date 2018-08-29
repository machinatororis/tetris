var flash;
(function (flash) {
    var media;
    (function (media) {
        var SoundLoaderContext = (function () {
            function SoundLoaderContext(bufferTime, checkPolicyFile) {
                if (bufferTime === void 0) { bufferTime = 1000; }
                if (checkPolicyFile === void 0) { checkPolicyFile = false; }
                this.bufferTime = NaN;
                this.checkPolicyFile = false;
                bufferTime = (+(bufferTime));
                checkPolicyFile = Boolean(checkPolicyFile);
                this.checkPolicyFile = checkPolicyFile;
                this.bufferTime = bufferTime;
            }
            return SoundLoaderContext;
        }());
        media.SoundLoaderContext = SoundLoaderContext;
    })(media = flash.media || (flash.media = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SoundLoaderContext.js.map