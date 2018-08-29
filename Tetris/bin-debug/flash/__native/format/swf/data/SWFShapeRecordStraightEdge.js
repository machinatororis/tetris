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
                    var SWFShapeRecordStraightEdge = (function (_super) {
                        __extends(SWFShapeRecordStraightEdge, _super);
                        function SWFShapeRecordStraightEdge(data, numBits, level) {
                            if (numBits === void 0) { numBits = 0; }
                            if (level === void 0) { level = 1; }
                            var _this = this;
                            _this.numBits = numBits;
                            _this = _super.call(this, data, level) || this;
                            return _this;
                        }
                        SWFShapeRecordStraightEdge.prototype.parse = function (data, level) {
                            if (level === void 0) { level = 1; }
                            this.generalLineFlag = (data.readUB(1) == 1);
                            this.vertLineFlag = !this.generalLineFlag ? (data.readUB(1) == 1) : false;
                            this.deltaX = (this.generalLineFlag || !this.vertLineFlag) ? data.readSB(this.numBits) : 0;
                            this.deltaY = (this.generalLineFlag || this.vertLineFlag) ? data.readSB(this.numBits) : 0;
                        };
                        SWFShapeRecordStraightEdge.prototype.publish = function (data, level) {
                            if (data === void 0) { data = null; }
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            var deltas = [];
                            if (this.generalLineFlag || !this.vertLineFlag) {
                                deltas.push(this.deltaX);
                            }
                            if (this.generalLineFlag || this.vertLineFlag) {
                                deltas.push(this.deltaY);
                            }
                            this.numBits = data.calculateMaxBits(true, deltas);
                            if (this.numBits < 2) {
                                this.numBits = 2;
                            }
                            data.writeUB(4, this.numBits - 2);
                            data.writeUB(1, this.generalLineFlag ? 1 : 0);
                            if (!this.generalLineFlag) {
                                data.writeUB(1, this.vertLineFlag ? 1 : 0);
                            }
                            for (var i = 0; i < deltas.length; i++) {
                                data.writeSB(this.numBits, ((deltas[i]) >> 0));
                            }
                        };
                        SWFShapeRecordStraightEdge.prototype.clone = function () {
                            var record = new SWFShapeRecordStraightEdge();
                            record.deltaX = this.deltaX;
                            record.deltaY = this.deltaY;
                            record.generalLineFlag = this.generalLineFlag;
                            record.vertLineFlag = this.vertLineFlag;
                            record.numBits = this.numBits;
                            return record;
                        };
                        Object.defineProperty(SWFShapeRecordStraightEdge.prototype, "type", {
                            get: function () { return data_1.SWFShapeRecord.TYPE_STRAIGHTEDGE; },
                            enumerable: true,
                            configurable: true
                        });
                        SWFShapeRecordStraightEdge.prototype.toString = function (indent) {
                            if (indent === void 0) { indent = 0; }
                            indent = ((indent) >>> 0);
                            var str = "[SWFShapeRecordStraightEdge] ";
                            if (this.generalLineFlag) {
                                str += "General: " + this.deltaX + "," + this.deltaY;
                            }
                            else {
                                if (this.vertLineFlag) {
                                    str += "Vertical: " + this.deltaY;
                                }
                                else {
                                    str += "Horizontal: " + this.deltaX;
                                }
                            }
                            return str;
                        };
                        return SWFShapeRecordStraightEdge;
                    }(data_1.SWFShapeRecord));
                    data_1.SWFShapeRecordStraightEdge = SWFShapeRecordStraightEdge;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFShapeRecordStraightEdge.js.map