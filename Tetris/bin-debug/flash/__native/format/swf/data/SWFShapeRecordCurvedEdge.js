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
                (function (data_1) {
                    data_1.SWFData = flash.__native.format.swf.SWFData;
                    var SWFShapeRecordCurvedEdge = (function (_super) {
                        __extends(SWFShapeRecordCurvedEdge, _super);
                        function SWFShapeRecordCurvedEdge(data, numBits, level) {
                            if (numBits === void 0) { numBits = 0; }
                            if (level === void 0) { level = 1; }
                            var _this = this;
                            _this.numBits = numBits;
                            _this = _super.call(this, data, level) || this;
                            return _this;
                        }
                        SWFShapeRecordCurvedEdge.prototype.parse = function (data, level) {
                            if (level === void 0) { level = 1; }
                            this.controlDeltaX = data.readSB(this.numBits);
                            this.controlDeltaY = data.readSB(this.numBits);
                            this.anchorDeltaX = data.readSB(this.numBits);
                            this.anchorDeltaY = data.readSB(this.numBits);
                        };
                        SWFShapeRecordCurvedEdge.prototype.publish = function (data, level) {
                            if (data === void 0) { data = null; }
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            this.numBits = data.calculateMaxBits(true, [this.controlDeltaX, this.controlDeltaY, this.anchorDeltaX, this.anchorDeltaY]);
                            if (this.numBits < 2) {
                                this.numBits = 2;
                            }
                            data.writeUB(4, this.numBits - 2);
                            data.writeSB(this.numBits, this.controlDeltaX);
                            data.writeSB(this.numBits, this.controlDeltaY);
                            data.writeSB(this.numBits, this.anchorDeltaX);
                            data.writeSB(this.numBits, this.anchorDeltaY);
                        };
                        SWFShapeRecordCurvedEdge.prototype.clone = function () {
                            var record = new SWFShapeRecordCurvedEdge();
                            record.anchorDeltaX = this.anchorDeltaX;
                            record.anchorDeltaY = this.anchorDeltaY;
                            record.controlDeltaX = this.controlDeltaX;
                            record.controlDeltaY = this.controlDeltaY;
                            record.numBits = this.numBits;
                            return record;
                        };
                        Object.defineProperty(SWFShapeRecordCurvedEdge.prototype, "type", {
                            get: function () { return data_1.SWFShapeRecord.TYPE_CURVEDEDGE; },
                            enumerable: true,
                            configurable: true
                        });
                        SWFShapeRecordCurvedEdge.prototype.toString = function (indent) {
                            if (indent === void 0) { indent = 0; }
                            indent = ((indent) >>> 0);
                            return "[SWFShapeRecordCurvedEdge] " +
                                "ControlDelta: " + this.controlDeltaX + "," + this.controlDeltaY + ", " +
                                "AnchorDelta: " + this.anchorDeltaX + "," + this.anchorDeltaY;
                        };
                        return SWFShapeRecordCurvedEdge;
                    }(data_1.SWFShapeRecord));
                    data_1.SWFShapeRecordCurvedEdge = SWFShapeRecordCurvedEdge;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFShapeRecordCurvedEdge.js.map