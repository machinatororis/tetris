var flash;
(function (flash) {
    var text;
    (function (text) {
        var TextDisplayMode = (function () {
            function TextDisplayMode() {
            }
            TextDisplayMode.LCD = "lcd";
            TextDisplayMode.CRT = "crt";
            TextDisplayMode.DEFAULT = "default";
            return TextDisplayMode;
        }());
        text.TextDisplayMode = TextDisplayMode;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TextDisplayMode.js.map