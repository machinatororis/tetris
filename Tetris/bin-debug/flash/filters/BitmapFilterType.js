var flash;
(function (flash) {
    var filters;
    (function (filters) {
        var BitmapFilterType = (function () {
            function BitmapFilterType() {
            }
            BitmapFilterType.FULL = "full";
            BitmapFilterType.INNER = "inner";
            BitmapFilterType.OUTER = "outer";
            return BitmapFilterType;
        }());
        filters.BitmapFilterType = BitmapFilterType;
    })(filters = flash.filters || (flash.filters = {}));
})(flash || (flash = {}));
//# sourceMappingURL=BitmapFilterType.js.map