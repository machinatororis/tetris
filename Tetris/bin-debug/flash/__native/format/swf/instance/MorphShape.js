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
            (function (swf) {
                var instance;
                (function (instance) {
                    instance.SWFTimelineContainer = flash.__native.format.swf.SWFTimelineContainer;
                    instance.AS3GraphicsDataShapeExporter = flash.__native.format.swf.exporters.AS3GraphicsDataShapeExporter;
                    instance.TagDefineMorphShape = flash.__native.format.swf.tags.TagDefineMorphShape;
                    instance.WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
                    var MorphShape = (function (_super) {
                        __extends(MorphShape, _super);
                        function MorphShape(tag) {
                            var _this = this;
                            tag = strict(tag, instance.TagDefineMorphShape);
                            _this._tag === void 0 && (_this._tag = null);
                            _this._data === void 0 && (_this._data = null);
                            _this._currentRatio === void 0 && (_this._currentRatio = NaN);
                            _this._newRatio === void 0 && (_this._newRatio = NaN);
                            _this = _super.call(this) || this;
                            if (!tag) {
                                return;
                            }
                            _this._tag = tag;
                            _this._data = strict(tag.root, instance.SWFTimelineContainer);
                            return _this;
                        }
                        MorphShape.prototype.__predraw = function (ctx, skipCache) {
                            if (this._stage && this._currentRatio != this._newRatio) {
                                MorphShape._exporter.swf = this._data;
                                MorphShape._exporter.graphics = this.graphics;
                                this._tag.exportMorphShape(MorphShape._exporter, this._currentRatio = this._newRatio);
                            }
                            return _super.prototype.__predraw.call(this, ctx, skipCache);
                        };
                        MorphShape._exporter = asc.sti(MorphShape, function () { MorphShape._exporter = new instance.AS3GraphicsDataShapeExporter; });
                        return MorphShape;
                    }(flash.display.Shape));
                    instance.MorphShape = MorphShape;
                })(instance = swf.instance || (swf.instance = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=MorphShape.js.map