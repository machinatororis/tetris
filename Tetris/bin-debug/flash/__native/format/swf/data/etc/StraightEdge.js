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
                        var StraightEdge = (function () {
                            function StraightEdge(fromX, fromY, toX, toY, lineStyleIdx, fillStyleIdx) {
                                if (lineStyleIdx === void 0) { lineStyleIdx = 0; }
                                if (fillStyleIdx === void 0) { fillStyleIdx = 0; }
                                this.implements_flash___native_format_swf_data_etc_IEdge = null;
                                this._fromX = 0;
                                this._fromY = 0;
                                this._toX = 0;
                                this._toY = 0;
                                this._lineStyleIdx = 0;
                                this._fillStyleIdx = 0;
                                fromX = ((fromX) >> 0);
                                fromY = ((fromY) >> 0);
                                toX = ((toX) >> 0);
                                toY = ((toY) >> 0);
                                lineStyleIdx = ((lineStyleIdx) >> 0);
                                fillStyleIdx = ((fillStyleIdx) >> 0);
                                this._fromX = fromX;
                                this._fromY = fromY;
                                this._toX = toX;
                                this._toY = toY;
                                this._lineStyleIdx = lineStyleIdx;
                                this._fillStyleIdx = fillStyleIdx;
                            }
                            StraightEdge.prototype.getFromX = function () { return this._fromX; };
                            StraightEdge.prototype.getFromY = function () { return this._fromY; };
                            StraightEdge.prototype.getToX = function () { return this._toX; };
                            StraightEdge.prototype.getToY = function () { return this._toY; };
                            StraightEdge.prototype.getLineStyleIdx = function () { return this._lineStyleIdx; };
                            StraightEdge.prototype.getFillStyleIdx = function () { return this._fillStyleIdx; };
                            StraightEdge.prototype.reverseWithNewFillStyle = function (newFillStyleIdx) {
                                newFillStyleIdx = ((newFillStyleIdx) >>> 0);
                                return new StraightEdge(this._toX, this._toY, this._fromX, this._fromY, this._lineStyleIdx, newFillStyleIdx);
                            };
                            StraightEdge.prototype.toString = function () {
                                return "stroke:" + this._lineStyleIdx + ", fill:" + this._fillStyleIdx + ", start:" + this._fromX + " " + this._fromY + ", end:" + this._toX + " " + this._toY;
                            };
                            return StraightEdge;
                        }());
                        etc.StraightEdge = StraightEdge;
                    })(etc = data.etc || (data.etc = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=StraightEdge.js.map