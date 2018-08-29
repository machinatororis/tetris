var flash;
(function (flash) {
    var text;
    (function (text) {
        var TextFormatDisplay = (function () {
            function TextFormatDisplay() {
            }
            TextFormatDisplay.INLINE = "inline";
            TextFormatDisplay.BLOCK = "block";
            return TextFormatDisplay;
        }());
        text.TextFormatDisplay = TextFormatDisplay;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TextFormatDisplay.js.map