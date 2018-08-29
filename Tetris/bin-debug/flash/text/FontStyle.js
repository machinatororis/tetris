var flash;
(function (flash) {
    var text;
    (function (text) {
        var FontStyle = (function () {
            function FontStyle() {
            }
            FontStyle.REGULAR = "regular";
            FontStyle.BOLD = "bold";
            FontStyle.ITALIC = "italic";
            FontStyle.BOLD_ITALIC = "boldItalic";
            return FontStyle;
        }());
        text.FontStyle = FontStyle;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=FontStyle.js.map