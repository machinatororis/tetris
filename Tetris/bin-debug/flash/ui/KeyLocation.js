var flash;
(function (flash) {
    var ui;
    (function (ui) {
        var KeyLocation = (function () {
            function KeyLocation() {
            }
            KeyLocation.STANDARD = 0;
            KeyLocation.LEFT = 1;
            KeyLocation.RIGHT = 2;
            KeyLocation.NUM_PAD = 3;
            KeyLocation.D_PAD = 4;
            return KeyLocation;
        }());
        ui.KeyLocation = KeyLocation;
    })(ui = flash.ui || (flash.ui = {}));
})(flash || (flash = {}));
//# sourceMappingURL=KeyLocation.js.map