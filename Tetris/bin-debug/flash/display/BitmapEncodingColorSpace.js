var flash;
(function (flash) {
    var display;
    (function (display) {
        var BitmapEncodingColorSpace = (function () {
            function BitmapEncodingColorSpace() {
            }
            BitmapEncodingColorSpace.COLORSPACE_4_2_0 = "4:2:0";
            BitmapEncodingColorSpace.COLORSPACE_4_2_2 = "4:2:2";
            BitmapEncodingColorSpace.COLORSPACE_4_4_4 = "4:4:4";
            BitmapEncodingColorSpace.COLORSPACE_AUTO = "auto";
            return BitmapEncodingColorSpace;
        }());
        display.BitmapEncodingColorSpace = BitmapEncodingColorSpace;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=BitmapEncodingColorSpace.js.map