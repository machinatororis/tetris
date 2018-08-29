var flash;
(function (flash) {
    var display;
    (function (display) {
        var StageAlign = (function () {
            function StageAlign() {
            }
            StageAlign.TOP = "T";
            StageAlign.LEFT = "L";
            StageAlign.BOTTOM = "B";
            StageAlign.RIGHT = "R";
            StageAlign.TOP_LEFT = "TL";
            StageAlign.TOP_RIGHT = "TR";
            StageAlign.BOTTOM_LEFT = "BL";
            StageAlign.BOTTOM_RIGHT = "BR";
            return StageAlign;
        }());
        display.StageAlign = StageAlign;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=StageAlign.js.map