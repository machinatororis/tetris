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
                    var SWFMorphFocalGradient = (function (_super) {
                        __extends(SWFMorphFocalGradient, _super);
                        function SWFMorphFocalGradient(data, level) {
                            if (data === void 0) { data = null; }
                            if (level === void 0) { level = 1; }
                            var _this = this;
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            _this = _super.call(this, data, level) || this;
                            return _this;
                        }
                        SWFMorphFocalGradient.prototype.parse = function (data, level) {
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            _super.prototype.parse.call(this, data, level);
                            this.startFocalPoint = data.readFIXED8();
                            this.endFocalPoint = data.readFIXED8();
                        };
                        SWFMorphFocalGradient.prototype.publish = function (data, level) {
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            _super.prototype.publish.call(this, data, level);
                            data.writeFIXED8(this.startFocalPoint);
                            data.writeFIXED8(this.endFocalPoint);
                        };
                        SWFMorphFocalGradient.prototype.getMorphedGradient = function (ratio) {
                            if (ratio === void 0) { ratio = 0; }
                            ratio = (+(ratio));
                            var gradient = new data_1.SWFGradient();
                            for (var i = 0, len = ((this.records.length) >>> 0); i < len; i++) {
                                gradient.records.push(this.records[i].getMorphedGradientRecord(ratio));
                            }
                            return gradient;
                        };
                        SWFMorphFocalGradient.prototype.toString = function () {
                            return "FocalPoint: " + this.startFocalPoint + "," + this.endFocalPoint + " (" + this._records.join(",") + ")";
                        };
                        return SWFMorphFocalGradient;
                    }(data_1.SWFMorphGradient));
                    data_1.SWFMorphFocalGradient = SWFMorphFocalGradient;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFMorphFocalGradient.js.map