var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf_1) {
                var exporters;
                (function (exporters) {
                    exporters.SWFTimelineContainer = flash.__native.format.swf.SWFTimelineContainer;
                    exporters.DefaultShapeExporter = flash.__native.format.swf.exporters.core.DefaultShapeExporter;
                    exporters.BitmapData = flash.display.BitmapData;
                    exporters.CapsStyle = flash.display.CapsStyle;
                    exporters.Graphics = flash.display.Graphics;
                    exporters.InterpolationMethod = flash.display.InterpolationMethod;
                    exporters.JointStyle = flash.display.JointStyle;
                    exporters.LineScaleMode = flash.display.LineScaleMode;
                    exporters.SpreadMethod = flash.display.SpreadMethod;
                    exporters.Matrix = flash.geom.Matrix;
                    var AS3GraphicsDataShapeExporter = (function (_super) {
                        __extends(AS3GraphicsDataShapeExporter, _super);
                        function AS3GraphicsDataShapeExporter(swf, graphics) {
                            if (swf === void 0) { swf = null; }
                            if (graphics === void 0) { graphics = null; }
                            var _this = this;
                            swf = strict(swf, exporters.SWFTimelineContainer);
                            graphics = strict(graphics, exporters.Graphics);
                            _this.graphics === void 0 && (_this.graphics = null);
                            _this = _super.call(this, swf) || this;
                            _this.graphics = graphics;
                            return _this;
                        }
                        AS3GraphicsDataShapeExporter.prototype.beginShape = function () {
                            this.graphics.clear();
                        };
                        AS3GraphicsDataShapeExporter.prototype.endShape = function () {
                        };
                        AS3GraphicsDataShapeExporter.prototype.beginFills = function () {
                        };
                        AS3GraphicsDataShapeExporter.prototype.endFills = function () {
                        };
                        AS3GraphicsDataShapeExporter.prototype.beginLines = function () {
                        };
                        AS3GraphicsDataShapeExporter.prototype.endLines = function (close) {
                            close = Boolean(close);
                            this.graphics.lineStyle(NaN);
                        };
                        AS3GraphicsDataShapeExporter.prototype.beginFill = function (color, alpha) {
                            if (alpha === void 0) { alpha = 1.0; }
                            color = ((color) >>> 0);
                            alpha = (+(alpha));
                            this.graphics.beginFill(color, alpha);
                        };
                        AS3GraphicsDataShapeExporter.prototype.beginGradientFill = function (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
                            if (matrix === void 0) { matrix = null; }
                            if (spreadMethod === void 0) { spreadMethod = exporters.SpreadMethod.PAD; }
                            if (interpolationMethod === void 0) { interpolationMethod = exporters.InterpolationMethod.RGB; }
                            if (focalPointRatio === void 0) { focalPointRatio = 0; }
                            type = as(type, 'String');
                            colors = strict(colors, Array);
                            alphas = strict(alphas, Array);
                            ratios = strict(ratios, Array);
                            matrix = strict(matrix, exporters.Matrix);
                            spreadMethod = as(spreadMethod, 'String');
                            interpolationMethod = as(interpolationMethod, 'String');
                            focalPointRatio = (+(focalPointRatio));
                            this.graphics.beginGradientFill(type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio);
                        };
                        AS3GraphicsDataShapeExporter.prototype.beginBitmapFill = function (bitmapId, matrix, repeat, smooth) {
                            if (matrix === void 0) { matrix = null; }
                            if (repeat === void 0) { repeat = true; }
                            if (smooth === void 0) { smooth = false; }
                            bitmapId = ((bitmapId) >>> 0);
                            matrix = strict(matrix, exporters.Matrix);
                            repeat = Boolean(repeat);
                            smooth = Boolean(smooth);
                            var bitmap = strict(this.swf.getTag(bitmapId).instance, exporters.BitmapData);
                            this.graphics.beginBitmapFill(bitmap, matrix, repeat, smooth);
                        };
                        AS3GraphicsDataShapeExporter.prototype.endFill = function () {
                            this.graphics.endFill();
                        };
                        AS3GraphicsDataShapeExporter.prototype.lineStyle = function (thickness, color, alpha, pixelHinting, scaleMode, startCaps, endCaps, joints, miterLimit) {
                            if (thickness === void 0) { thickness = NaN; }
                            if (color === void 0) { color = 0; }
                            if (alpha === void 0) { alpha = 1.0; }
                            if (pixelHinting === void 0) { pixelHinting = false; }
                            if (scaleMode === void 0) { scaleMode = exporters.LineScaleMode.NORMAL; }
                            if (startCaps === void 0) { startCaps = exporters.CapsStyle.ROUND; }
                            if (endCaps === void 0) { endCaps = exporters.CapsStyle.ROUND; }
                            if (joints === void 0) { joints = exporters.JointStyle.ROUND; }
                            if (miterLimit === void 0) { miterLimit = 3; }
                            thickness = (+(thickness));
                            color = ((color) >>> 0);
                            alpha = (+(alpha));
                            pixelHinting = Boolean(pixelHinting);
                            scaleMode = as(scaleMode, 'String');
                            startCaps = as(startCaps, 'String');
                            endCaps = as(endCaps, 'String');
                            joints = as(joints, 'String');
                            miterLimit = (+(miterLimit));
                            this.graphics.lineStyle(thickness, color, alpha, pixelHinting, scaleMode, startCaps, joints, miterLimit);
                        };
                        AS3GraphicsDataShapeExporter.prototype.lineGradientStyle = function (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
                            if (matrix === void 0) { matrix = null; }
                            if (spreadMethod === void 0) { spreadMethod = exporters.SpreadMethod.PAD; }
                            if (interpolationMethod === void 0) { interpolationMethod = exporters.InterpolationMethod.RGB; }
                            if (focalPointRatio === void 0) { focalPointRatio = 0; }
                            type = as(type, 'String');
                            colors = strict(colors, Array);
                            alphas = strict(alphas, Array);
                            ratios = strict(ratios, Array);
                            matrix = strict(matrix, exporters.Matrix);
                            spreadMethod = as(spreadMethod, 'String');
                            interpolationMethod = as(interpolationMethod, 'String');
                            focalPointRatio = (+(focalPointRatio));
                            this.graphics.lineGradientStyle(type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio);
                        };
                        AS3GraphicsDataShapeExporter.prototype.moveTo = function (x, y) {
                            x = (+(x));
                            y = (+(y));
                            this.graphics.moveTo(x, y);
                        };
                        AS3GraphicsDataShapeExporter.prototype.lineTo = function (x, y) {
                            x = (+(x));
                            y = (+(y));
                            this.graphics.lineTo(x, y);
                        };
                        AS3GraphicsDataShapeExporter.prototype.curveTo = function (controlX, controlY, anchorX, anchorY) {
                            controlX = (+(controlX));
                            controlY = (+(controlY));
                            anchorX = (+(anchorX));
                            anchorY = (+(anchorY));
                            this.graphics.curveTo(controlX, controlY, anchorX, anchorY);
                        };
                        return AS3GraphicsDataShapeExporter;
                    }(exporters.DefaultShapeExporter));
                    exporters.AS3GraphicsDataShapeExporter = AS3GraphicsDataShapeExporter;
                })(exporters = swf_1.exporters || (swf_1.exporters = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=AS3GraphicsDataShapeExporter.js.map