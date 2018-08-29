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
                var data;
                (function (data) {
                    var SWFShapeRecordEnd = (function (_super) {
                        __extends(SWFShapeRecordEnd, _super);
                        function SWFShapeRecordEnd() {
                            return _super.call(this) || this;
                        }
                        SWFShapeRecordEnd.prototype.clone = function () { return new SWFShapeRecordEnd(); };
                        Object.defineProperty(SWFShapeRecordEnd.prototype, "type", {
                            get: function () { return data.SWFShapeRecord.TYPE_END; },
                            enumerable: true,
                            configurable: true
                        });
                        SWFShapeRecordEnd.prototype.toString = function (indent) {
                            if (indent === void 0) { indent = 0; }
                            indent = ((indent) >>> 0);
                            return "[SWFShapeRecordEnd]";
                        };
                        return SWFShapeRecordEnd;
                    }(data.SWFShapeRecord));
                    data.SWFShapeRecordEnd = SWFShapeRecordEnd;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFShapeRecordEnd.js.map