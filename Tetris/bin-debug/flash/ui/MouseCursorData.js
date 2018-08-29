var flash;
(function (flash) {
    var ui;
    (function (ui) {
        ui.BitmapData = flash.display.BitmapData;
        ui.Point = flash.geom.Point;
        var MouseCursorData = (function () {
            function MouseCursorData() {
                this.data = new Array;
                this.frameRate = 0;
                this.hotSpot = null;
                this.base64 = null;
            }
            return MouseCursorData;
        }());
        ui.MouseCursorData = MouseCursorData;
    })(ui = flash.ui || (flash.ui = {}));
})(flash || (flash = {}));
//# sourceMappingURL=MouseCursorData.js.map