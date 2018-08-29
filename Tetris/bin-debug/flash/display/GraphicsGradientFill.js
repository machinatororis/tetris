var flash;
(function (flash) {
    var display;
    (function (display) {
        display.Matrix = flash.geom.Matrix;
        var GraphicsGradientFill = (function () {
            function GraphicsGradientFill(type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
                if (type === void 0) { type = "linear"; }
                if (colors === void 0) { colors = null; }
                if (alphas === void 0) { alphas = null; }
                if (ratios === void 0) { ratios = null; }
                if (matrix === void 0) { matrix = null; }
                if (spreadMethod === void 0) { spreadMethod = "pad"; }
                if (interpolationMethod === void 0) { interpolationMethod = "rgb"; }
                if (focalPointRatio === void 0) { focalPointRatio = 0.0; }
                this.implements_flash_display_IGraphicsData = null;
                this.implements_flash_display_IGraphicsFill = null;
                this.colors = null;
                this.alphas = null;
                this.ratios = null;
                this.matrix = null;
                this.interpolationMethod = null;
                this.type = null;
                this.spreadMethod = null;
                this.focalPointRatio = NaN;
                type = as(type, 'String');
                colors = strict(colors, Array);
                alphas = strict(alphas, Array);
                ratios = strict(ratios, Array);
                matrix = strict(matrix, display.Matrix);
                interpolationMethod = as(interpolationMethod, 'String');
                focalPointRatio = (+(focalPointRatio));
                this.type = type;
                this.colors = colors;
                this.alphas = alphas;
                this.ratios = ratios;
                this.matrix = matrix;
                this.spreadMethod = as(this.spreadMethod, 'String');
                this.interpolationMethod = interpolationMethod;
                this.focalPointRatio = focalPointRatio;
            }
            return GraphicsGradientFill;
        }());
        display.GraphicsGradientFill = GraphicsGradientFill;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GraphicsGradientFill.js.map