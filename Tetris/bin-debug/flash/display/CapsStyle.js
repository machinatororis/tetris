var flash;
(function (flash) {
    var display;
    (function (display) {
        var CapsStyle = (function () {
            function CapsStyle() {
            }
            CapsStyle.ROUND = "round";
            CapsStyle.NONE = "none";
            CapsStyle.SQUARE = "square";
            return CapsStyle;
        }());
        display.CapsStyle = CapsStyle;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=CapsStyle.js.map