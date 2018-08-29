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
        var utils;
        (function (utils) {
            var BitArray = (function (_super) {
                __extends(BitArray, _super);
                function BitArray() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.bitsPending = 0;
                    return _this;
                }
                BitArray.prototype.readBits = function (bits, bitBuffer) {
                    if (bitBuffer === void 0) { bitBuffer = 0; }
                    if (bits == 0) {
                        return bitBuffer;
                    }
                    var partial;
                    var bitsConsumed;
                    if (this.bitsPending > 0) {
                        var byte = ((this.get(this._position - 1) & (0xff >> (8 - this.bitsPending))) >>> 0);
                        bitsConsumed = this.bitsPending < bits ? this.bitsPending : bits;
                        this.bitsPending -= bitsConsumed;
                        partial = ((byte >> this.bitsPending) >>> 0);
                    }
                    else {
                        bitsConsumed = 8 < bits ? 8 : bits;
                        this.bitsPending = ((8 - bitsConsumed) >>> 0);
                        partial = ((this.readUnsignedByte() >> this.bitsPending) >>> 0);
                    }
                    bits = ((bits - bitsConsumed) >>> 0);
                    bitBuffer = (((bitBuffer << bitsConsumed) | partial) >>> 0);
                    return bits > 0 ? this.readBits(bits, bitBuffer) : bitBuffer;
                };
                BitArray.prototype.writeBits = function (bits, value) {
                    if (bits == 0) {
                        return;
                    }
                    value &= (0xffffffff >>> (32 - bits));
                    var bitsConsumed;
                    if (this.bitsPending > 0) {
                        if (this.bitsPending > bits) {
                            this.set(this.position - 1, this.position.get(this.position - 1) | value << (this.bitsPending - bits));
                            bitsConsumed = bits;
                            this.bitsPending = ((this.bitsPending - bits) >>> 0);
                        }
                        else if (this.bitsPending == bits) {
                            this.set(this.position - 1, this.position.get(this.position - 1) | value);
                            bitsConsumed = bits;
                            this.bitsPending = 0;
                        }
                        else {
                            this.set(this.position - 1, this.position.get(this.position - 1) | value >> (bits - this.bitsPending));
                            bitsConsumed = this.bitsPending;
                            this.bitsPending = 0;
                        }
                    }
                    else {
                        bitsConsumed = Math.min(8, bits);
                        this.bitsPending = ((8 - bitsConsumed) >>> 0);
                        this.writeByte((value >> (bits - bitsConsumed)) << this.bitsPending);
                    }
                    bits -= bitsConsumed;
                    if (bits > 0) {
                        this.writeBits(bits, value);
                    }
                };
                BitArray.prototype.resetBitsPending = function () {
                    this.bitsPending = 0;
                };
                BitArray.prototype.calculateMaxBits = function (signed, values) {
                    var b = 0;
                    var vmax = int.MIN_VALUE;
                    if (!signed) {
                        var __for0 = window.asc.of(values);
                        for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                            var usvalue = __for0_1[_i];
                            b |= usvalue;
                        }
                    }
                    else {
                        var __for1 = window.asc.of(values);
                        for (var _a = 0, __for1_1 = __for1; _a < __for1_1.length; _a++) {
                            var svalue = __for1_1[_a];
                            if (svalue >= 0) {
                                b |= svalue;
                            }
                            else {
                                b |= ~svalue << 1;
                            }
                            if (vmax < svalue) {
                                vmax = svalue;
                            }
                        }
                    }
                    var bits = 0;
                    if (b > 0) {
                        bits = ((b.toString(2).length) >>> 0);
                        if (signed && vmax > 0 && vmax.toString(2).length >= bits) {
                            bits++;
                        }
                    }
                    return bits;
                };
                return BitArray;
            }(utils.SubByteArray));
            utils.BitArray = BitArray;
        })(utils = __native.utils || (__native.utils = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=BitArray.js.map