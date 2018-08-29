var flash;
(function (flash) {
    var text;
    (function (text) {
        var FontType = (function () {
            function FontType() {
            }
            FontType.EMBEDDED = "embedded";
            FontType.EMBEDDED_CFF = "embeddedCFF";
            FontType.DEVICE = "device";
            return FontType;
        }());
        text.FontType = FontType;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=FontType.js.map