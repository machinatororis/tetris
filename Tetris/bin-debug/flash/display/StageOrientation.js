var flash;
(function (flash) {
    var display;
    (function (display) {
        var StageOrientation = (function () {
            function StageOrientation() {
            }
            StageOrientation.LANDSCAPE = "landscape";
            StageOrientation.PORTRAIT = "portrait";
            return StageOrientation;
        }());
        display.StageOrientation = StageOrientation;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=StageOrientation.js.map