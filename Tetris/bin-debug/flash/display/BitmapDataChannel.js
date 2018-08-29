var flash;
(function (flash) {
    var display;
    (function (display) {
        var BitmapDataChannel = (function () {
            function BitmapDataChannel() {
            }
            BitmapDataChannel.ALPHA = 8;
            BitmapDataChannel.BLUE = 4;
            BitmapDataChannel.GREEN = 2;
            BitmapDataChannel.RED = 1;
            return BitmapDataChannel;
        }());
        display.BitmapDataChannel = BitmapDataChannel;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=BitmapDataChannel.js.map