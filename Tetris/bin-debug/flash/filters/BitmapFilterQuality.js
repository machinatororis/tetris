var flash;
(function (flash) {
    var filters;
    (function (filters) {
        var BitmapFilterQuality = (function () {
            function BitmapFilterQuality() {
            }
            BitmapFilterQuality.HIGH = 3;
            BitmapFilterQuality.LOW = 1;
            BitmapFilterQuality.MEDIUM = 2;
            return BitmapFilterQuality;
        }());
        filters.BitmapFilterQuality = BitmapFilterQuality;
    })(filters = flash.filters || (flash.filters = {}));
})(flash || (flash = {}));
//# sourceMappingURL=BitmapFilterQuality.js.map