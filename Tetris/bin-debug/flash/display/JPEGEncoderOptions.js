var flash;
(function (flash) {
    var display;
    (function (display) {
        var JPEGEncoderOptions = (function () {
            function JPEGEncoderOptions(quality) {
                if (quality === void 0) { quality = 80; }
                this.quality = 0;
                quality = ((quality) >>> 0);
                this.quality = quality;
            }
            return JPEGEncoderOptions;
        }());
        display.JPEGEncoderOptions = JPEGEncoderOptions;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=JPEGEncoderOptions.js.map