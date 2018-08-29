var flash;
(function (flash) {
    var display;
    (function (display) {
        var PNGEncoderOptions = (function () {
            function PNGEncoderOptions(fastCompression) {
                if (fastCompression === void 0) { fastCompression = false; }
                this.fastCompression = false;
                fastCompression = Boolean(fastCompression);
                this.fastCompression = fastCompression;
            }
            return PNGEncoderOptions;
        }());
        display.PNGEncoderOptions = PNGEncoderOptions;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=PNGEncoderOptions.js.map