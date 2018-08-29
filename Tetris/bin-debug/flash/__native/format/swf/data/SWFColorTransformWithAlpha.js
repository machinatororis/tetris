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
                    data_1.ColorTransform = flash.geom.ColorTransform;
                    var SWFColorTransformWithAlpha = (function (_super) {
                        __extends(SWFColorTransformWithAlpha, _super);
                        function SWFColorTransformWithAlpha() {
                            return _super !== null && _super.apply(this, arguments) || this;
                        }
                        Object.defineProperty(SWFColorTransformWithAlpha.prototype, "aMult", {
                            get: function () { return this._aMult / 256; },
                            set: function (value) { value = (+(value)); this._aMult = this.clamp(value * 256); this.updateHasMultTerms(); },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(SWFColorTransformWithAlpha.prototype, "aAdd", {
                            get: function () { return this._aAdd; },
                            set: function (value) { value = (+(value)); this._aAdd = this.clamp(value); this.updateHasAddTerms(); },
                            enumerable: true,
                            configurable: true
                        });
                        SWFColorTransformWithAlpha.prototype.parse = function (data) {
                            data.resetBitsPending();
                            this.hasAddTerms = (data.readUB(1) == 1);
                            this.hasMultTerms = (data.readUB(1) == 1);
                            var bits = data.readUB(4);
                            if (this.hasMultTerms) {
                                this._rMult = data.readSB(bits);
                                this._gMult = data.readSB(bits);
                                this._bMult = data.readSB(bits);
                                this._aMult = data.readSB(bits);
                            }
                            else {
                                this._rMult = 256;
                                this._gMult = 256;
                                this._bMult = 256;
                                this._aMult = 256;
                            }
                            if (this.hasAddTerms) {
                                this._rAdd = data.readSB(bits);
                                this._gAdd = data.readSB(bits);
                                this._bAdd = data.readSB(bits);
                                this._aAdd = data.readSB(bits);
                            }
                            else {
                                this._rAdd = 0;
                                this._gAdd = 0;
                                this._bAdd = 0;
                                this._aAdd = 0;
                            }
                            this.colorTransform = new data_1.ColorTransform(this.rMult, this.gMult, this.bMult, this.aMult, this.rAdd, this.gAdd, this.bAdd, this.aAdd);
                        };
                        SWFColorTransformWithAlpha.prototype.publish = function (data) {
                            data = strict(data, data_1.SWFData);
                            data.resetBitsPending();
                            data.writeUB(1, this.hasAddTerms ? 1 : 0);
                            data.writeUB(1, this.hasMultTerms ? 1 : 0);
                            var values = [];
                            if (this.hasMultTerms) {
                                values.push(this._rMult, this._gMult, this._bMult, this._aMult);
                            }
                            if (this.hasAddTerms) {
                                values.push(this._rAdd, this._gAdd, this._bAdd, this._aAdd);
                            }
                            var bits = (this.hasMultTerms || this.hasAddTerms) ? data.calculateMaxBits(true, values) : 1;
                            data.writeUB(4, bits);
                            if (this.hasMultTerms) {
                                data.writeSB(bits, this._rMult);
                                data.writeSB(bits, this._gMult);
                                data.writeSB(bits, this._bMult);
                                data.writeSB(bits, this._aMult);
                            }
                            if (this.hasAddTerms) {
                                data.writeSB(bits, this._rAdd);
                                data.writeSB(bits, this._gAdd);
                                data.writeSB(bits, this._bAdd);
                                data.writeSB(bits, this._aAdd);
                            }
                        };
                        SWFColorTransformWithAlpha.prototype.clone = function () {
                            var copy = new SWFColorTransformWithAlpha();
                            copy.hasAddTerms = this.hasAddTerms;
                            copy.hasMultTerms = this.hasMultTerms;
                            copy.rMult = this.rMult;
                            copy.gMult = this.gMult;
                            copy.bMult = this.bMult;
                            copy.aMult = this.aMult;
                            copy.rAdd = this.rAdd;
                            copy.gAdd = this.gAdd;
                            copy.bAdd = this.bAdd;
                            copy.aAdd = this.aAdd;
                            copy.colorTransform = new data_1.ColorTransform(this.rMult, this.gMult, this.bMult, this.aMult, this.rAdd, this.gAdd, this.bAdd, this.aAdd);
                            return copy;
                        };
                        SWFColorTransformWithAlpha.prototype.updateHasMultTerms = function () {
                            this.hasMultTerms = (this._rMult != 256) || (this._gMult != 256) || (this._bMult != 256) || (this._aMult != 256);
                        };
                        SWFColorTransformWithAlpha.prototype.updateHasAddTerms = function () {
                            this.hasAddTerms = (this._rAdd != 0) || (this._gAdd != 0) || (this._bAdd != 0) || (this._aAdd != 0);
                        };
                        SWFColorTransformWithAlpha.prototype.toString = function () {
                            return "(" + this.rMult + "," + this.gMult + "," + this.bMult + "," + this.aMult + "," + this.rAdd + "," + this.gAdd + "," + this.bAdd + "," + this.aAdd + ")";
                        };
                        return SWFColorTransformWithAlpha;
                    }(data_1.SWFColorTransform));
                    data_1.SWFColorTransformWithAlpha = SWFColorTransformWithAlpha;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFColorTransformWithAlpha.js.map