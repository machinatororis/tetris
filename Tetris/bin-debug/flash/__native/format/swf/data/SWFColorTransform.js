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
                    var SWFColorTransform = (function () {
                        function SWFColorTransform(data) {
                            this._aMult = 256;
                            this._aAdd = 0;
                            if (data != null) {
                                this.parse(data);
                            }
                        }
                        Object.defineProperty(SWFColorTransform.prototype, "rMult", {
                            get: function () { return this._rMult / 256; },
                            set: function (value) { value = (+(value)); this._rMult = this.clamp(value * 256); this.updateHasMultTerms(); },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(SWFColorTransform.prototype, "gMult", {
                            get: function () { return this._gMult / 256; },
                            set: function (value) { value = (+(value)); this._gMult = this.clamp(value * 256); this.updateHasMultTerms(); },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(SWFColorTransform.prototype, "bMult", {
                            get: function () { return this._bMult / 256; },
                            set: function (value) { value = (+(value)); this._bMult = this.clamp(value * 256); this.updateHasMultTerms(); },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(SWFColorTransform.prototype, "rAdd", {
                            get: function () { return this._rAdd; },
                            set: function (value) { value = (+(value)); this._rAdd = this.clamp(value); this.updateHasAddTerms(); },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(SWFColorTransform.prototype, "gAdd", {
                            get: function () { return this._gAdd; },
                            set: function (value) { value = (+(value)); this._gAdd = this.clamp(value); this.updateHasAddTerms(); },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(SWFColorTransform.prototype, "bAdd", {
                            get: function () { return this._bAdd; },
                            set: function (value) { value = (+(value)); this._bAdd = this.clamp(value); this.updateHasAddTerms(); },
                            enumerable: true,
                            configurable: true
                        });
                        SWFColorTransform.prototype.parse = function (data) {
                            data.resetBitsPending();
                            this.hasAddTerms = (data.readUB(1) == 1);
                            this.hasMultTerms = (data.readUB(1) == 1);
                            var bits = data.readUB(4);
                            if (this.hasMultTerms) {
                                this._rMult = data.readSB(bits);
                                this._gMult = data.readSB(bits);
                                this._bMult = data.readSB(bits);
                            }
                            else {
                                this._rMult = 256;
                                this._gMult = 256;
                                this._bMult = 256;
                            }
                            if (this.hasAddTerms) {
                                this._rAdd = data.readSB(bits);
                                this._gAdd = data.readSB(bits);
                                this._bAdd = data.readSB(bits);
                            }
                            else {
                                this._rAdd = 0;
                                this._gAdd = 0;
                                this._bAdd = 0;
                            }
                            this.colorTransform = new data_1.ColorTransform(this.rMult, this.gMult, this.bMult, 1, this.rAdd, this.gAdd, this.bAdd, 0);
                        };
                        SWFColorTransform.prototype.publish = function (data) {
                            data = strict(data, data_1.SWFData);
                            data.resetBitsPending();
                            data.writeUB(1, this.hasAddTerms ? 1 : 0);
                            data.writeUB(1, this.hasMultTerms ? 1 : 0);
                            var values = [];
                            if (this.hasMultTerms) {
                                values.push(this._rMult, this._gMult, this._bMult);
                            }
                            if (this.hasAddTerms) {
                                values.push(this._rAdd, this._gAdd, this._bAdd);
                            }
                            var bits = data.calculateMaxBits(true, values);
                            data.writeUB(4, bits);
                            if (this.hasMultTerms) {
                                data.writeSB(bits, this._rMult);
                                data.writeSB(bits, this._gMult);
                                data.writeSB(bits, this._bMult);
                            }
                            if (this.hasAddTerms) {
                                data.writeSB(bits, this._rAdd);
                                data.writeSB(bits, this._gAdd);
                                data.writeSB(bits, this._bAdd);
                            }
                        };
                        SWFColorTransform.prototype.clone = function () {
                            var copy = new SWFColorTransform();
                            copy.hasAddTerms = this.hasAddTerms;
                            copy.hasMultTerms = this.hasMultTerms;
                            copy.rMult = this.rMult;
                            copy.gMult = this.gMult;
                            copy.bMult = this.bMult;
                            copy.rAdd = this.rAdd;
                            copy.gAdd = this.gAdd;
                            copy.bAdd = this.bAdd;
                            copy.colorTransform = new data_1.ColorTransform(this.rMult, this.gMult, this.bMult, 1, this.rAdd, this.gAdd, this.bAdd, 0);
                            return copy;
                        };
                        SWFColorTransform.prototype.updateHasMultTerms = function () {
                            this.hasMultTerms = (this._rMult != 256) || (this._gMult != 256) || (this._bMult != 256);
                        };
                        SWFColorTransform.prototype.updateHasAddTerms = function () {
                            this.hasAddTerms = (this._rAdd != 0) || (this._gAdd != 0) || (this._bAdd != 0);
                        };
                        SWFColorTransform.prototype.clamp = function (value) {
                            value = (+(value));
                            return Math.min(Math.max(value, -32768), 32767);
                        };
                        SWFColorTransform.prototype.isIdentity = function () {
                            return !this.hasMultTerms && !this.hasAddTerms;
                        };
                        SWFColorTransform.prototype.toString = function () {
                            return "(" + this.rMult + "," + this.gMult + "," + this.bMult + "," + this.rAdd + "," + this.gAdd + "," + this.bAdd + ")";
                        };
                        return SWFColorTransform;
                    }());
                    data_1.SWFColorTransform = SWFColorTransform;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFColorTransform.js.map