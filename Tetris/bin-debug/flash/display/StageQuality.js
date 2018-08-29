var flash;
(function (flash) {
    var display;
    (function (display) {
        var StageQuality = (function () {
            function StageQuality() {
            }
            StageQuality.LOW = "low";
            StageQuality.MEDIUM = "medium";
            StageQuality.HIGH = "high";
            StageQuality.BEST = "best";
            StageQuality.HIGH_8X8 = "8x8";
            StageQuality.HIGH_8X8_LINEAR = "8x8linear";
            StageQuality.HIGH_16X16 = "16x16";
            StageQuality.HIGH_16X16_LINEAR = "16x16linear";
            return StageQuality;
        }());
        display.StageQuality = StageQuality;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=StageQuality.js.map