var flash;
(function (flash) {
    var display;
    (function (display) {
        var StageDisplayState = (function () {
            function StageDisplayState() {
            }
            StageDisplayState.FULL_SCREEN = "fullScreen";
            StageDisplayState.FULL_SCREEN_INTERACTIVE = "fullScreenInteractive";
            StageDisplayState.NORMAL = "normal";
            return StageDisplayState;
        }());
        display.StageDisplayState = StageDisplayState;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=StageDisplayState.js.map