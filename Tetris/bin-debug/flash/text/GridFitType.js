var flash;
(function (flash) {
    var text;
    (function (text) {
        var GridFitType = (function () {
            function GridFitType() {
            }
            GridFitType.NONE = "none";
            GridFitType.PIXEL = "pixel";
            GridFitType.SUBPIXEL = "subpixel";
            return GridFitType;
        }());
        text.GridFitType = GridFitType;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GridFitType.js.map