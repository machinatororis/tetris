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
                    var SWFFocalGradient = (function (_super) {
                        __extends(SWFFocalGradient, _super);
                        function SWFFocalGradient(data, level) {
                            if (data === void 0) { data = null; }
                            if (level === void 0) { level = 1; }
                            var _this = this;
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            _this = _super.call(this, data, level) || this;
                            return _this;
                        }
                        SWFFocalGradient.prototype.parse = function (data, level) {
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            _super.prototype.parse.call(this, data, level);
                            this.focalPoint = data.readFIXED8();
                        };
                        SWFFocalGradient.prototype.publish = function (data, level) {
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            _super.prototype.publish.call(this, data, level);
                            data.writeFIXED8(this.focalPoint);
                        };
                        SWFFocalGradient.prototype.toString = function () {
                            return "(" + this._records.join(",") + ")";
                        };
                        return SWFFocalGradient;
                    }(data_1.SWFGradient));
                    data_1.SWFFocalGradient = SWFFocalGradient;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFFocalGradient.js.map