var flash;
(function (flash) {
    var text;
    (function (text) {
        var TextFieldType = (function () {
            function TextFieldType() {
            }
            TextFieldType.INPUT = "input";
            TextFieldType.DYNAMIC = "dynamic";
            return TextFieldType;
        }());
        text.TextFieldType = TextFieldType;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TextFieldType.js.map