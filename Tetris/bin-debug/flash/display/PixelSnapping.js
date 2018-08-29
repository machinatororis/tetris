var flash;
(function (flash) {
    var display;
    (function (display) {
        var PixelSnapping = (function () {
            function PixelSnapping() {
            }
            PixelSnapping.ALWAYS = "always";
            PixelSnapping.AUTO = "auto";
            PixelSnapping.NEVER = "never";
            return PixelSnapping;
        }());
        display.PixelSnapping = PixelSnapping;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=PixelSnapping.js.map