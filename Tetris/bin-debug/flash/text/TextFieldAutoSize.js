var flash;
(function (flash) {
    var text;
    (function (text) {
        var TextFieldAutoSize = (function () {
            function TextFieldAutoSize() {
            }
            TextFieldAutoSize.NONE = "none";
            TextFieldAutoSize.LEFT = "left";
            TextFieldAutoSize.CENTER = "center";
            TextFieldAutoSize.RIGHT = "right";
            return TextFieldAutoSize;
        }());
        text.TextFieldAutoSize = TextFieldAutoSize;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TextFieldAutoSize.js.map