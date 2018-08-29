var flash;
(function (flash) {
    var ui;
    (function (ui) {
        var MultitouchInputMode = (function () {
            function MultitouchInputMode() {
            }
            MultitouchInputMode.NONE = "none";
            MultitouchInputMode.GESTURE = "gesture";
            MultitouchInputMode.TOUCH_POINT = "touchPoint";
            return MultitouchInputMode;
        }());
        ui.MultitouchInputMode = MultitouchInputMode;
    })(ui = flash.ui || (flash.ui = {}));
})(flash || (flash = {}));
//# sourceMappingURL=MultitouchInputMode.js.map