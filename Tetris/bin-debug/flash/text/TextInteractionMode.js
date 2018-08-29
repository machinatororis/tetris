var flash;
(function (flash) {
    var text;
    (function (text) {
        var TextInteractionMode = (function () {
            function TextInteractionMode() {
            }
            TextInteractionMode.NORMAL = "normal";
            TextInteractionMode.SELECTION = "selection";
            return TextInteractionMode;
        }());
        text.TextInteractionMode = TextInteractionMode;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TextInteractionMode.js.map