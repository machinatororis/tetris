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
                    instance.AS3GraphicsDataShapeExporter = flash.__native.format.swf.exporters.AS3GraphicsDataShapeExporter;
                    instance.TagDefineShape = flash.__native.format.swf.tags.TagDefineShape;
                    var Shape = (function (_super) {
                        __extends(Shape, _super);
                        function Shape(tag) {
                            var _this = this;
                            tag = strict(tag, instance.TagDefineShape);
                            _this = _super.call(this) || this;
                            if (!tag) {
                                return;
                            }
                            Shape._exporter.swf = tag.root;
                            Shape._exporter.graphics = _this.graphics;
                            tag.exportShape(Shape._exporter);
                            return _this;
                        }
                        Shape._exporter = asc.sti(Shape, function () { Shape._exporter = new instance.AS3GraphicsDataShapeExporter; });
                        return Shape;
                    }(flash.display.Shape));
                    instance.Shape = Shape;
                })(instance = swf.instance || (swf.instance = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Shape.js.map