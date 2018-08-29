var flash;
(function (flash) {
    var display;
    (function (display) {
        var LineScaleMode = (function () {
            function LineScaleMode() {
            }
            LineScaleMode.NORMAL = "normal";
            LineScaleMode.VERTICAL = "vertical";
            LineScaleMode.HORIZONTAL = "horizontal";
            LineScaleMode.NONE = "none";
            return LineScaleMode;
        }());
        display.LineScaleMode = LineScaleMode;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=LineScaleMode.js.map