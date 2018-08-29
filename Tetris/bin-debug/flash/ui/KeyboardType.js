var flash;
(function (flash) {
    var ui;
    (function (ui) {
        var KeyboardType = (function () {
            function KeyboardType() {
            }
            KeyboardType.ALPHANUMERIC = "alphanumeric";
            KeyboardType.KEYPAD = "keypad";
            KeyboardType.NONE = "none";
            return KeyboardType;
        }());
        ui.KeyboardType = KeyboardType;
    })(ui = flash.ui || (flash.ui = {}));
})(flash || (flash = {}));
//# sourceMappingURL=KeyboardType.js.map