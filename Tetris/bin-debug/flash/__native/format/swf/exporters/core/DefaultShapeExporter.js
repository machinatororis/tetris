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
                    var core;
                    (function (core) {
                        core.SWFTimelineContainer = flash.__native.format.swf.SWFTimelineContainer;
                        core.InterpolationMethod = flash.display.InterpolationMethod;
                        core.LineScaleMode = flash.display.LineScaleMode;
                        core.SpreadMethod = flash.display.SpreadMethod;
                        core.Matrix = flash.geom.Matrix;
                        var DefaultShapeExporter = (function () {
                            function DefaultShapeExporter(swf) {
                                this.implements_flash___native_format_swf_exporters_core_IShapeExporter = null;
                                this.swf = null;
                                swf = strict(swf, core.SWFTimelineContainer);
                                this.swf = swf;
                            }
                            DefaultShapeExporter.prototype.beginShape = function () { };
                            DefaultShapeExporter.prototype.endShape = function () { };
                            DefaultShapeExporter.prototype.beginFills = function () { };
                            DefaultShapeExporter.prototype.endFills = function () { };
                            DefaultShapeExporter.prototype.beginLines = function () { };
                            DefaultShapeExporter.prototype.endLines = function (close) { close = Boolean(close); };
                            DefaultShapeExporter.prototype.beginFill = function (color, alpha) {
                                if (alpha === void 0) { alpha = 1.0; }
                                color = ((color) >>> 0);
                                alpha = (+(alpha));
                            };
                            DefaultShapeExporter.prototype.beginGradientFill = function (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
                                if (matrix === void 0) { matrix = null; }
                                if (spreadMethod === void 0) { spreadMethod = core.SpreadMethod.PAD; }
                                if (interpolationMethod === void 0) { interpolationMethod = core.InterpolationMethod.RGB; }
                                if (focalPointRatio === void 0) { focalPointRatio = 0; }
                                type = as(type, 'String');
                                colors = strict(colors, Array);
                                alphas = strict(alphas, Array);
                                ratios = strict(ratios, Array);
                                matrix = strict(matrix, core.Matrix);
                                spreadMethod = as(spreadMethod, 'String');
                                interpolationMethod = as(interpolationMethod, 'String');
                                focalPointRatio = (+(focalPointRatio));
                            };
                            DefaultShapeExporter.prototype.beginBitmapFill = function (bitmapId, matrix, repeat, smooth) {
                                if (matrix === void 0) { matrix = null; }
                                if (repeat === void 0) { repeat = true; }
                                if (smooth === void 0) { smooth = false; }
                                bitmapId = ((bitmapId) >>> 0);
                                matrix = strict(matrix, core.Matrix);
                                repeat = Boolean(repeat);
                                smooth = Boolean(smooth);
                            };
                            DefaultShapeExporter.prototype.endFill = function () { };
                            DefaultShapeExporter.prototype.lineStyle = function (thickness, color, alpha, pixelHinting, scaleMode, startCaps, endCaps, joints, miterLimit) {
                                if (thickness === void 0) { thickness = NaN; }
                                if (color === void 0) { color = 0; }
                                if (alpha === void 0) { alpha = 1.0; }
                                if (pixelHinting === void 0) { pixelHinting = false; }
                                if (scaleMode === void 0) { scaleMode = core.LineScaleMode.NORMAL; }
                                if (startCaps === void 0) { startCaps = null; }
                                if (endCaps === void 0) { endCaps = null; }
                                if (joints === void 0) { joints = null; }
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
                            };
                            DefaultShapeExporter.prototype.lineGradientStyle = function (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
                                if (matrix === void 0) { matrix = null; }
                                if (spreadMethod === void 0) { spreadMethod = core.SpreadMethod.PAD; }
                                if (interpolationMethod === void 0) { interpolationMethod = core.InterpolationMethod.RGB; }
                                if (focalPointRatio === void 0) { focalPointRatio = 0; }
                                type = as(type, 'String');
                                colors = strict(colors, Array);
                                alphas = strict(alphas, Array);
                                ratios = strict(ratios, Array);
                                matrix = strict(matrix, core.Matrix);
                                spreadMethod = as(spreadMethod, 'String');
                                interpolationMethod = as(interpolationMethod, 'String');
                                focalPointRatio = (+(focalPointRatio));
                            };
                            DefaultShapeExporter.prototype.moveTo = function (x, y) { x = (+(x)); y = (+(y)); };
                            DefaultShapeExporter.prototype.lineTo = function (x, y) { x = (+(x)); y = (+(y)); };
                            DefaultShapeExporter.prototype.curveTo = function (controlX, controlY, anchorX, anchorY) { controlX = (+(controlX)); controlY = (+(controlY)); anchorX = (+(anchorX)); anchorY = (+(anchorY)); };
                            return DefaultShapeExporter;
                        }());
                        core.DefaultShapeExporter = DefaultShapeExporter;
                    })(core = exporters.core || (exporters.core = {}));
                })(exporters = swf_1.exporters || (swf_1.exporters = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=DefaultShapeExporter.js.map