var flash;
(function (flash) {
    var text;
    (function (text) {
        var TextFormatAlign = (function () {
            function TextFormatAlign() {
            }
            TextFormatAlign.LEFT = "left";
            TextFormatAlign.CENTER = "center";
            TextFormatAlign.RIGHT = "right";
            TextFormatAlign.JUSTIFY = "justify";
            TextFormatAlign.START = "start";
            TextFormatAlign.END = "end";
            return TextFormatAlign;
        }());
        text.TextFormatAlign = TextFormatAlign;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TextFormatAlign.js.map