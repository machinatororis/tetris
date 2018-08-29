var flash;
(function (flash) {
    var display;
    (function (display) {
        display.Matrix = flash.geom.Matrix;
        var GraphicsBitmapFill = (function () {
            function GraphicsBitmapFill(bitmapData, matrix, repeat, smooth) {
                if (bitmapData === void 0) { bitmapData = null; }
                if (matrix === void 0) { matrix = null; }
                if (repeat === void 0) { repeat = true; }
                if (smooth === void 0) { smooth = false; }
                this.implements_flash_display_IGraphicsData = null;
                this.implements_flash_display_IGraphicsFill = null;
                this.bitmapData = null;
                this.matrix = null;
                this.repeat = false;
                this.smooth = false;
                bitmapData = strict(bitmapData, display.BitmapData);
                matrix = strict(matrix, display.Matrix);
                repeat = Boolean(repeat);
                smooth = Boolean(smooth);
                this.bitmapData = bitmapData;
                this.matrix = matrix || new display.Matrix;
                this.repeat = repeat;
                this.smooth = smooth;
            }
            return GraphicsBitmapFill;
        }());
        display.GraphicsBitmapFill = GraphicsBitmapFill;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GraphicsBitmapFill.js.map