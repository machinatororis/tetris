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
                    data_1.NumberUtils = flash.__native.format.swf.utils.NumberUtils;
                    data_1.Rectangle = flash.geom.Rectangle;
                    var SWFRectangle = (function () {
                        function SWFRectangle(data) {
                            if (data === void 0) { data = null; }
                            this.xmin = 0;
                            this.xmax = 11000;
                            this.ymin = 0;
                            this.ymax = 8000;
                            this._rectangle = null;
                            data = strict(data, data_1.SWFData);
                            this._rectangle = new data_1.Rectangle();
                            if (data != null) {
                                this.parse(data);
                            }
                        }
                        SWFRectangle.prototype.parse = function (data) {
                            data = strict(data, data_1.SWFData);
                            data.resetBitsPending();
                            var bits = data.readUB(5);
                            this.xmin = data.readSB(bits);
                            this.xmax = data.readSB(bits);
                            this.ymin = data.readSB(bits);
                            this.ymax = data.readSB(bits);
                        };
                        SWFRectangle.prototype.publish = function (data) {
                            data = strict(data, data_1.SWFData);
                            var numBits = data.calculateMaxBits(true, [this.xmin, this.xmax, this.ymin, this.ymax]);
                            data.resetBitsPending();
                            data.writeUB(5, numBits);
                            data.writeSB(numBits, this.xmin);
                            data.writeSB(numBits, this.xmax);
                            data.writeSB(numBits, this.ymin);
                            data.writeSB(numBits, this.ymax);
                        };
                        SWFRectangle.prototype.clone = function () {
                            var rect = new SWFRectangle();
                            rect.xmin = this.xmin;
                            rect.xmax = this.xmax;
                            rect.ymin = this.ymin;
                            rect.ymax = this.ymax;
                            return rect;
                        };
                        Object.defineProperty(SWFRectangle.prototype, "rect", {
                            get: function () {
                                this._rectangle.left = data_1.NumberUtils.roundPixels20(this.xmin / 20);
                                this._rectangle.right = data_1.NumberUtils.roundPixels20(this.xmax / 20);
                                this._rectangle.top = data_1.NumberUtils.roundPixels20(this.ymin / 20);
                                this._rectangle.bottom = data_1.NumberUtils.roundPixels20(this.ymax / 20);
                                return this._rectangle;
                            },
                            enumerable: true,
                            configurable: true
                        });
                        SWFRectangle.prototype.toString = function () {
                            return "(" + this.xmin + "," + this.xmax + "," + this.ymin + "," + this.ymax + ")";
                        };
                        SWFRectangle.prototype.toStringSize = function () {
                            return "(" + ((+(this.xmax)) / 20 - (+(this.xmin)) / 20) + "," + ((+(this.ymax)) / 20 - (+(this.ymin)) / 20) + ")";
                        };
                        return SWFRectangle;
                    }());
                    data_1.SWFRectangle = SWFRectangle;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFRectangle.js.map