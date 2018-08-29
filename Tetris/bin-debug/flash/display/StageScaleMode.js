var flash;
(function (flash) {
    var display;
    (function (display) {
        var StageScaleMode = (function () {
            function StageScaleMode() {
            }
            StageScaleMode.SHOW_ALL = "showAll";
            StageScaleMode.EXACT_FIT = "exactFit";
            StageScaleMode.NO_BORDER = "noBorder";
            StageScaleMode.NO_SCALE = "noScale";
            return StageScaleMode;
        }());
        display.StageScaleMode = StageScaleMode;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=StageScaleMode.js.map