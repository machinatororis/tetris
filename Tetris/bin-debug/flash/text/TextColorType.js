var flash;
(function (flash) {
    var text;
    (function (text) {
        var TextColorType = (function () {
            function TextColorType() {
            }
            TextColorType.DARK_COLOR = "dark";
            TextColorType.LIGHT_COLOR = "light";
            return TextColorType;
        }());
        text.TextColorType = TextColorType;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TextColorType.js.map