var flash;
(function (flash) {
    var display;
    (function (display) {
        var GraphicsSolidFill = (function () {
            function GraphicsSolidFill(color, alpha) {
                if (color === void 0) { color = 0; }
                if (alpha === void 0) { alpha = 1.0; }
                this.implements_flash_display_IGraphicsData = null;
                this.implements_flash_display_IGraphicsFill = null;
                this.color = 0;
                this.alpha = 1.0;
                color = ((color) >>> 0);
                alpha = (+(alpha));
                this.color = color;
                this.alpha = alpha;
            }
            return GraphicsSolidFill;
        }());
        display.GraphicsSolidFill = GraphicsSolidFill;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GraphicsSolidFill.js.map