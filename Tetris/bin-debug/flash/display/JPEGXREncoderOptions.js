var flash;
(function (flash) {
    var display;
    (function (display) {
        var JPEGXREncoderOptions = (function () {
            function JPEGXREncoderOptions(quantization, colorSpace, trimFlexBits) {
                if (quantization === void 0) { quantization = 20; }
                if (colorSpace === void 0) { colorSpace = "auto"; }
                if (trimFlexBits === void 0) { trimFlexBits = 0; }
                this.colorSpace = null;
                this.quantization = 0;
                this.trimFlexBits = 0;
                quantization = ((quantization) >>> 0);
                colorSpace = as(colorSpace, 'String');
                trimFlexBits = ((trimFlexBits) >>> 0);
                this.quantization = quantization;
                this.colorSpace = colorSpace;
                this.trimFlexBits = trimFlexBits;
            }
            return JPEGXREncoderOptions;
        }());
        display.JPEGXREncoderOptions = JPEGXREncoderOptions;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=JPEGXREncoderOptions.js.map