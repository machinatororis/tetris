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
                    var etc;
                    (function (etc) {
                        var CurvedEdge = (function (_super) {
                            __extends(CurvedEdge, _super);
                            function CurvedEdge(fromX, fromY, controlX, controlY, toX, toY, lineStyleIdx, fillStyleIdx) {
                                if (lineStyleIdx === void 0) { lineStyleIdx = 0; }
                                if (fillStyleIdx === void 0) { fillStyleIdx = 0; }
                                var _this = this;
                                _this.implements_flash___native_format_swf_data_etc_IEdge = null;
                                fromX = ((fromX) >> 0);
                                fromY = ((fromY) >> 0);
                                controlX = ((controlX) >> 0);
                                controlY = ((controlY) >> 0);
                                toX = ((toX) >> 0);
                                toY = ((toY) >> 0);
                                lineStyleIdx = ((lineStyleIdx) >> 0);
                                fillStyleIdx = ((fillStyleIdx) >> 0);
                                _this._controlX === void 0 && (_this._controlX = 0);
                                _this._controlY === void 0 && (_this._controlY = 0);
                                _this = _super.call(this, fromX, fromY, toX, toY, lineStyleIdx, fillStyleIdx) || this;
                                _this._controlX = controlX;
                                _this._controlY = controlY;
                                return _this;
                            }
                            CurvedEdge.prototype.getControlX = function () { return this._controlX; };
                            CurvedEdge.prototype.getControlY = function () { return this._controlY; };
                            CurvedEdge.prototype.reverseWithNewFillStyle = function (newFillStyleIdx) {
                                newFillStyleIdx = ((newFillStyleIdx) >>> 0);
                                return new CurvedEdge(this._toX, this._toY, this._controlX, this._controlY, this._fromX, this._fromY, this._lineStyleIdx, newFillStyleIdx);
                            };
                            CurvedEdge.prototype.toString = function () {
                                return "stroke:" + this._lineStyleIdx + ", fill:" + this._fillStyleIdx + ", start:" + this._fromX + " " + this._fromY + ", control:" + this._controlX + " " + this._controlY + ", end:" + this._toX + " " + this._toY;
                            };
                            return CurvedEdge;
                        }(etc.StraightEdge));
                        etc.CurvedEdge = CurvedEdge;
                    })(etc = data.etc || (data.etc = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=CurvedEdge.js.map