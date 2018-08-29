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
                var instance;
                (function (instance) {
                    instance.SWFTimelineContainer = flash.__native.format.swf.SWFTimelineContainer;
                    instance.SWFTextRecord = flash.__native.format.swf.data.SWFTextRecord;
                    instance.DefaultShapeExporter = flash.__native.format.swf.exporters.core.DefaultShapeExporter;
                    instance.TagDefineFont = flash.__native.format.swf.tags.TagDefineFont;
                    instance.TagDefineText = flash.__native.format.swf.tags.TagDefineText;
                    instance.TagDefineText2 = flash.__native.format.swf.tags.TagDefineText2;
                    var StaticText = (function (_super) {
                        __extends(StaticText, _super);
                        function StaticText(tag) {
                            var _this = this;
                            tag = strict(tag, instance.TagDefineText);
                            _this = _super.call(this) || this;
                            if (!tag) {
                                return;
                            }
                            _this.tag = tag;
                            _this.data = strict(tag.root, instance.SWFTimelineContainer);
                            var matrix;
                            var cacheMatrix;
                            var tx = tag.textMatrix.matrix.tx;
                            var ty = tag.textMatrix.matrix.ty;
                            var color = 0x000000;
                            var alpha = 1.0;
                            var __for0 = window.asc.of(tag.records);
                            for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                                var record = __for0_1[_i];
                                var scale = record.textHeight / 1024;
                                cacheMatrix = matrix;
                                matrix = tag.textMatrix.matrix.clone();
                                matrix.scale(scale, scale);
                                if (record.hasColor) {
                                    color = ((record.textColor & 0x00FFFFFF) >>> 0);
                                    if (is(tag, instance.TagDefineText2)) {
                                        alpha = (record.textColor & 0xFF) / 0xFF;
                                    }
                                }
                                if (cacheMatrix != null && (record.hasColor || record.hasFont) && (!record.hasXOffset && !record.hasYOffset)) {
                                    matrix.tx = cacheMatrix.tx;
                                    matrix.ty = cacheMatrix.ty;
                                }
                                else {
                                    matrix.tx = record.hasXOffset ? tx + record.xOffset : tx;
                                    matrix.ty = record.hasYOffset ? ty + record.yOffset : ty;
                                }
                                var font = strict(_this.data.getTag(record.fontId), instance.TagDefineFont);
                                var len = record.glyphEntries.length;
                                for (var i = 0; i < len; ++i) {
                                    _this.graphics.lineStyle();
                                    _this.graphics.beginFill(color, alpha);
                                    _this.renderGlyph(font, record.glyphEntries[i].index, matrix.a, matrix.tx, matrix.ty);
                                    _this.graphics.endFill();
                                    matrix.tx += record.glyphEntries[i].advance;
                                }
                            }
                            return _this;
                        }
                        StaticText.prototype.renderGlyph = function (font, character, scale, offsetX, offsetY) {
                            font = strict(font, instance.TagDefineFont);
                            character = ((character) >> 0);
                            scale = (+(scale));
                            offsetX = (+(offsetX));
                            offsetY = (+(offsetY));
                            var handler = new InternalExporter(this.data, this.graphics, scale, offsetX, offsetY);
                            font.exportFont(handler, character);
                        };
                        return StaticText;
                    }(flash.display.Shape));
                    instance.StaticText = StaticText;
                    instance.SWFTimelineContainer = flash.__native.format.swf.SWFTimelineContainer;
                    instance.DefaultShapeExporter = flash.__native.format.swf.exporters.core.DefaultShapeExporter;
                    instance.CapsStyle = flash.display.CapsStyle;
                    instance.Graphics = flash.display.Graphics;
                    instance.JointStyle = flash.display.JointStyle;
                    instance.LineScaleMode = flash.display.LineScaleMode;
                    var InternalExporter = (function (_super) {
                        __extends(InternalExporter, _super);
                        function InternalExporter(swf, graphics, scale, offsetX, offsetY) {
                            var _this = this;
                            swf = strict(swf, instance.SWFTimelineContainer);
                            graphics = strict(graphics, instance.Graphics);
                            scale = (+(scale));
                            offsetX = (+(offsetX));
                            offsetY = (+(offsetY));
                            _this.graphics === void 0 && (_this.graphics = null);
                            _this.scale === void 0 && (_this.scale = NaN);
                            _this.offsetX === void 0 && (_this.offsetX = NaN);
                            _this.offsetY === void 0 && (_this.offsetY = NaN);
                            _this = _super.call(this, swf) || this;
                            _this.graphics = graphics;
                            _this.scale = scale;
                            _this.offsetX = offsetX;
                            _this.offsetY = offsetY;
                            return _this;
                        }
                        InternalExporter.prototype.lineStyle = function (thickness, color, alpha, pixelHinting, scaleMode, startCaps, endCaps, joints, miterLimit) {
                            if (thickness === void 0) { thickness = NaN; }
                            if (color === void 0) { color = 0; }
                            if (alpha === void 0) { alpha = 1.0; }
                            if (pixelHinting === void 0) { pixelHinting = false; }
                            if (scaleMode === void 0) { scaleMode = instance.LineScaleMode.NORMAL; }
                            if (startCaps === void 0) { startCaps = instance.CapsStyle.ROUND; }
                            if (endCaps === void 0) { endCaps = instance.CapsStyle.ROUND; }
                            if (joints === void 0) { joints = instance.JointStyle.ROUND; }
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
                            if (thickness > 0) {
                                this.graphics.lineStyle(thickness, color, alpha, pixelHinting, scaleMode, startCaps, joints, miterLimit);
                            }
                            else {
                                this.graphics.lineStyle();
                            }
                        };
                        InternalExporter.prototype.moveTo = function (x, y) {
                            x = (+(x));
                            y = (+(y));
                            this.graphics.moveTo(x * this.scale + this.offsetX, y * this.scale + this.offsetY);
                        };
                        InternalExporter.prototype.lineTo = function (x, y) {
                            x = (+(x));
                            y = (+(y));
                            this.graphics.lineTo(x * this.scale + this.offsetX, y * this.scale + this.offsetY);
                        };
                        InternalExporter.prototype.curveTo = function (controlX, controlY, anchorX, anchorY) {
                            controlX = (+(controlX));
                            controlY = (+(controlY));
                            anchorX = (+(anchorX));
                            anchorY = (+(anchorY));
                            this.graphics.curveTo(controlX * this.scale + this.offsetX, controlY * this.scale + this.offsetY, anchorX * this.scale + this.offsetX, anchorY * this.scale + this.offsetY);
                        };
                        return InternalExporter;
                    }(instance.DefaultShapeExporter));
                })(instance = swf_1.instance || (swf_1.instance = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=StaticText.js.map